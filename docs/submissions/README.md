# Sprint 1 submission and verified evidence

**Status: Sprint 1 repository closeout completed on 3 November 2026.**
The final correction was independently approved and merged, all five checks on
the assessed main commit passed, and the annotated sprint-1 tag was published
and remotely verified. [The final receipt](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/20)
records completion. Official instructor acceptance is a separate decision.

Current submission: [Cuckoo_Sprint1_Submission.md](Cuckoo_Sprint1_Submission.md).
The [final audit and full compliance matrix](../audits/sprint1-final-audit.md)
records the pre-publication inspection against the original 17-page course PDF,
whose hash matches the
[requirements record](../sprint-1-requirements.md). The assessed artifact is
Markdown, as requested by the author; the course pack does not specify a Word or
PDF export requirement. Supplied submission date: **5 November 2026**.

## Required evidence

| Item | Verified evidence / current state |
| --- | --- |
| Repository and assessed main | [SENG-CuckooApp](https://github.com/ozgurfuruncu/SENG-CuckooApp); [`39dccc709d518a2124f4b5a52d36138a84f3856b`](https://github.com/ozgurfuruncu/SENG-CuckooApp/commit/39dccc709d518a2124f4b5a52d36138a84f3856b), the reviewed/tested sprint-1 baseline |
| Proposal, vision and scope | [Submission](Cuckoo_Sprint1_Submission.md) §§1–9; permitted vehicle-photo-check journey, self-declared attributes, simulated payments. Author confirmed informal observations on 3 November; no raw observation log or frequency data supplied. §7 records planned validation rather than invented findings |
| MIT license | [Complete license](../../LICENSE), original attribution preserved; rationale in submission §8 |
| System boundary | [Labelled SVG](../diagrams/system-context.svg) and [PNG](../diagrams/system-context.png), visually inspected; physical permission/visit and excluded services remain outside software responsibility |
| Architecture and setup | [Accepted ADR-001](../decisions/ADR-001-architecture.md), [MVP boundary](../decisions/ADR-002-mvp-boundary.md), [development guide](../development.md); actual code implements health and a typed web shell only |
| Roles and RACI | [Six named responsibilities](../team-raci.md), [confirmed accounts](../team-accounts.json); one accountable owner per activity |
| Backlog | [Epics, priorities, estimates, dependencies and planning owners](../product-backlog.md), [issue mapping](../issue-index.md). US-01..15 are administratively closed; US-01..13 remain future implementation and US-14/15 deferred |
| OpenAPI draft | [Canonical OpenAPI 3.1](../../api/openapi.yaml), 17 operations; [schema-compatible request/success/error examples](../api-examples.md). Business endpoints are not deployed |
| Assessed main CI | [Run 41630981575](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41630981575): all five required jobs completed successfully at **39dccc7** |
| Final evidence correction | [PR #34](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/34), authored by **ozgurfuruncu**, [approved by anyx05](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/34#pullrequestreview-5751704339) at head **23e904d5** before protected merge to **39dccc7**. The Copilot COMMENTED response is not counted as approval |
| Earlier genuine review | [PR #23 approval by anyx05](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/23#pullrequestreview-5737268346), for f5f91a1a7377c4d52ab7dc657508a6938116f9c0 only |
| PR #32 history | [#32](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/32), merged at [e323091](https://github.com/ozgurfuruncu/SENG-CuckooApp/commit/e323091cd7efbbe8d114acff46ba4d85e44a0440), **zero submitted reviews**. Subsequent reviews do not retroactively supply its missing pre-merge approval |
| Independent submission review | [Emir / lilemiv’s Issue #20 comment](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/20#issuecomment-6600227590), 3 November 2026 09:40 UTC: he reviewed the requested document/topics and reported no missing, incorrect or outdated information. This is a documented independent review, not a PR #32 approval object |
| PR #33 formal approval | [#33](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/33), authored by **lilemiv**; [APPROVED by ozgurfuruncu](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/33#pullrequestreview-5750118359) at head **5bc8693**, before merge. [PR CI #45](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41614298696) and resulting main CI #46 succeeded. Merge commit **72a522d7** |
| main/develop protection | Both branches report protected. The [reviewed owner-authenticated audit snapshot](../audits/sprint1-final-evidence.json) records PR/one approval/five required checks, admins included, force pushes/deletions disabled; strict up-to-date checks and stale-review dismissal false. No setting was bypassed for publication |
| Required check names | `backend`; `Stack A backend`; `OpenAPI 3.1 validation`; `Stack A frontend`; `Stack A Compose smoke`. `Stack A backend` mirrors the actual backend test job |
| Sprint tag | Published annotated [sprint-1](https://github.com/ozgurfuruncu/SENG-CuckooApp/tree/sprint-1); tag object **fc145f7c79d43e861d14b5d721fef5c7a0e57e23**, remotely dereferenced to **39dccc709d518a2124f4b5a52d36138a84f3856b** |
| Routine closeout | [Issue #20](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/20) is closed as completed, with the final approval/merge/CI/tag receipt. All repository issues were confirmed closed at publication |
| Remaining actions | No Sprint 1 publication/closeout actions remain. Further document changes follow the normal protected PR process; business stories remain future work |

## Verification and preserved artifacts

The [final audit](../audits/sprint1-final-audit.md) records commands, actual results,
link/rendering checks and historical limitations before final approval/tagging.
Its then-pending gates are completed by the receipt above. Earlier
[remote audit](../audits/sprint1-remote-verification.md) and
[command log](../audits/sprint1-verification-commands.md) are dated historical
observations, not current branch/protection/tag state.

The [previous DOCX](Cuckoo_Sprint1_Submission.docx) is a superseded format.
The [supplied original](../archive/submissions/Cuckoo_Sprint1_Submission_Original.docx)
remains unchanged, SHA-256
`04C3B14CFA8DA58B6A0C06BF98A01B5EADE8EF82BB6BDBC3A3ED2B931F012E86`.
No Word-layout verification is claimed for this Markdown submission.

Later implementation follows the [SDD workflow](../templates/SDD_WORKFLOW.md),
[traceability template](../templates/10-requirements-traceability.md) and
[US-03 documentation example](../specs/US-03-create-task.md). Its planned tests
are not executed business-feature tests. GitHub Releases, separate release
branches and Project boards remain optional under the actual course pack.

## Post-publication document update

The current submission incorporates the author's streamlined proposition and the
actual closeout links. It records completed publication rather than the earlier
pending-review/tag state. This is a post-closeout narrative update; the original
assessed snapshot remains [sprint-1](https://github.com/ozgurfuruncu/SENG-CuckooApp/tree/sprint-1)
at 39dccc7 and is not moved or rewritten. Historical review exceptions remain in
the evidence records; later reviews are not presented as retroactive approval.
