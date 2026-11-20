import { expect, test, type Page } from "@playwright/test";

async function switchAccount(page: Page, account: string) {
  await page.getByLabel("Demo hesabı seç").selectOption(account);
}

async function openTask(page: Page, title: RegExp) {
  await page.getByRole("main").getByRole("link", { name: title }).click();
}

test("keeps the employer form unavailable when signed out or using a task taker account", async ({
  page,
}) => {
  await page.goto("/employer/tasks/new");
  const main = page.getByRole("main");
  await expect(main.getByText("Bir demo hesabı seçin")).toBeVisible();
  await expect(main.getByLabel("Görev başlığı")).toHaveCount(0);

  await main.getByRole("button", { name: "Görev Alan demosunu dene" }).click();
  await expect(page).toHaveURL(/\/taker$/);
  await page.goBack();
  await expect(main.getByText("Bu ekran işverenlere yöneliktir")).toBeVisible();
  await expect(main.getByLabel("Görev başlığı")).toHaveCount(0);

  await main.getByRole("button", { name: "İşveren demosunu dene" }).click();
  await expect(page).toHaveURL(/\/employer$/);
  await expect(main.getByRole("link", { name: /Görev oluştur/ })).toBeVisible();
});

test("creates a demo account, rejects an unknown login, and preserves the account through logout", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Giriş yap" }).click();
  await page.getByLabel("E-posta adresi").fill("bilinmeyen@example.test");
  await page.getByLabel("Parola", { exact: true }).fill("Demo1234!");
  await page.getByRole("button", { name: "Giriş yap" }).click();
  await expect(page.getByRole("alert")).toHaveText(/Demo hesabı bulunamadı/);
  await expect(page).toHaveURL(/\/signin$/);
  await expect(page.getByLabel("Demo hesabı seç")).toHaveValue("");

  await page.getByRole("link", { name: "Kayıt ol" }).click();
  await page.getByLabel("E-posta adresi").fill("deneme@example.test");
  await page.getByLabel("Parola", { exact: true }).fill("Demo1234!");
  await page.getByLabel("Hesap türü").selectOption("TASK_TAKER");
  await page.getByRole("button", { name: "Kayıt ol" }).click();
  await expect(page).toHaveURL(/\/taker$/);
  await expect(page.getByRole("heading", { name: "Görevlerim" })).toBeVisible();
  const viewer = page.getByLabel("Demo hesabı seç");
  await expect(viewer).not.toHaveValue("");
  const accountId = await viewer.inputValue();

  await page.getByRole("button", { name: "Çıkış yap", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Cuckoo’ya hoş geldiniz!" }),
  ).toBeVisible();
  await expect(viewer).toHaveValue("");
  await page.getByRole("link", { name: "Giriş yap" }).click();
  await page.getByLabel("E-posta adresi").fill("deneme@example.test");
  await page.getByLabel("Parola", { exact: true }).fill("Demo1234!");
  await page.getByRole("button", { name: "Giriş yap" }).click();
  await expect(page).toHaveURL(/\/taker$/);
  await expect(viewer).toHaveValue(accountId);
});

test("filters discovery by city and recovers a blocked application through the self-declared profile", async ({
  page,
}) => {
  await page.goto("/");
  await switchAccount(page, "u-ece");
  await page
    .getByRole("main")
    .getByRole("link", { name: "Görev bul" })
    .first()
    .click();
  const main = page.getByRole("main");
  const city = main.getByLabel("Şehir", { exact: true });
  await city.selectOption("Bursa");
  await expect(
    main.getByText("Bu şehirde başvuruya açık görev yok"),
  ).toBeVisible();
  await main.getByRole("button", { name: "Şehir filtresini temizle" }).click();
  await expect(city).toHaveValue("");
  await expect(main.getByRole("link", { name: /mavi suv/i })).toBeVisible();
  await city.selectOption("Ankara");
  await expect(main.getByRole("link", { name: /mavi suv/i })).toHaveCount(0);
  await openTask(page, /Beyaz sedanın dış fotoğrafları/);

  await main.getByRole("button", { name: "Göreve başvur" }).click();
  await expect(main.getByRole("alert")).toHaveText(/çalışma şehrinizi ekleyin/);
  await expect(
    main.getByRole("heading", { name: "Başvuru gönderildi" }),
  ).toHaveCount(0);
  await main.getByRole("link", { name: "Profili düzenle" }).click();
  await expect(main.getByText("Kendi beyanı", { exact: true })).toHaveCount(3);
  await main.getByLabel("Çalışma şehri").selectOption("Ankara");
  await main.getByLabel("Meslek").fill("Öğrenci");
  await main.getByLabel("Beceriler").fill("Fotoğraf çekimi, Gözlem");
  await main.getByRole("button", { name: "Profili kaydet" }).click();
  await expect(main.getByText("Profil kaydedildi.")).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\/taker\/tasks\/t-ankara$/);
  await main.getByLabel("Başvuru notu").fill("Öğleden sonra gidebilirim.");
  await main.getByRole("button", { name: "Göreve başvur" }).click();
  await expect(
    main.getByRole("heading", { name: "Başvuru gönderildi" }),
  ).toBeVisible();
  await expect(main.getByRole("link", { name: "Profili düzenle" })).toHaveCount(
    0,
  );
});

test("shows empty applicants and preserves state on cancellation abort and duplicate confirmation", async ({
  page,
}) => {
  await page.goto("/");
  await switchAccount(page, "u-kerem");
  await openTask(page, /Kırmızı kupenin ön fotoğrafları/);
  await expect(
    page.getByRole("heading", { name: "Başvurular (0)" }),
  ).toBeVisible();
  await expect(page.getByText("Henüz başvuru yok")).toBeVisible();

  await page.getByRole("link", { name: "Görevlerime dön" }).click();
  await switchAccount(page, "u-deniz");
  await openTask(page, /Çankaya'da arka tampon fotoğrafları/);
  const history = page.getByLabel("Görev geçmişi").getByRole("listitem");
  const beforeCount = await history.count();
  const cancel = page.getByRole("button", { name: "Görevi iptal et" });
  await expect(page.getByText("Simüle ödeme · Bekletiliyor")).toBeVisible();
  await cancel.click();
  await expect(page.getByText("Bu görev iptal edilsin mi?")).toBeVisible();
  await page.getByRole("button", { name: "Vazgeç" }).click();
  await expect(cancel).toBeVisible();
  await expect(history).toHaveCount(beforeCount);
  await expect(page.getByText("Simüle ödeme · Bekletiliyor")).toBeVisible();

  await cancel.click();
  const confirm = page.getByRole("button", { name: "İptali onayla" });
  await confirm.click();
  await expect(
    page.getByText("Simüle ödeme · Bekletme iptal edildi"),
  ).toBeVisible();
  await expect(history).toHaveCount(beforeCount + 2);
  await page.getByRole("button", { name: "Yeniden iptal et" }).click();
  await confirm.click();
  await expect(page.getByRole("alert")).toHaveText(
    /Bu görev zaten iptal edildi/,
  );
  await expect(history).toHaveCount(beforeCount + 2);
});

test("keeps the evidence form open for invalid photo and note input, then accepts the corrected submission", async ({
  page,
}) => {
  await page.goto("/");
  await switchAccount(page, "u-mert");
  await openTask(page, /Çankaya'da arka tampon fotoğrafları/);
  await page.getByRole("link", { name: "Kanıt gönder" }).click();
  const submit = page.getByRole("button", { name: "Kanıt gönder" });
  const notes = page.getByLabel("Gözle görülen ayrıntılar");
  await notes.fill("Kısa");
  await submit.click();
  await expect(page).toHaveURL(/\/taker\/tasks\/t-cankaya\/evidence$/);
  await expect(page.locator("#photos-error")).toHaveText(
    "1–5 örnek fotoğraf seçin.",
  );
  await expect(page.locator("#evidence-notes-error")).toHaveText(
    "Gözlem notu 10–2.000 karakter olmalı.",
  );
  await expect(notes).toHaveValue("Kısa");

  await page
    .getByRole("group", { name: "Örnek fotoğraflar" })
    .getByRole("checkbox", { name: "Arka görünüm" })
    .check();
  await notes.fill("Arka tamponun görünümü kaydedildi.");
  await submit.click();
  await expect(page).toHaveURL(/\/taker\/tasks\/t-cankaya$/);
  await expect(
    page.getByText("Arka tamponun görünümü kaydedildi."),
  ).toBeVisible();
});
