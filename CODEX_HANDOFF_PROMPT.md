# Codex handoff — Sprint 1 foundation with a stack decision gate

You are working on SENG 321 Team 5's Cuckoo project at https://github.com/ozgurfuruncu/SENG-CuckooApp.

**First inspect the repository** (branch, files, git history, tags, PRs, issues and workflows). Do not delete, overwrite or rewrite existing team work. Do not force-push or merge directly to main/develop. Report unauthenticated or insufficient-permission actions accurately.

## Preserved product requirements
One remote vehicle-photo-check journey: employer posts bounded task, task takers apply, employer selects exactly one, worker with photo permission uploads evidence/notes, employer approves or requests resubmission, completed task records **simulated** payment release. No real payments or escrow, legal representation, vehicle custody/driving or professional verification. City/skills/occupation are self-reported. Other categories, recommender, ratings and full messaging are deferred.

## Architecture decisions
- **Accepted:** modular monolith, API-first source `api/openapi.yaml`, PostgreSQL and Docker Compose as recommended baselines, GitHub issues/PR review/CI evidence.
- **Not yet accepted:** frontend/backend frameworks, ORM, migrations and test runners. Existing React/FastAPI mentions are **candidates**, not instructions to scaffold.
- Read `docs/decisions/ADR-001-architecture-options.md` and `STACK_REVIEW.md`; keep status PROPOSED until a named human approves a reasoned selection.

## Sprint 1 tasks authorized without stack selection
1. Inspect git and repository state; write findings with exact commands/results.
2. Reconcile submitted Cuckoo documents, backlog, MIT license and OpenAPI 3.1 YAML; validate actual YAML/schema using available tool.
3. Create/verify issue, PR templates, branch process and docs; use an isolated `feature/sprint1-repo-bootstrap` branch; preserve existing content.
4. Create GitHub issues/Project items for the existing stories only if authenticated and no duplicates; link to stories/contract. Never invent account identities or assign guessed GitHub handles.
5. Configure available GitHub CI validation and branch rules only with authenticated permission; report blocked operations.
6. Prepare a **stack evaluation report** from project requirements and team proficiency information that is actually supplied. Do not fabricate proficiency scores.
7. Do NOT scaffold React, FastAPI, Django, NestJS or ORM implementations until ADR-001 is accepted. Lightweight documentation, OpenAPI validation, and a technology-neutral Compose plan are okay.
8. Create a PR to `develop` if authenticated; do not merge or tag `sprint-1` until reviewed and tested.

## Stop / approval gate
If the approved stack is absent, finish everything possible above and explicitly list the decision criteria and next human action; do not silently select the prior recommendation.

When stack selection is later approved, do a *separate* bounded bootstrap issue: initialize chosen app skeleton, one health endpoint, chosen test runner, relational DB connection and Compose smoke test. Report exact checks actually run. Never claim success without execution.

## Required output
What existed, changed files, issue/PR links, validation results, permission limitations, waiting decisions, role-specific follow-ups, and whether Sprint 1 peer review/tagging is ready.
