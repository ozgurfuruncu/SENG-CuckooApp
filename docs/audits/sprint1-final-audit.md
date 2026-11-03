# Sprint 1 final submission audit — 3 November 2026

**Overall: PARTIAL.** Foundation artifacts and executable checks pass. The final
evidence correction still requires genuine teammate approval, its own CI and
protected integration. The assessed `sprint-1` tag is absent and ineligible until
those gates and blocking findings are resolved. Problem evidence is qualitative:
the author confirmed informal observations in this audit conversation. Raw logs
and measured frequency/consequences are unavailable, and planned validation is
not represented as completed research. The PDF does not mandate interviews or
quantification where no measured baseline is available.
No instructor acceptance is claimed.

## Source, scope and reproducibility

Read all 17 pages of `SENG_321_Revised_Assignment_Sprint_1_Project_Foundation.pdf`
from the supplied `Desktop/SENG/SENG-321` course folder; rendered and inspected
pp.14–17. SHA-256 verified:
`E666BF0A09B8DE8648DFFF7722A1E3C6DDEDBAB91662C87D93C3149CCA2AD36F`.
Read the accompanying examples Markdown, repository requirements/manual closeout,
submission, backlog/owners, ADRs, workflow/templates, canonical API, active
application/deployment/test code and actual GitHub records. No required course
source was missing. Example-system facts, examples’ technology/license choices,
optional release/hotfix branches and a GitHub Release/Project are not imposed on
Cuckoo. The PDF does not prescribe Word/PDF submission format.

Initial checkout: local main `8f70175`, with unrelated frontend edits/untracked
files; preserved. After authorized fetch, remote main and the existing final
evidence branch both pointed to
`72a522d7e90cfb574e7841880b06e54c81db3903`. There were no committed final-evidence
changes beyond main. Used isolated `.audit/sprint-1` worktree on
`docs/sprint-1-final-evidence`; never modified protected main. This correction
changes documentation only. Existing source, contract, diagrams, lockfiles,
license, DOCX files and archives are preserved.

The current [Evidence Index](../submissions/README.md) is the entry point;
[sanitized API evidence](sprint1-final-evidence.json) records precise observations.
Relative artifact links below resolve to the audited revision when opened on
GitHub. The eventual assessed tag must point to the reviewed merge, not merely
the baseline inspected here.

## Course compliance matrix

PASS means the indicated artifact was inspected/validated, including corrections
on this branch; it does not mean the new diff is already reviewed or merged.
PARTIAL identifies incomplete evidence or historical noncompliance. BLOCKED
identifies a final gate needing a real reviewer or its prerequisites.

| ID / source | Required deliverable | Actual implementation/documentation | Evidence location / URL | Verification result | Status | Corrective action |
| --- | --- | --- | --- | --- | --- | --- |
| C01 pp.2/4–5 | Problem, current process, affected people, consequences and evidence | Remote requester/local task-taker problem, alternatives and consequences stated; author confirmed informal observations on 3 November; no raw logs or measured frequency supplied | [Submission §1](../submissions/Cuckoo_Sprint1_Submission.md) | Qualitative source attributed; independent corroboration and measured baseline unavailable, not invented | PASS | Retain evidence limits and follow proposed validation; formal interview study is not imposed as an extra gate |
| C02 pp.2/4/6 | Stakeholders and intended value | Employer, task taker, permission giver, team/assessors and their concerns; no external financial/identity provider integration | [Submission §§1–2](../submissions/Cuckoo_Sprint1_Submission.md) | Compared stakeholder roles with journey/boundary | PASS | Keep hypotheses distinct from validated demand |
| C03 pp.3–5 | Outcome and recognizable success | Journey plus observable acceptance approaches for single assignment, private evidence, lifecycle, persistence and startup | [Submission §3](../submissions/Cuckoo_Sprint1_Submission.md) | Success approaches are testable; no unsupported demand metric | PASS | Follow proposed user-value validation |
| C04 pp.2/4 | Feasibility: data, integration, skills, schedule, operational/legal/ethical limits | Stack/roles, user-entered data, no external provider dependency; Sprint 1 foundation distinguished from later product backlog; permission/privacy constraints | [Submission §7](../submissions/Cuckoo_Sprint1_Submission.md), [ADR-001](../decisions/ADR-001-architecture.md) | Expanded missing feasibility detail; no invented skill scores/schedule promises | PASS | Follow later story readiness gates |
| C05 pp.2/4/7/17 | First-release scope, exclusions, assumptions, risks and constraints | One permitted photographic category; no real funds, verification, custody, inspection or legal agency; ratings/suggestions deferred | [Submission §§4–7](../submissions/Cuckoo_Sprint1_Submission.md), [ADR-002](../decisions/ADR-002-mvp-boundary.md) | Compared prose, 17 API operations and all 15 stories | PASS | Preserve boundary in later stories |
| C06 p.4 | Validation actions for assumptions/risks | Concrete proposed interviews, journey walkthrough, contract review and evidence/privacy checks with responsible roles | [Submission §7](../submissions/Cuckoo_Sprint1_Submission.md) | Restored actions omitted by previous draft; explicitly not completed research | PASS | Perform/record planned validation in subsequent refinement |
| C07 pp.2/4/9 | Chosen open-source license in repository, justified | Full MIT, original attribution; commercial/derivative/notice/patent considerations explained | [LICENSE](../../LICENSE), [submission §8](../submissions/Cuckoo_Sprint1_Submission.md) | License file and rationale inspected; no replacement or relicense | PASS | Retain third-party notices; no comprehensive legal opinion claimed |
| C08 pp.2/7 | Vision, purpose, users and software responsibility | Explicit vision; software responsibility and real-world exclusions separated | [Submission §§3/6](../submissions/Cuckoo_Sprint1_Submission.md) | Consistent with code’s health-only status and planned MVP | PASS | None |
| C09 pp.8/17 | Correct labelled context interactions | Employer/task taker with directional information exchanges; physical visit/permission excluded | [SVG](../diagrams/system-context.svg), [PNG](../diagrams/system-context.png) | XML parsed; PNG and browser SVG visually inspected for labels/directions/bounds | PASS | No diagram edit required |
| C10 pp.2/10–12/17 | Valid API-first YAML draft with metadata, servers, resources, operations, schemas/security | OpenAPI 3.1 / 0.2.1-draft, 17 operations, reusable components and BearerAuth | [Canonical contract](../../api/openapi.yaml), [validator](../../tools/contract/validation.test.cjs) | Actual lint and 7 positive/negative tests passed; references/unique IDs/YAML checked | PASS | No business implementation added |
| C11 pp.11–12/17 | Representative requests, success, input-error and conflict behavior | Creation 201/400/401/403; assignment and lifecycle 409; full companion JSON examples | [API examples](../api-examples.md), [US-03 spec](../specs/US-03-create-task.md) | Examples schema-checked; creation is not assigned an invented 409/422 | PASS | Keep example defaults/codes distinct from stronger guarantees |
| C12 pp.10/17 | Contract usable for review/mocks; consistency before code | Health runtime matches canonical slice; business operations intentionally future; known file/privacy/default questions explicit | [Backend tests](../../backend/tests/test_api.py), [reconciliation](../contract-reconciliation.md) | Exact health schema parity and negative-route tests pass; example supports mock creation | PASS | Resolve documented later-story ambiguities before implementation |
| C13 pp.2/13/17 | Named product/process/architecture/QA/DevOps/implementation owners and RACI | Six named roles/accounts; seven activity rows, one A each | [RACI](../team-raci.md), [accounts](../team-accounts.json), [submission §10](../submissions/Cuckoo_Sprint1_Submission.md) | Parsed role/account mapping; one A and R per row checked | PASS | Ownership does not prove contribution; retain actual commits/reviews |
| C14 pp.2/14–15 | Organized repository, individual accounts, main/develop and branch conventions | Single canonical app/contract/deployment, separate develop, documented short issue branches | [Repository](https://github.com/ozgurfuruncu/SENG-CuckooApp), [branch process](../branch-process.md) | Fetched refs; main 72a522d7, develop f77f905; contributors/review actors distinguished | PASS | Preserve original checkout’s unrelated work |
| C15 p.15 | Issue purpose, owner, acceptance evidence before changes | Existing #20 tracks closeout; story issues #1–15 linked to planning owners and acceptance criteria | [#20](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/20), [backlog](../product-backlog.md), [issue index](../issue-index.md) | Live issues and assignments compared with documented mapping | PASS | Reuse #20; administrative story closures are not feature acceptance |
| C16 pp.14–15 | Issue-linked feature branches, PR summaries/test evidence, traceability | #23/#32/#33 histories and this issue-linked evidence branch; no direct protected-branch write | [#23](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/23), [#32](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/32), [#33](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/33) | Actual PR/commit/review records inspected, not inferred from prose | PASS | Publish correction through main-targeted PR |
| C17 pp.15/17 | At least one real teammate reviews correctness, clarity, tests and API impact | Emir independently reviewed requested document/topics in #20; owner formally approved Emir-authored #33 | [Emir findings](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/20#issuecomment-6600227590), [#33 approval](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/33#pullrequestreview-5750118359) | Real authors/timestamps/approved head verified; new correction not yet independently reviewed | BLOCKED | Real teammate reviews and approves final correction head, resolves findings |
| C18 pp.15/17 | Review history matches written workflow | #32 merged with zero submitted formal reviews; #23 approval covers its own earlier head only | [#32 reviews API](https://api.github.com/repos/ozgurfuruncu/SENG-CuckooApp/pulls/32/reviews), [#23 approval](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/23#pullrequestreview-5737268346) | Historical gap confirmed; Issue review and #33 cannot retroactively change it | PARTIAL | Preserve gap honestly; reviewed corrective PR establishes current process, not retroactive compliance |
| C19 pp.2/15/17 | Protect main/develop with PR/status checks | Both classic rules require PR, one approval, five checks; admins included; no force push/deletion | [main API](https://api.github.com/repos/ozgurfuruncu/SENG-CuckooApp/branches/main/protection), [develop API](https://api.github.com/repos/ozgurfuruncu/SENG-CuckooApp/branches/develop/protection) | Both branch protected flags true; authenticated rule responses 200 | PASS | Configuration verified; no prohibited push/merge tested. Observe correction’s actual review gate separately |
| C20 p.17 and current team rules | Tested final integration matching documented workflow | Baseline main CI #46 green; five named checks match workflow/rules | [CI #46](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41615024331), [workflow](../../.github/workflows/ci.yml) | Each baseline job and exact SHA verified; baseline success is not correction success | BLOCKED | Verify correction checks, real approval, protected merge and resulting main CI |
| C21 pp.2/16 | Prioritized epic/story backlog with AC, estimates, dependencies, owners | Four epics; US-01..13 MVP, US-14/15 deferred; P0/P1/P2, points, acceptance evidence, dependencies, PO owner | [Backlog](../product-backlog.md), [submission §13](../submissions/Cuckoo_Sprint1_Submission.md), [issues](../issue-index.md) | All 15 issue IDs/owners and 13 MVP rows checked against live issues; no new scope | PASS | Implementation assignment/readiness occurs in later sprint planning |
| C22 p.16 | Definition of Ready; user/capability/value, testable AC and API/dependencies understood | Canonical SDD Ready/Done; explicit US-03 role/value, AC/test mapping and unmet dependency/decisions | [SDD](../templates/SDD_WORKFLOW.md), [US-03](../specs/US-03-create-task.md) | Example says specified, not implementation-approved; planned tests not passed off as executed | PASS | Do not begin blocked business stories until Ready gates resolved |
| C23 p.17 | Scope consistency across proposal, boundary, contract, backlog | One category/roles/journey across all active artifacts; health only in deployed app | [Submission](../submissions/Cuckoo_Sprint1_Submission.md), [API](../../api/openapi.yaml), [backlog](../product-backlog.md), [ADR](../decisions/ADR-002-mvp-boundary.md) | Cross-read artifacts and actual route/migration tests; no conflicting active starter API | PASS | Preserve archival/current distinction |
| C24 pp.14/17 | Assessed sprint tag at reviewed/tested main with actual link | No remote tags; no tag created by audit | [Tags API](https://api.github.com/repos/ozgurfuruncu/SENG-CuckooApp/tags), [tag instructions](../submissions/manual-closeout.md) | Empty tags API; remote sprint-1 and peeled-ref query empty | BLOCKED | Only after correction approval/merge/CI and blocking findings resolved, create annotated sprint-1 at verified final main; verify tag object and peeled SHA |
| C25 pp.15/17 | Team/repository/owners/issues/PR/artifact/tag evidence; clear submission | Markdown has team/course/date/links; contradictory old evidence replaced; prior DOCX retained as superseded | [Submission](../submissions/Cuckoo_Sprint1_Submission.md), [Evidence Index](../submissions/README.md) | Rendering/local and external links checked; no nonexistent tag linked as published | PARTIAL | Publish correction; record actual final PR/review/main CI/tag evidence in #20 |
| C26 pp.15/17 | Accurate closeout tracking | #20 was closed before tag; checklist falsely marked final publication complete | [#20](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/20) | Authorized PATCH reopened issue and unchecked unfinished gates; prior discussion preserved | PASS | Close only after genuine final completion, not merely approval of document preparation |

## Code, architecture, configuration and security inspection

`backend/app/main.py` has one database-aware health slice and no business routes.
Five domain packages match ADR-001. Alembic only establishes migration history;
tests confirm no legacy business tables are silently adopted. Health performs
SELECT 1, returns fixed 200/503 schemas, suppresses connection details, and
disposes app-owned engines. The public health exemption matches OpenAPI security.

Frontend uses React/TypeScript/Vite, strict type checking and one `main.tsx`
entry point. Its honest shell does not claim completed marketplace behavior.
Dockerfiles use the locked dependencies; Compose binds application ports to
loopback, keeps PostgreSQL off published host ports, waits for health and uses a
named volume. Defaults are explicitly local-demo credentials; custom password
must be URL-safe as documented. No secret is added. Containers use development/
course defaults, not a production hardening claim. No business endpoint auth or
upload security is claimed for unimplemented features.

CI uses read-only contents permission, runs PostgreSQL-backed backend tests,
contract lint/negative tests, frontend typecheck/build and isolated Compose
readiness/persistence. `Stack A backend` mirrors `backend` intentionally rather
than running it twice. PR events cover main/develop, including this docs branch;
its push alone does not match the workflow’s feature/release push filter.
No scope-changing code defect was found that justified an application change.

## Tests executed during this audit

Initial restricted-network/package/Docker access attempts failed; authorized
reruns installed dependencies and started Docker Desktop. These failures are
environment/setup attempts, not successful tests. GitHub CLI is unavailable;
authenticated REST calls used Git Credential Manager without printing credentials.
Audit scripts/environment live under untracked `.audit`, not app dependencies.

| Actual command / environment | Result |
| --- | --- |
| `git fetch origin --tags`; branch/status/diff inspection | Baseline main/final-evidence 72a522d7; unrelated checkout changes preserved |
| Isolated venv `pip install --require-hashes -r backend/requirements.lock` | Passed; hash-locked backend dependencies, no lockfile change |
| Windows Python 3.14.7: `python -m pytest --cov=app --cov-report=term-missing --cov-fail-under=50 --basetemp=<audit temp>` from backend | **13 passed, 1 skipped**, 97.67%; PostgreSQL URL absent on first native run |
| Built Python 3.12.16 image, isolated PostgreSQL and read-only repo mount: `python -m pytest -p no:cacheprovider --cov=app --cov-report=term-missing --cov-fail-under=50`, `BOOTSTRAP_TEST_DATABASE_URL` supplied | **14 passed, zero skipped, 100% coverage**, including PostgreSQL connectivity, migrations and health; test-only Compose project stopped |
| Frontend Node 24.19.0/npm 11.17.0: `npm.cmd ci --no-audit --no-fund --fetch-retries=0`; `npm.cmd run build` | Passed TypeScript and Vite production build |
| tools/contract: same `npm.cmd ci`; `npm.cmd run lint`; `npm.cmd test` | Valid OpenAPI; **7/7 passed**, including invalid schema/ref/type/duplicate-key/duplicate-ID rejection |
| `docker compose config --quiet` | Passed, including authorized rerun with normal Docker configuration access |
| `BOOTSTRAP_COMPOSE_PROJECT=cuckoo-sprint1-final-audit`, ports 18041/15041: `python scripts/compose_smoke.py` | **Passed**: built images, PostgreSQL connection, migration rerun, API/client readiness, container recreation and persisted marker; stopped test containers/network, retained only audit volume |
| PDF extraction/hash and rendered pp.14–17 | All 17 pages read; recorded SHA matches original |
| `python .audit/validate_docs.py` with audit venv | Before publication links: **34 active Markdown files**, **217 local link occurrences**, **42 tables**, zero broken local paths/anchors; four JSON examples validate; all 15 story owners and seven RACI rows verified; original DOCX hash and ZIP/XML integrity pass |
| `python .audit/check_external.py` with authenticated read access | **75/75 external URLs verified**, including GitHub blob paths, commits, issue-comment/review IDs and CI job records. GitHub pages were checked through their API records; no browser authentication-page claim is substituted. Archived document contents are not presented as current submission links |
| `python .audit/render_docs.py` using headless Edge | Submission’s **13 tables**, index table and PNG render; no page overflow at 1600px; SVG also renders. Screenshots visually inspected. Initial direct-SVG screenshot timed out; HTML image wrapper rerun passed. This is local Markdown rendering, not a claim of opening GitHub’s authenticated UI |
| `git ls-remote --tags origin refs/tags/sprint-1 'refs/tags/sprint-1^{}'` with authorized network access | Passed with empty output: tag and peeled ref absent |
| `git diff --check` | Passed for corrected files before publication |

Both backend runs report one upstream Starlette/httpx TestClient deprecation
warning. No dependency change is justified by this documentation audit. No
business-feature/component suite was executed or represented as existing. The
Linux/PostgreSQL run resolves the initial native database-test skip.

## Verified CI and peer review

Main SHA **72a522d7e90cfb574e7841880b06e54c81db3903**, push run
[41615024331 / CI #46](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41615024331):

| Required check | Actual result | Job evidence |
| --- | --- | --- |
| backend | success | [job 125846208451](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41615024331/job/125846208451) |
| Stack A backend | success | [job 125846409914](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41615024331/job/125846409914) |
| OpenAPI 3.1 validation | success | [job 125846208525](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41615024331/job/125846208525) |
| Stack A frontend | success | [job 125846208242](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41615024331/job/125846208242) |
| Stack A Compose smoke | success | [job 125846208408](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41615024331/job/125846208408) |

PR #33’s head **5bc869348f8d723c6c32fc39f61d74fb9900864b** passed
[PR run 41614298696](https://github.com/ozgurfuruncu/SENG-CuckooApp/actions/runs/41614298696).
Author **lilemiv**; actual approver **ozgurfuruncu**, review
[5750118359](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/33#pullrequestreview-5750118359),
09:54:21 UTC before merge at 09:55:59 UTC. Emir’s independent document review is
[Issue comment 6600227590](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/20#issuecomment-6600227590),
09:40:18 UTC. These are separate real records. PR #32 has no submitted review;
its merge at e323091 remains a historical exception. PR #23’s anyx05 approval
is genuine but scoped to its earlier f5f91a1 head.

Before this correction, the all-PR query returned no open PRs; #29 was closed
unmerged without delivered changes and is not an active Sprint 1 blocker. This
new correction is a new review candidate, not already approved by any record above.

## Protection, tag and final human gates

Both classic rule responses require one approval and the five exact check names,
with `enforce_admins=true`, `allow_force_pushes=false`, `allow_deletions=false`.
`strict=false`, `dismiss_stale_reviews=false`, `require_last_push_approval=false`;
the team must verify approval still covers the final diff. No ruleset object is
needed in addition to the existing classic rules. Verified configuration and
successful #33 integration do not prove every prohibited operation would be
rejected. No bypass, forbidden direct push or unreviewed merge probe was attempted.

Tags API and remote tag refs are empty. No tag object/peeled SHA or published
tag URL exists to report. Current main is inspected and tested, but this new
correction has not yet been integrated. Issue #20 was reopened rather than
creating a duplicate. Its prior checklist and historical review remain readable.

Necessary human action: a real teammate reviews/approves this correction’s final
head and resolves material feedback. Then an authorized writer can
verify CI, merge through protection, verify main CI and SHA, publish/verify the
annotated sprint-1 tag and record completion in #20 before closing it. Exact
commands are in [manual closeout](../submissions/manual-closeout.md). No new
admin grant, release page, Project board, extra branch or deployment is required.

The [published baseline submission](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/72a522d7e90cfb574e7841880b06e54c81db3903/docs/submissions/Cuckoo_Sprint1_Submission.md)
is accessible; the corrected submission is in this branch/PR until reviewed
integration. Do not describe a branch URL as the final assessed tag.

## Published correction

[PR #34](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/34) targets main from
`docs/sprint-1-final-evidence`, authored by `ozgurfuruncu`. Initial audit commit:
`07b27ce` (refs #20); this publication-record follow-up adds the actual PR links.
Its [current checks](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/34/checks)
and submitted review records must be evaluated at the final head. No approval
was created by the agent. Final observed head/CI/review status is recorded in
the PR description, #20 and task report after CI completes; a previous green
run is never reused for a changed head. This avoids chasing a self-referential
CI-result commit. All pre-merge checks and final main/tag gates remain explicit.
