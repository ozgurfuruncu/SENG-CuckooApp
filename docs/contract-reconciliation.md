# Contract reconciliation and implementation gate

Date: 2026-11-01 (Europe/Istanbul). Scope: documentation and validation only.

## Scoped resolution — 2026-11-02, issue #18

The user approved Stack A; SQLAlchemy, Alembic and pytest are confirmed by the new
submission. Framework selection is resolved in accepted ADR-001. The bounded
bootstrap adds canonical `GET /health` (external `/api/v1/health`) before deploying
that slice: 200 only after a database query; 503 with a fixed non-sensitive body
when the database is unavailable. Runtime generated-schema parity tests cover it.

`app.bootstrap:app` mounts only that slice. Legacy `app.main`, business models,
routers and tests remain preserved and are not the active bootstrap deployment.
No business tables are adopted or altered; initial Alembic revision only records
migration history. All existing business-contract discrepancies below remain open
for their own issues. A partial runtime schema is explicitly a bootstrap, not a
claim that the complete canonical API is implemented.

The new submission also resolves the old US-11 wording to “no duplicate terminal
actions”, consistent with 409 for terminal/repeated cancellation. The backlog and
issue #11 are synchronized; negative tests remain required for later implementation.
Permission/file/review gaps remain.

`api/openapi.yaml` is the supplied OpenAPI **3.1.0** implementation contract. The
repository's original `docs/openapi.yaml` (**3.0.3**) and `docs/backlog.md` remain
unchanged historical artifacts. Their validity does not make their behavior the
current product requirement. Existing application code does not implement the
canonical contract. Per AGENTS.md rule 10, feature implementation stops until the
team reviews these differences and reconciles them in a linked issue/PR.

## Reconciliation register

| Subject | Original repo / submitted proposal | Supplied current contract / handoff | Disposition |
| --- | --- | --- | --- |
| API location/base | `docs/openapi.yaml`, localhost:8000; `/jobs`, `/users/me` | `api/openapi.yaml`, `/api/v1`; `/tasks`, `/me` | Preserve original; canonical 3.1 is the target; no redirects/migration implemented |
| Product category | CAR_INSPECTION, DOG_WALKING, GARDEN_CARE | VEHICLE_PHOTO_CHECK only | Other categories deferred; no inspection, custody/driving or purchase representation |
| Assignment | Worker directly accepts; OPEN → ACCEPTED | Applications then owner selects exactly one; OPEN → ASSIGNED | Requires reviewed transactional design and concurrency negative tests |
| Roles/profile | EMPLOYER/WORKER/ADMIN, full_name/city | EMPLOYER/TASK_TAKER; optional self-declared occupation/skills, operating city required before applying | No identity/credential/physical location verification; schema/route migration requires review |
| Discovery | Public `/jobs`, default OPEN, pagination | Bearer-protected `/tasks`; optional city/category/status | Authentication/default/pagination differences need explicit acceptance criteria |
| Payment | Hold at accept; HELD/RELEASED; escrow naming | Explicit owner hold after assignment; NOT_HELD/HELD_SIMULATED/RELEASED_SIMULATED/VOIDED_SIMULATED | No funds, payment credentials or payment provider; owner approval atomically completes and simulates release |
| Evidence/review | Single file, optional note, approve only | 1–5 photos plus 10–2000 character notes; request revision/resubmit | Permission must exist; no public file paths; no app changes in this branch |
| Errors/fields | Snake case/integer IDs; 422 and `{detail}` | Camel case/string IDs; 400/401/403/404/409 Problem responses | Breaking contract differences; do not silently retrofit code |
| Messaging/ratings/recommender | Original includes messaging/ratings; starter US-14/15 | Deferred by current handoff; absent from canonical API | Preserve stories as deferred, not MVP work |
| Cancel | Original OPEN-only close; starter US-11 says terminal idempotence | OPEN or ASSIGNED only; other states 409; held simulation voided | US-11 idempotence wording conflicts with contract; PO + QA must resolve before implementation; no policy invented |
| Audit history | Absent from implementation | Authorized participant history | Later implementation issue; actor visibility must be reviewed |
| License | Proposal calls MIT proposed; original LICENSE is full MIT | Starter also MIT, with different copyright attribution | Retain original repository LICENSE and attribution; no relicensing or copyright replacement; PO confirms submission wording |
| Stack | Existing code and starter subfolder READMEs imply React/FastAPI | ADR-001 remains PROPOSED, choices unapproved | Prior work preserved; no new scaffolding; evaluate without fabricated skill scores |

## Issues requiring human contract decisions before implementation

- Define protected photo-download operation and metadata linkage. Canonical evidence
  descriptions require authorized file serving but supply no download path/identifier.
- Define allowed photo MIME types, content/size controls, storage limits and how
  worker photo permission is established; `permissionConfirmed` currently comes from
  the employer. Do not invent verification or permission-attestation endpoints.
- Specify revision-request preconditions and whether a note is required; approval
  preconditions are explicit but revision rules need equally precise acceptance.
- Resolve US-11 repeat-cancellation response against terminal-state conflicts.
- Confirm discovery privacy/defaults, role-appropriate task fields and history visibility.
- Reconcile original T-05's `docs/openapi.yaml` path with canonical `api/openapi.yaml`.

These are questions on existing requirements, not additional MVP stories. Product
Owner, architect and QA must record resolutions in the contract and linked acceptance
criteria; neither ADR approval alone nor schema validation resolves them.

## Executed validation and minimal repair

Redocly CLI 2.72.1 `spec` rules initially rejected the supplied 3.1 document at
`NewTask.proposedCompensation`: an unquoted comma inside a flow mapping parsed
`not charged by platform` as an unexpected schema property with null value. YAML
parsing alone accepted it. Quoting the existing description repairs its encoding
without changing intended fields, bounds, scope or behavior. The source starter
outside this checkout is preserved. The legacy 3.0 document validates separately;
it is not relabeled as 3.1 or advertised as matching the runtime.

See [Sprint 1 evidence](sprint-1-evidence.md) for executed checks and limitations.
