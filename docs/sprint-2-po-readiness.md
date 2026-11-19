# Sprint 2 PO readiness and traceability

**DRAFT — PENDING TEAM REVIEW AND APPROVAL**
**Project:** SENG 321 · Team 5 · CuckooApp

This is a preparation view, not a team-approved sprint commitment or Definition
of Ready decision. Canonical priorities, estimates, dependencies, and scope are
copied without change from [product backlog](product-backlog.md). Stories remain
backlog/not implemented; GitHub administrative closure is not product acceptance.

## Story readiness

“Ready for review” means the proposed draft can be reviewed; it does not mean the
story is approved or Ready for implementation.

| Story | Canonical priority / points / dependencies | Draft traceability | Review/readiness status | Main blocker before implementation |
|---|---|---|---|---|
| US-01 | P0 / 5 / — | FR-001–003, 017; FLOW-01; `registerUser`, `createSession`, `getMyProfile` | Draft criteria ready for PO/TL/QA review | Role-operation matrix; unsupported-role response; token expiry/refresh policy |
| US-02 | P0 / 3 / US-01 | FR-003–004, 017; FLOW-01; `getMyProfile`, `updateMyProfile` | Draft criteria ready for review | Blank/null rules; employer editing policy; self-declaration copy |
| US-03 | P0 / 5 / US-01 | FR-005, 017; FLOW-02; `createTask` | Draft criteria ready for review | Initial state defaults; validation details; permission attestation; ownership/role contract review |
| US-04 | P0 / 3 / US-03 | FR-006–007, 017; FLOW-03; `listTasks`, `getTask` | Draft criteria ready for review | Default status, filters, role/field visibility, pagination/performance choice |
| US-05 | P0 / 3 / US-03 | FR-008, 017; FLOW-03; `applyForTask` | Draft criteria ready for review | City matching policy and precise missing-city/note response mapping |
| US-06 | P0 / 5 / US-05 | FR-009–010, 017; FLOW-04; `listTaskApplications`, `assignTask` | Draft criteria ready for review | Ownership, eligibility, unselected application disposition, conflict/concurrency contract |
| US-07 | P0 / 3 / US-06 | FR-011, 017; FLOW-04; `simulatePaymentHold` | Draft criteria ready for review | Ownership, transaction/no-partial-write rule, disclaimer policy |
| US-08 | P0 / 5 / US-06, US-07 | FR-012–013, 017; FLOW-05; `submitTaskEvidence`, `listTaskEvidence` | Draft criteria ready for review | Media/storage/retention, access matrix, download route, permission record, resubmission transition |
| US-09 | P0 / 5 / US-08 | FR-012, 014, 017; FLOW-05; `reviewTaskEvidence`, `submitTaskEvidence` | Draft criteria ready for review | Reconcile issue #9's owner-only rule with OpenAPI wording; revision precondition, note policy, resubmission state |
| US-10 | P0 / 3 / US-07, US-09 | FR-014, 017; FLOW-05; `reviewTaskEvidence` | Draft criteria ready for review | Confirm owner rule, atomic failure behavior, repeated approval mapping |
| US-11 | P1 / 3 / US-03 | FR-015, 017; FLOW-06; `cancelTask` | Draft criteria ready for review | Reconcile canonical OPEN/ASSIGNED plus duplicate-terminal conflict rule with preliminary OpenAPI text; confirm hold voiding and ownership |
| US-12 | P1 / 3 / US-06 | FR-016–017; FLOW-06; `getTaskHistory` | Draft criteria ready for review | Participant visibility, event set/ordering/detail privacy |
| US-13 | P1 / 5 / US-01, US-08 | FR-013, 017; FLOW-05; `listTaskEvidence` | Draft criteria ready for review | Participant matrix, file route, storage/media/retention, field-level privacy |
| US-14 | P2 / 3 / US-10 | Deferred; no FR/API operation | Out of MVP; no Sprint 2 refinement proposed | Remains deferred; do not implement |
| US-15 | P2 / 5 / US-02, US-04 | Deferred; no FR/API operation | Out of MVP; no Sprint 2 refinement proposed | Remains deferred; do not implement |

The proposed criteria are in [PO acceptance criteria](sprint-2-po-acceptance-criteria.md).
The SRS maps FRs and verification placeholders, but criteria and scenarios are
not approved or run. No story is marked Ready for implementation by this draft.

## Story-to-Sprint-2 deliverable traceability

| Deliverable | Stories / trace | Status / remaining work |
|---|---|---|
| SRS and refined backlog | US-01–US-13 → FR-001–017, proposed verification V-001–017; US-14/15 explicitly deferred | Existing drafts available for review. Resolve policy, tighten criteria, and record real PO/TL/QA review. |
| Quality specification and verification matrix | Privacy, state integrity, accessibility, usability, performance, reliability; linked stories include US-04/06/08/13 | Required separate artifact; targets and matrix remain to be agreed/prepared by QA with TL/DO input. |
| Editable Figma prototype and user flows | Employer and task-taker journeys: US-01–13 as applicable; exclude US-14/15 | Plan/story coverage available; Figma frames, two starting points, annotated Turkish flows, reviewer access, and links remain outstanding. Use fictional/local state. |
| Architecture narrative, C4, UML | Five modules and end-to-end US-06–10 assignment-to-completion flow; task/payment state model | Plan identifies views; architecture narrative and required views remain outstanding with current/proposed boundary labeled. |
| Submission index and evidence | SRS/backlog, quality, architecture, Figma, issues/PRs, real teammate review, CI, final tag/commit if used | Assemble only when artifacts and genuine review/check evidence exist; do not fabricate links or outcomes. |

## Ready for review versus blocked

**Ready for team review:** proposed sprint goal/scope framing; copied canonical
story baseline; draft GWT criteria; listed policy decisions and readiness blockers;
deliverable-to-story mapping. Review does not equal approval.

**Blocked on team decisions or teammate work:** sprint goal and selected
commitments, capacity, owners/reviewers, deadline and tag convention; product
policies in the decision register; OpenAPI reconciliation (TL); testability and
quality targets/matrix (QA/TL/DO); Figma and architecture deliverables (design,
TL and collaborators); teammate review and final submission evidence.

## Remaining team dependencies

- **PO + TL + QA:** agree role/ownership, privacy, task lifecycle, revision,
  cancellation, discovery, and validation behavior; capture actual outcomes in
  existing issues/decision log and reconcile contract changes.
- **TL:** review OpenAPI alignment, state/error behavior, file-access contract,
  and technical feasibility. Stop if issue criteria and OpenAPI disagree.
- **QA:** sharpen positive/negative, authorization, state-transition,
  concurrency, and no-write scenarios; own quality verification matrix and
  distinguish prototype checks from runtime checks.
- **Design/frontend (Özgür) with PO and QA:** create Turkish editable Figma
  journeys, recovery states, story links, and reviewer access using fictional
  fixtures and no backend calls.
- **TL, DO, and frontend/integration contributors:** produce architecture
  narrative and C4/UML package per the plan.
- **SM (Aslı) and team:** complete the sprint decision record with actual
  commitments and assemble review/submission evidence; no capacity or deadline
  is asserted here.
