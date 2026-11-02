# US-03 — Create a bounded vehicle-photo-check task

Completed **documentation example**, prepared 2026-11-02 for [SDD #27](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/27).
Product story: [existing #3](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/3),
P0, 5 points. Status: **Specified; not approved for implementation**. The issue
was administratively closed; the API still implements health only. No feature
code, tests, migration or UI is delivered by this example.

PO/acceptance owner: Elif Nur Akbaş (`elfn0909`). Technical design: Emmanuel Alabi
(`anyx05`). QA: Jumanah Almodaen (`j7766n`). Frontend/integration: Özgür Furuncuoğlu
(`ozgurfuruncu`). DevOps: Emir Dizman (`lilemiv`). Process/traceability: Aslı Arıkoğlu
(`asliarikoglu`). These are [existing responsibilities](../team-raci.md), not new
implementation commitments or signatures. PO, TL and QA example approvals are
**pending**; no approval links exist for this specification yet.

## Story, scope and dependency

As an employer, I want to describe one permitted vehicle-photo-check task so that
a local task taker can understand the requested photographs and notes.

Include creation and its form/validation only. Exclude discovery, applications,
assignment, evidence uploads/review, real payments, escrow, identity/credential
verification, driving/custody, professional inspection and legal representation.
Only `VEHICLE_PHOTO_CHECK` is supported. Permission is employer-attested; the
platform does not verify permission or competence. City, skills and occupation
remain self-declared. Stakeholder validation is a documented hypothesis in the
proposal; no interview result is supplied here.

Dependency: US-01 / [#1](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/1)
must supply reviewed authentication/roles. Its endpoint is not implemented.
Ready gate is therefore unmet. PO/QA must review the detailed AC below as the
refinement of #3's required-field and unauthorized-create criteria before coding.

## Contract baseline and request

Immutable baseline: [OpenAPI at 08386a1](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/08386a19afdaddee67c230790de50fb7b95b342a/api/openapi.yaml),
OpenAPI 3.1.0 / API `0.2.1-draft`. Operation `createTask`: `POST /tasks` under
server base `/api/v1`, hence `POST /api/v1/tasks`. Bearer authentication; only
`EMPLOYER`. JSON request schema `NewTask`; 201 response schema `Task`.
Errors: 400/401/403, `application/problem+json`, schema `Problem` requiring
`title`, `status`, `code`; `detail` optional. No 409, 422, idempotency key or
creation retry guarantee is defined by this operation.

| Field | Current contract constraint |
| --- | --- |
| title | Required string, length 5–150 |
| description | Required string, length 20–2000 |
| city | Required string; no nonempty, normalization or city-directory rule specified |
| category | Required; exactly VEHICLE_PHOTO_CHECK |
| proposedCompensation | Required number >= 0; illustrative, no charge; no currency or decimal precision rule specified |
| requiredEvidence | Required string, max length 1000; no minimum length specified |
| permissionConfirmed | Required boolean, exactly true; employer attestation |
| requestedBy | Optional date-time string or null; no future-only rule specified |

Example request, compatible with the unchanged schema:

```json
{
  "title": "Permitted exterior vehicle photographs",
  "description": "Photograph the exterior with the owner's permission and record visible-condition notes only.",
  "city": "Ankara",
  "category": "VEHICLE_PHOTO_CHECK",
  "proposedCompensation": 250,
  "requiredEvidence": "Four exterior photographs and brief visible-condition notes.",
  "permissionConfirmed": true,
  "requestedBy": null
}
```

A 201 response includes the submitted `NewTask` data plus server-owned `id`,
`employerId`, `status`, `paymentSimulationStatus`, `createdAt`.
Contract guarantees `status=OPEN`. Proposed initial simulation state is
`NOT_HELD`, assigned worker null/absent; TL/PO/QA must confirm these defaults
because the create response schema enumerates states without constraining those
two fields to their initial values. No money moves.

## Acceptance criteria and designed tests

These cases are **planned**, not executed API/component tests. Every failure
case must assert no unauthorized/partial persistence or state change.

| AC | Given / when / then | Planned test IDs and level |
| --- | --- | --- |
| US-03-AC01 | Authenticated EMPLOYER submits the valid example → 201 Task, OPEN, employerId from authenticated principal, server id/time present; one row persisted | BE03-01 API + PostgreSQL; FE03-01 form success/integration |
| US-03-AC02 | Omit each required field, violate title/description/evidence bounds, send negative compensation, unsupported category, false permission or invalid requestedBy → 400 Problem, no row | BE03-02 parametrized schema/API; FE03-02 field/server errors |
| US-03-AC03 | No bearer token or invalid/expired token → 401 Problem, no row | BE03-03 API; FE03-03 sign-in/error state |
| US-03-AC04 | Valid TASK_TAKER token → 403 Problem, no row | BE03-04 API; FE03-04 forbidden state |
| US-03-AC05 | Employer creates task → task owner derives from principal, no assignment/hold/evidence/review side effects | BE03-05 transaction/integration; initial defaults pending decision below |
| US-03-AC06 | Frontend edits/submits → permission starts unchecked, pending disables submit, validation is associated with fields, server problems are visible, success displays returned id/status | FE03-05 React component/accessibility; actual API integration after backend delivery |

Boundary cases within BE03-02 include title lengths 5/150 accepted and 4/151
rejected; description 20/2000 accepted and 19/2001 rejected; requiredEvidence
1000 accepted and 1001 rejected; compensation 0 accepted; requestedBy omitted/null
accepted. Do not add silent business constraints for blank city/evidence or past
dates. Review those questions explicitly below.

## Domain, authorization, transactions and concurrency

Tasks module owns the task aggregate. Identity/profile supplies the authenticated
user and role through an internal interface. Applications/assignment,
evidence/reviews and simulated-payment behavior is outside this slice. SQLAlchemy
entity/migration design is future reviewed work: server id, employer FK, listing
fields, initial status and created time; no business tables currently exist.

| Actor | Create permission | Ownership rule |
| --- | --- | --- |
| Unauthenticated/invalid session | Denied 401 | No task written |
| TASK_TAKER | Denied 403 | No task written |
| EMPLOYER | Allowed with valid input | employerId is authenticated user's id |

Creation is a new aggregate → OPEN; no existing task transition occurs. Rejecting
an invalid/unauthorized request cannot change another aggregate. Persist the
validated task in one transaction; on persistence failure roll back. Public 5xx
body and creation-history event shape are not specified; resolve before delivery.

Concurrency test BE03-06 (planned): two valid independent create requests may each
create one distinct task; assert unique ids and correct owners, no cross-request
state leakage. Do not import assignment's single-winner/409 rule into creation.
No deduplication guarantee exists for repeated POSTs. FE03-06 (planned) simulates
a timeout: show outcome unknown, preserve the draft, avoid automatic retry and
warn that manual retry may duplicate the task. This is a proposed UI policy for
human review, not a server guarantee.

Security test BE03-07 (planned): a request supplies extra employerId/status/payment
fields; these must not override server ownership/lifecycle. Whether unknown
properties are ignored or rejected needs a reviewed decision: `NewTask` does not
currently forbid them. FE03-07 (planned) verifies descriptions render as text,
not executable markup. No upload/download endpoint is part of this story.

## UI and integration brief

Proposed employer create form in React/TypeScript/Vite: title, description, task
city, fixed supported category, illustrative compensation, evidence instructions,
unchecked permission confirmation and optional deadline. Currency is not invented.
Use ordinary field labels, keyboard navigation and an error summary with focus
after failed submission. Explain permitted photography and self-declared profile
attributes without claiming verification.

Idle → editing → submitting → success (returned task id/OPEN), validation error,
authentication required, forbidden or network outcome unknown. Proposed screen
route and success destination need frontend/PO review; no existing task detail
route is assumed. API base comes from environment/config; typed JSON uses the
contract's camelCase names. A 400 Problem is handled faithfully rather than a
mock success. Frontend component-test framework is not yet selected; agree it in
the implementation story before using FE03-* cases as executable evidence.

Backend future brief: FastAPI/Pydantic models and validation must produce the
contracted 400, not default 422; SQLAlchemy writes and Alembic upgrade/rollback
must be reviewed and tested with pytest and isolated PostgreSQL. Add the reviewed
business route without weakening health-only negative-route tests until the
story's changed behavior is explicitly authorized.

## Decisions required before implementation

| Decision / dependency | Owner(s) | Current state |
| --- | --- | --- |
| Accept detailed AC; deliver US-01 authentication dependency | PO/TL/QA | Pending; #1/#3 closure is administrative |
| Confirm NOT_HELD and unassigned initial state; event/history scope | TL/PO/QA | Pending contract clarification; no YAML change here |
| Blank/whitespace city/evidence, unknown properties, server-field handling, amount precision, past deadlines | PO/TL/QA | Keep baseline constraints; additional rejection rules require reviewed OpenAPI delta |
| Validation precedence and specific Problem.code values; public persistence-failure response | TL/QA | Pending; do not invent 409/422 or undocumented error schema |
| Screen route, timeout/retry UX and component-test tooling | Frontend/PO/QA | Proposed above; approval pending |

No detected implementation/contract contradiction is being coded around: this
task stops at documentation. Use #3 for its future refinement; follow
[contract reconciliation](../contract-reconciliation.md) before implementing.

## Agent limits, verification and traceability

For this example, allowed changes are docs/templates and evidence documentation
under #27/#20; no endpoint, model, migration, dependency or UI implementation.
Future allowed implementation files must be agreed in the story's backend and
frontend briefs; never use this example as blanket coding authorization.

| Requirement | Owner | Spec / operation | Designed tests | Actual feature result | PR / review / CI / merge / release |
| --- | --- | --- | --- | --- | --- |
| US-03-AC01 | PO/TL | #3, this spec; createTask / NewTask / Task | BE03-01, FE03-01 | Not run; not implemented | No feature PR/review/run/merge/release |
| US-03-AC02 | QA/TL | #3; createTask / Problem | BE03-02, FE03-02 | Not run; not implemented | Pending |
| US-03-AC03 | QA/TL | #3; BearerAuth / 401 | BE03-03, FE03-03 | Not run; blocked on US-01 | Pending |
| US-03-AC04 | QA/TL | #3; Role / 403 | BE03-04, FE03-04 | Not run; blocked on US-01 | Pending |
| US-03-AC05 | TL/QA | #3; Task ownership / initial state | BE03-05, BE03-06, BE03-07 | Not run; decisions pending | Pending |
| US-03-AC06 | Frontend/QA | This spec; form / createTask | FE03-05, FE03-06, FE03-07 | Not run; UI/tooling approval pending | Pending |

The valid request and schema boundary assumptions are checked as documentation
against the current YAML; those checks do not call createTask. Actual commands
and documentation results are in [the verification log](../audits/sprint1-verification-commands.md).
Use [Ready/Done gates](../templates/SDD_WORKFLOW.md) and
[traceability template](../templates/10-requirements-traceability.md) for delivery.
