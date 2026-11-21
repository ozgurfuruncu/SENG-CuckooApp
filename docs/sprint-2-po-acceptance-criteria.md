# Sprint 2 PO acceptance-criteria proposals

**DRAFT — PENDING TEAM REVIEW AND APPROVAL**
**Project:** SENG 321 · Team 5 · CuckooApp
**Owner:** Product Owner (Elif Nur Akbaş)

These scenarios propose clearer verification wording for existing US-01–US-13.
They do not change issue acceptance criteria or authorize implementation. Use
the current [OpenAPI draft](../api/openapi.yaml) and linked issue criteria as the
contract. Where the contract does not define a response/status, the expected
mapping is explicitly pending review; no new API behavior is implied. All
verification is proposed, not reported as run.

## US-01 — Registration, sign-in, roles

- **US-01-AC01 (positive):** Given a valid email, a password meeting the current minimum, and either `EMPLOYER` or `TASK_TAKER`, when the user registers, then the operation returns `201` with a profile.
- **US-01-AC02 (negative):** Given an already registered email, when registration is attempted, then the operation returns the contract-defined `409` and does not create a second account.
- **US-01-AC03 (positive/negative):** Given valid credentials, when login is requested, then it returns `200` with a Bearer access token; given invalid credentials, then it returns the contract-defined `401`.
- **US-01-AC04 (authorization):** Given no/invalid token, when a protected profile operation is requested, then it returns the contract-defined `401`; given a role forbidden for a named operation, then the operation is denied. **Exact role-operation matrix and error mapping: unresolved; confirm against OpenAPI/issues before approval.**
- **US-01-AC05 (no-write):** Given invalid registration data or an unsupported role, when registration is attempted, then no account is created. **Unsupported-role response mapping: unresolved.**

## US-02 — Self-declared profile

- **US-02-AC01 (positive):** Given an authenticated task taker, when valid city and optional occupation/skill values are saved within the OpenAPI limits, then the profile response reflects those values and `selfDeclared: true`.
- **US-02-AC02 (negative):** Given a profile update exceeding a documented length/count limit, when saved, then the request is rejected using the contract-defined invalid-input response and the profile is unchanged.
- **US-02-AC03 (authorization):** Given no/invalid token, when the profile is updated, then the contract-defined `401` is returned and no profile change is made.
- **US-02-AC04 (eligibility):** Given a task taker with no declared operating city, when they apply to a task, then application is denied and no application is created. **Error mapping: confirm in contract review.**
- **Unresolved:** Blank/whitespace/null behavior and whether employers may edit occupation/skills.

## US-03 — Create a vehicle photo-check task

- **US-03-AC01 (positive):** Given an authenticated employer and a request valid under the reviewed schema, when task creation succeeds, then response is `201`, status is `OPEN`, owner is derived from the authenticated principal, and server-owned ID/time are present.
- **US-03-AC02 (negative/no-write):** Given missing required fields, out-of-contract bounds, unsupported category, negative compensation, or permission confirmation other than `true`, when creation is attempted, then the contract-defined invalid-input response is returned and no task is persisted.
- **US-03-AC03 (authorization/no-write):** Given no/invalid token or a task-taker token, when task creation is attempted, then the contract-defined denial is returned and no task is persisted. Expected status mapping follows the reviewed OpenAPI/issue criteria.
- **US-03-AC04 (ownership):** Given client-supplied owner or lifecycle values, when task creation is attempted, then those values do not override server-derived ownership or the contract-defined initial state. **Unknown-property behavior and initial payment/assignment values: unresolved.**
- **Unresolved:** Blank fields, unknown properties, amount precision/display, past deadlines, validation precedence, and persistence-failure response.

## US-04 — Discover and view tasks

- **US-04-AC01 (positive):** Given a valid `status=OPEN` query and optional city/category filters, when a task taker lists tasks, then every returned task matches the supplied filters.
- **US-04-AC02 (empty):** Given valid filters with no matching tasks, when listing tasks, then the operation returns `200` with an empty collection.
- **US-04-AC03 (negative):** Given an invalid filter value, when listing tasks, then the contract-defined invalid-input response is returned.
- **US-04-AC04 (detail):** Given an existing task and an actor authorized by the approved access policy, when the actor requests details, then the operation returns `200`; a missing task returns the contract-defined `404`.
- **US-04-AC05 (authorization/privacy):** Given an actor outside the approved detail-access policy, when task details are requested, then access is denied and fields outside the actor's permission are not disclosed. **Actor/field matrix and response mapping: unresolved.**
- **Unresolved:** Default status, filter-combination semantics, pagination, role-specific fields/access, and performance target.

## US-05 — Apply to an open task

- **US-05-AC01 (positive):** Given an authenticated task taker with a declared city and an open task, when they apply once with an optional note within the schema limit, then the operation returns `201` with an application associated with that task and worker.
- **US-05-AC02 (negative/no-write):** Given the same worker already applied to that task, when they apply again, then the contract-defined conflict is returned and no duplicate application is created.
- **US-05-AC03 (authorization/no-write):** Given an employer applying to their own task or an actor with a forbidden role, when application is attempted, then it is denied and no application is created. **Exact status mapping follows contract review.**
- **US-05-AC04 (state/no-write):** Given a task that is not open or does not exist, when application is attempted, then the contract-defined conflict/not-found response is returned and no application is created.
- **Unresolved:** Whether worker and task cities must match; missing-city and invalid-note mappings.

## US-06 — List applicants and assign one

- **US-06-AC01 (positive/authorization):** Given an employer authorized for the task, when they list its applications, then the operation returns `200` with that task's applications; a task taker is denied under the employer-only operation contract.
- **US-06-AC02 (positive/state):** Given an eligible open task and an application belonging to it, when the authorized employer assigns that application, then the task becomes `ASSIGNED` to the selected worker.
- **US-06-AC03 (negative/state):** Given an application that does not belong to the task or a task in an ineligible state, when assignment is attempted, then the operation is rejected according to the reviewed contract and the task remains unchanged. **Exact response mapping: confirm.**
- **US-06-AC04 (concurrency/no-partial-write):** Given two competing assignment requests for one eligible task, when both are processed, then at most one assignment succeeds; the losing request receives the reviewed conflict response and leaves no partial assignment.
- **US-06-AC05 (authorization):** Given an employer who does not own the task, when they list applicants or assign one, then access is denied if the team approves owner-only behavior. **This owner rule is unresolved in the current contract.**
- **Unresolved:** Ownership checks, eligibility rules, disposition of unselected applications, and conflict/concurrency behavior details.

## US-07 — Simulated payment hold

- **US-07-AC01 (positive):** Given an eligible assigned task and an authorized employer, when a hold is recorded, then the operation returns the contract-defined success response with `HELD_SIMULATED`.
- **US-07-AC02 (negative/state/no-write):** Given a task not in the hold-eligible state or one already held, when another hold is attempted, then the contract-defined conflict is returned and payment status is unchanged.
- **US-07-AC03 (authorization):** Given a non-employer or a non-owning employer, when a hold is attempted, then the operation is denied according to the reviewed role/ownership policy. **Owner restriction and applicable status mapping require approval.**
- **US-07-AC04 (scope):** Given any hold interaction, when it is completed, then no real funds move and no payment details are processed.
- **Unresolved:** Owner rule, transaction behavior, and whether UI disclaimer must always appear or API disclaimer becomes required.

## US-08 — Submit private evidence

- **US-08-AC01 (positive):** Given the assigned task taker, an evidence-eligible task with simulated hold, and input within the current contract's photo-count and note limits, when evidence is submitted, then the operation returns `201` with submission metadata.
- **US-08-AC02 (negative/no-write):** Given photos or notes outside the contract bounds, when submitted, then the request is rejected using the reviewed invalid-input mapping and no evidence or task-state change is persisted.
- **US-08-AC03 (authorization/no-write):** Given an unassigned task taker, employer, or unrelated actor, when evidence submission is attempted, then it is denied according to the approved authorization policy and no evidence/state is written.
- **US-08-AC04 (state/no-write):** Given a task without a required simulated hold or in an ineligible state, when evidence is submitted, then it is rejected according to the reviewed transition contract and no evidence/state is written.
- **US-08-AC05 (privacy):** Given a successful evidence submission, when the files are stored, then they are protected and retrievable only under the approved access policy.
- **Unresolved:** Media types/size, storage/retention, permission recording, participant matrix, file route, resubmission transition, and exact error mappings.

## US-09 — Review evidence or request revision

- **US-09-AC01 (positive):** Given submitted evidence in a reviewable state, when the authorized employer requests revision, then the operation records `REVISION_REQUESTED` with the reviewed success response.
- **US-09-AC02 (positive/atomic):** Given submitted evidence and `HELD_SIMULATED`, when the authorized employer approves, then task completion and simulated release are recorded together as specified by the contract.
- **US-09-AC03 (negative/state/no-partial-write):** Given approval without evidence or without a simulated hold, when approval is attempted, then the contract-defined conflict is returned and neither completion nor release is recorded.
- **US-09-AC04 (authorization/no-write):** Given a reviewer who is not the task owner, when review is attempted, then the operation returns the OpenAPI-defined `403` and task/payment state is unchanged. This preserves the existing issue #9 “owner only” criterion; TL review must reconcile the owner rule explicitly into the OpenAPI description before implementation. A wrong-role actor is also denied under the reviewed role matrix.
- **US-09-AC05 (negative):** Given an invalid review decision or disallowed transition, when submitted, then the reviewed contract response is returned without partial state changes. **Exact response mapping for each case: confirm.**
- **Unresolved:** Revision precondition, resubmission state, note requirement, owner rule, and repeated approval behavior.

## US-10 — Complete task and simulate release

- **US-10-AC01 (positive):** Given submitted evidence, a simulated hold, and an authorized employer approval, when approval succeeds, then task status is `COMPLETED` and payment status is `RELEASED_SIMULATED` in the same successful operation.
- **US-10-AC02 (negative/no-partial-write):** Given missing evidence or missing hold, when approval is attempted, then the contract-defined conflict is returned and neither completion nor simulated release occurs.
- **US-10-AC03 (authorization/no-write):** Given a forbidden-role or non-owning actor, when approval is attempted, then it is denied under the reviewed policy and task/payment state remains unchanged.
- **US-10-AC04 (terminal state):** Given a completed task, when approval is repeated, then the reviewed terminal-state policy is applied and no additional payment transition occurs. **Response mapping: confirm against contract/issue.**
- **US-10-AC05 (scope):** Given a simulated release, no real funds are transferred.
- **Unresolved:** Ownership rule and exact repeated-terminal response.

## US-11 — Cancel eligible unfinished task

- **US-11-AC01 (positive/state):** Given an employer's task in `OPEN` or `ASSIGNED`, when the employer cancels it, then the operation returns the OpenAPI-defined `200` and task status becomes `CANCELLED`. This matches the canonical backlog and issue #11; the OpenAPI currently labels the same state policy preliminary, so reconcile that wording before implementation.
- **US-11-AC02 (payment state):** Given a cancellable assigned task with `HELD_SIMULATED`, when cancellation succeeds, then simulated payment status changes as approved by the contract decision. The current draft proposes `VOIDED_SIMULATED`; confirm before making normative.
- **US-11-AC03 (negative/terminal):** Given a task in a state other than `OPEN` or `ASSIGNED`, including a terminal state, when cancellation is attempted, then the canonical issue #11 conflict (`409`) is returned and no task/payment state changes. Confirm the OpenAPI's preliminary-policy wording against this accepted issue criterion during contract review.
- **US-11-AC04 (authorization/no-write):** Given no token, a wrong role, or a non-owning employer, when cancellation is attempted, then access is denied according to the reviewed contract and task/payment state is unchanged.
- **Unresolved:** OpenAPI reconciliation for the issue/backlog's `OPEN`/`ASSIGNED` and duplicate-terminal `409` rules; whether a simulated hold is voided on cancellation (present in preliminary OpenAPI); task-owner enforcement and exact authorization mapping.

## US-12 — View task history

- **US-12-AC01 (positive):** Given an actor permitted by the approved participant policy, when they request history for an existing task, then the operation returns `200` with at least assignment, evidence-submission, and review events and the contract-defined event fields.
- **US-12-AC02 (negative/privacy):** Given an actor outside the approved participant policy or no/invalid token, when history is requested, then access is denied using the reviewed contract response and private details are not disclosed.
- **US-12-AC03 (not-found):** Given a missing task, when history is requested, then the contract-defined not-found response is returned.
- **US-12-AC04 (ordering/completeness):** Given multiple recorded events, when history is returned, then ordering and additional event types follow the team-approved history policy. **Ordering and policy: unresolved.**

## US-13 — Control access to private task data

- **US-13-AC01 (positive):** Given a participant allowed by the approved access matrix, when they request evidence metadata, then only metadata permitted for that participant is returned.
- **US-13-AC02 (negative/privacy):** Given an unrelated user, when they request private metadata or file content, then no private evidence is disclosed and the request is denied according to the reviewed contract.
- **US-13-AC03 (authentication/not-found):** Given no/invalid token or a missing task, when evidence is requested, then the contract-defined unauthorized/not-found response is returned.
- **US-13-AC04 (file access):** Given a photo-content request, it is served only through the team-approved access-controlled route; public/uncontrolled file access is prohibited. **Route, identifier, participant matrix, and response mapping are unresolved.**

## Cross-story review note

Response codes stated above are included only where the current OpenAPI or
canonical backlog states them. Elsewhere, “reviewed contract response” is
deliberate: PO/TL/QA must settle the mapping in the linked issue and reconcile
the OpenAPI before implementation. Rejected authorization/state changes should
include negative and no-write verification cases under the canonical SDD rules.
