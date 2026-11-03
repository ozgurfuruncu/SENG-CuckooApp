# Sprint 1 requirements and closure criteria

Source supplied by the user on **2026-11-03**:
`SENG_321_Revised_Assignment_Sprint_1_Project_Foundation.pdf`, 17 pages,
SHA-256 `E666BF0A09B8DE8648DFFF7722A1E3C6DDEDBAB91662C87D93C3149CCA2AD36F`.
The accompanying `SENG_321_Revised_Assignment_Sprint_1_Examples.md` illustrates
the structure; its fictional system and technology/license choices are not
Cuckoo requirements. This audit located and read all 17 original PDF pages in
the supplied `Desktop/SENG/SENG-321` course folder, verified the recorded hash,
and visually checked pages 14–17. No authoritative source is missing.
The full teaching files remain in that location rather than being republished.
The [full compliance matrix](audits/sprint1-final-audit.md) expands every course
deliverable and records actual verification and outstanding evidence.

The user's direction remains to keep process proportionate and require additional
administration only when instructions explicitly call for it. This PDF now
supplies that source for branch controls, teammate review and a sprint tag.
Earlier conditional-policy discussions did not establish instruction completion.

| Criterion | PDF pages | Cuckoo evidence / completion condition |
| --- | --- | --- |
| Proposal, problem evidence, stakeholders, intended value/success, feasibility, scope, assumptions, risks, validation actions and license decision | 2, 4–6, 9 | [Markdown submission](submissions/Cuckoo_Sprint1_Submission.md) sections 1–9; full MIT LICENSE; author-reported informal observations attributed, raw logs/frequency unavailable; planned validation is not a completed finding |
| Vision and boundary, labelled information exchanges | 2, 7–8 | Submission sections 5–7; [context diagram](diagrams/system-context.svg) and PNG |
| Valid OpenAPI draft, resources/operations/schemas/security, representative requests/success/input-error/conflict bodies | 2, 10–12, 17 | api/openapi.yaml and [API examples](api-examples.md); actual contract/schema validation and CI. Business implementation is not a Sprint 1 deliverable |
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

**PARTIAL — final correction awaiting review/integration/tag.** Live inspection
on 3 November 2026 found main/develop protected with PRs, one approval and all
five CI checks; admins included and force pushes/deletions disabled. Main
`72a522d7e90cfb574e7841880b06e54c81db3903` passed CI #46. Emir's Issue #20 review
and the genuine PR #33 approval are verified; PR #32 still has zero submitted
reviews. No sprint tag exists. The new correction needs its own real teammate
approval and CI; informal problem observations are attributed to the author,
without claiming independently verified findings or measured frequency.
Configuration is verified, not comprehensive enforcement behavior.

See [manual completion steps](submissions/manual-closeout.md),
[current submission/evidence](submissions/README.md) and
[remote verification](audits/sprint1-remote-verification.md).
Use existing [#20](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/20) for
routine closeout. Official instructor acceptance is not asserted.
