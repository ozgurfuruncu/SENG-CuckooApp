# Sprint 1 submission checklist

Current completion assessment is the [remote audit](audits/sprint1-remote-verification.md).
The artifact checklist below records earlier preparation, not complete GitHub evidence.

- [ ] Owner enables verified main/develop protections (currently absent).
- [ ] Authorized reader verifies Project evidence (read:project access blocked).
- [ ] Independent human reviews the final release candidate, including later cleanup changes.
- [ ] Reviewed main commit has verified sprint-1 tag/release and final submission links.

Tracked in reopened [#20](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/20).
Genuine human approval exists for merged #23; it does not cover later #25/#26.

- [x] Proposal/problem/vision and bounded software context preserved.
- [x] Full MIT license and original attribution retained.
- [x] Canonical OpenAPI 3.1 baseline and schema/reference validation.
- [x] Accepted Stack A ADR with user approval provenance and stated trade-offs.
- [x] Six named responsibilities, exactly one accountable owner per RACI activity, confirmed GitHub accounts.
- [x] Existing US-01..15 and technical issues linked; planning owners recorded. Administrative closure is not a feature-implementation claim.
- [x] One TypeScript entry point, one FastAPI app, one deployment and one CI workflow.
- [x] Active health/schema/database/route-negative tests, migration setup and isolated Compose smoke.
- [x] Legacy executable paths removed; historical evidence separated into docs/archive; all source commits retained.
- [x] Source Word unchanged in archive; current evidence-filled submission in docs/submissions.
- [x] Manual attestations reported complete by the user on 2026-11-02.

Actual cleanup checks/PR and observed publication state are recorded in the
[submission index](submissions/README.md). The checked items describe the prepared
submission, not an assertion that a sprint-1 tag exists. Cleanup PR #25 is merged
and develop is synchronized with main. Tag the reviewed main commit through the
team's manual release process when publishing the sprint.
