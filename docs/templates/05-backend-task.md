# Backend task implementation brief — [US-XX]
Owner: [ ] · Technical reviewer: Emmanuel Alabi · Feature spec: [link] · OpenAPI operation: [ ]

**Objective:** [one atomic backend change]
**Module/domain invariant:** [e.g., task must have at most one assigned worker]
**Inputs and response contracts:** [schemas/status codes]
**Auth/ownership checks:** [ ]
**Data/migration changes:** [ ]
**Concurrency/transaction behavior:** [ ]
**Evidence storage or cleanup requirements:** [ ]

## Agent implementation limits
Allowed files: [ ] · Forbidden changes: API spec without review; real payments; new scope.
Must add tests for happy, forbidden, invalid, repeated and conflict cases.

## Done when
- [ ] Implemented exactly per agreed contract and feature spec.
- [ ] Tests and lint actually run, with commands/results recorded.
- [ ] No secrets, insecure file exposure or uncontrolled downloads.
- [ ] PR references story/ADR and includes trade-offs.

## Stack A implementation detail

FastAPI route/dependency and module: [ ] · Pydantic request/response models: [ ]
Exact JSON casing, constraints, problem media type/status codes: [ ]
SQLAlchemy entities, FK/check/unique constraints and transaction boundary: [ ]
Alembic revision, upgrade/repeatability and safe rollback/data retention: [ ]
pytest unit/API/isolated PostgreSQL fixtures: [ ]
Negative tests assert response and unchanged DB; race tests assert final row counts/state.
Stop and reconcile contract mismatches (including FastAPI validation defaults).
Use [canonical Ready/Done gates](SDD_WORKFLOW.md); local SQLite is not PostgreSQL evidence.
