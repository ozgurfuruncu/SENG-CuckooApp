# Atamadan tamamlamaya UML Sequence · öneri

US-06–US-10 ve US-13. Bu görünüm planlanan iş API'si sıralamasını gösterir.
Mevcut Sprint 2 prototipi örnek görev durumunu tarayıcı belleğinde tutar.
İşlemler [API taslağına](../../../api/openapi.yaml) dayanır. Prototipin medya
ve revizyon davranışları [tasarım kurallarında](../../sprint-2-evidence-decisions.md) kayıtlıdır.

```mermaid
sequenceDiagram
    actor I as İşveren
    actor G as Atanacak görevli
    participant W as React istemci
    participant A as FastAPI modüler monolit (öneri)
    participant D as PostgreSQL (önerilen iş tabloları)
    Note over W,D: Mevcut kapsam: tarayıcı içi Türkçe prototip ve sağlık uç noktası
    I->>W: Başvuruyu seç
    W->>A: assignTask(taskId, applicationId) + Bearer
    A->>A: Principal, görev sahibi, OPEN ve başvuru aidiyeti
    A->>D: İşlem: görev satırını koru ve tek atama yaz
    alt Yetkisiz / çakışan / geçersiz atama
        A-->>W: 403 / 409 / sözleşmedeki hata, kısmi yazım yok
        W-->>I: Türkçe hata ve güncel durum
    else Başarılı atama
        D-->>A: Commit: ASSIGNED
        A-->>W: Task
    end
    I->>W: Simüle bekletmeyi onayla
    W->>A: simulatePaymentHold(taskId)
    A->>D: Sahiplik ve ASSIGNED denetimi, HELD_SIMULATED
    A-->>W: Simüle durum, gerçek para transferi yok
    G->>W: Özel kanıt ve not gönder
    W->>A: submitTaskEvidence(taskId)
    A->>A: Atanmış kişi + bekletme + medya/not doğrulaması
    Note over A,D: Özel dosya erişim rotası, saklama ve boyut sınırları henüz kararlaştırılmadı
    A->>D: Kanıt metaverisi ve EVIDENCE_SUBMITTED (önerilen geçiş)
    I->>W: Kanıtları incele
    W->>A: listTaskEvidence(taskId)
    A->>A: Yalnızca görev sahibi / atanmış kişi (demo varsayımı)
    A-->>W: İzin verilen kanıt metaverisi
    opt Planlanan düzeltme döngüsü
        I->>W: Düzeltme iste
        Note over I,W: Prototipte düzeltme gerekçesi zorunludur
        W->>A: reviewTaskEvidence(REQUEST_REVISION)
        A->>D: REVISION_REQUESTED ve işlem kaydı
        G->>W: Düzelt ve yeniden gönder
        W->>A: submitTaskEvidence(taskId)
        A->>D: Yeni gönderim, EVIDENCE_SUBMITTED (öneri)
    end
    I->>W: Onayla ve tamamla
    W->>A: reviewTaskEvidence(APPROVE)
    A->>A: Görev sahibi + EVIDENCE_SUBMITTED + HELD_SIMULATED
    A->>D: Tek işlem: COMPLETED + RELEASED_SIMULATED + denetim olayı
    D-->>A: Commit veya tamamının geri alınması
    A-->>W: Tamamlanan görev veya sözleşmedeki hata
    W-->>I: Tamamlandı, gerçek para transferi yapılmaz
    Note over W,A: Tekrarlanan terminal işlem: 409, ilgisiz kullanıcının kanıt erişimi: 403
```
