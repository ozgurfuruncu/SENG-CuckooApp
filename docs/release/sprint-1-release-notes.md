# Sprint 1 — foundation and approved Stack A bootstrap

This release records the SENG 321 Team 5 project foundation: bounded permitted
vehicle-photo-check scope, problem/vision/system boundary, MIT, named roles/RACI,
OpenAPI 3.1 baseline, initial backlog and repository workflow.

ADR-001 selects React/TypeScript/Vite, FastAPI/Pydantic,
PostgreSQL/SQLAlchemy/Alembic, Docker Compose, GitHub Actions and pytest. The tested
bootstrap supplies a TypeScript shell, database-aware health endpoint, migration
history initialization and reproducible Compose smoke test. It does not implement
the full MVP task journey. Legacy business code and original history are preserved.

Validation evidence: backend unit/PostgreSQL integration, contract validation and
seven validator tests, frontend type-check/build, Compose readiness/migration and
database persistence checks. See the release PR and docs/release/status.md for the
exact reviewed commit and actual check URLs; no manual approval is inferred from CI.

Payments remain simulated. City, occupation and skills remain self-declared.
Driving/custody, professional verification, legal representation and real payments
are excluded. Ratings, messaging, recommendations and other categories are deferred.
Remaining business-contract questions are tracked for later feature implementation.

Publication condition: use these notes only after real independent review,
reviewed main integration, required checks and the verified sprint-1 tag. Prepared
access defaults and pending submission evidence are not completed settings.
