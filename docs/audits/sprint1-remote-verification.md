# Sprint 1 remote repository verification

Inspected **2026-11-02**, Europe/Istanbul; evidence snapshot collected
19:52 UTC / 22:52 Istanbul. Repository:
[ozgurfuruncu/SENG-CuckooApp](https://github.com/ozgurfuruncu/SENG-CuckooApp).
Assessed published baseline:
[`08386a19afdaddee67c230790de50fb7b95b342a`](https://github.com/ozgurfuruncu/SENG-CuckooApp/commit/08386a19afdaddee67c230790de50fb7b95b342a).
This report assesses the requested Sprint 1 criteria and the supplied submission;
no separate instructor rubric or official acceptance was available.

**Assessment: remaining gaps and access-blocked evidence.** Repository evidence
cannot yet be declared complete. PASS means observed remote evidence satisfies
that row; GAP means a required artifact/control is absent; BLOCKED means access
prevents verification. Local intentions and user attestations are not substituted
for GitHub records. Corrections and new workflow documents in this PR are proposals
until reviewed and merged.

## Criterion assessment

| Criterion | Result | Direct evidence and finding |
| --- | --- | --- |
| Project proposal and problem definition | PASS | [Published submission DOCX](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/08386a19afdaddee67c230790de50fb7b95b342a/docs/submissions/Cuckoo_Sprint1_Submission.docx), sections 1–2; [project summary](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/08386a19afdaddee67c230790de50fb7b95b342a/README.md). Hypotheses and pending stakeholder validation are explicit |
| MIT license | PASS | [Complete MIT text and original attribution](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/08386a19afdaddee67c230790de50fb7b95b342a/LICENSE) |
| System vision and software boundary | PASS | Submission sections 5–7; [boundary diagram](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/08386a19afdaddee67c230790de50fb7b95b342a/docs/diagrams/system-context.png), visually inspected. Real-world permission/visit and real money/verification are excluded |
| Valid OpenAPI YAML | PASS | [Canonical 3.1 contract](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/08386a19afdaddee67c230790de50fb7b95b342a/api/openapi.yaml); [successful validation job](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41464572459/job/125341968217). Local lint and all seven validator/negative tests pass |
| Named team roles and RACI | PASS | [Six named roles, confirmed accounts and exactly one A per row](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/08386a19afdaddee67c230790de50fb7b95b342a/docs/team-raci.md). Account access was separately verified; assignment is not contribution proof |
| Documented repository workflow | PASS | [Issue branches, develop integration, reviewed main releases](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/08386a19afdaddee67c230790de50fb7b95b342a/docs/branch-process.md). Current controls are assessed separately below |
| Actual main/develop branches and preserved history | PASS | [Remote branches API](https://api.github.com/repos/ozgurfuruncu/SENG-CuckooApp/branches?per_page=100): both at 08386a1; [27 baseline commits](https://github.com/ozgurfuruncu/SENG-CuckooApp/commits/08386a19afdaddee67c230790de50fb7b95b342a/). Fetch and remote blob comparison matched the local baseline |
| Enforced main/develop protections | GAP | Both branches report protected=false; [effective main rules](https://api.github.com/repos/ozgurfuruncu/SENG-CuckooApp/rules/branches/main), [develop rules](https://api.github.com/repos/ozgurfuruncu/SENG-CuckooApp/rules/branches/develop) and [rulesets](https://api.github.com/repos/ozgurfuruncu/SENG-CuckooApp/rulesets) return empty lists. Classic protection GETs return 404. This is corroborated absence, not a claim based only on 404 |
| Prioritized backlog, acceptance criteria, estimates and owners | PASS | [Backlog](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/08386a19afdaddee67c230790de50fb7b95b342a/docs/product-backlog.md), [issue mapping](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/08386a19afdaddee67c230790de50fb7b95b342a/docs/issue-index.md), [US-03 example issue](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/3). All US-01..15 have planning owner elfn0909, priorities, points and AC. US-14/15 deferred. Administrative closures do not establish implementation |
| GitHub Project / board evidence | BLOCKED | [Issue backlog is visible](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues?q=is%3Aissue); GraphQL projectsV2 query returns INSUFFICIENT_SCOPES: token lacks read:project. No Project URL/import/status is asserted. Supplied submission and #20 call for this evidence |
| Genuine PR reviews | PASS | Real anyx05 APPROVED review on [merged Copilot-authored #23](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/23#pullrequestreview-5737268346). Also a real approval on [closed-unmerged #22](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/22#pullrequestreview-5737094704); #22 is not accepted implementation evidence |
| Reviewed final release candidate | GAP | [#25](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/25) and [#26](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/26) merged after #23; their [review list](https://api.github.com/repos/ozgurfuruncu/SENG-CuckooApp/pulls/25/reviews) and [#26 review list](https://api.github.com/repos/ozgurfuruncu/SENG-CuckooApp/pulls/26/reviews) are empty. Prior genuine #23 approval does not cover later changes; final release review remains needed under #20 |
| CI workflow and actual successful checks | PASS | [Published workflow](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/08386a19afdaddee67c230790de50fb7b95b342a/.github/workflows/ci.yml); [successful baseline run 41464572459](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41464572459), all five jobs successful at 08386a1. Required-check enforcement is absent with branch protections |
| Sprint release tag and release evidence | GAP | [Remote tags](https://api.github.com/repos/ozgurfuruncu/SENG-CuckooApp/tags?per_page=100) and [releases](https://api.github.com/repos/ozgurfuruncu/SENG-CuckooApp/releases?per_page=100) are empty; git ls-remote --heads --tags agrees. No tag was created or rewritten by this audit |
| Submission evidence links complete and accurate | GAP | [Published ledger](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/08386a19afdaddee67c230790de50fb7b95b342a/docs/submissions/README.md) and DOCX contain real artifact/PR/CI links, but protection, Project and release evidence remains incomplete. This PR corrects status language rather than marking those rows done |

## Inspection coverage and contributor evidence

GitHub authentication resolves to **anyx05**, with repo/workflow/gist token scopes.
Repository permission response: push/triage/pull true; admin/maintain false.
`gh auth status` was unavailable because gh is not installed; authenticated REST
`GET /user` and repository permissions were used instead. No token was printed.
The initial sandbox network denial was resolved using authorized elevated reads.

Inspected all 19 non-PR issues and seven PRs present initially, all seven submitted
review lists, 27 commits on baseline main, both branches, all tags/releases,
workflow inventory, all 59 workflow-run summaries (two pages), current baseline
job results, six collaborators and contributor summaries. The active custom CI
is ci.yml; the second API workflow entry is GitHub's dynamic Copilot agent workflow.
The recursive remote tree was not truncated; blob identities match the fetched
baseline. Source files and DOCX were read only after that comparison. Historical
files remain evidence of their own revision, not current setup instructions.

[Contributor summaries](https://api.github.com/repos/ozgurfuruncu/SENG-CuckooApp/contributors?per_page=100)
show anyx05 (18 commits), ozgurfuruncu (4), and Copilot (5). The real human review
links above provide review evidence. Six collaborator accounts match the named
team mapping; access and issue ownership do not demonstrate work completed by all
six people. No per-person grade or undocumented meeting contribution is inferred.
The course's full individual-assessment rubric was not supplied.

PR history: #17 merged into develop; #19 merged into its parent feature branch;
#21/#22 closed unmerged; #23/#25/#26 merged into main. #17/#19/#25/#26 have no
submitted review objects; #21 has only a bot COMMENTED quota message. That message
is not a review approval. Source and merge history is preserved.

## Smallest corrective work and maintainer actions

Reuse reopened [#20](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/20)
for controls/release/evidence closeout, with [verified findings and checkboxes](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/20#issuecomment-6586853736).
Keep existing cleanup #24 and all contributor work intact. Distinct SDD setup is
[#27](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/27); this documentation
PR [#28](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/28) uses
`feature/27-sdd-sprint1-verification` from develop and references both. It is open
for human review; its [checks](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/28/checks)
are separate from the successful baseline run above. No merge/approval is asserted.

1. **Owner ozgurfuruncu:** enable protection for main and develop. Require PRs,
   at least one independent approval, stale-review dismissal, resolved
   conversations and passing current checks; apply controls to admins, disable
   force pushes/deletions and routine bypass. Current job names are `backend`,
   `Stack A backend`, `OpenAPI 3.1 validation`, `Stack A frontend`,
   `Stack A Compose smoke`. Verify actual rule responses afterwards. Current
   credentials cannot administer these settings; no forbidden write was attempted.
2. **Authorized Project reader / SM:** supply readable Project evidence (or use
   credentials with read:project), verify issue import/owners/status and record its
   actual URL. No scope or access grant was requested automatically.
3. **Independent human reviewer / maintainers:** review this diff and the final
   release candidate through the develop → main PR flow, including later cleanup
   changes; record real review URLs and successful checks at the reviewed heads.
   This task does not impersonate a reviewer or merge unreviewed work.
4. **Release maintainer:** after these gates, tag the actual reviewed main commit
   `sprint-1` and publish the submission release. Verify refs/releases again and
   update the ledger/DOCX with exact URLs and SHA. Do not move an existing tag.

## Validation and limits

Local checks: backend **13 passed, one PostgreSQL-only test skipped**, coverage
97.87%; OpenAPI lint and **7/7 tests passed**; frontend typecheck/build passed.
There is one upstream TestClient deprecation warning. These results do not claim
local PostgreSQL pytest execution. The baseline remote PostgreSQL job and Compose
job are separately successful. Documentation/example/Word validation and the
isolated local Docker smoke result are recorded in [the command/result log](sprint1-verification-commands.md).

See [sanitized remote snapshot](sprint1-remote-evidence.json),
[updated submission index](../submissions/README.md),
[SDD workflow](../templates/SDD_WORKFLOW.md) and
[US-03 documentation example](../specs/US-03-create-task.md).
This is repository verification; **official instructor acceptance is not claimed**.
