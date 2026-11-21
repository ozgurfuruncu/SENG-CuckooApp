# Sprint 2 frontend paths for Figma

Use the Turkish frontend from `frontend/` for the routes and demo behavior.
The evidence screen updates came from the standalone Lovable source.
The two Figma starting points are **İşveren yolculuğu** and **Görev Alan
yolculuğu**. Use product-facing entry and sign-in screens for both. In the
runnable frontend, the demo buttons on `/` and the account picker let reviewers
see both sides of the same task while keeping its state in the current tab.

## Entry points and demo controls

The shared welcome screen is `/`. The distinct paths after entry are the
employer dashboard at `/employer` and the task taker dashboard at `/taker`.
The draft contract gives each demo account a single role. The account picker
selects a different fictional account for the walkthrough. A future shared
account with both actions is in the [product backlog](product-backlog.md#one-account-for-posting-and-taking-tasks).

Keep **Sprint 2 prototipi · Örnek veriler** visible in the interactive demo.
The account picker and reset help reviewers follow both sides of the same
task. Remove the entire demo header from the Figma frames and exports. Close
the space it occupied and preserve the regular app navigation. Use the two
Figma starting points and annotated handoffs to connect the expected product
flows. Keep the simulated-payment notices on the relevant screens.

## Routes and states

| Stories | Routes and screens | States to capture and connect |
| --- | --- | --- |
| US-01 | `/`, `/signup`, `/signin` | Shared welcome, registration, successful sign-in, unknown-account feedback, signed-out gate and wrong-role gate. Figma uses two prototype starting points. |
| US-02 | `/taker/profile`, `/taker/tasks/:taskId` | City, occupation and skills labelled as self-declared. A missing city blocks applying and links to the profile. Return to the task after saving the city. |
| US-03 | `/employer`, `/employer/tasks/new` | Employer dashboard, valid task creation, permission acknowledgement, and form error before creation. Show the posted open task. |
| US-04/05 | `/taker/find`, `/taker/tasks/:taskId` | Open listings for the single supported category, city filter, empty result and filter reset, task details, application, duplicate feedback and closed applications. |
| US-06/07 | `/employer/tasks/:taskId`, `/taker` | Empty and populated applicant lists, one assignment, selected and unselected outcomes, waiting for the simulated hold, and separate hold confirmation. |
| US-08/13 | `/taker/tasks/:taskId/evidence`, participant task details | Hold-required explanation, invalid photo or note input, private evidence preview, submitted state and unavailable evidence for an unrelated viewer. |
| US-09/10 | `/employer/tasks/:taskId/review`, `/employer/tasks/:taskId/completed`, `/taker/tasks/:taskId/evidence` | Review, revision request, revision feedback, resubmission, approval and simultaneous simulated release, completion, and read-only completed review. |
| US-11/12 | `/employer/tasks/:taskId`, participant task details | Cancellation confirmation, abort, confirmed cancellation with simulated hold voided, duplicate rejection, and participant history. |

For the evidence review import trial, complete the application, assignment,
hold and evidence steps on the same task. Switch back to the owning employer
and open **Kanıtları incele**. Use the editable Figma review frames and the
native desktop and mobile exports for the current visual reference.
[Figma evidence](sprint-2-evidence/figma/README.md)

The browser tests cover the integrated candidate’s interactive success and
recovery paths at desktop and mobile widths. Model tests cover additional
invalid input, access denial, and transition rejection with no mutation. For
the Figma drafts use the [final evidence design](sprint-2-evidence-decisions.md)
and the [Lovable pass](sprint-2-lovable-context.md#final-lovable-pass). Capture
the required revision reason and its validation, private viewing, file-limit
copy, retention copy and the unavailable-evidence state. Record the actual
editable Figma file and both tested flow links in the [submission bundle](submissions/sprint-2.md).
[Browser journey tests](../frontend/tests/browser)

## Updated evidence captures

The supplied `Cuckoo Figma ekran görüntüleri.zip` contains 16 PNGs. Desktop and
mobile each show review start, blank-reason recovery, revision requested,
evidence submission ready, oversized-photo recovery, task taker revision,
unrelated viewer and completion. Use these to update the evidence parts of the
two Figma journeys. The front and rear evidence photos depict different cars.
Use a consistent set of fictional vehicle photos for the same task in the
final frames. Use the entry screens and earlier task steps from the corresponding
role flows. Record the editable file and working flow URLs when they are available.
The bundled captures come from the runnable demo and include its reviewer header.
[Bundled captures](https://github.com/ozgurfuruncu/SENG-CuckooApp/tree/57a9b73a7e0deb1106512e7d68142fc0f3b72118/docs/sprint-2-evidence/lovable-final)
