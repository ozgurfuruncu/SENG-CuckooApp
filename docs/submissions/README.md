# Sprint 1 submission and evidence

Current working submission: [Cuckoo_Sprint1_Submission.docx](Cuckoo_Sprint1_Submission.docx).
Original supplied source: [unchanged archived DOCX](../archive/submissions/Cuckoo_Sprint1_Submission_Original.docx),
SHA-256 `04C3B14CFA8DA58B6A0C06BF98A01B5EADE8EF82BB6BDBC3A3ED2B931F012E86`.
Supplied submission date: **5 November 2026**. The evidence copy is updated from
verified artifacts/results; it does not rewrite the source or invent publication.

| Artifact | Evidence |
| --- | --- |
| Repository | [SENG-CuckooApp](https://github.com/ozgurfuruncu/SENG-CuckooApp) |
| Contract | [api/openapi.yaml](../../api/openapi.yaml), OpenAPI 3.1 / 0.2.1-draft |
| License | [Original MIT](../../LICENSE) |
| Architecture | [Accepted ADR-001](../decisions/ADR-001-architecture.md) |
| Roles/accounts | [RACI](../team-raci.md), [confirmed accounts](../team-accounts.json) |
| Boundary | [Supplied system context](../diagrams/system-context.png) |
| Backlog | [Stories](../product-backlog.md), [GitHub index](../issue-index.md) |
| Application/testing | [Development guide](../development.md), [CI](../../.github/workflows/ci.yml) |
| Cleanup | [Issue #24](https://github.com/ozgurfuruncu/SENG-CuckooApp/issues/24); validated cleanup PR/check links are added after execution |
| Historical records | [Archive](../archive/README.md); old claims apply only to their recorded revision/date |

## Manual attestation and machine observations

The user explicitly reports PR/issue/manual attestations handled. No extra
attestation bot or hard-coded PR-state gate runs in this submission. The report
is preserved separately from what the GitHub API exposed during cleanup:

- #17 is merged into develop; #19 is merged into its parent feature branch.
- #21 and #22 are closed unmerged; #23 is merged into main at c8c16b5.
- Cleanup includes #23's full history and both actual #17/#19 merge commits.
- No sprint-1 tag/release was returned at inspection, and current API credentials
  could not read Project scope. The user report covers manual attestations;
  repository inspection records are kept distinct from it.
- The user's administrative issue closures are retained. They do not imply that
  draft auth/task/evidence/payment business endpoints have been implemented.

## Cleanup validation

The cleanup must pass active backend tests (including real PostgreSQL in CI),
canonical OpenAPI checks, frontend type-check/build and actual default Compose
startup/migration/persistence smoke. Results are recorded after execution. Source
DOCX ZIP/XML/assets and all active Markdown links are also checked. Historical
links target the preserved original Git revision rather than removed live paths.

The local checkout is consolidated at the Cuckoo workspace root. The old unpacked
starter and session scratch files are backed up outside the tracked source in
.archive; the pre-cleanup Git bundle preserves all original local/remote refs.
Database volumes are not deleted.
