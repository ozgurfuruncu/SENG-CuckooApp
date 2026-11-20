# Sprint 2 frontend paths for Figma

Use the Turkish frontend from `frontend/` as the current screen reference.
The two Figma starting points are **İşveren yolculuğu** and **Görev Alan
yolculuğu**. Start each path from the matching demo button on `/`. The demo
account selector lets you change roles on the same task while keeping its
state in the current tab.

| Stories | Routes and screens | States to capture and connect |
| --- | --- | --- |
| US-01 | `/`, `/signup`, `/signin` | Welcome with two demo entry points, registration, successful sign-in, unknown-account feedback, signed-out gate and wrong-role gate. |
| US-02 | `/taker/profile`, `/taker/tasks/:taskId` | City, occupation and skills labelled as self-declared. A missing city blocks applying and links to the profile. Return to the task after saving the city. |
| US-03 | `/employer`, `/employer/tasks/new` | Employer dashboard, valid task creation, permission acknowledgement, and form error before creation. Show the posted open task. |
| US-04/05 | `/taker/find`, `/taker/tasks/:taskId` | Open listings for the single supported category, city filter, empty result and filter reset, task details, application, duplicate feedback and closed applications. |
| US-06/07 | `/employer/tasks/:taskId`, `/taker` | Empty and populated applicant lists, one assignment, selected and unselected outcomes, waiting for the simulated hold, and separate hold confirmation. |
| US-08/13 | `/taker/tasks/:taskId/evidence`, participant task details | Hold-required explanation, invalid photo or note input, private evidence preview, submitted state and unavailable evidence for an unrelated viewer. |
| US-09/10 | `/employer/tasks/:taskId/review`, `/employer/tasks/:taskId/completed`, `/taker/tasks/:taskId/evidence` | Review, revision request, revision feedback, resubmission, approval and simultaneous simulated release, completion, and read-only completed review. |
| US-11/12 | `/employer/tasks/:taskId`, participant task details | Cancellation confirmation, abort, confirmed cancellation with simulated hold voided, duplicate rejection, and participant history. |

For the evidence review import trial, complete the application, assignment,
hold and evidence steps on the same task. Switch back to the owning employer
and open **Kanıtları incele**. Use the current [desktop capture](sprint-2-evidence/lovable/evidence-review-desktop.png)
and [mobile capture](sprint-2-evidence/lovable/evidence-review-mobile.png) as
references while making the text, controls and photos editable in Figma.

The browser tests cover the interactive success and recovery paths at desktop
and mobile widths. Model tests cover additional invalid input, access denial,
and transition rejection with no mutation. The task detail and evidence views
illustrate provisional privacy and review rules. The [pending decisions](sprint-2-evidence-decisions.md)
remain separate from the screen approval. Record the actual editable Figma file
and both tested flow links in the [submission bundle](submissions/sprint-2.md).
[Browser journey tests](../frontend/tests/browser)
