# Sprint 2 PO prototype review checklist

**DRAFT — PENDING TEAM REVIEW AND APPROVAL**
**Project:** SENG 321 · Team 5 · CuckooApp
**Purpose:** Review aid for the planned editable Figma prototype; no prototype
review or approval is claimed by this checklist.

Use alongside the [Sprint 2 plan](sprint-2-plan.md), [SRS](sprint-2-srs.md),
[refined backlog proposal](sprint-2-backlog.md), and [PO acceptance proposals](sprint-2-po-acceptance-criteria.md).
For each row, record the Figma frame/flow, story ID, observed result, issue or
follow-up, and reviewer/date when an actual review occurs. Keep unresolved rules
visibly provisional; do not turn a mock screen into API approval.

## Prototype basics

- [ ] Editable Figma file opens for reviewers; access is verified.
- [ ] Two distinct starting points are provided: employer and task taker.
- [ ] Screen copy, navigation, forms, statuses, errors, sample text, and flow annotations are Turkish, as specified by the plan.
- [ ] Applicable existing story IDs (US-01–US-13) are linked from frames/flows; US-14/15 are absent and remain deferred.
- [ ] Prototype uses fictional fixtures and local interaction state, placeholder photos, and no backend integrations/network calls for account, photo selection, or payment flows.
- [ ] Self-declared city, occupation, and skills are clearly labelled; no identity, occupation, or skill verification is implied.
- [ ] Payment actions/statuses are visibly simulated; no real payment details or real-money behavior is represented.
- [ ] Screens are legible at the plan's trial widths (desktop and mobile); primary form labels, errors, focus, and next actions are reviewable.

## Employer journey

- [ ] **Sign in / start:** employer can enter the journey from its own starting point. Trace: US-01.
- [ ] **Create task:** title, description, city, `VEHICLE_PHOTO_CHECK`, illustrative amount, evidence instructions, requested deadline (if shown), and permission attestation are represented. Explain that permission is employer-attested, not verified. Trace: US-03.
- [ ] **Create-task recovery:** required-field and invalid-value feedback is visible; a rejected create does not appear as a saved task. Trace: US-03.
- [ ] **Applicants:** employer can view applicants for a task and distinguish an empty list. Trace: US-06.
- [ ] **Select one:** the flow communicates selection of exactly one applicant, and the resulting assigned state. Trace: US-06.
- [ ] **Simulated hold:** the interaction is explicitly identified as simulated/no real money; unavailable or repeated hold is represented as an error/unavailable state without inventing detailed API copy. Trace: US-07.
- [ ] **Evidence review:** employer sees only the evidence state allowed by the provisional privacy design; placeholder imagery is used. Trace: US-08, US-09, US-13.
- [ ] **Revision path:** revision and task-taker resubmission are shown as a recovery loop. Note requirement/state transition are pending team/API reconciliation. Trace: US-09, US-08.
- [ ] **Approval/completion:** approved evidence leads to completed task and simulated release together in the depicted success flow. Trace: US-09, US-10.
- [ ] **Cancellation/history:** cancellation appears only in the currently proposed eligible states; history has representative assignment/evidence/review events. Mark policy details still pending. Trace: US-11, US-12.

## Task-taker journey

- [ ] **Sign in / start:** task taker has a separate starting point. Trace: US-01.
- [ ] **Profile:** city and optional occupation/skills can be set; values are clearly self-declared. Trace: US-02.
- [ ] **Discover:** task list supports city/category filtering and open-task browsing; a valid empty result is shown. Default filter behavior remains pending. Trace: US-04.
- [ ] **Task details:** task instructions, illustrative amount, permission attestation context, and available action are understandable; role-specific field visibility remains subject to the approved access matrix. Trace: US-04.
- [ ] **Apply:** city prerequisite is called out before application; duplicate, self-application, closed-task, and missing-city recovery states are represented where applicable. City matching policy remains pending. Trace: US-02, US-05.
- [ ] **Assignment/hold status:** task taker can understand whether selected/assigned and whether the hold is simulated. Trace: US-06, US-07.
- [ ] **Evidence submission:** photo selection is mock-only; photo-count and note validation feedback is shown; access/privacy is not implied to be public. Trace: US-08, US-13.
- [ ] **Revision/resubmission:** task taker sees revision request, next action, and resubmission path. Trace: US-09, US-08.
- [ ] **History:** participant history is reachable and does not expose private data beyond the policy that the team approves. Trace: US-12, US-13.

## Shared states and PO sign-off notes

- [ ] Each main journey has a normal path and recovery path, including empty, validation, unauthorized/unavailable-action, and error states where the plan calls for them.
- [ ] Every clickable control leads to a coherent next state; no dead-end is mistaken for a completed feature.
- [ ] Review frames against the current story/AC proposal and note any requirement the screen cannot demonstrate.
- [ ] Evidence access, media limits, ownership, default discovery, revision, cancellation, history visibility, and exact error wording remain provisional until their decisions/contracts are reviewed.
- [ ] PO records journey-level feedback and open questions; TL reviews API plausibility and QA checks edge-state coverage/reviewer access, as assigned by the plan.
- [ ] Record review date, actual reviewers, Figma file/flow URLs, frame/story references, observations, and follow-ups only after the review happens.
