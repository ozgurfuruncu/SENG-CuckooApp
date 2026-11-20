import { defineConfig } from "@playwright/test";

const baseURL = "http://127.0.0.1:4175";

export default defineConfig({
  testDir: "./tests/browser",
  outputDir: "../.tools/lovable-browser",
  use: {
    baseURL,
    launchOptions: process.env.CUCKOO_CHROME_PATH
      ? { executablePath: process.env.CUCKOO_CHROME_PATH }
      : undefined,
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1280, height: 900 } } },
    {
      name: "mobile",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4175 --strictPort",
    url: baseURL,
  },
});
