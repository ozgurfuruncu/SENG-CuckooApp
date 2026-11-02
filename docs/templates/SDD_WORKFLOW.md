# Cuckoo specification-driven development

This is the canonical workflow for later sprints. Stack A is accepted in
[ADR-001](../decisions/ADR-001-architecture.md). The implementation contract is
[api/openapi.yaml](../../api/openapi.yaml) plus the linked issue acceptance
criteria. Sprint 1 implements health only; draft business operations do not
authorize implementation. See [agent rules](../../AGENTS.md).

Process decision, approved by the user on **2026-11-03**: team members follow
team-approved plans. Keep work, checks and review proportionate to the change.
Branch protections, formal GitHub approval counts, Project boards, release
branches, tags and GitHub Releases are required only when explicit course
instructions or a current team-approved plan call for them. Record the source
before treating one as a completion gate. Earlier assistant/team checklists alone
do not establish a course requirement. A separate instructor rubric has not been
provided. Existing enforced GitHub rules still apply; this decision changes no
repository setting or permission.

**Approved story → Feature specification → OpenAPI review → Test design →
Agent-assisted implementation → Human review → CI → Merge → Traceability update.**

| Gate | Human owner and artifact | Evidence required to advance |
| --- | --- | --- |
| Approved story | PO: [01 product story](01-product-story.md); SM: [02 sprint record](02-sprint-decision-log.md) | Existing issue, priority, estimate, owner, observable AC IDs, dependencies and actual approval link/date |
| Feature specification | TL with PO/QA: [04 feature spec](04-feature-spec.md) | Domain/authorization/state rules, UI flow, persistence, failures and explicit assumptions |
| OpenAPI review | TL with frontend/QA: [03 ADR](03-architecture-decision.md) when needed | Exact operations/schemas/status codes at a commit SHA; reviewed delta or explicit no-change decision. Resolve contradictions before coding |
| Test design | QA: [07 test plan](07-qa-test-plan.md) | AC-to-test mapping, happy/negative/security/state/concurrency cases, integration environment and expected results |
| Agent-assisted implementation | Assigned developer: [05 backend](05-backend-task.md), [06 frontend](06-frontend-task.md), [08 DevOps](08-devops-change.md) | Definition of Ready met; bounded issue branch, permitted files, stop conditions; actual diff and test results |
| Human review | Responsible team member: [09 review](09-pr-review.md) and [PR template](../../.github/PULL_REQUEST_TEMPLATE.md) | Explainable diff, contract parity, acceptance evidence and assumptions/trade-offs; record the actual review/approval source. A separate reviewer or submitted GitHub approval is needed only when explicitly required |
| CI | DevOps/QA | All required checks succeed for the final reviewed head. CI can run earlier, but reruns after changes; review/checks must apply to the final diff |
| Merge | Authorized contributor | Team-approved branch/PR flow and any enforced GitHub rules satisfied; preserve history. Use a release PR only when the submission/delivery plan requires it |
| Traceability update | SM with PO/QA | [10 traceability](10-requirements-traceability.md): issue → AC → spec → operation → test → PR → review/approval source → CI → merge. Add release evidence only when required; record genuine blockers |

Use existing issues for routine cleanup and closeout. Create a new issue only for
distinct work. Conversation approval authorizes agreed work; record its source
without claiming it is a GitHub review. Do not ask for duplicate permission.
Agents propose changes; humans own scope, architectural decisions and acceptance.

## Definition of Ready

- [ ] Existing story has a named owner, priority/estimate, value, bounded scope and stable AC IDs.
- [ ] The team-approved story and applicable design/test review are recorded with their actual source/date; unresolved questions have owners. Existing conversation approval is valid evidence of the agreed work.
- [ ] Dependencies are implemented or their coordinated delivery is explicitly agreed.
- [ ] Feature spec defines inputs, UI states, role/ownership matrix, state transitions, errors and data/privacy rules.
- [ ] OpenAPI baseline SHA and affected operations are identified; issue/spec/contract contradictions are resolved through review. FastAPI defaults such as 422 must not silently replace a contracted 400.
- [ ] Test design maps every AC to positive and relevant negative cases; PostgreSQL/concurrency fixtures and component-test tooling are specified when relevant.
- [ ] Implementation brief defines module boundaries, migration/rollback needs, allowed files, reviewer and reproducible checks.

An unresolved contract decision means **Blocked for implementation**, even when
the specification document itself is complete. Do not fill approval fields with
invented signatures. The [US-03 example](../specs/US-03-create-task.md) demonstrates
this distinction.

## Definition of Done

- [ ] Approved acceptance criteria are demonstrated; no unapproved scope or contract drift.
- [ ] Behavior changes have tests; authorization/state changes include rejection tests and no-write assertions. Relevant transaction, privacy and concurrency cases pass against PostgreSQL.
- [ ] UI flow, API integration and component tests pass when UI changes; accessibility, loading, error and uncertain-outcome states are reviewed.
- [ ] Applicable migration, rollback, Compose readiness/persistence and environment checks pass; credentials remain outside Git.
- [ ] Exact commands, environment, actual results/skips and limitations are recorded. No unrun check is marked passing.
- [ ] A responsible human understands the change and records review/approval through the agreed team process; applicable CI passes, feedback is resolved and enforced rules are satisfied. Submit a GitHub approval only when explicitly required; describe only review objects that actually exist.
- [ ] Authorized merge is recorded, documentation updated and traceability links resolve. If a tag/release is explicitly required, record its exact commit and actual URLs; otherwise it is not a completion blocker.

If permission blocks an explicitly required action, record the requirement
source, response and responsible person. Optional controls or unavailable optional
board/release evidence do not keep a sprint open. Preserve factual observations
without claiming that absent controls or release objects exist. See the
[Sprint 1 remote audit and updated interpretation](../audits/sprint1-remote-verification.md).

## Role coverage and reuse

The nine existing role/spec templates remain the entry points. Each task copies
only relevant sections into its issue or spec and links the canonical workflow;
do not create a second checklist standard. Backend implementation uses
FastAPI/Pydantic, SQLAlchemy/Alembic and pytest; frontend uses React/TypeScript/Vite;
PostgreSQL, Docker Compose and GitHub Actions remain the integration baseline.
Frontend component-test tooling must be explicitly chosen in its story; this
documentation change installs no framework.

Maintain identity/profile, tasks, applications/assignment, evidence/reviews and
simulated-payment boundaries. City, skills and occupation are self-declared.
Real payments/escrow, verification, custody/driving, professional inspection and
legal representation remain outside MVP; ratings, recommendations and full
messaging stay deferred.
