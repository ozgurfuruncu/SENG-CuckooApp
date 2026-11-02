# Initial Product Backlog

Current scope: US-01..US-13 describe the bounded journey. **US-14 (ratings) and
US-15 (suggestions) are deferred**, regardless of their historical priority below;
no API operation or implementation is authorized for them. The updated submission
on 2026-11-02 replaces US-11 terminal idempotence with rejection of duplicate
terminal actions, consistent with the canonical contract's terminal-state conflict.
Stack A is approved; business acceptance/contract review still precedes implementation.
See [reconciliation](contract-reconciliation.md) and [issue index](issue-index.md).
The original repo's `docs/backlog.md` is preserved; its different IDs are mapped
in the issue index rather than treated as additional MVP stories.

| ID | Priority | Points | Story | Core acceptance evidence |
|---|---|---:|---|---|
| US-01 | P0 | 5 | Register/sign in and enforce permitted roles | valid login; forbidden actor -> 403 |
| US-02 | P0 | 3 | Worker sets city and optional occupation/skills | optional fields; self-declared label |
| US-03 | P0 | 5 | Employer creates vehicle-photo-check task | required fields; unauthorized create rejected |
| US-04 | P0 | 3 | Worker filters open tasks by city/category | filters; valid empty result |
| US-05 | P0 | 3 | Worker applies to open task | one application per worker/task; no self-apply |
| US-06 | P0 | 5 | Employer selects exactly one applicant | atomic assignment; conflict on duplicate |
| US-07 | P0 | 3 | Employer records simulated payment hold | no real funds; valid state only |
| US-08 | P0 | 5 | Assigned worker submits private evidence | file/note validation; unauthorized denied |
| US-09 | P0 | 5 | Employer approves or requests revision | owner only; invalid transition denied |
| US-10 | P0 | 3 | Approved task completes and simulates release | requires hold + evidence + approval |
| US-11 | P1 | 3 | Employer cancels eligible unfinished task | allowed states only; duplicate terminal actions rejected |
| US-12 | P1 | 3 | Participant views task status history | assignment/evidence/review actions visible |
| US-13 | P1 | 5 | Private task data is access controlled | evidence/file forbidden tests |
| US-14 | P2 | 3 | Participant rates other party after completion | completed parties only; one rating each |
| US-15 | P2 | 5 | Worker sees skill-tag-informed suggestions | deterministic rules; no competence claim |
