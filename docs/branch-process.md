# Branch and review process

Follow [the supplied course criteria](sprint-1-requirements.md), especially PDF
pages 14–17. Keep the process lightweight: an issue, a short-lived feature
branch, a teammate-reviewed PR, applicable passing CI and traceable integration.
Feature implementation normally integrates through develop; final submission
and documentation corrections may target main through their reviewed PR. Both
integration branches must be protected with PR and status-check requirements.

The course pack explicitly requires teammate review, main/develop protections
and the sprint submission tag. Keep other administration proportionate to the
current course instructions and team-approved plan.
Separate release/hotfix branches, a GitHub Release page and Project board remain
optional. No administrator grant or ownership transfer to anyx05 is needed.

Use individual contributor accounts. Every change links to its existing issue;
record the actual teammate review and relevant test evidence. Conversation
approval authorizes the work but does not prove a separate teammate reviewed it.
A GitHub approving review is an easy verifiable record; another real documented
teammate review can be evaluated. Never manufacture either form of evidence.

Every behavior change requires tests; authorization/state changes need negative
cases. Reconcile api/openapi.yaml and issue acceptance before business work.
Document assumptions/trade-offs and preserve contributor history. Only health
is implemented; the business API draft does not authorize its implementation.

Existing CI contexts: backend, Stack A backend, OpenAPI 3.1 validation, Stack A
frontend and Stack A Compose smoke. Owner configuration must use the actual
contexts. Respect all enforced rules; do not bypass a missing review or failed
check. See the completed [Sprint 1 closeout record](submissions/manual-closeout.md).

Tag assessed sprint versions only after their review and check gates pass.
Sprint 1 is already published at the immutable sprint-1 tag; subsequent
documentation PRs do not move it or reopen the sprint.
[Publication guidance](release/README.md) covers later delivery. Historical
audits retain their dated observations rather than serving as current setup
instructions or unfinished-task lists.
