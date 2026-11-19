# C4 Container görünümü · inceleme taslağı

Özgür'ün web/API sınırı katkısıdır. Emmanuel mimari kararlardan, Emir çalışma
ortamı ve dağıtım ayrıntılarından sorumludur. Bu görünüm mevcut kararlarını
değiştirmez. [Sprint 1 bağlam diyagramı](../system-context.svg) korunur.
Kesikli çizgiler **önerilen** iş etkileşimidir; düz çizgiler mevcut altyapıdır.

```mermaid
flowchart LR
    Kullanici["Kişi: İşveren / Görev alan"]
    subgraph Sistem["Cuckoo sistem sınırı · ADR-001 / ADR-002"]
        Web["Container: React / TypeScript / Vite web istemcisi<br/>Mevcut: statik web kabuğu<br/>Öneri: Türkçe görev ekranları ve istemci durumu"]
        API["Container: FastAPI / Pydantic uygulaması<br/>Mevcut: GET /api/v1/health<br/>Öneri: beş modüllü iş API'si"]
        DB[("Container: PostgreSQL<br/>Mevcut: sağlık SELECT 1 ve Alembic sürüm geçmişi<br/>Öneri: iş tabloları ve işlemler")]
    end
    Kullanici -->|"HTTP · web arayüzünü yükler"| Web
    Web -.->|"Öneri: HTTPS JSON /api/v1 · Bearer<br/>Medya sözleşmesi henüz açık"| API
    API -->|"SQLAlchemy / psycopg · SELECT 1<br/>Alembic: yalnızca sürüm geçmişi"| DB
    API -.->|"Öneri: yetki kontrollerinden sonra işlemli iş verisi"| DB
    Demo["Ayrı yerel Sprint 2 prototipi<br/>React + bellekte örnek bağdaştırıcı<br/>Gerçek API / depolama / ödeme bağlantısı yok"]
    Kullanici -->|"Yalnızca kurgusal demo"| Demo
    Sinir["Sistem dışında: fiziksel ziyaret ve izin<br/>Gerçek ödeme, sürüş, teslim alma, uzman incelemesi yok"]
    Kullanici --- Sinir
```
