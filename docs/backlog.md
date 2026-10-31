# Cuckoo — Ürün Backlog'u (İlk Taslak)

> Bu liste GitHub Projects / Issues içine aktarılmak üzere hazırlandı. Her satır bir issue olabilir.
> Öncelikler MoSCoW'dur (Must / Should / Could); Won't = bu dönem yapılmayacak.
> Puanlar (SP) göreli büyüklük tahminidir (1-2-3-5-8) ve ekip planlama toplantısında gözden geçirilmelidir.
> Sprint sütunu bir **öneridir**; SRS (Sprint 2) sonrası kesinleşir.

## Nasıl kullanılır?

- Hikâye biçimi: **"<Rol> olarak <amaç> istiyorum, çünkü <fayda>."**
- Bir hikâye ancak **Definition of Done** sağlandığında "bitti" sayılır (en altta).
- Kabul kriterleri (KK) testlerin kaynağıdır: her KK için en az bir test yazılmalıdır.
- Bir hikâye bir sprintten büyükse bölünür (örn. 8 SP üzeri).

---

## Epic 0 — Proje Altyapısı (Teknik hikâyeler)

| ID | Hikâye | Kabul Kriterleri | Öncelik | SP | Sprint |
|----|--------|------------------|---------|----|--------|
| T-01 | Geliştirici olarak GitHub organizasyonunu ve depoyu kurmak istiyorum, çünkü tüm ekip aynı yerde çalışmalı. | Depo oluşturuldu; 6 üye eklendi; `LICENSE` (MIT) ve README mevcut. | Must | 1 | S1 |
| T-02 | Geliştirici olarak Git-Flow kurallarını tanımlamak istiyorum, çünkü kod kalitesi korunmalı. | `main` ve `develop` korumalı; PR için ≥1 onay; dal adlandırma (`feature/…`, `fix/…`) belgelendi. | Must | 2 | S1 |
| T-03 | Scrum Master olarak proje panosunu ve issue şablonlarını kurmak istiyorum. | Pano sütunları (Backlog / Sprint / Doing / Review / Done); hikâye ve hata şablonları var. | Must | 2 | S1 |
| T-04 | Takım olarak RACI matrisini hazırlamak istiyorum. | Her teslimat için R/A/C/I atanmış; belge `docs/` altında. | Must | 2 | S1 |
| T-05 | Mimar olarak taslak OpenAPI sözleşmesini yazmak istiyorum. | `docs/openapi.yaml` geçerli (validator'dan geçer). | Must | 3 | S1 |
| T-06 | DevOps olarak `docker compose up` ile tüm sistemi başlatmak istiyorum. | Temiz makinede tek komutla `db`, `backend`, `frontend` ayağa kalkar; fotoğraf volume'u yeniden başlatmada korunur. | Must | 3 | S1-S2 |
| T-07 | DevOps olarak GitHub Actions CI hattını kurmak istiyorum. | Her PR'da test çalışır; kapsam raporu üretilir; kapsam < %50 ise hat başarısız olur. | Must | 3 | S2 |
| T-08 | Mimar olarak teknoloji yığınını onaylamak istiyorum. | Karar `docs/` altında kısa bir ADR (karar kaydı) olarak yazıldı. | Must | 1 | S1 |
| T-09 | Kalite sorumlusu olarak SonarQube analizini kurmak istiyorum. | Final teslimde statik analiz raporu alınabiliyor. | Should | 3 | S4+ |

## Epic A — Hesap ve Roller

| ID | Hikâye | Kabul Kriterleri | Öncelik | SP | Sprint |
|----|--------|------------------|---------|----|--------|
| A-01 | Kullanıcı olarak e-posta ve şifreyle kayıt olmak, rolümü (işveren / işi kabul eden) ve şehrimi seçmek istiyorum. | Geçerli veriyle kayıt başarılı; aynı e-posta ile ikinci kayıt reddedilir; şifre ≥ 8 karakter; ADMIN rolü kayıtla alınamaz. | Must | 3 | S2 |
| A-02 | Kullanıcı olarak giriş yapmak istiyorum, çünkü ilanlarıma ve işlerime erişmeliyim. | Doğru bilgiyle token döner; yanlış şifrede 401; token süresi dolunca erişim reddedilir. | Must | 2 | S2 |
| A-03 | Kullanıcı olarak profilimi (ad, şehir, aldığım puan ortalaması) görmek istiyorum. | `/users/me` kendi bilgimi döner; başkasının e-postası görünmez. | Should | 2 | S3 |
| A-04 | Sistem olarak rol bazlı erişim kontrolü uygulamak istiyorum. | İşi kabul eden ilan açamaz (403); işveren işi kabul edemez (403). | Must | 2 | S2 |

## Epic B — İlan Yönetimi

| ID | Hikâye | Kabul Kriterleri | Öncelik | SP | Sprint |
|----|--------|------------------|---------|----|--------|
| B-01 | İşveren olarak başlık, açıklama, şehir, kategori ve ücretle ilan açmak istiyorum. | Zorunlu alanlar eksikse 422; ücret > 0; ilan `OPEN` durumunda oluşur; kategori 3 MVP kategorisinden biri. | Must | 3 | S2 |
| B-02 | İşi kabul eden olarak ilanları şehir ve kategoriye göre listelemek ve filtrelemek istiyorum. | Varsayılan sadece açık ilanlar; filtreler birlikte çalışır; sayfalama var; hedef < 2 sn. | Must | 3 | S2 |
| B-03 | Kullanıcı olarak bir ilanın detayını görmek istiyorum. | Var olmayan ilan 404 döner. | Must | 1 | S2 |
| B-04 | İşveren olarak ilanımı düzenlemek istiyorum. | Sadece sahibi ve sadece `OPEN` iken düzenleyebilir; aksi halde 403/409. | Must | 2 | S3 |
| B-05 | İşveren olarak ilanımı kapatmak istiyorum. | Sadece `OPEN` iken kapatılabilir; kapalı ilan listede görünmez. | Must | 1 | S3 |

## Epic C — İş Akışı, Kanıt ve Emanet Ödeme (Ürünün kalbi)

| ID | Hikâye | Kabul Kriterleri | Öncelik | SP | Sprint |
|----|--------|------------------|---------|----|--------|
| C-01 | İşi kabul eden olarak bir ilanı kabul etmek istiyorum. | `OPEN → ACCEPTED`; iş tek kişiye atanır (ikinci kabul 409); kendi şehrim dışındaki ilan için uyarı/engel (SRS'de netleşir). | Must | 3 | S3 |
| C-02 | Sistem olarak ücreti kabul anında emanete almak istiyorum (simüle). | Kabulde `HELD` durumunda ödeme kaydı oluşur; tutar ilan ücretine eşit. | Must | 3 | S3 |
| C-03 | İşi kabul eden olarak kanıt fotoğrafı yüklemek istiyorum. | Sadece atanan kişi yükler; jpg/png/webp kabul edilir, diğerleri 415; boyut sınırı var; durum `PROOF_UPLOADED` olur; dosya kalıcı volume'a yazılır. | Must | 5 | S3 |
| C-04 | İşveren olarak kanıtı inceleyip işi onaylamak ve ödemeyi serbest bırakmak istiyorum. | `PROOF_UPLOADED → COMPLETED`; ödeme `RELEASED` olur. | Must | 3 | S3 |
| C-05 | Sistem olarak fotoğraf yüklenmeden ödemenin serbest bırakılmasını engellemek istiyorum. | Fotoğrafsız onay denemesi 409 döner; **otomatik test** bunu doğrular (başarı ölçütü). | Must | 2 | S3 |
| C-06 | İşveren olarak ödeme ve iş durumunu görmek istiyorum. | İş durumu akışı doğru sırayla ilerler; geçersiz geçişler reddedilir. | Must | 2 | S3 |
| C-07 | Kullanıcı olarak yüklenen fotoğraflara sadece işin tarafları erişebilsin istiyorum. | Üçüncü kişi 403 alır (gizlilik riski önlemi). | Must | 2 | S3 |

## Epic D — İletişim ve İtibar

| ID | Hikâye | Kabul Kriterleri | Öncelik | SP | Sprint |
|----|--------|------------------|---------|----|--------|
| D-01 | İşveren veya işi kabul eden olarak iş içinde mesajlaşmak istiyorum. | Sadece işin iki tarafı okuyup yazabilir; mesajlar zaman sırasıyla gelir. | Should | 3 | S3-S4 |
| D-02 | Taraf olarak iş tamamlanınca karşı tarafı puanlamak (1-5) ve yorum bırakmak istiyorum. | Sadece `COMPLETED` işte; her taraf bir kez puanlar (tekrar 409); iki taraf da puanlayınca durum `RATED`. | Should | 3 | S4 |
| D-03 | Kullanıcı olarak başkasının puan ortalamasını ve yorumlarını görmek istiyorum. | Ortalama ve adet doğru hesaplanır. | Should | 2 | S4 |

## Epic E — Arayüz (Frontend)

| ID | Hikâye | Kabul Kriterleri | Öncelik | SP | Sprint |
|----|--------|------------------|---------|----|--------|
| E-01 | Kullanıcı olarak kayıt ve giriş ekranlarını kullanmak istiyorum. | Hatalar anlaşılır gösterilir; giriş sonrası token saklanır. | Must | 3 | S2 |
| E-02 | Kullanıcı olarak ilan listesi ve filtre ekranını görmek istiyorum. | Şehir ve kategori seçilebilir; boş liste mesajı var. | Must | 3 | S2 |
| E-03 | İşveren olarak ilan oluşturma formunu kullanmak istiyorum. | Doğrulama mesajları görünür. | Must | 3 | S2-S3 |
| E-04 | Taraflar olarak iş detay ekranında durumu, kanıtı ve eylemleri (kabul, yükle, onayla) görmek istiyorum. | Rol ve duruma göre doğru buton görünür. | Must | 5 | S3 |
| E-05 | Kullanıcı olarak mesaj kutusu ve puanlama ekranlarını kullanmak istiyorum. | D-01 ve D-02 ile uyumlu. | Should | 5 | S4 |

## Epic F — Sonraya Bırakılanlar

| ID | Hikâye | Öncelik | Not |
|----|--------|---------|-----|
| F-01 | İşveren olarak vekâlet verildi/alındı bilgisini iş kaydında tutmak istiyorum. | Could | Noter işlemi uygulama dışında; sadece takip alanı. |
| F-02 | Kullanıcı olarak yeni mesaj, kabul ve onay bildirimleri almak istiyorum. | Could | |
| F-03 | Yönetici olarak uygunsuz ilan ve kullanıcıları yönetmek, kategorileri düzenlemek istiyorum. | Could | Yönetici paneli. |
| F-04 | Gerçek ödeme sağlayıcısı entegrasyonu. | Won't | Bu dönem kapsam dışı; ödeme simüle. |
| F-05 | Harita/konum servisleri, mobil uygulama, resmî kimlik doğrulama. | Won't | Sistem sınırı dışında. |

---

## Önerilen sprint dağılımı (özet)

- **Sprint 1 (teslim 05.11.2026):** T-01 … T-06, T-08 — belgeler, depo, süreç, OpenAPI, Docker iskeleti.
- **Sprint 2:** SRS + A-01, A-02, A-04, B-01, B-02, B-03, E-01, E-02, T-07 — ilk dikey dilim.
- **Sprint 3:** C-01 … C-07, B-04, B-05, A-03, E-03, E-04 — ana kullanıcı yolculuğu (ilandan onaya).
- **Sprint 4:** D-01 … D-03, E-05 + hata düzeltme, E2E test, MVP teslimi (8. hafta sonu).
- **Sonrası:** Could maddeleri, T-09 (SonarQube), final teslim hazırlığı (10. hafta).

## Definition of Done (Bitti tanımı)

- [ ] Kabul kriterlerinin hepsi karşılandı ve testle doğrulandı.
- [ ] Kod PR ile `develop`'a girdi ve **en az bir kişi tarafından incelendi**.
- [ ] CI hattı yeşil; kapsam eşiği (%50) korunuyor.
- [ ] OpenAPI sözleşmesi güncel (API değiştiyse).
- [ ] `docker compose up` ile çalışmaya devam ediyor.
- [ ] İlgili issue kapatıldı ve panoda "Done" sütununda.
