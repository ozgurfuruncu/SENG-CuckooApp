# Sprint 1 release candidate and closeout

Date: 2026-11-02 (Europe/Istanbul). Existing technical closeout:
[T-02/T-03, issue #20](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/20).
The user authorized completing Sprint 1 through real branch/PR/review/release
steps. This candidate is prepared; release acceptance is not simulated.

## Scope

Sprint 1 delivers the proposal/problem statement/vision, bounded MVP and system
context, MIT, accepted Stack A ADR, named six-person roles/RACI, API-first draft,
initial backlog, repository workflow and tested minimal infrastructure. It does
not require all future MVP stories to be implemented. Their open contract questions
are recorded for Sprint 2 and remain gates on those implementations, not claims
that the API draft or Sprint 1 shell is complete product behavior.

`release/sprint-1` was prepared from tested bootstrap tip `bf48434` while develop
was still at original main `8f70175`. It is a release **candidate**, not an assertion
that feature work has already integrated. Original commits are retained. The root
README is refreshed through this PR, with an exact original copy archived. No
backend business route, contract semantics or MVP scope changes in this closeout.

## Actual access and all-collaborator defaults

Authenticated REST inspection returned six accounts, including the owner:

| Verified GitHub account | Actual repository access | Prepared Project default |
| --- | --- | --- |
| anyx05 | Write; current PR author/execution account | Admin |
| j7766n | Write | Admin |
| ozgurfuruncu | Owner/admin | Admin |
| lilemiv | Write | Admin |
| elfn0909 | Write | Admin |
| asliarikoglu | Write | Admin |

The user has now confirmed the mapping to the named RACI owners in
[team-accounts.json](../team-accounts.json). The user originally reported two
collaborators; the live API returned the six accounts above. The
prepared [access manifest](access-defaults.json) covers all of them. Project admin
can later be changed manually. There is no public administration/default bypass.

A personal GitHub repository has one owner; collaborators' write access does not
grant owner administration. Current account `anyx05` has admin/maintain false.
Projects still returns INSUFFICIENT_SCOPES (missing read:project). The owner must
apply the prepared settings with the required authentication; they are not claimed
as deployed. [GitHub permission reference](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/permission-levels-for-a-personal-account-repository).

## Review and integration sequence

1. Owner/independent collaborator reviews [PR #17](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/17)
   into develop. It is ready for review; owner review was requested. Merge only
   after actual approval and successful checks, preserving commits with a merge commit.
2. Retarget [PR #19](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/19) to develop
   after #17 integrates. It is ready for review; owner review was requested. Check
   the changed-base diff and new CI, obtain approval and merge without squashing
   away the original feature commits.
3. Merge current develop into release/sprint-1 without force pushing, so the
   release candidate contains the actual integration history. Rerun all release
   checks. Resolve any conflicts through review; do not reset main to this branch.
4. Once content/head is final, take the release PR to main out of draft and obtain
   independent approval on that head. GitHub forbids PR authors approving their own
   PRs; using the author account is not a simulated peer review.
5. Merge the approved release PR into main, wait for main's checks, synchronize
   develop with the release through a reviewed PR if needed, then create the
   `sprint-1` annotated tag at that reviewed main SHA. Publish the supplied release
   notes only after these gates and the final submission evidence are verified.

The direction is **reviewed changes into main**, not updating main first and
manufacturing a PR afterward. A normal reviewed merge adds history; it does not
overwrite prior commits. [GitHub review reference](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/approving-a-pull-request-with-required-reviews).

## Prepared owner controls and evidence

- [Owner commands and settings](owner-actions.md).
- [Develop foundation checks](branch-protection-foundation.json): backend + contract,
  so PR #17 is not blocked by Stack A contexts absent from that foundation.
- [Integrated/main checks](branch-protection-integrated.json): all five tested
  contexts, one approval, stale approvals dismissed, admin enforcement, resolved
  conversations, no force pushes/deletions, no writer-specific restrictions.
- [Project import/status manifest](project-items.json) and [issue URLs](project-issue-urls.txt):
  18 existing issues; future stories stay Backlog and US-14/15 stay deferred.
- [Prepared release notes](sprint-1-release-notes.md); [execution status](status.md).
- [Submission ledger](../submissions/README.md). Original source DOCX remains
  unchanged; the [separate repository-evidence candidate](../submissions/Cuckoo_Sprint1_Repository_Evidence_Candidate.docx)
  contains verified release-PR/CI links. Pending reviews/settings/tag stay explicit.
- [Final requirement audit](final-audit.md) and [requested anyx05 admin access](admin-access-request.json).

All initial issue planning owners are now assigned and verified; future implementation
delegation remains sprint planning. Only known completed actions/checks are evidence.
Account role defaults are not
effective settings, and green CI is not a human review. No sprint-1 tag exists yet.
