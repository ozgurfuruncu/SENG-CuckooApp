# Branch and review process

`main` contains reviewed releases; `develop` integrates reviewed work. Feature
branches use `feature/<story-or-issue>-short-name`; fixes use `fix/<issue>-short-name`.
This foundation uses the explicitly requested `feature/sprint1-repo-bootstrap`.
Never force-push shared branches or merge directly to main/develop.

Start from current develop, link the existing story/issue and its acceptance
criteria, review `api/openapi.yaml`, then make a bounded change. Each behavior change
requires tests; authorization/state changes require negative tests. A PR targets
develop and records assumptions, trade-offs and exact executed checks. A second
human must review the diff and explain the change before approval. Unresolved
contract differences and proposed ADRs are gates, not implicitly accepted decisions.

## Administrator action required

The authenticated account can push but has no admin/maintain permission. Main was
reported `protected: false`; no rulesets existed at inspection. No protection change
is claimed. The repository administrator should protect main and develop with:

- PR required, at least one approving human review, stale approvals dismissed and
  conversations resolved; apply to administrators as appropriate for the course.
- Required, current checks: existing `backend` job and `OpenAPI 3.1 validation` job.
  Confirm actual GitHub check names from the PR before selecting required contexts.
- Branch up-to-date before merge; force pushes and deletion disabled; no routine
  bypass/direct pushes. Confirm the effective rules and capture evidence.

Protect both branches only after the new context has executed so rules do not
require a nonexistent check. Never relax existing coverage or review requirements
to obtain a green result. Add collaborators only from confirmed GitHub identities;
local Git author information does not establish team ownership or account mappings.

Project columns: Backlog / Sprint / Doing / Review / Done. US-14 and US-15 remain
deferred; an issue is not a Sprint commitment. Move to Done only with acceptance,
tests, CI and human-review evidence. A human selects the reviewed main commit and
creates `sprint-1` only after all required evidence is ready.

Reference: [GitHub branch-rule permissions](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule).
