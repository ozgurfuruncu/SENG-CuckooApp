# Cuckoo Sprint 2 submission bundle

SENG 321 · Team 5 · 22 November 2026 · **Submission index**

[Project repository](https://github.com/ozgurfuruncu/SENG-CuckooApp) ·
[Sprint 2 plan](../sprint-2-plan.md) · [Team RACI](../team-raci.md) ·
[Sprint 1 release record](README.md)

## Team responsibilities

| Team member | Sprint 2 responsibility |
| --- | --- |
| Elif Nur Akbaş · Product Owner | Own the SRS, backlog priorities and acceptance criteria. Lead scope, evidence policy and prototype acceptance decisions. |
| Aslı Arıkoğlu · Scrum Master | Coordinate planning, review and assembly of the team submission. |
| Emmanuel Alabi · Technical Lead | Own the architecture and contract review, coordinate integration, and review feasibility of evidence and quality proposals. |
| Jumanah Almodaen · QA | Own the quality specification, test design, verification matrix and submission evidence review. |
| Emir Dizman · DevOps | Support architecture and quality verification, validate deployment and CI evidence, and record the final reviewed commit and tag. |
| Özgür Furuncuoğlu · Frontend and Integration | Lead the Turkish UI, Figma handoff and user flows. Maintain the historical prototype and frontend/API boundary evidence. |

Responsibilities follow the Sprint 2 plan. Individual contributions and
reviews are recorded against their own artifact or GitHub revision.

## Deliverables and evidence

| Deliverable | Artifact and status |
| --- | --- |
| 1. SRS and refined backlog | [Elif’s SRS](../sprint-2-srs.md), [refined backlog](../sprint-2-backlog.md), [PO acceptance criteria](../sprint-2-po-acceptance-criteria.md) and [story/issue index](../issue-index.md). The drafts merged in [PR #38](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/38). The [evidence and revision design baseline](../sprint-2-evidence-decisions.md) gives the final demo rules for the Figma drafts and identifies the later live contract review. |
| 2. Non-functional requirements and quality measures | The [quality specification and verification matrix](../sprint-2-quality.md) gives measurable targets and records the observed results and planned checks. Jumanah reviewed the Sprint 2 submission and QA evidence and approved its promotion to `main`. [QA approval](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/41#pullrequestreview-6008414415) |
| 3. Turkish UI, interactive flows and Figma | [Figma Design](https://www.figma.com/design/k8O7yMMpxToQkBMlJOF2gl/Cuckoo?node-id=0-1) contains the shared, employer and task-taker frames. The [native export folder](../../prototypes/sprint-2/figma) contains 60 employer and shared PNGs and 68 task-taker PNGs across both widths. The [Figma handoff evidence](../../prototypes/sprint-2/README.md) contains the prototype starts, both flow diagrams, playback findings and tested offline previews. The [Lovable integration record](../sprint-2-lovable-integration.md) documents the runnable web demo. |
| 4. Architecture, C4 and UML | [System context](../diagrams/system-context.svg), [container view](../diagrams/sprint-2/c4-container.md), [API component view](../diagrams/sprint-2/api-components.md), [assignment sequence](../diagrams/sprint-2/assignment-sequence.md), [lifecycle state models](../diagrams/sprint-2/lifecycle.md), [domain model](../diagrams/sprint-2/domain.md), and [React/FastAPI boundary](../sprint-2-frontend-api-boundary.md). The container view shows the running demo and health API. The component and UML views document the planned modular monolith and business workflows. [Rendered diagram set](../diagrams/sprint-2/rendered) |

## Current demo and prior evidence

The current frontend uses the Lovable Turkish UI with fictional task data and
local browser interactions. The FastAPI application remains the health slice.
The [draft contract](../../api/openapi.yaml) and [architecture decision](../decisions/ADR-001-architecture.md)
describe the planned application. Business behavior, private evidence storage
and simulated payments shown in the web demo are prototype interactions.

The [19 November Özgür package](../archive/sprint-2/design-snapshot.md) links the reviewed snapshot
of the earlier standalone prototype and screenshots. This submission uses
the native Figma exports and the integrated web demo for current UI evidence.
[PR #39](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/39)
records Emmanuel’s review. Its [CI run](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/44579688301)
and [verification record](../archive/sprint-2/verification.md) identify the tested
head and scopes. Those records date to the earlier implementation. New code
checks, final-head CI and teammate review belong to the current candidate.

## Employer Figma closeout

The 21 November closeout decision uses the existing Turkish employer frames
for Sprint 2, including **Görev oluştur**. The desktop Figma walkthrough
was verified through the dashboard. The tested desktop and mobile offline
previews and the web demo cover the full employer journey. The table traces
the screens to the draft operations relative to `/api/v1`.
[Figma evidence and offline previews](../../prototypes/sprint-2/README.md)
[Draft OpenAPI contract](../../api/openapi.yaml) · [Web walkthrough](../../frontend/tests/browser/journey.spec.ts)

| Figma step | Draft contract operation |
| --- | --- |
| Sign in and open the dashboard | `POST /auth/login` · `createSession`, `GET /tasks` · `listTasks` |
| Acknowledge permission and publish | `POST /tasks` · `createTask` |
| Inspect the task and applicants, assign a task taker | `GET /tasks/{taskId}` · `getTask`, `GET /tasks/{taskId}/applications` · `listTaskApplications`, `POST /tasks/{taskId}/assignment` · `assignTask` |
| Record a simulated hold | `POST /tasks/{taskId}/payment-simulation/hold` · `simulatePaymentHold` |
| View evidence metadata, request revision, then approve after resubmission | `GET /tasks/{taskId}/evidence` · `listTaskEvidence` and `POST /tasks/{taskId}/review` · `reviewTaskEvidence`. The task taker resubmits with `submitTaskEvidence`. Approval records completion and simulated release together. |
| View task history or cancel an eligible task | `GET /tasks/{taskId}/history` · `getTaskHistory`, `POST /tasks/{taskId}/cancel` · `cancelTask` |

The Figma journey uses bundled fictional photos and preset interactions. Its
required revision reason and retention copy follow the prototype evidence
baseline. Future live media and validation work follows its reviewed contract
stories. [Evidence baseline](../sprint-2-evidence-decisions.md)

## Submission status

| Item | Status |
| --- | --- |
| Planning branch synchronization | [PR #37](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/37) merged the Sprint 2 plan into `develop`. |
| Integration to `develop` | [PR #40](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/40) merged after teammate review and five passing checks. [Candidate CI](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/44903569373) |
| Promotion to `main` | [PR #41](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/41) merged at [`76e1093`](https://github.com/ozgurfuruncu/SENG-CuckooApp/commit/76e10937755586c298cfcd95feae10c13844b209) after Jumanah’s approval and [five passing promotion checks](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/44907804237). |
| Editable Figma file and prototype evidence | The [task-taker desktop and mobile starts](../../prototypes/sprint-2/README.md#reviewer-materials) played through revision, resubmission and completion. The live employer desktop walkthrough reached the dashboard. The tested offline previews document the full employer journey. All three presentation links rendered in signed-out browsers on 23 November. [Verification record](../../prototypes/sprint-2/README.md#verification-record) |
| Release and tag | Elif published [`sprint-2`](https://github.com/ozgurfuruncu/SENG-CuckooApp/tree/sprint-2) on the reviewed [`cb34a67` main commit](https://github.com/ozgurfuruncu/SENG-CuckooApp/commit/cb34a676e083d561ff780bd07840c6f7ac2c093c) from [PR #42](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/42). [Passing CI on the assessed commit](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/44955654870) |
| Submission document | Aslı assembled the standalone submission in [PR #43](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/43), with [Jumanah’s review](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/43#pullrequestreview-6026051507). The [submission copy](Cuckoo-Sprint-2-Submission.md) identifies the assessed snapshot and subsequent documentation clarifications. |

## Post-tag documentation

[PR #45](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/45) covers the
standalone submission copy, verified reviewer links and clarifications to
the architecture descriptions. The assessed deliverables are available
at [`sprint-2`](https://github.com/ozgurfuruncu/SENG-CuckooApp/tree/sprint-2).
