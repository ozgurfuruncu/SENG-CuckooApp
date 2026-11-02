# Issue index and Project import manifest

Published from existing supplied stories; duplicate check includes all open/closed issues.
No assignees inferred. Project import is blocked by missing Projects token scopes.
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

Board columns: Backlog / Sprint / Doing / Review / Done. Keep deferred stories out
of Sprint/Doing. A board owner with Projects authorization can import these URLs
without recreating issues. The bootstrap T-05 is for human review, not marked Done.

Post-approval bootstrap: [T-06 / #18](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/18). Stack A accepted on 2026-11-02; business implementation still requires its reviewed acceptance/contract slice.
