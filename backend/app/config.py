import os


class Settings:
    database_url: str = os.getenv(
        "DATABASE_URL", "postgresql+psycopg://cuckoo:cuckoo@localhost:5432/cuckoo"
    )
    secret_key: str = os.getenv("SECRET_KEY", "dev-secret-sadece-gelistirme-icin-degistir")
    token_expire_minutes: int = int(os.getenv("TOKEN_EXPIRE_MINUTES", "120"))
    upload_dir: str = os.getenv("UPLOAD_DIR", "/data/uploads")
    cors_origins: list[str] = ["http://localhost:5173"]


settings = Settings()
