# Sprint 2 evidence and revision design baseline

21 November 2026 · SENG 321 · Team 5 · **Use in the final Lovable demo and Figma drafts**

Elif’s [SRS](sprint-2-srs.md) and [PO decision register](sprint-2-po-decisions.md)
were delivered in [PR #38](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/38).
DEC-01 proposes limiting evidence to the task owner and assigned task taker.
DEC-02 proposes a small image allowlist, explicit size/retention limits and an
authenticated content route. DEC-03 proposes a clear revision note and a return
to `EVIDENCE_SUBMITTED` after resubmission. DEC-04 and DEC-11 address owner-only
review and restricted history. The 21 November conversation treats the five
items below as resolved for the demo and Figma drafts. The team can use those
designs when it reviews the live API, file handling and retention stories.

## Rules to show in the prototype

| Area | Design rule | Relevant existing work |
| --- | --- | --- |
| Revision and review notes | Only the owning employer can request revision, while the task is `EVIDENCE_SUBMITTED` and the simulated hold is active. Require a nonblank, trimmed reason of up to 500 characters for `REQUEST_REVISION`. Keep notes optional on `APPROVE`. In `REVISION_REQUESTED`, the assigned task taker may resubmit under the existing hold and return the task to `EVIDENCE_SUBMITTED`. A rejected request leaves task, evidence and simulated payment unchanged. | DEC-03/04 · [US-08](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/8) and [US-09](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/9) |
| Photo access and download | Show the bundled sample images in an in-app gallery for participants. The demo uses viewing only. A download control remains deferred. | DEC-01/02 · [US-08](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/8) and [US-13](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/13) |
| Media and size | Show the JPEG and PNG allowlist, 1–5 photos, 10 MiB per photo, 50 MiB of images per submission, and a 10–2,000-character evidence note. Use synthetic values for any example limit error. Invalid input leaves the demo task and evidence unchanged. | DEC-02 · [US-08](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/8) |
| Retention | Show the 30-day retention period for private photos and evidence notes after the task is completed or cancelled. Retain a sanitized lifecycle record after deletion in the design. Use static demo copy for the policy. | DEC-02/11 · [US-08](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/8), [US-12](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/12) and [US-13](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/13) |
| Visibility | Limit private evidence, notes and photo content to the task owner and assigned task taker. Deny unselected applicants and unrelated users. Give those two participants a limited event timeline. Keep photo content, file URLs, notes and unrelated personal information out of task discovery and timeline entries. | DEC-01/11 · [US-12](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/12) and [US-13](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/13) |

The [draft API](../api/openapi.yaml) defines the photo count, evidence-note
length, optional review note up to 500 characters and controlled access to
evidence metadata. It permits resubmission after a revision request. The
decision-specific note rule shown in the demo needs live contract review.
For later live photo access, review an authenticated content operation with an
opaque identifier and participant checks on each request. Agree on expiry for
abandoned tasks, multipart overhead, backup and deletion responsibilities as
part of the storage implementation. [Contract reconciliation](contract-reconciliation.md)

The [final Lovable pass](sprint-2-lovable-context.md#final-lovable-pass) carries
the Turkish labels and demo checks forward. Record the actual Figma frame and
review evidence in the [submission bundle](submissions/sprint-2.md).
