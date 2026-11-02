# ADR-001 — approved Stack A

Status: **ACCEPTED — 2026-11-02**
Owner: Emmanuel Alabi / anyx05, technical lead.

Approval source: the user explicitly approved ADR-001 and Stack A in this session;
the supplied Sprint 1 submission confirms the selection. User-confirmed accounts
and named responsibilities are in docs/team-raci.md. No peer signature is invented.

## Decision

Use one modular monolith with identity/profile, tasks, applications/assignment,
evidence/reviews and simulated-payment boundaries. The web client is React with
TypeScript/Vite; the API is FastAPI/Pydantic; PostgreSQL persistence uses SQLAlchemy
and Alembic. Docker Compose supplies the local environment, GitHub Actions CI and
pytest the backend test runner. api/openapi.yaml defines reviewed HTTP behavior.

## Rationale and trade-offs

This reuses the team's chosen tools and provides typed API validation, relational
transactions and explicit schema migrations without microservices. The team
self-reports intermediate overall SWE experience; no candidate-specific proficiency
scores or comparative spike measurements were supplied. Two application languages
and explicit future object authorization/concurrency design are accepted costs.

Django/DRF and NestJS were alternatives, not selected implementations. Their
preselection evaluation is historical material in docs/archive/preselection.
Framework comparison is closed; normal review still applies to concrete features.

## Sprint 1 consequence

The single entry point is app.main:app and the single deployment is
docker-compose.yml. Only database-aware health and the typed client shell are
implemented. Five domain packages preserve the chosen boundaries for later stories.
Alembic initializes version history without creating business tables. The inactive
starter app, duplicate JSX/deployment paths and unused auth/upload dependencies
have been removed from active source, with history retained.

Real payments, professional/identity verification, legal representation and vehicle
custody/driving remain excluded. Business slices follow their own acceptance tests
and contract reconciliation. No new frontend test framework or final-delivery
SonarQube infrastructure is selected by this cleanup.
