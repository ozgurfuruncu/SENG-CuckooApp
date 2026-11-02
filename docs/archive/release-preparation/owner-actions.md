> Historical pre-cleanup record. Commands and state below describe their original inspection, not current setup. Relative evidence links now point to the preserved source commit. See the current root README.

# Owner actions for the prepared Sprint 1 candidate

Repository owner: **ozgurfuruncu**. These commands are reviewable instructions,
not actions already executed by the write-only agent account. Use the owner
account, or apply equivalent settings in GitHub's web interface. Do not substitute
another person's token into chat or commit credentials. Paths below are relative
to the repository root. GitHub CLI is optional and was unavailable in the agent
environment; its commands are prepared, not claimed as executed.

## 1. Apply rules equally to all collaborators and the owner

Check the signed-in account with `gh api user --jq .login`. It must have repository
admin permission. Review the JSON files, then use:

```powershell
gh api --method PUT repos/ozgurfuruncu/SENG-CuckooApp/branches/develop/protection --input docs/release/branch-protection-foundation.json
gh api --method PUT repos/ozgurfuruncu/SENG-CuckooApp/branches/main/protection --input docs/release/branch-protection-integrated.json
```

Both apply to everyone, including admins, with one real approval and required
checks. `restrictions: null` permits every existing writer to participate through
PRs; it does not grant public write or an approval bypass. No code-owner review
requirement or last-pusher restriction is added beyond the independent approval.
These defaults can later be changed manually by the owner.

After #17 and #19 have reviewed integration and all contexts exist on develop,
upgrade develop to the same five-check integrated policy:

```powershell
gh api --method PUT repos/ozgurfuruncu/SENG-CuckooApp/branches/develop/protection --input docs/release/branch-protection-integrated.json
gh api repos/ozgurfuruncu/SENG-CuckooApp/branches/main/protection
gh api repos/ozgurfuruncu/SENG-CuckooApp/branches/develop/protection
```

Capture the returned effective policy/Settings links for the ledger. In the UI:
Settings → Branches → add/edit classic rules for main/develop using those same
fields. Do not set required contexts that a pending prerequisite PR cannot run.

## 2. Create/link Project and grant all verified collaborators Admin

Use the owner's Project settings (not repository settings) to create/link a
**Cuckoo Sprint 1** Project. Give these verified accounts Admin in Manage access:
`anyx05`, `j7766n`, `ozgurfuruncu`, `lilemiv`, `elfn0909`, `asliarikoglu`.
No public administration. See [access-defaults.json](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/f5f91a1a7377c4d52ab7dc657508a6938116f9c0/docs/release/access-defaults.json).

The current token lacks read:project; CLI use requires the `project` scope and
authorization for the intended owner. With an owner-authenticated CLI:

```powershell
gh auth refresh -h github.com -s project
gh project list --owner ozgurfuruncu
```

Reuse an existing matching linked Project to avoid duplicates. If none exists:

```powershell
gh project create --owner ozgurfuruncu --title "Cuckoo Sprint 1" --format json
```

Use the actual returned project number, then import existing issues (no duplicates
if importing manually; inspect existing items before rerunning this loop):

```powershell
$projectNumber = Read-Host 'Existing or newly created Project number'
Get-Content -LiteralPath docs/release/project-issue-urls.txt | ForEach-Object {
    gh project item-add $projectNumber --owner ozgurfuruncu --url $_
}
```

Set Status options to Backlog / Sprint / Doing / Review / Done. The manifest lists
technical #16/#18/#20 in Review until accepted; US-01..15 stay Backlog, with #14/#15
explicitly deferred. Add verified issue assignees through actual team planning;
do not infer a person's role from their login. Capture Project URL and access
evidence. Project access does not itself change repository administration.

Initial issue ownership has now been applied and verified: US-01..15 are assigned
to PO `elfn0909` for backlog/acceptance accountability; #16/#18 to `anyx05`; #20 to
`asliarikoglu` and `lilemiv`. The user confirmed all six accounts in
[team-accounts.json](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/f5f91a1a7377c4d52ab7dc657508a6938116f9c0/docs/team-accounts.json). Future implementation tasks can be
delegated during sprint planning without pretending they are already completed.

### Owner decision: anyx05 repository and Project Admin

The user explicitly requests **both**, subject to current owner approval; see
[admin-access-request.json](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/f5f91a1a7377c4d52ab7dc657508a6938116f9c0/docs/release/admin-access-request.json). This is a pending request,
not a grant. `anyx05` is currently a repository writer; Project Admin is unverified.

A personal repository has one owner and collaborators; there is no second
repository-admin role to grant here. To retain multiple repository administrators,
the owner must explicitly choose an organization-owned arrangement and grant the
organization repository Admin role. No organization name, ownership transfer or
repository move is inferred/authorized by the readiness audit. An owner decision
and separately approved migration would be needed. Project Admin can instead be
granted independently through the existing Project's Manage access.

The prepared branch policy enforces one independent approval even for admins.
Admin access does not make self-approval count. The user's desired faster PR
workflow is recorded, but no review bypass or change to that release rule was
introduced. Owner/team approval would be needed for an explicit policy change.
[Personal repository permissions](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/permission-levels-for-a-personal-account-repository),
[organization repository roles](https://docs.github.com/en/organizations/managing-peoples-access-to-your-organization-with-roles/roles-in-an-organization).

## 3. Preserve integration history and prepare final release head

PR #17 and #19 are already merged by owner review flow. Confirm merged state and
commit preservation first:

```powershell
gh pr view 17 --repo ozgurfuruncu/SENG-CuckooApp --web
gh pr view 19 --repo ozgurfuruncu/SENG-CuckooApp --web
gh pr checks 17 --repo ozgurfuruncu/SENG-CuckooApp
gh pr checks 19 --repo ozgurfuruncu/SENG-CuckooApp
```

Then synchronize the release candidate with current develop normally:

```powershell
git fetch origin
git switch release/sprint-1
git merge --no-ff origin/develop
git push origin release/sprint-1
```

If the branch is checked out elsewhere or has local changes, use a clean checkout
instead. Resolve conflicts through review; a changed head requires fresh checks
and approval. The merge commit preserves the feature and integration history.
No `--admin` bypass, squash, force push, fabricated approval or reviewer
impersonation is acceptable.

## 4. Approve release PR, merge main, verify, tag

Use the actual release PR linked in [status.md](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/f5f91a1a7377c4d52ab7dc657508a6938116f9c0/docs/release/status.md). Mark it ready only
after prerequisites, complete checks, Project/roles evidence and candidate content
are final. A different collaborator reviews and approves the final head. Merge
through that PR; wait for main's backend/contract/Stack A checks.

Record the reviewed main SHA and actual approval/CI URLs before the final tag:

```powershell
git fetch origin
git switch main
git pull --ff-only origin main
git rev-parse HEAD
# Only after verifying this exact main SHA's approvals/checks and no existing sprint-1 tag:
git tag -a sprint-1 -m "Sprint 1 reviewed foundation and approved Stack A bootstrap"
git push origin refs/tags/sprint-1
gh release create sprint-1 --repo ozgurfuruncu/SENG-CuckooApp --verify-tag --title "Sprint 1" --notes-file docs/release/sprint-1-release-notes.md
```

Update the submission evidence using actual tag/review/rules/Project URLs. The
candidate Word document deliberately retains any still-pending evidence. A tag
is not review evidence and is not created by preparing these commands.

References: [branch-rule permissions](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule),
[Project access](https://docs.github.com/en/issues/planning-and-tracking-with-projects/managing-your-project/managing-access-to-your-projects).
