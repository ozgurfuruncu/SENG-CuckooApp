# Cuckoo Sprint 2 submission bundle

SENG 321 · Team 5 · 21 November 2026 · **Submission candidate for teammate review**

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
| 2. Non-functional requirements and quality measures | The [quality specification and verification matrix](../sprint-2-quality.md) gives measurable targets and separates observed results from proposed verification. Jumanah’s target and evidence review is pending. |
| 3. Turkish UI, interactive flows and Figma | [Figma Design](https://www.figma.com/design/k8O7yMMpxToQkBMlJOF2gl/Cuckoo?node-id=0-1) contains the shared, employer and task-taker frames. The [native export folder](../../prototypes/sprint-2/Cuckoo%20figma%20exports) contains 60 employer and shared PNGs and 68 task-taker PNGs across both widths. The [Figma handoff evidence](../sprint-2-evidence/figma/README.md) contains the prototype starts, both flow diagrams, playback findings and tested offline previews. The [Lovable integration record](../sprint-2-lovable-integration.md) documents the runnable web demo. |
| 4. Architecture, C4 and UML | [System context](../diagrams/system-context.svg), [container view](../diagrams/sprint-2-ozgur/c4-container.md), [API component view](../diagrams/sprint-2-ozgur/api-components.md), [assignment sequence](../diagrams/sprint-2-ozgur/assignment-sequence.md), [lifecycle state models](../diagrams/sprint-2-ozgur/lifecycle.md), [domain model](../diagrams/sprint-2-ozgur/domain.md), and [React/FastAPI boundary](../sprint-2-frontend-api-boundary.md). The 19 November diagrams model the proposed modular monolith and business workflows. Use the integration record for the current frontend. [Rendered diagram set](../sprint-2-evidence/ozgur/diagrams) |

## Current demo and prior evidence

The current frontend uses the Lovable Turkish UI with fictional task data and
local browser interactions. The FastAPI application remains the health slice.
The [draft contract](../../api/openapi.yaml) and [architecture decision](../decisions/ADR-001-architecture.md)
describe the planned application. Business behavior, private evidence storage
and simulated payments shown in the web demo are prototype interactions.

The [19 November Özgür package](sprint-2-ozgur.md) links the reviewed snapshot
of the earlier standalone prototype and screenshots. This submission uses
the native Figma exports and the integrated web demo for current UI evidence.
[PR #39](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/39)
records Emmanuel’s review. Its [CI run](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/44579688301)
and [verification record](../sprint-2-ozgur-verification.md) identify the tested
head and scopes. Those records date to the earlier implementation. New code
checks, final-head CI and teammate review belong to the current candidate.

## Employer Figma closeout

The 21 November closeout decision uses the existing Turkish employer frames
for Sprint 2, including **Görev oluştur**. The desktop Figma walkthrough
was verified through the dashboard. The tested desktop and mobile offline
previews and the web demo cover the full employer journey. The table traces
the screens to the draft operations relative to `/api/v1`.
[Figma evidence and offline previews](../sprint-2-evidence/figma/README.md)
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
| Final candidate PR, independent review and required CI | [PR #40](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/40) targets `develop`. All five jobs passed on the [`aa4aa46` cleanup run](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/44903244437). Check required CI and record a teammate review on the final head. |
| Editable Figma file and prototype evidence | The [task-taker desktop and mobile starts](../sprint-2-evidence/figma/README.md#reviewer-materials) played through revision, resubmission and completion. The live employer desktop walkthrough reached the dashboard. The accepted visual employer frames, flow diagram and tested offline previews document the rest of its journey. Confirm access with an intended Figma reviewer. [Verification record](../sprint-2-evidence/figma/README.md#verification-record) |
| Release and tag | The reviewed `sprint-1` tag covers the first sprint. The planned `sprint-2` tag and exact assessed commit are pending teammate review, required checks and protected integration. [Sprint publication process](../release/README.md) |
| Team sign-off and submission logistics | Aslı and Jumanah assemble and verify the final packet. Deadline and format beyond the supplied Sprint 2 plan remain to be confirmed. |

## Remaining work

1. **Özgür and Elif · Confirm Figma reviewer access.** Verify that an intended
   reviewer can open the design and both role evidence sets. Use the employer
   offline previews for end-to-end playback at both widths.
   [Figma handoff evidence](../sprint-2-evidence/figma/README.md)
2. **Elif, Jumanah and Emmanuel · Review the written deliverables.** Elif checks
   the SRS and refined backlog against the final journeys. Jumanah reviews the
   proposed quality targets and records actual prototype observations. Emmanuel
   reviews the architecture narrative and C4/UML for consistency with the
   agreed workflow and draft API. Record the review outcomes and any accepted
   open assumptions. [Quality matrix](../sprint-2-quality.md)
3. **Teammate reviewer and integration owner · Review and merge the candidate.**
   Record a real teammate review on the final PR diff. Confirm required CI on
   the final head and merge through branch protection. Preserve the review,
   check and merge links. [Frontend PR](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/40)
4. **Aslı, Jumanah and Emir · Finalize submission evidence.** Confirm the course
   deadline and submission format, verify the index and reviewer access, and
   record the final commit and Sprint 2 tag after review and checks. Submit the
   bundle with the repository, team, issue, PR, specification and diagram links.
   [Publication process](../release/README.md)
