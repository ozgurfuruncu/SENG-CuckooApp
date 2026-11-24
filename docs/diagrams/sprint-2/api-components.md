# Önerilen API Component görünümü

Beş iş sınırı tek FastAPI uygulamasında önerilen modüllerdir. Mevcut sağlık
denetimi `foundation` paketini kullanır. Kesikli bağlantılar planlanan iş
etkileşimlerini gösterir. [C4 Container görünümü](c4-container.md)

```mermaid
flowchart TD
    Web["React web istemcisi · Sprint 2 Türkçe prototipi"]
    subgraph API["FastAPI container · önerilen bileşenler"]
        Auth["identity/profile<br/>registerUser, createSession<br/>getMyProfile, updateMyProfile<br/>Öneri: kimlik ve rol bağımlılığı"]
        Tasks["tasks<br/>createTask, listTasks, getTask<br/>cancelTask, getTaskHistory<br/>Sahiplik ve görev yaşam döngüsü"]
        Apps["applications/assignment<br/>applyForTask, listTaskApplications, assignTask<br/>Tek görevli ve yarışan atama koruması"]
        Evidence["evidence/reviews<br/>submitTaskEvidence, listTaskEvidence<br/>reviewTaskEvidence<br/>Özel kanıt ve inceleme kuralları"]
        Payment["simulated_payment<br/>simulatePaymentHold<br/>Beklet / serbest bırak / iptal kayıtları<br/>Gerçek ödeme sağlayıcısı yok"]
        Health["foundation · MEVCUT<br/>getHealth · SELECT 1"]
    end
    DB[("PostgreSQL<br/>İş tabloları ve dosya politikası: öneri / açık kararlar")]
    Web -.->|"Bearer ile önerilen /api/v1 istekleri"| Auth
    Web -.-> Tasks
    Web -.-> Apps
    Web -.-> Evidence
    Web -.-> Payment
    Auth -.->|"Önerilen principal / rol denetimi"| Tasks
    Auth -.-> Apps
    Auth -.-> Evidence
    Auth -.-> Payment
    Apps -.->|"Tek işlem: tek atama ve görev durumu"| Tasks
    Evidence -.->|"Tek işlem: onay ve tamamlanma"| Tasks
    Evidence -.->|"Aynı işlem: simüle serbest bırakma"| Payment
    Tasks -.->|"İptalde simüle bekletmeyi geçersizleştir"| Payment
    Tasks -.-> DB
    Apps -.-> DB
    Evidence -.-> DB
    Payment -.-> DB
    Health -->|"Mevcut bağlantı ve sağlık sorgusu"| DB
```
