# Cuckoo agent instructions

1. Treat `api/openapi.yaml` and the linked GitHub issue acceptance criteria as the implementation contract.
2. Do not expand MVP scope without an explicit architecture decision/issue.
3. Preserve the modular-monolith boundary: identity/profile, tasks, applications/assignment, evidence/reviews, simulated-payment.
4. Never implement real payments, escrow, identity verification, vehicle custody, professional inspection or legal representation.
5. Keep occupation, skills and operating city clearly self-declared.
6. Every behavior change requires tests. Authorization/state-transition changes require negative tests.
7. Work in small feature branches and link commits/PRs to issues.
8. Do not merge code you cannot explain; summarize assumptions and trade-offs in the PR.
9. Prefer boring, maintainable dependencies. Avoid microservices.
10. When implementation and OpenAPI disagree, stop and reconcile the contract before proceeding.
11. Reuse an existing issue for routine cleanup, documentation and closeout follow-ups. Create a new issue only for distinct work that needs separate tracking. Treat the user's approval in the conversation as authorization for the agreed work; do not ask for duplicate confirmation. Respect enforced GitHub rules and describe GitHub reviews only when they actually exist.

Stack A was approved by the user on 2026-11-02; see accepted ADR-001 and issue #18.
Use React/TypeScript/Vite, FastAPI/Pydantic, PostgreSQL/SQLAlchemy/Alembic and pytest.
The Sprint 1 application is `app.main:app`, deployed by `docker-compose.yml`.
Only the canonical health slice is implemented; business endpoints require their
own reviewed stories. Historical code is recoverable in Git; docs/archive is dated
evidence and must not be treated as current setup instructions.
