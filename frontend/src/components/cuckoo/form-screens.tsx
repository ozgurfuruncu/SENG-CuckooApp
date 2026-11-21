import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Plus } from "lucide-react";
import { useState } from "react";
import { createTask, updateMyProfile, type CreateTaskInput } from "@/mock/api";
import { CITIES } from "@/mock/seed";
import { useDemo } from "@/mock/store";
import { Feedback, useFeedback } from "./form-feedback";
import { AppShell, PageHeader, backLinkClass } from "./shell";
import { Button, Field, inputClass } from "./ui";

export function CreateTaskScreen() {
  const { actor, run } = useDemo();
  const navigate = useNavigate();
  const feedback = useFeedback();
  const [form, setForm] = useState<CreateTaskInput>({
    title: "",
    description: "",
    city: "",
    category: "VEHICLE_PHOTO_CHECK",
    proposedCompensation: "",
    requiredEvidence: "",
    permissionConfirmed: false,
    requestedBy: "",
  });
  const fields = feedback.error?.fields;
  function control(key: keyof CreateTaskInput) {
    return {
      id: key,
      className: inputClass,
      value: String(form[key]),
      "aria-invalid": !!fields?.[key],
      "aria-describedby": fields?.[key] ? `${key}-error` : undefined,
      onChange: (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
      ) => setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }
  return (
    <AppShell role="EMPLOYER" title="Görev oluştur">
      <PageHeader
        title="Görev oluştur"
        back={
          <Link
            to="/employer"
            className={backLinkClass}
            aria-label="Görevlerime dön"
          >
            <ArrowLeft />
          </Link>
        }
      />
      <form
        noValidate
        className="mx-auto max-w-xl space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (!actor) return;
          const r = run((s) => createTask(s, actor.id, form));
          feedback.accept(r);
          if (r.ok)
            navigate({
              to: "/employer/tasks/$taskId",
              params: { taskId: r.data.id },
            });
        }}
      >
        <Feedback {...feedback} />
        <Field id="title" label="Görev başlığı" error={fields?.["title"]}>
          <input
            {...control("title")}
            maxLength={150}
            placeholder="Beyaz sedanın dış görünüm fotoğrafları"
          />
        </Field>
        <Field
          id="description"
          label="Açıklama"
          error={fields?.["description"]}
        >
          <textarea
            {...control("description")}
            rows={4}
            maxLength={2000}
            placeholder="Araç, park yeri ve kaydedilmesi istenen görünür ayrıntılar"
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="city" label="Şehir" error={fields?.["city"]}>
            <select {...control("city")}>
              <option value="">Şehir seçin</option>
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field id="category" label="Kategori" error={fields?.["category"]}>
            <select {...control("category")}>
              <option value="VEHICLE_PHOTO_CHECK">
                Araç dış görünüm fotoğrafları
              </option>
            </select>
          </Field>
        </div>
        <Field
          id="proposedCompensation"
          label="Önerilen tutar (₺)"
          hint="Bu tutar örnektir. Gerçek para transferi yapılmaz."
          error={fields?.["proposedCompensation"]}
        >
          <input
            {...control("proposedCompensation")}
            type="number"
            min="0"
            step="0.01"
          />
        </Field>
        <Field
          id="requiredEvidence"
          label="İstenen kanıtlar"
          error={fields?.["requiredEvidence"]}
        >
          <textarea
            {...control("requiredEvidence")}
            rows={3}
            maxLength={1000}
            placeholder="Ön, arka ve yan fotoğraflar ile görünür izlere dair notlar"
          />
        </Field>
        <Field
          id="requestedBy"
          label="İstenen tamamlanma tarihi"
          optional
          error={fields?.["requestedBy"]}
        >
          <input {...control("requestedBy")} type="datetime-local" />
        </Field>
        <div className="rounded-xl border bg-card p-4">
          <label
            className="flex items-start gap-3 text-sm"
            htmlFor="permissionConfirmed"
          >
            <input
              id="permissionConfirmed"
              type="checkbox"
              className="mt-1 size-4 shrink-0 accent-primary"
              checked={form.permissionConfirmed}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  permissionConfirmed: e.target.checked,
                }))
              }
              aria-invalid={!!fields?.["permissionConfirmed"]}
              aria-describedby={
                fields?.["permissionConfirmed"]
                  ? "permissionConfirmed-error"
                  : undefined
              }
            />
            <span>
              Dış görünüm fotoğrafları çekilmeden önce araç sahibinden ve çekim
              yapılacak yerin yetkilisinden izin alınması gerektiğini kabul
              ediyorum.
            </span>
          </label>
          {fields?.["permissionConfirmed"] && (
            <p
              id="permissionConfirmed-error"
              className="mt-2 text-sm text-destructive"
            >
              {fields["permissionConfirmed"]}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full">
          <Plus /> Görevi yayınla
        </Button>
      </form>
    </AppShell>
  );
}

export function ProfileScreen({
  role = "TASK_TAKER",
}: {
  role?: "EMPLOYER" | "TASK_TAKER";
}) {
  const { actor } = useDemo();
  return (
    <AppShell role={role} title="Profil">
      <PageHeader title="Profil" />
      {actor && <ProfileForm key={actor.id} />}
    </AppShell>
  );
}
function ProfileForm() {
  const { actor, run } = useDemo();
  const feedback = useFeedback();
  const [form, setForm] = useState({
    operatingCity: actor?.operatingCity ?? "",
    occupation: actor?.occupation ?? "",
    skills: actor?.skills ?? "",
  });
  const fields = feedback.error?.fields;
  return (
    <form
      className="mx-auto max-w-xl space-y-5"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (actor)
          feedback.accept(
            run((s) => updateMyProfile(s, actor.id, form)),
            "Profil kaydedildi.",
          );
      }}
    >
      <div className="border-b pb-5">
        <h2 className="text-lg font-bold">{actor?.displayName}</h2>
        <p className="mt-1 break-all text-sm text-muted-foreground">
          {actor?.email}
        </p>
        <p className="mt-2 text-xs font-semibold text-info">
          {actor?.role === "EMPLOYER" ? "İşveren" : "Görev Alan"}
        </p>
      </div>
      <Feedback {...feedback} />
      <Field
        id="operatingCity"
        label="Çalışma şehri"
        tag="Kendi beyanı"
        optional
        hint="Başvuru yapabilmek için çalışma şehrinizi belirtin."
        error={fields?.["operatingCity"]}
      >
        <select
          id="operatingCity"
          className={inputClass}
          value={form.operatingCity}
          onChange={(e) =>
            setForm((f) => ({ ...f, operatingCity: e.target.value }))
          }
        >
          <option value="">Belirtilmedi</option>
          {CITIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </Field>
      <Field
        id="occupation"
        label="Meslek"
        tag="Kendi beyanı"
        optional
        error={fields?.["occupation"]}
      >
        <input
          id="occupation"
          maxLength={100}
          aria-invalid={!!fields?.["occupation"]}
          aria-describedby={
            fields?.["occupation"] ? "occupation-error" : undefined
          }
          className={inputClass}
          value={form.occupation}
          onChange={(e) =>
            setForm((f) => ({ ...f, occupation: e.target.value }))
          }
        />
      </Field>
      <Field
        id="skills"
        label="Beceriler"
        tag="Kendi beyanı"
        optional
        hint="En fazla 10 beceri yazın. Becerileri virgülle veya yeni satırla ayırın. Her beceri en fazla 60 karakter olabilir."
        error={fields?.["skills"]}
      >
        <textarea
          id="skills"
          aria-invalid={!!fields?.["skills"]}
          aria-describedby={fields?.["skills"] ? "skills-error" : "skills-hint"}
          className={inputClass}
          rows={3}
          value={form.skills}
          onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))}
        />
      </Field>
      <Button type="submit">
        <Check /> Profili kaydet
      </Button>
    </form>
  );
}
