> Historical pre-cleanup record. Commands and state below describe their original inspection, not current setup. Relative evidence links now point to the preserved source commit. See the current root README.

# Sprint 1 foundation evidence

Inspection date: 2026-11-01 (Europe/Istanbul). Related existing technical story:
[T-05, issue #16](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/16).

## What existed

The supplied workspace `C:\Users\User\Downloads\Cuckoo` is an unpacked starter,
not a Git repository. It contains API 3.1, proposed architecture documents,
backlog, process templates, MIT license, DB-only Compose, and frontend/backend
README placeholders. The external handoff is not the same as remote repository
state. Its requested ADR/review paths were absent; the actual source documents
were `docs/decisions/ADR-001-architecture.md` and `docs/decisions/STACK_REVIEW.md`.
Aliases now resolve both handoff paths without replacing the original records.

The public remote already had 30 tracked files and two commits:

```text
8f701754a296dfd5aa9e464383ac4668d0f5e790 first commit
d5f981643a2c01cd90b4d7dc3416b8800ddebee8 feat: Cuckoo ilk iskelet (FastAPI, PostgreSQL, React, Docker)
```

It includes actual React/JavaScript/Vite and FastAPI/SQLAlchemy code, six pytest
tests, PostgreSQL/full-app Compose, OpenAPI 3.0.3, legacy backlog and MIT LICENSE.
Only main existed initially; no tags, PRs, issues or rulesets were returned. Main
was `protected: false`. One active workflow (`.github/workflows/ci.yml`) existed.
Its existing [run 41185544715](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41185544715)
completed successfully; that does not prove compliance with the new contract.
The original root README has NUL/encoding artifacts at its end; it was preserved.

## Inspection commands and observed results

Commands were executed from the supplied workspace unless specified. Failed probes
are recorded rather than described as completed operations.

| Command/request | Actual result |
| --- | --- |
| `git status --short` (supplied root) | Fatal: not a git repository |
| `rg --files --hidden -g '!.git' -g '!node_modules'` | Enumerated starter contents; no application implementation there |
| `gh --version`; `gh auth status` | Command not found; GitHub CLI unavailable |
| `git --version`; `node --version`; `npm.cmd --version`; `py --version` | Git 2.54.0.windows.1; Node v24.18.0; npm 11.16.0; no installed Python |
| `git ls-remote --heads --tags https://github.com/ozgurfuruncu/SENG-CuckooApp.git` | Initial sandbox network failure; approved network retry succeeded, only main at 8f701754a296dfd5aa9e464383ac4668d0f5e790 |
| `git clone https://github.com/ozgurfuruncu/SENG-CuckooApp.git .sprint1/repository` | Exit 0; isolated checkout, supplied files untouched |
| `git status --short`; `git branch --all`; `git log --all --decorate --oneline -20`; `git tag --list`; `git remote -v` (clone) | Initially clean, main/origin/main only, above two commits, no tags, expected GitHub origin |
| `git log --format=fuller --stat -2`; `git ls-files` (clone) | Existing team commits and 30 tracked files inspected |
| `git switch -c feature/sprint1-repo-bootstrap` (clone) | Exit 0; feature branch based on existing main because develop did not yet exist |
| `git credential-manager github list` | Sandbox store failure; approved retry returned anyx05 |
| REST `GET /user` and `GET /repos/ozgurfuruncu/SENG-CuckooApp` (authenticated) | anyx05; push/triage/pull true, admin/maintain false |
| REST `GET /repos/ozgurfuruncu/SENG-CuckooApp/{branches,tags,pulls?state=all&per_page=100,issues?state=all&per_page=100,actions/workflows,actions/runs?per_page=5,rulesets}` | Main only; no tags/PRs/issues/rulesets; active CI and successful run as above |
| REST `GET /repos/ozgurfuruncu/SENG-CuckooApp/branches/{main,develop}/protection` | HTTP 404 for both at initial inspection; branch list independently showed main unprotected and develop absent |
| GraphQL viewer/repository `projectsV2(first: 20)` | INSUFFICIENT_SCOPES: missing read:project; no board or Project items created |
| Read `SENG_PROJECT_SPRİNT1.docx` using .NET ZipFile and WordprocessingML paragraph/text nodes | Proposal content extracted read-only; scope conflicts and identity placeholders recorded in addendum |
| `docker compose version` | Docker Compose v5.1.4; Docker config access warning |

REST calls used PowerShell Invoke-RestMethod or the task-local `.sprint1/github-actions.cjs`
utility. Git Credential Manager supplied the existing credential in memory; no
credential was printed or stored in project files. The GitHub plugin is not
connected; discovery found it had already been suggested recently, so no duplicate
suggestion or false connection claim was made. Remote work used Git/REST instead.

## Changed files and preservation

All feature changes add 36 paths to the cloned repository; the existing 30 tracked
files, app behavior, MIT attribution, original workflow and historical contract/
backlog are retained. The supplied root starter and original Word file remain intact.

- `api/openapi.yaml`: supplied canonical 3.1 contract; one description quoted after
  actual schema validation caught a comma parsed as an extra property.
- `tools/contract/{package.json,package-lock.json,redocly.yaml,validation.test.cjs}`:
  pinned independent validation tools and seven tests; no application stack selected.
- `.github/workflows/contract-check.yml`: separate read-only-permission CI checks;
  existing backend/coverage workflow preserved.
- `.github/ISSUE_TEMPLATE/{user-story.yml,bug-report.yml}` and
  `.github/PULL_REQUEST_TEMPLATE.md`: story/bug evidence and review templates.
- `AGENTS.md`, `CODEX_HANDOFF_PROMPT.md`, `STACK_REVIEW.md`: supplied guardrails and
  root review entry point. The copied handoff remains historical; this report records
  actual paths/state and the alias clarifies the scaffold gate.
- `docs/decisions/*`, `docs/product-backlog.md`, `docs/templates/*`: supplied records
  retained, path aliases, evaluation and explicit deferred-story/policy notes added.
- `docs/{README,branch-process,compose-plan,contract-reconciliation,issue-index,
  proposal-addendum,sprint-1-checklist,sprint-1-evidence}.md`: review navigation,
  executed evidence and role-specific follow-ups.

Original starter contract SHA-256:
`C6EADE944259E6D43EE9DC90184E0DABD4B45FEDA4B4449CE1C115B602A416DB`.
Original handoff SHA-256:
`D7444FE6269B360BB07AA712798CAF6FBD0C4C922DFC66936053DEA19EC7AF43`.

## Remote actions and issue traceability

`node .sprint1/prepare-issues.cjs` prepared bodies from existing stories. Then
`node .sprint1/github-actions.cjs issues` re-read all open/closed issues with
pagination, found no duplicates and created **16** unassigned issues: supplied
US-01..US-15 as [#1–#15](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues),
plus existing technical T-05 as [#16](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/16).
The [issue index](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/f5f91a1a7377c4d52ab7dc657508a6938116f9c0/docs/issue-index.md) links each issue, API operations and legacy story
correspondence. US-14/15 explicitly remain deferred. No new product story or guessed
GitHub assignee was introduced.

`node .sprint1/github-actions.cjs develop` verified the branch was absent and
created `refs/heads/develop` at existing main
`8f701754a296dfd5aa9e464383ac4668d0f5e790`. Main was not changed. Branch protection
was not attempted with insufficient admin permission. Project creation/import was
not attempted after the scope rejection. No merge, release tag or remote provisioning.

`git commit -m 'docs: reconcile Sprint 1 foundation and validate API contract (refs #16)'`
created foundation commit `60d8a4a4e3d2bb4a142890a528491b47c2a471a5`.
`git diff --cached --check` initially found trailing spaces in two supplied templates;
those were trimmed in the new copies only. Final staged/committed diff checks passed;
`git diff --name-status origin/main...HEAD` showed additions only.

`git push -u origin feature/sprint1-repo-bootstrap` succeeded.
`node .sprint1/github-actions.cjs pr` created the open **draft**
[PR #17 to develop](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/17).
`node .sprint1/github-actions.cjs checks` then confirmed the following completed
checks for the foundation commit, with no human reviews at inspection:

- [PR OpenAPI 3.1 validation: success](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41349474867/job/124976337012).
- [PR existing backend job: success](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41349474892/job/124976337007).
- [Feature-push OpenAPI 3.1 validation: success](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41349461700/job/124976295470).

The existing backend workflow executes pytest with coverage and a 50% threshold;
its successful CI execution is remote evidence, not a locally executed backend test.
This evidence-only follow-up commit records those results; any later head's check
state must be read from the PR. The draft is available for peer review; it is not
approved or merged, regardless of GitHub reporting it mechanically mergeable.

## Validation results

In `tools/contract`:

| Command | Executed result |
| --- | --- |
| `npm.cmd install --ignore-scripts --no-audit --no-fund` | Exit 0; pinned Redocly 2.72.1 + yaml 2.8.1, lockfile created |
| `npm.cmd run lint` (first attempt) | Exit 1; `struct` rejected unexpected `not charged by platform` schema property |
| `npm.cmd run lint` (after quoting original description) | Exit 0; canonical OpenAPI 3.1 schema/references validate |
| `npm.cmd run lint:legacy` | Exit 0; original OpenAPI 3.0 document validates unchanged |
| `npm.cmd test` | Initially 6/7 passed with canonical validation failing; after fix 7/7 pass |
| `npm.cmd ci --ignore-scripts --no-audit --no-fund` | Exit 0; lockfile reinstall succeeded |
| `npm.cmd run lint`; `npm.cmd run lint:legacy`; `npm.cmd test` after reinstall | Exit 0 for each; seven tests pass |
| `docker compose config --quiet` (supplied root and clone) | Exit 0 both; config-file access warnings, no runtime boot |
| `git diff --exit-code origin/main -- README.md LICENSE backend frontend docs/openapi.yaml docs/backlog.md docker-compose.yml .env.example .gitignore .github/workflows/ci.yml` | Exit 0; original tracked paths unchanged |
| `node .sprint1/check-preservation.cjs` (workspace root) | Final exit 0; all 30 original Git blobs preserved; 26 new local Markdown links resolve. An earlier inline Node invocation failed quoting; the file-based check initially hit sandbox ownership checking, then succeeded with per-process trust for this exact clone only, without global Git changes |

Negative checks reject invalid schema types, unresolved references, boolean
exclusiveMinimum under 3.1, duplicate operation IDs and duplicate YAML keys. A
separate test parses all repository YAML with YAML 1.2/unique keys, including issue
forms, Compose and Actions files. This avoids YAML 1.1 treating Actions `on` as a boolean.
No app behavior or authorization/state changes were implemented; these are validator
regressions, not claims of feature acceptance. Runtime contract parity is unresolved.
Python/backend tests were not executed locally because Python is absent. No builds,
Compose runtime, DB connection, persistence, coverage or performance checks were run
locally. Existing CI results are distinguished above from local execution.

## Waiting decisions, permissions and readiness

- **Architect / named human approver:** ADR-001 remains PROPOSED. The team self-reports
  SWE majors/intermediate overall; framework proficiency is unassessed. Complete the
  [evaluation criteria](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/f5f91a1a7377c4d52ab7dc657508a6938116f9c0/docs/decisions/stack-evaluation.md), record named acceptance and
  choices of frontend/backend, ORM, migrations and application test runners.
- **PO + architect + QA:** resolve [contract gaps](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/f5f91a1a7377c4d52ab7dc657508a6938116f9c0/docs/contract-reconciliation.md), including
  private file access, photo permission/limits, revision preconditions and US-11 repeat
  cancellation, before feature implementation. Update the Word proposal separately.
- **Repository administrator:** protect main/develop, verify CI contexts and collaborators;
  authenticate with Projects permissions for the intended team-owned board. Current
  account has push but no admin/maintain, and token lacks even read:project.
- **Scrum / role owners:** confirm actual people/handles, board ownership, issue owners
  and independent reviewer. The copied templates' names came from supplied documents;
  no account mapping or new assignments were inferred.
- **Implementers:** preserve reusable work; only after approval create the separate
  bounded bootstrap issue (selected skeleton, health, DB, tests, Compose smoke test).

Prepared changes can receive human peer review. Sprint 1 assessment/release tagging
is **not ready**: review, effective branch rules, board/ownership, updated submission
and recorded decisions are incomplete. No sprint-1 tag is created.
