# UML Domain Class · önerilen alan modeli

API 0.2.1-draft şemalarından kavramsal görünüm; ORM veya veritabanı şeması değildir.
Üretimde iş tabloları yoktur; yalnızca sağlık ve Alembic sürüm geçmişi mevcut.
US-01–US-13; FI katkısı, TL/DO incelemesi beklenir.

```mermaid
classDiagram
    class Profile {
        string id
        Role role
        string operatingCity
        string occupation
        string[] skills
        boolean selfDeclared
    }
    class Task {
        string id
        string employerId
        string assignedWorkerId
        string title
        string description
        string city
        TaskCategory category
        number proposedCompensation
        string requiredEvidence
        boolean permissionConfirmed
        datetime requestedBy
        TaskStatus status
        PaymentSimulationStatus paymentSimulationStatus
        datetime createdAt
    }
    class TaskApplication {
        string id
        string taskId
        string workerId
        string note
        datetime submittedAt
    }
    class EvidenceSubmission {
        string id
        string taskId
        string workerId
        integer photoCount
        string notes
        datetime submittedAt
    }
    class PaymentSimulation {
        string taskId
        PaymentSimulationStatus status
        string disclaimer
    }
    class TaskEvent {
        string id
        string taskId
        string actorId
        string action
        datetime occurredAt
        string detail
    }
    class ReviewRequest {
        string decision
        string note
    }
    Profile "1" --> "0..*" Task : işveren olarak oluşturur
    Profile "0..1" --> "0..*" Task : görevli olarak atanır
    Task "1" --> "0..*" TaskApplication : başvurular
    Profile "1" --> "0..*" TaskApplication : görev alan başvurur
    Task "1" --> "0..*" EvidenceSubmission : özel gönderimler
    Profile "1" --> "0..*" EvidenceSubmission : atanmış kişi gönderir
    Task "1" --> "0..1" PaymentSimulation : simüle durumu temsil eder
    Task "1" --> "0..*" TaskEvent : katılımcı işlem geçmişi
    ReviewRequest ..> Task : görev sahibi inceler
    note for Profile "Şehir, meslek ve beceriler kendi beyanıdır. Nullable / isteğe bağlı alanlar API şemasında tanımlıdır."
    note for Task "Tek kategori: VEHICLE_PHOTO_CHECK. En fazla bir atanmış kişi."
    note for EvidenceSubmission "Dosya içeriği ve indirme rotası bu şemada yoktur; ayrı açık tasarım kararı."
    note for PaymentSimulation "Gerçek ödeme veya ayrı bir banka servisi yoktur; tablo tasarımı kararı değildir."
```
