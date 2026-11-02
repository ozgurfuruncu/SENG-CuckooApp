# T-05 — OpenAPI foundation reconciliation (Sprint 1)

## Contract artifacts
- Draft contract preserved: `/docs/openapi.yaml` (OpenAPI 3.0.3)
- Canonical contract added: `/api/openapi.yaml` (OpenAPI 3.1.0)
- Canonical flow text encoding repaired by replacing ambiguous arrow glyphs with ASCII `->`.

## Validation evidence
Commands used:
- `npx @redocly/cli lint docs/openapi.yaml`
- `npx @redocly/cli lint api/openapi.yaml`
- `python -c "import yaml; yaml.safe_load(open('docs/openapi.yaml', encoding='utf-8'))"`
- `python -c "import yaml; yaml.safe_load(open('api/openapi.yaml', encoding='utf-8'))"`

Observed outcomes:
- both contracts validate with Redocly (`0 errors`; style warnings remain)
- both contracts parse successfully with `yaml.safe_load`

Negative checks used:
- invalid YAML parse attempt (missing key separator)
- broken `$ref` target in a temporary copy
- expected failures observed (`ScannerError` for YAML parse; `no-unresolved-refs` from Redocly lint)

Backend CI baseline evidence:
- GitHub Actions `CI` run `#11` on this branch is `action_required` with `0` jobs started.
- Last completed backend CI runs on active release branch were successful.
- Local backend test suite still passes after contract/documentation changes (`6 passed`).

## Current implementation differences register
Backend currently implements:
- `GET /health`
- `POST /auth/register`
- `POST /auth/login`
- `GET /users/me`
- `POST /jobs`
- `GET /jobs`
- `GET /jobs/{job_id}`

Contract-only (not yet implemented in backend app routers):
- `PATCH /jobs/{jobId}`
- `POST /jobs/{jobId}/close`
- `POST /jobs/{jobId}/accept`
- `POST,GET /jobs/{jobId}/proof`
- `POST /jobs/{jobId}/approve`
- `GET /jobs/{jobId}/payment`
- `POST,GET /jobs/{jobId}/messages`
- `POST /jobs/{jobId}/ratings`
- `GET /users/{userId}/ratings`

## Review boundaries
- MIT license and application source files are unchanged by this story.
- No scaffold, runtime behavior, or release tagging changes were made.
- T-05 canonical-path wording (`docs/openapi.yaml` vs `api/openapi.yaml`) requires explicit human review before backlog rewording.
- ADR-001 remains PROPOSED pending human approval.

## Ownership mapping (issue #16 context)
- Technical owner: Emmanuel Alabi (@anyx05)
- QA review: Jumanah (@j7766n)
