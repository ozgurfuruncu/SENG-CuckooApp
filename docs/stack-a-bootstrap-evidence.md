# Approved Stack A bootstrap evidence

Date: 2026-11-02 (Europe/Istanbul). Existing technical story:
[T-06 / issue #18](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/18).
Active checkout: `C:\Users\User\Downloads\Cuckoo\.sprint1\repository`.
The supplied root starter, including its separate `api/openapi.yaml`, is unchanged.

## Authorization and source

The user explicitly approved ADR-001 with Stack A and authorized next steps. The
new [submission](submissions/Cuckoo_Sprint1_Submission.docx) confirms React,
TypeScript, Vite, FastAPI/Pydantic, PostgreSQL/SQLAlchemy/Alembic, Docker Compose,
GitHub Actions and pytest, as well as the six named [roles/RACI](team-raci.md).
ADR-001 records acceptance on 2026-11-02, technical owner Emmanuel Alabi, rationale
and approval provenance. This does not fabricate peer signatures or proficiency
measurements. Framework comparison is closed; business contracts still need their
own reviewed acceptance criteria.

Submission SHA-256:
`04C3B14CFA8DA58B6A0C06BF98A01B5EADE8EF82BB6BDBC3A3ED2B931F012E86`.
The original Word file is preserved, and a byte-identical repository copy is added.
The [system context PNG](diagrams/system-context.png) is the original embedded
`word/media/image2.png`, extracted and visually inspected without modification.
[The evidence ledger](submissions/README.md) keeps unverifiable release/admin/review
rows pending rather than filling them with invented proof.

## Branch, contract and preservation

`git fetch origin --prune` confirmed develop still at `8f70175` and PR #17 still
open/draft with green checks and no reviews. `git switch -c feature/stack-a-bootstrap`
created a separate branch at foundation commit `5478308`. The new issue was checked
against all open/closed issues before creation. Because #17 is not merged, this
bootstrap PR is stacked on `feature/sprint1-repo-bootstrap` for a bounded review;
after #17's reviewed integration, retarget/rebase through the ordinary develop
workflow. No merge, force push, main/develop code push or release tag is authorized.

Canonical OpenAPI is 3.1.0 / API version 0.2.1-draft. The new public `/health`
operation is relative to the existing `/api/v1` server base. A successful database
query returns 200 with fixed status/database fields; database failure returns 503
without credentials or exception details. Tests compare the complete generated
health operation and normalized schemas with the canonical slice and validate
both response bodies.

The new entry point `app.bootstrap:app` implements only this slice. Legacy
`app.main`, auth/jobs routers, models, tests and JSX sources remain preserved; none
of their conflicting business routes are mounted in the bootstrap. Five domain
packages reserve the agreed monolith boundaries. Initial Alembic revision creates
only migration history; it does not adopt, drop or rewrite legacy business tables.
The old Compose file and Dockerfiles remain untouched. New bootstrap Dockerfiles
and Compose use a separate database volume/project. Existing frontend package/index
configuration is updated to select the new TypeScript shell, with old JSX retained.

US-01..13 issue descriptions are synchronized with stack acceptance without
loosening business review gates. The updated submission's “no duplicate terminal
actions” resolves the earlier US-11 terminal-idempotence wording in the backlog and
issue #11; the canonical 409 terminal-state policy is unchanged. US-14/15 remain
deferred. File-download metadata, photo permission/limits and revision rules remain
open for later feature work.

## Changed file groups

- `api/openapi.yaml`: health operation/schemas and draft version increment.
- `backend/app/bootstrap.py`, `backend/app/foundation/*`, five domain packages:
  typed health-only application, bounded PostgreSQL query settings and module skeleton.
- `backend/alembic.ini`, `backend/migrations/*`: repeatable empty foundation migration.
- `backend/requirements.txt`, `backend/requirements.lock`: selected Alembic and
  schema-test dependencies; hash-locked, cross-platform Python dependency resolution.
- `backend/tests/test_bootstrap.py`: healthy/failing DB, non-leaking response,
  route exclusion, schema parity, migration repeatability and PostgreSQL integration.
- `frontend/src/main.tsx`, `vite-env.d.ts`, `tsconfig.json`, package/index/lock files:
  selected TypeScript shell and reproducible type-check/build. React 18 retained;
  Vite 8.3.5/plugin 6.1.2 and TypeScript 5.9.3 are pinned in the lockfile.
- Bootstrap Dockerfiles, `.dockerignore` files, `compose.bootstrap.yml` and
  `scripts/compose_smoke.py`: isolated startup, readiness, migration and persistence proof.
- `.github/workflows/bootstrap-check.yml`: PostgreSQL pytest/coverage, frontend
  build, Compose smoke; contract workflow also covers the dependent PR base.
  Original backend CI is retained.
- ADR/review/handoff/agent/process documentation, `README.bootstrap.md`, this
  report, submission/diagram/RACI and evidence ledger: current selection and exact
  remaining human actions. Historical foundation evidence stays dated 2026-11-01.
- `.gitignore`: ignores virtualenv, coverage XML and local environment variants.
  Contract YAML traversal excludes local dependency/build directories.

## Exact executed checks

Commands use the active checkout unless another working directory is stated.

| Command | Observed result |
| --- | --- |
| `git fetch origin --prune`; `node ..\github-actions.cjs checks` | Remote develop discovered; PR #17 still open/draft, three completed successful foundation checks |
| `git switch -c feature/stack-a-bootstrap` | Exit 0; separate feature branch |
| `node .sprint1/github-actions.cjs bootstrap-issue` (workspace root) | Authenticated anyx05, push true/admin-maintain false; created #18 after duplicate check |
| `uv python install 3.12` with workspace UV cache/install directories | Python 3.12.13 installed locally; existing unmanaged global shim was not replaced (uv warning) |
| `uv venv --python 3.12 .venv` | Exit 0; workspace virtualenv |
| `uv pip compile --universal --generate-hashes --python-version 3.12 backend/requirements.txt -o backend/requirements.lock --quiet` | Exit 0; reproducible cross-platform lockfile |
| `uv pip sync backend/requirements.lock --python .venv/Scripts/python.exe` | Exit 0; 46 Windows-compatible packages installed |
| `docker desktop status`; `docker desktop start --detach`; `docker --context desktop-linux info --format '{{.ServerVersion}}'` | Initially stopped, started successfully, Linux engine 29.5.3 available |
| `npm.cmd install --save-dev --save-exact vite@8.3.5 @vitejs/plugin-react@6.1.2 typescript@5.9.3 @types/react@18 @types/react-dom@18 --no-audit --no-fund` (frontend) | Exit 0; lockfile created |
| `..\.venv\Scripts\python.exe -m pytest --cov=app --cov-report=term-missing --cov-fail-under=50` (backend, first attempt) | 14 passed, 1 skipped, 1 temporary-directory permission error; not an all-pass result. An earlier invocation used the wrong relative executable path and ran no tests |
| `..\.venv\Scripts\python.exe -m pytest --basetemp='C:\Users\User\Downloads\Cuckoo\.sprint1\pytest-bootstrap-run2' --cov=app --cov-report=term-missing --cov-fail-under=50` (backend) | Exit 0; **15 passed, 1 skipped**, coverage **95.96%**. PostgreSQL-specific pytest skipped because no host integration URL was supplied; actual PostgreSQL is exercised by the local Compose check below |
| `npm.cmd --prefix ../frontend run build` (backend) | Exit 0; TypeScript check and production Vite build passed |
| `npm.cmd run lint`; `npm.cmd run lint:legacy`; `npm.cmd test` (tools/contract) | Both canonical 3.1 and unchanged historical 3.0 validate; all seven validator tests pass |
| `docker compose -p cuckoo-bootstrap-smoke -f compose.bootstrap.yml config --quiet` with DOCKER_CONTEXT=desktop-linux | Exit 0 |
| `.\.venv\Scripts\python.exe scripts/compose_smoke.py` with DOCKER_CONTEXT=desktop-linux | Exit 0; both Linux images built, PostgreSQL query/migration history checked, health and built frontend returned successfully, migration rerun succeeded, DB marker survived complete container recreation; containers/network stopped, named volume retained |
| `node .sprint1/github-actions.cjs bootstrap-gates` (workspace root) | Updated existing US-01..13 issue bodies with approval provenance; US-11 wording follows new submission, US-14/15 left deferred |
| `node .sprint1/audit-bootstrap.cjs` (workspace root) | Exit 0; 26 original files unchanged, four reviewed package/index/ignore changes; 52 local documentation links resolve; repository DOCX copy matches source SHA-256 |

The successful smoke output was:

```text
PASS: PostgreSQL connection, migration rerun, API readiness, built frontend and volume persistence
```

No evidence-upload persistence or business authorization/state-transition behavior
is claimed. Runtime readiness uses real PostgreSQL; the unit-test failure response
uses an injected OperationalError. The old six tests still execute against their
SQLite fixture. Upstream Starlette/httpx and Alembic configuration deprecation
warnings were visible; they did not fail the checks and are not suppressed.

New CI adds a real PostgreSQL test URL so its pytest run should execute the local
skip. Its actual result, PR URL and published commit are recorded after publication,
not inferred from the workflow YAML. No coverage number is attributed to CI until
its output has been inspected.

## Remaining human actions

- **Emmanuel / technical lead:** review the accepted ADR provenance and bootstrap;
  coordinate review/integration of #17 before retargeting the dependent PR to develop.
- **Jumanah / QA:** review the health failure/schema tests, PostgreSQL/Compose
  evidence and later business acceptance/negative-test requirements.
- **Özgür / frontend integration:** review the TypeScript build and legacy source
  preservation; feature UI follows later reviewed contracts.
- **Elif / PO:** resolve remaining evidence/permission/revision decisions and insert
  verified repository evidence into the final Word submission.
- **Emir / DevOps and repository administrator:** verify collaborator access and
  protect main/develop with actual passing contexts and >=1 peer approval. The
  authenticated account still lacks admin/maintain; prior Projects scope limitations
  are not assumed resolved.
- **Aslı / Scrum:** confirm GitHub identities and story assignees, board import and
  independent review evidence. Supplied named roles are now recorded; handles remain
  unassigned where not verified.

The stack-selection gate is satisfied. This bounded bootstrap is available for
review after validation; it does not authorize all MVP implementation or make
Sprint 1 release/tagging ready. Reviewed integration, branch rules, confirmed board/
owners and final submission evidence remain pending. No merge or sprint-1 tag.
