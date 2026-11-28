import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:3100", trace: "retain-on-failure", screenshot: "only-on-failure" },
  webServer: { command: "node .next/standalone/server.js", url: "http://127.0.0.1:3100", env: { HOSTNAME: "127.0.0.1", PORT: "3100" }, reuseExistingServer: !process.env.CI, timeout: 30_000 },
});
