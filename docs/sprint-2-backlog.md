# Cuckoo Sprint 2 Product Backlog Refinement Proposal

**Version:** 0.1-draft  
**Date:** 18 November 2026  
**Product Owner:** Elif Nur Akbaş  
**Status:** Draft — Pending Team Review and Approval

> This document is a proposal for refining the existing product backlog. It preserves the current story identifiers, issue references, priorities, estimates, dependencies, and intent. It does not claim that any story is approved for implementation, committed to Sprint 2, implemented, tested, or accepted.

## 1. Purpose, scope, and planning assumptions

The Sprint 2 plan calls for refinement of the canonical `docs/product-backlog.md` as a planned deliverable. This document is maintained separately as a Sprint 2 refinement proposal; it does not replace or claim to update the canonical backlog. Team confirmation is required to accept this separate document as satisfying or supplementing the plan deliverable. This proposal refines existing stories US-01 through US-13 with observable acceptance criteria and traceability to the draft SRS and API. It does not constitute Sprint Planning or commit any story to a Sprint 2 goal. Scope, capacity, owners, reviewers, and sprint commitments remain subject to team agreement.

The current backlog identifies US-01 through US-13 as the bounded product journey. US-14 and US-15 remain deferred and outside the MVP. GitHub administrative issue closure is not evidence of product acceptance or completed implementation.

Actual design links for the proposed FLOW identifiers, editable Turkish Figma frames, annotated user-flow diagrams, and reviewer-access verification are pending deliverables; no design artifact or completed flow is claimed here.

The product supports one category, `VEHICLE_PHOTO_CHECK`, and a bounded vehicle photographic-documentation workflow. Payment is simulated: no real money, escrow, or payment details are involved. Operating city, occupation, and skills are self-declared and are not verified credentials. The approved architecture is Stack A in a single modular monolith: React/TypeScript/Vite, FastAPI/Pydantic, PostgreSQL/SQLAlchemy/Alembic, Docker Compose, GitHub Actions, and pytest. Business operations in the OpenAPI document are a draft contract; the running application implements health/readiness and a typed client shell only.

### 1.1 Status notation

- **Contract baseline:** Behavior stated in an existing story, accepted architecture/MVP decision, issue index, or `api/openapi.yaml`. This label identifies a source; it does not imply approval of a business story for implementation.
- **Proposed acceptance criterion:** A testable refinement for PO/TL/QA review. It is not approved until the decision is recorded in the existing issue and any contract change is reviewed.
- **Unresolved decision / readiness blocker:** Policy or contract information that must be clarified before the affected story is Ready for implementation.

All verification scenarios are proposed test design only. No test execution, implementation, teammate review, or other evidence is asserted here. The separate quality specification and verification matrix required by the Sprint 2 plan remain outstanding deliverables; this proposal does not claim to provide them.

### 1.2 Sources

- [Product backlog](product-backlog.md)
- [Sprint 2 SRS](sprint-2-srs.md)
- [Sprint 2 planning brief](sprint-2-plan.md)
- [Issue index](issue-index.md)
- [OpenAPI draft](../api/openapi.yaml), version `0.2.1-draft`
- [Contract reconciliation](contract-reconciliation.md)
- [Accepted architecture](decisions/ADR-001-architecture.md)
- [MVP boundary](decisions/ADR-002-mvp-boundary.md)
- [US-03 specification example](specs/US-03-create-task.md), documentation example only; not implementation approval

## 2. Existing prioritized story baseline

The table preserves the existing product backlog priorities, story-point estimates, issue links, story intent, and dependencies. No estimate or priority change is proposed.

| Story / issue | Epic | Priority | Points | Existing story intent | Existing acceptance summary | Dependencies |
|---|---|---:|---:|---|---|---|
| [US-01 / #1](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/1) | E-01 | P0 | 5 | Register/sign in and enforce permitted roles | Valid login; forbidden actor → 403 | — |
| [US-02 / #2](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/2) | E-01 | P0 | 3 | Worker sets city and optional occupation/skills | Optional fields; self-declared label | US-01 |
| [US-03 / #3](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/3) | E-02 | P0 | 5 | Employer creates vehicle-photo-check task | Required fields; unauthorized create rejected | US-01 |
| [US-04 / #4](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/4) | E-02 | P0 | 3 | Worker filters open tasks by city/category | Filters; valid empty result | US-03 |
| [US-05 / #5](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/5) | E-03 | P0 | 3 | Worker applies to open task | One application per worker/task; no self-apply | US-03 |
| [US-06 / #6](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/6) | E-03 | P0 | 5 | Employer selects exactly one applicant | Atomic assignment; conflict on duplicate | US-05 |
| [US-07 / #7](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/7) | E-03 | P0 | 3 | Employer records simulated payment hold | No real funds; valid state only | US-06 |
| [US-08 / #8](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/8) | E-04 | P0 | 5 | Assigned worker submits private evidence | File/note validation; unauthorized denied | US-06, US-07 |
| [US-09 / #9](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/9) | E-04 | P0 | 5 | Employer approves or requests revision | Owner only; invalid transition denied | US-08 |
| [US-10 / #10](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/10) | E-04 | P0 | 3 | Approved task completes and simulates release | Requires hold + evidence + approval | US-07, US-09 |
| [US-11 / #11](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/11) | E-02 | P1 | 3 | Employer cancels eligible unfinished task | Allowed states only; duplicate terminal actions rejected | US-03 |
| [US-12 / #12](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/12) | E-04 | P1 | 3 | Participant views task status history | Assignment/evidence/review actions visible | US-06 |
| [US-13 / #13](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/13) | E-04 | P1 | 5 | Private task data is access controlled | Evidence/file forbidden tests | US-01, US-08 |
| [US-14 / #14](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/14) | Deferred | P2 | 3 | Participant rates other party after completion | Completed parties only; one rating each | US-10 |
| [US-15 / #15](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/15) | Deferred | P2 | 5 | Worker sees skill-tag-informed suggestions | Deterministic rules; no competence claim | US-02, US-04 |

Planning ownership remains Elif Nur Akbaş (`elfn0909`) as recorded in the existing backlog. Implementation owners and sprint assignments are not inferred here.

## 3. Refined acceptance criteria: US-01 through US-13

### US-01 — Register, sign in, and enforce roles

- **Priority / estimate:** P0 / 5 points. **Issue:** [#1](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/1). **Dependency:** none listed.
- **SRS / OpenAPI traceability:** FR-001, FR-002, FR-003, FR-017; `registerUser`, `createSession`, `getMyProfile`.
- **Contract baseline:** Roles are `EMPLOYER` and `TASK_TAKER`; password minimum is 8 characters; duplicate email returns 409; valid login returns a Bearer token; invalid credentials return 401; profile retrieval is authenticated.
- **Proposed acceptance criteria — draft:**
  - **US-01-AC01:** Given a valid email, password of at least 8 characters, and allowed role, registration returns 201 and a profile.
  - **US-01-AC02:** Given a duplicate email, registration returns 409 and does not create a second account. Invalid fields return the contracted 400 Problem response.
  - **US-01-AC03:** Given valid credentials, login returns 200 with a Bearer access token; invalid credentials return 401.
  - **US-01-AC04:** Given a valid token, profile retrieval returns the authenticated user's profile; no/invalid token returns 401.
  - **US-01-AC05:** Given an authenticated actor with a role forbidden for an operation, return 403. Registration does not grant an unsupported role.
- **Unresolved decisions / readiness blockers:** Token expiration/refresh policy; exact validation response for an unsupported role; complete role-to-operation matrix. The story remains subject to business contract review.
- **Proposed verification scenarios:** Valid and invalid registration, duplicate email, valid and invalid login, profile retrieval, and role-forbidden requests. These are not reported as executed tests.

### US-02 — Maintain self-declared profile attributes

- **Priority / estimate:** P0 / 3 points. **Issue:** [#2](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/2). **Dependency:** US-01.
- **SRS / OpenAPI traceability:** FR-003, FR-004, FR-017; `getMyProfile`, `updateMyProfile`.
- **Contract baseline:** City, occupation, and skills are self-declared. Profile bounds: city 2–100 characters, occupation up to 100, up to 10 skills of up to 60 characters each. A task taker needs a declared city before applying.
- **Proposed acceptance criteria — draft:**
  - **US-02-AC01:** Given an authenticated worker with valid values, save city and optional occupation/skills and return 200 with the updated profile and `selfDeclared: true`.
  - **US-02-AC02:** Omitted optional occupation/skills remain valid. These fields are not presented as verified credentials.
  - **US-02-AC03:** Out-of-bound values return the contracted 400 Problem response; no/invalid token returns 401.
  - **US-02-AC04:** A task taker without a declared city cannot apply for a task.
- **Unresolved decisions / readiness blockers:** Blank/whitespace city behavior; whether an employer can update the same optional fields; precise user-interface wording for self-declaration. Depends on US-01.
- **Proposed verification scenarios:** Valid optional-field combinations, each boundary, invalid values, unauthorized update, self-declaration indicator, and missing-city application prerequisite; not run.

### US-03 — Create a vehicle photo-check task

- **Priority / estimate:** P0 / 5 points. **Issue:** [#3](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/3). **Dependency:** US-01.
- **SRS / OpenAPI traceability:** FR-005, FR-017; `createTask`.
- **Contract baseline:** Only an `EMPLOYER` may create; category is `VEHICLE_PHOTO_CHECK`; required fields are title, description, city, category, proposed compensation, required evidence, and `permissionConfirmed: true`. Title is 5–150 characters, description 20–2000, compensation at least zero, and evidence instructions at most 1000. Requested deadline is optional. Success returns 201 and status `OPEN`. Compensation is illustrative; no real payment occurs.
- **Proposed acceptance criteria — draft:**
  - **US-03-AC01:** Given a valid employer request, return 201 with task status `OPEN`, server-generated id/time, and `employerId` derived from the authenticated principal.
  - **US-03-AC02:** Missing required fields, invalid bounds, negative compensation, unsupported category, false permission confirmation, or invalid deadline return the reviewed 400 Problem response and create no task.
  - **US-03-AC03:** No/invalid token returns 401; a `TASK_TAKER` receives 403; neither rejected request creates a task.
  - **US-03-AC04:** Client-supplied owner or lifecycle fields do not override server-derived ownership/lifecycle [proposed security criterion; unknown-property behavior remains undecided].
- **Unresolved decisions / readiness blockers:** Blank/whitespace city or evidence, unknown properties, amount precision/currency display, past deadlines, initial payment/assignment values, validation precedence, persistence-failure response, and UI route/timeout behavior. Depends on US-01. PO/TL/QA review of the existing US-03 specification and contract reconciliation are required before Ready.
- **Proposed verification scenarios:** Valid create; required-field omissions and bounds; 401/403 no-write cases; ownership derivation; client-field override; persistence failure. None is claimed as run.

### US-04 — Filter and view tasks

- **Priority / estimate:** P0 / 3 points. **Issue:** [#4](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/4). **Dependency:** US-03.
- **SRS / OpenAPI traceability:** FR-006, FR-007, FR-017; `listTasks`, `getTask`.
- **Contract baseline:** `listTasks` accepts optional city, category, and status; the only category is `VEHICLE_PHOTO_CHECK`; `getTask` returns a task or 404 if absent.
- **Proposed acceptance criteria — draft:**
  - **US-04-AC01:** Given `status=OPEN`, optionally combined with city/category, return 200 with only matching open tasks.
  - **US-04-AC02:** Given valid filters with no matches, return 200 with an empty array.
  - **US-04-AC03:** An invalid status/category returns the contracted 400 Problem response.
  - **US-04-AC04:** A permitted actor can retrieve an existing task (200); no/invalid token returns 401, forbidden actor 403, and missing task 404.
  - **US-04-AC05:** Task fields shown to each role follow the reviewed access matrix.
- **Unresolved decisions / readiness blockers:** Default status when omitted; role-based visibility; combined-filter semantics; pagination; performance target. Open tasks must be filterable, but an open-only default is not established. Depends on US-03.
- **Proposed verification scenarios:** City/category/status combinations, empty result, invalid filters, detail found/not found, and reviewed actor/access cases; not run.

### US-05 — Apply to an open task

- **Priority / estimate:** P0 / 3 points. **Issue:** [#5](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/5). **Dependency:** US-03.
- **SRS / OpenAPI traceability:** FR-008, FR-017; `applyForTask`.
- **Contract baseline:** Only task takers apply; task must be open; duplicate application and self-application are prohibited; a declared operating city is required; optional note is at most 500 characters; success is 201; conflict response is defined.
- **Proposed acceptance criteria — draft:**
  - **US-05-AC01:** An authenticated task taker with a declared city can apply once to an open task; success returns 201 with application/task/worker identifiers and submission time.
  - **US-05-AC02:** A second application by the same worker to the same task returns 409 and does not create another application.
  - **US-05-AC03:** Employer/self-application, wrong role, or missing declared city is rejected with the applicable reviewed 400/403 response and creates no application.
  - **US-05-AC04:** A missing task returns 404; duplicate or invalid task-state conflict returns 409.
- **Unresolved decisions / readiness blockers:** Whether task city must match the task taker's city; precise validation/error mapping for missing city and invalid note. Depends on US-03.
- **Proposed verification scenarios:** Valid application, duplicate, self-apply, wrong role, missing city, invalid note, missing task, and non-open task; not run.

### US-06 — Review applicants and assign exactly one

- **Priority / estimate:** P0 / 5 points. **Issue:** [#6](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/6). **Dependency:** US-05.
- **SRS / OpenAPI traceability:** FR-009, FR-010, FR-017; `listTaskApplications`, `assignTask`.
- **Contract baseline:** Applicant listing is employer-only. Assignment selects one applicant, must be atomic, returns 200 on success, and defines 409 conflict behavior.
- **Proposed acceptance criteria — draft:**
  - **US-06-AC01:** An eligible employer lists applications for a permitted task and receives 200; a task taker receives 403; a missing task returns 404.
  - **US-06-AC02:** Given an eligible task and one of its applications, assignment returns 200, sets the task to `ASSIGNED`, and assigns that worker.
  - **US-06-AC03:** Given competing assignments, at most one succeeds; the other returns 409 and causes no partial assignment.
  - **US-06-AC04:** A non-owning employer receives 403 if team review confirms task-owner authorization.
  - **US-06-AC05:** A missing task/application, invalid pairing, or already-assigned task returns the reviewed 404/409 response and does not change the task.
- **Unresolved decisions / readiness blockers:** Task-owner check for listing and assignment; eligible task/application states; effect on unselected applications; concurrency/error semantics. Depends on US-05.
- **Proposed verification scenarios:** Owner/non-owner role matrix, valid selection, invalid application pairing, duplicate and competing requests, and no-partial-write case; not run.

### US-07 — Record a simulated payment hold

- **Priority / estimate:** P0 / 3 points. **Issue:** [#7](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/7). **Dependency:** US-06.
- **SRS / OpenAPI traceability:** FR-011, FR-017; `simulatePaymentHold`.
- **Contract baseline:** The operation is demo-only; no money moves and no payment details are processed. Task must be `ASSIGNED`; repeat hold or invalid state returns 409.
- **Proposed acceptance criteria — draft:**
  - **US-07-AC01:** For an assigned task, an authorized employer records `HELD_SIMULATED`; response is 200. The OpenAPI response may include `disclaimer`, but the field is optional and is not a mandatory API-response criterion. The interaction must remain simulated: no real money moves and no payment details are processed.
  - **US-07-AC02:** A task outside `ASSIGNED` or an existing hold returns 409 and does not create another hold.
  - **US-07-AC03:** No/invalid token returns 401; a non-employer receives 403; a missing task returns 404.
  - **US-07-AC04:** An employer who does not own the task receives 403 if the proposed owner restriction is approved.
- **Unresolved decisions / readiness blockers:** Whether task ownership is required; transaction/no-partial-state behavior; whether the UI must always display a no-real-money disclaimer or the API contract should be revised to require `PaymentSimulation.disclaimer`. Depends on US-06. No requirement is added that the hold equal proposed compensation.
- **Proposed verification scenarios:** Eligible hold, wrong state, repeat hold, role/owner denial, and no-real-funds behavior; not run.

### US-08 — Submit private evidence

- **Priority / estimate:** P0 / 5 points. **Issue:** [#8](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/8). **Dependencies:** US-06, US-07.
- **SRS / OpenAPI traceability:** FR-012, FR-013, FR-017; `submitTaskEvidence`, `listTaskEvidence`.
- **Contract baseline:** Only the assigned task taker may submit; a simulated hold is required; the schema accepts 1–5 photos and notes of 10–2000 characters; resubmission after `REVISION_REQUESTED` is permitted; protected storage is required by the API description.
- **Proposed acceptance criteria — draft:**
  - **US-08-AC01:** Provisional pending approval of eligible states and media policy: given the assigned task taker, a held task, 1–5 photos, and valid notes, return 201 with evidence metadata.
  - **US-08-AC02:** Too few/many photos or notes outside the bounds return the reviewed 400 response and do not change task/evidence state.
  - **US-08-AC03:** Provisional response mapping pending contract review: missing hold or an agreed ineligible state returns 409; wrong/unassigned actor is denied according to the reviewed authorization matrix; rejected requests create no evidence.
  - **US-08-AC04:** Evidence is stored privately; access is limited to actors permitted by the approved evidence access matrix.
- **Unresolved decisions / readiness blockers:** Supported media types and maximum size; storage/retention; permission recording; file-download route/identifier; participant access matrix; exact resubmission transition. Depends on US-06 and US-07.
- **Proposed verification scenarios:** Valid evidence, file/note bounds, missing hold, wrong role/assignment, private-access denial, and resubmission; not run.

### US-09 — Review evidence or request revision

- **Priority / estimate:** P0 / 5 points. **Issue:** [#9](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/9). **Dependency:** US-08.
- **SRS / OpenAPI traceability:** FR-012, FR-014, FR-017; `reviewTaskEvidence`, `submitTaskEvidence`.
- **Contract baseline:** Decisions are `APPROVE` or `REQUEST_REVISION`. Approval requires `EVIDENCE_SUBMITTED` and `HELD_SIMULATED`; revision records `REVISION_REQUESTED`. The schema permits an optional note up to 500 characters. The existing story says owner-only and invalid transitions are denied.
- **Proposed acceptance criteria — draft:**
  - **US-09-AC01:** Provisional pending team/contract confirmation of the reviewable state and owner rule: given evidence in an agreed reviewable state, an authorized employer may request revision; proposed success response is 200 and status becomes `REVISION_REQUESTED`.
  - **US-09-AC02:** Provisional error mapping pending authorization and transition review: deny unauthorized reviewers according to the approved matrix; a missing task returns 404; an agreed invalid transition returns the contract-confirmed conflict response. A rejected review does not partially change task/payment state.
  - **US-09-AC03:** After revision is requested, the assigned task taker may resubmit under the team-approved transition.
  - **US-09-AC04:** If provided, a review note is at most 500 characters; whether a note is required follows the team decision.
- **Unresolved decisions / readiness blockers:** Exact revision precondition, resubmission transition, note policy, and any additional review actions. Depends on US-08; completion is linked to US-10.
- **Proposed verification scenarios:** Owner/non-owner review, revision, invalid state, resubmission, note bounds, and no-partial-update behavior; not run.

### US-10 — Complete an approved task and simulate release

- **Priority / estimate:** P0 / 3 points. **Issue:** [#10](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/10). **Dependencies:** US-07, US-09.
- **SRS / OpenAPI traceability:** FR-014, FR-017; `reviewTaskEvidence`.
- **Contract baseline:** Approval requires submitted evidence and `HELD_SIMULATED`; it atomically sets task `COMPLETED` and payment `RELEASED_SIMULATED`.
- **Proposed acceptance criteria — draft:**
  - **US-10-AC01:** Given evidence, a simulated hold, and authorized employer approval, return 200 with `COMPLETED` and `RELEASED_SIMULATED` recorded together.
  - **US-10-AC02:** Without evidence or a hold, approval returns 409 and neither completion nor simulated release occurs.
  - **US-10-AC03:** A wrong-role reviewer is denied under the reviewed authorization matrix; non-owner denial is proposed pending contract review. A missing task returns 404; an invalid decision returns the contract-defined 400.
  - **US-10-AC04:** No real money is transferred.
- **Unresolved decisions / readiness blockers:** Confirm ownership authorization, atomic failure behavior, and repeated approval after the terminal state. Depends on US-07 and US-09.
- **Proposed verification scenarios:** Valid approval, missing evidence, missing hold, unauthorized approval, repeated terminal action, and atomic result; not run.

### US-11 — Cancel an eligible unfinished task

- **Priority / estimate:** P1 / 3 points. **Issue:** [#11](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/11). **Dependency:** US-03.
- **SRS / OpenAPI traceability:** FR-015, FR-017; `cancelTask`.
- **Contract baseline:** Duplicate terminal cancellation returns conflict. The API draft's `OPEN`/`ASSIGNED` cancellation policy is preliminary; a simulated hold is marked `VOIDED_SIMULATED` if applicable.
- **Proposed acceptance criteria — draft:**
  - **US-11-AC01:** Given a task in an agreed eligible state, its employer cancels it; response is 200 and status becomes `CANCELLED`.
  - **US-11-AC02:** If confirmed, an `ASSIGNED` task with `HELD_SIMULATED` changes payment status to `VOIDED_SIMULATED` on cancellation.
  - **US-11-AC03:** A disallowed state or repeated terminal cancellation returns 409 and makes no additional state change.
  - **US-11-AC04:** No/invalid token returns 401; a wrong-role/non-owner actor receives 403 if ownership enforcement is approved; a missing task returns 404.
- **Unresolved decisions / readiness blockers:** Confirm eligible states, owner-only restriction, payment void behavior, and terminal-action policy. Depends on US-03.
- **Proposed verification scenarios:** Each allowed/disallowed state, held-payment behavior, duplicate terminal action, and unauthorized/no-write cases; not run.

### US-12 — View task status history

- **Priority / estimate:** P1 / 3 points. **Issue:** [#12](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/12). **Dependency:** US-06.
- **SRS / OpenAPI traceability:** FR-016, FR-017; `getTaskHistory`.
- **Contract baseline:** Existing acceptance evidence requires assignment, evidence, and review actions to be visible. TaskEvent includes id, taskId, actorId, action, occurredAt, and optional detail.
- **Proposed acceptance criteria — draft:**
  - **US-12-AC01:** An authorized participant receives 200 with history including assignment, evidence-submission, and review events and the required event fields.
  - **US-12-AC02:** A non-participant receives 403; no/invalid token returns 401; a missing task returns 404.
  - **US-12-AC03:** Additional event types and field-level visibility follow the approved history policy.
- **Unresolved decisions / readiness blockers:** Participant definition, event ordering, additional cancellation/payment events, and detail-field visibility. Depends on US-06.
- **Proposed verification scenarios:** Required event coverage and fields; participant and non-participant access; ordering/additional events only after decision; not run.

### US-13 — Control access to private task data

- **Priority / estimate:** P1 / 5 points. **Issue:** [#13](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/13). **Dependencies:** US-01, US-08.
- **SRS / OpenAPI traceability:** FR-013, FR-017; `listTaskEvidence`. No photo-download operation is defined in the current OpenAPI draft.
- **Contract baseline:** Evidence metadata is available to authorized participants; photo content requires an access-controlled file endpoint. The exact participant matrix and download route are unresolved. Existing issue acceptance evidence calls for forbidden evidence/file access tests.
- **Proposed acceptance criteria — draft:**
  - **US-13-AC01:** A user allowed by the approved access matrix can retrieve permitted evidence metadata.
  - **US-13-AC02:** An unrelated user receives 403 and no private evidence/file content is disclosed.
  - **US-13-AC03:** No/invalid token returns 401; a missing task returns 404.
  - **US-13-AC04:** No public/uncontrolled route serves evidence; the route and identifier must be specified before file-access behavior is Ready.
- **Unresolved decisions / readiness blockers:** Employer/assigned-worker visibility, applicant/unassigned-worker access, download route/id, file policy, storage/retention, and field-level privacy. Depends on US-01 and US-08.
- **Proposed verification scenarios:** Positive access per approved participant class, unrelated-user denial, unauthenticated denial, and no file disclosure; not run.

## 4. Deferred stories: outside the MVP

Preserve the existing identifiers, issue links, priorities, estimates, and dependencies. These stories are not part of the approved MVP and receive no API operations in this refinement.

| Story / issue | Priority | Points | Dependency | Disposition |
|---|---:|---:|---|---|
| [US-14 / #14](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/14) | P2 | 3 | US-10 | **Deferred; outside the MVP.** Participant rating after task completion. |
| [US-15 / #15](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/15) | P2 | 5 | US-02, US-04 | **Deferred; outside the MVP.** Skill-tag-informed suggestions without implying verified competence. |

## 5. Dependency summary

These dependencies are retained from the existing backlog and do not imply that a dependency is implemented or that a story is selected for Sprint 2.

| Story | Dependency | Readiness implication |
|---|---|---|
| US-01 | None listed | Foundational identity contract review. |
| US-02 | US-01 | Depends on account/profile behavior. |
| US-03 | US-01 | Requires authentication and employer role behavior. |
| US-04 | US-03 | Requires task data and a reviewed discovery contract. |
| US-05 | US-03 | Requires tasks and role/profile prerequisites. |
| US-06 | US-05 | Requires applications and reviewed assignment rules. |
| US-07 | US-06 | Requires assigned tasks and simulated payment rules. |
| US-08 | US-06, US-07 | Requires assignment, hold, and resolved evidence policy. |
| US-09 | US-08 | Requires submitted evidence and a review/revision policy. |
| US-10 | US-07, US-09 | Requires hold and approved evidence review behavior. |
| US-11 | US-03 | Requires confirmed cancellation and terminal-state rules. |
| US-12 | US-06 | Requires history event and participant-visibility rules. |
| US-13 | US-01, US-08 | Requires authentication and evidence access/storage policy. |
| US-14 | US-10 (deferred) | Remains deferred and outside MVP. |
| US-15 | US-02, US-04 (deferred) | Remains deferred and outside MVP. |

## 6. Pending PO/TL/QA decisions and readiness gates

Before an affected story is marked Ready, the Product Owner, Technical Lead, and QA should record the applicable decisions in the existing issue and reconcile API changes through review. No decision is presumed approved by this proposal.

1. **Identity:** token expiration/refresh; unsupported-role validation response; full role-to-operation matrix.
2. **Profile:** blank/whitespace city behavior; role-specific profile editing; self-declaration wording.
3. **Task creation:** blank fields, unknown properties, amount precision/currency presentation, past deadline, initial payment/assignment values, validation precedence, persistence-failure response, and UI route/timeout behavior.
4. **Discovery/detail:** default status filter, combined filters, pagination, role-specific fields, and any performance target.
5. **Applications/assignment:** city matching policy; invalid-note mapping; employer ownership checks; assignment eligibility; unselected applications; conflict and concurrency handling.
6. **Simulated hold:** ownership checks and transaction/no-partial-state behavior. Real payments remain prohibited by the MVP boundary.
7. **Evidence/privacy:** allowed media types/size; protected storage/retention; permission recording; file route/identifier; permitted participant matrix; resubmission state transition.
8. **Review/completion:** revision preconditions, note requirement, ownership checks, atomic failure behavior, and repeated approval policy.
9. **Cancellation/history:** cancellation states and hold voiding; owner checks; history participants, required events, ordering, and visibility.
10. **Cross-cutting traceability:** accept the proposed FR IDs, flow labels, and verification scenario labels in the SRS; preserve US and issue identifiers.
11. **Quality and sprint planning:** agree quality targets and verification methods separately; decide sprint scope, team capacity, owners, reviewers, and sprint goal through the planning process. This document makes none of those commitments.

## 7. Readiness and evidence statement

US-01 through US-13 remain backlog stories pending their applicable review and dependencies. The OpenAPI contract is a draft; the business operations are not implemented in the current application. Acceptance criteria and verification scenarios in this proposal are not approved and have not been executed. No feature, review, test, CI result, implementation, or release evidence is claimed. Existing issues and story IDs should be reused; US-14 and US-15 remain deferred and outside the MVP.
