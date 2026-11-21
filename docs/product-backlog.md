# Initial Product Backlog

Current scope: US-01..US-13 describe the bounded journey. **US-14 (ratings) and
US-15 (suggestions) are deferred**, regardless of their historical priority below;
no API operation or implementation is authorized for them. The updated submission
on 2026-11-02 replaces US-11 terminal idempotence with rejection of duplicate
terminal actions, consistent with the canonical contract's terminal-state conflict.
Stack A is approved; business acceptance/contract review still precedes implementation.
See [reconciliation](contract-reconciliation.md) and [issue index](issue-index.md).
The original repo's [backlog](archive/initial-starter/backlog.md) is archived; its different IDs are mapped
in the issue index rather than treated as additional MVP stories.

The user administratively closed US-01..15 on GitHub. These stories remain the
future product plan; closure is not a claim that their business endpoints were
implemented in the health-only Sprint 1 application.

## Epic grouping and ownership

These are presentation groups for the existing stories, not new feature scope or
new GitHub issues. PO Elif Nur Akbaş (`elfn0909`) is the verified planning and
acceptance owner for every story below. Implementation assignees are agreed during
later sprint planning; assignment here does not claim completed development.

| Epic | Existing capability | Stories |
| --- | --- | --- |
| E-01 | Identity and self-declared profile | US-01, US-02 |
| E-02 | Bounded task listing, discovery and cancellation | US-03, US-04, US-11 |
| E-03 | Applications, single assignment and simulated hold | US-05, US-06, US-07 |
| E-04 | Private evidence, review, completion and history | US-08, US-09, US-10, US-12, US-13 |

## Prioritized story baseline

All MVP stories remain **Backlog / not implemented**. US-14/15 are **Deferred /
outside MVP**. Preserve administrative closure history without confusing it with
product acceptance. Priorities and estimates are unchanged from the supplied
submission. Dependencies are copied from its section 13.

| Story / issue | Epic | Priority | Points | Capability | Acceptance evidence | Dependencies | Planning owner |
| --- | --- | --- | ---: | --- | --- | --- | --- |
| [US-01](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/1) | E-01 | P0 | 5 | Register/sign in and enforce permitted roles | valid login; forbidden actor → 403 | — | elfn0909 |
| [US-02](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/2) | E-01 | P0 | 3 | Worker sets city and optional occupation/skills | optional fields; self-declared label | US-01 | elfn0909 |
| [US-03](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/3) | E-02 | P0 | 5 | Employer creates vehicle-photo-check task | required fields; unauthorized create rejected | US-01 | elfn0909 |
| [US-04](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/4) | E-02 | P0 | 3 | Worker filters open tasks by city/category | filters; valid empty result | US-03 | elfn0909 |
| [US-05](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/5) | E-03 | P0 | 3 | Worker applies to open task | one application per worker/task; no self-apply | US-03 | elfn0909 |
| [US-06](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/6) | E-03 | P0 | 5 | Employer selects exactly one applicant | atomic assignment; conflict on duplicate | US-05 | elfn0909 |
| [US-07](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/7) | E-03 | P0 | 3 | Employer records simulated payment hold | no real funds; valid state only | US-06 | elfn0909 |
| [US-08](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/8) | E-04 | P0 | 5 | Assigned worker submits private evidence | file/note validation; unauthorized denied | US-06, US-07 | elfn0909 |
| [US-09](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/9) | E-04 | P0 | 5 | Employer approves or requests revision | owner only; invalid transition denied | US-08 | elfn0909 |
| [US-10](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/10) | E-04 | P0 | 3 | Approved task completes and simulates release | requires hold + evidence + approval | US-07, US-09 | elfn0909 |
| [US-11](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/11) | E-02 | P1 | 3 | Employer cancels eligible unfinished task | allowed states only; duplicate terminal actions rejected | US-03 | elfn0909 |
| [US-12](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/12) | E-04 | P1 | 3 | Participant views task status history | assignment/evidence/review actions visible | US-06 | elfn0909 |
| [US-13](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/13) | E-04 | P1 | 5 | Private task data is access controlled | evidence/file forbidden tests | US-01, US-08 | elfn0909 |
| [US-14](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/14) | Deferred | P2 | 3 | Participant rates other party after completion | completed parties only; one rating each | US-10 | elfn0909 |
| [US-15](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/15) | Deferred | P2 | 5 | Worker sees skill-tag-informed suggestions | deterministic rules; no competence claim | US-02, US-04 | elfn0909 |

## Future product proposals

These ideas are candidates for later prioritization. Refine the acceptance
criteria and record a reviewed scope decision before scheduling them.

### AI-assisted task safety review

Proposed path before a task enters discovery:

1. The employer submits a task or edits a previously cleared listing. Screen
   the title, description, requested evidence, and permission acknowledgement
   against the vehicle-photo scope. A listing that passes the screening and
   required task checks follows the usual publication path.
2. Hold a flagged listing from discovery and applications. Send the flagged
   text and reason to an authorized human reviewer. Example reasons include
   apparent requests to drive the vehicle, perform a mechanical inspection, or
   photograph it without the required permission. Give the employer a clear
   waiting status and a way to revise and resubmit.
3. The human reviewer clears the listing, requests changes, or declines it.
   Record the task revision, reviewer, decision and reason. Rescreen substantive
   edits. Route screening failures to manual review.

Agree on review permissions, flag criteria, data handling and turnaround before
designing the queue. Use task text and the permission acknowledgement for
screening. Redact contact details from free text and exclude private evidence
and payment records from the screening input. Check missed risks and false
flags against permitted and out-of-scope examples in Turkish and English.

### Turkish and English page content

Keep Turkish as the default and propose a visible **Türkçe / English** selector.
Translate the welcome and account pages, navigation, profiles, task forms,
listing and assignment states, evidence and review screens, confirmations,
privacy notices, and validation, empty and access-denied states. Use the selected
locale for dates, numbers and currency display. Keep API operation names, enum
values and story IDs stable. Preserve the employer's original wording for task
descriptions. Any later translation of user-written content should be labelled
and link to the original.

| Example | Türkçe | English |
| --- | --- | --- |
| Employer action | Görev oluştur | Create a task |
| Task taker action | Göreve başvur | Apply for this task |
| Safety review status | Göreviniz güvenlik incelemesi bekliyor. | Your task is waiting for a safety review. |
| Evidence review action | Düzeltme iste | Request a revision |
| Payment notice | Gerçek para transferi yapılmaz. | No real money is moved. |

Verify both role journeys, recovery states and mobile layouts in each language,
including Turkish characters, longer strings and the selected language when
navigating between pages.

### One account for posting and taking tasks

Let an account use both **Görev oluştur** and **Görev bul** from a shared home
once both capabilities are enabled. The employer still manages tasks they own,
and the assigned task taker manages their work and evidence. Preserve the rule
against applying to your own task. Review account capability changes and the
authorization and ownership matrix before scheduling this expansion.

### In-app suggestions for new task categories

Add **Kategori öner** from task discovery or the profile. Ask for a category
name and one example of a task the user would post or take. Make city optional
when it helps the team understand demand. Confirm receipt and send suggestions
to the product team, which can group duplicates and review demand, safety and
fit with the platform. A category enters discovery after the team approves its
scope, rules and API changes.
