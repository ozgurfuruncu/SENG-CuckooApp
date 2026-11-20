// Local prototype view models. Enum values follow the OpenAPI draft; these shapes are not API DTOs.
export type Role = "EMPLOYER" | "TASK_TAKER";
export type TaskCategory = "VEHICLE_PHOTO_CHECK";
export type TaskStatus =
  | "OPEN"
  | "ASSIGNED"
  | "EVIDENCE_SUBMITTED"
  | "REVISION_REQUESTED"
  | "COMPLETED"
  | "CANCELLED";
export type PaymentSimulationStatus =
  | "NOT_HELD"
  | "HELD_SIMULATED"
  | "RELEASED_SIMULATED"
  | "VOIDED_SIMULATED";

export interface User {
  id: string;
  email: string;
  role: Role;
  displayName: string;
  operatingCity: string | null;
  occupation: string | null;
  skills: string | null;
}

export interface Task {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  city: string;
  category: TaskCategory;
  proposedCompensation: number;
  requiredEvidence: string;
  permissionConfirmed: boolean;
  requestedBy: string | null;
  status: TaskStatus;
  paymentSimulationStatus: PaymentSimulationStatus;
  assignedTaskTakerId: string | null;
  lastReviewNote: string | null;
  createdAt: string;
}

export interface Application {
  id: string;
  taskId: string;
  applicantId: string;
  note: string | null;
  createdAt: string;
}

export interface Evidence {
  id: string;
  taskId: string;
  submittedBy: string;
  photoRefs: string[];
  notes: string;
  version: number;
  submittedAt: string;
}

export interface HistoryEvent {
  id: string;
  taskId: string;
  actorId: string;
  type: string;
  message: string;
  at: string;
}

export interface DemoState {
  users: User[];
  tasks: Task[];
  applications: Application[];
  evidence: Evidence[];
  history: HistoryEvent[];
  seq: number;
}

export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "PROFILE_INCOMPLETE"
  | "HOLD_REQUIRED"
  | "UNAUTHORIZED";

export interface ApiError {
  code: ApiErrorCode;
  message: string;
  fields?: Record<string, string>;
}

export type Result<T> =
  | { ok: true; state: DemoState; data: T }
  | { ok: false; error: ApiError };
