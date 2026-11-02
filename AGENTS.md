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

Stack A was approved by the user on 2026-11-02; see accepted ADR-001 and issue #18.
Use React/TypeScript/Vite, FastAPI/Pydantic, PostgreSQL/SQLAlchemy/Alembic and pytest.
The active bounded bootstrap is `app.bootstrap:app` and `compose.bootstrap.yml`;
legacy `app.main` and JSX are preserved prior work and must not be deployed as
canonical business API behavior. Implement only reviewed contract slices.
