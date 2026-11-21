# Sprint 2 · Özgür tasarım izlenebilirliği

Hikâye kimlikleri ve [GitHub eşlemesi](issue-index.md) değiştirilmedi.
Bu tablo **tasarım prototipi** kapsamıdır, üretim hikâye kabulü değildir.
Elif'in [SRS taslağı](sprint-2-srs.md)
ve [backlog taslağı](sprint-2-backlog.md)
incelendi; PR #38 ile develop'a alınan içerik değiştirilmeden korunur.

| Hikâye / mevcut issue | Ekran / yerel davranış | Taslak operasyonlar | Gerçek kontrol kaynağı |
| --- | --- | --- | --- |
| US-01 / [#1](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/1) | O01-I/G, O02, O04; örnek giriş, kayıt ve hata | registerUser, createSession, getMyProfile | Model oturum/kayıt negatifleri; tarayıcı giriş/kayıt testi |
| US-02 / [#2](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/2) | G02/G04; şehir önkoşulu, isteğe bağlı beyan | getMyProfile, updateMyProfile | Şehir eksik/alan sınırı testleri; iki rol akışı |
| US-03 / [#3](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/3) | E03–05; görev ve izin doğrulaması | createTask | Model 400/403/no-write; tarayıcı form ve izin reddi |
| US-04 / [#4](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/4) | G03/04/G10; açık görev, şehir/kategori, metin arama, boş sonuç | listTasks, getTask | Filtre/404/boş sonuç; tarayıcı arama |
| US-05 / [#5](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/5) | G04/05; tek başvuru ve not | applyForTask | Şehir/rol/tekrar/kapalı görev/not sınırı; UI başvuru |
| US-06 / [#6](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/6) | E06–08; boş başvuru, tek seçim; G05/G11 atama durumu | listTaskApplications, assignTask | Sahiplik/yanlış başvuru/tekrar atama; UI seçim |
| US-07 / [#7](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/7) | E09, G06/G11; ayrı simüle bekletme | simulatePaymentHold | Sahiplik/durum/tekrar; UI eksik bekletme |
| US-08 / [#8](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/8) | G07–09; 1–5 örnek, 10–2000 not, yeniden gönderim | submitTaskEvidence, listTaskEvidence | Yanlış aktör/bekletme/sayı/not; tam tarayıcı yolculuğu |
| US-09 / [#9](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/9) | E10/11, G09; inceleme, revizyon, eski gönderim notu | reviewTaskEvidence, submitTaskEvidence | Sahiplik/durum/not sınırı; UI revizyon döngüsü |
| US-10 / [#10](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/10) | E12; onay/tamamlama/simüle release tek adım | reviewTaskEvidence | Tek COMPLETED olayı, ödeme sonucu ve tekrar conflict; UI son durum |
| US-11 / [#11](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/11) | E13; OPEN/ASSIGNED iptal, bekletme void | cancelTask | Terminal/yanlış durum/sahiplik; UI onay/iptal/Escape |
| US-12 / [#12](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/12) | O03; katılımcı geçmişi ve zaman çizelgesi | getTaskHistory | Olay sırası ve yetki; UI geçmiş |
| US-13 / [#13](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/13) | O05 ve tüm kanıt/geçmiş görünümleri | listTaskEvidence ve nesne kontrolleri | İlgisiz/aday/başka işveren reddi; DOM'da fotoğraf/not yokluğu |
| US-14/15 | Ertelendi; ekran ve operasyon eklenmedi | Yok | Katalog testi bu kimliklerin bulunmadığını kontrol eder |

Kod: [model testleri](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/76956d71e7eb13d95ef2c5aee558fbd17042b197/prototypes/sprint-2/tests/model.test.ts),
[tarayıcı testleri](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/76956d71e7eb13d95ef2c5aee558fbd17042b197/prototypes/sprint-2/tests/browser/journeys.spec.ts),
[doküman/sözleşme testleri](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/76956d71e7eb13d95ef2c5aee558fbd17042b197/prototypes/sprint-2/tests/docs.test.ts).
[Gerçek çalıştırmalar ve sınırları](sprint-2-ozgur-verification.md).

Mimari eşleme: US-06–10 → UML sequence; US-03/06–11 → iki UML durum makinesi;
US-01–13 → alan sınıfları ve beş modül; US-13 → her akışın katılımcı denetimi.
[Mimari anlatı ve diyagram bağlantıları](sprint-2-frontend-api-boundary.md).
Figma'daki gerçek frame/node URL'leri import sonrası bu tabloya eklenmelidir.
