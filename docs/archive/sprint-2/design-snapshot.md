# Sprint 2 · Özgür teslim kanıtı

**SENG 321 · Takım 5 · 19 Kasım 2026 · İncelemeye hazır yerel katkı**.
[Depo](https://github.com/ozgurfuruncu/SENG-CuckooApp).
[Plan](../../sprint-2-plan.md) ve [nihai kapsam denetimi](requirements-audit.md).
Bu belge Özgür'ün katkı indeksidir; Aslı'nın ekip teslim paketini veya
Jumanah'nın kabul/kanıt incelemesini tamamlanmış göstermez.

## Altı sorumluluk ve bu katkının sınırı

| Kişi / rol | Plandaki sorumluluk | Bu katkıdaki durum |
| --- | --- | --- |
| Elif Nur Akbaş · PO | SRS/backlog anlaşması, iki yolculuğun kabulü | Ayrı taslaklar incelendi; dosyaları değiştirilmedi; onay beklenir |
| Aslı Arıkoğlu · SM | Refinement/plan koordinasyonu, takım teslim indeksinin birleştirilmesi | Bu indeks ona aktarılabilir; takım adına plan/kapasite/teslim tarihi doldurulmadı |
| Emmanuel Alabi · TL | Mimari A/R, OpenAPI uzlaşması | FI mimari taslakları eklendi; son mimari/API onayı iddia edilmez |
| Jumanah Almodaen · QA | Kalite A/R, test edilebilirlik ve gerçek teslim kanıtı kontrolü | Yerel gerçek loglar verilir; insan incelemesi yapılmış sayılmaz |
| Emir Dizman · DO | Runtime/deployment, mimari ve final tag/commit kanıtı | Docker/CI/etiket dosyaları değiştirilmedi; Sprint 1 tag'i korundu |
| Özgür Furuncuoğlu · FI | UI/Figma/akışlar, web/API sınırı, mimari ve teslim katkısı | Yerel prototip, akışlar, mimari taslaklar ve teknik kanıt hazır; dış servis adımları açık |

## Artefakt indeksi

| Çıktı | Gerçek kaynak / durum |
| --- | --- |
| Etkileşimli Türkçe prototip | [Kurulum ve tam iki rol gösterimi](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/76956d71e7eb13d95ef2c5aee558fbd17042b197/prototypes/sprint-2/README.md); ayrı `prototypes/sprint-2` paketi |
| Ekranlar ve navigasyon | [30 durum](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/76956d71e7eb13d95ef2c5aee558fbd17042b197/prototypes/sprint-2/handoff/screens.json), [bağlantılar](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/76956d71e7eb13d95ef2c5aee558fbd17042b197/prototypes/sprint-2/handoff/connections.csv) |
| Görsel kanıt | [60 ekran kataloğu](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/76956d71e7eb13d95ef2c5aee558fbd17042b197/docs/sprint-2-evidence/ozgur/index.html), [manifest](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/76956d71e7eb13d95ef2c5aee558fbd17042b197/docs/sprint-2-evidence/ozgur/capture-manifest.json) |
| Türkçe kullanıcı akışları | [İşveren](../../diagrams/sprint-2/employer-flow.md), [görev alan](../../diagrams/sprint-2/task-taker-flow.md) |
| Web/API anlatısı ve açık kararlar | [FI sınır belgesi](../../sprint-2-frontend-api-boundary.md) |
| C4 Container / Component | [Container](../../diagrams/sprint-2/c4-container.md), [önerilen API Component](../../diagrams/sprint-2/api-components.md) |
| UML | [Sequence](../../diagrams/sprint-2/assignment-sequence.md), [görev/ödeme durumları](../../diagrams/sprint-2/lifecycle.md), [Domain Class](../../diagrams/sprint-2/domain.md) |
| Diyagram render kanıtı | [8 Mermaid sonucu](../../logs/sprint-2/diagram-validation.json), [SVG'ler](../../diagrams/sprint-2/rendered) |
| Hikâye ve test eşlemesi | [US-01–13 izlenebilirlik](traceability.md); US-14/15 ertelendi |
| Gerçek yerel doğrulama | [Komutlar ve sonuçlar](verification.md), [makine raporu](../../logs/sprint-2/verification.json) |
| Lovable / Figma | [Aktarım adımları ve gerçek erişim durumu](../../sprint-2-figma-handoff.md); gerçek proje/dosya/flow URL'si yok |
| Tüm değişen/eklenen dosyalar | [Eksiksiz dosya manifesti](../../logs/sprint-2/files.txt) |
| Git teslimi | [Gerçek push/uzak ref/CI kaydı](../../logs/sprint-2/git-delivery.json); kaynak `466e81c9023209f0a381ab716b243294e06393ca` |

## Mevcut takım kaynakları

[Temel backlog](../../product-backlog.md), [issue index](../../issue-index.md),
[OpenAPI](../../../api/openapi.yaml), [RACI](../../team-raci.md),
[SDD](../../templates/SDD_WORKFLOW.md).
Planlama [PR #37](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/37)
ile `develop` commit `559675e`'ye taşınmıştı. Elif'in
[PR #38](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/38)
ile eklediği [SRS](../../sprint-2-srs.md),
[backlog](../../sprint-2-backlog.md)
ve [PO inceleme kontrolü](../../sprint-2-po-prototype-review.md)
okundu. Bu PR çalışma sırasında develop'a `d0abe17` olarak alınmıştı; feature
tabanı rebase ile ileri alındı ve Elif'in dokuz dosyası değiştirilmeden korundu.
Bu ajan PR oluşturmadı veya merge yapmadı; taslak ürün kararları onaylanmış
sayılmadı. QA'nın ayrı kalite
spesifikasyonu bu çalışma dalında yoktur; hedef veya ölçüm sonuçları uydurulmadı.

## İnceleme ve Git teslim durumu

Bu değişiklik için gerçek insan PO/TL/QA kabulü veya teammate review henüz yok.
Yerel test sonucu GitHub CI olarak sunulmaz. Kaynak commit `466e81c` için
[gerçek CI çalışması](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/44579229818)
tamamlandı; beş mevcut production job'u `success` olarak okundu. Bu workflow
ayrı prototip testlerini çalıştırmaz; onların sonuçları yerel loglardadır.
Önceki Sprint 1 başarıları bu değişikliğin testi sayılmaz.

Kullanıcı bu oturumda yeni `feature/ozgur-sprint-2` dalının `develop` üzerinden
oluşturulmasını açıkça seçti ve commit/push istedi. Kaynak commit
`466e81c9023209f0a381ab716b243294e06393ca` normal push ile gönderildi; GitHub
üzerinden uzak ref'in aynı SHA olduğu okundu. Bu sonucu kaydeden son doküman
commit'inin tam hash'i ve push sonucu son yürütme raporunda verilir.
`git log -1 --format=fuller` ve `git status --short --branch` ile okunabilir.
PR oluşturma, merge veya Sprint 2 tag'i bu görevin kapsamında yapılmaz.
Sprint 1 etiketi değiştirilmez. Ekip teslimindeki final tag ve gerçek reviewer
erişimi bu FI katkısının dışındaki sonraki teslim adımlarıdır.

Eksik Figma/Lovable adımları, gereken aktör ve tam yönergeler
[aktarım belgesinde](../../sprint-2-figma-handoff.md) ve
[denetim tablosunda](requirements-audit.md) kayıtlıdır.
