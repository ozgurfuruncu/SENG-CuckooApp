import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, dirname, relative, extname } from "node:path";
import { parse } from "yaml";
import { MockAdapter, statusLabels, paymentLabels } from "../src/model.ts";
const root = fileURLToPath(new URL("../../../", import.meta.url));
const prototype = resolve(root, "prototypes/sprint-2");
async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? walk(resolve(dir, e.name)) : [resolve(dir, e.name)],
      ),
    )
  ).flat();
}
test("all new Markdown links resolve to repository files; external sources use https", async () => {
  const files = [
    ...(await walk(resolve(root, "docs/diagrams/sprint-2-ozgur"))),
    ...(await readdir(resolve(root, "docs")))
      .filter((f) =>
        /^sprint-2-(frontend-api-boundary|figma-handoff|ozgur)/.test(f),
      )
      .map((f) => resolve(root, "docs", f)),
    resolve(root, "docs/submissions/sprint-2-ozgur.md"),
    resolve(prototype, "README.md"),
  ].filter((f) => extname(f) === ".md");
  let count = 0;
  for (const file of files) {
    const md = await readFile(file, "utf8");
    for (const m of md.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
      const target = m[1];
      if (target.startsWith("#")) continue;
      if (/^https:\/\//.test(target)) continue;
      assert.ok(!/^\w+:/.test(target), `${file}: unexpected URI ${target}`);
      const path = resolve(
        dirname(file),
        decodeURIComponent(target.split("#")[0]),
      );
      assert.ok(
        !relative(root, path).startsWith(".."),
        `${target} escapes repository`,
      );
      await stat(path);
      count++;
    }
  }
  assert.ok(count > 35, `only ${count} local links checked`);
});
test("prototype source has no business network, uploads or persistent data APIs", async () => {
  for (const file of await walk(resolve(prototype, "src"))) {
    const src = (await readFile(file, "utf8")).replaceAll(
      "http://www.w3.org/2000/svg",
      "",
    );
    assert.doesNotMatch(
      src,
      /\bfetch\s*\(|\baxios\b|XMLHttpRequest|\bWebSocket\b|sendBeacon|localStorage|sessionStorage|indexedDB|type=["']file["']|https?:\/\//,
      file,
    );
  }
  const html = await readFile(resolve(prototype, "index.html"), "utf8");
  assert.match(html, /<html lang="tr">/);
  assert.match(html, /form-action 'none'/);
});
test("all draft business operation IDs have local equivalents; task/payment enums are stable", async () => {
  const contract = parse(
    await readFile(resolve(root, "api/openapi.yaml"), "utf8"),
  );
  const operations = Object.values(contract.paths)
    .flatMap((p) => Object.values(p as object))
    .filter(
      (o): o is { operationId: string } =>
        !!o && typeof o === "object" && "operationId" in o,
    )
    .map((o) => o.operationId)
    .filter((o) => o !== "getHealth");
  const a = new MockAdapter();
  assert.deepEqual(Object.keys(statusLabels), contract.components.schemas.TaskStatus.enum);
  assert.deepEqual(Object.keys(paymentLabels), contract.components.schemas.PaymentSimulationStatus.enum);
  for (const op of operations)
    assert.equal(
      typeof (a as unknown as Record<string, unknown>)[op],
      "function",
      op,
    );
  assert.equal(operations.length, 16);
  const catalog = JSON.parse(
    await readFile(resolve(prototype, "handoff/screens.json"), "utf8"),
  );
  const ids = catalog.frames.map((f: { id: string }) => f.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(ids.length, 30);
  const stories = new Set(
    catalog.frames.flatMap((f: { stories: string[] }) => f.stories),
  );
  for (let i = 1; i <= 13; i++)
    assert.ok(stories.has(`US-${String(i).padStart(2, "0")}`));
  assert.ok(!stories.has("US-14") && !stories.has("US-15"));
  const csv = await readFile(
    resolve(prototype, "handoff/connections.csv"),
    "utf8",
  );
  for (const line of csv.trim().split("\n").slice(1)) {
    const [from, , to] = line.split(",");
    assert.ok(ids.includes(from) && ids.includes(to), line);
  }
});
test("all captured screens have valid matching source fingerprint and both widths", async () => {
  const { createHash } = await import("node:crypto");
  const hash = createHash("sha256");
  for (const f of ["model.ts", "main.tsx", "styles.css", "tokens.css"])
    hash.update((await readFile(resolve(prototype, "src", f), "utf8")).replace(/\r\n/g, "\n"));
  const evidence = resolve(root, "docs/sprint-2-evidence/ozgur");
  const manifest = JSON.parse(
    await readFile(resolve(evidence, "capture-manifest.json"), "utf8"),
  );
  assert.equal(manifest.sourceSha256, hash.digest("hex"));
  assert.equal(manifest.results.length, 60);
  for (const frame of manifest.results) {
    assert.ok(frame.fits && frame.images);
    await stat(resolve(evidence, "screens", frame.png));
    const html = await readFile(
      resolve(evidence, "screens", frame.html),
      "utf8",
    );
    assert.ok(!/<script|src="\/assets/.test(html));
  }
});
