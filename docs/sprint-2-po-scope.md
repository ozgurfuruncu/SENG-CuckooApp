# Sprint 2 PO scope proposal

**DRAFT — PENDING TEAM REVIEW AND APPROVAL**
**Project:** SENG 321 · Team 5 · CuckooApp
**Owner:** Product Owner (Elif Nur Akbaş)

This is a planning proposal, not a sprint commitment. It does not set capacity,
deadline, assignments, estimates, or approval. Source baseline: [Sprint 2 plan](sprint-2-plan.md),
[canonical product backlog](product-backlog.md), [Sprint 2 decision-log template](templates/02-sprint-decision-log.md),
[SRS](sprint-2-srs.md), [refined backlog proposal](sprint-2-backlog.md),
[OpenAPI draft](../api/openapi.yaml), and [MVP boundary](decisions/ADR-002-mvp-boundary.md).

## Proposed Sprint 2 goal

**Proposal for team agreement:** Specify and prototype the employer and task-taker
journeys for the bounded vehicle-photo-check workflow, producing reviewable
requirements, quality, design, and architecture artifacts. This goal does not
commit the team to implementing US-01 through US-13 during Sprint 2.

## Product scope versus Sprint 2 work

| Product scope in the canonical plan | Sprint 2 specification/prototyping scope proposed by the plan |
|---|---|
| US-01–US-13 describe the bounded MVP journey: identity/profile; vehicle photo-check tasks; discovery; application and one selected worker; simulated hold; private evidence, review, completion, cancellation, history, and access control. | Detailed SRS and refined acceptance criteria; measurable quality specification and verification matrix; editable Turkish employer/task-taker Figma prototypes and annotated user flows; architecture narrative and C4/UML views; submission index with genuine review/check evidence when available. |
| The only category is `VEHICLE_PHOTO_CHECK`; roles are `EMPLOYER` and `TASK_TAKER`; city, occupation, and skills are self-declared. | Use fictional/local prototype state. Accounts, photo selection, and payment actions are simulated. No backend integration or network calls for those flows. |
| Business routes remain planned; only health is implemented in the Sprint 1 application. | Business implementation requires separate reviewed stories and their Ready gates. It is not included by this proposal. |

### Canonical story baseline (copied; unchanged)

| Story / issue | Priority | Points | Dependency | Capability |
|---|---:|---:|---|---|
| US-01 / [#1](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/1) | P0 | 5 | — | Register/sign in and enforce permitted roles |
| US-02 / [#2](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/2) | P0 | 3 | US-01 | Worker sets city and optional occupation/skills |
| US-03 / [#3](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/3) | P0 | 5 | US-01 | Employer creates vehicle-photo-check task |
| US-04 / [#4](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/4) | P0 | 3 | US-03 | Worker filters open tasks by city/category |
| US-05 / [#5](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/5) | P0 | 3 | US-03 | Worker applies to open task |
| US-06 / [#6](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/6) | P0 | 5 | US-05 | Employer selects exactly one applicant |
| US-07 / [#7](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/7) | P0 | 3 | US-06 | Employer records simulated payment hold |
| US-08 / [#8](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/8) | P0 | 5 | US-06, US-07 | Assigned worker submits private evidence |
| US-09 / [#9](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/9) | P0 | 5 | US-08 | Employer approves or requests revision |
| US-10 / [#10](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/10) | P0 | 3 | US-07, US-09 | Approved task completes and simulates release |
| US-11 / [#11](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/11) | P1 | 3 | US-03 | Employer cancels eligible unfinished task |
| US-12 / [#12](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/12) | P1 | 3 | US-06 | Participant views task status history |
| US-13 / [#13](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/13) | P1 | 5 | US-01, US-08 | Private task data is access controlled |

The dependencies above are the canonical backlog dependencies, not a delivery
sequence or claim that prerequisite work is implemented. Priorities and points
are reproduced without change.

### Deferred stories and scope boundary

| Story / issue | Canonical priority / points / dependency | Status |
|---|---|---|
| US-14 / [#14](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/14) | P2 / 3 / US-10 | Deferred; ratings remain outside MVP. |
| US-15 / [#15](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/15) | P2 / 5 / US-02, US-04 | Deferred; suggestions remain outside MVP. |

Real payments or escrow, identity/professional verification, vehicle driving or
custody, professional inspection, legal representation, GPS verification, and
other task categories remain out of scope. Messaging is deferred in the contract
reconciliation and is not a canonical story here.

## Sprint commitments still unresolved

The [decision-log template](templates/02-sprint-decision-log.md) has no completed
planning record. The team still needs to record the actual sprint goal, selected
deliverables/issues, capacity, owners, reviewers, expected evidence, blockers,
date/deadline, and any DoR/DoD exception with its source. The plan's proposed
`sprint-2` tag is subject to team/course agreement; this draft does not establish
that the tag will be used. No estimates or story commitments are changed here.
