# Sprint 1 closeout execution status

As inspected on 2026-11-02 (Europe/Istanbul). Related issue:
[#20](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/20).

- Release candidate branch: release/sprint-1, prepared from tested bootstrap bf48434.
- #17 and #19 are merged by owner/reviewer ozgurfuruncu, preserving authored commit
  history. Develop now points to merge commit 8726106.
- Main remains at original 8f701754a296dfd5aa9e464383ac4668d0f5e790; no sprint-1 tag.
- Collaborator API returns anyx05, j7766n, ozgurfuruncu, lilemiv, elfn0909 and
  asliarikoglu. The user has confirmed the six RACI mappings in team-accounts.json.
- Current account is anyx05, write-only. Branch controls and Projects admin defaults
  are prepared for all verified collaborators but not applied remotely.
- Project read/create/import remains blocked by missing token scope. Admin branch
  changes remain blocked by actual repository permission, regardless of policy defaults.
- The source submission is preserved. A separate evidence candidate now includes
  verified release-PR/CI links, retaining pending owner/review/tag records.

Historical draft release PR [#21](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/21)
was closed unmerged. Current closeout continuation is [PR #23](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/23),
which carries the release candidate contents to main for reviewed integration.

## Executed preparation checks

| Command/action | Observed result |
| --- | --- |
| `git fetch origin --prune` and authenticated REST/GraphQL inspection | Existing branches preserved, no approvals/tags; current account write-only, Projects scope rejected |
| `node .sprint1/sprint1-release.cjs audit` (workspace root) | Six actual accounts verified; all existing PRs/reviews/issues enumerated; snapshot saved locally without credentials |
| `node .sprint1/sprint1-release.cjs issue` | Created existing T-02/T-03 closeout issue #20 after duplicate check |
| `node .sprint1/sprint1-release.cjs ready` | #17/#19 marked ready via GraphQL; requested verified independent owner ozgurfuruncu; later merged by owner review flow |
| `git switch -c release/sprint-1` | Separate release candidate based on bf48434, no main/develop mutation |
| `node .sprint1/prepare-release-artifacts.cjs` | Prepared staged protection JSON, Project Admin defaults for six actual collaborators, 18 existing-issue import URLs |
| `npm.cmd test` in tools/contract | Seven tests pass, including canonical schema/reference and negative cases plus all repository YAML parsing |
| `node .sprint1/verify-release-config.cjs` | JSON parses; verified account coverage matches live snapshot, policies retain one approval/no bypass, URLs unique/deferred scope retained; no remote settings applied |
| `node .sprint1/audit-bootstrap.cjs` | 24 original Git blobs unchanged; six reviewed README/CI/package/index/ignore changes, original README archived exactly, 83 changed-document links resolve, source DOCX unchanged |
| `git diff --check` | Passed |

Application source/contract behavior is unchanged in this closeout, so local
backend/Compose tests were not repeated without a new code concern. The modified
workflow triggers cause actual release-branch CI to rerun backend, PostgreSQL,
frontend, contract and Compose validation; record those results after execution.
Prepared protection rules are not claimed as tested effective authorization.

## Published candidate and actual CI

`git commit -m 'docs: prepare reviewed Sprint 1 release and collaborator defaults (refs #20)'`
created candidate `c83f0de521f28bfc51bcbe30dfef93dec5737a14`.
`git push -u origin release/sprint-1` succeeded.
`node .sprint1/sprint1-release.cjs pr` opened draft #21 from release/sprint-1 to main.
The complete current diff is proposed through a PR; original main was not rewritten.

`node .sprint1/sprint1-release.cjs checks` verified **all ten push/PR checks succeeded**
for that candidate. PR-event checks, using the exact configured context names:

- [backend](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41355125674/job/124993434403).
- [OpenAPI 3.1 validation](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41355125739/job/124993434741).
- [Stack A backend / PostgreSQL](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41355125653/job/124993434942).
- [Stack A frontend](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41355125653/job/124993434911).
- [Stack A Compose smoke](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41355125653/job/124993434775).

These verify pipeline triggers on the release candidate as well as application,
PostgreSQL, schema, frontend and Compose checks. They do not demonstrate deployed
branch policies, Project permissions, peer approval or final main checks.

`git merge-base --is-ancestor origin/main HEAD` and the same check for bf48434
both passed. `git merge-tree --write-tree origin/main HEAD` produced a clean merge
preview without moving any branch. No original tracked path was deleted. Thus
the proposed Git flow preserves history; it is not a force overwrite of main.

The task-local `fill-submission-evidence.py` created
[Cuckoo_Sprint1_Repository_Evidence_Candidate.docx](../submissions/Cuckoo_Sprint1_Repository_Evidence_Candidate.docx).
It replaced eight pending artifact/evidence rows with verified branch/PR/CI URLs
and explicit still-pending owner/review/tag information. ZIP CRC, XML parsing,
identical embedded assets/styles and unchanged source SHA-256 were verified.
No renderer/layout check was run. The original submitted DOCX remains unchanged;
this separate candidate is not a final accepted submission while pending rows remain.

The evidence follow-up changes only documentation. Read PR #21 for the archived release-branch
candidate checks and PR #23 for the current closeout-to-main review state. Next executable steps
require the real owner/reviewer, as detailed in [owner-actions.md](owner-actions.md); no approval
or release completion is invented.

## Final audit follow-up

See [final-audit.md](final-audit.md) for the current requirement matrix. Confirmed
accounts and all initial issue planning owners are now applied/verified. The
candidate Word and Project manifest reflect those assignments. A read-only audit
and nine negative/positive release-readiness tests prevent prepared payloads,
stale/missing CI, self/stale/non-writer reviews or a misplaced/unpublished tag from
being counted as completed release evidence. Seven original contract/YAML tests
remain, for 16 tooling tests total.

Effective main/develop protection is still absent and Project import/admin access
is unverified with this token; these are setup blockers beyond human release/PR
approval. The user's requested repository/Project Admin for anyx05 is recorded as
pending owner approval and an appropriate ownership/access arrangement. No grant,
policy bypass, merge or release is fabricated.
