# Sprint 2 · Özgür doğrulama kaydı

19 Kasım 2026 · Windows / PowerShell · Node 24.19.0 · Python 3.14.7 · Edge.
Makine sonuçları ve tam çıktılar [verification.json](sprint-2-evidence/ozgur/verification.json)
ve onun bağladığı loglardadır. Üretim kaynakları değiştirilmedi.

## Tekrarlanabilir komutlar ve sonuçlar

Prototip dizininde `npm.cmd run verify` bağımsız son kontrol turudur.
Backend için kökte `.tools/sprint2-python` yalıtılmış ortamı, kilitli
`backend/requirements.lock` ile kuruldu. Başka sistemde `PROTOTYPE_PYTHON`
ortam değişkenini kendi kurulu test Python'una ayarla. Python 3.12 takımın
CI sürümüdür; bu yerel Python 3.14 koşusu aynı ortam iddiasını taşımaz.

| Çalışma dizini | Komut | Gerçek sonuç |
| --- | --- | --- |
| `prototypes/sprint-2` | `npm.cmd run lint` | PASS · ESLint |
| `prototypes/sprint-2` | `npm.cmd run typecheck` | PASS · strict TypeScript, uygulama ve testler |
| `prototypes/sprint-2` | `npm.cmd run build` | PASS · Vite bundle |
| `prototypes/sprint-2` | `npm.cmd test` | PASS · 37 model + 4 doküman/sözleşme/ekran testi |
| `prototypes/sprint-2` | `npm.cmd run test:browser` | PASS · 10 Playwright/Edge senaryosu |
| `prototypes/sprint-2` | `npm.cmd run test:diagrams` | PASS · 8 Mermaid bloğu parse + SVG render |
| `prototypes/sprint-2` | `npm.cmd run capture` | PASS · 30 durum × 2 genişlik, 60 PNG + 60 bağımsız HTML |
| `frontend` | `npm.cmd run build` | PASS · mevcut üretim shell typecheck ve build |
| `tools/contract` | `npm.cmd run lint` | PASS · Redocly OpenAPI 3.1 |
| `tools/contract` | `npm.cmd test` | PASS · 7 mevcut sözleşme/YAML testi |
| `backend` | `../.tools/sprint2-python/Scripts/python.exe -m pytest --cov=app --cov-report=term-missing --cov-fail-under=50 --basetemp=../.audit/sprint2-pytest-final` | 13 PASS, 1 SKIP · %97,67 kapsam |
| Depo kökü | `.tools/sprint2-python/Scripts/python.exe scripts/compose_smoke.py` | BLOCKED · Docker daemon çalışmıyor |
| Depo kökü | `git diff --check` | PASS |

Son turda npm script'lerinin aynı araç giriş noktaları Node ile doğrudan
çalıştırılır; Windows'ta alt süreçlerin temiz kapanmasını sağlar. Tam argv ve
exit code her logda bulunur. Bir kontrol FAIL olursa `verify` başarısız çıkar;
Docker gibi kaydedilmiş çevre engeli BLOCKED olarak ayrılır.

## Tarayıcıda gerçekten doğrulananlar

- Görev oluşturma, zorunlu alan/izin reddi, başarılı oluşturma ve boş başvuru.
- Şehir eksikse başvuru kapalı; profil kaydı sonrası tek başvuru ve seçim bekleme.
- Tek atama; bekletme öncesi kanıt kapalı; simüle bekletme ayrı onaylanır.
- Fotoğraf sayısı/not hataları; kanıt gönderimi; başka kullanıcıda fotoğraf/not
  DOM'da yok; geçmiş ve başvurular özel.
- Revizyon notu, yeniden gönderim ve önceki notların korunması;
  onay/tamamlama/simüle release aynı adım; terminal eylemler kapalı.
- ASSIGNED iptali, simüle bekletmenin void olması, onay penceresinde Escape.
- Giriş hatası, kayıt, arama/filtre/boş sonuç, boş katılımcı geçmişi.
- Hazır iki rol ekranları, bulunamayan görev, yüklenmiş yerel çizimler.
- 1440 ve 390 px tam akış; ayrıca 320 ve 768 px panel/form/inceleme yerleşimi.
  Taşma kontrolü `scrollWidth <= documentElement.clientWidth` kullanır;
  mobilde büyüyen `innerWidth` ile sahte geçiş üretilmez.
- axe-core WCAG 2 A/AA ve 2.1 AA otomatik denetimleri: etiketler, kontrast,
  landmark ve erişilebilir isimler. Escape ve mobil çıkış da test edilir.
  Bu tam erişilebilirlik sertifikası değildir; insan klavye/okuyucu testi açıktır.
- Derlenmiş preview'da tam yolculuk sırasında fetch/XHR/WebSocket ve harici
  istekler sıfır. Kaynaklarda iş ağı/kalıcı depolama/dosya input'u yok;
  SVG XML namespace'i bir ağ çağrısı değildir.

[Tarayıcı özeti](sprint-2-evidence/ozgur/browser-summary.json),
[model testleri](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/76956d71e7eb13d95ef2c5aee558fbd17042b197/prototypes/sprint-2/tests/model.test.ts),
[UI testleri](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/76956d71e7eb13d95ef2c5aee558fbd17042b197/prototypes/sprint-2/tests/browser/journeys.spec.ts),
[doküman testleri](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/76956d71e7eb13d95ef2c5aee558fbd17042b197/prototypes/sprint-2/tests/docs.test.ts).

## Düzeltilip yeniden doğrulanan bulgular

İlk typecheck'teki olası boş kullanıcı kontrolü düzeltildi. İlk axe enjeksiyonu
CSP tarafından reddedildi; test, uygulama CSP'si gevşetilmeden tarayıcı
değerlendirme bağlamına taşındı. Mobil kullanıcı seçicisinin gizlenen etiketi
görünür yapıldı. Grid minimum içerik genişliği görev formunu viewport dışına
taşıyordu; grid minimumu ve alan daralması düzeltildi. Etiket sorguları yardımcı
metinleri hesaba katacak şekilde düzeltildi. Sequence notundaki noktalı virgül
Mermaid hatası giderildi. İlgili kontroller yeniden çalıştırıldı; önceki
başarısız sonuçlar başarı sayılmaz.

Son incelemede açık renk düğmenin hover durumundaki kontrastı düzeltildi;
bu durum da axe ile kontrol edilir. Görev oluşturma sonrası başarı mesajı
gezinmede korunur ve yeni ekranın başlığına odak taşınır. Kontroller yeniden
çalıştırıldı. Elif'in PR #38 dosyaları son tabana değişmeden alındı.

## Çevre ve doğrulama sınırları

Kaynak commit `466e81c9023209f0a381ab716b243294e06393ca` push edildikten sonra
[GitHub CI 44579229818](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/44579229818)
gerçekten tamamlandı: beş job'un tamamı `success` olarak okundu (backend,
Stack A backend, Stack A frontend, OpenAPI 3.1 validation, Stack A Compose smoke).
PostgreSQL ve Compose doğrulaması bu CI ortamında başarılıdır; yerel çevre
engelleri aşağıdaki gibi korunur. Bu mevcut workflow bağımsız prototip paketinin
testlerini çalıştırmaz; o paketin 41 + 10 test sonucu yerel loglardadır.
[Commit ve job URL'leri](sprint-2-evidence/ozgur/git-delivery.json).

PostgreSQL testi izole `BOOTSTRAP_TEST_DATABASE_URL` sağlanmadığı için atlandı;
SQLite tabanlı 13 test gerçek PostgreSQL veya yarışan atama kanıtı değildir.
Docker daemon yok; veri birimi silinmedi veya başka servise müdahale edilmedi.
Docker Desktop Linux engine açıldıktan sonra kökte `python scripts/compose_smoke.py`
çalıştırılabilir. PostgreSQL için boş bir test DB URL'si verilerek backend komutu
yeniden çalıştırılır; takım veritabanı kullanılmaz.

Figma/Lovable bağlı değil; canlı artifact, import editability, iki gerçek flow
ve reviewer erişimi doğrulanmadı. PNG/HTML/SVG hazırlığı bunların yerine geçmez.
İş uç noktaları, gerçek auth/token, gerçek medya güvenliği, PostgreSQL
atomikliği, çoklu kullanıcı yükü, retention ve ağ dayanıklılığı test edilmiş
ürün özelliği olarak sunulmaz. Gerçek ekip incelemesi/PO kabulü beklenir.
