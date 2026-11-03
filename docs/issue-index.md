# Issue traceability

Course-source update, 2026-11-03: [PDF pp.14–17](sprint-1-requirements.md) now
explicitly require teammate review, main/develop protections and a sprint tag.
Existing #20 tracks their real completion and the corrected evidence candidate.
Earlier conditional-policy discussions below are historical; a closed issue did
not establish instruction compliance. Project boards/GitHub Release pages remain
optional. Existing story IDs and administrative history are preserved.

Fresh verification on 2026-11-02: all US-01..15 remain administratively closed,
not implemented. Reopened [#20](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/20)
tracks routine closeout and the 2026-11-03 process simplification; protections,
formal approvals, Projects and releases are conditional on explicit instructions
or current team plans. Separate
[#27](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/27) tracks SDD setup.
See [remote audit](audits/sprint1-remote-verification.md) and
[US-03 specification example](specs/US-03-create-task.md). Earlier inspection
states below are historical; they do not supersede this update.

Published from existing supplied stories; duplicate check includes all open/closed issues.
Accounts were confirmed by the user and assignees were verified through GitHub.
The user reports manual issue/PR/attestation administration handled. API inspection
shows US-01..15 and technical #16/#18 closed, with #20 still open during cleanup.
The planning status below is the product baseline, not the GitHub open/closed state.
US-14/15 remain deferred. Original backlog IDs below indicate overlapping requirements,
not additional implementation work. Contract gaps require PO/architect/QA resolution.

| Story | Issue | Planning status | Legacy correspondence | Canonical operation IDs |
| --- | --- | --- | --- | --- |
| US-01 | [#1](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/1) | Backlog; business contract review | A-01, A-02, A-04 | registerUser, createSession, getMyProfile |
| US-02 | [#2](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/2) | Backlog; business contract review | A-03 (partial) | getMyProfile, updateMyProfile |
| US-03 | [#3](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/3) | Backlog; business contract review | B-01 | createTask |
| US-04 | [#4](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/4) | Backlog; business contract review | B-02, B-03 | listTasks, getTask |
| US-05 | [#5](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/5) | Backlog; business contract review | C-01 (application phase changes direct acceptance) | applyForTask |
| US-06 | [#6](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/6) | Backlog; business contract review | C-01 (selection phase) | listTaskApplications, assignTask |
| US-07 | [#7](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/7) | Backlog; business contract review | C-02 | simulatePaymentHold |
| US-08 | [#8](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/8) | Backlog; business contract review | C-03 | submitTaskEvidence, listTaskEvidence |
| US-09 | [#9](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/9) | Backlog; business contract review | C-04, C-06 | reviewTaskEvidence, submitTaskEvidence |
| US-10 | [#10](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/10) | Backlog; business contract review | C-04, C-05 | reviewTaskEvidence |
| US-11 | [#11](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/11) | Backlog; duplicate terminal actions rejected | B-05 (changed cancellation policy) | cancelTask |
| US-12 | [#12](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/12) | Backlog; business contract review | C-06 (partial) | getTaskHistory |
| US-13 | [#13](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/13) | Backlog; business contract review | C-07 | listTaskEvidence |
| US-14 | [#14](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/14) | Deferred (outside MVP) | D-02, D-03 | No feature operation |
| US-15 | [#15](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/15) | Deferred (outside MVP) | No original equivalent | No feature operation |
| T-05 | [#16](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/16) | Review | T-05 | No feature operation |

Issue closure is not feature acceptance: the current API implements only health.
US-14/15 remain deferred. Preserve existing issue IDs and recorded owner history;
later implementation work requires reviewed acceptance criteria and tests.

Post-approval bootstrap: [T-06 / #18](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/18). Stack A accepted on 2026-11-02; business implementation still requires its reviewed acceptance/contract slice.

Confirmed ownership: US-01..15 are assigned to Elif / `elfn0909` as initial backlog
and acceptance owner, matching PO accountability in RACI. This is not a future
implementation commitment; code-task delegation happens during actual sprint planning.
US-14/15 remain deferred. Technical #16/#18 are assigned to Emmanuel / `anyx05`;
closeout #20 is assigned to Aslı / `asliarikoglu` and Emir / `lilemiv` for process
accountability and DevOps responsibility. See [confirmed accounts](team-accounts.json).

Sprint 1 repository/release closeout: [T-02/T-03 / #20](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/20).
The [historical Project manifest](archive/release-preparation/project-items.json)
records the original issue import preparation. Current cleanup is
[#24](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/24).
