# Contract baseline and later-feature decisions

The current implementation contract is [api/openapi.yaml](../api/openapi.yaml),
OpenAPI 3.1 / API 0.2.1-draft. The implemented Sprint 1 slice is only GET /health
relative to server base /api/v1. Runtime schema/body parity and failure responses
are tested. No business route is mounted and no legacy business table is adopted.

The old /jobs app, WORKER/ADMIN roles and three-category flow were removed from the
working tree during authorized cleanup. Their source history and the archived
3.0 contract remain recoverable; they are not an alternate current API.

For later reviewed issues, resolve these existing specification questions before
implementation:

- Evidence download identifiers/routes and participant access.
- Allowed media types/sizes, private storage/retention and how worker photo permission is recorded.
- Request-revision preconditions and whether review notes are mandatory.
- Discovery defaults, role-appropriate task fields and history visibility.

Confirmed baseline: VEHICLE_PHOTO_CHECK only; EMPLOYER/TASK_TAKER; worker applications
then exactly one employer-selected applicant; explicit simulated hold; evidence
and approval before atomic completion/simulated release. US-11 duplicate terminal
cancellation returns conflict under the canonical state policy. Occupation, skills
and operating city remain self-declared. Ratings/recommender/messaging are deferred.

The draft API baseline is a Sprint 1 deliverable; full endpoint implementation is
not. No additional product scope or real-money integration is introduced by cleanup.
