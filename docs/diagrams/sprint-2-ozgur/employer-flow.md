# İşveren kullanıcı akışı · Özgür katkısı

US-01, US-03, US-06–US-13. Türkçe prototip davranışı; üretimde yalnızca sağlık
uç noktası ve web kabuğu çalışır. Gizlilik, iptal ve düzeltme politikalarının
ürün/API onayı beklenir. [Varsayımlar](../../sprint-2-frontend-api-boundary.md).

```mermaid
flowchart TD
    Giris["Giriş yap · US-01"] --> Kimlik{"Örnek bilgiler geçerli mi?"}
    Kimlik -- Hayır --> Hata["Hata göster; hesap oluşturma veya tekrar deneme"]
    Hata --> Giris
    Kimlik -- Evet --> Panel["İşveren paneli"]
    Panel --> Olustur["İzinli araç fotoğrafı görevi oluştur · US-03"]
    Olustur --> Kontrol{"Alanlar, tutar ve izin onayı geçerli mi?"}
    Kontrol -- Hayır --> FormHata["Türkçe doğrulama; görev oluşturulmaz"]
    FormHata --> Olustur
    Kontrol -- Evet --> Acik["OPEN · Başvuruya açık; simüle ödeme bekletilmedi"]
    Acik --> Basvurular["Başvuruları incele · yalnızca görev sahibi · US-06/13"]
    Basvurular --> Bos{"Başvuru var mı?"}
    Bos -- Hayır --> Bekle["Boş durum; başvurular bekleniyor"]
    Bekle --> Basvurular
    Bos -- Evet --> Sec["Bir görevli seç · US-06"]
    Sec --> Ata{"Görev açık ve başvuru bu göreve ait mi?"}
    Ata -- Hayır --> Cakisma["Çakışma; görev değişmez; güncel durumu kontrol et"]
    Cakisma --> Basvurular
    Ata -- Evet --> Atandi["ASSIGNED · Tek görevli atandı"]
    Atandi --> Tut["Simüle bekletmeyi kaydet · US-07"]
    Tut --> TutKontrol{"Görev sahibi, atanmış görev, daha önce bekletilmemiş mi?"}
    TutKontrol -- Hayır --> TutHata["Yetkisiz veya tekrarlanan işlem reddedilir; durum değişmez"]
    TutKontrol -- Evet --> Tutuldu["HELD_SIMULATED · Gerçek para transferi yapılmaz"]
    Tutuldu --> KanitBekle["Atanmış görevliden kanıt bekle · US-08"]
    KanitBekle --> Incele["EVIDENCE_SUBMITTED · Özel örnek fotoğraflar ve notlar · US-09/13"]
    Incele --> Karar{"Görev sahibinin kararı"}
    Karar -- Düzeltme iste --> Duzelt["REVISION_REQUESTED · İsteğe bağlı not · US-09"]
    Duzelt --> Yeniden["Atanmış görevli kanıtı düzeltir ve yeniden gönderir · US-08"]
    Yeniden --> Incele
    Karar -- Onayla ve tamamla --> Onay{"Gönderilmiş kanıt ve simüle bekletme var mı?"}
    Onay -- Hayır --> OnayHata["İşlem reddedilir; kısmi değişiklik yok"]
    Onay -- Evet --> Bitti["Tek işlem: COMPLETED ve RELEASED_SIMULATED · US-10"]
    Acik --> Iptal{"Görev sahibi iptali onaylıyor mu? · US-11"}
    Atandi --> Iptal
    Tutuldu --> Iptal
    Iptal -- Evet --> IptalSon["CANCELLED · Varsa bekletme VOIDED_SIMULATED"]
    Iptal -- Vazgeç --> Panel
    Bitti --> Gecmis["Yalnızca görev katılımcılarının geçmişi · US-12/13"]
    IptalSon --> Gecmis
    Gecmis --> SonKontrol["Tekrarlanan bitirme / iptal reddedilir; terminal durum korunur"]
    Panel --> Ozel["Başkasının kanıtı veya geçmişi: erişilemez · US-13"]
```

Figma düğümleri: `O01`, `E01`–`E13`, `O03`, `O04`.
[Ekran kataloğu ve bağlantılar](../../sprint-2-figma-handoff.md).
