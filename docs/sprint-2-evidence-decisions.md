# Sprint 2 evidence and revision proposals

20 November 2026 · SENG 321 · Team 5 · **Pending PO, TL and QA agreement**

Elif’s [SRS](sprint-2-srs.md) and [PO decision register](sprint-2-po-decisions.md)
were delivered in [PR #38](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/38).
DEC-01 proposes limiting evidence to the task owner and assigned task taker.
DEC-02 proposes a small image allowlist, explicit size/retention limits and an
authenticated content route. DEC-03 proposes a clear revision note and a return
to `EVIDENCE_SUBMITTED` after resubmission. DEC-04 and DEC-11 address owner-only
review and restricted history. The register marks these decisions pending.

## Proposals for review

| Area | Proposed rule | Relevant existing work |
| --- | --- | --- |
| Revision and review notes | Only the owning employer can request revision, while the task is `EVIDENCE_SUBMITTED` and the simulated hold is active. Require a nonblank, trimmed reason of up to 500 characters for `REQUEST_REVISION`. Keep notes optional on `APPROVE`. In `REVISION_REQUESTED`, the assigned task taker may resubmit under the existing hold and return the task to `EVIDENCE_SUBMITTED`. A rejected request leaves task, evidence and simulated payment unchanged. | DEC-03/04 · [US-08](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/8) and [US-09](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/9) |
| Photo access and download | Show bundled sample images in the prototype. Defer an explicit download control. For live photo access, agree an authenticated content operation with an opaque file ID scoped to the task and evidence submission. Check participant access on every request and keep backing storage private. | DEC-01/02 · [US-08](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/8) and [US-13](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/13) |
| Media and size | Accept verifiable JPEG and PNG only. Propose 10 MiB per image and 50 MiB of images per submission, with a transport ceiling that allows for multipart overhead. Retain the draft’s 1–5 photos and 10–2,000-character evidence note. Reject a nonconforming batch before persisting any evidence or changing task state. | DEC-02 · [US-08](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/8) |
| Retention | Start the deletion clock at completion or cancellation. Propose keeping private photos and evidence notes for 30 days after that event. Keep only a sanitized lifecycle record after deletion. Agree a separate expiry for abandoned tasks that never reach a terminal state, along with backup and deletion responsibilities. | DEC-02/11 · [US-08](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/8), [US-12](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/12) and [US-13](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/13) |
| Visibility | Limit private evidence, notes and photo content to the task owner and assigned task taker. Deny unselected applicants and unrelated users. Give those two participants a limited event timeline. Keep photo content, file URLs, notes and unrelated personal information out of task discovery and timeline entries. | DEC-01/11 · [US-12](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/12) and [US-13](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/13) |

The [draft API](../api/openapi.yaml) defines the photo count, evidence-note
length, optional review note up to 500 characters and controlled access to
evidence metadata. It permits resubmission after a revision request. It does
not define a photo content route or the proposed media, retention or full
participant rules. An approval requires `EVIDENCE_SUBMITTED` and
`HELD_SIMULATED` under the existing draft. Review the decision-specific note
rule and resubmission transition with the story criteria before changing the
contract. [Contract reconciliation](contract-reconciliation.md)

Record each resolved rule with its owner, date and acceptance criteria in the
existing issue. Prototype restrictions illustrate likely behavior. API
authorization, file handling and deletion require their own reviewed business
stories and verifiable results. [Quality verification matrix](sprint-2-quality.md)
