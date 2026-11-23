# Sprint 2 · React / FastAPI sınırı

SENG 321 · Takım 5

**Frontend ve entegrasyon:** Özgür Furuncuoğlu

Kaynak: [Sprint 2 planı](sprint-2-plan.md), [prototip bağlamı](sprint-2-lovable-context.md),
[ADR-001](decisions/ADR-001-architecture.md), [ADR-002](decisions/ADR-002-mvp-boundary.md),
[OpenAPI 0.2.1-draft](../api/openapi.yaml), [sözleşme açıkları](contract-reconciliation.md),
[RACI](team-raci.md). İlk kaynak: `559675effdb1cb451fa61f5d592de0ba2176df8b`;
son feature tabanı: `d0abe1745f685333ff3073ecd112ea829cdcccfe` (PR #38 sonrası).

## Mevcut durum ve öneri

`frontend/` React, TypeScript ve Vite ile Türkçe Sprint 2 web demosunu sunar.
Görev işlemleri ve rol değişimi kurgusal verilerle tarayıcı belleğinde çalışır.
[Lovable entegrasyon kaydı](sprint-2-lovable-integration.md)

`backend/app/main.py`, `/api/v1` altında yalnızca `GET /health` ve API belge
rotalarını sunar. Sağlık denetimi SQLAlchemy üzerinden `SELECT 1` çalıştırır;
veritabanı erişilemezse sabit 503 gövdesi döner. Alembic yalnızca sürüm geçmişini
kurar; iş tabloları, kimlik doğrulama, dosya servisi veya ödeme altyapısı yoktur.

`prototypes/sprint-2/` Figma dışa aktarımlarını ve bağımsız HTML önizlemelerini
içerir. Web demosundaki hesap seçici, iki kurgusal rolden aynı görevi
incelemeyi sağlar. [Prototipler](../prototypes/sprint-2/README.md)

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

Demo modelleri taslak API'nin görev, profil, başvuru, kanıt ve geçmiş
kavramlarını kullanır. Görüntü alanları ve örnek fotoğraf referansları
tarayıcıdaki demo verisine aittir.

## İstemci durumu

React bağlamı ve bellek içi demo durumu görevleri, başvuruları, kanıt
metaverisini ve işlem olaylarını tutar. TanStack Router ekranlar arası
gezinmeyi sağlar. Rol değişimi aynı sekmedeki görev durumunu korur.
Yenileme ve **Demoyu sıfırla** işlemi örnek başlangıç verilerini geri yükler.
Onay, tamamlanma ve simüle serbest bırakma tek demo işleminde gösterilir.
Veritabanı işlemleri ve eşzamanlılık kontrolleri iş API'si tasarımına aittir.
[Demo durum sağlayıcısı](../frontend/src/mock/store.tsx)

## 19 Kasım prototip varsayımları ve karar sahipleri

Aşağıdaki tablo 19 Kasım'daki tasarım keşfini ve
[karar taslağındaki](sprint-2-po-decisions.md) DEC kimliklerini kaydeder.
Güncel Sprint 2 demo kuralları için
[kanıt ve düzeltme kurallarına](sprint-2-evidence-decisions.md) bakın.

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

## Mimari görünümler

[C4 Container](diagrams/sprint-2/c4-container.md),
[önerilen API Component](diagrams/sprint-2/api-components.md),
[UML Sequence](diagrams/sprint-2/assignment-sequence.md),
[UML State Machine](diagrams/sprint-2/lifecycle.md),
[UML Domain Class](diagrams/sprint-2/domain.md).
Mimari ve çalışma ortamı sorumlulukları [takım RACI'sinde](team-raci.md) kayıtlıdır.
