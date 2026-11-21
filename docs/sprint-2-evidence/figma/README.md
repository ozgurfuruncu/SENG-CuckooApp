# Sprint 2 Figma handoff evidence

21 November 2026 · SENG 321 · Team 5

Özgür reported completing the employer and task-taker flows in Figma Desktop
after the MCP call limit was reached. The supplied handoff archive records the
design URL and includes offline previews, diagrams, one Figma-rendered PNG and
128 browser-preview PNGs. The starting-point URLs and reviewer playback and
access checks are still to be recorded. [Editable Figma design](https://www.figma.com/design/k8O7yMMpxToQkBMlJOF2gl/Cuckoo)

## Reviewer materials

Download the HTML files and open them locally in a browser. Each file renders
from sign-in with its images, styles and navigation embedded.

| Journey | Desktop | Mobile | Flow diagram |
| --- | --- | --- | --- |
| İşveren | [HTML preview](preview/ED.html) | [HTML preview](preview/EM.html) | [Employer SVG](Isveren-Flow.svg) |
| Görev Alan | [HTML preview](preview/TD.html) | [HTML preview](preview/TM.html) | [Task-taker SVG](Gorev-Alan-Flow.svg) |

- **Figma export.** [Desktop welcome](Figma-PNG/Cuckoo-Karsilama-Desktop.png).
- **Browser preview samples.** [Desktop evidence review](Preview-PNG/Desktop/ED_review.png),
  [mobile completion](Preview-PNG/Mobile/EM_complete.png),
  [desktop evidence revision](Preview-PNG/Desktop/TD_revise.png) and
  [mobile evidence revision](Preview-PNG/Mobile/TM_revise.png).
- **Design mapping.** [Frame and draft API map](../../sprint-2-figma-handoff.md#screen-and-draft-endpoint-map).

The two role journeys use the same fictional vehicle-photo task in Ankara.
In the previews, the refresh actions advance simulated handoffs between
participants. Signed-out and wrong-role states can be opened by adding
`#signedout` or `#wrongrole` to an offline HTML file URL.

## Verification record

Source archive `Cuckoo-Sprint-2-Handoff.zip`, SHA-256
`3f226f01e12bcfae04d5ff515070d7c54d814e7e2eb360b45efb7d82ff2b804f`.
Checked 21 November 2026 on Windows with Node.js 24.18.0 and Playwright using
Chromium 157.0.8103.50, network emulation offline.

| Check | Result |
| --- | --- |
| Route and API traceability | The archive's frame data covers all 14 client routes at both sizes and maps the methods, HTTP paths and IDs of all 16 draft business operations in OpenAPI. |
| Employer walkthroughs | At 1280 px and 390 px, clicked through permission validation, posting, applicant selection, simulated hold, required revision reason, re-review, approval and read-only completion. Also exercised cancellation before and after the hold and registration. |
| Task-taker walkthroughs | At 1280 px and 390 px, clicked through missing-city recovery, application, missing hold, oversized-photo feedback, submission, revision, resubmission and completion. Also exercised empty search, an unavailable-evidence screen and registration. |
| Screen and link checks | Loaded 30 employer and 34 task-taker states per width, checked all 638 forward link targets and activated sign-in by keyboard in every preview. Checked for horizontal overflow, broken loaded images, demo-header text and page errors. |
| Image and diagram inventory | Checked the widths of all 128 preview PNGs, inspected the 1280 × 840 desktop welcome export and checked that both SVG diagrams are present. |
| Figma Desktop | Özgür reported the flows ready. The archive's saved frame data and offline checks establish the coverage above. Independent playback using Figma share links, reviewer access and the native desktop/mobile batch export are pending evidence. |

The repository carries the four offline previews, both diagrams, the native
welcome export and four representative preview PNGs. The full archive remains
the source for the other preview captures and the desktop build plugin.
