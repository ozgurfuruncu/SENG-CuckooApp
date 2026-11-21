// Synthetic file metadata for bundled sample photos. No real files are read or uploaded.
export const MIB = 1024 * 1024;
export const MAX_PHOTO_BYTES = 10 * MIB;
export const MAX_SUBMISSION_BYTES = 50 * MIB;
export const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png"] as const;

export interface PhotoFixture {
  ref: string;
  label: string;
  mimeType: string;
  sizeBytes: number;
}

export const PHOTO_FIXTURES: PhotoFixture[] = [
  {
    ref: "front",
    label: "Ön çapraz görünüm",
    mimeType: "image/jpeg",
    sizeBytes: Math.round(3.2 * MIB),
  },
  {
    ref: "rear",
    label: "Arka görünüm",
    mimeType: "image/jpeg",
    sizeBytes: Math.round(2.8 * MIB),
  },
  {
    ref: "left",
    label: "Sol yan",
    mimeType: "image/png",
    sizeBytes: Math.round(6.4 * MIB),
  },
  {
    ref: "right",
    label: "Sağ yan",
    mimeType: "image/jpeg",
    sizeBytes: Math.round(3.5 * MIB),
  },
  {
    ref: "bumper",
    label: "Arka tampon yakın çekimi",
    mimeType: "image/jpeg",
    sizeBytes: Math.round(4.1 * MIB),
  },
  {
    ref: "bumper-raw",
    label: "Arka tampon · yüksek çözünürlük",
    mimeType: "image/png",
    sizeBytes: Math.round(12.4 * MIB),
  },
];

export const fixtureByRef = (ref: string) =>
  PHOTO_FIXTURES.find((p) => p.ref === ref);

export const formatMiB = (bytes: number) =>
  `${(bytes / MIB).toLocaleString("tr-TR", { maximumFractionDigits: 1 })} MiB`;

export const typeLabel = (mimeType: string) =>
  mimeType === "image/png"
    ? "PNG"
    : mimeType === "image/jpeg"
      ? "JPEG"
      : mimeType;

/** Pure size/type/count check over fixture metadata; returns a field error or null. */
export function validatePhotoSelection(
  refs: string[],
  fixtures: PhotoFixture[] = PHOTO_FIXTURES,
): string | null {
  if (refs.length < 1 || refs.length > 5) return "1–5 örnek fotoğraf seçin.";
  const picked = refs.map((r) => fixtures.find((f) => f.ref === r));
  if (picked.some((p) => !p)) return "Seçilen örnek fotoğraf bulunamadı.";
  const files = picked as PhotoFixture[];
  const badType = files.find(
    (f) => !(ALLOWED_PHOTO_TYPES as readonly string[]).includes(f.mimeType),
  );
  if (badType)
    return `${badType.label}: yalnızca JPEG veya PNG yükleyebilirsiniz.`;
  const tooBig = files.find((f) => f.sizeBytes > MAX_PHOTO_BYTES);
  if (tooBig)
    return `${tooBig.label} ${formatMiB(tooBig.sizeBytes)}. Fotoğraf başına en fazla 10 MiB yükleyebilirsiniz.`;
  const total = files.reduce((sum, f) => sum + f.sizeBytes, 0);
  if (total > MAX_SUBMISSION_BYTES)
    return `Seçilen fotoğraflar toplam ${formatMiB(total)}. Gönderim başına en fazla 50 MiB yükleyebilirsiniz.`;
  return null;
}
