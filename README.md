# Cuckoo

Uzaktaki işverenleri, işi yerinde yapabilecek güvenilir kişilerle buluşturan platform.
**Temel fikir:** ödeme, işin fotoğrafla kanıtlanmasına bağlıdır.

Ders: SENG 321 Yazılım Mühendisliği · Teslim: Sprint 1 · Lisans: MIT

## Çalıştırma

Gereksinim: Docker Desktop (Windows'ta WSL2 backend önerilir).

```bash
docker compose up --build
```

| Servis   | Adres                         |
|----------|-------------------------------|
| Frontend | http://localhost:5173         |
| API      | http://localhost:8000         |
| API belgeleri (Swagger) | http://localhost:8000/docs |

Durdurmak için `Ctrl+C`, kapatmak için `docker compose down`.
Veritabanını **silerek** sıfırlamak için `docker compose down -v` (fotoğraf volume'u da silinir!).

## Test

```bash
cd backend
python -m venv .venv && .venv\Scripts\activate    # Windows
pip install -r requirements.txt
pytest --cov=app
```

Testler SQLite kullanır, Postgres gerekmez.

## Klasör yapısı

```
backend/app/        FastAPI uygulaması (routers, models, schemas, security)
backend/tests/      Pytest testleri
frontend/           React + Vite
docs/openapi.yaml   API sözleşmesi (taslak)
docs/backlog.md     Ürün backlog'u
docker-compose.yml  db + backend + frontend
```

## Dal stratejisi (Git-Flow özeti)

`main` (korumalı) ← `develop` ← `feature/<konu>`. Her değişiklik PR ile girer, en az 1 onay gerekir.
