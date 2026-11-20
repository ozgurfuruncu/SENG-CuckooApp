import { expect, test, type Page } from "@playwright/test";

const title = "Ankara araç fotoğrafı denemesi";
const evidence = "Ön ve arka görünümdeki ayrıntılar kaydedildi.";
const revision = "Arka tamponu daha yakından gösterin.";

async function switchAccount(page: Page, account: string) {
  await page.getByLabel("Demo hesabı seç").selectOption(account);
}

async function openReview(page: Page) {
  await page.getByRole("link", { name: "Kanıtları incele" }).click();
  await expect(
    page.getByRole("heading", { name: "Kanıtları incele" }),
  ).toBeVisible();
}

test("both demo roles complete a private evidence revision without business network calls", async ({
  page,
  baseURL,
}, testInfo) => {
  const unexpectedRequests: string[] = [];
  page.on("request", (request) => {
    const requestURL = new URL(request.url());
    if (
      requestURL.origin !== baseURL ||
      requestURL.pathname.startsWith("/api/") ||
      ["fetch", "xhr"].includes(request.resourceType())
    ) {
      unexpectedRequests.push(request.url());
    }
  });

  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
  await expect(
    page.getByRole("heading", { name: /Cuckoo’ya hoş geldiniz/i }),
  ).toBeVisible();
  await switchAccount(page, "u-deniz");
  await page
    .getByRole("main")
    .getByRole("link", { name: /Görev oluştur/ })
    .click();
  await page.getByLabel("Görev başlığı").fill(title);
  await page
    .getByLabel("Açıklama", { exact: true })
    .fill("Aracın dış görünümünü iki açıdan fotoğraflayın.");
  await page.getByLabel("Şehir", { exact: true }).selectOption("Ankara");
  await page.getByLabel("Önerilen tutar (₺)").fill("0");
  await page.getByLabel("İstenen kanıtlar").fill("Ön ve arka görünüm");
  await page.getByRole("button", { name: "Görevi yayınla" }).click();
  await expect(page.locator("#permissionConfirmed-error")).toBeVisible();
  await page.locator("#permissionConfirmed").check();
  await page.getByRole("button", { name: "Görevi yayınla" }).click();
  await expect(page.getByRole("heading", { name: title })).toBeVisible();

  await switchAccount(page, "u-sarah");
  await page.getByRole("button", { name: "Göreve başvur" }).click();
  await page.getByRole("button", { name: "Yeniden başvur" }).click();
  await expect(page.getByRole("alert")).toBeVisible();
  await switchAccount(page, "u-mert");
  await page.getByRole("button", { name: "Göreve başvur" }).click();
  await expect(page.getByText("Başvuru gönderildi.")).toBeVisible();
  await switchAccount(page, "u-deniz");
  await page.getByRole("button", { name: "Sarah Ahmed ata" }).click();
  await switchAccount(page, "u-sarah");
  await page.getByRole("link", { name: "Kanıt gönder" }).click();
  await page.getByRole("button", { name: "Kanıt gönder" }).click();
  await expect(page.getByRole("alert")).toBeVisible();

  await switchAccount(page, "u-deniz");
  await page.getByRole("button", { name: "Bekletmeyi kaydet" }).click();
  await switchAccount(page, "u-sarah");
  await page.getByRole("link", { name: "Kanıt gönder" }).click();
  const photos = page.locator("fieldset").getByRole("checkbox");
  await photos.nth(0).check();
  await photos.nth(1).check();
  await page.getByLabel("Gözle görülen ayrıntılar").fill(evidence);
  await page.getByRole("button", { name: "Kanıt gönder" }).click();
  await switchAccount(page, "u-deniz");
  await openReview(page);
  await expect(page.getByText(evidence)).toBeVisible();
  await expect(page.getByRole("main").getByRole("img")).toHaveCount(2);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(page.viewportSize()!.width);
  await page.screenshot({
    path: testInfo.outputPath("evidence-review.png"),
    fullPage: true,
  });

  await switchAccount(page, "u-mert");
  await expect(page.getByText("Görev başka bir kişiye atandı")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Açık görevleri gör" }),
  ).toBeVisible();
  await expect(page.getByText(evidence)).toHaveCount(0);
  await expect(page.getByLabel("Görev geçmişi")).toHaveCount(0);
  await switchAccount(page, "u-deniz");
  await openReview(page);
  await page.getByLabel("İnceleme notu").fill(revision);
  await page.getByRole("button", { name: "Düzeltme iste" }).click();
  await expect(page.getByText("Düzeltilmiş kanıt bekleniyor")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Onayla ve tamamla" }),
  ).toHaveCount(0);
  await switchAccount(page, "u-sarah");
  await expect(page.getByText(revision, { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Kanıtı düzelt" }).click();
  await page
    .getByLabel("Gözle görülen ayrıntılar")
    .fill("Arka tamponun yakın görünümü eklendi.");
  await photos.nth(4).check();
  await page.getByRole("button", { name: /Kanıtı yeniden gönder/ }).click();
  await switchAccount(page, "u-deniz");
  await openReview(page);
  await page.getByRole("button", { name: "Onayla ve tamamla" }).click();
  await expect(page).toHaveURL(/\/completed$/);
  await expect(
    page.getByText(/Gerçek para transferi yapılmaz/).first(),
  ).toBeVisible();
  await expect(
    page.getByText(/simüle ödeme serbest bırakıldı/i).first(),
  ).toBeVisible();
  await page.getByRole("link", { name: "Kanıt incelemesini gör" }).click();
  await expect(page.getByText("İnceleme tamamlandı")).toBeVisible();
  await expect(page.getByRole("button", { name: "Düzeltme iste" })).toHaveCount(
    0,
  );
  await switchAccount(page, "u-sarah");
  await expect(page.getByRole("link", { name: "Kanıt gönder" })).toHaveCount(0);
  expect(unexpectedRequests).toEqual([]);
});
