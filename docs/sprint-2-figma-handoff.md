# Sprint 2 · Figma ve Lovable aktarım paketi

19 Kasım 2026 · Özgür Furuncuoğlu · **Hazırlık tamam; dış servis teslimi açık**.
[Plan](sprint-2-plan.md) düzenlenebilir Figma ekranlarını, iki başlangıç noktasını,
Türkçe akışları ve gerçek erişim kontrolünü zorunlu tutar. Yerel prototip isteğe
bağlı devam geliştirme çıktısıdır; tek başına bu Figma gereksinimini tamamlamaz.

20 Kasım güncellemesi · Lovable kaynak kodu `frontend/` içindeki Türkçe demoya
aktarıldı. Güncel ekranları bu önizlemeden veya Lovable projesinden aktarın.
Aşağıdaki 19 Kasım ekranları ilk prototipin tarihli kanıtıdır. Düzenlenebilir
Figma dosyası ve iki akış bağlantısı ekip teslimine eklenecek.
[Güncel entegrasyon ve ekranlar](sprint-2-lovable-integration.md) ·
[Güncel rota ve durum listesi](sprint-2-frontend-paths.md)

Çalışan web demosu, hesap seçimi ve sıfırlama ile iki rolü aynı görevde
denemeyi sağlar. Teslim edilecek Figma çerçeveleri beklenen ürün ekranlarını
gösterir. **Sprint 2 prototipi · Örnek veriler** demo üst çubuğunu ve kapladığı
boşluğu bu çerçevelerden kaldır. İnceleme ve kanıt akışının masaüstü ve mobil
referansları demo üst çubuğuyla kaydedilmiştir. [16 ekran görüntüsü](sprint-2-evidence/lovable-final)

## Klonlanan Figma dosyası için son düzenleme

1. Masaüstü ve mobil çerçevelerden sarı demo üst çubuğunu, **DEMO** etiketini,
   **Görüntüleyen hesap** seçicisini ve **Demoyu sıfırla** düğmesini kaldır.
   İçeriği yukarı al. Uygulama gezinmesini, Türkçe metinleri ve simüle ödeme
   açıklamalarını koru.
2. **İşveren yolculuğu** ve **Görev Alan yolculuğu** için iki ayrı başlangıç
   noktası bağla. Ekran ve geçişleri [güncel rota listesi](sprint-2-frontend-paths.md)
   ile karşılaştır. Gerekçe hatası, düzeltme ve yeniden gönderim, fotoğraf sınırı,
   yetkisiz kanıt erişimi ve tamamlanma durumlarını koru. Rol değişimi yerine
   iki akış arasındaki devir noktalarını kullanıcı akışı diyagramında göster.
3. Başlangıçlardan iki akışı da oynat. Düzenlenebilir Figma dosyası ve iki akış
   bağlantısını kaydet, ekip erişimini doğrula ve güncel masaüstü ve mobil
   ekranları PNG olarak dışa aktar. Bağlantıları [teslim paketine](submissions/sprint-2.md)
   ekle.

## 19 Kasım erişim kaydı

Entegrasyon aramasında Figma ve Lovable bulundu ancak bu oturumda bağlı değiller.
Bağlantı seçenekleri kullanıcıya sunuldu. Bu nedenle hiçbir Lovable projesi,
Figma dosyası, düzenlenebilir katman, prototip akışı veya reviewer erişimi
oluşturulup doğrulanmadı. Tarayıcı otomasyonu yerel Edge ile çalışıyor; bu,
oturum açılmış Figma/Lovable hesabı veya html.to.design uzantısı erişimi sağlamaz.

| Dış çıktı | Gerçek URL | Durum |
| --- | --- | --- |
| Lovable bağımsız proje / preview | Yok | BLOCKED · bağlı hesap yok |
| Figma düzenlenebilir dosya | Yok | BLOCKED · bağlı hesap yok |
| İşveren Figma prototype flow | Yok | BLOCKED · gerçek akış oluşturulmadı |
| Görev alan Figma prototype flow | Yok | BLOCKED · gerçek akış oluşturulmadı |
| Capture Preview denemesi | Yok | PARTIAL · ekran kaynağı hazır, uzantı importu çalıştırılmadı |

## Hazır aktarım kaynakları

- [Etkileşimli yerel prototip ve kurulum](../prototypes/sprint-2/README.md).
- [30 Türkçe ekran durumu / story eşlemesi](../prototypes/sprint-2/handoff/screens.json).
- [Kaydedilmiş masaüstü ve mobil ekran kataloğu](sprint-2-evidence/ozgur/index.html):
  her durumun PNG'si ve CSS/görselleri içinde bağımsız HTML kopyası.
- [Yakalama manifesti](sprint-2-evidence/ozgur/capture-manifest.json): 1440×1000 ve
  390×844 viewport, gerçek rota, kaynak parmak izi, taşma/görsel yüklenme sonucu.
- [Bağlanacak ekranların CSV matrisi](../prototypes/sprint-2/handoff/connections.csv).
- [İşveren akışı](diagrams/sprint-2-ozgur/employer-flow.md),
  [görev alan akışı](diagrams/sprint-2-ozgur/task-taker-flow.md),
  [çizilmiş SVG diyagramları](sprint-2-evidence/ozgur/diagrams).

HTML kopyaları donmuş tasarım kaynaklarıdır; etkileşim çalıştırmaz ve `.fig`
dosyası değildir. PNG referansıdır, düzenlenebilirlik kanıtı değildir. SVG
diyagramları vektördür; Figma'da düğümleri ortak bileşenlere dönüştürmek gerekir.

## Temsili ekranla gerçek import denemesi

Güncel Lovable arayüzü için yukarıdaki rota ve durum listesini kullan.
19 Kasım prototipi için önceki deneme adımları aşağıdadır.

Önce `E10-Kanıtları incele` ekranını dene. Yerel demoda Deniz ile giriş yapıp
`#/gorev/TASK-102/kanitlar` aç. Masaüstü ve mobil boyutta kontrol et. Bağlı bir
Lovable hesabı varsa ayrı proje aç; [mevcut Türkçe bağlamı](sprint-2-lovable-context.md),
storyboard'u ve bu paketin kaynaklarını kullan. GitHub, backend ve ödeme
entegrasyonlarını kapalı tut. Preview'un aynı akışı çalıştırdığını yeniden test et.

1. Figma'da yeni **Design** dosyası aç; adı `Cuckoo · Sprint 2 · Takım 5` olsun.
2. html.to.design Figma eklentisini ve tarayıcı uzantısını aç. Lovable Preview'da
   uzantının **Capture Preview** komutunu kullan; yerel HTML aktarımında tarayıcıda
   render edilmiş sayfayı yakala. Yerel dosya kullanılıyorsa uzantıya dosya URL
   izni gerekebilir; alternatif olarak depo kökünde `python -m http.server 4175
   --bind 127.0.0.1` çalıştırıp `/docs/sprint-2-evidence/ozgur/index.html` aç.
3. Yakalamayı Figma'ya gönder/kopyala veya uzantının ürettiği `.h2d` dosyasını
   eklentiye aktar. Bu depodaki HTML'yi `.h2d` olarak yeniden adlandırma.
4. Metinlerin tek tek düzenlenebildiğini, fontların eşleştiğini, SVG'lerin
   kaybolmadığını ve kart/form/grid düzenini **iki genişlikte** denetle.
5. `E10 · Kanıtları incele · Masaüstü · US-08/09/13` ve mobil karşılığını adlandır.
   Sonucu, dosya/node URL'sini, tarihi ve gerçek inceleyeni kaydet. Import çok
   düzeltme istiyorsa çekirdek ekranları doğrudan Figma'da yeniden kur.

Bu import yolu [html.to.design resmi Lovable kılavuzundan](https://html.to.design/docs/from-lovable-to-figma)
19 Kasım 2026'da kontrol edildi. Buradaki hazırlık gerçek import denemesi değildir.

## Sayfalar, bileşenler ve stiller

Sayfalar: `00 · Başlangıç ve karar notları`, `01 · Ortak bileşenler`,
`02 · İşveren / Masaüstü`, `03 · Görev alan / Masaüstü`,
`04 · İşveren / Mobil`, `05 · Görev alan / Mobil`, `06 · Türkçe akışlar`.
Kataloğun `id` alanını koru; `<id> · <Türkçe ad> · <genişlik> · <US kimlikleri>`
çerçeve adı olarak kullanılır. `O01-I` ve `O01-G` ayrı giriş çerçeveleridir.

| Paylaşılan bileşen | Katman yapısı / varyantlar |
| --- | --- |
| Gezinme | Logo/kuş, rol, nav öğeleri, çıkış; masaüstü sidebar / mobil yatay gezinme |
| Uygulama üst çubuğu | Kırıntı ve avatar. Örnek hesap kontrolleri çalışan web demosunda yer alır. |
| Düğme | Ana, ikincil, tehlike, devre dışı; varsayılan/odak durumu |
| Form alanı | Etiket, isteğe bağlı/zorunlu notu, kontrol, yardımcı metin; hata varyantı |
| Görev kartı | Yerel çizim, kategori, durum etiketi, başlık, açıklama, şehir, örnek tutar, ayrıntı |
| Durum etiketi | Altı görev ve dört simüle ödeme durumu; renk yanında daima metin |
| Kanıt | Özel erişim notu, örnek fotoğraf grid'i, not, önceki gönderimler, inceleme eylemleri |
| Mesaj / boş durum | Bilgi, başarı, doğrulama, erişilemez; başlık ve sonraki eylem |
| Onay penceresi | Başlık, açıklama, vazgeç/onayla; atama, bekletme, iptal, tamamlama |

Stil kaynağı [tokens.css](../prototypes/sprint-2/src/tokens.css): lacivert
`#122B67`, mavi `#274F9F`, ana metin `#142644`, ikincil metin `#52617B`, zemin
`#F5F7FC`, kenarlık `#DFE5F0`, başarı `#216745`, uyarı `#785014`, hata `#902039`.
Arial/Segoe UI, temel gövde 16 px; ana kart yarıçapı 18 px, alan/düğme 10 px.
8 px tabanlı boşlukları Auto Layout ile temizle; genişlikleri sabit resim
olarak kilitleme. Metin stilleri başlık/gövde/etiket/yardımcı metin olarak ayrılır.

## Prototip bağlantıları ve iki başlangıç

CSV'deki her satır bir kontrol → hedef bağlantısıdır. Onay pencerelerini overlay,
görev/ödeme/uyarı değişikliklerini bileşen varyantları veya ayrı durum çerçeveleri
olarak bağla. Rol geçişleri sunum içindir; üretim ürününde rol değiştirme olarak
yorumlanmaz. Asenkron işveren/görev alan adımlarında sonraki örnek duruma açık
bir sunum bağlantısı ver; otomatik gerçek servis davranışı iddia etme.

İşveren: `O01-I → E01 → E03 → E05 → E06 → E08 → E09 → E10 → E11 → G09 → E10 → E12 → O03`.
Görev alan: `O01-G → G02 → G03 → G04 → G05 → G06 → G07 → E10 → G09 → E10 → E12 → O03`.
Alternatifler: `O04` giriş hatası, `E04` form hatası, `E07` boş başvuru,
`G08` kanıt hatası, `G10` boş keşif, `O05` erişim reddi ve `E13` iptal.
Her genişlik için aynı bağlantıları kur.

Prototype panelinde `O01-I` ve `O01-G` üzerine sırasıyla **İşveren yolculuğu** ve
**Görev alan yolculuğu** başlangıçlarını ekle. İki akışı Play ile baştan sona
çalıştır; revizyon ve erişim reddini de dene. Dosya paylaşımında gerçek ekip
inceleyicisinin erişimini ayrıca doğrula ve dosya ile iki flow URL'sini
[Özgür teslim kanıtına](submissions/sprint-2-ozgur.md) ekle.
[Figma'nın resmi akış kılavuzu](https://help.figma.com/hc/en-us/articles/360039823894-Create-and-manage-prototype-flows)
başlangıç/preview/paylaşım adımlarının kaynağıdır. Bu adımlar henüz uygulanmadı.
