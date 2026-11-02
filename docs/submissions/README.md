# Sprint 1 submission and verified evidence

**Status: corrected review candidate; Sprint 1 instruction completion is open.**
The course pack supplied on 2026-11-03 explicitly requires teammate review,
main/develop PR/status-check protections and a sprint tag. See
[requirements and source pages](../sprint-1-requirements.md). A GitHub Release page,
separate release branch and Project board remain optional.

Current candidate: [Cuckoo_Sprint1_Submission.docx](Cuckoo_Sprint1_Submission.docx).
The export/visual-check result is recorded in the verification log; a review PDF
is linked below when actually produced. The supplied original remains unchanged
in [the archive](../archive/submissions/Cuckoo_Sprint1_Submission_Original.docx),
SHA-256 04C3B14CFA8DA58B6A0C06BF98A01B5EADE8EF82BB6BDBC3A3ED2B931F012E86.
It is the pre-evidence document and should not be submitted unchanged. Supplied
submission date: **5 November 2026**.

## Required evidence

| Item | Verified evidence / current state |
| --- | --- |
| Repository and assessed branch | [SENG-CuckooApp](https://github.com/ozgurfuruncu/SENG-CuckooApp); main inspection at [3e97515](https://github.com/ozgurfuruncu/SENG-CuckooApp/commit/3e975153e6c87f96de1c4df30c8a7521a8fc2edd). The corrective PR will identify the next candidate |
| Proposal, vision and scope | Current DOCX sections 1–9; one permitted vehicle-photo-check workflow, self-declared profile attributes, simulated payments only |
| MIT license | [Original license](../../LICENSE), preserved attribution |
| Boundary | [Labelled vector source](../diagrams/system-context.svg), [PNG](../diagrams/system-context.png); physical permission/visit and excluded services remain outside software responsibility |
| Architecture | [Accepted ADR-001](../decisions/ADR-001-architecture.md), [MVP boundary](../decisions/ADR-002-mvp-boundary.md) |
| Roles/RACI | [Six named responsibilities](../team-raci.md), [confirmed accounts](../team-accounts.json) |
| Backlog | [Explicit epics/stories, priorities, estimates, dependencies and planning owners](../product-backlog.md), [existing issue mapping](../issue-index.md). Administrative closures do not imply business implementation |
| OpenAPI | [Canonical 3.1 contract](../../api/openapi.yaml); 17 operations including success/input-error/conflict behavior; business endpoints remain later reviewed stories |
| Current main CI | [Run 41530996698](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41530996698), successful; corrective PR results must be recorded separately |
| Integration history | [#23](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/23), [#25](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/25), [#28](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/28), [#30](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/30), [#31](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/31) merged; historical scope and review states remain distinct |
| Teammate review | Real [#23 approval](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/23#pullrequestreview-5737268346) covers that earlier change. Final corrective candidate needs a teammate review; no review object is invented for #28/#30/#31 |
| Branch protection | **Owner action required.** Latest branch API: main/develop protected=false, rules/rulesets empty. No successful control configuration is claimed |
| Sprint tag | **Await reviewed/tested main integration.** Tags API returned empty. Create/verify sprint-1 only after the review/check gates; never move an existing tag |
| Routine closeout | Existing [#20](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/20); [exact remaining human steps](manual-closeout.md) |

## SDD and scope

Use the [canonical workflow/Ready/Done gates](../templates/SDD_WORKFLOW.md),
[traceability template](../templates/10-requirements-traceability.md) and
[US-03 documentation example](../specs/US-03-create-task.md). The example is a
specified future feature with planned tests, not implemented business behavior.
Real teammate review is part of the supplied course workflow.

## Verification and limits

See [commands/results](../audits/sprint1-verification-commands.md) and
[remote audit](../audits/sprint1-remote-verification.md). The source attachment and
archived original are preserved. Current artifact preparation can be automated;
owner configuration and an independent teammate's review cannot be supplied by
this agent. Tagging is authorized but waits for those gates. No optional Release
page or Project is required. Official instructor acceptance is not asserted.
