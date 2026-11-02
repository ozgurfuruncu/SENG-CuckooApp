# Proposal reconciliation addendum

**Superseded source, 2026-11-02:** the user supplied a revised submission confirming
Stack A, MIT, bounded scope, named roles/RACI and submission date. See the
[preserved current document and evidence ledger](submissions/README.md). The text
below records the earlier proposal discrepancies, not current approval status.

Status: prepared for human review, 2026-11-01 (Europe/Istanbul).

Source read without modification: `SENG_PROJECT_SPRİNT1.docx`, supplied in Downloads.
SHA-256: `0E657D93409A803FC41FC3AEFDC7C1A93F5E3F3FB9E5AC7E8921B6614BD32441`.
The original Word file is not copied into the public repository or rewritten.

The proposal contains placeholders for application/team names, all team-member
identities, GitHub URL, tag and due date. Its scope includes driving a car to an
inspection center, optional purchase/power-of-attorney tracking, three categories,
direct acceptance, messaging and ratings. Its stack and MIT license are described
as proposals. These are historical proposals; the current authorized scope is
recorded below. This addendum does not claim the Word submission was updated or approved.

## Current product statement for PO review

Cuckoo, SENG 321 Team 5, connects remote employers and local task takers for a
bounded **vehicle-photo-check**. The employer posts a task, workers apply, the
employer selects exactly one, and the employer records a simulated hold. The
assigned worker with photo permission supplies photographs and notes. The employer
approves or requests resubmission. Approval atomically completes the task and
records simulated release. No real money moves.

City, skills and occupation are self-declared. The product does not perform identity
or professional verification, mechanical inspection, custody/driving, purchases or
legal representation. Additional categories, recommender, ratings and full messaging
are deferred. No power-of-attorney tracking is included in the canonical contract.

The system contains a web UI, REST API, PostgreSQL persistence, protected evidence
storage, role/object authorization, task history and simulated-payment state. It is
a modular monolith with identity/profile, tasks, applications/assignment,
evidence/reviews and simulated-payment boundaries. Final one-command Compose
startup remains a delivery target; this branch proves configuration only.

Repository: https://github.com/ozgurfuruncu/SENG-CuckooApp. Canonical contract:
`api/openapi.yaml`. Existing MIT `LICENSE` and attribution are retained. Frameworks,
ORM, migrations and application test runners await named ADR-001 acceptance.
No reviewed release tag exists. Original proposal targets Week 8 MVP / Week 10
final; the legacy backlog lists 05.11.2026 for Sprint 1, which the PO must confirm
rather than treating it as a verified course deadline.

## Submission follow-up

The PO must approve this bounded journey and edit the actual submitted Word file,
including summary, scenario, scope, boundary, success criteria and risks. Replace
identity/delivery placeholders only with confirmed information. Success criteria
must end at simulated release rather than ratings, include rejection of unauthorized
actors and invalid transitions, and retain evidence, tests/coverage and Compose
proof as delivery goals. QA must agree measurable performance/coverage targets;
no runtime, performance or coverage evidence is claimed by this addendum.

Read [contract reconciliation](contract-reconciliation.md) before accepting stories.
