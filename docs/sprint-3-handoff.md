# Cuckoo handoff for Sprint 3

Sprint 2 has been submitted. This handoff records the baseline on 28 November
2026. Use the assigned GitHub issue and current team decisions to establish
Sprint 3 scope and ownership.

## Delivered baseline

- The assessed [`sprint-2` tag](https://github.com/ozgurfuruncu/SENG-CuckooApp/tree/sprint-2)
  points to `cb34a67`. The [submission index](submissions/sprint-2.md) links the
  reviewed integration, CI and deliverables. [PR #45](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/45)
  merged the polished [submission document](submissions/Cuckoo-Sprint-2-Submission.md)
  and reviewer links into `main` after tagging. Keep the assessed tag fixed.
- The [SRS](sprint-2-srs.md), [refined backlog](sprint-2-backlog.md),
  [quality measures](sprint-2-quality.md) and [C4 and UML diagrams](diagrams/sprint-2)
  capture the proposed system. The [prototype index](../prototypes/sprint-2/README.md)
  connects the Figma journeys, flow diagrams, native exports and offline previews.
- [`frontend/`](../frontend) is the integrated Turkish-first React/Vite demo.
  It exercises both roles using fictional state in the
  [mock store](../frontend/src/mock/store.tsx). Use the account picker and reset
  controls for demo QA. Use Figma for the intended screen flows and the
  [Lovable integration record](sprint-2-lovable-integration.md) for prototype changes.
- [`backend/app/main.py`](../backend/app/main.py) serves the implemented
  `GET /api/v1/health` slice with PostgreSQL readiness. The business operations
  in [OpenAPI](../api/openapi.yaml) are draft. Database migrations currently
  establish the foundation. See [accepted architecture](decisions/ADR-001-architecture.md)
  and [MVP scope](decisions/ADR-002-mvp-boundary.md).

## Pick up the next story

1. Fetch and compare `origin/main` and `origin/develop`. At handoff, `main`
   was at `e713829` and `develop` was its ancestor at `8d6b84f`. Both had the
   same application and API files. `main` had the later submission and artifact
   layout. Use the [branch process](branch-process.md) to sync the reviewed
   documentation into `develop` for Sprint 3 feature work.
2. Use the [canonical backlog](product-backlog.md), [issue index](issue-index.md)
   and [team RACI](team-raci.md) to find the assigned story, its acceptance
   criteria, responsible owner and reviewer. The Sprint 2 refinement offers
   candidate criteria. Record the selected Sprint 3 scope in the issue using
   the actual team decision.
3. Follow the [SDD workflow](templates/SDD_WORKFLOW.md). Review the issue and
   feature specification against OpenAPI, resolve disagreements, then map
   acceptance criteria to tests before building. Use the
   [US-03 example](specs/US-03-create-task.md) as a specification reference.
4. Use the [development guide](development.md) for backend tests, OpenAPI
   linting, frontend tests/build and Compose smoke. The
   [browser journey tests](../frontend/tests/browser/journey.spec.ts) exercise
   the mock workflow. For authorization and transitions, cover rejected actions
   and assert no writes. Record exact checks and results, teammate review and
   the PR in the issue or linked spec so another agent can resume from there.

## Decisions to carry forward

The [evidence design baseline](sprint-2-evidence-decisions.md) records the demo
rules for revision notes, viewing and download, file limits, retention and
participant visibility. When a story touches those areas, review the live rules
and resolve the applicable [contract questions](contract-reconciliation.md) with
the team. Use the [quality matrix](sprint-2-quality.md) to distinguish completed
prototype checks from live API privacy, concurrency, performance and accessibility
verification that still needs evidence.

Potential future product ideas include human review of tasks flagged by AI,
Turkish/English localization, one account acting in both roles, and in-app
category suggestions. Each needs an explicit scope decision before implementation.
