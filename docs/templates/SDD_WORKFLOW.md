# Cuckoo spec-driven development — minimal operating procedure

**Principle:** A human reviews requirements and decisions before an agent implements. Agent output is a proposed change, not acceptance evidence.

1. PO defines a small story with acceptance criteria and explicit scope.
2. TL + QA review domain invariants, exceptions, authorization and exact OpenAPI delta; accepted ADR if architectural.
3. Assign frontend/backend/DevOps tasks derived from that single feature spec, each with exact allowed files and tests.
4. Use an isolated feature branch per issue. No autonomous merges, security-policy changes, remote provisioning or pushes without authorization.
5. Developer reviews agent diff, runs tests, captures results; second human reviews PR and confirms understanding.
6. QA validates acceptance and negative tests; Scrum records issue/PR/CI evidence and blockers.
7. Merge only with required approvals/checks; synchronize docs and tag releases when agreed.

For Sprint 1, only requirements/contract/branch workflow and minimal infrastructure proof are required. Defer business implementation until ADR-001 stack decision is accepted.
