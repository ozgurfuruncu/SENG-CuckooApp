import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import { withPreview } from "./with-preview.mjs";
const catalog = JSON.parse(
  await readFile(new URL("../handoff/screens.json", import.meta.url), "utf8"),
);
const output = new URL(
  "../../../docs/sprint-2-evidence/ozgur/screens/",
  import.meta.url,
);
await mkdir(output, { recursive: true });
const switchUser = (page, id) =>
  page.getByLabel("Örnek kullanıcı", { exact: true }).selectOption(id);
const navigate = async (page, path) => {
  await page.evaluate((p) => {
    location.hash = p;
  }, path);
  await page.waitForTimeout(70);
};
const confirm = (page) =>
  page
    .getByRole("dialog")
    .getByRole("button", { name: "İşlemi onayla" })
    .click();
const sourceHash = createHash("sha256");
for (const file of ["model.ts", "main.tsx", "styles.css", "tokens.css"])
  sourceHash.update((await readFile(new URL(`../src/${file}`, import.meta.url), "utf8")).replace(/\r\n/g, "\n"));
const results = [];
await withPreview(async (url) => {
  const browser = await chromium.launch({
    channel: process.env.PROTOTYPE_BROWSER || "msedge",
  });
  try {
    for (const viewport of catalog.widths) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        isMobile: viewport.name === "mobil",
        hasTouch: viewport.name === "mobil",
      });
      const page = await context.newPage();
      for (const frame of catalog.frames) {
        const failures = [];
        const listener = (e) => failures.push(e.message);
        page.on("pageerror", listener);
        await page.goto(url);
        if (["login", "login-error"].includes(frame.state)) {
          if (frame.role === "worker")
            await page
              .getByLabel("Hazır örnek hesap")
              .selectOption("ece@example.test");
          if (frame.state === "login-error") {
            await page
              .getByLabel("Demo şifresi", { exact: true })
              .fill("yanlis");
            await page
              .getByRole("button", { name: "Giriş yap", exact: true })
              .click();
          }
        } else if (frame.state === "register") {
          await navigate(page, "/kayit");
        } else {
          await page
            .getByRole("button", { name: "Giriş yap", exact: true })
            .click();
          if (["revision", "complete"].includes(frame.state)) {
            await navigate(page, "/gorev/TASK-102/kanitlar");
            if (frame.state === "revision") {
              await page
                .getByLabel("İnceleme / düzeltme notu")
                .fill(
                  "Sol kapıdaki görünür ayrıntıyı bir örnek kareyle gösterir misin?",
                );
              await page.getByRole("button", { name: "Düzeltme iste" }).click();
            } else {
              await page
                .getByRole("button", { name: "Onayla ve tamamla" })
                .click();
              await confirm(page);
            }
          }
          if (["held", "evidence-error", "cancel"].includes(frame.state)) {
            await navigate(page, "/gorev/TASK-103");
            await page
              .getByRole("button", { name: "Simüle bekletmeyi kaydet" })
              .click();
            await confirm(page);
            if (frame.state === "cancel") {
              await page
                .getByRole("button", { name: "Görevi iptal et" })
                .click();
              await confirm(page);
            }
          }
          if (frame.role !== "employer") await switchUser(page, frame.role);
          await navigate(page, frame.route);
          if (frame.state === "hold-dialog")
            await page
              .getByRole("button", { name: "Simüle bekletmeyi kaydet" })
              .click();
          if (frame.state === "create-error")
            await page.getByRole("button", { name: "Görevi yayımla" }).click();
          if (frame.state === "evidence-error")
            await page
              .getByRole("button", { name: "Kanıtları gönder" })
              .click();
          if (frame.state === "empty-search")
            await page
              .getByRole("combobox", { name: "Şehir", exact: true })
              .selectOption("Antalya");
          if (frame.state === "applied") {
            await navigate(page, "/profil");
            await page
              .getByRole("combobox", { name: /^Çalışma şehri/ })
              .selectOption("Ankara");
            await page.getByRole("button", { name: "Profili kaydet" }).click();
            await navigate(page, frame.route);
            await page.getByRole("button", { name: "Başvuru gönder" }).click();
            await navigate(page, "/basvurular");
          }
          if (frame.state === "empty-applicants") {
            await page
              .getByLabel("Görev başlığı")
              .fill("Ümitköy · örnek fotoğraf görevi");
            await page
              .getByLabel("Açıklama", { exact: false })
              .fill(
                "İzinli park halindeki aracın dış görünümü için dört örnek fotoğraf.",
              );
            await page
              .getByLabel("Şehir", { exact: false })
              .selectOption("Ankara");
            await page.getByRole("checkbox").check();
            await page.getByRole("button", { name: "Görevi yayımla" }).click();
            await page
              .getByRole("link", { name: "Başvurular", exact: true })
              .click();
          }
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(80);
        if (failures.length)
          throw new Error(`${frame.id}: ${failures.join("; ")}`);
        const valid = await page.evaluate(() => ({
          fits:
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth,
          images: [...document.images].every(
            (i) => i.complete && i.naturalWidth > 0,
          ),
        }));
        if (!valid.fits || !valid.images)
          throw new Error(
            `${frame.id}/${viewport.name}: ${JSON.stringify(valid)}`,
          );
        const filename = `${frame.id}-${viewport.name}`;
        await page.screenshot({
          path: fileURLToPath(new URL(`${filename}.png`, output)),
          fullPage: true,
        });
        const html = await page.evaluate(() => {
          const doc = document.documentElement.cloneNode(true);
          doc
            .querySelectorAll(
              'script,link[rel="stylesheet"],link[rel="modulepreload"],meta[http-equiv="Content-Security-Policy"]',
            )
            .forEach((e) => e.remove());
          const originals = [
            ...document.querySelectorAll("input,textarea,select"),
          ];
          doc.querySelectorAll("input,textarea,select").forEach((el, i) => {
            const original = originals[i];
            if (el.tagName === "INPUT") {
              el.setAttribute("value", original.value);
              el.toggleAttribute("checked", original.checked);
            } else if (el.tagName === "TEXTAREA")
              el.textContent = original.value;
            else
              el.querySelectorAll("option").forEach((o) =>
                o.toggleAttribute("selected", o.value === original.value),
              );
          });
          const style = document.createElement("style");
          style.textContent = [...document.styleSheets]
            .map((s) => [...s.cssRules].map((r) => r.cssText).join("\n"))
            .join("\n");
          doc.querySelector("head").append(style);
          return "<!doctype html>\n" + doc.outerHTML;
        });
        let inline = html;
        for (const match of html.matchAll(
          /src="(\/assets\/vehicle-[^"]+\.svg)"/g,
        )) {
          const asset = await readFile(
            new URL(`../public${match[1]}`, import.meta.url),
          );
          inline = inline.replaceAll(
            match[0],
            `src="data:image/svg+xml;base64,${asset.toString("base64")}"`,
          );
        }
        await writeFile(new URL(`${filename}.html`, output), inline.replace(/[ \t]+$/gm, "").trimEnd() + "\n");
        results.push({
          ...frame,
          viewport: viewport.name,
          width: viewport.width,
          height: viewport.height,
          observedRoute: new URL(page.url()).hash,
          png: `${filename}.png`,
          html: `${filename}.html`,
          ...valid,
        });
        page.off("pageerror", listener);
      }
      await context.close();
    }
  } finally {
    await browser.close();
  }
});
await writeFile(
  new URL("../capture-manifest.json", output),
  JSON.stringify(
    {
      date: "2026-11-19",
      sourceSha256: sourceHash.digest("hex"),
      note: "Gerçek yerel Edge ekran yakalamaları. HTML donmuş aktarım kaynağıdır; Figma dosyası veya doğrulanmış import değildir.",
      results,
    },
    null,
    2,
  ) + "\n",
);
const links = results
  .map(
    (r) =>
      `<li><a href="screens/${r.html}">${r.id} · ${r.name} · ${r.viewport} (${r.width}px)</a> · <a href="screens/${r.png}">PNG</a></li>`,
  )
  .join("\n");
await writeFile(
  new URL("../index.html", output),
  `<!doctype html><html lang="tr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cuckoo · Figma aktarım ekranları</title><style>body{font:16px/1.7 Arial,sans-serif;color:#142644;max-width:960px;margin:40px auto;padding:20px}a{color:#274f9f}li{margin-bottom:12px}</style><h1>Cuckoo · Sprint 2 ekran kataloğu</h1><p>30 ekran durumu, iki genişlik. HTML dosyaları donmuş tasarım aktarım kaynağıdır. Düzenlenebilir Figma dosyası henüz oluşturulmadı. Etkileşimli demo için prototypes/sprint-2 çalıştırılır.</p><ul>${links}</ul></html>`,
);
console.log(
  `${results.length} ekran: PNG, bağımsız HTML, manifest ve aktarım kataloğu kaydedildi.`,
);
