import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { readFileSync } from "node:fs";
const axeSource = readFileSync(
  new URL("../../node_modules/axe-core/axe.min.js", import.meta.url),
  "utf8",
);
const login = async (page: Page, email = "deniz@example.test") => {
  await page.goto("/");
  await page.getByLabel("Hazır örnek hesap").selectOption(email);
  await page.getByRole("button", { name: "Giriş yap", exact: true }).click();
};
const role = async (page: Page, id: string) => {
  await page.getByLabel("Örnek kullanıcı", { exact: true }).selectOption(id);
};
const confirm = async (page: Page) => {
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "İşlemi onayla" })
    .click();
};
const route = async (page: Page, path: string) => {
  await page.evaluate((p) => {
    location.hash = p;
  }, path);
  await page.waitForTimeout(80);
};
async function accessible(page: Page) {
  await page.evaluate(axeSource);
  const violations = await page.evaluate(async () => {
    const win = window as unknown as {
      axe: {
        run: (
          node: Element,
          options: unknown,
        ) => Promise<{
          violations: {
            id: string;
            impact: string;
            nodes: { target: string[] }[];
          }[];
        }>;
      };
    };
    return (
      await win.axe.run(document.documentElement, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
      })
    ).violations;
  });
  expect(violations).toEqual([]);
}
async function fits(page: Page) {
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBeTruthy();
}
test("İki rol: oluştur, başvur, ata, beklet, kanıt, düzelt, onayla ve geçmiş", async ({
  page,
}) => {
  const errors: string[] = [];
  const network: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => {
    if (
      ["fetch", "xhr", "websocket"].includes(r.resourceType()) ||
      !r.url().startsWith("http://127.0.0.1:4174")
    )
      network.push(r.url());
  });
  await login(page);
  await page.locator(".button.light").hover();
  await accessible(page);
  await fits(page);
  await page.getByRole("link", { name: "Görev oluştur", exact: true }).click();
  await page.getByRole("button", { name: "Görevi yayımla" }).click();
  await expect(page.getByRole("alert")).toContainText("Başlık");
  await page.getByLabel("Görev başlığı").fill("Ankara · test fotoğraf görevi");
  await page
    .getByLabel("Açıklama", { exact: false })
    .fill(
      "İzinli park halindeki aracın dört dış açıdan fotoğraflarını istiyorum.",
    );
  await page.getByLabel("Şehir", { exact: false }).selectOption("Ankara");
  await page.getByRole("button", { name: "Görevi yayımla" }).click();
  await expect(page.getByRole("alert")).toContainText("izin");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Görevi yayımla" }).click();
  await expect(
    page.getByRole("heading", { name: "Ankara · test fotoğraf görevi" }),
  ).toBeVisible();
  await expect(page.getByRole("status")).toContainText("Görev oluşturuldu");
  const id = page.url().split("/gorev/")[1];
  await page.getByRole("link", { name: "Başvurular", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Henüz başvuru yok" }),
  ).toBeVisible();
  await role(page, "worker");
  await expect(page.getByText("Başvuru listesi yalnızca")).toBeVisible();
  await route(page, `/gorev/${id}`);
  await expect(
    page.getByRole("button", { name: "Başvuru gönder" }),
  ).toBeDisabled();
  await page.getByRole("link", { name: "Çalışma şehrini seç" }).click();
  await page
    .getByRole("combobox", { name: /^Çalışma şehri/ })
    .selectOption("Ankara");
  await page.getByRole("button", { name: "Profili kaydet" }).click();
  await expect(page.getByRole("status")).toContainText("Profil kaydedildi");
  await route(page, `/gorev/${id}`);
  await page
    .getByLabel("Başvuru notu")
    .fill("İzinli örnek fotoğrafları çekebilirim.");
  await page.getByRole("button", { name: "Başvuru gönder" }).click();
  await expect(
    page.getByText("Başvurun alındı. İşverenin seçimi bekleniyor."),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Başvuru gönder" }),
  ).toHaveCount(0);
  await route(page, "/basvurular");
  await expect(
    page.getByText("Başvurun alındı · Seçim bekleniyor"),
  ).toBeVisible();
  await role(page, "employer");
  await route(page, `/gorev/${id}/basvurular`);
  await page.getByRole("button", { name: "Görevli olarak seç" }).click();
  await confirm(page);
  await expect(
    page.getByRole("button", { name: "Görevli olarak seç" }),
  ).toBeDisabled();
  await role(page, "worker");
  await route(page, `/gorev/${id}/kanitlar`);
  await expect(
    page.getByRole("button", { name: "Kanıtları gönder" }),
  ).toBeDisabled();
  await expect(page.getByText("Göndermek için önce")).toBeVisible();
  await role(page, "employer");
  await page.getByRole("button", { name: "Simüle bekletmeyi kaydet" }).click();
  await confirm(page);
  await expect(
    page.getByRole("button", { name: "Simüle bekletmeyi kaydet" }),
  ).toBeDisabled();
  await role(page, "worker");
  await page.getByRole("button", { name: "Kanıtları gönder" }).click();
  await expect(page.getByRole("alert")).toContainText("1–5");
  await page.getByLabel("Önden görünüm", { exact: true }).check();
  await page.getByRole("button", { name: "Kanıtları gönder" }).click();
  await expect(page.getByRole("alert")).toContainText("Kanıt notu");
  await page
    .getByLabel("Kanıt notları")
    .fill("Örnek fotoğraf ve dış görünüm notları.");
  await page.getByRole("button", { name: "Kanıtları gönder" }).click();
  await expect(
    page.getByRole("heading", { name: "Kanıtlar gönderildi" }),
  ).toBeVisible();
  await role(page, "other");
  await expect(
    page.getByRole("heading", { name: "Bu kanıtlar sana kapalı" }),
  ).toBeVisible();
  await expect(page.locator(".photo-grid img")).toHaveCount(0);
  await expect(
    page.getByText("Örnek fotoğraf ve dış görünüm notları.", { exact: true }),
  ).toHaveCount(0);
  await route(page, `/gorev/${id}/gecmis`);
  await expect(
    page.getByText("İşlem geçmişi yalnızca görev katılımcılarına açık."),
  ).toBeVisible();
  await role(page, "employer");
  await route(page, `/gorev/${id}/kanitlar`);
  await page
    .getByLabel("İnceleme / düzeltme notu")
    .fill("Sol görünümü de ekle.");
  await page.getByRole("button", { name: "Düzeltme iste" }).click();
  await expect(page.getByText("Düzeltme istendi:")).toContainText(
    "Sol görünümü de ekle.",
  );
  await expect(
    page.getByRole("button", { name: "Görevi iptal et" }),
  ).toBeDisabled();
  await accessible(page);
  await role(page, "worker");
  await page.getByLabel("Önden görünüm", { exact: true }).check();
  await page.getByLabel("Sol yandan görünüm", { exact: true }).check();
  await page
    .getByLabel("Kanıt notları")
    .fill("Sol görünüm eklendi; izinli örnekler tamam.");
  await page.getByRole("button", { name: "Düzeltilmiş kanıtı gönder" }).click();
  await expect(page.getByText("2. gönderim", { exact: false })).toBeVisible();
  await role(page, "employer");
  await page.getByRole("button", { name: "Onayla ve tamamla" }).click();
  await expect(page.getByRole("dialog")).toContainText(
    "Gerçek para transferi yapılmaz",
  );
  await confirm(page);
  await expect(
    page.getByRole("heading", { name: "Görev tamamlandı!" }),
  ).toBeVisible();
  await expect(page.locator(".task-summary")).toContainText(
    "Simüle ödeme serbest bırakıldı",
  );
  await expect(
    page.getByRole("button", { name: "Onayla ve tamamla" }),
  ).toBeDisabled();
  await fits(page);
  await page.getByRole("link", { name: "İşlem geçmişi", exact: true }).click();
  await expect(page.locator(".timeline")).toContainText(
    "Sol görünümü de ekle.",
  );
  await expect(page.locator(".timeline")).toContainText(
    "görev tamamlandı ve simüle ödeme serbest bırakıldı",
  );
  await accessible(page);
  await fits(page);
  expect(errors).toEqual([]);
  expect(network).toEqual([]);
});
test("İptal, simüle bekletme iptali ve onay penceresinin klavye davranışı", async ({
  page,
}) => {
  await login(page);
  await route(page, "/gorev/TASK-103");
  await page.getByRole("button", { name: "Simüle bekletmeyi kaydet" }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "Simüle bekletmeyi kaydet" }).click();
  await confirm(page);
  await page.getByRole("button", { name: "Görevi iptal et" }).click();
  await accessible(page);
  await confirm(page);
  await expect(page.locator(".task-summary")).toContainText(
    "Simüle bekletme iptal edildi",
  );
  await expect(
    page.getByRole("button", { name: "Görevi iptal et" }),
  ).toBeDisabled();
  await fits(page);
});
test("Giriş hatası, kayıt, filtreler, boş sonuç ve mahrem geçmiş", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("Demo şifresi", { exact: true }).fill("yanlis");
  await page.getByRole("button", { name: "Giriş yap", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("hatalı");
  await accessible(page);
  await page.getByRole("link", { name: "Kayıt ol", exact: true }).click();
  await page.getByLabel("E-posta", { exact: true }).fill("yeni@example.test");
  await page.getByLabel("Demo şifresi", { exact: true }).fill("Demo1234!");
  await page.getByLabel("Hesap türü").selectOption("TASK_TAKER");
  await page.getByRole("button", { name: "Örnek hesap oluştur" }).click();
  await expect(
    page.getByRole("heading", { name: "Profilim", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Görevleri keşfet", exact: true })
    .first()
    .click();
  await page
    .getByRole("combobox", { name: "Şehir", exact: true })
    .selectOption("Antalya");
  await expect(
    page.getByRole("heading", { name: "Bu filtrelerde görev bulunamadı" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Filtreleri temizle" }).click();
  await page.getByLabel("Görev ara", { exact: true }).fill("çankaya");
  await expect(page.getByRole("article")).toHaveCount(1);
  await route(page, "/gecmis");
  await expect(
    page.getByRole("heading", { name: "Görüntülenebilecek görev geçmişi yok" }),
  ).toBeVisible();
  await accessible(page);
  await fits(page);
});
test("Hazır ekranlar, özel kanıt, gezinme, fotoğraf yükleme ve yatay taşma", async ({
  page,
}) => {
  await login(page);
  for (const path of [
    "/panel",
    "/gorevler",
    "/yeni",
    "/profil",
    "/gecmis",
    "/gorev/TASK-101",
    "/gorev/TASK-101/basvurular",
    "/gorev/TASK-102/kanitlar",
    "/gorev/TASK-104/kanitlar",
    "/gorev/TASK-102/gecmis",
    "/gorev/missing",
  ]) {
    await route(page, path);
    await expect(page.locator("main")).toBeVisible();
    await fits(page);
    expect(
      await page
        .locator("img")
        .evaluateAll((images) =>
          images.every(
            (i) =>
              (i as HTMLImageElement).complete &&
              (i as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    ).toBeTruthy();
    await accessible(page);
  }
  await role(page, "worker");
  for (const path of [
    "/profil",
    "/gorevler",
    "/basvurular",
    "/gecmis",
    "/gorev/TASK-101",
    "/gorev/TASK-103/kanitlar",
    "/gorev/TASK-106/kanitlar",
  ]) {
    await route(page, path);
    await fits(page);
    await accessible(page);
  }
  await expect(page.locator('input[type="file"]')).toHaveCount(0);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Giriş yap", exact: true }),
  ).toBeVisible();
});
test("320 px, tablet ve masaüstünde formlar ve inceleme taşmaz; çıkış erişilebilir", async ({
  page,
}) => {
  await login(page);
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of [
      "/panel",
      "/yeni",
      "/profil",
      "/gorev/TASK-102/kanitlar",
    ]) {
      await route(page, path);
      await fits(page);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page
    .getByRole("button", { name: "Çıkış yap", exact: true })
    .filter({ visible: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Giriş yap", exact: true }),
  ).toBeVisible();
});
