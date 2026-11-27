import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../../src/data/projects";

test("all translated routes render with their document language", async ({ page }) => {
  for (const [path, lang] of [["/", "fr"], ["/projets", "fr"], ["/parcours", "fr"], ["/methode", "fr"], ["/contact", "fr"], ["/en", "en"], ["/en/projects", "en"], ["/en/career", "en"], ["/en/method", "en"], ["/en/contact", "en"]] as const) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator("main")).toBeVisible();
  }
});

for (const project of projects) {
  test(`case study ${project.slug} is available in French and English`, async ({ page }) => {
    for (const [path, lang] of [[`/projets/${project.slug}`, "fr"], [`/en/projects/${project.slug}`, "en"]] as const) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page.locator("h1")).toBeVisible();
    }
  });
}

test("language switch preserves page and filter query", async ({ page }) => {
  await page.goto("/projets?type=Web");
  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page).toHaveURL(/\/en\/projects\?type=Web$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("link", { name: "Passer en français" }).click();
  await expect(page).toHaveURL(/\/projets\?type=Web$/);
});

test("localized canonical, hreflang, social cards and sitemap point to real pages", async ({ page, request }) => {
  for (const [path, canonical, other, otherLocale] of [["/", "https://ameno.monarquegrp.com", "/en", "en"], ["/en/projects/arkena-core", "https://ameno.monarquegrp.com/en/projects/arkena-core", "/projets/arkena-core", "fr"]] as const) {
    await page.goto(path);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute("href", /https:\/\/ameno\.monarquegrp\.com(?:\/|$)/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /https:\/\/ameno\.monarquegrp\.com\//);
    const languageLink = await page.locator(`link[rel="alternate"][hreflang="${otherLocale}"][href*="${other}"]`).count();
    expect(languageLink).toBe(1);
  }
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const project of projects) {
    expect(xml).toContain(`/projets/${project.slug}`);
    expect(xml).toContain(`/en/projects/${project.slug}`);
  }
});

test("mobile navigation opens and remains keyboard accessible", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/en");
  const menu = page.locator("details.mobile-menu");
  await menu.locator("summary").click();
  await expect(menu).toHaveAttribute("open", "");
  await expect(menu.getByRole("link", { name: "Projects" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Passer en français" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open", "");
  await expect(menu.locator("summary")).toBeFocused();
});

test("contact endpoint validates input and honestly reports missing SMTP", async ({ request }) => {
  const invalid = await request.post("/api/contact", { data: { name: "", email: "bad", message: "x" } });
  expect(invalid.status()).toBe(400);
  const tooLarge = await request.post("/api/contact", { data: { name: "QA", email: "qa@example.com", message: "x".repeat(9_000) } });
  expect(tooLarge.status()).toBe(413);
  const unconfigured = await request.post("/api/contact", { data: { name: "QA", email: "qa@example.com", subject: "Test", message: "This is a local automated test message." } });
  expect(unconfigured.status()).toBe(503);
  expect((await unconfigured.json()).error).toBe("transport_not_configured");
});

test("contact endpoint applies its per-process abuse limit", async ({ request }) => {
  const headers = { "x-forwarded-for": "203.0.113.123, 198.51.100.67" };
  const payload = { name: "QA", email: "qa@example.com", subject: "Test", message: "Synthetic anti-abuse limit scenario." };
  for (let attempt = 0; attempt < 5; attempt++) {
    const response = await request.post("/api/contact", { headers, data: payload });
    expect(response.status()).toBe(503);
  }
  const limited = await request.post("/api/contact", { headers, data: payload });
  expect(limited.status()).toBe(429);
});

test("contact form prevents a double submission", async ({ page }) => {
  let submissions = 0;
  await page.route("**/api/contact", async (route) => {
    submissions++;
    await new Promise((resolve) => setTimeout(resolve, 250));
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
  });
  await page.goto("/en/contact");
  await page.getByLabel("Your name").fill("Automated test");
  await page.getByLabel("Your email").fill("qa@example.test");
  await page.getByLabel("Your message").fill("This is a synthetic Playwright message for the local form.");
  const button = page.getByRole("button", { name: /Send message/ });
  await Promise.allSettled([button.click(), button.click()]);
  await expect(page.getByRole("status")).toContainText("Your message has been sent.");
  expect(submissions).toBe(1);
});

test("CV request is prefilled without a fabricated CV download", async ({ page }) => {
  await page.goto("/en/contact?subject=cv");
  await expect(page.getByLabel("Subject")).toHaveValue("Demande de CV / CV request");
  await expect(page.getByRole("link", { name: /ameno\.aton4@gmail\.com/ }).first()).toBeVisible();
});

test("synthetic capacity and RBAC demonstrations expose allowed and denied outcomes", async ({ page }) => {
  await page.goto("/projets/happiguest");
  await page.getByRole("button", { name: /Vérifier la capacité/ }).click();
  await expect(page.getByRole("status")).toContainText("AUTORISÉ");
  await page.getByLabel(/Personnes à admettre/).fill("3");
  await page.getByRole("button", { name: /Vérifier la capacité/ }).click();
  await expect(page.getByRole("status")).toContainText("409");
  await page.goto("/en/projects/arkena-core");
  await page.getByLabel("Requested permission").selectOption("finance:approve");
  await page.getByRole("button", { name: /Check access/ }).click();
  await expect(page.getByRole("status")).toContainText("403");
  await expect(page.getByText(/does not call a product/i)).toBeVisible();
});

test("French and English mobile layouts do not overflow horizontally", async ({ page }) => {
  for (const path of ["/", "/projets", "/parcours", "/methode", "/contact", "/en", "/en/projects", "/en/career", "/en/method", "/en/contact", "/en/projects/tervyn"]) {
    for (const width of [320, 360, 390, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(overflow, `${path} at ${width}px`).toBe(false);
    }
  }
});

test("the responsive portrait uses the small mobile source", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect.poll(() => page.locator(".portrait-photo-image").evaluate((image: HTMLImageElement) => new URL(image.currentSrc).pathname)).toBe("/figma-assets/portrait-ameno-mobile.webp");
});

test("homepage has no serious or critical automated accessibility violations", async ({ page }) => {
  await page.goto("/en");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(({ impact }) => impact === "serious" || impact === "critical")).toEqual([]);
});
