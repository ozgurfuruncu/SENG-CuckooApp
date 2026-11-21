import assert from "node:assert/strict";
import test from "node:test";

import * as api from "../src/mock/api.ts";
import { formatDateTime, formatMoney } from "../src/mock/format.ts";
import { MIB, validatePhotoSelection } from "../src/mock/photo-fixtures.ts";
import { createSeed } from "../src/mock/seed.ts";
import type { ApiErrorCode, DemoState, Result } from "../src/mock/types.ts";

const owner = "u-deniz";
const taker = "u-sarah";
const taskId = "t-ankara";
const evidence = {
  photoRefs: ["front", "rear"],
  notes: "Arka tamponda ince çizik görülüyor.",
};
const taskInput: api.CreateTaskInput = {
  title: "Araç dış fotoğrafları",
  description: "Park hâlindeki beyaz aracın ön ve arkasını fotoğraflayın.",
  city: "Ankara",
  category: "VEHICLE_PHOTO_CHECK",
  proposedCompensation: "0",
  requiredEvidence: "Ön ve arka fotoğraflar",
  permissionConfirmed: true,
  requestedBy: "",
};

function success<T>(result: Result<T>) {
  assert(result.ok, result.ok ? undefined : result.error.message);
  return result;
}

function reject<T>(
  state: DemoState,
  code: ApiErrorCode,
  action: () => Result<T>,
) {
  const before = structuredClone(state);
  const result = action();
  assert(!result.ok);
  assert.equal(result.error.code, code);
  assert.deepEqual(state, before);
  return result.error;
}

function assigned() {
  return success(
    api.assignTask(createSeed(), owner, taskId, { applicationId: "a-1" }),
  ).state;
}

function held() {
  return success(api.simulatePaymentHold(assigned(), owner, taskId)).state;
}

function submitted() {
  return success(api.submitTaskEvidence(held(), taker, taskId, evidence)).state;
}

test("creates an open task with zero illustrative compensation and no held payment", () => {
  const response = success(api.createTask(createSeed(), owner, taskInput));
  assert.equal(response.data.status, "OPEN");
  assert.equal(response.data.paymentSimulationStatus, "NOT_HELD");
  assert.equal(response.data.assignedTaskTakerId, null);
  assert.equal(response.data.proposedCompensation, 0);
  assert.equal(response.data.requestedBy, null);
});

test("rejects task creation without employer role, consent or valid field limits", () => {
  const state = createSeed();
  reject(state, "FORBIDDEN", () => api.createTask(state, taker, taskInput));
  const invalid = {
    ...taskInput,
    title: "4444",
    description: "x".repeat(19),
    requiredEvidence: "x".repeat(1001),
    permissionConfirmed: false,
    proposedCompensation: "-1",
  };
  const error = reject(state, "VALIDATION_ERROR", () =>
    api.createTask(state, owner, invalid),
  );
  assert.deepEqual(Object.keys(error.fields ?? {}).sort(), [
    "description",
    "permissionConfirmed",
    "proposedCompensation",
    "requiredEvidence",
    "title",
  ]);
  for (const [title, description] of [
    ["x".repeat(5), "x".repeat(20)],
    ["x".repeat(150), "x".repeat(2000)],
  ]) {
    assert(
      api.createTask(state, owner, { ...taskInput, title, description }).ok,
    );
  }
  reject(state, "VALIDATION_ERROR", () =>
    api.createTask(state, owner, { ...taskInput, title: "x".repeat(151) }),
  );
  reject(state, "VALIDATION_ERROR", () =>
    api.createTask(state, owner, {
      ...taskInput,
      description: "x".repeat(2001),
    }),
  );
});

test("validates demo registration and self-declared profile fields", () => {
  const state = createSeed();
  const signup = {
    email: "demet@example.test",
    password: "demo-only",
    role: "TASK_TAKER" as const,
  };
  reject(state, "VALIDATION_ERROR", () =>
    api.registerUser(state, { ...signup, operatingCity: "A" }),
  );
  const registration = success(api.registerUser(state, signup));
  assert.equal(registration.data.operatingCity, null);
  assert.equal("password" in registration.data, false);
  const invalid = {
    operatingCity: "x".repeat(101),
    occupation: "x".repeat(101),
    skills: "x".repeat(61),
  };
  assert.deepEqual(
    Object.keys(
      reject(state, "VALIDATION_ERROR", () =>
        api.updateMyProfile(state, taker, invalid),
      ).fields ?? {},
    ).sort(),
    ["occupation", "operatingCity", "skills"],
  );
  reject(state, "VALIDATION_ERROR", () =>
    api.updateMyProfile(state, taker, {
      ...invalid,
      operatingCity: "",
      occupation: "",
      skills: Array(11).fill("Fotoğraf").join(","),
    }),
  );
  const profile = success(
    api.updateMyProfile(state, taker, {
      operatingCity: "Ankara",
      occupation: "",
      skills: "Fotoğraf,\n Gözlem",
    }),
  );
  assert.equal(profile.data.skills, "Fotoğraf, Gözlem");
});

test("limits applications to open tasks and eligible takers with a declared city", () => {
  const state = createSeed();
  reject(state, "FORBIDDEN", () =>
    api.applyForTask(state, owner, taskId, { note: "" }),
  );
  reject(state, "PROFILE_INCOMPLETE", () =>
    api.applyForTask(state, "u-ece", taskId, { note: "" }),
  );
  reject(state, "CONFLICT", () =>
    api.applyForTask(state, taker, taskId, { note: "" }),
  );
  reject(state, "VALIDATION_ERROR", () =>
    api.applyForTask(state, taker, "t-istanbul", { note: "x".repeat(501) }),
  );
  const inProgress = assigned();
  reject(inProgress, "CONFLICT", () =>
    api.applyForTask(inProgress, taker, "t-cankaya", { note: "" }),
  );
});

test("protects applicant lists, assignment and the simulated hold", () => {
  const state = createSeed();
  reject(state, "FORBIDDEN", () =>
    api.listTaskApplications(state, taker, taskId),
  );
  reject(state, "FORBIDDEN", () =>
    api.assignTask(state, "u-kerem", taskId, { applicationId: "a-1" }),
  );
  reject(state, "NOT_FOUND", () =>
    api.assignTask(state, owner, taskId, { applicationId: "a-3" }),
  );
  reject(state, "CONFLICT", () =>
    api.simulatePaymentHold(state, owner, taskId),
  );
  const selected = assigned();
  reject(selected, "CONFLICT", () =>
    api.assignTask(selected, owner, taskId, { applicationId: "a-2" }),
  );
  reject(selected, "FORBIDDEN", () =>
    api.simulatePaymentHold(selected, taker, taskId),
  );
  const confirmed = held();
  reject(confirmed, "CONFLICT", () =>
    api.simulatePaymentHold(confirmed, owner, taskId),
  );
});

test("requires an assigned taker, an active hold, and valid photo and note counts", () => {
  const selected = assigned();
  reject(selected, "HOLD_REQUIRED", () =>
    api.submitTaskEvidence(selected, taker, taskId, evidence),
  );
  const confirmed = held();
  reject(confirmed, "FORBIDDEN", () =>
    api.submitTaskEvidence(confirmed, "u-mert", taskId, evidence),
  );
  for (const count of [0, 6]) {
    reject(confirmed, "VALIDATION_ERROR", () =>
      api.submitTaskEvidence(confirmed, taker, taskId, {
        ...evidence,
        photoRefs: Array(count).fill("front"),
      }),
    );
  }
  for (const count of [9, 2001]) {
    reject(confirmed, "VALIDATION_ERROR", () =>
      api.submitTaskEvidence(confirmed, taker, taskId, {
        ...evidence,
        notes: "x".repeat(count),
      }),
    );
  }
  assert(
    api.submitTaskEvidence(confirmed, taker, taskId, {
      photoRefs: ["front"],
      notes: "x".repeat(10),
    }).ok,
  );
  assert(
    api.submitTaskEvidence(confirmed, taker, taskId, {
      photoRefs: ["front", "rear", "left", "right", "bumper"],
      notes: "x".repeat(2000),
    }).ok,
  );
});

test("exposes evidence, history and revision notes only to demo participants", () => {
  const state = submitted();
  const note = "Arka tamponu yakından fotoğraflayın.";
  const revised = success(
    api.reviewTaskEvidence(state, owner, taskId, {
      decision: "REQUEST_REVISION",
      note,
    }),
  ).state;
  for (const actor of [owner, taker]) {
    assert.equal(
      success(api.listTaskEvidence(revised, actor, taskId)).data[0].notes,
      evidence.notes,
    );
    assert.equal(
      success(api.getTask(revised, taskId, actor)).data.lastReviewNote,
      note,
    );
    const history = success(api.getTaskHistory(revised, actor, taskId)).data;
    assert(history.some((event) => event.type === "REVISION_REQUESTED"));
    assert(!history.some((event) => event.message.includes(note)));
  }
  for (const actor of ["u-mert", "u-kerem", null]) {
    reject(revised, "FORBIDDEN", () =>
      api.listTaskEvidence(revised, actor, taskId),
    );
    reject(revised, "FORBIDDEN", () =>
      api.getTaskHistory(revised, actor, taskId),
    );
    assert.equal(
      success(api.getTask(revised, taskId, actor)).data.lastReviewNote,
      null,
    );
  }
  assert.equal(
    api.listTasks(revised).find((task) => task.id === taskId)?.lastReviewNote,
    null,
  );
});

test("requires a trimmed revision reason and active hold, with approval notes optional", () => {
  const state = submitted();
  reject(state, "FORBIDDEN", () =>
    api.reviewTaskEvidence(state, taker, taskId, { decision: "APPROVE" }),
  );
  for (const decision of ["APPROVE", "REQUEST_REVISION"] as const) {
    reject(state, "VALIDATION_ERROR", () =>
      api.reviewTaskEvidence(state, owner, taskId, {
        decision,
        note: "x".repeat(501),
      }),
    );
  }
  for (const note of [undefined, "", "  \n  "]) {
    const error = reject(state, "VALIDATION_ERROR", () =>
      api.reviewTaskEvidence(state, owner, taskId, {
        decision: "REQUEST_REVISION",
        note,
      }),
    );
    assert.equal(error.fields?.note, "Düzeltme gerekçesini yazın.");
  }
  const noHold = {
    ...state,
    tasks: state.tasks.map((task) =>
      task.id === taskId
        ? { ...task, paymentSimulationStatus: "NOT_HELD" as const }
        : task,
    ),
  };
  reject(noHold, "HOLD_REQUIRED", () =>
    api.reviewTaskEvidence(noHold, owner, taskId, {
      decision: "REQUEST_REVISION",
      note: "Tamponu tekrar çekin.",
    }),
  );
  const revised = success(
    api.reviewTaskEvidence(state, owner, taskId, {
      decision: "REQUEST_REVISION",
      note: "  Tamponu tekrar çekin.  ",
    }),
  );
  assert.equal(revised.data.lastReviewNote, "Tamponu tekrar çekin.");
  assert.equal(revised.data.paymentSimulationStatus, "HELD_SIMULATED");
  assert.equal(
    success(
      api.reviewTaskEvidence(state, owner, taskId, { decision: "APPROVE" }),
    ).data.status,
    "COMPLETED",
  );
});

test("checks bundled photo metadata before adding private evidence to the demo", () => {
  const state = held();
  const sizeError = reject(state, "VALIDATION_ERROR", () =>
    api.submitTaskEvidence(state, taker, taskId, {
      ...evidence,
      photoRefs: ["front", "bumper-raw"],
    }),
  );
  assert.match(sizeError.fields?.photos ?? "", /10 MiB/);
  reject(state, "VALIDATION_ERROR", () =>
    api.submitTaskEvidence(state, taker, taskId, {
      ...evidence,
      photoRefs: ["missing-photo"],
    }),
  );
  const fixtures = Array.from({ length: 5 }, (_, index) => ({
    ref: String(index),
    label: String(index),
    mimeType: "image/jpeg",
    sizeBytes: 10 * MIB,
  }));
  assert.equal(
    validatePhotoSelection(
      fixtures.map((fixture) => fixture.ref),
      fixtures,
    ),
    null,
  );
  assert.match(
    validatePhotoSelection(
      ["0"],
      [{ ...fixtures[0], mimeType: "image/heic" }],
    ) ?? "",
    /JPEG veya PNG/,
  );
});

test("runs the new-task journey through application, revision and atomic demo completion", () => {
  const created = success(api.createTask(createSeed(), owner, taskInput));
  const id = created.data.id;
  const applied = success(
    api.applyForTask(created.state, taker, id, {
      note: "Öğleden sonra gidebilirim.",
    }),
  );
  const selected = success(
    api.assignTask(applied.state, owner, id, {
      applicationId: applied.data.id,
    }),
  );
  const hold = success(api.simulatePaymentHold(selected.state, owner, id));
  const first = success(
    api.submitTaskEvidence(hold.state, taker, id, evidence),
  );
  const revised = success(
    api.reviewTaskEvidence(first.state, owner, id, {
      decision: "REQUEST_REVISION",
      note: "Tamponu yakın çekin.",
    }),
  );
  const resubmitted = success(
    api.submitTaskEvidence(revised.state, taker, id, {
      ...evidence,
      photoRefs: ["bumper"],
    }),
  );
  assert.equal(resubmitted.data.version, 2);
  const complete = success(
    api.reviewTaskEvidence(resubmitted.state, owner, id, {
      decision: "APPROVE",
    }),
  );
  assert.equal(complete.data.status, "COMPLETED");
  assert.equal(complete.data.paymentSimulationStatus, "RELEASED_SIMULATED");
  assert.deepEqual(
    complete.state.history.slice(-2).map((event) => event.type),
    ["EVIDENCE_APPROVED", "PAYMENT_RELEASED"],
  );
  reject(complete.state, "CONFLICT", () =>
    api.reviewTaskEvidence(complete.state, owner, id, { decision: "APPROVE" }),
  );
});

test("cancels eligible tasks and voids an existing simulated hold", () => {
  const open = success(api.cancelTask(createSeed(), owner, taskId));
  assert.equal(open.data.paymentSimulationStatus, "NOT_HELD");
  const state = held();
  reject(state, "FORBIDDEN", () => api.cancelTask(state, taker, taskId));
  const cancelled = success(api.cancelTask(state, owner, taskId));
  assert.equal(cancelled.data.status, "CANCELLED");
  assert.equal(cancelled.data.paymentSimulationStatus, "VOIDED_SIMULATED");
  reject(cancelled.state, "CONFLICT", () =>
    api.cancelTask(cancelled.state, owner, taskId),
  );
  const review = submitted();
  reject(review, "CONFLICT", () => api.cancelTask(review, owner, taskId));
});

test("formats Turkish dates in Istanbul and money in TRY", () => {
  assert.match(formatDateTime("2026-11-20T09:00:00.000Z"), /12:00/u);
  assert.match(formatMoney(1250.5), /1\.250,5/u);
});
