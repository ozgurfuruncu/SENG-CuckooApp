# Sprint 2 Figma handoff

SENG 321 · Team 5 · Cuckoo

The [plan](sprint-2-plan.md) calls for editable Turkish frames, two playable
role flows, annotated user-flow diagrams and verified reviewer access. The
[runnable frontend](sprint-2-lovable-integration.md) demonstrates the same
journeys with fictional data and reviewer controls.

The [21 November handoff evidence](sprint-2-evidence/figma/README.md) records
the current Figma design link, offline walkthroughs, diagrams and export
status. The brief below describes the frame and interaction requirements.

## Figma agent instructions

Work in the existing cloned Cuckoo Figma Design file. Build editable desktop
and mobile frames for the expected Turkish product flows. Write handoff
annotations in English. Keep the app copy and role names in Turkish.

### Sources

- Use the [public Lovable source](https://github.com/anyx05/cuckoo-photo-tasks/tree/c2b87cd40065ac0443da574db02944b284110627)
  as the visual reference. Inspect [screen routes](https://github.com/anyx05/cuckoo-photo-tasks/tree/c2b87cd40065ac0443da574db02944b284110627/src/routes),
  [screen components](https://github.com/anyx05/cuckoo-photo-tasks/tree/c2b87cd40065ac0443da574db02944b284110627/src/components/cuckoo)
  and [styles](https://github.com/anyx05/cuckoo-photo-tasks/blob/c2b87cd40065ac0443da574db02944b284110627/src/styles.css).
- Use [CuckooApp PR #40](https://github.com/ozgurfuruncu/SENG-CuckooApp/pull/40)
  for the integrated demo and the [path and state checklist](sprint-2-frontend-paths.md)
  for what reviewers should be able to reach. Follow the [evidence design baseline](sprint-2-evidence-decisions.md)
  for revision, private evidence, media limits and retention copy.
- Use [OpenAPI](../api/openapi.yaml) for the methods, paths and operation IDs.
  The business endpoints are draft contract references for annotations.
  [Current Figma exports and playback evidence](sprint-2-evidence/figma/README.md)

### Figma pages and frames

| Figma page | Contents |
| --- | --- |
| 00 · Başlangıç ve akışlar | Project context, employer and task-taker flow diagrams, handoff points and screen/API traceability. |
| 01 · Bileşenler | Shared navigation, buttons, forms, cards, badges, photo grid, status notices and confirmation overlays. |
| 02 · Ortak ekranlar | Shared welcome, registration and sign-in. Use separate desktop and mobile sections. |
| 03 · İşveren · Masaüstü | Desktop employer screens and states. |
| 04 · İşveren · Mobil | Mobile employer screens and states. |
| 05 · Görev Alan · Masaüstü | Desktop task-taker screens and states. |
| 06 · Görev Alan · Mobil | Mobile task-taker screens and states. |

Use 1280 px desktop and 390 px mobile reference widths. Give each app route a
dedicated editable base frame at both widths. Put recovery, empty and denied
variants next to the frame they belong to. Name frames with the Turkish screen
label, state and viewport. Put the route, story IDs and draft operations in
non-exported annotations beside the corresponding frame. Reuse the current
palette, mascot and navigation. Use editable text, Auto Layout and reusable
components for the areas reviewers are likely to revise. Pair the front and
rear evidence photos from the same fictional vehicle.

Remove the entire yellow demo header from product frames and close that space.
Remove the demo account picker, reset and demo entry shortcuts from those
frames. Preserve sign-up, sign-in, the employer sidebar, mobile navigation and
simulated-payment copy. Use normal entry screens and Figma flow starting points
for the two role journeys.

### Screen and draft endpoint map

Client routes below use `:taskId` as a placeholder. Draft HTTP paths are relative
to `/api/v1`. Read and write actions within one screen can share a frame and
branch to their expected success or recovery state.

| Client route | Turkish frame | Draft methods and operation IDs |
| --- | --- | --- |
| `/` | Karşılama | Local navigation to account screens. |
| `/signup` | Hesap oluştur | `POST /auth/register` · `registerUser` |
| `/signin` | Giriş yap | `POST /auth/login` · `createSession` |
| `/employer` | İşveren paneli | `GET /tasks` · `listTasks` |
| `/employer/profile` | Profil · İşveren | `GET /me` · `getMyProfile`, `PATCH /me` · `updateMyProfile` |
| `/employer/tasks/new` | Görev oluştur | `POST /tasks` · `createTask` |
| `/employer/tasks/:taskId` | Görev ayrıntıları · İşveren | `GET /tasks/{taskId}` · `getTask`, `GET /tasks/{taskId}/applications` · `listTaskApplications`, `POST /tasks/{taskId}/assignment` · `assignTask`, `POST /tasks/{taskId}/payment-simulation/hold` · `simulatePaymentHold`, `POST /tasks/{taskId}/cancel` · `cancelTask`, `GET /tasks/{taskId}/history` · `getTaskHistory` |
| `/employer/tasks/:taskId/review` | Kanıtları incele | `GET /tasks/{taskId}/evidence` · `listTaskEvidence`, `POST /tasks/{taskId}/review` · `reviewTaskEvidence`, `GET /tasks/{taskId}/history` · `getTaskHistory` |
| `/employer/tasks/:taskId/completed` | Görev tamamlandı | Success from `reviewTaskEvidence`, details via `getTask` and history via `getTaskHistory`. Approval records simulated release in the same action. |
| `/taker` | Görevlerim · Görev Alan | Task list reference `GET /tasks` · `listTasks`. The demo groups applications and assignments locally. |
| `/taker/profile` | Profil · Görev Alan | `GET /me` · `getMyProfile`, `PATCH /me` · `updateMyProfile` |
| `/taker/find` | Görev bul | `GET /tasks` · `listTasks` with open status, city and category filters. |
| `/taker/tasks/:taskId` | Görev ayrıntıları · Görev Alan | `GET /tasks/{taskId}` · `getTask`, `POST /tasks/{taskId}/applications` · `applyForTask`, `GET /tasks/{taskId}/evidence` · `listTaskEvidence`, `GET /tasks/{taskId}/history` · `getTaskHistory` |
| `/taker/tasks/:taskId/evidence` | Kanıt gönder or Kanıtı düzelt | `GET /tasks/{taskId}/evidence` · `listTaskEvidence`, `POST /tasks/{taskId}/evidence` · `submitTaskEvidence` for initial or revised evidence. |

### Connect and verify the two journeys

- **İşveren yolculuğu.** Sign in, see the dashboard, create a permitted task,
  review applicants, assign one, record a simulated hold, review evidence,
  request revision or approve, and see completion and history. Include invalid
  creation, empty applicants, a blank revision reason, read-only completed
  review and eligible cancellation with confirmation.
- **Görev Alan yolculuğu.** Sign in, set a self-declared profile, discover open
  tasks, apply, see the assignment and hold, send private evidence, recover
  from a revision request, resubmit and see completion. Include the missing-city
  recovery, empty discovery, duplicate application, unselected outcome,
  missing hold, photo-limit error and unavailable evidence.
- Show the cross-role handoffs in the flow diagrams and use matching fictional
  task data in both paths. Advance to the next relevant frame when the other
  participant has acted. Preserve the required revision reason, optional
  approval note, 30-day retention copy and participant-only evidence views.
- Play both role flows and check that each button has a plausible destination.
  Verify back navigation, text layout and form error states at both widths.
  Export clean desktop and mobile PNGs for the primary and recovery states.
  Return the editable Figma file URL, the two working starting-point URLs and
  the exports. Verify team access before adding the URLs to the
  [submission index](submissions/sprint-2.md).
  [Figma prototype flow guide](https://help.figma.com/hc/en-us/articles/360039823894-Create-and-manage-prototype-flows)

## Reference evidence

The [19 November prototype](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/76956d71e7eb13d95ef2c5aee558fbd17042b197/prototypes/sprint-2/README.md) preserves the
original [screen catalog](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/76956d71e7eb13d95ef2c5aee558fbd17042b197/prototypes/sprint-2/handoff/screens.json),
[connection matrix](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/76956d71e7eb13d95ef2c5aee558fbd17042b197/prototypes/sprint-2/handoff/connections.csv),
[desktop and mobile captures](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/76956d71e7eb13d95ef2c5aee558fbd17042b197/docs/sprint-2-evidence/ozgur/index.html) and
[capture manifest](https://github.com/ozgurfuruncu/SENG-CuckooApp/blob/76956d71e7eb13d95ef2c5aee558fbd17042b197/docs/sprint-2-evidence/ozgur/capture-manifest.json).
Use the current route map above for the cloned design. Historical captures
are reference material for the [employer](diagrams/sprint-2-ozgur/employer-flow.md)
and [task taker](diagrams/sprint-2-ozgur/task-taker-flow.md) flows.
