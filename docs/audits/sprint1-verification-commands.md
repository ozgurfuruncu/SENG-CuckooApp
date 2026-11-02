# Sprint 1 verification — commands and actual results

## Markdown submission format — user request, 2026-11-03

The primary artifact is now
[Cuckoo_Sprint1_Submission.md](../submissions/Cuckoo_Sprint1_Submission.md).
The user requested removal of the validation-actions section and a final-form
draft assuming required Sprint 1 actions are complete. The Markdown explicitly
labels that authoring assumption; it does not manufacture observed control,
review, tag or instructor-acceptance records. The evidence index remains factual.
The previous DOCX is preserved, but Word/PDF rendering is no longer a gate for
this Markdown submission.

The exact GitHub checkbox wording is not in the PDF; page 15 explicitly requires
protecting main/develop with pull-request and status-check requirements. Page 17
also requires an enforced workflow. The checkbox is the implementation of that
stated requirement, not an extra standard invented for this task.

Actual checks: local Markdown links resolve; the submission has the completion
assumption, all major sections and 13 MVP story rows, with US-14/15 deferred and
no validation-actions section or pending placeholder. Existing 27 schema-example
checks, original-source hashes and preserved Word ZIP checks pass. No runtime,
contract, dependency or deployment change is made. PR #32 records its final-head
CI separately from the earlier passing result.

```powershell
./.venv/Scripts/python.exe .sprint1/validate_assignment_candidate.py
./.venv/Scripts/python.exe .sprint1/check_markdown_submission.py
git diff --check
git add README.md docs
git diff --cached --check
git commit -m "Use Markdown Sprint 1 submission with explicit completion assumption (refs #20)"
git push origin feature/20-assignment-closeout
```

## Course-backed corrective candidate — 2026-11-03

The actual 17-page course pack is now supplied; its pp.14–17 require teammate
review, protected main/develop with PR/status checks, and a sprint submission tag.
See [requirement mapping](../sprint-1-requirements.md). This supersedes the earlier
assumption that these items had no explicit course source. GitHub Releases,
separate release branches and Project boards remain optional. Existing #20 is
reopened; the candidate must not be merged/tagged without its genuine review.

Automatic corrections: explicit existing-story epic/owner/dependency mapping,
labelled code-native SVG/PNG context diagram, current Word evidence copy with
clickable URLs, consistent SDD/course criteria and exact owner/reviewer steps.
Application, OpenAPI, runtime dependencies, deployment, license, ADRs, archived
source and contributor history are unchanged.

Actual commands:

```powershell
git fetch origin
git switch -c feature/20-assignment-closeout origin/main
./.venv/Scripts/python.exe .sprint1/assignment_docs.py
./.venv/Scripts/python.exe .sprint1/complete_backlog.py
./.venv/Scripts/python.exe .sprint1/reconcile_assignment_evidence.py
./.venv/Scripts/python.exe .sprint1/context_diagram.py
./.venv/Scripts/python.exe .sprint1/assignment_docx.py
./.venv/Scripts/python.exe .sprint1/link_docx_evidence.py
./.venv/Scripts/python.exe .sprint1/reopen_assignment_closeout.py
./.venv/Scripts/python.exe .sprint1/assignment_snapshot.py
./.venv/Scripts/python.exe .sprint1/validate_assignment_candidate.py
git diff --check
git diff --stat
```

Results: **132 active local links across 31 Markdown documents, 27 schema-example
checks, 15 existing story/owner/issue mappings, Word ZIP/XML/relationship integrity
and 14 clickable evidence links passed**. The candidate has 415 paragraphs after
adding four epic descriptions. Its embedded diagram matches the rendered PNG;
four explicit arrowheads and labelled information exchanges are present. Both the
supplied original and archived original retain the recorded source SHA-256.
All other Word ZIP entries were preserved except the intended document XML,
hyperlink relationships and updated diagram image. Source [PENDING] placeholders
were replaced by verified evidence and clearly named real outstanding gates.

The existing main CI [41530996698](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41530996698)
is successful. Local contract lint and all seven validator tests were rerun during
the preceding assignment review against the same unchanged API bytes. This
candidate's own PR CI is recorded in its PR/#20; no older result is substituted
for the final head. New backend/frontend/Compose tests were not run locally for
this documentation-only change.

Document tooling was installed only in ignored .sprint1/document-tools, leaving
project requirements unchanged. An isolated hidden Word export was attempted.
The .ps1 launcher was blocked by the machine's script execution policy; the same
inline commands were allowed without changing that policy. Word then stalled and
held the read-only candidate open. Only the identified task-created automation
instance was stopped, then its waiting shell was interrupted. No review PDF was
produced and **Word layout is not marked verified**. The hyperlink update first
hit that file lock, then passed after the instance was stopped. The teammate must
open the DOCX, check layout and export the final PDF if required for submission.

No repository protection write, formal review, tag, GitHub Release or deployment
was simulated. The account's admin=false/maintain=false prevents owner-only
settings, while an actual teammate must provide peer review. Tag creation is
authorized but depends on reviewed/tested main integration. Exact manual steps
are in [manual closeout](../submissions/manual-closeout.md).

Publication commands (issue-linked corrective branch; no merge/tag before review):

```powershell
git add AGENTS.md README.md .github/PULL_REQUEST_TEMPLATE.md docs
git diff --cached --check
git commit -m "Reconcile Sprint 1 submission with supplied course criteria (refs #20)"
git push -u origin feature/20-assignment-closeout
./.venv/Scripts/python.exe .sprint1/create_assignment_pr.py
```

## Process clarification — 2026-11-03

The user superseded the earlier mandatory controls/release checklist: follow
team-approved plans and require protections, formal GitHub approval counts,
Projects, release branches, tags or GitHub Releases only when explicit instructions
or the current team plan call for them. Existing enforced rules still apply.
No separate instructor rubric was found among the repository's documents.
This changes the interpretation of optional missing items, not the original
GitHub observations preserved below. Existing #20 tracks the follow-up.

Actual follow-up commands:

```powershell
git fetch origin
git switch -c feature/20-proportionate-workflow origin/develop
$env:PYTHONIOENCODING='utf-8'
./.venv/Scripts/python.exe .sprint1/inspect_docx.py
./.venv/Scripts/python.exe .sprint1/simplify_docs.py
./.venv/Scripts/python.exe .sprint1/policy_snapshot.py
./.venv/Scripts/python.exe .sprint1/policy_docx.py
./.venv/Scripts/python.exe .sprint1/verify_docs.py
git diff --check
git diff --stat
./.venv/Scripts/python.exe .sprint1/update_policy_issue.py
git add AGENTS.md README.md .github/PULL_REQUEST_TEMPLATE.md docs
git diff --cached --check
git commit -m "Make GitHub controls and publication conditional on explicit requirements (refs #20)"
git push -u origin feature/20-proportionate-workflow
```

Results: **112 active local Markdown links resolved, 27 US-03 example/schema checks
passed**, Word ZIP/XML validated, 26 evidence/policy paragraphs updated, all other
ZIP entries identical and archived original SHA-256 unchanged. Application,
contract, dependencies, deployment, license, diagram, ADRs and archives are
unchanged. Word layout was not rendered. No new application tests were run for
this documentation-only change. Existing CI will supply separate PR results.

Remote requests used the existing credential-safe helper: GET issues/20,
issues/27 and pulls?state=open&per_page=100 returned 200; no open PR existed.
PATCH issues/20 returned 200 and records the user decision while retaining the
old plan as superseded context. No admin permission, repository setting, tag,
release, deployment or contributor history was changed.

The sections below are the original 2026-11-02 command/result record and earlier
publication observations; their optional-control gates are historical.

Run date: **2026-11-02**, Europe/Istanbul. Workspace:
`C:\Users\User\Downloads\Cuckoo`. Assessed remote baseline: `08386a19afdaddee67c230790de50fb7b95b342a`.
Issue-linked branch: `feature/27-sdd-sprint1-verification`, from origin/develop.
See [assessment](sprint1-remote-verification.md) and
[sanitized remote responses](sprint1-remote-evidence.json).

## Repository and authentication inspection

Evidence-producing commands, issued from the root unless a directory is specified:

```powershell
Get-Location
git status --short --branch
git remote -v
git branch -avv
git tag -n
gh auth status
git config --get credential.helper
git ls-remote --heads --tags origin
git fetch origin
git log -8 --format='%h %s'
git rev-parse HEAD
git rev-parse 'HEAD^{tree}'
git rev-parse 'origin/main^{tree}'
git ls-tree -r HEAD
Get-FileHash docs/archive/submissions/Cuckoo_Sprint1_Submission_Original.docx -Algorithm SHA256
git switch -c feature/27-sdd-sprint1-verification origin/develop
```

gh was not installed. Initial sandbox GitHub access failed; elevated network
execution succeeded. Initial branch creation was denied writing .git/index.lock;
elevated git switch succeeded. There was no automatic-approval rejection and no
protection write/bypass. Git Credential Manager supplied the existing credential
to Python in memory; it was not printed or saved. Authenticated GET /user returned
anyx05. No GitHub plugin was required for the authenticated REST/GraphQL calls.

Remote reads used `.sprint1/remote_audit.py` and `.sprint1/remote_details.py`, invoked as:

```powershell
./.venv/Scripts/python.exe .sprint1/remote_audit.py
./.venv/Scripts/python.exe .sprint1/remote_details.py
```

The session scripts are ignored scratch files, not application dependencies.
They use Python urllib, Git Credential Manager and the API requests below. All
listed requests were actually performed. Paths prefixed `R` mean
`https://api.github.com/repos/ozgurfuruncu/SENG-CuckooApp`.

| Method / URL suffix | Actual result |
| --- | --- |
| GET https://api.github.com/user | 200, anyx05; OAuth scopes gist, repo, workflow |
| GET R | 200, public; push=true, admin=false, maintain=false |
| GET R/branches?per_page=100 | 200, two branches initially; main/develop at 08386a1, protected=false |
| GET R/tags?per_page=100 and R/releases?per_page=100 | 200, both empty |
| GET R/issues?state=all&per_page=100 | 200, 26 entries including PRs; 19 actual issues; no next page |
| GET R/pulls?state=all&per_page=100 | 200, seven PRs; no next page |
| GET R/pulls/N/reviews?per_page=100, N=17,19,21,22,23,25,26 | 200, two real human approvals (#22/#23); bot comment only #21; other lists empty |
| GET R/issues/20/comments?per_page=100 and R/issues/24/comments?per_page=100 | 200, both initially empty |
| GET R/actions/runs?per_page=30 and same with &page=2 | 200, all 59 run summaries inspected; no third page |
| GET R/actions/runs/41464572459/jobs?per_page=100 | 200, five successful jobs at baseline SHA |
| GET R/actions/workflows | 200, ci.yml and dynamic Copilot workflow |
| GET R/contributors?per_page=100 | 200, anyx05=18, ozgurfuruncu=4, Copilot=5 |
| GET R/collaborators?per_page=100 | 200, six named accounts; only ozgurfuruncu is admin |
| GET R/rulesets | 200, empty |
| GET R/branches/main/protection and R/branches/develop/protection | 404; corroborated with protected=false and empty effective rules |
| GET R/rules/branches/main and R/rules/branches/develop | 200, empty |
| GET R/commits?per_page=100 | 200, 27 baseline commits; no next page |
| GET R/git/trees/08386a19afdaddee67c230790de50fb7b95b342a?recursive=1 | 200, not truncated; 95 remote blob IDs equal git ls-tree baseline IDs |
| POST https://api.github.com/graphql | HTTP 200 with GraphQL INSUFFICIENT_SCOPES errors; Project evidence BLOCKED |

Exact GraphQL query:

```graphql
query { viewer { login } repository(owner:"ozgurfuruncu",name:"SENG-CuckooApp") { projectsV2(first:20) { nodes { number title url closed } } } }
```

Remote mutation commands used the small `.sprint1/github_api.py` helper, with
method, API path, response filename and JSON payload file arguments. Actual requests:

```powershell
./.venv/Scripts/python.exe .sprint1/github_api.py POST /repos/ozgurfuruncu/SENG-CuckooApp/issues created-sdd-issue.json .sprint1/sdd-issue-body.json
./.venv/Scripts/python.exe .sprint1/github_api.py PATCH /repos/ozgurfuruncu/SENG-CuckooApp/issues/20 reopened20.json .sprint1/reopen20.json
./.venv/Scripts/python.exe .sprint1/github_api.py POST /repos/ozgurfuruncu/SENG-CuckooApp/issues/20/comments closeout-comment-result.json .sprint1/closeout-comment.json
```

Results: 201 [SDD issue #27](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/27),
200 reopening existing #20, 201 [verified closeout comment](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/20#issuecomment-6586853736).
No duplicate cleanup issue, review object, tag, release or protected-branch merge
was created. Publishing/check results for this PR are added after actual observation.

## Local tests and build

From `backend`:

```powershell
../.venv/Scripts/python.exe -m pytest --cov=app --cov-report=term-missing --cov-fail-under=50 --basetemp=../.sprint1/pytest-temp
```

**13 passed, one skipped**, 97.87% active-app coverage. PostgreSQL integration URL
was not provided, so its case skipped. One upstream Starlette TestClient/httpx
deprecation warning. This does not establish local PostgreSQL pytest execution.

From `tools/contract`:

```powershell
npm.cmd run lint
npm.cmd test
```

OpenAPI 3.1 lint passed; **7/7 tests passed**, including negative schemas/references,
duplicate IDs/keys and all checked-in YAML parsing. Existing node_modules were
used; npm ci was not run locally during this task.

From `frontend`:

```powershell
npm.cmd run build
```

TypeScript `tsc --noEmit` and Vite production build passed. No feature component
suite exists or was run; US-03's component cases are documentation only.

From the root:

```powershell
docker compose config --quiet
docker version --format '{{.Server.Version}}'
$env:BOOTSTRAP_COMPOSE_PROJECT='cuckoo-sprint1-audit-27'
$env:BOOTSTRAP_API_PORT='18027'
$env:BOOTSTRAP_WEB_PORT='15027'
./.venv/Scripts/python.exe scripts/compose_smoke.py
```

Compose config succeeded with sandbox Docker-config access warnings; initial
docker version could not access the engine pipe. The smoke command was then run
with elevated Docker access and **passed**: both images built, PostgreSQL connected,
migrations rerun, API health and built frontend verified, containers recreated,
test DB marker survived then was removed. Test containers/network stopped; its
named volume remains. Existing application containers/volumes were untouched.

## Documentation, example and document integrity

Actual one-off scratch commands:

```powershell
$env:PYTHONIOENCODING='utf-8'
./.venv/Scripts/python.exe .sprint1/inspect_docx.py
./.venv/Scripts/python.exe .sprint1/summarize_evidence.py
./.venv/Scripts/python.exe .sprint1/compare_tree.py
./.venv/Scripts/python.exe .sprint1/update_docx.py
./.venv/Scripts/python.exe .sprint1/verify_docs.py
git diff --check
git diff --stat
git diff --name-only origin/develop
```

DOCX inspection initially hit a Windows console UnicodeEncodeError; setting
PYTHONIOENCODING=utf-8 resolved it. Optional python-docx import was unavailable;
the update used Python standard-library ZIP/XML only. Nineteen evidence/status
paragraphs were corrected. All other ZIP entries, including embedded assets and
relationships, remain byte-identical. ZIP CRC and XML parsing pass. Original
source SHA-256 remains
`04C3B14CFA8DA58B6A0C06BF98A01B5EADE8EF82BB6BDBC3A3ED2B931F012E86`.
Word layout was **not rendered**. The existing system-context PNG was visually
inspected. No new image was generated.

The documentation validator checks all active local Markdown links, the example
request against NewTask including formats, required-field/boundary counterexamples,
Word ZIP/XML/original-source integrity and unchanged application/contract/assets.
These are documentation/schema checks, not createTask behavior tests. Exact
results: **111 active local Markdown links across 29 documents resolved**;
**27 US-03 example/schema checks passed** (valid example, required-field omissions,
bounds, optional fields and documented unconstrained blanks). Contract createTask
responses remain exactly 201/400/401/403. ZIP/XML and original-source checks passed;
application, contract, lockfiles, deployment, license, diagram, ADRs and archives
are unchanged. `git diff --check` passed. The first schema-check attempt revealed
that the installed jsonschema lacks an optional date-time checker; the scratch
validator registered a standard-library date-time check and the rerun passed.
No application or OpenAPI change was made to work around this validation-tool limitation.

## Publication and final observed state

Published [PR #28](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/28) into
develop, non-draft and open for independent human review. First source commit:
`01c338e0b385ddf7377e61c3d22ec9f2c19beeb4`. Its
[PR CI run](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41514792305)
and [push run](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41514779774)
were observed in progress. This publication-record follow-up is documentation
only; inspect the [current PR checks](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/28/checks)
for the final head. Final observed run results are also recorded in the PR
description and task report, without creating a self-referential CI evidence commit.

Exact publication/inspection commands:

```powershell
git add AGENTS.md README.md .github/ISSUE_TEMPLATE/user-story.yml .github/PULL_REQUEST_TEMPLATE.md docs
git diff --cached --check
git diff --cached --stat
git commit -m "Verify Sprint 1 remote evidence and establish SDD workflow (refs #20, #27)"
git push -u origin feature/27-sdd-sprint1-verification
./.venv/Scripts/python.exe .sprint1/github_api.py POST /repos/ozgurfuruncu/SENG-CuckooApp/pulls created-pr.json .sprint1/pr-body.json
./.venv/Scripts/python.exe .sprint1/github_api.py GET '/repos/ozgurfuruncu/SENG-CuckooApp/actions/runs?branch=feature%2F27-sdd-sprint1-verification&per_page=10' pr-runs.json
./.venv/Scripts/python.exe .sprint1/github_api.py GET /repos/ozgurfuruncu/SENG-CuckooApp/pulls/28 pr-current.json
git add docs/audits docs/submissions/README.md
git diff --cached --check
git commit -m "Record Sprint 1 audit and SDD review PR evidence (refs #20, #27)"
git push origin feature/27-sdd-sprint1-verification
```

Git push succeeded and PR creation returned 201. #20 remains open for owner
controls, Project verification, independent release review and immutable
tag/release publication. #27 completes only after human review and merge of the
SDD artifacts. No human approval, merge or release was performed by the agent.
