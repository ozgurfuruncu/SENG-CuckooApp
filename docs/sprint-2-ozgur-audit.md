# Sprint 2 · Özgür nihai gereksinim denetimi

19 Kasım 2026. Ana kaynak [sprint-2-plan.md](sprint-2-plan.md) son doğrulama
öncesi yeniden okunup bu tabloyla karşılaştırıldı. COMPLETE yerel katkının
uygulanıp doğrulandığını ifade eder; üretim iş hikâyesi veya ekip kabulü değildir.
Figma zorunluluğu açık kalır. [Teslim indeksi](submissions/sprint-2-ozgur.md).

| Requirement | Status | Evidence | Remaining Work |
| --- | --- | --- | --- |
| Plan, backlog, issue/RACI, API, ADR, storyboard ve mevcut işlerin incelenmesi | COMPLETE | [Kaynak ve sınır](sprint-2-frontend-api-boundary.md), [trace](sprint-2-ozgur-traceability.md) | Elif'in taslak içerikleri değiştirilmeden korunur |
| İşveren yolculuğunun etkileşimli Türkçe temsili | COMPLETE | [Demo](../prototypes/sprint-2/README.md), E01–E13, tarayıcı tam yolculuk testi | Figma karşılığı aşağıda açık |
| Görev alan yolculuğu; şehir, başvuru, kanıt ve revizyon | COMPLETE | G01–G11; aynı görevde iki rol testi | Figma karşılığı ve PO kabulü açık |
| Responsive, doğrulama, boş/hata/başarı, kapalı eylemler | COMPLETE | [60 gerçek ekran](sprint-2-evidence/ozgur/index.html); 320/390/768/1440 px kontrolleri | Gerçek cihaz/Safari/insan kullanılabilirlik testi yok |
| Özel kanıt/geçmiş ve simüle ödeme etiketleri | COMPLETE | US-13 negatif model/UI testleri | Gerçek backend güvenliği kanıtı değildir |
| Lovable'da bağımsız UI üretimi/iterasyonu · planlanan araç yolu | BLOCKED | [Erişim kaydı](sprint-2-figma-handoff.md) | Özgür hesabını bağlar; ayrı projeyi hazır bağlamla oluşturup aynı akışı doğrular |
| Temsilî html.to.design import denemesi · zorunlu hazırlık | PARTIAL | E10 iki genişlikte hazır; [adımlar](sprint-2-figma-handoff.md) | Uzantıyla Capture Preview; katman/font/Auto Layout denetimi ve gerçek URL |
| Düzenlenebilir Türkçe Figma frame'leri · ZORUNLU | BLOCKED | HTML/PNG kaynakları hazır; gerçek Figma dosyası yok | Özgür hesabını bağlar/Design dosyası açar; import eder veya yeniden kurar |
| Figma ortak bileşen/stiller · ZORUNLU | PARTIAL | [Bileşen yapısı ve token tablosu](sprint-2-figma-handoff.md) | Gerçek dosyada component/variant/style oluştur ve temizle |
| Figma'da iki başlangıç, bağlantılar ve çalışan akış · ZORUNLU | BLOCKED | O01-I/O01-G; [CSV](../prototypes/sprint-2/handoff/connections.csv) | Bağla; iki yolu ve revizyonu Play ile doğrula; flow URL'lerini ekle |
| Reviewer erişimi ve PO/QA yolculuk kabulü · ZORUNLU | BLOCKED | Gerçek erişim/inceleme sonucu yok | Elif/Jumanah hesaplarıyla açar; gerçek gözlem ve onay kaynağı kaydedilir |
| Türkçe işveren/görev alan diyagramları ve US işaretleri · ZORUNLU | COMPLETE | [İşveren](diagrams/sprint-2-ozgur/employer-flow.md), [görev alan](diagrams/sprint-2-ozgur/task-taker-flow.md), render logu | Figma'ya düğüm/vektör aktarımı dış servis işi olarak açık |
| React/FastAPI sınırı ve mevcut/önerilen ayrımı · ZORUNLU FI katkısı | COMPLETE | [FI mimari belgesi](sprint-2-frontend-api-boundary.md) | Emmanuel/Emir inceler; API kararlarını PO/TL/QA uzlaştırır |
| C4 Container/Component, UML sequence/state/domain katkıları · ZORUNLU ortak iş | COMPLETE | [7 kaynak dosyası / 8 Mermaid blok](sprint-2-evidence/ozgur/diagram-validation.json) | Ortak mimari kabulü TL'ye aittir; mevcut ADR/context değişmedi |
| SRS/backlog ve kalite işine FI danışmanlığı | COMPLETE | Story/operation/screen/test eşlemesi ve varsayımlar | Başkalarının SRS/kalite hedefleri veya onayları doldurulmadı |
| Ayrı runnable snapshot ve ekran kanıtı · planda İSTEĞE BAĞLI | COMPLETE | [Prototip](../prototypes/sprint-2/README.md), kaynak hash'li 60 ekran | Kullanıcı bu oturumda yerel snapshot'u açıkça istedi |
| Özgür teslim indeksine teknik kanıt eklenmesi · ZORUNLU katkı | COMPLETE | [İndeks](submissions/sprint-2-ozgur.md), [gerçek loglar](sprint-2-evidence/ozgur/verification.json) | Aslı ekip indeksine birleştirir; Jumanah inceler; eksik URL/review eklenir |
| Feasible build/lint/type/unit/UI/diagram/link ve mevcut proje kontrolleri | COMPLETE | [Doğrulama](sprint-2-ozgur-verification.md) | Çevre engelleri aşağıda ayrı |
| Yerel PostgreSQL ve Compose smoke | BLOCKED | Backend 1 SKIP; Compose daemon yok | Emir/yerel kullanıcı Docker Linux engine veya izole test DB sağlar, kayıtlı komutları çalıştırır |
| Kaynak commit için mevcut production CI · PostgreSQL/Compose dahil | COMPLETE | [CI 44579229818](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/44579229818), beş job success, tam SHA `466e81c9023209f0a381ab716b243294e06393ca` | Prototipin ayrı testleri yerelde çalıştırıldı; insan kabulü/PR değildir |
| Feature dalına commit ve push · kullanıcı talebi | COMPLETE | [Gerçek push ve uzak ref kanıtı](sprint-2-evidence/ozgur/git-delivery.json); kaynak commit `466e81c` | Sonuç kanıtı aynı feature dalında ayrı doküman commit'iyle kaydedilir; PR/merge/tag yok |

Genel tamamlanma **tahminen %75**: bağımsız yerel işler tamamlanmıştır; zorunlu
düzenlenebilir Figma/iki flow/reviewer doğrulaması ve Lovable yolu açık kalır.
Bu resmî rubrik puanı veya ekip kabul oranı değildir. Git teslimi tamamlandığında
son rapor gerçek hash/push sonucunu verir. Yeni PR, merge, Sprint 2 release tag'i
veya Sprint 1 tag değişikliği yapılmaz.
