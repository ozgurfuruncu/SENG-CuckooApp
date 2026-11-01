# Cuckoo agent instructions

1. Treat `api/openapi.yaml` and the linked GitHub issue acceptance criteria as the implementation contract.
2. Do not expand MVP scope without an explicit architecture decision/issue.
3. Preserve the modular-monolith boundary: identity/profile, tasks, applications/assignment, evidence/reviews, simulated-payment.
4. Never implement real payments, escrow, identity verification, vehicle custody, professional inspection or legal representation.
5. Keep occupation, skills and operating city clearly self-declared.
6. Every behavior change requires tests. Authorization/state-transition changes require negative tests.
7. Work in small feature branches and link commits/PRs to issues.
8. Do not merge code you cannot explain; summarize assumptions and trade-offs in the PR.
9. Prefer boring, maintainable dependencies. Avoid microservices.
10. When implementation and OpenAPI disagree, stop and reconcile the contract before proceeding.
