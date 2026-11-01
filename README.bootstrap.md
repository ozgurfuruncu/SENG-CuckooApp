# Cuckoo — approved Stack A bootstrap

ADR-001 was approved on 2026-11-02. This is the active bounded foundation for
[issue #18](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/18); the older root
README, Compose file, business backend and JSX sources remain preserved team work.

With Docker Desktop's Linux engine running, from this checkout:

```sh
docker compose -p cuckoo-bootstrap -f compose.bootstrap.yml up --build --wait
```

Open http://localhost:5173. API readiness is http://localhost:8000/api/v1/health
and generated documentation is http://localhost:8000/api/v1/docs. Health returns
200 and `{"status":"ok","database":"up"}` after a successful query, or 503 and
`{"status":"unavailable","database":"down"}` on database failure. It is public
and reveals no connection credentials or exception details.

This deployment exposes the health slice only; task/auth flows await reviewed
contract implementation. The TypeScript client is a shell. Five backend package
boundaries reserve identity/profile, tasks, applications/assignment, evidence/reviews
and simulated-payment inside one monolith. Alembic initializes version history
without creating or adopting the legacy business tables.

Stop with `docker compose -p cuckoo-bootstrap -f compose.bootstrap.yml down`.
Its own PostgreSQL volume is separate from the legacy stack. Do not add `-v` when
checking persistence. Ports bind to loopback; `BOOTSTRAP_API_PORT` and
`BOOTSTRAP_WEB_PORT` can override 8000/5173. Password defaults are for the local
demo only; a `BOOTSTRAP_POSTGRES_PASSWORD` used here must be URL-safe because it is
interpolated into DATABASE_URL. This is a development bootstrap, not a production
deployment configuration. No evidence uploads/storage are implemented yet.

## Validation

Use Python 3.12 with a virtual environment and Node 24. From the repository root:

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

The smoke script uses its own `cuckoo-bootstrap-smoke` project, builds both apps,
checks health and the built frontend, reruns migrations, recreates containers,
verifies a test marker survives in the database volume, then stops containers
without deleting the volume. No legacy data is touched. PostgreSQL pytest
integration additionally runs when `BOOTSTRAP_TEST_DATABASE_URL` points to an
isolated test database; CI provides one. SQLite tests do not substitute for it.

See [bootstrap evidence](docs/stack-a-bootstrap-evidence.md),
[submission/evidence ledger](docs/submissions/README.md) and the
[contract reconciliation register](docs/contract-reconciliation.md).

For the final submission audit, use [Sprint 1 readiness](docs/release/final-audit.md).
`npm test` in tools/contract now runs seven contract/YAML checks and nine release
readiness regressions. This distinguishes actual owner-applied settings and human
review from prepared payloads and passing code checks.
