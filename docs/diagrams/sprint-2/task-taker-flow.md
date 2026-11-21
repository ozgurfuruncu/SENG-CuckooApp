# Görev alan kullanıcı akışı · Özgür katkısı

US-01/02, US-04–US-09, US-12/13. Yerel tasarım demosudur; çalışan üretim
ürünü yalnızca sağlık uç noktası ve web kabuğudur. Aynı görev iki örnek rol
arasında korunur. Şehir eşitliği zorunlu tutulmaz; bu bir ürün kararı değildir.

```mermaid
flowchart TD
    Giris["Giriş yap · US-01"] --> Gecerli{"Örnek hesap bilgileri geçerli mi?"}
    Gecerli -- Hayır --> GirisHata["Hata göster; yeniden dene"]
    GirisHata --> Giris
    Gecerli -- Evet --> Profil["Çalışma şehri; isteğe bağlı meslek ve beceriler · US-02"]
    Profil --> Beyan["Bilgiler kendi beyanıdır; doğrulanmış yeterlilik değildir"]
    Beyan --> Kesfet["Açık araç fotoğrafı görevlerini keşfet · US-04"]
    Kesfet --> Filtre["Şehir / kategori ve yerel metin araması"]
    Filtre --> Sonuc{"Sonuç var mı?"}
    Sonuc -- Hayır --> Bos["Boş sonuç; filtreyi temizle veya değiştir"]
    Bos --> Filtre
    Sonuc -- Evet --> Detay["Görev ayrıntıları ve izin bağlamı · US-04"]
    Detay --> Sehir{"Çalışma şehri seçildi mi?"}
    Sehir -- Hayır --> Eksik["Başvuru kapalı; profili tamamla"]
    Eksik --> Profil
    Sehir -- Evet --> Uygun{"Görev açık ve daha önce başvurulmamış mı?"}
    Uygun -- Hayır --> Kapali["Tekrar başvuru / kapalı görev kullanılamaz; durum değişmez"]
    Uygun -- Evet --> Basvur["İsteğe bağlı notla bir kez başvur · US-05"]
    Basvur --> Bekle["Başvurularım: seçim bekleniyor"]
    Bekle --> Secim{"İşverenin kararı · US-06"}
    Secim -- Başka kişi seçildi --> Secilmedi["Seçilmedin; özel kanıt ve geçmiş kapalı · US-13"]
    Secim -- Görev iptal edildi --> Iptal["İptal durumu; yeni işlem kapalı"]
    Secim -- Sen atandın --> Atandi["ASSIGNED · Görev ve ödeme simülasyonu durumunu gör"]
    Atandi --> Tut{"HELD_SIMULATED kaydı var mı? · US-07"}
    Tut -- Hayır --> TutBekle["Kanıt gönderimi kapalı; işverenin simüle bekletmesini bekle"]
    TutBekle --> Tut
    Tut -- Evet --> Kanit["1–5 yerel örnek fotoğraf ve 10–2000 karakter not · US-08"]
    Kanit --> Dogrula{"Fotoğraf sayısı ve not geçerli mi?"}
    Dogrula -- Hayır --> KanitHata["Türkçe hata; kanıt veya durum değişmez"]
    KanitHata --> Kanit
    Dogrula -- Evet --> Gonder["EVIDENCE_SUBMITTED · Yalnızca görev sahibi ve atanmış görevli"]
    Gonder --> Inceleme{"İşveren incelemesi · US-09"}
    Inceleme -- Düzeltme istendi --> Duzelt["REVISION_REQUESTED · İnceleme notunu gör"]
    Duzelt --> Kanit
    Inceleme -- Onaylandı --> Tamam["COMPLETED ve RELEASED_SIMULATED · Gerçek para transferi yapılmaz"]
    Tamam --> Gecmis["Katılımcı görev geçmişi · US-12/13"]
    Detay --> Yasak["İlgisiz kullanıcı: özel fotoğraflar, notlar ve geçmiş görünmez · US-13"]
```

Figma düğümleri: `O01`, `G01`–`G11`, `O03`, `O04`.
[Ekran kataloğu](../../sprint-2-figma-handoff.md).
