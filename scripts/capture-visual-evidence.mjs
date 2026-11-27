import { mkdirSync } from "node:fs";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "playwright";

const base = "http://127.0.0.1:3101";
const dir = "docs/evidence/screenshots";
mkdirSync(dir, { recursive: true });
let browser;
let serverReady = false;
try {
  for (let attempt = 0; attempt < 60; attempt++) {
    try { if ((await fetch(base)).ok) { serverReady = true; break; } } catch {}
    await delay(500);
  }
  if (!serverReady) throw new Error("Start the standalone production server on port 3101 before capturing evidence.");
  browser = await chromium.launch();
  for (const [name, route, width, height] of [
    ["after-home-fr-mobile-360", "/", 360, 800],
    ["after-home-fr-desktop-1440", "/", 1440, 1000],
    ["after-home-en-mobile-390", "/en", 390, 844],
    ["after-home-en-desktop-1440", "/en", 1440, 1000],
    ["after-projects-en-mobile-390", "/en/projects", 390, 844],
    ["after-arkena-en-desktop-1440", "/en/projects/arkena-core", 1440, 1000],
    ["after-contact-en-mobile-390", "/en/contact", 390, 844],
  ]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
    await page.locator("img").evaluateAll((images) => images.forEach((image) => { image.loading = "eager"; }));
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(700);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `${dir}/${name}.png`, fullPage: true });
    await page.close();
  }
} finally {
  await browser?.close();
}
process.exit(0);
