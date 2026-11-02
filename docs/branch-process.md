# Branch and review process

Work from a small, issue-linked feature branch, integrate through develop and use
main for the team's submission baseline. The team-approved plan determines when
integration to main is needed; main and develop need not be identical throughout
development. Use PRs to keep changes explainable and traceable. Preserve shared
history and existing contributor work.

On **2026-11-03**, the user approved a proportionate process: team members follow
team-approved plans. GitHub branch protection and formal approval counts are
optional unless explicit course instructions or the current team plan require
them. Record the requirement source before adding them as completion blockers.
No separate instructor rubric is available in the repository. Existing enforced
GitHub rules must always be followed. No admin grant or ownership transfer is
requested for anyx05; existing write access supports ordinary branch/PR work.

A responsible human must understand the change. Record actual review/approval
sources, including existing conversation approval; do not describe them as GitHub
review objects. Obtain separate/formal approval when the applicable instructions
require it. See [the canonical SDD workflow](templates/SDD_WORKFLOW.md).

Every behavior change requires tests; authorization/state changes require negative
cases. Reconcile api/openapi.yaml and issue acceptance before business work.
Document assumptions and trade-offs. Only the health slice is implemented.

The existing CI checks are backend, Stack A backend, OpenAPI 3.1 validation,
Stack A frontend and Stack A Compose smoke. Use the actual results relevant to
the change; do not rerun unrelated workloads solely to create more evidence.

The [2026-11-02 audit](audits/sprint1-remote-verification.md) preserves observed
GitHub facts. Its former mandatory control/release gates are superseded by the
2026-11-03 decision. Historical setup payloads and access requests in docs/archive
are dated records, not active requirements.
