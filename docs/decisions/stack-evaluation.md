# Stack evaluation, 2026-11-01 (Europe/Istanbul)

Status: **PROPOSED / NOT APPROVED**. Existing story: T-08 in `docs/backlog.md`.

## Evidence and limits

The repository at `8f701754a296dfd5aa9e464383ac4668d0f5e790` contains a React/JavaScript/Vite
listing screen, FastAPI auth/list/create endpoints, SQLAlchemy models, PostgreSQL
Compose configuration and six pytest tests. One existing GitHub CI run succeeded.
This demonstrates existing artifacts, not each teammate's proficiency or architectural
approval. The supplied starter proposes TypeScript, while existing frontend files
are JavaScript. The user reports the team are SWE majors with an intermediate
overall level. This is self-reported general experience, not measured framework
proficiency. No individual or candidate-specific declarations, measured candidate
spikes, maintenance estimates or approved framework/ORM/migration/test selections
were supplied. No candidate scores or winner can be justified from this alone.

## Requirements-based comparison (qualitative, not measured)

| Option | Useful fit | Costs and missing evidence |
| --- | --- | --- |
| A: React/TypeScript/Vite + FastAPI + PostgreSQL | Existing React/FastAPI work may be reusable after contract reconciliation; typed request validation and OpenAPI generation | Existing frontend needs a separate TypeScript decision; auth, object permissions, migrations and exclusive-assignment transaction conventions need review; Python and TypeScript proficiency unknown |
| B: React/TypeScript/Vite + Django/DRF + PostgreSQL | Integrated auth, ORM and migrations could reduce foundational work | Would replace existing backend conventions; OpenAPI 3.1 tooling/parity and per-object authorization require evidence; proficiency and migration cost unknown |
| C: React/TypeScript/Vite + NestJS + PostgreSQL | TypeScript across UI/API; module structure can reflect domain boundaries | Would replace existing backend; ORM, migration and JWT/upload choices remain; setup and proficiency unknown |

These are evaluation hypotheses from the supplied ADR/review, not executed comparisons.
The original proposal also lists Vue, Spring Boot and Express; omission from the
three supplied ADR finalists is not an approved rejection. Team evidence may justify
revisiting the shortlist before selection.

## Decision criteria and next human action

1. Each implementer records what they can independently build, debug, test and run
   for the candidate languages/frameworks; link actual work or state no experience.
2. Lead architect Emmanuel Alabi (as named in supplied ADR) collects those declarations
   and weighs reuse cost against ability to explain and maintain the chosen approach
   within the course's Week 8 MVP / Week 10 final target. These are relative targets,
   not inferred calendar deadlines.
3. Evaluate contract-first OpenAPI 3.1 compatibility, two-role and object authorization,
   protected evidence, PostgreSQL transactions/unique constraints for one assignment,
   atomic simulated release, migrations, test tooling and Compose portability.
4. If measured prototypes are needed, a human explicitly authorizes a bounded spike;
   this handoff supplies no authorization to scaffold candidates before acceptance.
5. A named human records selection, rationale, alternatives, ORM/migrations/test
   choices, reviewers and approval date in the original ADR-001. Keep PROPOSED until then.
6. Reconcile the existing implementation with the canonical contract in a reviewed
   issue before feature changes. A later separate bounded bootstrap issue can cover
   selected skeleton, health endpoint, DB connection, tests and Compose smoke test.

Documentation tooling uses pinned Node/Redocly and the built-in Node test module;
this selects no application framework or application test runner. Existing Python
CI stays intact. PostgreSQL and Compose remain the agreed baselines.

## Roles awaiting evidence (no GitHub assignment inferred)

| Role | Next action |
| --- | --- |
| Product Owner / requirements | Approve proposal addendum and backlog/contract resolutions; confirm photo permission and cancellation policy |
| Architect | Gather proficiency evidence; resolve contract gaps; obtain named ADR acceptance |
| Implementers | Supply experience evidence and assess reusable existing code without new scaffolding |
| QA | Review contract test matrix, negative authorization/state cases, and candidate test approach |
| DevOps / repository administrator | Apply branch rules, confirm collaborator identities and CI contexts; arrange Projects permissions |
| Scrum Master | Confirm role-to-person mapping, board access, issue ownership, reviewer and peer-review evidence |

Source documents: preserved ADR/review and submitted Word proposal. Technical
references for later evaluation: [OpenAPI 3.1](https://spec.openapis.org/oas/v3.1.0.html),
[Redocly spec validation](https://redocly.com/docs/cli/rules/built-in-rules).
