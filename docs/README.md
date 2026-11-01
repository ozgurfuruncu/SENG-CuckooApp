# Sprint 1 review entry point

This branch preserves the existing React/FastAPI app and historical documents.
They are prior team work; **the application stack is not approved** and the runtime
does not match the supplied canonical contract. No feature work should proceed
until the recorded contract differences are reconciled.

- [Executed audit and validation evidence](sprint-1-evidence.md)
- [Contract reconciliation and implementation gate](contract-reconciliation.md)
- [Proposal reconciliation addendum](proposal-addendum.md)
- [Canonical OpenAPI 3.1](../api/openapi.yaml)
- [Current backlog](product-backlog.md) and [published issues](issue-index.md)
- [Proposed ADR-001](decisions/ADR-001-architecture.md), [handoff entry point](decisions/ADR-001-architecture-options.md), [stack evaluation](decisions/stack-evaluation.md)
- [Branch/review process](branch-process.md), [Compose plan](compose-plan.md), [release checklist](sprint-1-checklist.md)

Validate without selecting an app stack (Node 24 and npm 10+):

```sh
cd tools/contract
npm ci
npm run lint
npm run lint:legacy
npm test
```

The first lint validates canonical OpenAPI 3.1 schemas/references; the second checks
the preserved historical 3.0 contract. Neither asserts runtime contract parity.
Seven validation tests exercise positive validation, malformed schemas/references,
3.1 numeric constraints, duplicate operations/keys and all repository YAML files.
