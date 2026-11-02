# ADR-[NNN] — [Decision title]
Status: Proposed/Accepted/Superseded · Date: [ ] · Owner: [ ]

## Context / quality drivers
[Specific constraint, problem, expected volume/risks, course requirement]

## Decision
[One narrow technical choice, interfaces affected and why]

## Considered alternatives
| Option | Advantages | Drawbacks | Reason chosen/rejected |
| --- | --- | --- | --- |
| [A] | [ ] | [ ] | [ ] |
| [B] | [ ] | [ ] | [ ] |

## Consequences and verification
Security impact: [ ] · OpenAPI change: [ ] · DB/migrations: [ ]
Required tests: [ ] · Rollback: [ ]
Reviewers / acceptance: [ ]

## Domain model and API change control

| Entity / module | Owner / identity | Invariants and allowed transitions | Cross-module interface |
| --- | --- | --- | --- |
| [ ] | [ ] | [ ] | [ ] |

Contract baseline: [commit SHA / API version] · Operations/schemas: [ ]
Proposed delta or explicit no-change decision: [ ]
Compatibility, frontend and migration impact: [ ]
Issue/spec/contract disagreement: [resolution with PO/TL/QA approval link before coding].
Keep the five modular-monolith boundaries and accepted Stack A; follow
[the canonical workflow](SDD_WORKFLOW.md). ADR approval is a decision record,
not a substitute for the implementation PR review.
