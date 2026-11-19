import { spawn } from "node:child_process";
import { withPreview } from "./with-preview.mjs";
await withPreview(async () => {
  const code = await new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [
        "node_modules/@playwright/test/cli.js",
        "test",
        ...process.argv.slice(2),
      ],
      {
        stdio: "inherit",
        env: { ...process.env, PROTOTYPE_SERVER_MANAGED: "1" },
      },
    );
    child.on("error", reject);
    child.on("exit", (code) => resolve(code ?? 1));
  });
  process.exitCode = code;
});
