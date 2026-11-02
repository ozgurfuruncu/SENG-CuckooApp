# Sprint 1 requirements and closure criteria

Source supplied by the user on **2026-11-03**:
`SENG_321_Revised_Assignment_Sprint_1_Project_Foundation.pdf`, 17 pages,
SHA-256 `E666BF0A09B8DE8648DFFF7722A1E3C6DDEDBAB91662C87D93C3149CCA2AD36F`.
The accompanying `SENG_321_Revised_Assignment_Sprint_1_Examples.md` illustrates
the structure; its fictional system and technology/license choices are not
Cuckoo requirements. The full teaching files remain in the user's supplied
location; this document records the relevant criteria without republishing them.

The user's direction remains to keep process proportionate and require additional
administration only when instructions explicitly call for it. This PDF now
supplies that source for branch controls, teammate review and a sprint tag.
Earlier conditional-policy discussions did not establish instruction completion.

| Criterion | PDF pages | Cuckoo evidence / completion condition |
| --- | --- | --- |
| Proposal, problem, stakeholders, feasibility, scope, license decision | 2, 4–5, 9 | Current submission sections 1–9; full MIT LICENSE; identify assumptions without inventing stakeholder evidence |
| Vision and boundary, labelled information exchanges | 2, 7–8 | Submission sections 5–7; [context diagram](diagrams/system-context.svg) and PNG |
| Valid OpenAPI draft, representative success/input-error/conflict behavior | 2, 10–12, 17 | api/openapi.yaml; actual contract validation and CI. Business implementation is not a Sprint 1 deliverable |
| Named roles and RACI | 2, 13 | [Team responsibilities](team-raci.md); one accountable owner per activity |
| Prioritized epics/stories, acceptance criteria, estimates, dependencies, owners | 2, 16 | [Backlog](product-backlog.md) and existing issue links; future implementation and deferred stories remain explicit |
| Issue-linked feature branches and PR evidence | 14–15 | Existing GitHub issue/commit/PR links; individual contributor accounts |
| Teammate review of correctness, clarity, tests and contract impact | 15, 17 | A real teammate reviews the final candidate and records findings/approval. Do not substitute an agent report or conversation authorization for evidence of a separate teammate review |
| Protect main/develop with PR and status-check requirements | 2, 15, 17 | Actual enabled GitHub rules for both branches; repository owner configures these |
| Tag the assessed sprint submission and record its link | 14, 17 | sprint-1 at the actual reviewed/tested main commit; verify the ref and retain it unchanged |

Separate release/hotfix branches are explicitly optional on page 14. A GitHub
Release page, Project board, ownership transfer, additional administrator grant,
signed-commit system and additional deployment are not explicit Sprint 1 closure
requirements in this pack. Do not add them as default blockers. Existing enforced
GitHub rules must always be respected.

The page 2 phrase about GitHub organization does not specify an account-ownership
transfer in the detailed operating rules. Keep the existing repository and
contributors; escalate only a concrete instructor clarification.

## Current closure state

**Review candidate prepared; instruction completion remains open.** The latest
inspection found main/develop unprotected, no tags, and no submitted teammate
review on the final integration PR. Earlier genuine #23 review is retained but
does not establish review of every subsequent change. A separately documented
teammate review can also be evaluated; do not invent one.

See [manual completion steps](submissions/manual-closeout.md),
[current submission/evidence](submissions/README.md) and
[remote verification](audits/sprint1-remote-verification.md).
Use existing [#20](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/20) for
routine closeout. Official instructor acceptance is not asserted.
