# Pull request / human review checklist

The supplied course pack p.15 requires at least one teammate review; see
[the criteria](../sprint-1-requirements.md). Conversation authorization permits
the work but does not establish a separate teammate reviewed the final diff.
Linked story/spec: [ ] · Reviewers: [ ] · Risk level: [low/medium/high]

## Implementation
What changed: [ ] · Why: [ ] · Deliberately not changed: [ ]

## Reviewer must verify
- [ ] Acceptance criteria directly supported.
- [ ] API spec and implementation align; no silent contract drift.
- [ ] Auth/ownership and invalid-state behavior tested.
- [ ] DB concurrency and uploaded photo privacy considered when relevant.
- [ ] CI run and local commands linked, accurate and reproducible.
- [ ] Contributor can explain code/design and ownership.
- [ ] Follow-ups filed rather than hidden in comments.

Approve/request changes: [ ] · Review link: [ ]

## Integration and release evidence

Cross-component versions/JSON names/error media types and API base path: [ ]
Migration deployment order and rollback impact: [ ]
Frontend/backend contract and positive/negative integration evidence: [ ]
Final reviewed head SHA: [ ] · Required checks/run URLs at that SHA: [ ]
Actual teammate review record, reviewer and date: [documented teammate findings/decision or real submitted review URL; task authorization is separate evidence].
Merge SHA/target: [ ] · Tag/release URL and SHA if explicitly required: [not required / real evidence].
Do not describe conversation approval or a bot comment as a GitHub peer approval.
Apply [canonical Done gates](SDD_WORKFLOW.md) and update
[traceability](10-requirements-traceability.md) after authorized merge.
