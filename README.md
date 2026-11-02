# Cuckoo — Sprint 1 submission

SENG 321 · Team 5 · MIT

Cuckoo's first-release design is a bounded, permitted vehicle-photo-check journey:
workers apply, the employer selects one, reviews photos/notes and records a
**simulated** payment release. City, occupation and skills are self-declared.
Real payments, custody/driving, professional verification and legal representation
are outside the MVP. Ratings, full messaging and recommendations are deferred.

Sprint 1 delivers the proposal, system boundary, roles/RACI, approved architecture,
draft API contract, backlog and a tested application foundation. The application
currently implements database readiness and a TypeScript web shell; business
endpoints are later reviewed stories.

## Run

With Docker Desktop's Linux engine running, from the repository root:

```sh
docker compose up --build --wait
```

- Web: http://localhost:5173
- Health: http://localhost:8000/api/v1/health
- API docs: http://localhost:8000/api/v1/docs

Stop with `docker compose down`. PostgreSQL data remains in its named volume.
The project/volume identifiers are retained from the working foundation so existing
local data is not deleted by this cleanup. Optional overrides are in `.env.example`.

## Repository

| Path | Purpose |
| --- | --- |
| `api/openapi.yaml` | The single current OpenAPI 3.1 contract |
| `backend/app/main.py` | The single API entry point |
| `backend/app/{identity,tasks,applications,evidence,simulated_payment}` | Agreed monolith boundaries for later stories |
| `backend/migrations`, `backend/tests` | Alembic foundation and active API tests |
| `frontend/src/main.tsx` | The single React/TypeScript entry point |
| `docker-compose.yml`, backend/frontend `Dockerfile` | The single supported deployment |
| `.github/workflows/ci.yml` | Backend/PostgreSQL, contract, frontend and Compose checks |
| `docs/submissions` | Current submission and evidence index |
| `docs/archive` | Clearly dated historical records; not current setup |

Stack: React/TypeScript/Vite, FastAPI/Pydantic, PostgreSQL/SQLAlchemy/Alembic,
Docker Compose, GitHub Actions and pytest. See [development/testing](docs/development.md).

Submission: [Word document and evidence](docs/submissions/README.md),
[roles/RACI](docs/team-raci.md), [system context](docs/diagrams/system-context.png),
[accepted ADR-001](docs/decisions/ADR-001-architecture.md),
[backlog](docs/product-backlog.md), [issues](docs/issue-index.md),
[Sprint 1 checklist](docs/sprint-1-checklist.md).

The [remote verification](docs/audits/sprint1-remote-verification.md) preserves
observed GitHub state and the user's 2026-11-03 decision: protections, Projects
and release publication are conditional on explicit instructions/current team
plans, rather than default completion blockers. Later sprint work
uses the [canonical SDD workflow](docs/templates/SDD_WORKFLOW.md), shared Ready/Done
gates and [US-03 documentation example](docs/specs/US-03-create-task.md).

See [submission evidence](docs/submissions/README.md) for the validation results
and publication records. Historical planning and preparation files are kept in
`docs/archive`; the supported setup is documented here and in the development guide.
