import { test } from "node:test";
import assert from "node:assert/strict";
import {
  MockAdapter,
  DemoError,
  DEMO_PASSWORD,
  samplePhotos,
} from "../src/model.ts";
import type { NewTask } from "../src/model.ts";
const input = (): NewTask => ({
  title: "Çankaya araç fotoğrafları",
  description:
    "İzin alınmış park halindeki aracın dört dış açıdan fotoğrafları.",
  city: "Ankara",
  category: "VEHICLE_PHOTO_CHECK",
  proposedCompensation: 450,
  requiredEvidence: "Dört dış açı ve görünür ayrıntı notu",
  permissionConfirmed: true,
});
function asEmployer() {
  const a = new MockAdapter();
  a.switchDemoUser("employer");
  return a;
}
function rejected(fn: () => unknown, status: number, code?: string) {
  assert.throws(
    fn,
    (e: unknown) =>
      e instanceof DemoError &&
      e.status === status &&
      (!code || e.code === code),
  );
}
function ready() {
  const a = asEmployer();
  const t = a.createTask(input());
  a.switchDemoUser("worker");
  a.updateMyProfile({ operatingCity: "Ankara", occupation: null, skills: [] });
  const application = a.applyForTask(t.id);
  a.switchDemoUser("employer");
  a.assignTask(t.id, application.id);
  return { a, id: t.id };
}
function unchanged(
  a: MockAdapter,
  id: string,
  fn: () => unknown,
  status: number,
  code?: string,
) {
  const before = a.getTask(id);
  rejected(fn, status, code);
  assert.deepEqual(a.getTask(id), before);
}
test("US-01: protected operations require a local demo session", () => {
  const a = new MockAdapter();
  for (const op of [
    () => a.getMyProfile(),
    () => a.listTasks(),
    () => a.getTask("TASK-101"),
    () => a.createTask(input()),
    () => a.listTaskEvidence("TASK-102"),
    () => a.getTaskHistory("TASK-102"),
  ])
    rejected(op, 401);
});
test("US-01: failed login preserves session; demo register rejects real passwords and duplicate addresses", () => {
  const a = new MockAdapter();
  rejected(
    () => a.createSession({ email: "deniz@example.test", password: "wrong" }),
    401,
  );
  assert.equal(a.currentUser(), null);
  a.createSession({ email: "deniz@example.test", password: DEMO_PASSWORD });
  assert.equal(a.getMyProfile().role, "EMPLOYER");
  rejected(
    () =>
      a.registerUser({
        email: "deniz@example.test",
        password: DEMO_PASSWORD,
        role: "EMPLOYER",
      }),
    409,
  );
  rejected(
    () =>
      a.registerUser({
        email: "someone@gmail.com",
        password: DEMO_PASSWORD,
        role: "EMPLOYER",
      }),
    400,
  );
  rejected(
    () =>
      a.registerUser({
        email: "ornek@example.test",
        password: "a real secret",
        role: "EMPLOYER",
      }),
    400,
  );
  assert.equal(
    a.registerUser({
      email: "ornek@example.test",
      password: DEMO_PASSWORD,
      role: "TASK_TAKER",
    }).selfDeclared,
    true,
  );
  a.logout();
  assert.equal(a.currentUser(), null);
});
test("US-02/05: city is required to apply, optional occupation/skills remain optional and self-declared", () => {
  const a = asEmployer();
  a.switchDemoUser("worker");
  unchanged(
    a,
    "TASK-101",
    () => a.applyForTask("TASK-101"),
    400,
    "CITY_REQUIRED",
  );
  a.updateMyProfile({ operatingCity: "Ankara", occupation: null, skills: [] });
  assert.equal(a.getMyProfile().selfDeclared, true);
  assert.equal(a.getMyProfile().occupation, null);
  assert.equal(a.applyForTask("TASK-101").workerId, "worker");
});
for (const invalid of [
  { operatingCity: "A", occupation: null, skills: [] },
  { operatingCity: "Ankara", occupation: "x".repeat(101), skills: [] },
  { operatingCity: "Ankara", occupation: null, skills: Array(11).fill("a") },
  { operatingCity: "Ankara", occupation: null, skills: ["x".repeat(61)] },
])
  test(`US-02: profile rejects invalid bounds ${JSON.stringify(invalid).slice(0, 80)}`, () => {
    const a = asEmployer();
    const before = a.getMyProfile();
    rejected(() => a.updateMyProfile(invalid), 400);
    assert.deepEqual(a.getMyProfile(), before);
  });
test("US-03: task ownership derives from session; starts open without hold", () => {
  const a = asEmployer();
  const t = a.createTask(input());
  assert.equal(t.employerId, "employer");
  assert.equal(t.status, "OPEN");
  assert.equal(t.paymentSimulationStatus, "NOT_HELD");
  assert.equal(t.assignedWorkerId, null);
});
for (const change of [
  { title: "abcd" },
  { title: "x".repeat(151) },
  { description: "short" },
  { description: "x".repeat(2001) },
  { city: "" },
  { requiredEvidence: "" },
  { requiredEvidence: "x".repeat(1001) },
  { proposedCompensation: -1 },
  { proposedCompensation: NaN },
  { permissionConfirmed: false },
  { requestedBy: "bad date" },
  { category: "INSPECTION" },
])
  test(`US-03: invalid create does not create a task: ${Object.keys(change)[0]} ${String(Object.values(change)[0]).slice(0, 15)}`, () => {
    const a = asEmployer();
    const before = a.listTasks();
    rejected(() => a.createTask({ ...input(), ...change } as NewTask), 400);
    assert.deepEqual(a.listTasks(), before);
  });
test("US-03: zero amount is allowed; task takers cannot create", () => {
  const a = asEmployer();
  assert.equal(
    a.createTask({ ...input(), proposedCompensation: 0 }).proposedCompensation,
    0,
  );
  a.switchDemoUser("worker");
  rejected(() => a.createTask(input()), 403);
});
test("US-04: city/status/search filters and empty results", () => {
  const a = asEmployer();
  const r = a.listTasks({ city: "Ankara", status: "OPEN", search: "ÇANKAYA" });
  assert.deepEqual(
    r.map((t) => t.id),
    ["TASK-101"],
  );
  assert.deepEqual(a.listTasks({ city: "Antalya", status: "OPEN" }), []);
  rejected(() => a.getTask("missing"), 404);
});
test("US-05: duplicate applications, closed tasks, wrong role, long notes rejected without task changes", () => {
  const a = asEmployer();
  unchanged(a, "TASK-101", () => a.applyForTask("TASK-101"), 403);
  a.switchDemoUser("candidate");
  unchanged(
    a,
    "TASK-101",
    () => a.applyForTask("TASK-101"),
    409,
    "ALREADY_APPLIED",
  );
  unchanged(a, "TASK-102", () => a.applyForTask("TASK-102"), 409);
  unchanged(
    a,
    "TASK-105",
    () => a.applyForTask("TASK-105", "a".repeat(501)),
    400,
  );
  assert.equal(a.listMyApplications().length, 1);
});
test("US-06: applicant must belong to task; only owner can list/assign; repeated assignment conflicts", () => {
  const a = asEmployer();
  unchanged(a, "TASK-101", () => a.assignTask("TASK-101", "missing"), 400);
  const app = a.listTaskApplications("TASK-101")[0];
  a.switchDemoUser("other-employer");
  rejected(() => a.listTaskApplications("TASK-101"), 403);
  unchanged(a, "TASK-101", () => a.assignTask("TASK-101", app.id), 403);
  a.switchDemoUser("employer");
  a.assignTask("TASK-101", app.id);
  unchanged(a, "TASK-101", () => a.assignTask("TASK-101", app.id), 409);
  assert.equal(a.getTask("TASK-101").assignedWorkerId, "candidate");
});
test("US-07: only owner can hold assigned task once; no bank/card fields", () => {
  const { a, id } = ready();
  a.switchDemoUser("worker");
  unchanged(a, id, () => a.simulatePaymentHold(id), 403);
  a.switchDemoUser("employer");
  unchanged(a, "TASK-101", () => a.simulatePaymentHold("TASK-101"), 409);
  assert.deepEqual(a.simulatePaymentHold(id), {
    taskId: id,
    status: "HELD_SIMULATED",
    disclaimer: "No real money is moved.",
  });
  unchanged(a, id, () => a.simulatePaymentHold(id), 409);
});
test("US-08: only assigned worker after hold may submit", () => {
  const { a, id } = ready();
  const ev = { photos: ["on"], notes: "Yeterli örnek açıklama." };
  unchanged(a, id, () => a.submitTaskEvidence(id, ev), 403);
  a.switchDemoUser("worker");
  unchanged(a, id, () => a.submitTaskEvidence(id, ev), 409, "HOLD_REQUIRED");
  a.switchDemoUser("employer");
  a.simulatePaymentHold(id);
  a.switchDemoUser("other");
  unchanged(a, id, () => a.submitTaskEvidence(id, ev), 403);
});
for (const ev of [
  { photos: [], notes: "Geçerli açıklama notu" },
  { photos: [...samplePhotos, "on"], notes: "Geçerli açıklama notu" },
  { photos: ["on", "on"], notes: "Geçerli açıklama notu" },
  {
    photos: ["https://external.test/private.jpg"],
    notes: "Geçerli açıklama notu",
  },
  { photos: ["on"], notes: "çok kısa" },
  { photos: ["on"], notes: "x".repeat(2001) },
])
  test(`US-08: evidence rejects invalid photos/notes ${ev.photos.join(",")} / ${ev.notes.length}`, () => {
    const { a, id } = ready();
    a.simulatePaymentHold(id);
    a.switchDemoUser("worker");
    unchanged(a, id, () => a.submitTaskEvidence(id, ev), 400);
    assert.deepEqual(a.listTaskEvidence(id), []);
  });
test("US-08/09/10/12: shared journey revises, resubmits, atomically completes/releases with audit events", () => {
  const { a, id } = ready();
  a.simulatePaymentHold(id);
  a.switchDemoUser("worker");
  a.submitTaskEvidence(id, {
    photos: ["on", "arka"],
    notes: "İzinli örnek dış görünüm fotoğrafları.",
  });
  a.switchDemoUser("employer");
  a.reviewTaskEvidence(id, {
    decision: "REQUEST_REVISION",
    note: "Sol görünümü de ekle.",
  });
  assert.equal(a.getTask(id).status, "REVISION_REQUESTED");
  assert.equal(a.getTask(id).paymentSimulationStatus, "HELD_SIMULATED");
  a.switchDemoUser("worker");
  a.submitTaskEvidence(id, {
    photos: ["on", "arka", "sol"],
    notes: "Sol görünüm eklendi. Örnekler tamamlandı.",
  });
  assert.equal(a.listTaskEvidence(id).length, 2);
  a.switchDemoUser("employer");
  a.reviewTaskEvidence(id, { decision: "APPROVE" });
  const t = a.getTask(id);
  assert.equal(t.status, "COMPLETED");
  assert.equal(t.paymentSimulationStatus, "RELEASED_SIMULATED");
  assert.deepEqual(
    a.getTaskHistory(id).map((e) => e.action),
    [
      "CREATED",
      "ASSIGNED",
      "HELD_SIMULATED",
      "EVIDENCE_SUBMITTED",
      "REVISION_REQUESTED",
      "EVIDENCE_SUBMITTED",
      "COMPLETED",
    ],
  );
  unchanged(
    a,
    id,
    () => a.reviewTaskEvidence(id, { decision: "APPROVE" }),
    409,
  );
  assert.equal(
    a.getTaskHistory(id).filter((e) => e.action === "COMPLETED").length,
    1,
  );
});
test("US-09: only owner reviews; invalid review and oversized notes leave task/evidence intact", () => {
  const a = asEmployer();
  a.switchDemoUser("worker");
  unchanged(
    a,
    "TASK-102",
    () => a.reviewTaskEvidence("TASK-102", { decision: "APPROVE" }),
    403,
  );
  a.switchDemoUser("employer");
  unchanged(
    a,
    "TASK-102",
    () =>
      a.reviewTaskEvidence("TASK-102", {
        decision: "REQUEST_REVISION",
        note: "x".repeat(501),
      }),
    400,
  );
  unchanged(
    a,
    "TASK-101",
    () => a.reviewTaskEvidence("TASK-101", { decision: "APPROVE" }),
    409,
  );
  assert.equal(a.listTaskEvidence("TASK-102").length, 1);
});
test("US-11: cancel open or assigned; void held simulation; reject repeated terminal changes", () => {
  const a = asEmployer();
  assert.equal(a.cancelTask("TASK-101").paymentSimulationStatus, "NOT_HELD");
  a.simulatePaymentHold("TASK-103");
  assert.equal(
    a.cancelTask("TASK-103").paymentSimulationStatus,
    "VOIDED_SIMULATED",
  );
  for (const id of ["TASK-101", "TASK-102", "TASK-103", "TASK-104"])
    unchanged(a, id, () => a.cancelTask(id), 409);
  a.switchDemoUser("worker");
  unchanged(a, "TASK-105", () => a.cancelTask("TASK-105"), 403);
});
test("US-13: owner and assignee only; applicant/other users denied metadata, previews and history", () => {
  const a = asEmployer();
  assert.equal(a.listTaskEvidence("TASK-102").length, 1);
  assert.equal(a.evidencePreviews("TASK-102", "EVD-1").length, 4);
  a.switchDemoUser("worker");
  assert.ok(a.getTaskHistory("TASK-102").length);
  for (const id of ["candidate", "other", "other-employer"]) {
    a.switchDemoUser(id);
    for (const op of [
      () => a.listTaskEvidence("TASK-102"),
      () => a.evidencePreviews("TASK-102", "EVD-1"),
      () => a.getTaskHistory("TASK-102"),
    ])
      rejected(op, 403);
  }
  a.switchDemoUser("candidate");
  rejected(() => a.getTaskHistory("TASK-101"), 403);
});
test("returned data is detached and role changes retain progress; reset clears it", () => {
  const a = asEmployer();
  const t = a.getTask("TASK-101");
  t.status = "COMPLETED";
  assert.equal(a.getTask("TASK-101").status, "OPEN");
  a.cancelTask("TASK-101");
  a.switchDemoUser("worker");
  assert.equal(a.getTask("TASK-101").status, "CANCELLED");
  a.reset();
  assert.equal(a.currentUser(), null);
  a.switchDemoUser("employer");
  assert.equal(a.getTask("TASK-101").status, "OPEN");
});
