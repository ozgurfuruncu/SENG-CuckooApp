# C4 Container görünümü

**Web/API sınırı katkısı:** Özgür Furuncuoğlu

Sprint 2'nin Türkçe demosu `frontend/` içinde çalışır ve örnek görev
durumunu tarayıcı belleğinde tutar. Düz çizgiler mevcut etkileşimleri,
kesikli çizgiler planlanan iş API'si çağrılarını ve veri erişimini gösterir.
[Sistem bağlamı](../system-context.svg) ·
[Web/API sınırı](../../sprint-2-frontend-api-boundary.md)

```mermaid
flowchart LR
    Kullanici["Kişi: İşveren / Görev alan"]
    subgraph Sistem["Cuckoo sistem sınırı · ADR-001 / ADR-002"]
        Web["React / TypeScript / Vite · frontend/<br/>Türkçe Sprint 2 prototipi<br/>Yerel örnek görevler ve tarayıcı belleği"]
        API["FastAPI / Pydantic · backend/<br/>Mevcut: GET /api/v1/health<br/>Planlanan: beş modüllü iş API'si"]
        DB[("PostgreSQL<br/>Mevcut: sağlık denetimi ve Alembic sürüm geçmişi<br/>Planlanan: iş tabloları ve işlemler")]
    end
    Kullanici -->|"HTTP · web arayüzünü yükler"| Web
    Web -.->|"Planlanan iş çağrıları · HTTPS /api/v1 · Bearer"| API
    API -->|"Sağlık denetimi · SQLAlchemy / psycopg · SELECT 1"| DB
    API -.->|"Planlanan iş verisi erişimi ve işlemler"| DB
```
