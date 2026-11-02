# Product user story — [US-XX] [Title]
Owner: [Product Owner] · Priority: [P0/P1/P2] · Estimate: [points] · Status: Draft/Ready

**Problem / actor / value**: As a [role] I want [capability] so that [benefit].
**Scope:** [included], **Out of scope:** [explicit limits].
**Dependencies:** [other stories]. **API contract impact:** [path/operation/schema or none].
**Stakeholder evidence:** [interview/example/assumption; never invent].

## Acceptance criteria (observable, testable)
- AC01: Given [state], when [action], then [result].
- AC02: Given unauthorized actor, when [action], then [contracted 401/403 and no write].
- AC03: Given invalid or conflicting state, when [action], then [contracted validation/conflict and no partial write].

Use [canonical Ready/Done gates](SDD_WORKFLOW.md) and
[traceability](10-requirements-traceability.md). Approval source/date: [real link or pending].

## Definition of Ready
- [ ] Primary actor/value defined; dependencies clear; small enough for one sprint.
- [ ] Security/privacy and exceptional behaviors specified.
- [ ] PO and QA agree on acceptance evidence; API impacts reviewed.

## Review signatures
PO: [ ] · QA: [ ] · TL: [ ]
