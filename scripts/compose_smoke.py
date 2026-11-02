"""Run an isolated Stack A smoke test; always stop containers, preserve volumes."""

import json
import os
from pathlib import Path
import subprocess
import urllib.request
import uuid

ROOT = Path(__file__).resolve().parents[1]
PROJECT = os.environ.get("BOOTSTRAP_COMPOSE_PROJECT", "cuckoo-bootstrap-smoke")
COMPOSE = ["docker", "compose", "-p", PROJECT, "-f", str(ROOT / "docker-compose.yml")]


def run(*arguments, capture=False):
    result = subprocess.run(COMPOSE + list(arguments), cwd=ROOT, check=True, text=True,
                            stdout=subprocess.PIPE if capture else None)
    return result.stdout.strip() if capture else ""


def check_http():
    api_port = os.environ.get("BOOTSTRAP_API_PORT", "8000")
    web_port = os.environ.get("BOOTSTRAP_WEB_PORT", "5173")
    with urllib.request.urlopen(f"http://127.0.0.1:{api_port}/api/v1/health", timeout=10) as response:
        assert json.load(response) == {"status": "ok", "database": "up"}
    with urllib.request.urlopen(f"http://127.0.0.1:{web_port}", timeout=10) as response:
        assert "<title>Cuckoo</title>" in response.read().decode()


def scalar(sql):
    return run("exec", "-T", "db", "psql", "-U", "cuckoo", "-d", "cuckoo", "-Atc", sql, capture=True)


if __name__ == "__main__":
    # psql literals below contain only a locally generated hexadecimal UUID.
    marker = uuid.uuid4().hex
    try:
        run("config", "--quiet")
        run("up", "--build", "--wait", "--wait-timeout", "180")
        check_http()
        run("exec", "-T", "backend", "alembic", "upgrade", "head")
        assert scalar("SELECT version_num FROM alembic_version") == "0001_foundation"
        # Test-only table in this explicit isolated project; no production/legacy DB.
        scalar("CREATE TABLE IF NOT EXISTS bootstrap_smoke_probe (id text PRIMARY KEY)")
        scalar(f"INSERT INTO bootstrap_smoke_probe VALUES ('{marker}')")
        # Recreate containers using the same named volume to verify persistence.
        run("down")
        run("up", "--wait", "--wait-timeout", "180")
        check_http()
        assert scalar(f"SELECT id FROM bootstrap_smoke_probe WHERE id = '{marker}'") == marker
        scalar(f"DELETE FROM bootstrap_smoke_probe WHERE id = '{marker}'")
        print("PASS: PostgreSQL connection, migration rerun, API readiness, built frontend and volume persistence")
    except BaseException:
        run("logs", "--no-color", "--tail", "80")
        raise
    finally:
        run("down")
