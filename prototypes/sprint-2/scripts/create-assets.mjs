import { mkdir, writeFile } from "node:fs/promises";
const dir = new URL("../public/assets/", import.meta.url);
await mkdir(dir, { recursive: true });
const names = {
  on: "Önden görünüm",
  arka: "Arkadan görünüm",
  sol: "Sol yandan görünüm",
  sag: "Sağ yandan görünüm",
  detay: "Görünür ayrıntı",
};
for (const [id, name] of Object.entries(names)) {
  const side = id === "sol" || id === "sag";
  const car = side
    ? `<path d="M80 205h43l55-65h116l62 65h37q22 0 24 24v39H65v-35q0-24 15-28Z" fill="#f8faff" stroke="#47649a" stroke-width="3"/><path d="m151 204 42-50h90l45 50Z" fill="#8daed2"/><path d="M239 151v53m-85 13v37m154-37v37" stroke="#47649a" stroke-width="3"/><circle cx="137" cy="266" r="27" fill="#263752"/><circle cx="348" cy="266" r="27" fill="#263752"/><circle cx="137" cy="266" r="14" fill="#b9c8df"/><circle cx="348" cy="266" r="14" fill="#b9c8df"/>`
    : `<path d="m135 208 22-62q5-15 20-15h125q15 0 22 15l25 62 13 16v56H119v-55Z" fill="#f8faff" stroke="#47649a" stroke-width="3"/><path d="m156 202 21-54h126l22 54Z" fill="#8daed2"/><path d="M136 269v21h29v-21m152 0v21h28v-21" fill="#263752"/><path d="M132 228h53m112 0h49" stroke="${id === "arka" ? "#bd5965" : "#d6b968"}" stroke-width="12" stroke-linecap="round"/><rect x="199" y="240" width="83" height="9" rx="4" fill="#c0ccdf"/>${id !== "arka" ? '<path d="M174 263h132" stroke="#47649a" stroke-width="5"/>' : ""}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="340" viewBox="0 0 480 340"><title>${name} — kurgusal araç çizimi</title><desc>Prototip için çizilmiş örnek. Gerçek araç, plaka veya kişi içermez.</desc><rect width="480" height="340" fill="#e5edfa"/><circle cx="390" cy="70" r="42" fill="#f7faff"/><path d="M0 180 72 116l60 46 80-62 130 83 70-62 68 50v169H0Z" fill="#d1def1"/><path d="M0 255q240-35 480 0v85H0Z" fill="#b7c8e2"/><ellipse cx="240" cy="290" rx="172" ry="16" fill="#9dafcb" opacity=".6"/><g transform="${id === "detay" ? "translate(-95 -65) scale(1.4)" : id === "sag" ? "translate(480 0) scale(-1 1)" : ""}">${car}</g><rect x="18" y="18" width="102" height="27" rx="7" fill="#fff" opacity=".92"/><text x="69" y="36" font-family="Arial,sans-serif" text-anchor="middle" font-size="12" fill="#334c78">KURGUSAL ÖRNEK</text></svg>`;
  await writeFile(new URL(`vehicle-${id}.svg`, dir), svg);
}
console.log("5 yerel SVG örneği oluşturuldu.");
