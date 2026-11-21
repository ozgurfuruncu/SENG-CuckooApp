# Sprint 2 Lovable frontend integration

20 November 2026 · SENG 321 · Team 5 · **Review candidate**

The web demo in `frontend/` uses the Cuckoo team's [Lovable source](https://github.com/anyx05/cuckoo-photo-tasks/tree/51ba75fd7a6d3b82ba2f5aab645a1ee02cf8bc61)
at `51ba75fd7a6d3b82ba2f5aab645a1ee02cf8bc61`. The port carries over the
Cuckoo screen components, design tokens, mascot and synthetic vehicle photo
fixtures. The source plan identifies the mascot and photos as generated demo
assets. [Prior prototype and dated verification](submissions/sprint-2-ozgur.md)

On 21 November the evidence updates from Lovable `c2b87cd` were brought into
the project frontend. The standalone Lovable repository is available for
future design iteration. The [current submission captures](sprint-2-evidence/lovable-final)
are the 16 desktop and mobile screenshots supplied for the final Figma handoff.
[Lovable evidence update](https://github.com/anyx05/cuckoo-photo-tasks/commit/c2b87cd40065ac0443da574db02944b284110627)

## Structure and language

The existing React 18, TypeScript and Vite entry point serves the port.
TanStack Router handles navigation in the browser, Tailwind compiles locally
and npm locks dependencies. This build uses system fonts and local images.
The independent FastAPI, PostgreSQL and Compose architecture follows
[ADR-001](decisions/ADR-001-architecture.md). HTML and CSS describe the web
interface, TypeScript handles its behavior, and Python serves the API. Each
language fits its existing role.

The visible interface, forms, status and feedback, sample assignments and
dates use Turkish. Date and currency formatting use `tr-TR`. API operation
IDs and enum values follow [the draft contract](../api/openapi.yaml). A
second language and language selector can be added when English becomes an
accepted product requirement.

The demo role switcher and task actions use one in-memory store. Demo view
models carry synthetic photo references and display fields. The FastAPI
runtime serves health, and subsequent live stories own the HTTP adapter,
authorization, evidence storage and review rules. The [evidence proposals](sprint-2-evidence-decisions.md)
record the pending policy choices for that review.

## Run and verify

Use Node 24 and run these commands from `frontend/`.

```sh
npm ci
npm test
npm run build
npm run dev
```

Open `http://localhost:5173`. Choose the employer and task-taker demo accounts
from the same tab to advance one task. Refreshing or resetting restores the
fixtures. For the browser checks, run `npm exec playwright install chromium`
then `npm run test:browser` after `npm run build`. To use an installed Chrome,
set `CUCKOO_CHROME_PATH` to its executable before running the browser tests.

### Verification on 20 November 2026

| Check | Result |
| --- | --- |
| `npm ci`, `npm test`, `npm run build` in `frontend/` with Node 24.18.0 | Clean lockfile install, 11 mock tests passed, TypeScript and Vite build passed. |
| `npm run test:browser` against the built preview with local Chrome | Six paths passed at both 1280×900 desktop and 390×844 mobile for 12 checks total. They cover the shared task journey, account access, role gates, profile recovery and discovery, cancellation, and evidence validation. The main journey observed zero business API or external requests. [Path checklist](sprint-2-frontend-paths.md) |
| `npm run lint` and `npm test` in `tools/contract` | Draft lint passed and all 7 contract tests passed. |
| `python -m pytest -q --basetemp ../.tools/lovable-backend-pytest` in `backend/` | 13 passed, 1 PostgreSQL integration test skipped without the test database URL. |
| `docker compose config --quiet` and `python scripts/compose_smoke.py` | Compose configuration parsed. The smoke run was blocked by the unavailable local Docker engine. Hosted CI can exercise the runtime deployment after publication. |

### Final evidence update verification on 21 November 2026

- Standalone Lovable `c2b87cd` passed all 36 tests and its build.
- In `frontend/` on Windows with Node 24 and Chrome, `npm test` passed all 12
  mock tests and `npm run build` passed. The required revision reason, active
  hold, media limits and participant access are covered by rejection tests.
- `npm run test:browser` passed all 12 checks at desktop and mobile widths.
  The walkthrough verifies the demo header, blank-reason and oversized-photo
  recovery, private visibility, resubmission, approval and simulated release.
  Photo checks use synthetic metadata. Retention is represented as screen copy.
- See [PR #40](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/40) for the
  exact published head, hosted checks and teammate review.

## Figma handoff

Use the current preview or the supplied Lovable project for editable import.
The runnable frontend demonstrates the same journeys with an account picker
and reset for reviewers. The Figma frames and fresh exports use the product
layout with the entire demo header removed. The bundled desktop and mobile
captures are references from the runnable demo. Özgür owns the editable Figma
file and the two Turkish prototype flows. The team can record the file, flow
URLs and reviewer access in the
[Sprint 2 submission bundle](submissions/sprint-2.md) once verified.
[Desktop evidence review](sprint-2-evidence/lovable/evidence-review-desktop.png) ·
[Mobile evidence review](sprint-2-evidence/lovable/evidence-review-mobile.png) ·
[Figma handoff guide](sprint-2-figma-handoff.md) ·
[21 November Figma handoff evidence](sprint-2-evidence/figma/README.md)
