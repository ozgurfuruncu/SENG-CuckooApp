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
12. Follow team-approved plans with proportionate process. Require branch protections, formal GitHub approval counts, Project boards, release branches, tags or GitHub Releases only when explicit course instructions or a current team-approved plan require them. Record that source; old checklists do not override later user decisions. Human understanding, contract alignment, relevant tests and truthful evidence remain required. Existing enforced GitHub rules must always be respected.

Stack A was approved by the user on 2026-11-02; see accepted ADR-001 and issue #18.
Use React/TypeScript/Vite, FastAPI/Pydantic, PostgreSQL/SQLAlchemy/Alembic and pytest.
The Sprint 1 application is `app.main:app`, deployed by `docker-compose.yml`.
Only the canonical health slice is implemented; business endpoints require their
own reviewed stories. Historical code is recoverable in Git; docs/archive is dated
evidence and must not be treated as current setup instructions.

The canonical SDD process and Definition of Ready/Done are in
`docs/templates/SDD_WORKFLOW.md`; reuse `docs/templates/01` through `10` and the
existing GitHub issue/PR templates. Follow approved story → feature specification
→ OpenAPI review → test design → agent-assisted implementation → human review
→ CI → merge → traceability update. Record real approval/review sources and exact
commands/results; stop on contract disagreement. The US-03 documentation example
in `docs/specs/US-03-create-task.md` is not authorization to implement the feature.
