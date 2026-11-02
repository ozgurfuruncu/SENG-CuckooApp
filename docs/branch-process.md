# Branch and review process

This is the intended process. The [2026-11-02 remote audit](audits/sprint1-remote-verification.md)
finds main/develop unprotected; enforcement is an owner action tracked in #20.
Use [canonical SDD gates](templates/SDD_WORKFLOW.md) for new work. Existing genuine
#23 approval is distinct from later cleanup PRs with no submitted review objects.

Use short-lived `feature/<issue>-description` branches and link commits/PRs to the
issue. Integrate through develop and publish reviewed sprint submissions through
main. Do not force-push shared history or move a published tag to different code.

The cleanup branch preserves the original commits, latest closeout candidate and
actual #17/#19 merge commits. Changes removing dead code are delivered as a tested
PR. The user reports manual attestations handled; the submission index records
machine-observed merge/tag state without manufacturing peer reviews.

Every behavior change requires tests; authorization/state changes require negative
cases. Reconcile api/openapi.yaml and issue acceptance before a business feature.
Document assumptions and trade-offs in its PR. Do not implement the whole MVP from
the mere presence of draft endpoints.

Current CI contexts retain backend, Stack A backend, OpenAPI 3.1 validation,
Stack A frontend and Stack A Compose smoke. Stack A backend is a status-compatible
dependency on the single backend workload. Owner-managed rules should reference
the actual check names. Repository/Project privileges are not granted by code.

Historical setup payloads, account requests and early inspection checklists are
in docs/archive/release-preparation. They are dated records, not active automation.
