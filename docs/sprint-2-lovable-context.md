# Cuckoo Sprint 2 prototype context

## Product and source of truth

Cuckoo is a SENG 321 project for permitted exterior vehicle photographs and
visible observations. An employer posts a task, receives applications, assigns
one task taker, records a simulated hold and reviews private evidence. The
assigned task taker submits evidence and can revise it when requested. The
deliverable is a clickable web prototype for a Figma handoff.

Use the attached storyboard for visual design. Use the rules and operation map
below for workflow, form fields and state. They summarize Cuckoo's OpenAPI
0.2.1-draft and stories US-01 through US-13. Use the final pass instructions for
the evidence design agreed for the demo. US-14 ratings and US-15 suggestions
are deferred.

## Turkish-first interface

Use Turkish for all visible product copy, including navigation, form labels,
validation, empty states, status messages, demo controls and fixture content.
Use `tr-TR` formatting for dates and times. For example, use “İşveren”,
“Görev Alan”, “Görev Oluştur”, “Kanıtları İncele” and “Düzeltme İste”. Name
the Figma screens and annotate both user-flow diagrams in Turkish. Preserve
the draft API operation IDs, enum values and story IDs in the code and
traceability notes.

## Build boundary

- Continue in the existing standalone Lovable project with React, TypeScript
  and Vite.
  Output responsive screens, reusable components, client-side navigation and
  mock interactions. Keep the canonical CuckooApp repository disconnected.
- Feed components from one small typed mock adapter with in-memory fixtures.
  Use the draft operation names and response fields where applicable. A demo
  role switcher changes the active fixture and preserves task progress so both
  participants can walk through the same task. Reset restores the seed data.
- The actual Cuckoo stack uses a FastAPI/Pydantic modular monolith and
  PostgreSQL. Its running application currently exposes health. The business
  operations below describe the target UI contract. Keep the prototype free
  of live HTTP calls, backend setup, Supabase, Lovable Cloud services, real
  accounts, persistent data storage, upload services and payment integrations.
  Use local sample images, demo users and synthetic evidence throughout.
- Use the attached image's mascot, navy dashboard, cards, photo grid and
  confirmation screens. Replace storyboard-only fields or features that fall
  outside this flow. Phone or government ID collection, chat, priority tiers,
  verification badges, professional inspection, custody, driving and real
  payments are outside scope.

## Workflow and state

- Roles are `EMPLOYER` and `TASK_TAKER`. Registration fields are email,
  password and role, with optional operating city at registration. Task takers
  need an operating city to apply. Operating city, occupation and skills are
  self-declared. Occupation and skills are optional.
- Use `VEHICLE_PHOTO_CHECK` as the only task category. Creating a task needs
  `title`, `description`, `city`, `category`, `proposedCompensation`,
  `requiredEvidence` and `permissionConfirmed: true`. `requestedBy` is an
  optional date-time deadline. The employer acknowledges that permission from
  the vehicle owner and location must be secured. The listing amount is
  illustrative.
- A task taker can apply once per open task, with an optional note. Only the
  task owner sees the applicant list and selects one applicant. Assignment
  moves the task from `OPEN` to `ASSIGNED`. A simulated hold is a separate
  action by the task owner while the task is assigned.
- Only the assigned task taker can submit evidence after the hold. Simulate
  selecting 1–5 sample photos and entering notes of 10–2,000 characters. The
  task moves to `EVIDENCE_SUBMITTED`. For the demo, show the photo gallery to
  the task owner and assigned task taker. Show an unavailable state to others.
- In the review demo, the task owner can request revision in
  `EVIDENCE_SUBMITTED` with `HELD_SIMULATED` and a nonblank revision reason up to
  500 characters. On revision, the task enters `REVISION_REQUESTED`. Resubmission
  by the assigned task taker returns it to `EVIDENCE_SUBMITTED`. Approval notes
  are optional. Approval from submitted evidence with a simulated hold moves
  the task to `COMPLETED` and records the simulated release in the same step.
- Under the draft cancellation policy, the task owner can cancel in `OPEN`
  or `ASSIGNED` only. Set the task to `CANCELLED` and void an existing hold.
  Repeated terminal actions show a conflict and leave the demo state intact.
- Keep `paymentSimulationStatus` separate from task `status`. Payment values
  are `NOT_HELD`, `HELD_SIMULATED`, `RELEASED_SIMULATED` and `VOIDED_SIMULATED`.
  Display “Gerçek para transferi yapılmaz.” Capture evidence and task history locally.

## Final Lovable pass

Polish the current Cuckoo frontend in place for the Sprint 2 Figma handoff.
Preserve the existing layout, pages, Turkish language, and role-switchable mock
workflow. In the demo bar, show **Sprint 2 prototipi · Örnek veriler** in place
of the **Açık kararlar** panel. Apply the rules and copy on the screens listed
below. Keep the work in the browser with bundled fixtures and in-memory state.
Retain this demo header on the Lovable-derived Figma frames.

| Screen or action | Behavior and exact Turkish copy |
| --- | --- |
| Employer review | The owner can choose **Düzeltme iste** only after evidence is submitted and the simulated hold is active. Under **İnceleme notu**, show **Düzeltme için gerekçe zorunludur. Onay için not isteğe bağlıdır.** A blank or whitespace-only revision reason shows **Düzeltme gerekçesini yazın.** Trim the input, limit it to 500 characters, and show the reason to the assigned task taker. A rejected action leaves the original state intact. |
| Task taker revision | Show **Düzeltme istendi** and the employer’s reason. **Kanıtı düzelt** returns the assigned task taker to the evidence form. A valid resubmission returns the task to review with the hold still active. Keep completed reviews read-only. |
| Evidence viewing | Keep the private gallery inside the task view, with **Kanıtlar yalnızca uygulama içinde görüntülenir.** Use the viewing flow in Figma. Omit the download control. |
| Evidence submission | Show **JPEG veya PNG · 1–5 fotoğraf · Fotoğraf başına en fazla 10 MiB · Gönderim başına en fazla 50 MiB.** Reuse bundled sample photos and show any size-limit error using synthetic fixture metadata. Keep the existing 10–2,000-character observation note. |
| Retention | Near the private gallery, show **Kanıtlar ve gözlem notları, görev tamamlandıktan veya iptal edildikten 30 gün sonra silinir.** Represent this as demo policy copy. |
| Evidence visibility | The owning employer and assigned task taker can see the gallery and evidence notes. Unselected and unrelated demo accounts get **Bu görevin kanıtlarına erişiminiz yok.** Their view omits private photos, notes and links. Keep the visible lifecycle history free of private note and file content. |

Check blank and valid revision reasons, resubmission, approval with a blank
optional note, and an unrelated viewer on the same task. Verify the review and
evidence submission screens at desktop and mobile widths. Capture the successful
and recovery states for both Figma prototype starting points.

## Screen-to-contract map

These paths are references under `/api/v1`. Call the local mock functions
when a screen needs data or an action. Keep demo-only fields such as local
photo previews outside the draft response types.

| Stories | Screen or action | Operation ID and draft route |
| --- | --- | --- |
| US-01 | Sign up and sign in | `registerUser` `POST /auth/register`, `createSession` `POST /auth/login` |
| US-01/02 | View or edit profile | `getMyProfile` `GET /me`, `updateMyProfile` `PATCH /me` |
| US-03 | Create vehicle photo task | `createTask` `POST /tasks` |
| US-04 | Browse open tasks and view task details | `listTasks` `GET /tasks`, `getTask` `GET /tasks/{taskId}` |
| US-05/06 | Apply, review applicants and assign one | `applyForTask` `POST /tasks/{taskId}/applications`, `listTaskApplications` `GET /tasks/{taskId}/applications`, `assignTask` `POST /tasks/{taskId}/assignment` |
| US-07 | Record simulated hold | `simulatePaymentHold` `POST /tasks/{taskId}/payment-simulation/hold` |
| US-08/09/13 | Submit, resubmit or view evidence metadata | `submitTaskEvidence` `POST /tasks/{taskId}/evidence`, `listTaskEvidence` `GET /tasks/{taskId}/evidence` |
| US-09/10 | Request revision or approve and complete | `reviewTaskEvidence` `POST /tasks/{taskId}/review` |
| US-11 | Cancel eligible task | `cancelTask` `POST /tasks/{taskId}/cancel` |
| US-12 | Participant history | `getTaskHistory` `GET /tasks/{taskId}/history` |

## Definition of done for the Lovable preview

Walk through one shared task from posting to completion using both demo roles.
Demonstrate the revision loop, an eligible cancellation, and blocked actions
for duplicate application, missing hold and unrelated viewers. Show accessible
form feedback, readable mobile and desktop layouts, and named screens for Figma
capture. Prioritize Evidence Review at both widths for the import trial. Keep
the output runnable in the preview with bundled fixtures and record the final
design file and both working flow URLs once verified.
