# Cuckoo — Sprint 2 Submission

**Course:** SENG 321 — Software Engineering  
**Team:** Team 5  
**Project:** Cuckoo  
**Repository:** [SENG-CuckooApp](https://github.com/ozgurfuruncu/SENG-CuckooApp)  
**Submission Date:** 22 November 2026  
**Assessed Sprint:** Sprint 2

## 1. Project and Team

Cuckoo is a platform concept designed to connect task owners with people who can perform tasks. Sprint 2 focused on refining requirements, developing the Turkish user-interface prototype, documenting the system architecture, defining quality requirements, and consolidating the evidence for review.

### Team Members and Responsibilities

| Team Member | Role | Responsibilities |
|---|---|---|
| Elif Nur Akbaş | Product Owner | SRS, backlog priorities, acceptance criteria, product scope and prototype acceptance |
| Aslı Arıkoğlu | Scrum Master | Sprint coordination, planning, review coordination and submission assembly |
| Emmanuel Alabi | Technical Lead | Architecture, API contract review, integration and technical feasibility |
| Jumanah Almodaen | QA Engineer | Quality specification, test design, verification matrix and QA evidence review |
| Emir Dizman | DevOps Engineer | CI/CD, deployment and architecture/quality verification |
| Özgür Furuncuoğlu | Frontend & Integration Engineer | Turkish UI, Figma handoff, user flows and frontend/API boundary evidence |

Team responsibilities are based on the team RACI and Sprint 2 submission records.

## 2. Requirements and Refined Backlog

Sprint 2 requirements and product planning evidence are available in:

- [Sprint 2 SRS](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/sprint-2/docs/sprint-2-srs.md)
- [Sprint 2 Backlog](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/sprint-2/docs/sprint-2-backlog.md)
- [PO Acceptance Criteria](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/sprint-2/docs/sprint-2-po-acceptance-criteria.md)
- [Issue Traceability Index](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/sprint-2/docs/issue-index.md)
- [Evidence Decisions](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/sprint-2/docs/sprint-2-evidence-decisions.md)

The requirements describe the planned user journeys, task lifecycle, user roles, applications, assignment, evidence submission and review processes.

The backlog preserves traceability between user stories, GitHub issues and canonical API operation IDs.

**Important implementation distinction:** Closing a GitHub issue does not mean its business feature has been implemented. The current backend implements the health endpoint; the business operations remain planned or represented through prototype interactions.

## 3. Non-Functional Requirements and Quality Assurance

The Sprint 2 quality specification defines measurable targets and verification approaches.

[Quality specification and updated verification evidence](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/64a04ce3dee01e31e42a98e15239b14bab50b728/docs/sprint-2-quality.md)

| Requirement | Quality Target / Verification |
|---|---|
| Privacy | Only the task owner and assigned task taker should access private evidence |
| State Integrity | Prevent conflicting assignments and ensure consistent approval/release transitions |
| Accessibility | Normal text contrast of at least 4.5:1, accessible control names, keyboard navigation and visible focus |
| Usability | Users should complete the defined journeys and recovery scenarios without moderator assistance |
| Performance | Illustrative target: p95 response time of 500 ms or less under the specified synthetic workload |
| Reliability | Health endpoint should return 200 when the database is available and a safe 503 response when unavailable |

### Verification Status

- Offline prototype walkthroughs were tested at desktop and mobile sizes.
- Task-taker flows were played through revision, resubmission and completion.
- Employer offline previews cover the full intended journey.
- Live employer Figma playback was verified through the dashboard; the full journey is supported by offline previews and flow evidence.
- Some backend, database concurrency, privacy and performance tests remain planned because the corresponding business implementation is not yet available.
- Current final-head verification should not be confused with historical prototype test records.

### QA Approval

Jumanah Almodaen reviewed the Sprint 2 submission and QA evidence and approved PR #41.

[PR #41 — Jumanah's QA approval](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/41#pullrequestreview-6008414415)

## 4. UI Design, Figma and User Flows

### Figma Design

[Open Cuckoo Figma Design](https://www.figma.com/design/k8O7yMMpxToQkBMlJOF2gl/Cuckoo?node-id=0-1)

The design contains Turkish-language interfaces for the employer and task-taker roles.

- [Employer desktop prototype](https://www.figma.com/proto/k8O7yMMpxToQkBMlJOF2gl/Cuckoo?node-id=20-4&starting-point-node-id=24%3A332&scaling=min-zoom&content-scaling=fixed)
- [Task-taker desktop prototype](https://www.figma.com/proto/k8O7yMMpxToQkBMlJOF2gl/Cuckoo?node-id=20-5&starting-point-node-id=33%3A850&scaling=min-zoom&content-scaling=fixed) · [Task-taker mobile prototype](https://www.figma.com/proto/k8O7yMMpxToQkBMlJOF2gl/Cuckoo?node-id=20-5&starting-point-node-id=33%3A2283&scaling=min-zoom&content-scaling=fixed)

Native Figma exports are organized by role and viewport under:

[Native Figma exports](https://github.com/ozgurfuruncu/SENG-CuckooApp/tree/sprint-2/prototypes/sprint-2/figma)

The evidence includes:

- 60 employer/shared PNG exports.
- 68 task-taker PNG exports.
- Desktop and mobile layouts.
- Two role-based user journeys.
- Offline HTML previews and SVG flow diagrams.

### User Flow 1 — Employer

The employer journey covers:

1. Sign in and access the dashboard.
2. Review task information and permissions.
3. Create and publish a task.
4. Review applicants and select a task taker.
5. Use the simulated payment-hold interaction.
6. Review submitted evidence.
7. Request a revision or approve the evidence.
8. Complete the task or follow the cancellation flow.

### User Flow 2 — Task Taker

The task-taker journey covers:

1. Sign in and discover available tasks.
2. Recover from missing profile or city information.
3. Apply for a task.
4. Follow the simulated payment-hold flow.
5. Submit evidence.
6. Receive revision feedback when required.
7. Resubmit evidence.
8. Reach the completed task state.

### Prototype Verification

The offline previews were tested at desktop and mobile sizes using Chromium.

The verification record includes 16 scenarios across the four relocated offline previews, along with link checks and native Figma export verification.

| Journey | Desktop preview | Mobile preview |
| --- | --- | --- |
| Employer | [Download HTML](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/sprint-2/prototypes/sprint-2/preview/employer-desktop.html) | [Download HTML](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/sprint-2/prototypes/sprint-2/preview/employer-mobile.html) |
| Task taker | [Download HTML](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/sprint-2/prototypes/sprint-2/preview/task-taker-desktop.html) | [Download HTML](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/sprint-2/prototypes/sprint-2/preview/task-taker-mobile.html) |

Choose **Download raw file** on GitHub, then open the HTML locally in a browser.
The previews are self-contained.

Additional details:

- [Prototype README and reviewer-access verification](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/64a04ce3dee01e31e42a98e15239b14bab50b728/prototypes/sprint-2/README.md)
- [Figma Handoff](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/sprint-2/docs/sprint-2-figma-handoff.md)
- [Lovable Integration Record](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/sprint-2/docs/sprint-2-lovable-integration.md)

**Prototype limitation:** The web demo uses fictional task data and in-memory interactions. Simulated payment, evidence and task actions are not production business services.

## 5. System Architecture and UML Documentation

The links below include post-tag documentation clarifications to the
architecture descriptions. The [assessed diagram set](https://github.com/ozgurfuruncu/SENG-CuckooApp/tree/sprint-2/docs/diagrams/sprint-2)
is available at `sprint-2`.

### Architecture Diagrams

| Diagram | File |
|---|---|
| System Context | [system-context.svg](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/sprint-2/docs/diagrams/system-context.svg) |
| C4 Container | [C4 container view](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/64a04ce3dee01e31e42a98e15239b14bab50b728/docs/diagrams/sprint-2/c4-container.md) · [Rendered SVG](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/64a04ce3dee01e31e42a98e15239b14bab50b728/docs/diagrams/sprint-2/rendered/c4-container-1.svg) |
| API Component | [API component view](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/64a04ce3dee01e31e42a98e15239b14bab50b728/docs/diagrams/sprint-2/api-components.md) |

### UML and Domain Models

| Model | File |
|---|---|
| Assignment Sequence | [Assignment sequence](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/64a04ce3dee01e31e42a98e15239b14bab50b728/docs/diagrams/sprint-2/assignment-sequence.md) |
| Lifecycle / State Models | [Lifecycle state models](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/64a04ce3dee01e31e42a98e15239b14bab50b728/docs/diagrams/sprint-2/lifecycle.md) |
| Domain Model | [Domain model](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/64a04ce3dee01e31e42a98e15239b14bab50b728/docs/diagrams/sprint-2/domain.md) |

### User Flow and Planning Diagrams

- [Employer Flow](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/sprint-2/docs/diagrams/sprint-2/employer-flow.svg)
- [Task Taker Flow](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/sprint-2/docs/diagrams/sprint-2/task-taker-flow.svg)
- [Employer flow with revision validation](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/64a04ce3dee01e31e42a98e15239b14bab50b728/docs/diagrams/sprint-2/employer-flow.md)
- [Sprint 2 Gantt chart](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/sprint-2/docs/diagrams/sprint-2/gantt.png)

The architecture follows a modular-monolith direction. The documented boundaries include identity/profile, tasks, applications/assignment, evidence/reviews and simulated payment.

The diagrams represent the reviewed architectural direction and planned business behavior; they should not be interpreted as proof that every business service has been implemented.

## 6. Frontend, Backend and API Boundary

The Sprint 2 web demo provides a Turkish user interface built with React, TypeScript and Vite.

The backend architecture uses FastAPI, PostgreSQL, SQLAlchemy and Alembic.

The current implementation boundary is documented in:

- [Frontend/API Boundary](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/64a04ce3dee01e31e42a98e15239b14bab50b728/docs/sprint-2-frontend-api-boundary.md)
- [OpenAPI Contract](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/sprint-2/api/openapi.yaml)
- [Architecture Decision Record](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/sprint-2/docs/decisions/ADR-001-architecture.md)

The prototype uses fictional data and browser-side interactions. Business operations such as task creation, assignment, evidence storage and payment simulation are not yet implemented as production backend services.

The API health slice is the implemented backend functionality documented for this stage.

## 7. Sprint 2 Review, Integration and Release Evidence

### Pull Request #40 — Sprint 2 Integration

[PR #40](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/40)

- Integrated the Turkish web demo, quality documentation, architecture index and Figma evidence into `develop`.
- Teammate review was recorded.
- Five candidate checks passed.
- Reviewed candidate head: `a1040e3`.

### Pull Request #41 — Promotion to Main

[PR #41](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/41)

- Merged 20 commits from `develop` into `main`.
- Jumanah Almodaen approved the submission and QA evidence.
- Ten checks passed.
- Merge commit: `76e10937755586c298cfcd95feae10c13844b209`.

### Pull Request #42 — Submission Artifact Organization

[PR #42](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/42)

- Organized diagrams, previews, Figma exports, verification logs and archived design records.
- Updated the submission index and recorded PR #41 QA approval.
- Emir Dizman reviewed and approved the changes.
- Five checks passed.
- Merge commit: `cb34a676e083d561ff780bd07840c6f7ac2c093c`.

The PR records report 220 local links checked, 163 moved non-Markdown assets and logs preserved byte-for-byte, eight Mermaid source blocks checked, 128 native Figma exports grouped, and 16 offline-preview scenarios replayed.

Jumanah also reviewed the standalone submission draft in
[PR #43](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/43#pullrequestreview-6026051507).

### Assessed Sprint 2 Snapshot

**Tag:** `sprint-2`

**Full commit SHA:**

`cb34a676e083d561ff780bd07840c6f7ac2c093c`

- [Sprint 2 Tag](https://github.com/ozgurfuruncu/SENG-CuckooApp/tree/sprint-2)
- [Assessed Repository Snapshot](https://github.com/ozgurfuruncu/SENG-CuckooApp/tree/cb34a676e083d561ff780bd07840c6f7ac2c093c)
- [Passing CI on the assessed main commit](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/44955654870)

Assessed artifacts link to `sprint-2`. The architecture clarifications and
updated verification notes link to their own documentation revision.

## 8. Evidence and Verification Records

Additional supporting evidence is available in:

- [Dated verification logs](https://github.com/ozgurfuruncu/SENG-CuckooApp/tree/sprint-2/docs/logs/sprint-2)
- [Earlier design records](https://github.com/ozgurfuruncu/SENG-CuckooApp/tree/sprint-2/docs/archive/sprint-2)
- [Offline previews and native Figma exports](https://github.com/ozgurfuruncu/SENG-CuckooApp/tree/sprint-2/prototypes/sprint-2)
- [Assessed submission index](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/sprint-2/docs/submissions/sprint-2.md)

Historical evidence is identified separately from verification performed against the final assessed snapshot.

## 9. Scope and Verification at Submission

**Implementation scope.** Sprint 2 covers requirements, architecture and
prototype behavior. The backend serves the health endpoint. Live business
services and their concurrency, privacy and performance verification belong
to the implementation stories.

**Accessibility spot-check.** Chromium checks sampled all 128 states of
the four tagged offline previews. All eight sampled text and background
pairs met the 4.5:1 contrast target, with a minimum of 6.21:1. Both journeys
completed at both widths using Tab and Enter across 68 transitions with
visible focus. The checks cover the offline previews and the exercised paths.

**Figma playback and access.** The task-taker flows played through completion
in Figma at both widths. Live employer playback reached the dashboard. The
employer offline previews cover the full journey. Anyone with the link can
preview the Figma prototypes. All three presentation links were verified in
signed-out Chromium sessions.

## 10. Conclusion

Sprint 2 consolidated the refined requirements, Turkish UI prototype, employer and task-taker user flows, architecture and UML documentation, quality specification, and verification evidence.

The submission was integrated into `main` through reviewed pull requests. Jumanah Almodaen approved the QA evidence on PR #41, and PR #42 completed the organization of the submission artifacts.

The assessed Sprint 2 snapshot is identified by the `sprint-2` tag and the full commit SHA recorded above.

**End of Sprint 2 Submission**
