// In-memory design adapter. No HTTP, storage, credentials, files or money services.
export type Role = "EMPLOYER" | "TASK_TAKER";
export type TaskStatus =
  | "OPEN"
  | "ASSIGNED"
  | "EVIDENCE_SUBMITTED"
  | "REVISION_REQUESTED"
  | "COMPLETED"
  | "CANCELLED";
export type PaymentStatus =
  | "NOT_HELD"
  | "HELD_SIMULATED"
  | "RELEASED_SIMULATED"
  | "VOIDED_SIMULATED";
export interface Profile {
  id: string;
  role: Role;
  operatingCity: string | null;
  occupation: string | null;
  skills: string[];
  selfDeclared: true;
}
export interface DemoUser extends Profile {
  name: string;
  email: string;
}
export interface NewTask {
  title: string;
  description: string;
  city: string;
  category: "VEHICLE_PHOTO_CHECK";
  proposedCompensation: number;
  requiredEvidence: string;
  permissionConfirmed: boolean;
  requestedBy?: string | null;
}
export interface Task extends NewTask {
  id: string;
  employerId: string;
  assignedWorkerId: string | null;
  status: TaskStatus;
  paymentSimulationStatus: PaymentStatus;
  createdAt: string;
}
export interface TaskApplication {
  id: string;
  taskId: string;
  workerId: string;
  note: string | null;
  submittedAt: string;
}
export interface EvidenceSubmission {
  id: string;
  taskId: string;
  workerId: string;
  photoCount: number;
  notes: string;
  submittedAt: string;
}
export interface TaskEvent {
  id: string;
  taskId: string;
  actorId: string;
  action: string;
  occurredAt: string;
  detail: string | null;
}
export interface DemoState {
  users: DemoUser[];
  tasks: Task[];
  applications: TaskApplication[];
  evidence: EvidenceSubmission[];
  events: TaskEvent[];
  photos: Record<string, string[]>;
}
export const statusLabels: Record<TaskStatus, string> = {
  OPEN: "Başvuruya açık",
  ASSIGNED: "Görevli atandı",
  EVIDENCE_SUBMITTED: "İnceleme bekliyor",
  REVISION_REQUESTED: "Düzeltme istendi",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal edildi",
};
export const paymentLabels: Record<PaymentStatus, string> = {
  NOT_HELD: "Simüle bekletme yapılmadı",
  HELD_SIMULATED: "Simüle ödeme bekletiliyor",
  RELEASED_SIMULATED: "Simüle ödeme serbest bırakıldı",
  VOIDED_SIMULATED: "Simüle bekletme iptal edildi",
};
export const actionLabels: Record<string, string> = {
  CREATED: "Görev oluşturuldu",
  ASSIGNED: "Görevli atandı",
  HELD_SIMULATED: "Simüle ödeme bekletildi",
  EVIDENCE_SUBMITTED: "Kanıt gönderildi",
  REVISION_REQUESTED: "Düzeltme istendi",
  COMPLETED:
    "Kanıt onaylandı; görev tamamlandı ve simüle ödeme serbest bırakıldı",
  CANCELLED: "Görev iptal edildi",
};
export const samplePhotos = ["on", "arka", "sol", "sag", "detay"] as const;
export const photoLabels: Record<string, string> = {
  on: "Önden görünüm",
  arka: "Arkadan görünüm",
  sol: "Sol yandan görünüm",
  sag: "Sağ yandan görünüm",
  detay: "Görünür ayrıntı",
};
export const DEMO_PASSWORD = "Demo1234!";
export class DemoError extends Error {
  status: number;
  code: string;
  constructor(status: number, code: string, detail: string) {
    super(detail);
    this.name = "DemoError";
    this.status = status;
    this.code = code;
  }
}
const fail = (status: number, code: string, detail: string): never => {
  throw new DemoError(status, code, detail);
};
const validText = (value: string, min: number, max: number, name: string) => {
  if (value.trim().length < min || value.trim().length > max)
    fail(400, "INVALID_INPUT", `${name} ${min}–${max} karakter olmalı.`);
};
const stamp = "2026-11-19T09:00:00+03:00";
export function seed(): DemoState {
  const user = (
    id: string,
    name: string,
    email: string,
    role: Role,
    operatingCity: string | null,
  ): DemoUser => ({
    id,
    name,
    email,
    role,
    operatingCity,
    occupation: role === "TASK_TAKER" ? "Öğrenci" : null,
    skills: role === "TASK_TAKER" ? ["Fotoğraf çekimi"] : [],
    selfDeclared: true,
  });
  const task = (
    id: string,
    title: string,
    city: string,
    status: TaskStatus,
    paymentSimulationStatus: PaymentStatus,
    assignedWorkerId: string | null = null,
    employerId = "employer",
  ): Task => ({
    id,
    title,
    city,
    status,
    paymentSimulationStatus,
    assignedWorkerId,
    employerId,
    category: "VEHICLE_PHOTO_CHECK",
    description:
      "Araç sahibinin ve konumun izniyle, park halindeki aracın yalnızca dış görünümünü fotoğraflayın. Plaka ve çevredeki kişileri kadraj dışında tutun.",
    requiredEvidence:
      "Önden, arkadan ve iki yandan dört örnek fotoğraf; görünür ayrıntılar için kısa not.",
    proposedCompensation: 450,
    permissionConfirmed: true,
    requestedBy: "2026-11-25T15:00:00+03:00",
    createdAt: stamp,
  });
  const tasks = [
    task(
      "TASK-101",
      "Çankaya · dış görünüm fotoğrafları",
      "Ankara",
      "OPEN",
      "NOT_HELD",
    ),
    task(
      "TASK-102",
      "Kadıköy · park halindeki araç",
      "İstanbul",
      "EVIDENCE_SUBMITTED",
      "HELD_SIMULATED",
      "worker",
    ),
    task(
      "TASK-103",
      "Bahçelievler · dört açıdan fotoğraf",
      "Ankara",
      "ASSIGNED",
      "NOT_HELD",
      "worker",
    ),
    task(
      "TASK-104",
      "Bornova · izinli dış görünüm kaydı",
      "İzmir",
      "COMPLETED",
      "RELEASED_SIMULATED",
      "worker",
    ),
    task(
      "TASK-105",
      "Beşiktaş · dış görünüm kaydı",
      "İstanbul",
      "OPEN",
      "NOT_HELD",
      null,
      "other-employer",
    ),
    task(
      "TASK-106",
      "Nilüfer · tamamlanmış özel görev",
      "Bursa",
      "COMPLETED",
      "RELEASED_SIMULATED",
      "candidate",
      "other-employer",
    ),
  ];
  return {
    users: [
      user("employer", "Deniz Yılmaz", "deniz@example.test", "EMPLOYER", null),
      user("worker", "Ece Demir", "ece@example.test", "TASK_TAKER", null),
      user(
        "candidate",
        "Arda Kaya",
        "arda@example.test",
        "TASK_TAKER",
        "Ankara",
      ),
      user("other", "Selin Aydın", "selin@example.test", "TASK_TAKER", "İzmir"),
      user(
        "other-employer",
        "Can Öztürk",
        "can@example.test",
        "EMPLOYER",
        null,
      ),
    ],
    tasks,
    applications: [
      {
        id: "APP-1",
        taskId: "TASK-101",
        workerId: "candidate",
        note: "İzin verilen saatlerde dış görünüm fotoğraflarını çekebilirim.",
        submittedAt: stamp,
      },
    ],
    evidence: [
      {
        id: "EVD-1",
        taskId: "TASK-102",
        workerId: "worker",
        photoCount: 4,
        notes:
          "Dört dış açı örnek olarak eklendi. Sol kapıda görünen iz, ayrıntı karesinde gösterilebilir.",
        submittedAt: stamp,
      },
      {
        id: "EVD-2",
        taskId: "TASK-104",
        workerId: "worker",
        photoCount: 2,
        notes: "İzinli dış görünüm örnekleri tamamlandı.",
        submittedAt: stamp,
      },
    ],
    photos: { "EVD-1": ["on", "arka", "sol", "sag"], "EVD-2": ["on", "arka"] },
    events: tasks.flatMap((t) => [
      {
        id: `${t.id}-created`,
        taskId: t.id,
        actorId: t.employerId,
        action: "CREATED",
        occurredAt: stamp,
        detail: "Kurgusal örnek görev.",
      },
      ...(t.status !== "OPEN"
        ? [
            {
              id: `${t.id}-state`,
              taskId: t.id,
              actorId: t.employerId,
              action: t.status,
              occurredAt: stamp,
              detail:
                "Hazır senaryo; geçmiş işlemler gerçek kullanıcı etkinliği değildir.",
            },
          ]
        : []),
    ]),
  };
}
export class MockAdapter {
  private state: DemoState = seed();
  private activeId: string | null = null;
  private revision = 0;
  private serial = 200;
  private listeners = new Set<() => void>();
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };
  getSnapshot = () => this.revision;
  private changed() {
    this.revision++;
    this.listeners.forEach((fn) => fn());
  }
  private id(prefix: string) {
    return `${prefix}-${++this.serial}`;
  }
  private user(): DemoUser {
    return (
      this.state.users.find((u) => u.id === this.activeId) ??
      fail(401, "AUTH_REQUIRED", "Önce örnek bir hesapla giriş yapın.")
    );
  }
  private task(id: string): Task {
    return (
      this.state.tasks.find((t) => t.id === id) ??
      fail(404, "TASK_NOT_FOUND", "Görev bulunamadı.")
    );
  }
  private owned(id: string) {
    const u = this.user();
    const t = this.task(id);
    if (u.role !== "EMPLOYER" || t.employerId !== u.id)
      fail(403, "NOT_OWNER", "Bu işlem yalnızca görevin sahibine açık.");
    return t;
  }
  private participant(id: string) {
    const u = this.user();
    const t = this.task(id);
    if (u.id !== t.employerId && u.id !== t.assignedWorkerId)
      fail(
        403,
        "PRIVATE_TASK",
        "Kanıtlar ve görev geçmişi yalnızca görev sahibi ile atanmış görevliye açık.",
      );
    return t;
  }
  private event(t: Task, action: string, detail: string | null = null) {
    this.state.events.push({
      id: this.id("EVT"),
      taskId: t.id,
      actorId: this.user().id,
      action,
      occurredAt: new Date().toISOString(),
      detail,
    });
  }
  private stateIs(t: Task, states: TaskStatus[]) {
    if (!states.includes(t.status))
      fail(
        409,
        "INVALID_TRANSITION",
        "Görevin mevcut durumu bu işleme uygun değil. Durumu yeniden kontrol edin.",
      );
  }
  reset() {
    this.state = seed();
    this.activeId = null;
    this.serial = 200;
    this.changed();
  }
  logout() {
    this.activeId = null;
    this.changed();
  }
  switchDemoUser(id: string) {
    if (!this.state.users.some((u) => u.id === id))
      fail(404, "USER_NOT_FOUND", "Örnek hesap bulunamadı.");
    this.activeId = id;
    this.changed();
  }
  currentUser(): DemoUser | null {
    return this.activeId ? structuredClone(this.user()) : null;
  }
  demoUsers(): DemoUser[] {
    return structuredClone(this.state.users);
  }
  createSession(input: { email: string; password: string }) {
    const u = this.state.users.find(
      (u) => u.email.toLowerCase() === input.email.trim().toLowerCase(),
    );
    if (!u || input.password !== DEMO_PASSWORD)
      throw new DemoError(
        401,
        "INVALID_LOGIN",
        "E-posta veya demo şifresi hatalı. Örnek hesabı ve Demo1234! şifresini kullanın.",
      );
    this.activeId = u.id;
    this.changed();
    return { accessToken: "local-demo-only", tokenType: "bearer" as const };
  }
  registerUser(input: {
    email: string;
    password: string;
    role: Role;
    operatingCity?: string | null;
  }) {
    if (!/^[^\s@]+@[^\s@]+\.test$/.test(input.email))
      fail(
        400,
        "INVALID_EMAIL",
        "Gerçek adres yerine example.test uzantılı kurgusal bir e-posta kullanın.",
      );
    if (input.password !== DEMO_PASSWORD)
      fail(
        400,
        "DEMO_PASSWORD_ONLY",
        "Bu prototip yalnızca Demo1234! demo şifresini kabul eder; gerçek şifre kullanmayın.",
      );
    if (!["EMPLOYER", "TASK_TAKER"].includes(input.role))
      fail(400, "INVALID_ROLE", "Geçerli bir rol seçin.");
    if (input.operatingCity)
      validText(input.operatingCity, 2, 100, "Çalışma şehri");
    if (
      this.state.users.some(
        (u) => u.email.toLowerCase() === input.email.toLowerCase(),
      )
    )
      fail(409, "EMAIL_EXISTS", "Bu örnek e-posta zaten kayıtlı.");
    const u: DemoUser = {
      id: this.id("USER"),
      name: "Yeni örnek kullanıcı",
      email: input.email.toLowerCase(),
      role: input.role,
      operatingCity: input.operatingCity?.trim() || null,
      occupation: null,
      skills: [],
      selfDeclared: true,
    };
    this.state.users.push(u);
    this.activeId = u.id;
    this.changed();
    return structuredClone(u);
  }
  getMyProfile(): Profile {
    return structuredClone(this.user());
  }
  updateMyProfile(input: {
    operatingCity: string | null;
    occupation: string | null;
    skills: string[];
  }) {
    const u = this.user();
    if (input.operatingCity)
      validText(input.operatingCity, 2, 100, "Çalışma şehri");
    if (input.occupation && input.occupation.length > 100)
      fail(400, "INVALID_INPUT", "Meslek en fazla 100 karakter olmalı.");
    if (
      input.skills.length > 10 ||
      input.skills.some((s) => s.trim().length === 0 || s.length > 60)
    )
      fail(
        400,
        "INVALID_INPUT",
        "En fazla 10 beceri ekleyin; her biri 1–60 karakter olmalı.",
      );
    Object.assign(u, {
      operatingCity: input.operatingCity?.trim() || null,
      occupation: input.occupation?.trim() || null,
      skills: input.skills.map((s) => s.trim()),
    });
    this.changed();
    return this.getMyProfile();
  }
  listTasks(
    filters: {
      city?: string;
      category?: string;
      status?: TaskStatus;
      search?: string;
    } = {},
  ) {
    this.user();
    return structuredClone(
      this.state.tasks.filter(
        (t) =>
          (!filters.city || t.city === filters.city) &&
          (!filters.category || t.category === filters.category) &&
          (!filters.status || t.status === filters.status) &&
          (!filters.search ||
            `${t.title} ${t.description}`
              .toLocaleLowerCase("tr-TR")
              .includes(filters.search.toLocaleLowerCase("tr-TR"))),
      ),
    );
  }
  getTask(id: string) {
    this.user();
    return structuredClone(this.task(id));
  }
  createTask(input: NewTask) {
    const u = this.user();
    if (u.role !== "EMPLOYER")
      fail(
        403,
        "EMPLOYER_REQUIRED",
        "Görev oluşturmak için işveren olmalısınız.",
      );
    validText(input.title, 5, 150, "Başlık");
    validText(input.description, 20, 2000, "Açıklama");
    validText(input.city, 1, 100, "Şehir");
    validText(input.requiredEvidence, 1, 1000, "İstenen kanıt");
    if (
      input.category !== "VEHICLE_PHOTO_CHECK" ||
      input.permissionConfirmed !== true
    )
      fail(
        400,
        "PERMISSION_REQUIRED",
        "Araç sahibi ve konum için izin gerektiğini onaylayın.",
      );
    if (
      !Number.isFinite(input.proposedCompensation) ||
      input.proposedCompensation < 0
    )
      fail(
        400,
        "INVALID_AMOUNT",
        "Örnek tutar sıfır veya pozitif bir sayı olmalı.",
      );
    if (input.requestedBy && !Number.isFinite(Date.parse(input.requestedBy)))
      fail(400, "INVALID_DATE", "Geçerli bir hedef tarih girin.");
    const t: Task = {
      ...structuredClone(input),
      title: input.title.trim(),
      description: input.description.trim(),
      city: input.city.trim(),
      requiredEvidence: input.requiredEvidence.trim(),
      id: this.id("TASK"),
      employerId: u.id,
      assignedWorkerId: null,
      status: "OPEN",
      paymentSimulationStatus: "NOT_HELD",
      createdAt: new Date().toISOString(),
    };
    this.state.tasks.unshift(t);
    this.event(t, "CREATED");
    this.changed();
    return structuredClone(t);
  }
  applyForTask(id: string, note = "") {
    const u = this.user();
    const t = this.task(id);
    if (u.role !== "TASK_TAKER" || u.id === t.employerId)
      fail(403, "WORKER_REQUIRED", "Yalnızca görev alan kişiler başvurabilir.");
    if (!u.operatingCity)
      fail(
        400,
        "CITY_REQUIRED",
        "Başvurmadan önce profilinizde çalışma şehrinizi seçin.",
      );
    this.stateIs(t, ["OPEN"]);
    if (
      this.state.applications.some(
        (a) => a.taskId === id && a.workerId === u.id,
      )
    )
      fail(409, "ALREADY_APPLIED", "Bu göreve zaten başvurdunuz.");
    if (note.length > 500)
      fail(400, "INVALID_INPUT", "Başvuru notu en fazla 500 karakter olmalı.");
    const a = {
      id: this.id("APP"),
      taskId: id,
      workerId: u.id,
      note: note.trim() || null,
      submittedAt: new Date().toISOString(),
    };
    this.state.applications.push(a);
    this.changed();
    return structuredClone(a);
  }
  listTaskApplications(id: string) {
    this.owned(id);
    return structuredClone(
      this.state.applications.filter((a) => a.taskId === id),
    );
  }
  listMyApplications() {
    const u = this.user();
    return structuredClone(
      this.state.applications.filter((a) => a.workerId === u.id),
    );
  }
  assignTask(id: string, applicationId: string) {
    const t = this.owned(id);
    this.stateIs(t, ["OPEN"]);
    const a =
      this.state.applications.find(
        (a) => a.id === applicationId && a.taskId === id,
      ) ?? fail(400, "INVALID_APPLICATION", "Bu göreve ait bir başvuru seçin.");
    t.assignedWorkerId = a.workerId;
    t.status = "ASSIGNED";
    this.event(t, "ASSIGNED");
    this.changed();
    return structuredClone(t);
  }
  simulatePaymentHold(id: string) {
    const t = this.owned(id);
    this.stateIs(t, ["ASSIGNED"]);
    if (t.paymentSimulationStatus !== "NOT_HELD")
      fail(
        409,
        "ALREADY_HELD",
        "Bu görev için simüle bekletme zaten kaydedilmiş.",
      );
    t.paymentSimulationStatus = "HELD_SIMULATED";
    this.event(t, "HELD_SIMULATED");
    this.changed();
    return {
      taskId: id,
      status: t.paymentSimulationStatus,
      disclaimer: "No real money is moved." as const,
    };
  }
  submitTaskEvidence(id: string, input: { photos: string[]; notes: string }) {
    const u = this.user();
    const t = this.task(id);
    if (u.role !== "TASK_TAKER" || u.id !== t.assignedWorkerId)
      fail(
        403,
        "ASSIGNEE_REQUIRED",
        "Yalnızca atanmış görevli kanıt gönderebilir.",
      );
    this.stateIs(t, ["ASSIGNED", "REVISION_REQUESTED"]);
    if (t.paymentSimulationStatus !== "HELD_SIMULATED")
      fail(
        409,
        "HOLD_REQUIRED",
        "İşveren önce simüle ödeme bekletmesini kaydetmeli.",
      );
    if (
      input.photos.length < 1 ||
      input.photos.length > 5 ||
      new Set(input.photos).size !== input.photos.length ||
      input.photos.some(
        (p) => !samplePhotos.includes(p as (typeof samplePhotos)[number]),
      )
    )
      fail(
        400,
        "INVALID_PHOTOS",
        "1–5 farklı örnek fotoğraf seçin. Gerçek dosya yüklenmez.",
      );
    validText(input.notes, 10, 2000, "Kanıt notu");
    const e = {
      id: this.id("EVD"),
      taskId: id,
      workerId: u.id,
      photoCount: input.photos.length,
      notes: input.notes.trim(),
      submittedAt: new Date().toISOString(),
    };
    this.state.evidence.push(e);
    this.state.photos[e.id] = [...input.photos];
    t.status = "EVIDENCE_SUBMITTED";
    this.event(t, "EVIDENCE_SUBMITTED");
    this.changed();
    return structuredClone(e);
  }
  listTaskEvidence(id: string) {
    this.participant(id);
    return structuredClone(this.state.evidence.filter((e) => e.taskId === id));
  }
  evidencePreviews(id: string, evidenceId: string) {
    this.participant(id);
    if (
      !this.state.evidence.some((e) => e.id === evidenceId && e.taskId === id)
    )
      fail(404, "EVIDENCE_NOT_FOUND", "Kanıt bulunamadı.");
    return [...(this.state.photos[evidenceId] || [])];
  }
  reviewTaskEvidence(
    id: string,
    input: { decision: "APPROVE" | "REQUEST_REVISION"; note?: string },
  ) {
    const t = this.owned(id);
    this.stateIs(t, ["EVIDENCE_SUBMITTED"]);
    if (!["APPROVE", "REQUEST_REVISION"].includes(input.decision))
      fail(400, "INVALID_DECISION", "Geçerli bir inceleme kararı seçin.");
    if ((input.note?.length || 0) > 500)
      fail(400, "INVALID_INPUT", "İnceleme notu en fazla 500 karakter olmalı.");
    if (input.decision === "APPROVE") {
      if (
        t.paymentSimulationStatus !== "HELD_SIMULATED" ||
        !this.state.evidence.some((e) => e.taskId === id)
      )
        fail(
          409,
          "REVIEW_REQUIREMENTS",
          "Onay için kanıt ve simüle bekletme gerekli.",
        );
      t.status = "COMPLETED";
      t.paymentSimulationStatus = "RELEASED_SIMULATED";
    } else {
      t.status = "REVISION_REQUESTED";
    }
    this.event(t, t.status, input.note?.trim() || null);
    this.changed();
    return structuredClone(t);
  }
  cancelTask(id: string) {
    const t = this.owned(id);
    this.stateIs(t, ["OPEN", "ASSIGNED"]);
    t.status = "CANCELLED";
    if (t.paymentSimulationStatus === "HELD_SIMULATED")
      t.paymentSimulationStatus = "VOIDED_SIMULATED";
    this.event(t, "CANCELLED");
    this.changed();
    return structuredClone(t);
  }
  getTaskHistory(id: string) {
    this.participant(id);
    return structuredClone(this.state.events.filter((e) => e.taskId === id));
  }
}
