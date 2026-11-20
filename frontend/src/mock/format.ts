import type { PaymentSimulationStatus, TaskStatus } from "./types";

export const STATUS_LABEL: Record<TaskStatus, string> = {
  OPEN: "Başvuruya açık",
  ASSIGNED: "Görevli atandı",
  EVIDENCE_SUBMITTED: "İnceleme bekliyor",
  REVISION_REQUESTED: "Düzeltme istendi",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal edildi",
};
export const PAYMENT_LABEL: Record<PaymentSimulationStatus, string> = {
  NOT_HELD: "Bekletme yapılmadı",
  HELD_SIMULATED: "Bekletiliyor",
  RELEASED_SIMULATED: "Serbest bırakıldı",
  VOIDED_SIMULATED: "Bekletme iptal edildi",
};
export const CATEGORY_LABEL = {
  VEHICLE_PHOTO_CHECK: "Araç fotoğrafı çekimi",
} as const;

const date = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
  timeZone: "Europe/Istanbul",
});
const dateTime = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Istanbul",
});
const money = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  minimumFractionDigits: 0,
});

export const formatDate = (iso: string) => date.format(new Date(iso));
export const formatDateTime = (iso: string) => dateTime.format(new Date(iso));
export const formatMoney = (amount: number) => money.format(amount);
