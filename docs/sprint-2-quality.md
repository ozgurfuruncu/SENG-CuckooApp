# Sprint 2 quality specification and verification matrix

20 November 2026 · SENG 321 · Team 5 · **Proposed targets for review**

This draft builds on Elif’s [SRS §10](sprint-2-srs.md#10-non-functional-requirements-and-quality-references)
and the [Sprint 2 plan](sprint-2-plan.md). Jumanah owns the quality specification
and evidence review. Emmanuel and Emir assess contract and operational
feasibility. Özgür supports UI measurement and Elif reviews product acceptance.
Record approved targets and actual results by revision. The earlier prototype,
the current web candidate and a later live business implementation are
separate verification subjects.

| ID and rationale | Proposed pass condition | Verification method and stage | Evidence or current status |
| --- | --- | --- | --- |
| `NFR-PRIV-01` · US-08/13 · Protect private evidence | The task owner and assigned task taker can view permitted evidence. Across the unselected applicant, unrelated employer, unrelated task taker and signed-out scenarios, zero unauthorized reads disclose private metadata or bytes. | Check the allowed and denied mock views in the Turkish demo. After approval and implementation, repeat at the API for each applicable metadata/content operation, varying the task and evidence identifiers. Keep the actor/owner matrix, expected responses and redacted outcomes. | Live access controls await business implementation. The [evidence proposals](sprint-2-evidence-decisions.md) define the candidate actor matrix. |
| `NFR-INT-01` · US-06/09/10 · Preserve state integrity | Two simultaneous eligible assignments for one open task yield one success and one conflict with a single persisted assignment. A successful approval completes the task and releases its simulated hold together. Rejected actions produce zero partial mutations. | Review transitions and failed-action UI in the prototype. On the live feature, run 20 synchronized assignment races on fresh tasks against PostgreSQL and assert stored state after each run. Add simulated release transition tests with rejected and rolled-back cases. | Prototype feedback is observable. Transaction verification awaits the reviewed APIs and schemas. |
| `NFR-A11Y-01` · Forms and journeys · Make controls perceivable and operable | Sampled normal-size text reaches 4.5:1 contrast. Each primary control has an accessible name, each journey can be completed with the keyboard, and focus remains visibly indicated. | Measure text/background pairs on editable Figma frames and the rendered prototype. Check keyboard order, focus, errors and dialogs in the browser. Record frame, viewport, ratio and defects. [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Figma and current candidate audit pending. Historical automated checks cover the earlier prototype’s test scope. |
| `NFR-USE-01` · US-01–13 journey coverage · Show clear next actions | Two scripted walkthroughs reach the expected completion or recovery state without moderator guidance. The employer scenario includes review and approval. The task taker scenario includes revision and resubmission. | Run each flow from its own entry point with a reviewer. Log device/viewport, start state, steps, expected and observed outcome, and blocking issues. Repeat on the linked Figma flows. | The four offline previews reached completion and recovery in automated tests. Live Figma playback reached completion after revision at both task-taker widths. The employer flow still needs full live playback. Team reviewer walkthroughs remain pending. [Verification record](../prototypes/sprint-2/README.md#verification-record) · [PO checklist](sprint-2-po-prototype-review.md). |
| `NFR-PERF-01` · US-04 · Keep task discovery responsive | Illustrative target of p95 ≤500 ms for successful task-list requests over a 60-second measured window, with 1,000 synthetic task records and 20 concurrent virtual users. Record errors separately. | For the live endpoint, document machine/instance, DB and app versions, dataset, query mix and warm-up. Capture request count, error rate and p95 from the load report. Approve the environment and target before treating the threshold as a gate. | `listTasks` has no runtime implementation. Timing the demo would measure a different workload. |
| `NFR-REL-01` · Health/readiness · Report database failures clearly | `/api/v1/health` returns the documented `200` response when the database is reachable and `503` with the documented safe response when the database is unavailable. | Run the backend health tests and check both status and response body. Record the result per candidate and link the CI run. | Existing health coverage is in the [backend tests](../backend/tests/test_api.py). Record new results against the integrated candidate. |

## Record a verification result

For each execution, record the NFR ID, input/scenario, tested commit or Figma
version, date, reviewer, environment, expected result, observed value or
finding, and evidence link. Keep a failing, skipped or blocked item visible
with its reason. The [19 November browser evidence](logs/sprint-2/browser-summary.json)
and [prior verification log](archive/sprint-2/verification.md) belong to Özgür’s
earlier prototype. Carry them forward as dated evidence. The [current
integration record](sprint-2-lovable-integration.md) scopes any new checks.
