# DevOps / CI / deployment change — [infra issue]
Owner: Emir Dizman · Reviewer: [ ]

**Purpose:** [ ] · Systems affected: [GitHub Actions/Docker/Compose/secrets/DB]
Local environment prerequisites: [ ]
Proposed change: [ ]
Security/secrets impact: [never commit credentials]
Migration/rollback: [ ]

## Checks and proof
- [ ] `docker compose config` succeeds.
- [ ] One-command startup, readiness/health verified (when scaffolding exists).
- [ ] CI job names and required status checks documented.
- [ ] Existing branch rules are respected; add/change enforcement only when an explicit requirement or team plan calls for it, recording that source.
- [ ] PR/test runs are traceable; add tag/release evidence only when explicitly required. No claims without verification.

Known limitations / needed repository-admin action: [ ]

Environment variable names/defaults/secrets source and .env.example impact: [ ]
Build/runtime versions, database readiness and migration order: [ ]
CI trigger/least-privilege permissions, exact job names and reviewed head SHA: [ ]
Deployment target, health check, rollback and persistence proof: [ ]
Current checks: `backend`, `Stack A backend`, `OpenAPI 3.1 validation`,
`Stack A frontend`, `Stack A Compose smoke`; verify actual GitHub job names before
changing required checks. Record protection/rules API responses separately from
documented intent. Publish only the reviewed commit; never move an existing tag.
Use [canonical gates](SDD_WORKFLOW.md) and update [traceability](10-requirements-traceability.md).
