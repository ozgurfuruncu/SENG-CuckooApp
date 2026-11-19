# Sprint 2 PO team-review handoff

**DRAFT — PENDING TEAM REVIEW AND APPROVAL**
**Project:** SENG 321 · Team 5 · CuckooApp
**Current review venue:** [PR #38](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/38),
branch `docs/elif-sprint2-planning`. Verify the PR head includes the latest local
drafts before using it as evidence.

## Six current SRS/backlog and PO documents

| Document | Purpose / status |
|---|---|
| [Sprint 2 SRS](sprint-2-srs.md) | Proposed FRs, workflows, traceability, and open policy decisions; draft pending review. |
| [Sprint 2 refined backlog](sprint-2-backlog.md) | Proposed ACs for US-01–US-13; preserves US-14/15 as deferred; draft pending review. |
| [PO scope proposal](sprint-2-po-scope.md) | Separates product scope from Sprint 2 specification/prototype work and copies canonical story data. |
| [PO acceptance proposals](sprint-2-po-acceptance-criteria.md) | GWT positive/negative scenarios; response mappings left pending where the sources do not settle them. |
| [PO decision register](sprint-2-po-decisions.md) | Pending policy and contract questions, options, reviewers, and affected stories. |
| [PO readiness/traceability](sprint-2-po-readiness.md) | Story blockers, draft-to-deliverable links, and remaining team dependencies. |

Related new review aids are the [prototype review checklist](sprint-2-po-prototype-review.md)
and [submission checklist](sprint-2-po-submission-checklist.md). This handoff is
the concise discussion guide; no separate duplicate gap report is proposed.

## Consistency findings for review

- Story IDs, priorities, estimates, and dependencies in the PO scope/readiness
  drafts match the canonical product backlog; US-14 and US-15 remain deferred.
- The bounded MVP remains one `VEHICLE_PHOTO_CHECK` workflow, `EMPLOYER` and
  `TASK_TAKER` roles, self-declared attributes, and simulated-only payment.
- **US-09 authorization:** canonical backlog and issue #9 say review is owner
  only; OpenAPI lists `403` but does not explicitly state task-owner enforcement.
  Preserve the existing issue criterion and have TL reconcile the operation
  description before implementation. The SRS/refined backlog currently describe
  this as proposed/pending, so those documents need a reviewed wording alignment.
- **US-11 cancellation:** canonical backlog and issue #11 specify cancellation
  in `OPEN`/`ASSIGNED` and conflict for duplicate terminal actions; the current
  OpenAPI still calls that policy preliminary. Preserve the recorded story
  criterion and reconcile the contract. Whether a held simulated amount becomes
  `VOIDED_SIMULATED` remains a separate decision. SRS/refined backlog still call
  the eligible states preliminary and should be aligned after reconciliation.
- **Sprint commitments:** the decision-log template is blank. The SRS/backlog
  drafts describe product stories, not a committed Sprint 2 implementation set.
- **Missing planned artifacts:** no quality specification/verification matrix,
  Figma file/flows, architecture narrative/C4/UML package, or assembled
  submission index is linked in the checked repository documentation. This is
  an inventory observation, not a claim about external Figma work.

## Decisions and questions for teammates

### PO (Elif)

- Confirm product policy proposals for evidence access/retention, city matching,
  discovery defaults, cancellation payment effects, review-note behavior, and
  history visibility after hearing TL feasibility and QA testability input.
- Confirm the intended employer and task-taker journeys and decide whether each
  draft AC expresses the user outcome correctly.

### Technical Lead (Emmanuel)

- How will issue #9's owner-only review rule be made explicit in the OpenAPI
  contract, and what other operations require task ownership under their story criteria?
- How should OpenAPI cancellation wording be reconciled with issue #11 and the
  canonical backlog? What exact state/error behavior is supported by the contract?
- What file-access route, media limits, storage/retention approach, task defaults,
  and validation/error mappings are technically appropriate for review?

### QA (Jumanah)

- Are all proposed criteria observable and testable, especially rejected
  authorization/state changes, no-write assertions, and concurrent assignment?
- Which quality targets, workloads, environments, and verification stages should
  be specified, and which can only be observed after implementation?
- Which prototype edge states are essential to cover, and can reviewers access
  the Figma file/flows?

### Whole team / Scrum Master / contributors

- What is the agreed Sprint 2 goal, deliverable scope, capacity, owners/reviewers,
  date, and expected evidence? Aslı records the real plan; none is supplied here.
- What submission format/rubric details apply, and what tag convention will be
  used? Keep the required course tag on the final reviewed candidate after checks.
- Özgür: what are the Figma file and prototype-flow links, and do the two
  journeys cover empty, validation, privacy, and recovery states?
- Emir and Emmanuel: where are the architecture narrative and C4/UML views?
- Aslı/Jumanah/Emir: who will assemble, verify, and link final submission evidence
  according to the plan's roles?

## Approval and evidence gate

PO owns product-scope and acceptance agreement; TL reviews OpenAPI alignment;
QA reviews testability and quality scenarios; the team agrees sprint commitments.
Aslı coordinates refinement and the decision record. Record actual review source,
date, affected stories/contracts, and follow-ups. The documents are proposals;
no approval, implementation, test result, or Figma review is claimed here.

## Final PO gap assessment

The repository explicitly assigns the PO agreement on the detailed SRS/refined
backlog and acceptance of the two journeys. The first has draft artifacts ready
for review; journey acceptance must wait until the actual Figma prototype exists.
No additional standalone PO deliverable is explicitly required by the Sprint 2
plan. The remaining independent preparation is covered by these checklists and
handoff. Completing the team decision record, quality specification, architecture,
prototype, approval evidence, and submission index depends on the named team
members or team planning; filling them now would invent decisions or results.
