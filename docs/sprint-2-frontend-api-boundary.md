# Sprint 2 · React / FastAPI sınırı · Özgür katkısı

19 Kasım 2026 · SENG 321 · Takım 5 · **İnceleme taslağı**.
Kaynak: [Sprint 2 planı](sprint-2-plan.md), [prototip bağlamı](sprint-2-lovable-context.md),
[ADR-001](decisions/ADR-001-architecture.md), [ADR-002](decisions/ADR-002-mvp-boundary.md),
[OpenAPI 0.2.1-draft](../api/openapi.yaml), [sözleşme açıkları](contract-reconciliation.md),
[RACI](team-raci.md). İlk kaynak: `559675effdb1cb451fa61f5d592de0ba2176df8b`;
son feature tabanı: `d0abe1745f685333ff3073ecd112ea829cdcccfe` (PR #38 sonrası).

## Mevcut durum ve öneri

Bu bölüm 19 Kasım tasarım anlık görüntüsünü açıklar. Güncel web demosu ve
API sınırı için [Lovable entegrasyon kaydına](sprint-2-lovable-integration.md) bakın.

`frontend/src/main.tsx` statik React/TypeScript kabuğudur; iş API'sine bağlanmaz.
`backend/app/main.py`, `/api/v1` altında yalnızca `GET /health` ve API belge
rotalarını sunar. Sağlık denetimi SQLAlchemy üzerinden `SELECT 1` çalıştırır;
veritabanı erişilemezse sabit 503 gövdesi döner. Alembic yalnızca sürüm geçmişini
kurar; iş tabloları, kimlik doğrulama, dosya servisi veya ödeme altyapısı yoktur.

`prototypes/sprint-2` ayrı bir **tasarım demosudur**. Kendi package/lock, React
giriş noktası ve portu vardır; üretim frontend/backend/Docker dosyalarını kullanmaz.
`MockAdapter` tek tarayıcı sekmesinin belleğinde çalışır. Ağ, kalıcı depolama,
gerçek hesap, şifre saklama, gerçek fotoğraf yükleme veya ödeme sağlayıcısı yoktur.
Demo parola kısıtı gerçek kimlik doğrulama sözleşmesi değildir. Rol seçicisi QA
içindir; bir güvenlik mekanizması değildir. Paket ve yerel SVG/CSS dosyalarını
sunmak için yapılan statik HTTP istekleri iş API çağrısı sayılmaz. Geliştirmede
Vite'ın yerel HMR soketi vardır; ağsız iş akışı testi derlenmiş preview'da yapılır.

## Sorumluluklar

| Konu | React istemcisi / tasarım | FastAPI önerisi · uygulanmadı |
| --- | --- | --- |
| Ekran ve doğrulama | Türkçe alan adları, yerel form değerleri, anlaşılır hata, boş durum, işlem onayı, kullanılmayan eylemin gerekçesi | Pydantic ve iş doğrulaması; istemci verisine güvenilmez; sözleşmedeki 400/401/403/404/409 ayrımı |
| Kimlik / yetki | Rol uygun gezinme ve yetkisiz görünüm; gerçek token yok | Bearer principal doğrulaması, rol ve her nesnede sahiplik; kimlik/rol request body'den türetilmez |
| Görev sahipliği | İşverenin kendi görevlerini ve başvurularını göster | `employerId` principal'dan; atama, bekletme, inceleme ve iptalde sahiplik denetimi |
| Atama | Tek seçimi gösterir, tekrarlanan eylemi kapatır | Tek PostgreSQL işlemiyle tek kazanan; yarışan istek conflict, kısmi yazım yok |
| Kanıt | Yerel örnekleri seçer; sayı/not kontrolü; yalnızca görev sahibi/atanmış kişiye gösterir | Her metaveri ve dosya erişiminde nesne yetkisi; dosya türü/boyutu/depolama/rota/saklama henüz açık |
| Simüle ödeme | Tutarı örnek olarak etiketler; kart/banka alanı yok; görev ve ödeme durumlarını ayırır | Ayrı simülasyon durumu; onayda COMPLETED + RELEASED_SIMULATED + olay kaydı aynı işlemde |
| Geçmiş | Katılımcı görevleri ve güvenli olay metinlerini gösterir | Görünürlük ve redaksiyon matrisi incelenmeli; istemci tarafı filtreleme yetki sayılmaz |
| Hata / gecikme | Demo eşzamanlıdır; hatada giriş korunur ve durum değişmez | Gelecek istemci, istek sürerken tekrar gönderimi engellemeli; timeout sonrası sonucu yeniden okumalı, körlemesine mutasyon tekrarlamamalı |

## Ekran → sözleşme eşlemesi

Rotalar `/api/v1` tabanına göredir. Bu tablodaki iş operasyonlarının hiçbiri
prototip tarafından HTTP ile çağrılmaz. Arama ve örnek kullanıcı değiştirme
yalnızca demo yardımcılarıdır; yeni API operasyonu değildir.

| Hikâye | Ekran / eylem | Mevcut taslak operationId | Taslak HTTP rotası |
| --- | --- | --- | --- |
| US-01 | Kayıt / giriş | `registerUser`, `createSession` | POST `/auth/register`, POST `/auth/login` |
| US-01/02 | Profil | `getMyProfile`, `updateMyProfile` | GET/PATCH `/me` |
| US-03 | Görev oluştur | `createTask` | POST `/tasks` |
| US-04 | Liste / ayrıntı | `listTasks`, `getTask` | GET `/tasks`, GET `/tasks/{taskId}` |
| US-05 | Başvur | `applyForTask` | POST `/tasks/{taskId}/applications` |
| US-06 | Başvuruları incele / ata | `listTaskApplications`, `assignTask` | GET `/tasks/{taskId}/applications`, POST `/tasks/{taskId}/assignment` |
| US-07 | Simüle bekletme | `simulatePaymentHold` | POST `/tasks/{taskId}/payment-simulation/hold` |
| US-08/13 | Kanıt gönder / gör | `submitTaskEvidence`, `listTaskEvidence` | POST/GET `/tasks/{taskId}/evidence` |
| US-09/10 | Düzeltme iste / onayla ve tamamla | `reviewTaskEvidence` | POST `/tasks/{taskId}/review` |
| US-11 | İptal | `cancelTask` | POST `/tasks/{taskId}/cancel` |
| US-12/13 | İşlem geçmişi | `getTaskHistory` | GET `/tasks/{taskId}/history` |

Task, Profile, TaskApplication, EvidenceSubmission ve TaskEvent alanları taslakla
aynı adları taşır. Demo kullanıcısının adı/e-postası ve yerel SVG anahtarları
ayrı demo uzantılarıdır; `EvidenceSubmission` içine fotoğraf URL'si eklenmez.
`evidencePreviews` erişimi yeniden denetleyen yerel yardımcıdır. Başvuruların
ekrandaki durumu görev/atama durumundan türetilir; API'ye yeni status enum'u eklenmez.

## İstemci durumu

Tek `MockAdapter` oturum boyunca fixture'ları, görevleri, başvuruları, kanıt
metaverisini ve işlem olaylarını tutar. React `useSyncExternalStore` değişiklik
sayacını izler. Formlar yerel `useState`, gezinme hash URL kullanır. Liste ve
ayrıntı aynı kaynaktan okunur; iki rol arasında geçiş ilerlemeyi korur. Geri
dönen değerler kopyadır. Her mutasyon önce bütün kontrolleri yapar; başarısız
kontrolden sonra veri/olay yazılmaz. Onay, tamamlanma ve simüle serbest bırakma
tek senkron demo işlemi içindedir. Bunun gerçek veritabanı atomikliği veya
çoklu sekme/eşzamanlı kullanıcı kanıtı olduğu iddia edilmez. Yenileme veya
“Demoyu sıfırla” fixture'lara döner; localStorage/sessionStorage kullanılmaz.

## Prototip varsayımları ve karar sahipleri

Plan, bu sınırlarla demo üretimini açıkça ister. Aşağıdaki seçimler yalnızca
tasarım keşfini sağlar; iş API'si uygulamasına veya PO kararına dönüşmez.
Elif'in [karar taslağı](sprint-2-po-decisions.md)
`DEC-01`–`DEC-14` adlarını kullanır. PR #38'in develop'a alınması taslaktaki
bekleyen ürün kararlarını onaylanmış yapmaz. Bu katkı o dosyayı değiştirmez.

| Açık konu | Bu demodaki seçim | Sonraki karar / sahip |
| --- | --- | --- |
| DEC-01/11 · kanıt ve geçmiş | Yalnızca görev sahibi ve atanmış kişi; başvuru erişim sağlamaz | Elif + Emmanuel + Jumanah katılımcı/alan matrisini onaylar |
| DEC-02 · medya | 1–5 yerel SVG örneği; gerçek dosya/indirme yok | PO/TL/QA tür, boyut, saklama, erişim rotası ve fotoğraf izni kaydını belirler |
| DEC-03 · revizyon | Yalnızca gönderilmiş kanıttan; not isteğe bağlı; yeniden gönderim EVIDENCE_SUBMITTED | PO/TL/QA zorunlu not önerisini ve geçişi uzlaştırır; mevcut plan notu isteğe bağlı tutar |
| DEC-04/05 · sahiplik / atama | Görev sahibi tek başvuru seçer; diğer başvurular korunur, ekranda “başka kişi seçildi” türetilir | Emmanuel API açıklamalarını hikâyelerle uzlaştırır; yarış koşulu ileride PostgreSQL'de test edilir |
| DEC-06 · iptal | OPEN/ASSIGNED; varsa bekletme void; tekrarlanan terminal işlem conflict | PO/TL/QA taslak politikayı onaylar |
| DEC-07/08 · keşif ve şehir | Açık görevler; filtreler AND; metin araması yerel; şehir beyanı zorunlu fakat şehir eşitliği şart değil | Elif varsayılan görünürlüğü/şehir eşitliğini kararlaştırır; yeni API search parametresi eklenmez |
| DEC-09 · doğrulama | Metin trim; şehir/kanıt boş olamaz; yeni görev NOT_HELD/atanmamış; tutar ≥0; geçmiş tarih ayrıca yasaklanmaz | PO/TL/QA kesin boş/değer/precision/tarih politikasını uzlaştırır |
| DEC-10/12 · hesap / etiket | Demo şifresi ve `.test` adresi; oturum bellek içi; Türkçe simülasyon etiketi her ekranda | Gerçek token saklama/yenileme politikası ayrı güvenlik tasarımıdır |

## Mimari katkılar

Yeni, ayrı FI katkı dosyaları: [C4 Container](diagrams/sprint-2/c4-container.md),
[önerilen API Component](diagrams/sprint-2/api-components.md),
[UML Sequence](diagrams/sprint-2/assignment-sequence.md),
[UML State Machine](diagrams/sprint-2/lifecycle.md),
[UML Domain Class](diagrams/sprint-2/domain.md).
Emmanuel'in mimari hesap verebilirliği ve Emir'in dağıtım sorumluluğu korunur.
Mevcut sistem bağlamı, ADR'ler, API, RACI ve takım arkadaşlarının dosyaları
değiştirilmedi. Bu taslakların kabulü ve gelecek üretim uygulamasına aktarılması
gerçek ekip incelemesi gerektirir; bu inceleme henüz yapılmış sayılmaz.
