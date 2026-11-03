# Remaining Sprint 1 closeout actions

Source: [verified course criteria](../sprint-1-requirements.md), PDF pp.4–5/14–17.
See the [current evidence](README.md) and [full audit](../audits/sprint1-final-audit.md).
Both integration branches already have the required classic protection rules.
The current authenticated writer is `ozgurfuruncu` with admin access; no new
permission grant or ownership transfer is needed. Do not disable or bypass rules.

## 1. Real teammate: review the final correction

Open the final evidence PR linked from
[#20](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/20) and inspect its final
head using your own teammate account (for example `lilemiv` or `anyx05`). Read the
submission, compliance matrix, backlog/owners, diagram, API examples, tests and
limitations. Record actual findings using **Files changed → Review changes →
Approve** or **Request changes**. The PR author cannot provide the independent
approval. Recheck material changes after review; no earlier approval covers a new
diff automatically.

The author confirmed informal observation as the proposal’s qualitative evidence
basis on 3 November. The submission attributes that source and records the lack
of raw logs or measured frequency. Keep the proposed validation actions as future
work; do not invent interviews or quantify observations. The course does not
explicitly mandate a formal interview study or a measured baseline where none is
available. Any material review finding still needs resolution before completion.

## 2. Authorized writer: verify checks and integrate through the PR

Verify all five checks on the final candidate: `backend`, `Stack A backend`,
`OpenAPI 3.1 validation`, `Stack A frontend`, `Stack A Compose smoke`. Check the
actual approval's commit and unresolved feedback. Merge only when those gates
and GitHub's current rules permit it. Preserve history; never force-push or write
directly to main. After merge, verify the resulting main SHA and successful main
CI. A green baseline run is not evidence for the correction commit.

## 3. Authorized writer: publish the assessed annotated tag

First confirm the correction PR is approved and merged, required CI passed,
the resulting main is the reviewed/tested submission and no blocking finding
remains. Then run from a suitable checkout:

```powershell
git fetch origin --tags
git log -1 --format='%H %s' origin/main
git ls-remote --tags origin refs/tags/sprint-1 'refs/tags/sprint-1^{}'
```

If the tag already exists, verify its tag object and peeled commit; never replace
it. Otherwise substitute the independently verified full SHA below:

```powershell
git tag -a sprint-1 <VERIFIED_FINAL_MAIN_SHA> -m "Cuckoo Sprint 1 assessed submission"
git push origin refs/tags/sprint-1
git ls-remote --tags origin refs/tags/sprint-1 'refs/tags/sprint-1^{}'
```

The tag object must be annotated and its peeled SHA must equal that exact main
commit. Only after verification is
`https://github.com/ozgurfuruncu/SENG-CuckooApp/tree/sprint-1` a published submission
link. No tag is created by this document.

## 4. Final evidence and issue status

Record the correction PR/review, resulting main CI/SHA and verified tag object/
peeled SHA in #20. Check the submitted Markdown, evidence index, diagram and all
artifact links at that tag. A post-tag repository correction must use another
reviewed PR; do not move the assessed tag to make a ledger self-referential.
Close #20 only after the course gates are actually satisfied. No instructor
acceptance is implied. No GitHub Release, Project board, extra release branch,
Word/PDF export, new deployment or business feature is required.
