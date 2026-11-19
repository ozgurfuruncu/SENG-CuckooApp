# Sprint 2 PO decision register

**DRAFT — PENDING TEAM REVIEW AND APPROVAL**
**Project:** SENG 321 · Team 5 · CuckooApp
**Approval status for every item:** **PENDING**

Recommendations below are proposals, not team decisions. Record actual options,
decision source/date, owner, and follow-up in the [Sprint decision record](templates/02-sprint-decision-log.md).
Any approved API behavior change requires reviewed reconciliation in the linked
issue and [OpenAPI draft](../api/openapi.yaml) before implementation.

| ID / priority | Unresolved question | Proposal (not approved) | Required reviewers | Affected stories / contract artifacts | Approval status |
|---|---|---|---|---|---|
| DEC-01 Blocker | Which participants may view evidence metadata and photo files? Are unselected applicants excluded? | Limit access to the task employer and assigned task taker; deny unrelated users and unselected applicants. | PO + TL + QA; team records policy | US-08, US-13; SRS FR-013/017; OpenAPI evidence operations; privacy quality matrix | **PENDING** |
| DEC-02 Blocker | What media types and maximum size are accepted; how are files stored/retained; what route/identifier serves them; how is permission to photograph recorded? | Agree a small image allowlist, explicit size/retention limits, protected storage, an authenticated access-controlled file route, and an employer attestation. Set exact limits with TL/QA feasibility input. | PO + TL + QA; team for retention policy | US-03, US-08, US-13; SRS FR-005/012/013; OpenAPI task/evidence schemas and any new file operation; contract reconciliation | **PENDING** |
| DEC-03 Blocker | When may revision be requested, what state follows resubmission, and is a review note mandatory? | Permit revision after evidence submission; require a clear note for a revision request; resubmission returns to `EVIDENCE_SUBMITTED`. | PO + TL + QA | US-08, US-09, US-10; SRS FR-012/014; OpenAPI `submitTaskEvidence`/`reviewTaskEvidence` | **PENDING** |
| DEC-04 Blocker | Which employer operations require task ownership: listing applicants, assignment, hold, review, cancellation? | Require ownership for all task-specific employer actions and deny non-owners; confirm each operation's status mapping in contract review. | PO + TL + QA | US-06, US-07, US-09–US-11; SRS FR-009–011/014/015/017; applicable OpenAPI operation descriptions | **PENDING** |
| DEC-05 Blocker | Which task/application states allow assignment, how are unselected applications handled, and what happens to a losing concurrent request? | Assign only an application belonging to an eligible open task; allow one winner; make the losing request conflict without partial writes; close/disable remaining applications. Last behavior needs team confirmation. | PO + TL + QA | US-05/06; SRS FR-008/010; OpenAPI `assignTask`; concurrency test design | **PENDING** |
| DEC-06 Blocker | Is cancellation permitted in `OPEN` and `ASSIGNED`; does a held simulation become `VOIDED_SIMULATED`; how are duplicate terminal actions handled? | Allow only `OPEN`/`ASSIGNED`; void an existing simulated hold; reject duplicate terminal cancellation with the canonical conflict. | PO + TL + QA | US-11; SRS FR-015; OpenAPI `cancelTask`; task/payment state model | **PENDING** |
| DEC-07 | What status is used by default for task discovery, how are filters combined, and which actors/fields are visible in list/detail views? | Default to open tasks and combine supplied filters with AND; approve an explicit role/field matrix. Defer pagination unless needed for agreed quality targets. | PO + TL + QA | US-04; SRS FR-006/007; OpenAPI `listTasks`/`getTask`; prototype | **PENDING** |
| DEC-08 | Must task city match the task taker's self-declared city to apply? | Require a declared city as the current contract says; do not require city equality unless the team chooses that product restriction. | PO + TL + QA | US-02/05; SRS FR-004/008; OpenAPI `applyForTask` | **PENDING** |
| DEC-09 | What initial payment/assignment values and validation behavior apply on task creation: blank text, unknown fields, amount precision, past deadline? | Initialize as `NOT_HELD` and unassigned; explicitly decide all validation behavior in contract rather than rely on framework defaults. Exact validation choices remain open. | PO + TL + QA | US-03; SRS FR-005; OpenAPI create/task schemas; US-03 issue/spec | **PENDING** |
| DEC-10 | Must UI always label payment simulation, and should `PaymentSimulation.disclaimer` become required? | Always label the UI interaction “simulated/no real money”; retain optional API field unless the team chooses a canonical server-supplied disclaimer. | PO + TL + QA | US-07; SRS FR-011; OpenAPI `PaymentSimulation`; prototype | **PENDING** |
| DEC-11 | What events and fields appear in task history, who can see them, and in what order? | Include assignment, evidence, review/revision, cancellation, and simulated hold/release/void events; show only to approved participants and exclude private file content. | PO + TL + QA | US-12/13; SRS FR-016/017; OpenAPI `TaskEvent`/`getTaskHistory`; prototype | **PENDING** |
| DEC-12 | What token expiry/refresh policy, unsupported-role response, blank profile behavior, and profile editing policy are in scope? | Keep refresh out of MVP unless needed; use contract-aligned validation; define blank/null behavior and whether editable self-declared fields apply to employers. | PO + TL + QA | US-01/02; SRS FR-001/002/004; OpenAPI auth/profile schemas | **PENDING** |
| DEC-13 | Which example quality targets become commitments, and at what stage are they verified? | Approve only targets with an owner, method, workload/environment, pass criterion, and evidence stage; distinguish prototype checks from runtime checks. | QA + TL + DO + PO/team | US-04/06/08/13 and relevant components; SRS NFR references; separate quality spec/matrix | **PENDING** |
| DEC-14 | What is the actual Sprint 2 goal, selected deliverable scope, capacity, owners/reviewers, deadline, and tag convention? | Use the scope proposal in `sprint-2-po-scope.md` as a discussion starting point; choose commitments during planning without changing canonical backlog data absent approval. | Whole team (PO proposes; SM facilitates; team agrees) | Sprint plan and `templates/02-sprint-decision-log.md`; submission index | **PENDING** |

## Boundary

All recommendations preserve `VEHICLE_PHOTO_CHECK`, `EMPLOYER`/`TASK_TAKER`,
self-declared profile attributes, simulated-only payment, and the modular
monolith. US-14/15 remain deferred. No row authorizes real payments, escrow,
identity or credential verification, vehicle custody/driving, professional
inspection, or legal representation.
