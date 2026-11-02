import os

from sqlalchemy import Engine, create_engine
from sqlalchemy.engine import make_url


def create_database_engine(database_url: str | None = None) -> Engine:
    url = make_url(database_url or os.environ.get(
        "DATABASE_URL", "postgresql+psycopg://cuckoo:cuckoo@localhost:5432/cuckoo"
    ))
    connect_args = {}
    if url.get_backend_name() == "postgresql":
        connect_args = {"connect_timeout": 3, "options": "-c statement_timeout=3000"}
    return create_engine(url, pool_pre_ping=True, connect_args=connect_args)
