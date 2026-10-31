from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .db import Base, engine
from .routers import auth, jobs


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Basit başlangıç: tabloları oluştur. Şema değişiklikleri için ileride Alembic eklenebilir.
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(title="Cuckoo API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(jobs.router)


@app.get("/health", tags=["system"])
def health():
    return {"status": "ok"}
