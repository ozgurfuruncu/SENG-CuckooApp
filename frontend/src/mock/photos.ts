// Demo-only bundled sample photos. Evidence stores refs; previews resolve here.
import front from "@/assets/car-front.jpg";
import rear from "@/assets/car-rear.jpg";
import left from "@/assets/car-side.jpg";
import right from "@/assets/car-right.jpg";
import bumper from "@/assets/car-bumper.jpg";
import { PHOTO_FIXTURES, type PhotoFixture } from "./photo-fixtures";

const SRC: Record<string, string> = {
  front,
  rear,
  left,
  right,
  bumper,
  "bumper-raw": bumper,
};

export const SAMPLE_PHOTOS: (PhotoFixture & { src: string })[] =
  PHOTO_FIXTURES.map((f) => ({ ...f, src: SRC[f.ref] ?? front }));
export const photoByRef = (ref: string) =>
  SAMPLE_PHOTOS.find((p) => p.ref === ref);
export const TASK_THUMB = front;
