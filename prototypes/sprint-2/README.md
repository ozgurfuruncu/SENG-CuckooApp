# Sprint 2 prototypes

21 November 2026 · SENG 321 · Team 5

The handoff includes a live Figma design, native desktop and mobile exports,
offline previews and flow diagrams for both roles.
[Figma design](https://www.figma.com/design/k8O7yMMpxToQkBMlJOF2gl/Cuckoo?node-id=0-1)

The 21 November closeout decision uses the existing employer visual frames,
including **Görev oluştur**, for Sprint 2. Use the offline employer previews
below to play the complete journey at either width.

## Reviewer materials

Download the HTML files and open them locally in a browser. Each file renders
from sign-in with its images, styles and navigation embedded.

Anyone with the link can preview the Figma prototypes. The three presentation
links below were verified in signed-out Chromium sessions on 23 November 2026.

| Journey | Desktop | Mobile | Flow diagram |
| --- | --- | --- | --- |
| İşveren | [HTML preview](preview/employer-desktop.html) | [HTML preview](preview/employer-mobile.html) | [Employer SVG](../../docs/diagrams/sprint-2/employer-flow.svg) |
| Görev Alan | [HTML preview](preview/task-taker-desktop.html) | [HTML preview](preview/task-taker-mobile.html) | [Task-taker SVG](../../docs/diagrams/sprint-2/task-taker-flow.svg) |

- **Employer prototype.** Playback reached the dashboard after sign-in.
  [İşveren · Masaüstü](https://www.figma.com/proto/k8O7yMMpxToQkBMlJOF2gl/Cuckoo?node-id=20-4&starting-point-node-id=24%3A332&scaling=min-zoom&content-scaling=fixed).
- **Task-taker prototype.** Both live starting points open at sign-in.
  [Görev Alan · Masaüstü](https://www.figma.com/proto/k8O7yMMpxToQkBMlJOF2gl/Cuckoo?node-id=20-5&starting-point-node-id=33%3A850&scaling=min-zoom&content-scaling=fixed)
  · [Görev Alan · Mobil](https://www.figma.com/proto/k8O7yMMpxToQkBMlJOF2gl/Cuckoo?node-id=20-5&starting-point-node-id=33%3A2283&scaling=min-zoom&content-scaling=fixed).
- **Native Figma exports.** The employer and shared account set contains 30
  frames per width. The task-taker set contains 34 per width, including its
  starting and recovery states. Export filenames match the Turkish Figma frame
  titles. [Employer and shared exports](figma/employer)
  · [Task-taker exports](figma/task-taker).
- **Design mapping.** [Frame and draft API map](../../docs/sprint-2-figma-handoff.md#screen-and-draft-endpoint-map).

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
| Native Figma exports | Decoded 60 employer and shared-account PNGs. Exported and decoded 68 task-taker PNGs with Figma Desktop. Checked all task-taker file names against the handoff frame list and verified widths of 1280 px and 390 px. |
| Live Figma Desktop · task taker | The Figma plugin API located all 68 existing task-taker frames. Wired and rechecked 388 transitions across both widths and copied both named starts from the Prototype panel. Desktop and mobile playback advanced from sign-in through discovery, missing-city recovery, application, simulated hold, evidence submission, revision, resubmission, completion and read-only evidence. The read-only frame uses the initial preset sample note. |
| Live Figma Desktop · employer | Copied the employer desktop link from the Prototype panel and played welcome → sign-in → dashboard. The dashboard's new-task action did not advance in inline playback. The employer page displayed one starting point. |
| Figma link access · 21 November | A fresh browser session received Figma's sign-in prompt for the employer prototype. |
| Figma link access · 23 November | With **Anyone can view** enabled, all three presentation links rendered in signed-out Chromium sessions. The employer welcome screen advanced to the prototype sign-in screen. |
| Offline preview accessibility · 23 November | Checked 128 states and eight sampled text/background pairs. The minimum contrast was 6.21:1 against a 4.5:1 target. Verified 68 Tab-and-Enter transitions with visible focus across both roles and widths. |

The full handoff archive remains the source for the other offline preview
captures and the desktop build plugin.
