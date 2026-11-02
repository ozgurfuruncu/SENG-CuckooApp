# ADR-001 — Architecture and technology selection

Status: **PROPOSED / NOT APPROVED**
Owner: Emmanuel Alabi (lead architect)
Reviewers: Emir Dizman, Özgür Furuncuoğlu, Jumanah Almodaen, Elif Nur Akbaş

## Stable decisions
- Backend and web UI will form one deployable product using a **modular-monolith domain model**, not microservices.
- Public HTTP behavior is defined in `api/openapi.yaml` and reviewed before implementation.
- Domain invariants include exclusive assignment, role authorization, evidence control, valid transitions, no real payment processing.
- Docker Compose single-command startup is required at final delivery; automated tests and CI are required on schedule.

## Technology candidates (not yet selected)
A. React + TypeScript + Vite / Python FastAPI / PostgreSQL. Simple REST backend and generated OpenAPI; auth/data-layer conventions need explicit design.
B. React + TypeScript + Vite / Python Django + DRF / PostgreSQL. More built-in auth, migrations and admin. More framework structure; API schema generation usually needs drf-spectacular.
C. React + TypeScript + Vite / TypeScript NestJS / PostgreSQL. One language across frontend/backend, structured modules, decorators and OpenAPI generation. More setup/framework overhead.

## Team evaluation — fill with evidence
| Dimension | A | B | C |
| --- | --- | --- | --- |
| Existing team proficiency | [ ] | [ ] | [ ] |
| Working authentication + role check prototype | [ ] | [ ] | [ ] |
| API contract validation/diff in CI | [ ] | [ ] | [ ] |
| File upload + authorization path | [ ] | [ ] | [ ] |
| Transaction-safe exclusive assignment | [ ] | [ ] | [ ] |
| Automated test and one-command Compose demo | [ ] | [ ] | [ ] |
| Time to explain, maintain and defend | [ ] | [ ] | [ ] |

## Spike gate (before implementing features)
One small branch per viable option or lightweight prototype, limited to: `/health`, a protected read endpoint, a stub file upload permission check, a simple DB transaction test, OpenAPI generation and `docker compose config`/runtime boot. Measure effort; avoid parallel full apps. If time is tight, compare two finalists.

**Decision:** [selected / alternative / deferred].
**Rationale:** [facts, team skills, CI and operational trade-offs].
**Reviewers + date:** [ ]
**Consequences:** [framework conventions, auth library, migrations, test runner, frontend API client].
**Next step:** Update README, AGENTS.md, deployment docs and Codex prompt *after* ADR approval.
