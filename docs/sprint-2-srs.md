# Cuckoo Sprint 2 Software Requirements Specification

**Status: Draft — Pending Team Review and Approval**  
**Project:** SENG 321 · Team 5  
**Version:** 0.1-draft  
**Date:** 18 November 2026  
**Product Owner:** Elif Nur Akbaş

> This document is a proposed requirements baseline derived from the repository sources listed in Section 1. It records no approval, implementation, test execution, or stakeholder evidence that is not present in those sources. Requirement identifiers and verification scenario identifiers introduced here are proposed identifiers; they do not replace the existing US-01 through US-15 identifiers or GitHub issues.

## 1. Document information, status, and source baseline

### 1.1 Purpose of this document

This SRS proposes a structured, traceable description of the bounded Cuckoo workflow for team review. It is intended to help refine existing backlog stories and align future design and verification with the current OpenAPI draft. It does not authorize implementation of business endpoints.

### 1.2 Status and approval

The SRS is **Draft — Pending Team Review and Approval**. No approval signatures or review links are recorded here. All business stories US-01 through US-13 remain backlog items and are not implemented. US-14 and US-15 remain deferred and outside the MVP. GitHub administrative issue closure is not product acceptance or implementation evidence.

### 1.3 Source documents

- `docs/sprint-2-plan.md`
- `docs/product-backlog.md`
- `docs/issue-index.md`
- `docs/decisions/ADR-001-architecture.md`
- `docs/decisions/ADR-002-mvp-boundary.md`
- `docs/contract-reconciliation.md`
- `docs/specs/US-03-create-task.md`
- `api/openapi.yaml` (OpenAPI 3.1.0, API version `0.2.1-draft`)

The API document describes a draft contract. Except for `GET /health`, business operations are not mounted in the Sprint 1 application.

### 1.4 Requirement status notation

- **Confirmed (C):** Directly stated by an accepted architecture/MVP decision, the existing backlog/issue mapping, or the current OpenAPI draft. “Confirmed” describes the source statement; it does not mean that an unreviewed business requirement has received new team approval.
- **Proposed (P):** A testable refinement or organizational detail proposed for SRS review. It is not an approved change to an issue or API contract.
- **Unresolved (U):** The supplied sources do not settle the behavior. It must remain open until its owner and decision are recorded.

Acceptance criteria below are proposed as traceable verification statements. Criteria marked C restate source constraints; criteria marked P require review before becoming an implementation baseline.

## 2. Purpose, product scope, and objectives

### 2.1 Product purpose

Cuckoo supports a bounded local task in which an employer requests permitted vehicle photographs and visible-condition observations, a task taker applies, the employer selects exactly one task taker, evidence is submitted and reviewed, and payment status is simulated.

### 2.2 In-scope product capabilities

The proposed SRS covers the existing US-01 through US-13 capabilities:

- account registration, sign-in, and role-aware access;
- self-declared operating city, occupation, and skills;
- creation, discovery, and detail viewing for vehicle photo-check tasks;
- task applications, employer selection of one applicant, and simulated payment hold;
- private evidence submission and metadata access, employer review, revision, completion, and simulated release;
- eligible task cancellation and participant-visible task history.

The Sprint 2 plan asks the team to specify and prototype employer and task-taker journeys. A Sprint 2 prototype is a design deliverable and must use fictional/local state; it is not a live business API implementation.

### 2.3 Out of scope

The first release excludes real funds or escrow, vehicle driving/custody, professional inspection, legal representation or power of attorney, GPS verification, identity or professional-credential verification, native mobile applications, dog walking/gardening workflows, ratings (US-14), and skill-based suggestions (US-15). Messaging is listed as deferred in `docs/contract-reconciliation.md`; the current product backlog does not assign it a User Story ID. No excluded capability is authorized by this SRS.

## 3. Product context and architecture

### 3.1 System context

The product has a React/TypeScript/Vite web client and a FastAPI/Pydantic API in a single modular monolith. PostgreSQL persistence uses SQLAlchemy and Alembic. Docker Compose provides the local application environment; pytest is the backend test runner. GitHub Actions is the CI baseline. These are the accepted Stack A choices in ADR-001.

### 3.2 Module boundaries

The system preserves the approved boundaries:

1. Identity and profile
2. Tasks
3. Applications and assignment
4. Evidence and reviews
5. Simulated payment

These are modules in one application, not separate services. API and persistence design must preserve the boundary that owns each behavior.

### 3.3 Current implementation baseline

The current application entry point is `app.main:app`. The Sprint 1 application implements database-aware health and a typed client shell. It does not implement the business operations described below, and no business tables are currently part of the delivered health slice. The API draft is a design contract baseline, not evidence of running features.

## 4. User classes and roles

| Role | Description and permitted activities | Status |
|---|---|---|
| `EMPLOYER` | Registers, creates tasks, views task applicants, selects one applicant, records a simulated hold, reviews evidence, and cancels an eligible task. | C: Role and operations are represented in the backlog/OpenAPI. Detailed object ownership rules require review where noted. |
| `TASK_TAKER` | Registers, maintains self-declared profile details, browses tasks, applies, and submits evidence after assignment and simulated hold. | C: Role and operations are represented in the backlog/OpenAPI. |
| Unauthenticated/invalid principal | May use operations explicitly marked public (registration and login); protected operations require a valid Bearer token. | C: OpenAPI security declarations. |

Operating city, occupation, and skills are self-declared and are not verified credentials. The current role schema includes only `EMPLOYER` and `TASK_TAKER`; registration must not grant an administrative role. The sources do not define a separate administrator use case.

### 4.1 Documented Team 5 stakeholders and responsibilities

The following project stakeholders and roles are named in the Sprint 2 plan. The responsibility assignments below reproduce its proposed RACI for the detailed SRS and refined backlog deliverable; they are planning assignments, not evidence of completed work or approval. No external stakeholder identity or engagement is documented in the supplied sources.

| Documented stakeholder | Team role | Sprint 2 SRS/backlog responsibility in the plan |
|---|---|---|
| Elif Nur Akbaş | Product Owner (PO) | Accountable and responsible (A/R) for agreement on the detailed SRS and refined backlog. |
| Aslı Arıkoğlu | Scrum Master (SM) | Responsible (R) for coordinating story refinement. |
| Emmanuel Alabi | Technical Lead (TL) | Consulted (C); reviews alignment with the OpenAPI contract. |
| Jumanah Almodaen | QA and Test Automation Engineer (QA) | Responsible (R) for checking that acceptance criteria are testable. |
| Emir Dizman | DevOps / CI-CD Engineer (DO) | Informed (I) for this deliverable. |
| Özgür Furuncuoğlu | Frontend and Integration Engineer (FI) | Consulted (C) for this deliverable. |

## 5. Assumptions, dependencies, and constraints

### 5.1 Product and technical constraints

- Only `VEHICLE_PHOTO_CHECK` is supported in this MVP.
- The task amount is illustrative; no real money moves and no payment details are processed.
- A vehicle owner/location permission confirmation is an employer attestation. The platform does not verify permission or competence.
- City, occupation, and skills remain self-declared.
- API behavior is specified by the current OpenAPI draft and linked issue acceptance criteria. Resolve contradictions through review before implementation; do not silently substitute framework defaults such as HTTP 422 for a contracted HTTP 400.
- Business behavior changes require acceptance criteria and tests; authorization or state-transition changes also need rejection cases. This SRS records proposed verification scenarios, not completed test results.

### 5.2 Existing story dependencies

The following dependencies are copied from `docs/product-backlog.md`. They do not imply that a dependency is implemented.

| Story | Existing dependency |
|---|---|
| US-01 | None listed |
| US-02 | US-01 |
| US-03 | US-01 |
| US-04 | US-03 |
| US-05 | US-03 |
| US-06 | US-05 |
| US-07 | US-06 |
| US-08 | US-06, US-07 |
| US-09 | US-08 |
| US-10 | US-07, US-09 |
| US-11 | US-03 |
| US-12 | US-06 |
| US-13 | US-01, US-08 |
| US-14 | US-10 (deferred) |
| US-15 | US-02, US-04 (deferred) |

## 6. Data concepts and lifecycle vocabulary

### 6.1 Principal data concepts

- **Profile:** identifier, role, optional self-declared operating city, occupation and skill tags. The API profile schema includes `selfDeclared: true`.
- **Task:** employer-owned vehicle photo-check request, listing fields, status, payment simulation status, optional assigned worker, and creation time.
- **Application:** task, worker, optional note, identifier, and submission time.
- **Evidence submission:** task, worker, photo count, notes, and submission time. The API response describes metadata; file download behavior is not specified by a current operation.
- **Payment simulation:** task identifier and simulation status; no real money or payment details are processed. The OpenAPI `PaymentSimulation.disclaimer` field is optional. Whether the UI must always show a no-real-money disclaimer, or the API contract should be changed to require one, is a pending team decision.
- **Task event:** task, actor, action, occurrence time, and optional detail.

### 6.2 Defined status values

The OpenAPI draft defines task statuses `OPEN`, `ASSIGNED`, `EVIDENCE_SUBMITTED`, `REVISION_REQUESTED`, `COMPLETED`, and `CANCELLED`. Payment status is a separate value: `NOT_HELD`, `HELD_SIMULATED`, `RELEASED_SIMULATED`, or `VOIDED_SIMULATED`.

The high-level path described by the sources is:

`OPEN → ASSIGNED → EVIDENCE_SUBMITTED → [REVISION_REQUESTED → EVIDENCE_SUBMITTED on resubmission] → COMPLETED`

Cancellation is provisionally allowed from `OPEN` or `ASSIGNED` to `CANCELLED`. Approval requires evidence and a simulated hold, then atomically completes the task and records simulated release. The transition from `REVISION_REQUESTED` back to `EVIDENCE_SUBMITTED` on resubmission is **proposed and pending team approval**; the API description permits resubmission but does not explicitly define that state transition. Some initial/default values also need confirmation and must not be inferred as settled contract behavior.

## 7. Functional requirements

The FR identifiers in this section are proposed stable identifiers. Existing US identifiers and issue links remain unchanged. For each requirement, the normal flow and acceptance criteria are separated from failure behavior and unresolved policy.

### FR-001 — Register an account

- **Status:** C for role/schema constraints; detailed AC wording P.
- **Actor:** Unauthenticated prospective user.
- **Preconditions:** User submits a registration request to the public registration operation.
- **Requirement and normal flow:** Accept email, password, role, and optionally operating city; create a profile for an allowed role.
- **Acceptance criteria:**
  - Given a valid email, password of at least 8 characters, and role `EMPLOYER` or `TASK_TAKER`, when registration succeeds, then the response is `201` with a Profile.
  - Given a duplicate email, when registration is submitted, then the response is `409 Conflict`.
  - Given invalid request data, then the response is `400 Bad Request` using the documented Problem response.
  - Given a role outside the schema enum, then registration does not create an account. Exact validation response is governed by the contract and should be confirmed if it differs from `400`.
  - Registration cannot create an administrative role.
- **Failure cases:** Duplicate email (`409`); invalid input (`400`). No account should be created for rejected input [P; assert no-write behavior in test design].
- **State transition:** No task state change; a user/profile is created.
- **Traceability:** US-01 / issue #1; `registerUser`; proposed verification V-001.

### FR-002 — Authenticate a user

- **Status:** C for request/response behavior; token lifetime U.
- **Actor:** Registered user.
- **Preconditions:** A registered account exists.
- **Requirement and normal flow:** Submit email and password to authenticate; return a Bearer access token.
- **Acceptance criteria:**
  - Given valid credentials, when login succeeds, then response is `200` with `accessToken` and `tokenType: bearer`.
  - Given invalid credentials, then response is `401 Unauthorized`.
  - The response does not claim any role other than the registered role [P; retain role information through authenticated context].
- **Failure cases:** Invalid credentials (`401`); malformed request (`400`). Token expiry duration and refresh behavior are unresolved.
- **State transition:** Authentication/session state only; no task transition.
- **Traceability:** US-01 / issue #1; `createSession`; proposed V-002.

### FR-003 — Retrieve the authenticated profile

- **Status:** C.
- **Actor:** Authenticated employer or task taker.
- **Preconditions:** A valid Bearer token is present.
- **Requirement and normal flow:** Return the authenticated user's profile, not a caller-selected profile.
- **Acceptance criteria:**
  - Given a valid token, when the user requests the profile, then response is `200` with `id`, `role`, and `selfDeclared: true`, plus available profile fields.
  - Given no or invalid token, then response is `401`.
- **Failure cases:** Unauthorized access (`401`). A separate “view another person's profile” capability is not defined here.
- **State transition:** None.
- **Traceability:** US-01 and US-02 / issue #1 and #2; `getMyProfile`; proposed V-003.

### FR-004 — Update self-declared profile attributes

- **Status:** C for schema bounds and self-declaration; role-specific editing policy U.
- **Actor:** Authenticated user updating their own profile.
- **Preconditions:** A valid Bearer token is present.
- **Requirement and normal flow:** Update operating city and optional occupation/skill tags through the authenticated profile endpoint.
- **Acceptance criteria:**
  - Given a valid update, then response is `200` with the updated Profile and self-declaration indicator.
  - Operating city, if supplied, is null or 2–100 characters; occupation is null or at most 100 characters; skills contain at most 10 strings, each at most 60 characters.
  - Given no or invalid token, then response is `401`.
  - A task taker without a declared operating city cannot apply for a task [C in the API description].
- **Failure cases:** Invalid fields return the contract's `400`; unauthorized request returns `401`. Whether blank strings are rejected and whether employers may edit all optional fields are unresolved.
- **State transition:** Profile data only.
- **Traceability:** US-02 / issue #2; `updateMyProfile` and `getMyProfile`; proposed V-004.

### FR-005 — Create a vehicle photo-check task

- **Status:** C for API fields, employer role, category, and OPEN result; initial payment/assignment defaults and several validation details U. US-03 specification ACs are planned, not approved or executed.
- **Actor:** Authenticated employer.
- **Preconditions:** A valid employer token; task data satisfies the reviewed request contract; employer attests that required owner/location permission will be secured.
- **Requirement and normal flow:** Create a task with title, description, city, category, illustrative compensation, required evidence instructions, permission confirmation, and optional requested deadline.
- **Acceptance criteria:**
  - Given a valid request, then response is `201`, the task is `OPEN`, `employerId` derives from the authenticated principal, and server-owned `id` and `createdAt` are present.
  - Title is 5–150 characters; description 20–2000; category is exactly `VEHICLE_PHOTO_CHECK`; compensation is at least zero; `requiredEvidence` is at most 1000 characters; `permissionConfirmed` is true; `requestedBy` is optional/null or a date-time.
  - Given missing required fields, invalid bounds, negative compensation, unsupported category, or false permission confirmation, then the request is rejected with the contracted `400` Problem and no task row is persisted [P, based on planned US-03 tests].
  - Given no/invalid token, then response is `401`; given a `TASK_TAKER` token, response is `403`; neither rejected request creates a task [P, planned US-03 tests].
  - The proposed compensation is illustrative; no charge or real payment occurs.
- **Failure cases:** `400`, `401`, `403`; public persistence-failure response is unspecified. Do not invent `409` or `422` for this operation.
- **State transition:** New task → `OPEN`. Initial `paymentSimulationStatus` and `assignedWorkerId` are not constrained to initial values in the schema and require decision.
- **Traceability:** US-03 / issue #3; `createTask`; proposed V-005; detailed source example `docs/specs/US-03-create-task.md`.

### FR-006 — Discover and filter tasks

- **Status:** C for supported query parameters; default filters, pagination, and exact role policy U.
- **Actor:** Task taker browsing tasks.
- **Preconditions:** Authenticated request under the current OpenAPI security declaration.
- **Requirement and normal flow:** List tasks with optional `city`, `category`, and `status` filters. Only the supported task category is `VEHICLE_PHOTO_CHECK`.
- **Acceptance criteria:**
  - Given a valid `status=OPEN` filter, then response is `200` and contains only open tasks matching any supplied city and category filters.
  - Given a valid filter with no matches, then response is `200` with an empty array [C from US-04 acceptance evidence].
  - Given an invalid filter value, then the request returns the contracted `400` Problem.
  - The default status filter remains unresolved. The requirement to filter open tasks is met by requesting `status=OPEN`; whether the API applies that filter when status is omitted requires team and contract review.
- **Failure cases:** Unauthorized (`401`) and invalid query (`400`) per contract. Pagination and a response-time threshold are not yet approved requirements.
- **State transition:** None.
- **Traceability:** US-04 / issue #4; `listTasks`; proposed V-006.

### FR-007 — View task details

- **Status:** C for detail retrieval and `404`; role-specific fields/access U.
- **Actor:** Authenticated user permitted to view the task.
- **Preconditions:** Valid token and a task identifier.
- **Requirement and normal flow:** Return the requested task with role-appropriate information.
- **Acceptance criteria:**
  - Given an existing task and permitted actor, then response is `200` with a Task representation.
  - Given a nonexistent task, then response is `404`.
  - Given no/invalid token, then response is `401`; given an authenticated but unauthorized actor, then `403`.
  - The fields shown to employers, applicants, assigned workers, and unrelated users must be specified in the access matrix before approval.
- **Failure cases:** `401`, `403`, or `404` as applicable.
- **State transition:** None.
- **Traceability:** US-04 / issue #4; `getTask`; proposed V-007.

### FR-008 — Apply to an open task

- **Status:** C for role, open-task, duplicate, self-application, city, and note constraints.
- **Actor:** Authenticated `TASK_TAKER`.
- **Preconditions:** Task exists and is open; task taker has declared an operating city; actor is not the task employer.
- **Requirement and normal flow:** Submit one application with an optional note of at most 500 characters.
- **Acceptance criteria:**
  - Given eligible input, then response is `201` with a TaskApplication containing task, worker, and submission identifiers/time.
  - A task taker cannot apply to the same task twice.
  - An employer cannot apply to their own task; an actor with the wrong role receives `403`.
  - A worker without a declared operating city cannot apply.
  - A duplicate application or invalid task-state conflict returns `409`; a missing task returns `404`.
- **Failure cases:** `400`, `401`, `403`, `404`, `409` as applicable. Exact error code values and whether every invalid lifecycle case maps to `409` should follow the reviewed contract.
- **State transition:** Application is created; task remains `OPEN` until assignment.
- **Traceability:** US-05 / issue #5; `applyForTask`; proposed V-008.

### FR-009 — List applicants for a task

- **Status:** C for employer-only access in the OpenAPI draft; P for requiring that the employer also own the task. The owner restriction is pending contract review.
- **Actor:** Task-owning employer.
- **Preconditions:** Valid token and existing task. The OpenAPI operation says employer only; requiring the caller to own the task is a proposed rule pending review.
- **Requirement and normal flow:** Return applications for the employer's task.
- **Acceptance criteria:**
  - Given the task owner, then response is `200` with that task's applications.
  - Given a task taker, then response is `403` [C: employer-only operation].
  - Given an employer who does not own the task, then response is `403` [P: task-owner restriction; confirm against the API contract].
  - Given an invalid token, response is `401`; missing task, `404`.
- **Failure cases:** `401`, `403`, `404`.
- **State transition:** None.
- **Traceability:** US-06 / issue #6; `listTaskApplications`; proposed V-009.

### FR-010 — Assign exactly one applicant

- **Status:** C for one employer-selected applicant and atomic assignment; details of invalid applicant/state conflict need verification against contract.
- **Actor:** Task-owning employer.
- **Preconditions:** Task exists, is eligible for assignment, and the selected application belongs to it.
- **Requirement and normal flow:** The employer selects exactly one applicant; assignment must be atomic to prevent multiple winners.
- **Acceptance criteria:**
  - Given a valid applicant selection, then response is `200` and the task becomes `ASSIGNED` to that applicant.
  - Given two competing valid assignment requests for one task, at most one succeeds; the other receives a conflict (`409`); the losing request causes no partial assignment [P, expressed as a proposed concurrency criterion from the Sprint 2 plan].
  - A non-owner or wrong-role actor receives `403`; missing task/application returns `404` as applicable.
  - Repeated assignment to an already assigned task returns `409` [C from the operation's conflict response and backlog acceptance summary].
- **Failure cases:** `400`, `401`, `403`, `404`, `409` as applicable.
- **State transition:** `OPEN` → `ASSIGNED`; exactly one assigned worker.
- **Traceability:** US-06 / issue #6; `assignTask` and `listTaskApplications`; proposed V-010.

### FR-011 — Record a simulated payment hold

- **Status:** C for an employer recording a hold on an assigned task; P for requiring that the employer own the task. The owner restriction is pending contract review.
- **Actor:** Task-owning employer.
- **Preconditions:** Task is assigned; caller is an employer. Requiring that the employer own the task is a proposed rule pending review because the operation description does not expressly state ownership.
- **Requirement and normal flow:** Record a simulated hold separately from task assignment. No money or payment details are processed.
- **Acceptance criteria:**
  - Given an assigned task, the operation succeeds with a `PaymentSimulation` status of `HELD_SIMULATED`. The response may include `disclaimer`; the API does not require this optional field. The simulated-payment experience must not move real money or process payment details. Whether a no-real-money disclaimer is mandatory in the UI, or whether the contract should make the response field required, remains a pending team decision.
  - Given a task not in `ASSIGNED`, or an existing hold, then response is `409` and no second hold is recorded.
  - A non-employer receives `403`; missing task returns `404`.
  - An employer who does not own the task receives `403` [P: task-owner restriction; confirm against the API contract].
- **Failure cases:** `401`, `403`, `404`, `409`.
- **State transition:** Payment status `NOT_HELD` → `HELD_SIMULATED`; task status remains subject to the contract's status model (no change is specified by this operation).
- **Traceability:** US-07 / issue #7; `simulatePaymentHold`; proposed V-011.

### FR-012 — Submit or resubmit task evidence

- **Status:** C for assigned-worker/hold rules and request shape; media policy and exact resubmission transition U.
- **Actor:** Assigned task taker.
- **Preconditions:** Task exists, caller is its assigned task taker, simulated payment is held, and task is in an evidence-submission-eligible state.
- **Requirement and normal flow:** Submit 1–5 photos and notes of 10–2000 characters using multipart form data. A task taker may resubmit after a revision request.
- **Acceptance criteria:**
  - Given valid evidence in a team-approved submission-eligible state, then response is `201` with an EvidenceSubmission identifying task, worker, photo count, notes, and submission time. The precise eligible states remain pending team/contract review.
  - Fewer than one or more than five photos, or notes outside the specified range, are rejected with the contracted `400` response [P; confirm validation mapping during contract review].
  - Proposed negative case pending authorization-matrix review: a non-assigned task taker, employer, or unrelated user is denied evidence submission and no evidence/state is written. The applicable role/ownership rule and error code must follow the reviewed contract.
  - Evidence is stored in protected storage [C as an API description requirement; implementation details remain future design].
  - Supported file media types and maximum file size are unresolved; do not add limits without a reviewed decision and contract update.
- **Failure cases:** `400`, `401`, `403`, `404`, `409` as applicable. A missing hold is a conflict under the API description.
- **State transition:** Eligible submission → `EVIDENCE_SUBMITTED`. After `REVISION_REQUESTED`, resubmission is permitted by the API description. The proposed transition `REVISION_REQUESTED` → `EVIDENCE_SUBMITTED` on resubmission is pending team approval and contract clarification.
- **Traceability:** US-08 / issue #8 and US-09 / issue #9; `submitTaskEvidence`; proposed V-012.

### FR-013 — View authorized evidence metadata

- **Status:** C that an authorized task participant can list metadata and that photo content requires controlled file access; exact participant matrix and file route U.
- **Actor:** Authorized task participant, subject to the pending access decision.
- **Preconditions:** Valid token; task exists; caller is permitted by the reviewed evidence access matrix.
- **Requirement and normal flow:** Return evidence metadata without granting public access to photo content. Photo content must use an authorized, access-controlled file endpoint; no such endpoint is presently defined in the supplied OpenAPI paths.
- **Acceptance criteria:**
  - A permitted participant receives `200` with evidence metadata.
  - An unrelated user receives `403` and cannot read private evidence [C from US-13's acceptance intent].
  - No/invalid token returns `401`; missing task returns `404`.
  - The proposed owner-and-assigned-task-taker visibility rule in the Sprint 2 quality examples requires team agreement before it becomes normative.
- **Failure cases:** `401`, `403`, `404`.
- **State transition:** None.
- **Traceability:** US-08 and US-13 / issue #8 and #13; `listTaskEvidence`; proposed V-013.

### FR-014 — Review evidence, request revision, or approve completion

- **Status:** C for decision values and atomic approval conditions; revision preconditions, actor ownership detail, and note policy U.
- **Actor:** Task-owning employer.
- **Preconditions:** Task exists; evidence has been submitted; caller is authorized to review.
- **Requirement and normal flow:** Record `APPROVE` or `REQUEST_REVISION`. Approval is allowed only while task status is `EVIDENCE_SUBMITTED` and payment status is `HELD_SIMULATED`; approval atomically completes the task and records a simulated release. A revision request records `REVISION_REQUESTED`.
- **Acceptance criteria:**
  - Given `APPROVE` with submitted evidence and a simulated hold, then response is `200`, task status is `COMPLETED`, and payment status is `RELEASED_SIMULATED` in the same successful operation.
  - Given approval without evidence or without a simulated hold, then response is `409` and neither task completion nor payment release occurs.
  - Given `REQUEST_REVISION` under a team-agreed precondition, response is proposed as `200` and task status as `REVISION_REQUESTED`; the precondition and response mapping require team/contract confirmation.
  - Missing task returns `404`; malformed decision returns the contract-defined `400`. A non-owner `403` is a proposed owner restriction pending contract review.
  - Review note is optional in the current schema and limited to 500 characters; whether it is mandatory for either decision is unresolved.
- **Failure cases:** `400`, `401`, `403`, `404`, `409`; failed review must not partially update task/payment state [P, aligned with the atomic contract statement].
- **State transition:** Approval: `EVIDENCE_SUBMITTED` → `COMPLETED`, payment `HELD_SIMULATED` → `RELEASED_SIMULATED`. Revision: `EVIDENCE_SUBMITTED` → `REVISION_REQUESTED` under the proposed precondition.
- **Traceability:** US-09 and US-10 / issue #9 and #10; `reviewTaskEvidence`; proposed V-014.

### FR-015 — Cancel an eligible task

- **Status:** C that duplicate terminal actions conflict; cancellation states are preliminary in OpenAPI and require team confirmation.
- **Actor:** Task-owning employer.
- **Preconditions:** Task exists, caller owns the task, and its state is eligible under the confirmed cancellation policy.
- **Requirement and normal flow:** Cancel an eligible unfinished task. The OpenAPI draft's preliminary policy permits cancellation in `OPEN` or `ASSIGNED` only; a simulated hold is voided if present.
- **Acceptance criteria:**
  - Given an eligible task, then response is `200`, status becomes `CANCELLED`, and any simulated hold becomes `VOIDED_SIMULATED`.
  - Given a task in a disallowed state or a repeated terminal action, then response is `409` and no additional state change occurs.
  - Missing task returns `404`. A non-owner `403` is a proposed owner restriction pending contract review.
- **Failure cases:** `401`, `403`, `404`, `409`.
- **State transition:** `OPEN` or `ASSIGNED` → `CANCELLED` (preliminary); payment `HELD_SIMULATED` → `VOIDED_SIMULATED` if applicable.
- **Traceability:** US-11 / issue #11; `cancelTask`; proposed V-015.

### FR-016 — View task history

- **Status:** C for participant history operation and event fields; visibility and event coverage U.
- **Actor:** Authorized task participant.
- **Preconditions:** Valid token; task exists; caller is an authorized participant under the policy to be agreed.
- **Requirement and normal flow:** Return task audit events, each with event id, task id, actor id, action, and occurrence time; detail may be null.
- **Acceptance criteria:**
  - An authorized participant receives `200` with a list of TaskEvent records.
  - A non-participant receives `403`; no/invalid token returns `401`; missing task returns `404`.
  - The history includes assignment, evidence-submission, and review events [C: existing US-12 acceptance evidence].
  - Whether additional event types, such as cancellation and payment simulation, are included, and the field-level visibility rules remain unresolved.
- **Failure cases:** `401`, `403`, `404`.
- **State transition:** None; this operation reads history.
- **Traceability:** US-12 / issue #12; `getTaskHistory`; proposed V-016.

### FR-017 — Enforce authentication, authorization, and privacy across operations

- **Status:** C for Bearer authentication and role/ownership expectations present in stories and OpenAPI; full object-access matrix U.
- **Actors:** All authenticated roles and unauthenticated callers.
- **Preconditions:** Each request is evaluated against the authenticated principal, role, task ownership, assignment, and resource state as applicable.
- **Requirement and normal flow:** Protected operations enforce the documented identity, role, ownership, and state rules. Only the task's participants may access private task/evidence information under the policy to be finalized.
- **Acceptance criteria:**
  - A protected request with no/invalid credentials returns `401`.
  - A valid user with the wrong role/ownership returns `403`.
  - A forbidden write leaves persisted data and task/payment state unchanged [P, proposed negative-test assertion].
  - An unrelated user cannot retrieve private evidence [C as US-13 intent; precise participant rules U].
  - Task-creator ownership is derived from the authenticated principal and cannot be overridden by client-supplied server-owned fields [P from US-03 planned security test; unknown-property behavior itself U].
- **Failure cases:** `401`, `403`, `404` as applicable; conflicts are `409` for invalid lifecycle transitions.
- **State transition:** None by itself; it prevents unauthorized transitions across FR-005 and FR-008–FR-015.
- **Traceability:** US-01, US-03, US-05–US-13 / issues #1, #3, #5–#13; all protected operations, especially `createTask`, `applyForTask`, `assignTask`, `submitTaskEvidence`, `listTaskEvidence`, `reviewTaskEvidence`, `cancelTask`, and `getTaskHistory`; proposed V-017.

## 8. End-to-end workflows

The flow identifiers below are proposed design-flow labels for traceability. They do not claim that Figma frames, user-flow diagrams, or prototype tests are complete. Actual design links for applicable requirements and stories, editable Turkish Figma frames, annotated user-flow diagrams, and reviewer-access verification remain outstanding Sprint 2 deliverables; add links when those artifacts exist.

### FLOW-01 — Account and profile

1. A user registers as `EMPLOYER` or `TASK_TAKER`.
2. The user signs in and receives a Bearer token.
3. The user views and updates their own profile. City, occupation, and skills remain self-declared.
4. A task taker must have a declared operating city before applying.

Related requirements: FR-001–FR-004. Stories: US-01, US-02.

### FLOW-02 — Employer creates a task

1. The employer enters the required photo-check task information.
2. The employer confirms that owner/location permission will be secured.
3. The API validates the request and, if successful, creates an `OPEN` task owned by the authenticated employer.
4. Invalid or unauthorized requests are rejected without task creation as a proposed acceptance condition.

Related requirements: FR-005, FR-017. Story: US-03.

### FLOW-03 — Task taker discovers and applies

1. The task taker browses tasks and may filter by city, category, or status.
2. The task taker opens an eligible task and reviews its details.
3. The task taker submits at most one application, with an optional note.
4. Duplicate, self-application, missing-city, wrong-role, and invalid-state cases are rejected according to the contract.

Related requirements: FR-006–FR-008, FR-017. Stories: US-04, US-05.

### FLOW-04 — Employer selects and records simulated hold

1. The employer lists applicants for their task.
2. The employer selects one applicant.
3. The system atomically assigns the task to one worker and changes it to `ASSIGNED`.
4. The employer separately records a simulated hold. No funds move.

Related requirements: FR-009–FR-011, FR-017. Stories: US-06, US-07.

### FLOW-05 — Evidence, review, and completion

1. The assigned task taker submits permitted evidence after a simulated hold.
2. The employer reviews the evidence and either requests revision or approves it.
3. A revision request allows the assigned task taker to resubmit; the exact transition/policy is to be confirmed.
4. Approval requires submitted evidence and a simulated hold; completion and simulated release occur atomically.
5. Only authorized participants may view evidence under the agreed privacy matrix.

Related requirements: FR-012–FR-014, FR-017. Stories: US-08, US-09, US-10, US-13.

### FLOW-06 — Cancellation and history

1. The employer may cancel a task only under the confirmed cancellation policy.
2. An eligible cancellation records `CANCELLED`; an existing simulated hold is voided according to the preliminary API policy.
3. Authorized participants retrieve the task history.

Related requirements: FR-015–FR-017. Stories: US-11, US-12, US-13.

## 9. External interface requirements

### 9.1 API baseline

Base URL in the current OpenAPI draft: `/api/v1`. Bearer authentication is the default; registration and login are explicitly public. The API contract and schemas are in `api/openapi.yaml` and are draft version `0.2.1-draft`.

| OpenAPI operation | Method and path | Request/response concepts | Related FRs |
|---|---|---|---|
| `getHealth` | GET `/health` | Health readiness; `200` or `503` | System baseline only; not a business FR |
| `registerUser` | POST `/auth/register` | RegisterRequest → Profile; `201`, `400`, `409` | FR-001 |
| `createSession` | POST `/auth/login` | LoginRequest → AccessToken; `200`, `400`, `401` | FR-002 |
| `getMyProfile` | GET `/me` | Profile; `200`, `401` | FR-003, FR-004 |
| `updateMyProfile` | PATCH `/me` | ProfileUpdate → Profile; `200`, `400`, `401` | FR-004 |
| `listTasks` | GET `/tasks` | Optional city/category/status filters → Task array; `200`, `400`, `401` | FR-006 |
| `createTask` | POST `/tasks` | NewTask → Task; `201`, `400`, `401`, `403` | FR-005, FR-017 |
| `getTask` | GET `/tasks/{taskId}` | Task; `200`, `401`, `403`, `404` | FR-007, FR-017 |
| `applyForTask` | POST `/tasks/{taskId}/applications` | Optional note → TaskApplication; `201`, `400`, `401`, `403`, `404`, `409` | FR-008, FR-017 |
| `listTaskApplications` | GET `/tasks/{taskId}/applications` | TaskApplication array; `200`, `401`, `403`, `404` | FR-009, FR-017 |
| `assignTask` | POST `/tasks/{taskId}/assignment` | applicationId → Task; `200`, `400`, `401`, `403`, `404`, `409` | FR-010, FR-017 |
| `simulatePaymentHold` | POST `/tasks/{taskId}/payment-simulation/hold` | PaymentSimulation; `200`, `401`, `403`, `404`, `409` | FR-011, FR-017 |
| `submitTaskEvidence` | POST `/tasks/{taskId}/evidence` | Multipart photos and notes → EvidenceSubmission; `201`, `400`, `401`, `403`, `404`, `409` | FR-012, FR-017 |
| `listTaskEvidence` | GET `/tasks/{taskId}/evidence` | EvidenceSubmission metadata array; `200`, `401`, `403`, `404` | FR-013, FR-017 |
| `reviewTaskEvidence` | POST `/tasks/{taskId}/review` | ReviewRequest → Task; `200`, `400`, `401`, `403`, `404`, `409` | FR-014, FR-017 |
| `cancelTask` | POST `/tasks/{taskId}/cancel` | Task; `200`, `401`, `403`, `404`, `409` | FR-015, FR-017 |
| `getTaskHistory` | GET `/tasks/{taskId}/history` | TaskEvent array; `200`, `401`, `403`, `404` | FR-016, FR-017 |

### 9.2 Error response conventions

Documented Problem responses use `application/problem+json` and require `title`, `status`, and `code`; `detail` is optional. The specific error-code catalogue, validation precedence, and public persistence-failure response are not specified. A feature specification must not invent these values or substitute undocumented status codes.

### 9.3 User interface and prototype boundary

The Sprint 2 plan proposes Turkish-first screens and two separate prototype starting points: employer and task taker. Prototype interactions use fictional fixtures and local state, with no live backend calls, real accounts, upload service, persistent data service, or payment integration. Frame names, exact navigation routes, timeout/retry behavior, and final Figma links remain to be agreed/created. This SRS does not claim that the prototype exists or has been usability-tested.

## 10. Non-functional requirements and quality references

The separate quality specification and verification matrix required by the Sprint 2 plan remain outstanding deliverables; this section does not satisfy or replace them. The following topics are references for that work, not approved numerical targets or completed test results. Any NFR identifiers below are proposed placeholders and must be coordinated with the quality-specification owner.

| Proposed reference | Quality topic from repository sources | Required SRS/quality-spec content still needed |
|---|---|---|
| NFR-PRIV-01 | Private evidence and role/ownership access (US-13) | Approved access matrix, scenarios, acceptance threshold, and evidence location. |
| NFR-INT-01 | State integrity and atomic single assignment | Agreed concurrency scenario, data setup, expected conflict behavior, and verification stage. |
| NFR-A11Y-01 | Accessibility of forms and screens | Agreed standard/target, affected screens, and measurement method. The plan contains illustrative contrast guidance only. |
| NFR-USE-01 | Turkish employer/task-taker journey usability | Agreed walkthrough tasks, participants or review method, success criteria, and evidence record. |
| NFR-PERF-01 | Task-list performance | Agreed workload, environment, measurement method, and target. The plan's numerical example is illustrative and not approved. |
| NFR-REL-01 | Health behavior when the database is unavailable | Link to the already documented health contract and actual verification record only when applicable; no new result is claimed here. |

Current implementation is health-only. This SRS does not claim runtime measurements, feature tests, accessibility results, privacy test results, or user research. The Sprint 2 plan's proposed example values must not be treated as approved until recorded as a real team decision.

## 11. Requirements traceability, verification scenarios, and open decisions

### 11.1 Traceability matrix

Verification scenario IDs are proposed test-design placeholders. They identify work to design; they do not state that tests have been written or run. Design flow IDs refer to Section 8 and do not imply that diagrams or Figma frames are complete.

| FR | Existing User Story / issue | OpenAPI operation(s) | Proposed design flow | Proposed verification scenario |
|---|---|---|---|---|
| FR-001 | US-01 / #1 | `registerUser` | FLOW-01 | V-001: valid, duplicate, invalid role/input registration |
| FR-002 | US-01 / #1 | `createSession` | FLOW-01 | V-002: valid login and invalid credentials |
| FR-003 | US-01, US-02 / #1, #2 | `getMyProfile` | FLOW-01 | V-003: own-profile retrieval and unauthenticated rejection |
| FR-004 | US-02 / #2 | `updateMyProfile`, `getMyProfile` | FLOW-01 | V-004: valid profile bounds, invalid bounds, city prerequisite |
| FR-005 | US-03 / #3 | `createTask` | FLOW-02 | V-005: valid create; field boundaries; 401/403; rejected request has no write |
| FR-006 | US-04 / #4 | `listTasks` | FLOW-03 | V-006: city/category/status combinations and valid empty result |
| FR-007 | US-04 / #4 | `getTask` | FLOW-03 | V-007: allowed detail, missing task, role/access matrix |
| FR-008 | US-05 / #5 | `applyForTask` | FLOW-03 | V-008: eligible application, duplicate, self-apply, missing city, wrong role |
| FR-009 | US-06 / #6 | `listTaskApplications` | FLOW-04 | V-009: owner access and non-owner rejection |
| FR-010 | US-06 / #6 | `assignTask`, `listTaskApplications` | FLOW-04 | V-010: one assignment, competing requests, no partial losing write |
| FR-011 | US-07 / #7 | `simulatePaymentHold` | FLOW-04 | V-011: assigned-task hold, repeat and invalid-state conflict, no real payment |
| FR-012 | US-08 / #8; US-09 / #9 | `submitTaskEvidence` | FLOW-05 | V-012: evidence bounds, role/assignment, hold prerequisite, resubmission |
| FR-013 | US-08 / #8; US-13 / #13 | `listTaskEvidence` | FLOW-05 | V-013: participant access, unrelated-user denial, file route decision |
| FR-014 | US-09 / #9; US-10 / #10 | `reviewTaskEvidence` | FLOW-05 | V-014: revision, valid approval, missing evidence/hold conflict, atomic result |
| FR-015 | US-11 / #11 | `cancelTask` | FLOW-06 | V-015: allowed/disallowed cancellation, hold voiding, duplicate terminal conflict |
| FR-016 | US-12 / #12 | `getTaskHistory` | FLOW-06 | V-016: participant history, unauthorized access, agreed event set |
| FR-017 | US-01–US-13 / #1–#13 | All protected operations listed in Section 9 | FLOW-01–FLOW-06 | V-017: role/ownership matrix, private data denial, no-write assertions |

### 11.2 Existing story disposition

| Story | Issue | SRS disposition | Dependencies |
|---|---:|---|---|
| US-01 | #1 | In-scope identity, session, role access, and profile retrieval | — |
| US-02 | #2 | In-scope self-declared profile attributes | US-01 |
| US-03 | #3 | In-scope bounded task creation | US-01 |
| US-04 | #4 | In-scope task discovery and detail | US-03 |
| US-05 | #5 | In-scope application | US-03 |
| US-06 | #6 | In-scope applicant list and single assignment | US-05 |
| US-07 | #7 | In-scope simulated hold | US-06 |
| US-08 | #8 | In-scope private evidence submission | US-06, US-07 |
| US-09 | #9 | In-scope review and revision request | US-08 |
| US-10 | #10 | In-scope approval/completion and simulated release | US-07, US-09 |
| US-11 | #11 | In-scope candidate cancellation; policy remains preliminary pending agreement | US-03 |
| US-12 | #12 | In-scope participant history; visibility/event details unresolved | US-06 |
| US-13 | #13 | In-scope privacy/access control; exact participant matrix unresolved | US-01, US-08 |
| US-14 | #14 | **Deferred; outside MVP. No FR or API operation.** | US-10 (deferred) |
| US-15 | #15 | **Deferred; outside MVP. No FR or API operation.** | US-02, US-04 (deferred) |

### 11.3 Open decisions requiring named owners and recorded outcomes

The table identifies decision topics present in the sources. The owners below are suggested from the Sprint 2 plan/specification role labels; no decision or approval is implied.

| Open decision | Suggested reviewers from source documents | Affected requirements |
|---|---|---|
| Evidence download route/identifier and participant access | PO, TL, QA | FR-007, FR-013, FR-017 |
| Supported media types, maximum size, protected storage/retention, and how photo permission is recorded | PO, TL, QA | FR-005, FR-012, FR-013 |
| Revision-request preconditions, resubmission transition, and whether review notes are mandatory | PO, TL, QA | FR-012, FR-014 |
| Discovery defaults, pagination, role-appropriate fields, and history visibility | PO, TL, QA | FR-006, FR-007, FR-016 |
| Initial payment status and unassigned-worker representation after task creation; event/history scope | PO, TL, QA | FR-005, FR-011, FR-016 |
| Blank/whitespace city or evidence rules; unknown-property handling; compensation precision; past deadlines | PO, TL, QA | FR-004–FR-006 |
| Validation precedence, specific Problem codes, and public persistence-failure response | TL, QA | FR-001, FR-005–FR-016 |
| Cancellation policy confirmation and terminal-action behavior | PO, TL, QA | FR-015 |
| Authentication token expiration/refresh policy | PO, TL, QA | FR-002 |
| Whether the UI must always show a no-real-money disclaimer, or `PaymentSimulation.disclaimer` should become required in the API contract | PO, TL, QA | FR-011 |
| Whether employer-only operations also require task ownership, including applicant listing and payment hold; confirm the ownership checks for assignment, review, and cancellation against their existing story criteria and the OpenAPI contract | PO, TL, QA | FR-009–FR-011, FR-014–FR-015, FR-017 |
| Approval of the proposed SRS FR, NFR, FLOW, and verification scenario identifier schemes; preserve existing US and issue identifiers | PO, SM, QA, TL | Sections 7, 8, 10, 11 |
| Identification of any external stakeholders and any stakeholder-validation evidence; none is documented in the supplied source set | PO, SM | Sections 1, 4 |
| Sprint deliverable due date, format, rubric details, and quality targets | Sprint team; plan notes these as open | Sections 1, 10, 11 |

Changes to an OpenAPI rule require reviewed reconciliation before implementation. Each decision should record its source/date, owner, affected story and FR, and any resulting acceptance-criteria or contract change. No signature, approval, implementation result, test execution, or stakeholder evidence is asserted by this draft.
