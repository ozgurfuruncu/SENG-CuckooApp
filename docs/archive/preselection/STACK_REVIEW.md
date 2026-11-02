> Historical pre-cleanup record. Commands and state below describe their original inspection, not current setup. Relative evidence links now point to the preserved source commit. See the current root README.

# Cuckoo stack review — deliberately undecided

**Historical evaluation, superseded 2026-11-02:** the user approved Stack A.
See [accepted ADR-001](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/f5f91a1a7377c4d52ab7dc657508a6938116f9c0/docs/decisions/ADR-001-architecture.md) for the decision and rationale.
The option analysis below is preserved; it does not reopen framework selection.

## First identify the system's engineering drivers
- Six students, uneven unknown skills; 10-week deadline and individual contribution evidence.
- Two roles with object-level authorization, private photo uploads, relational data, audit/status history.
- Exclusive assignment and idempotent simulated-release rules need transaction safety.
- OpenAPI contract exists before implementation; prevent runtime contract drift.
- Docker Compose and CI/tests must be demonstrable.

## Options to prototype (choose by team capability, not trends)

| Candidate | Strongest reason to choose | Main downside |
| --- | --- | --- |
| React/TypeScript/Vite + FastAPI + PostgreSQL | Straightforward SPA/API split, typed Python validation, automatic OpenAPI | Auth and object-level permissions need careful framework conventions; frontend/backend have two languages |
| React/TypeScript/Vite + Django/DRF + PostgreSQL | Mature auth, ORM/migrations and admin for moderation; less foundational code | More opinionated; use drf-spectacular for OpenAPI; may need contract parity checks |
| React/TypeScript/Vite + NestJS + PostgreSQL | TypeScript across frontend/backend; modular structure, familiar to TS-skilled team | More framework/DI setup; still implement authorization and concurrency rigorously |

## Recommended shared choices
- **Modular monolith:** retain unless proven unsuitable.
- **PostgreSQL:** strong default for transactions/constraints, but persist through ORM choice only after backend selected.
- **Docker Compose:** mandated final delivery, independent of app stack.
- **GitHub Actions:** required engineering process, independent of app stack.
- **Local persistent storage:** fine for course demo with private served files and size/content controls; object storage is out-of-scope unless deployment demands it.
- **React/Vite:** sensible *provisional* web UI if team knows TypeScript; no SSR/SEO needs demonstrated that justify Next.js complexity.

## Decision protocol
1. Ask each implementer to declare actual ability to build/modify/test/run each candidate, not merely familiarity.
2. Prototype the same small `/health` + auth-protected read + simple DB query in two finalists (timebox).
3. Compare errors/debuggability, test setup, OpenAPI generation and parity, Compose boot, and teaching/demo explainability.
4. Record chosen stack and trade-offs in accepted ADR-001, *then* update `README.md`, `AGENTS.md`, `CODEX_HANDOFF_PROMPT.md` and the Sprint 1 proposal before scaffolding.

**Important:** Do not blindly create microservices, Next.js, Redis, Kubernetes, a messaging broker or an ML recommender for the initial release.
