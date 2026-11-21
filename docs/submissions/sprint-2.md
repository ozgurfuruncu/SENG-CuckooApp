# Cuckoo Sprint 2 submission bundle

SENG 321 · Team 5 · 21 November 2026 · **Candidate for team review**

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
| 3. Turkish UI, interactive flows and Figma | [Figma Design](https://www.figma.com/design/k8O7yMMpxToQkBMlJOF2gl/Cuckoo?node-id=0-1) contains the shared account and employer frames. The [native export folder](../../prototypes/sprint-2/Cuckoo%20figma%20exports) contains 60 PNGs at both widths. The [Figma handoff evidence](../sprint-2-evidence/figma/README.md) contains both flow diagrams, live Figma verification findings and tested desktop/mobile offline previews for both roles. The [Lovable integration record](../sprint-2-lovable-integration.md) documents the runnable web demo. |
| 4. Architecture, C4 and UML | [System context](../diagrams/system-context.svg), [container view](../diagrams/sprint-2-ozgur/c4-container.md), [API component view](../diagrams/sprint-2-ozgur/api-components.md), [assignment sequence](../diagrams/sprint-2-ozgur/assignment-sequence.md), [lifecycle state models](../diagrams/sprint-2-ozgur/lifecycle.md), [domain model](../diagrams/sprint-2-ozgur/domain.md), and [React/FastAPI boundary](../sprint-2-frontend-api-boundary.md). The 19 November diagrams model the proposed modular monolith and business workflows. Read their description of the source tree as a snapshot and use the integration record for the current frontend. |

## Current demo and prior evidence

The current frontend uses the Lovable Turkish UI with fictional task data and
local browser interactions. The FastAPI application remains the health slice.
The [draft contract](../../api/openapi.yaml) and [architecture decision](../decisions/ADR-001-architecture.md)
describe the planned application. Business behavior, private evidence storage
and simulated payments shown in the web demo are prototype interactions.

The [19 November Özgür package](sprint-2-ozgur.md) retains a separately runnable
prototype, screenshots, editable source diagrams, and local browser/diagram
logs for the earlier design. [PR #39](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/39)
records Emmanuel’s review. Its [CI run](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/44579688301)
and [verification record](../sprint-2-ozgur-verification.md) identify the tested
head and scopes. Those records date to the earlier implementation. New code
checks, final-head CI and teammate review belong to the current candidate.

## Submission status

| Item | Status |
| --- | --- |
| Planning branch synchronization | [PR #37](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/37) merged the Sprint 2 plan into `develop`. |
| Final candidate PR, independent review and required CI | [PR #40](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/40) targets `develop`. All five jobs passed on the [`64cf0bf` run](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/44895747366). Check required CI and record a teammate review on the final head. |
| Editable Figma file and prototype starting points | The [employer desktop flow](https://www.figma.com/proto/k8O7yMMpxToQkBMlJOF2gl/Cuckoo?node-id=20-4&starting-point-node-id=24%3A332&scaling=min-zoom&content-scaling=fixed) played through sign-in to the dashboard. The native employer prototype needs the remainder of its workflow checked. The linked design's task-taker sections are empty. Task-taker frames and playback, both mobile starting points, and reviewer access remain open. [Verification record](../sprint-2-evidence/figma/README.md#verification-record) |
| Release and tag | The reviewed `sprint-1` tag covers the first sprint. The planned `sprint-2` tag and exact assessed commit are pending teammate review, required checks and protected integration. [Sprint publication process](../release/README.md) |
| Team sign-off and submission logistics | Aslı and Jumanah assemble and verify the final packet. Deadline and format beyond the supplied Sprint 2 plan remain to be confirmed. |

## Remaining work

1. **Özgür and Elif · Complete and verify Figma playback.** Bring the task-taker
   desktop and mobile frames into the design and wire the journey. Check the
   employer transitions after sign-in and provide both mobile starts. Play both
   journeys, verify reviewer access and record the starting-point links and
   task-taker exports. [Figma handoff evidence](../sprint-2-evidence/figma/README.md)
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
