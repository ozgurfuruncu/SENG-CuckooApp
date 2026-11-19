import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
const input = new URL(
  "../../../docs/diagrams/sprint-2-ozgur/",
  import.meta.url,
);
const output = new URL(
  "../../../docs/sprint-2-evidence/ozgur/diagrams/",
  import.meta.url,
);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  channel: process.env.PROTOTYPE_BROWSER || "msedge",
});
const results = [];
try {
  const page = await browser.newPage();
  await page.setContent(
    "<!doctype html><html lang='tr'><head><title>Diyagram doğrulama</title></head><body></body></html>",
  );
  await page.addScriptTag({ path: "node_modules/mermaid/dist/mermaid.min.js" });
  await page.evaluate(() =>
    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "neutral",
      fontFamily: "Arial",
      flowchart: { htmlLabels: false },
      sequence: { useMaxWidth: false },
    }),
  );
  for (const file of (await readdir(input))
    .filter((f) => f.endsWith(".md"))
    .sort()) {
    const md = await readFile(new URL(file, input), "utf8");
    let block = 0;
    for (const match of md.matchAll(/```mermaid\s*\n([\s\S]*?)```/g)) {
      const id = `diagram-${results.length}`;
      const source = match[1];
      block++;
      const svg = await page.evaluate(
        async ({ id, source }) => {
          await window.mermaid.parse(source);
          return (await window.mermaid.render(id, source)).svg;
        },
        { id, source },
      );
      const name = `${file.replace(/\.md$/, "")}-${block}.svg`;
      if (!svg.includes("<svg")) throw new Error(`SVG üretilemedi: ${file}`);
      await writeFile(new URL(name, output), svg);
      results.push({ file, block, status: "PASS", svg: name });
    }
  }
} finally {
  await browser.close();
}
if (results.length !== 8)
  throw new Error(`8 diyagram bekleniyordu, bulunan: ${results.length}`);
await writeFile(
  new URL("../diagram-validation.json", output),
  JSON.stringify(
    { date: "2026-11-19", engine: "Mermaid 11.12.1 / Edge", results },
    null,
    2,
  ) + "\n",
);
console.log(
  `${results.length} Mermaid diyagramı ayrıştırıldı ve SVG olarak çizildi.`,
);
