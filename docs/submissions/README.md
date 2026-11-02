# Sprint 1 submission and evidence

## Current remote assessment — 2026-11-02

**Remaining gaps / access-blocked; repository evidence is not yet complete.**
The [fresh remote audit](../audits/sprint1-remote-verification.md) supersedes earlier
manual attestations for current GitHub state. Baseline main/develop are both
[`08386a1`](https://github.com/ozgurfuruncu/SENG-CuckooApp/commit/08386a19afdaddee67c230790de50fb7b95b342a).
The [sanitized snapshot](../audits/sprint1-remote-evidence.json) and
[commands/results](../audits/sprint1-verification-commands.md) separate remote
evidence, local checks and unverified items. No instructor acceptance is claimed.

| Evidence item | Verified status / direct link |
| --- | --- |
| Proposal, MIT, vision/boundary, RACI, prioritized assigned backlog | PASS; immutable artifact links in the remote audit |
| Canonical OpenAPI and baseline CI | PASS; [run 41464572459](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41464572459), all five jobs successful |
| Genuine human review | PASS for [merged #23 approval](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/23#pullrequestreview-5737268346); [#22 approval](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/22#pullrequestreview-5737094704) exists but #22 was not merged |
| Final release candidate review | GAP; later #25/#26 have no submitted reviews; final reviewed release PR remains required |
| main/develop protections | GAP; [branches](https://api.github.com/repos/ozgurfuruncu/SENG-CuckooApp/branches?per_page=100) unprotected, effective rules/rulesets empty; owner must enable controls |
| Project evidence | BLOCKED; GraphQL read:project scope missing; no board URL/status independently verified |
| Sprint tag/release | GAP; [tags](https://api.github.com/repos/ozgurfuruncu/SENG-CuckooApp/tags?per_page=100) and [releases](https://api.github.com/repos/ozgurfuruncu/SENG-CuckooApp/releases?per_page=100) empty |
| Corrective tracking | Reopened [#20](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/20); distinct SDD [#27](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/27) |
| Documentation corrections / SDD proposal | Open [PR #28 into develop](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/28); [current checks](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/28/checks); independent human review pending |

The current DOCX is updated to this assessment; its original supplied source
remains unchanged. This documentation PR is proposed evidence until reviewed and
merged; its publication/check state is recorded in the command/result log.

Current working submission: [Cuckoo_Sprint1_Submission.docx](Cuckoo_Sprint1_Submission.docx).
Original supplied source: [unchanged archived DOCX](../archive/submissions/Cuckoo_Sprint1_Submission_Original.docx),
SHA-256 `04C3B14CFA8DA58B6A0C06BF98A01B5EADE8EF82BB6BDBC3A3ED2B931F012E86`.
Supplied submission date: **5 November 2026**. The evidence copy is updated from
verified artifacts/results; it does not rewrite the source or invent publication.

| Artifact | Evidence |
| --- | --- |
| Repository | [SENG-CuckooApp](https://github.com/ozgurfuruncu/SENG-CuckooApp) |
| Contract | [api/openapi.yaml](../../api/openapi.yaml), OpenAPI 3.1 / 0.2.1-draft |
| License | [Original MIT](../../LICENSE) |
| Architecture | [Accepted ADR-001](../decisions/ADR-001-architecture.md) |
| Roles/accounts | [RACI](../team-raci.md), [confirmed accounts](../team-accounts.json) |
| Boundary | [Supplied system context](../diagrams/system-context.png) |
| Backlog | [Stories](../product-backlog.md), [GitHub index](../issue-index.md) |
| Application/testing | [Development guide](../development.md), [CI](../../.github/workflows/ci.yml) |
| Cleanup | [PR #25](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/25), [issue #24](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/24) |
| Historical records | [Archive](../archive/README.md); old claims apply only to their recorded revision/date |

## Earlier cleanup attestations and observations (historical)

During the earlier cleanup the user reported PR/issue/manual attestations handled. No extra
attestation bot or hard-coded PR-state gate runs in this submission. The report
is preserved separately from what the GitHub API exposed during cleanup:

- #17 is merged into develop; #19 is merged into its parent feature branch.
- #21 and #22 are closed unmerged; #23 is merged into main at c8c16b5.
- Cleanup includes #23's full history and both actual #17/#19 merge commits.
- #25 is merged into main at 42f18af. Develop was fast-forwarded to that same
  approved cleanup commit. The user confirmed approval in the conversation;
  no separate GitHub review object is asserted.
- No sprint-1 tag/release was returned at inspection, and current API credentials
  could not read Project scope. The user report covers manual attestations;
  repository inspection records are kept distinct from it.
- The user's administrative issue closures are retained. They do not imply that
  draft auth/task/evidence/payment business endpoints have been implemented.

## Cleanup validation

Verified 2026-11-02 at application revision
`99ae828182714746e5c97be09750ba62fe4ea207`:

| Check | Result |
| --- | --- |
| [Backend/PostgreSQL](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41458410871/job/125320920234) | 14 passed, 100% active-app coverage; one upstream TestClient deprecation warning |
| [OpenAPI validation](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41458410871/job/125320920235) | Canonical lint and all 7 validation/negative tests passed |
| [Frontend](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41458410871/job/125320920111) | TypeScript check and production build passed |
| [Compose smoke](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41458410871/job/125320921020) | Image build, PostgreSQL, migrations, health, built client and volume persistence passed |
| [Required backend compatibility status](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41458410871/job/125321138209) | Passed; mirrors the single backend suite |
| Native workspace checks | Backend 13 passed / 1 PostgreSQL-only test skipped; 97.87% coverage. Contract, frontend and actual Docker smoke also passed locally |
| Source and document checks | Original source SHA-256 unchanged; all 8 evidence placeholders filled; Word ZIP/XML and embedded assets verified. Word layout was not rendered |
| Active documentation | All 48 local Markdown links resolve. Historical links target preserved Git revisions |

Evidence-only updates follow that tested application revision. The
[PR checks](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/25/checks) show the
current head's results. The API contract, MIT license and context diagram are
unchanged by cleanup.

The local checkout is consolidated at the Cuckoo workspace root. The old unpacked
starter and session scratch files are backed up outside the tracked source in
.archive; the pre-cleanup Git bundle preserves all original local/remote refs.
Database volumes are not deleted.

Five obsolete feature/release/Copilot branches were removed only after their
exact tips were verified as ancestors of the published cleanup branch. This
includes the closed PR #22 proposal history, retained without replacing the
accepted ADR or current contract. PR #25 is merged, and main/develop are
synchronized to the approved submission. Merged housekeeping branches are removed
after their commits are verified as retained in main.
