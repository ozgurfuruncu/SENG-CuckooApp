import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  workers: 1,
  reporter: [
    ["list"],
    ["json", { outputFile: "test-results/browser-results.json" }],
  ],
  use: {
    baseURL: "http://127.0.0.1:4174",
    channel: process.env.PROTOTYPE_BROWSER || "msedge",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "masaustu", use: { viewport: { width: 1440, height: 1000 } } },
    {
      name: "mobil",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: process.env.PROTOTYPE_SERVER_MANAGED
    ? undefined
    : {
        command:
          "node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4174 --strictPort",
        url: "http://127.0.0.1:4174",
        reuseExistingServer: false,
      },
});
