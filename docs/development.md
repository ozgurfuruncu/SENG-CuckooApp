# Development and verification

The repository root is the project root. There is no nested checkout or alternate app.
Use Docker Desktop's Linux engine, or Python 3.12 and Node 24 for native development.

## Docker

```sh
docker compose up --build --wait
```

Open http://localhost:5173, http://localhost:8000/api/v1/health or
http://localhost:8000/api/v1/docs. The public health operation returns 200 with
`{"status":"ok","database":"up"}` after SELECT 1, or a fixed 503 body with
status unavailable/database down. Connection errors and credentials are not exposed.

Stop with `docker compose down`; do not add `-v` when preserving data. The Compose
project/volume names remain compatible with the previously tested foundation.
Optional overrides are in `.env.example`. The default password is for the local
course demo; a custom value must be URL-safe because it appears in DATABASE_URL.

## Native tests/build

Create and activate a Python 3.12 virtual environment, then from the root:

```sh
python -m pip install --require-hashes -r backend/requirements.lock
cd backend
python -m pytest --cov=app --cov-report=term-missing --cov-fail-under=50
cd ../frontend
npm ci
npm run build
cd ../tools/contract
npm ci
npm run lint
npm test
cd ../..
python scripts/compose_smoke.py
```

On Windows, the environment's Python can be called directly as
`.venv/Scripts/python.exe`; after entering backend the path is
`../.venv/Scripts/python.exe`. If the sandbox's default temp directory is restricted,
pass pytest `--basetemp` pointing at a task-owned directory inside the workspace.

The backend suite tests the actual app: health success/failure, exact schema parity,
database-engine lifecycle, rejected unimplemented GET/POST routes and repeatable
migrations. PostgreSQL integration runs when BOOTSTRAP_TEST_DATABASE_URL names an
isolated test database; CI provides it. Local SQLite is not PostgreSQL evidence.

The smoke script uses a separate Compose project, builds both images, checks the
API and built frontend, reruns migrations, recreates containers and verifies a DB
marker survives. It stops its containers and preserves its named volume. This is
database persistence proof, not evidence-upload implementation.

One CI workflow runs four workloads: backend/PostgreSQL, OpenAPI validation,
frontend build and Compose smoke. Existing status names are retained; Stack A
backend mirrors the backend job result without running the suite twice.

Only api/openapi.yaml is the current contract. Its business operations remain
later reviewed slices; startup creates only Alembic version history, not business
tables. See [contract reconciliation](contract-reconciliation.md).
