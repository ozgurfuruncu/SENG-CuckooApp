# Cuckoo · Sprint 2 yerel tasarım prototipi

Özgür Furuncuoğlu · SENG 321 · Takım 5. [Sprint 2 planı](../../docs/sprint-2-plan.md)
ve [storyboard](../../docs/diagrams/sprint-2-cuckoo-mockup.jpg) temel alınır.
Üretim uygulamasından ayrı React/TypeScript/Vite paketidir. Tüm iş akışları
kurgusal, bellek içi ve Türkçedir. Yenileme ilerlemeyi sıfırlar.

## Yerel çalıştırma

Node 24 veya üzeri. Windows PowerShell'de `npm.ps1` çalıştırma ilkesi sorunu
yaşamamak için `npm.cmd` kullanılır; macOS/Linux'ta aynı komutlarda `npm` yazılır.

```powershell
cd prototypes/sprint-2
npm.cmd ci
npm.cmd run dev
```

http://127.0.0.1:4174 adresini aç. Başka proje/servis başlatmak gerekmez.
Derlenmiş sürüm için `npm.cmd run build`, ardından `npm.cmd run preview`.

| Örnek kişi | Rol | E-posta | Hazır durum |
| --- | --- | --- | --- |
| Deniz Yılmaz | İşveren | deniz@example.test | TASK-101–104 sahibi |
| Ece Demir | Görev alan | ece@example.test | Şehir eksik; TASK-102–104'e atanmış |
| Arda Kaya | Görev alan | arda@example.test | Ankara beyanlı; TASK-101 başvurusu var |
| Selin Aydın | İlgisiz görev alan | selin@example.test | Gizlilik/boş geçmiş denemesi |
| Can Öztürk | Diğer işveren | can@example.test | Başka görevlerin sahibi |

Tümünde demo şifresi `Demo1234!`. Gerçek bilgiler girme. Yeni kayıt yalnızca
`.test` adresleri ve demo şifresini kabul eder. Şifre saklanmaz. Üstteki örnek
kullanıcı seçimi aynı görevi farklı rollerden izlemek içindir; ilerlemeyi korur.

## İki rol ile tam gösterim

1. Deniz ile giriş yap, **Görev oluştur** ekranında 5–150 karakter başlık,
   20–2.000 karakter açıklama, şehir, sıfır veya üzeri örnek tutar ve istenen
   kanıtı gir. İzin gerektiğini onayla ve yayımla. Başvuruların boş olduğunu gör.
2. Aynı görevde örnek kullanıcıyı Ece yap. Şehir eksikse başvuru kapalıdır.
   **Profilim** üzerinden şehri seç ve kaydet; isteğe bağlı meslek/becerileri
   düzenle. Görev bağlantısına dön ve başvur. **Başvurularım** seçim bekler.
3. Deniz'e geç; görevde **Başvurular** bölümünden Ece'yi seç ve onayla.
   Ece'nin kanıt alanı henüz kapalıdır. Deniz ile ayrı **Simüle bekletmeyi
   kaydet** işlemini onayla. Kart, banka veya gerçek para işlemi yoktur.
4. Ece'ye geç; **Kanıtlar** bölümünde 1–5 yerel örnek çizimi seç, 10–2.000
   karakter not yaz ve gönder. Gönderim sonrası yeni gönderim kullanılamaz.
5. Deniz'e geç; kanıtları incele, isteğe bağlı en fazla 500 karakter notla
   **Düzeltme iste**. Ece'ye geç, notu gör, yeniden örnek seçip düzeltmeyi gönder.
6. Deniz ile **Onayla ve tamamla** işlemini onayla. Görev tamamlanır ve simüle
   ödeme aynı adımda serbest bırakılır. İşlem geçmişi iki katılımcıya açıktır.
7. Selin'e geç; aynı görevin kanıt ve geçmişi erişilemez. Ayrı bir açık/atanmış
   görevde Deniz ile iptali dene; varsa simüle bekletmenin de iptal olduğunu gör.

Hazır kestirmeler: `#/gorev/TASK-101` başvurulu açık görev;
`#/gorev/TASK-102/kanitlar` işveren incelemesi; `#/gorev/TASK-103/kanitlar`
eksik bekletme; `#/gorev/TASK-104/kanitlar` tamamlanmış görev. Önce giriş yapılır.

## Ekranlar ve etkileşimler

İşveren: giriş/kayıt, panel, filtrelenebilir görevler, görev oluşturma ve
doğrulama, ayrıntı, boş/dolu başvuru listesi, tek atama ve onay penceresi,
simüle bekletme, özel kanıt galerisi/notlar, düzeltme, atomik onay/tamamlama,
uygun iptal ve görev geçmişi.

Görev alan: giriş/kayıt, profil ve çalışma şehri, isteğe bağlı meslek/beceriler,
açık görev arama/şehir/kategori filtresi, boş sonuç, görev ayrıntısı, başvuru,
başvuru/atama durumu, bekletme önkoşulu, örnek fotoğraf seçimi ve notlar,
doğrulama hataları, düzeltme ve yeniden gönderim, özel katılımcı geçmişi.

[30 ekran durumunun kataloğu](handoff/screens.json),
[Figma bağlantı matrisi](handoff/connections.csv),
[aktarılabilir ekranlar ve PNG'ler](../../docs/sprint-2-evidence/ozgur/index.html),
[Türkçe işveren akışı](../../docs/diagrams/sprint-2-ozgur/employer-flow.md),
[Türkçe görev alan akışı](../../docs/diagrams/sprint-2-ozgur/task-taker-flow.md),
[Figma/Lovable aktarımı](../../docs/sprint-2-figma-handoff.md).

## Kontroller

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
npm.cmd run test:browser
npm.cmd run test:diagrams
npm.cmd run capture
```

`npm test` model, negatif yetki/durum, sözleşme eşlemesi, yerel Markdown linkleri
ve ekran kaynağı parmak izini denetler. Ekranlar değişirse önce build/capture
yap. Tarayıcı testleri Edge'i kullanır; Edge yoksa Playwright Chromium kurup
`PROTOTYPE_BROWSER=chromium` ortam değişkenini ayarla. Windows örneği:
`$env:PROTOTYPE_BROWSER='chromium'`. `test:browser` preview sunucusunu kendisi
başlatıp kapatır. Aynı portta ayrıca dev/preview çalıştırma.

Test ve araç seçimi yalnızca bu ayrı prototipe aittir: Node yerleşik test
koşucusu, Playwright/Edge, axe-core, ESLint ve Mermaid. Üretim frontend'ine test
çerçevesi eklenmedi. [Gerçek sonuçlar](../../docs/sprint-2-ozgur-verification.md).

## Sınırlar

Gerçek kimlik doğrulama, token güvenliği, backend, dosya yükleme, ödeme,
kalıcı veri veya ağ hatası simülasyonu uygulanmaz. Bu tek sekmeli tasarım
demosu gerçek erişim güvenliği ya da veritabanı eşzamanlılık kanıtı değildir.
US-14/15, mesajlaşma, kimlik/meslek doğrulaması, sürüş/teslim ve profesyonel
inceleme kapsam dışıdır. Kesin medya, revizyon, iptal ve görünürlük politikaları
[sınır belgesinde](../../docs/sprint-2-frontend-api-boundary.md) açık tutulur.
Figma dosyası ve Lovable projesi oluşturulmuş sayılmaz.
