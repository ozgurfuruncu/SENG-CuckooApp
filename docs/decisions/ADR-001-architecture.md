# ADR-001 — Architecture and technology selection

Status: **ACCEPTED — Stack A, 2026-11-02**
Owner: Emmanuel Alabi (lead architect)
Reviewers: Emir Dizman, Özgür Furuncuoğlu, Jumanah Almodaen, Elif Nur Akbaş

Approval source: the user's explicit instruction in this working session,
“ADR-001 approved with Tech stack A selected next steps can go on”, supported by
the [updated Sprint 1 submission](../submissions/Cuckoo_Sprint1_Submission.docx),
sections 8, 10 and 15.1. The submission names Emmanuel Alabi as technical decision
owner. No reviewer signatures or GitHub-account-to-person mapping are inferred.

## Stable decisions
- Backend and web UI will form one deployable product using a **modular-monolith domain model**, not microservices.
- Public HTTP behavior is defined in `api/openapi.yaml` and reviewed before implementation.
- Domain invariants include exclusive assignment, role authorization, evidence control, valid transitions, no real payment processing.
- Docker Compose single-command startup is required at final delivery; automated tests and CI are required on schedule.

## Selected baseline and alternatives

**Selected A:** React + TypeScript + Vite; Python FastAPI + Pydantic;
PostgreSQL + SQLAlchemy + Alembic; Docker Compose; GitHub Actions + pytest.
Private persistent evidence storage remains a later feature concern. No new
frontend test framework is selected by this bootstrap; type-check/build and Compose
checks validate its shell. SonarQube remains deferred to final-delivery work.

The original alternatives remain recorded for decision history:
A. React + TypeScript + Vite / Python FastAPI / PostgreSQL. Simple REST backend and generated OpenAPI; auth/data-layer conventions need explicit design.
B. React + TypeScript + Vite / Python Django + DRF / PostgreSQL. More built-in auth, migrations and admin. More framework structure; API schema generation usually needs drf-spectacular.
C. React + TypeScript + Vite / TypeScript NestJS / PostgreSQL. One language across frontend/backend, structured modules, decorators and OpenAPI generation. More setup/framework overhead.

## Evaluation evidence at selection

The user self-reports an intermediate overall SWE level for the team. Existing
React/FastAPI/SQLAlchemy/pytest work and green CI offer a reuse path. The selected
stack supports typed request validation, OpenAPI generation and PostgreSQL
transactions while retaining the modular monolith. Alembic makes schema changes
explicit instead of adopting legacy tables through application startup.
Two application languages and explicit object-authorization/concurrency design are
accepted costs. Django/DRF and NestJS were not selected; no measured candidate
spikes or framework-specific proficiency scores were supplied. The comparative
matrix below remains unmeasured; approval is a human decision, not a fabricated score.
| Dimension | A | B | C |
| --- | --- | --- | --- |
| Existing team proficiency | [ ] | [ ] | [ ] |
| Working authentication + role check prototype | [ ] | [ ] | [ ] |
| API contract validation/diff in CI | [ ] | [ ] | [ ] |
| File upload + authorization path | [ ] | [ ] | [ ] |
| Transaction-safe exclusive assignment | [ ] | [ ] | [ ] |
| Automated test and one-command Compose demo | [ ] | [ ] | [ ] |
| Time to explain, maintain and defend | [ ] | [ ] | [ ] |

## Authorized next step

[Issue #18](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/18) is the separate
bounded bootstrap: selected shell, one documented database-aware health endpoint,
pytest, PostgreSQL connection, migration initialization and Compose smoke test.
Do not reopen framework comparisons. Product features remain governed by their
own acceptance criteria and unresolved [contract decisions](../contract-reconciliation.md).

**Decision:** Select A and the supporting tools listed above.
**Rationale:** Preserve reusable team work, align with the submitted baseline and
provide API-first typed validation and relational transactions without microservices.
**Approval date:** 2026-11-02, from the user instruction; ordinary peer review pending.
**Consequences:** SQLAlchemy/Alembic and pytest are selected. JWT/object authorization,
business schema migrations, generated-client policy and evidence controls remain
bounded implementation decisions, not silently adopted from legacy routes.
**Next step:** Review bootstrap PR and measured checks; reconcile business contracts
before US-01 onward. No merge or release tagging follows automatically from approval.
