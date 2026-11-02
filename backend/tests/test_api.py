import os
from pathlib import Path
from unittest.mock import patch

import pytest
import yaml
from alembic import command
from alembic.config import Config
from fastapi.testclient import TestClient
from jsonschema import Draft202012Validator
from sqlalchemy import create_engine, inspect, text
from sqlalchemy.exc import OperationalError
from sqlalchemy.pool import StaticPool

from app.main import create_app
from app.foundation.database import create_database_engine

BACKEND = Path(__file__).resolve().parents[1]
CONTRACT = yaml.safe_load((BACKEND.parent / "api/openapi.yaml").read_text(encoding="utf-8"))


@pytest.fixture()
def bootstrap_engine():
    engine = create_engine("sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool)
    yield engine
    engine.dispose()


def test_healthy_database_matches_contract_and_creates_no_business_tables(bootstrap_engine):
    with TestClient(create_app(bootstrap_engine)) as client:
        response = client.get("/api/v1/health")
        assert response.status_code == 200
        assert response.json() == {"status": "ok", "database": "up"}
        Draft202012Validator(CONTRACT["components"]["schemas"]["HealthResponse"]).validate(response.json())
    assert inspect(bootstrap_engine).get_table_names() == []


def test_database_failure_matches_contract_without_leaking_details(bootstrap_engine):
    with TestClient(create_app(bootstrap_engine)) as client:
        with patch.object(bootstrap_engine, "connect", side_effect=OperationalError(
            "secret-dsn", {}, Exception("private-password-and-database-details")
        )):
            response = client.get("/api/v1/health")
    assert response.status_code == 503
    assert response.json() == {"status": "unavailable", "database": "down"}
    Draft202012Validator(CONTRACT["components"]["schemas"]["HealthUnavailable"]).validate(response.json())
    assert "secret" not in response.text and "password" not in response.text


def test_application_owned_engine_is_disposed_after_shutdown(bootstrap_engine):
    with patch("app.main.create_database_engine", return_value=bootstrap_engine) as factory:
        with patch.object(bootstrap_engine, "dispose", wraps=bootstrap_engine.dispose) as dispose:
            with TestClient(create_app()) as client:
                assert client.get("/api/v1/health").status_code == 200
                dispose.assert_not_called()
            factory.assert_called_once_with()
            dispose.assert_called_once_with()


def test_injected_engine_remains_owned_by_the_caller(bootstrap_engine):
    with patch.object(bootstrap_engine, "dispose", wraps=bootstrap_engine.dispose) as dispose:
        with TestClient(create_app(bootstrap_engine)) as client:
            assert client.get("/api/v1/health").status_code == 200
        dispose.assert_not_called()


@pytest.mark.parametrize("method,path", [
    ("GET", "/jobs"), ("POST", "/jobs"), ("GET", "/users/me"),
    ("POST", "/auth/register"), ("GET", "/api/v1/tasks"),
    ("POST", "/api/v1/tasks"), ("GET", "/api/v1/jobs"),
])
def test_unimplemented_business_routes_are_not_exposed(bootstrap_engine, method, path):
    with TestClient(create_app(bootstrap_engine)) as client:
        assert client.request(method, path).status_code == 404


def test_generated_health_contract_matches_canonical_slice(bootstrap_engine):
    def without_titles(value):
        if isinstance(value, dict):
            return {key: without_titles(item) for key, item in value.items() if key != "title"}
        if isinstance(value, list):
            return [without_titles(item) for item in value]
        return value

    with TestClient(create_app(bootstrap_engine)) as client:
        generated = client.get("/api/v1/openapi.json").json()
    assert set(generated["paths"]) == {"/health"}
    assert generated["paths"]["/health"] == CONTRACT["paths"]["/health"]
    for name in ["HealthResponse", "HealthUnavailable"]:
        assert without_titles(generated["components"]["schemas"][name]) == CONTRACT["components"]["schemas"][name]


def test_migration_history_is_repeatable_and_does_not_adopt_legacy_tables(tmp_path, monkeypatch):
    url = f"sqlite:///{(tmp_path / 'migrations.db').as_posix()}"
    monkeypatch.setenv("DATABASE_URL", url)
    config = Config(str(BACKEND / "alembic.ini"))
    command.upgrade(config, "head")
    command.upgrade(config, "head")
    engine = create_database_engine(url)
    try:
        assert inspect(engine).get_table_names() == ["alembic_version"]
        with engine.connect() as connection:
            assert connection.execute(text("SELECT version_num FROM alembic_version")).scalar_one() == "0001_foundation"
    finally:
        engine.dispose()


@pytest.mark.skipif(not os.environ.get("BOOTSTRAP_TEST_DATABASE_URL"), reason="PostgreSQL integration URL not supplied")
def test_postgresql_connectivity_migrations_and_health(monkeypatch):
    url = os.environ["BOOTSTRAP_TEST_DATABASE_URL"]
    monkeypatch.setenv("DATABASE_URL", url)
    command.upgrade(Config(str(BACKEND / "alembic.ini")), "head")
    command.upgrade(Config(str(BACKEND / "alembic.ini")), "head")
    engine = create_database_engine(url)
    try:
        assert engine.dialect.name == "postgresql"
        with engine.connect() as connection:
            assert connection.execute(text("SELECT 1")).scalar_one() == 1
            assert connection.execute(text("SELECT version_num FROM alembic_version")).scalar_one() == "0001_foundation"
        with TestClient(create_app(engine)) as client:
            assert client.get("/api/v1/health").json() == {"status": "ok", "database": "up"}
    finally:
        engine.dispose()
