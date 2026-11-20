// In-memory prototype adapter. Function names mirror draft operation IDs under /api/v1.
import type {
  Application,
  ApiError,
  DemoState,
  Evidence,
  HistoryEvent,
  Result,
  Role,
  Task,
  TaskCategory,
  TaskStatus,
  User,
} from "./types";

const ok = <T>(state: DemoState, data: T): Result<T> => ({
  ok: true,
  state,
  data,
});
const fail = (
  code: ApiError["code"],
  message: string,
  fields?: Record<string, string>,
): Result<never> => ({
  ok: false,
  error: fields ? { code, message, fields } : { code, message },
});
const now = () => new Date().toISOString();
const fixFields = "İşaretli alanları kontrol edin.";
const missingTask = "Bu görev artık mevcut değil.";
const cityError = "Çalışma şehri 2–100 karakter olmalı.";
const validCity = (city: string) =>
  !city || (city.length >= 2 && city.length <= 100);

function nextId(s: DemoState, prefix: string): [DemoState, string] {
  const seq = s.seq + 1;
  return [{ ...s, seq }, `${prefix}-${seq}`];
}

function addHistory(
  s: DemoState,
  taskId: string,
  actorId: string,
  type: string,
  message: string,
): DemoState {
  const [s2, id] = nextId(s, "h");
  const ev: HistoryEvent = { id, taskId, actorId, type, message, at: now() };
  return { ...s2, history: [...s2.history, ev] };
}

function patchTask(s: DemoState, id: string, patch: Partial<Task>): DemoState {
  return {
    ...s,
    tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
  };
}

const findUser = (s: DemoState, id: string | null) =>
  s.users.find((u) => u.id === id);
const userName = (s: DemoState, id: string | null) =>
  findUser(s, id)?.displayName ?? "Bilinmeyen kullanıcı";

/** Owner and assigned task taker are the only participants who see private evidence and history. */
export function isParticipant(task: Task, actorId: string | null): boolean {
  return (
    !!actorId &&
    (task.ownerId === actorId || task.assignedTaskTakerId === actorId)
  );
}

// ---------- US-01 ----------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function registerUser(
  s: DemoState,
  input: {
    email: string;
    password: string;
    role: Role | "";
    operatingCity?: string;
  },
): Result<User> {
  const fields: Record<string, string> = {};
  const email = input.email.trim().toLowerCase();
  const operatingCity = input.operatingCity?.trim() ?? "";
  if (!EMAIL_RE.test(email))
    fields["email"] = "Geçerli bir e-posta adresi girin.";
  if (input.password.length < 8)
    fields["password"] = "En az 8 karakter kullanın.";
  if (input.role !== "EMPLOYER" && input.role !== "TASK_TAKER")
    fields["role"] = "İşveren veya Görev Alan rolünü seçin.";
  if (!validCity(operatingCity)) fields["operatingCity"] = cityError;
  if (Object.keys(fields).length)
    return fail("VALIDATION_ERROR", fixFields, fields);
  if (s.users.some((u) => u.email === email))
    return fail(
      "CONFLICT",
      "Bu e-posta adresiyle bir demo hesabı zaten var. Giriş yapın.",
      { email: "Bu e-posta adresi kayıtlı." },
    );
  const [s2, id] = nextId(s, "u");
  const user: User = {
    id,
    email,
    role: input.role as Role,
    displayName: email.split("@")[0] ?? email,
    operatingCity: operatingCity || null,
    occupation: null,
    skills: null,
  };
  return ok({ ...s2, users: [...s2.users, user] }, user);
}

export function createSession(
  s: DemoState,
  input: { email: string; password: string },
): Result<User> {
  const fields: Record<string, string> = {};
  const email = input.email.trim().toLowerCase();
  if (!EMAIL_RE.test(email))
    fields["email"] = "Geçerli bir e-posta adresi girin.";
  if (!input.password) fields["password"] = "Demo parolasını girin.";
  if (Object.keys(fields).length)
    return fail("VALIDATION_ERROR", fixFields, fields);
  const user = s.users.find((u) => u.email === email);
  if (!user)
    return fail(
      "UNAUTHORIZED",
      "Demo hesabı bulunamadı. E-posta adresini kontrol edin veya örnek bir hesap seçin.",
    );
  return ok(s, user);
}

// ---------- US-01/02 ----------
export function getMyProfile(s: DemoState, actorId: string): Result<User> {
  const u = findUser(s, actorId);
  return u
    ? ok(s, u)
    : fail("UNAUTHORIZED", "Profilinizi görmek için giriş yapın.");
}

export function updateMyProfile(
  s: DemoState,
  actorId: string,
  input: { operatingCity: string; occupation: string; skills: string },
): Result<User> {
  const u = findUser(s, actorId);
  if (!u)
    return fail("UNAUTHORIZED", "Profilinizi düzenlemek için giriş yapın.");
  const operatingCity = input.operatingCity.trim();
  const occupation = input.occupation.trim();
  const skills = input.skills
    .split(/[,\n]/u)
    .map((skill) => skill.trim())
    .filter(Boolean);
  const fields: Record<string, string> = {};
  if (!validCity(operatingCity)) fields["operatingCity"] = cityError;
  if (occupation.length > 100)
    fields["occupation"] = "Meslek alanı en fazla 100 karakter olmalı.";
  if (skills.length > 10 || skills.some((skill) => skill.length > 60))
    fields["skills"] =
      "En fazla 10 beceri girin. Her beceri en fazla 60 karakter olmalı.";
  if (Object.keys(fields).length)
    return fail("VALIDATION_ERROR", fixFields, fields);
  const updated: User = {
    ...u,
    operatingCity: operatingCity || null,
    occupation: occupation || null,
    skills: skills.join(", ") || null,
  };
  return ok(
    { ...s, users: s.users.map((x) => (x.id === actorId ? updated : x)) },
    updated,
  );
}

// ---------- US-03 ----------
export interface CreateTaskInput {
  title: string;
  description: string;
  city: string;
  category: TaskCategory | "";
  proposedCompensation: string;
  requiredEvidence: string;
  permissionConfirmed: boolean;
  requestedBy: string;
}

export function createTask(
  s: DemoState,
  actorId: string,
  input: CreateTaskInput,
): Result<Task> {
  const u = findUser(s, actorId);
  if (!u || u.role !== "EMPLOYER")
    return fail(
      "FORBIDDEN",
      "Görev oluşturmak için bir işveren hesabına geçin.",
    );
  const fields: Record<string, string> = {};
  const title = input.title.trim();
  const description = input.description.trim();
  const requiredEvidence = input.requiredEvidence.trim();
  if (title.length < 5 || title.length > 150)
    fields["title"] = "Görev başlığı 5–150 karakter olmalı.";
  if (description.length < 20 || description.length > 2000)
    fields["description"] = "Görev açıklaması 20–2.000 karakter olmalı.";
  if (!input.city.trim()) fields["city"] = "Şehir seçin.";
  if (input.category !== "VEHICLE_PHOTO_CHECK")
    fields["category"] = "Araç fotoğrafı çekimi kategorisini seçin.";
  const comp = Number(input.proposedCompensation);
  if (!input.proposedCompensation.trim() || !Number.isFinite(comp) || comp < 0)
    fields["proposedCompensation"] =
      "Sıfır veya daha yüksek bir örnek tutar girin.";
  if (!requiredEvidence || requiredEvidence.length > 1000)
    fields["requiredEvidence"] =
      "İstenen fotoğraf ve gözlemleri en fazla 1.000 karakterle açıklayın.";
  if (!input.permissionConfirmed)
    fields["permissionConfirmed"] =
      "Görevi yayımlamak için izin beyanını onaylayın.";
  if (input.requestedBy && Number.isNaN(Date.parse(input.requestedBy)))
    fields["requestedBy"] = "Geçerli bir tarih ve saat girin.";
  if (Object.keys(fields).length)
    return fail("VALIDATION_ERROR", fixFields, fields);
  const [s2, id] = nextId(s, "t");
  const task: Task = {
    id,
    ownerId: actorId,
    title,
    description,
    city: input.city.trim(),
    category: "VEHICLE_PHOTO_CHECK",
    proposedCompensation: comp,
    requiredEvidence,
    permissionConfirmed: true,
    requestedBy: input.requestedBy
      ? new Date(input.requestedBy).toISOString()
      : null,
    status: "OPEN",
    paymentSimulationStatus: "NOT_HELD",
    assignedTaskTakerId: null,
    lastReviewNote: null,
    createdAt: now(),
  };
  const s3 = addHistory(
    { ...s2, tasks: [task, ...s2.tasks] },
    id,
    actorId,
    "TASK_CREATED",
    "Görev yayımlandı",
  );
  return ok(s3, task);
}

// ---------- US-04 ----------
export function listTasks(
  s: DemoState,
  filter: {
    status?: TaskStatus;
    city?: string;
    category?: TaskCategory;
    ownerId?: string;
  } = {},
): Task[] {
  return s.tasks
    .filter(
      (t) =>
        (!filter.status || t.status === filter.status) &&
        (!filter.city || t.city === filter.city) &&
        (!filter.category || t.category === filter.category) &&
        (!filter.ownerId || t.ownerId === filter.ownerId),
    )
    .map((task) => ({ ...task, lastReviewNote: null }));
}

export function getTask(
  s: DemoState,
  taskId: string,
  actorId: string | null = null,
): Result<Task> {
  const task = s.tasks.find((candidate) => candidate.id === taskId);
  if (!task)
    return fail("NOT_FOUND", "Görev bulunamadı. Demo sıfırlanmış olabilir.");
  return ok(s, {
    ...task,
    lastReviewNote: isParticipant(task, actorId) ? task.lastReviewNote : null,
  });
}

// ---------- US-05/06 ----------
export function applyForTask(
  s: DemoState,
  actorId: string,
  taskId: string,
  input: { note: string },
): Result<Application> {
  const u = findUser(s, actorId);
  if (!u || u.role !== "TASK_TAKER")
    return fail(
      "FORBIDDEN",
      "Başvuru yapmak için bir Görev Alan hesabına geçin.",
    );
  const t = s.tasks.find((x) => x.id === taskId);
  if (!t) return fail("NOT_FOUND", missingTask);
  if (!u.operatingCity)
    return fail(
      "PROFILE_INCOMPLETE",
      "Başvurmadan önce profilinize çalışma şehrinizi ekleyin.",
    );
  if (
    s.applications.some((a) => a.taskId === taskId && a.applicantId === actorId)
  )
    return fail(
      "CONFLICT",
      "Bu göreve zaten başvurdunuz. Başvuru durumunu Görevlerim sayfasından görebilirsiniz.",
    );
  if (t.status !== "OPEN")
    return fail(
      "CONFLICT",
      "Bu görev başvuruya kapalı. Açık görevlere göz atın.",
    );
  const note = input.note.trim();
  if (note.length > 500)
    return fail(
      "VALIDATION_ERROR",
      "Başvuru notu en fazla 500 karakter olmalı.",
    );
  const [s2, id] = nextId(s, "a");
  const app: Application = {
    id,
    taskId,
    applicantId: actorId,
    note: note || null,
    createdAt: now(),
  };
  const s3 = addHistory(
    { ...s2, applications: [...s2.applications, app] },
    taskId,
    actorId,
    "APPLICATION_RECEIVED",
    `${u.displayName} başvurdu`,
  );
  return ok(s3, app);
}

export function listTaskApplications(
  s: DemoState,
  actorId: string,
  taskId: string,
): Result<Application[]> {
  const t = s.tasks.find((x) => x.id === taskId);
  if (!t) return fail("NOT_FOUND", missingTask);
  if (t.ownerId !== actorId)
    return fail("FORBIDDEN", "Başvuruları yalnızca görev sahibi görebilir.");
  return ok(
    s,
    s.applications.filter((a) => a.taskId === taskId),
  );
}

export function assignTask(
  s: DemoState,
  actorId: string,
  taskId: string,
  input: { applicationId: string },
): Result<Task> {
  const t = s.tasks.find((x) => x.id === taskId);
  if (!t) return fail("NOT_FOUND", missingTask);
  if (t.ownerId !== actorId)
    return fail("FORBIDDEN", "Atamayı yalnızca görev sahibi yapabilir.");
  if (t.status !== "OPEN")
    return fail("CONFLICT", "Göreve biri atanmış veya görev kapatılmış.");
  const app = s.applications.find(
    (a) => a.id === input.applicationId && a.taskId === taskId,
  );
  if (!app) return fail("NOT_FOUND", "Bu göreve ait başvuru bulunamadı.");
  let s2 = patchTask(s, taskId, {
    status: "ASSIGNED",
    assignedTaskTakerId: app.applicantId,
  });
  s2 = addHistory(
    s2,
    taskId,
    actorId,
    "TASK_ASSIGNED",
    `${userName(s, app.applicantId)} göreve atandı`,
  );
  return ok(s2, s2.tasks.find((x) => x.id === taskId) ?? t);
}

// ---------- US-07 ----------
export function simulatePaymentHold(
  s: DemoState,
  actorId: string,
  taskId: string,
): Result<Task> {
  const t = s.tasks.find((x) => x.id === taskId);
  if (!t) return fail("NOT_FOUND", missingTask);
  if (t.ownerId !== actorId)
    return fail(
      "FORBIDDEN",
      "Simüle ödemeyi yalnızca görev sahibi bekletmeye alabilir.",
    );
  if (t.status !== "ASSIGNED")
    return fail(
      "CONFLICT",
      "Simüle ödemeyi bekletmeden önce göreve birini atayın.",
    );
  if (t.paymentSimulationStatus !== "NOT_HELD")
    return fail("CONFLICT", "Bu görevin simüle ödemesi zaten bekletiliyor.");
  let s2 = patchTask(s, taskId, { paymentSimulationStatus: "HELD_SIMULATED" });
  s2 = addHistory(
    s2,
    taskId,
    actorId,
    "PAYMENT_HELD",
    "Simüle ödeme bekletmeye alındı",
  );
  return ok(s2, s2.tasks.find((x) => x.id === taskId) ?? t);
}

// ---------- US-08/09/13 ----------
export function submitTaskEvidence(
  s: DemoState,
  actorId: string,
  taskId: string,
  input: { photoRefs: string[]; notes: string },
): Result<Evidence> {
  const t = s.tasks.find((x) => x.id === taskId);
  if (!t) return fail("NOT_FOUND", missingTask);
  if (t.assignedTaskTakerId !== actorId)
    return fail(
      "FORBIDDEN",
      "Kanıtı yalnızca göreve atanan kişi gönderebilir.",
    );
  if (t.status !== "ASSIGNED" && t.status !== "REVISION_REQUESTED")
    return fail(
      "CONFLICT",
      "Bu aşamada yeni kanıt gönderilemez. Önceki gönderim inceleme bekliyor olabilir.",
    );
  if (t.paymentSimulationStatus !== "HELD_SIMULATED")
    return fail(
      "HOLD_REQUIRED",
      "İşveren simüle ödemeyi henüz bekletmeye almadı. Daha sonra tekrar kontrol edin.",
    );
  const fields: Record<string, string> = {};
  if (input.photoRefs.length < 1 || input.photoRefs.length > 5)
    fields["photos"] = "1–5 örnek fotoğraf seçin.";
  const notes = input.notes.trim();
  if (notes.length < 10 || notes.length > 2000)
    fields["notes"] = "Gözlem notu 10–2.000 karakter olmalı.";
  if (Object.keys(fields).length)
    return fail("VALIDATION_ERROR", fixFields, fields);
  const version = s.evidence.filter((e) => e.taskId === taskId).length + 1;
  const [s2, id] = nextId(s, "e");
  const ev: Evidence = {
    id,
    taskId,
    submittedBy: actorId,
    photoRefs: [...input.photoRefs],
    notes,
    version,
    submittedAt: now(),
  };
  let s3 = patchTask({ ...s2, evidence: [...s2.evidence, ev] }, taskId, {
    status: "EVIDENCE_SUBMITTED",
  });
  s3 = addHistory(
    s3,
    taskId,
    actorId,
    "EVIDENCE_SUBMITTED",
    version > 1
      ? `Kanıt yeniden gönderildi (${version}. sürüm)`
      : "Kanıt gönderildi",
  );
  return ok(s3, ev);
}

export function listTaskEvidence(
  s: DemoState,
  actorId: string | null,
  taskId: string,
): Result<Evidence[]> {
  const t = s.tasks.find((x) => x.id === taskId);
  if (!t) return fail("NOT_FOUND", missingTask);
  if (!isParticipant(t, actorId))
    return fail(
      "FORBIDDEN",
      "Kanıtı yalnızca görev sahibi ve göreve atanan kişi görebilir.",
    );
  return ok(
    s,
    s.evidence
      .filter((e) => e.taskId === taskId)
      .sort((a, b) => b.version - a.version),
  );
}

// ---------- US-09/10 ----------
export function reviewTaskEvidence(
  s: DemoState,
  actorId: string,
  taskId: string,
  input: { decision: "APPROVE" | "REQUEST_REVISION"; note?: string },
): Result<Task> {
  const t = s.tasks.find((x) => x.id === taskId);
  if (!t) return fail("NOT_FOUND", missingTask);
  if (t.ownerId !== actorId)
    return fail("FORBIDDEN", "Kanıtı yalnızca görev sahibi inceleyebilir.");
  if (t.status !== "EVIDENCE_SUBMITTED")
    return fail(
      "CONFLICT",
      t.status === "COMPLETED"
        ? "Bu görev zaten tamamlandı."
        : "İnceleme bekleyen kanıt yok.",
    );
  const note = input.note?.trim() || null;
  if (note && note.length > 500)
    return fail(
      "VALIDATION_ERROR",
      "İnceleme notu en fazla 500 karakter olmalı.",
    );
  if (input.decision === "APPROVE") {
    if (t.paymentSimulationStatus !== "HELD_SIMULATED")
      return fail(
        "HOLD_REQUIRED",
        "Onaydan önce simüle ödemeyi bekletmeye alın.",
      );
    let s2 = patchTask(s, taskId, {
      status: "COMPLETED",
      paymentSimulationStatus: "RELEASED_SIMULATED",
      lastReviewNote: null,
    });
    s2 = addHistory(
      s2,
      taskId,
      actorId,
      "EVIDENCE_APPROVED",
      "Kanıt onaylandı ve görev tamamlandı",
    );
    s2 = addHistory(
      s2,
      taskId,
      actorId,
      "PAYMENT_RELEASED",
      "Simüle ödeme serbest bırakıldı",
    );
    return ok(s2, s2.tasks.find((x) => x.id === taskId) ?? t);
  }
  let s2 = patchTask(s, taskId, {
    status: "REVISION_REQUESTED",
    lastReviewNote: note,
  });
  s2 = addHistory(
    s2,
    taskId,
    actorId,
    "REVISION_REQUESTED",
    "Düzeltme istendi",
  );
  return ok(s2, s2.tasks.find((x) => x.id === taskId) ?? t);
}

// ---------- US-11 ----------
export function cancelTask(
  s: DemoState,
  actorId: string,
  taskId: string,
): Result<Task> {
  const t = s.tasks.find((x) => x.id === taskId);
  if (!t) return fail("NOT_FOUND", missingTask);
  if (t.ownerId !== actorId)
    return fail("FORBIDDEN", "Görevi yalnızca sahibi iptal edebilir.");
  if (t.status !== "OPEN" && t.status !== "ASSIGNED")
    return fail(
      "CONFLICT",
      t.status === "CANCELLED"
        ? "Bu görev zaten iptal edildi."
        : "Görev yalnızca açıkken veya atandıktan sonra, kanıt gönderilmeden önce iptal edilebilir.",
    );
  const voided = t.paymentSimulationStatus === "HELD_SIMULATED";
  let s2 = patchTask(s, taskId, {
    status: "CANCELLED",
    paymentSimulationStatus: voided
      ? "VOIDED_SIMULATED"
      : t.paymentSimulationStatus,
  });
  s2 = addHistory(s2, taskId, actorId, "TASK_CANCELLED", "Görev iptal edildi");
  if (voided)
    s2 = addHistory(
      s2,
      taskId,
      actorId,
      "PAYMENT_VOIDED",
      "Simüle ödeme bekletmesi iptal edildi",
    );
  return ok(s2, s2.tasks.find((x) => x.id === taskId) ?? t);
}

// ---------- US-12 ----------
export function getTaskHistory(
  s: DemoState,
  actorId: string | null,
  taskId: string,
): Result<HistoryEvent[]> {
  const t = s.tasks.find((x) => x.id === taskId);
  if (!t) return fail("NOT_FOUND", missingTask);
  if (!isParticipant(t, actorId))
    return fail(
      "FORBIDDEN",
      "Görev geçmişini yalnızca görev sahibi ve göreve atanan kişi görebilir.",
    );
  return ok(
    s,
    s.history.filter((h) => h.taskId === taskId),
  );
}
