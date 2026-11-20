// Demo-only bundled sample photos. Evidence stores refs; previews resolve here.
import front from "@/assets/car-front.jpg";
import rear from "@/assets/car-rear.jpg";
import left from "@/assets/car-side.jpg";
import right from "@/assets/car-right.jpg";
import bumper from "@/assets/car-bumper.jpg";

export const SAMPLE_PHOTOS: { ref: string; src: string; label: string }[] = [
  { ref: "front", src: front, label: "Ön çapraz görünüm" },
  { ref: "rear", src: rear, label: "Arka görünüm" },
  { ref: "left", src: left, label: "Sol yan" },
  { ref: "right", src: right, label: "Sağ yan" },
  { ref: "bumper", src: bumper, label: "Arka tampon yakın çekimi" },
];
export const photoByRef = (ref: string) =>
  SAMPLE_PHOTOS.find((p) => p.ref === ref);
export const TASK_THUMB = front;
