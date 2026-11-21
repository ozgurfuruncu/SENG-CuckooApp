import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, CheckCircle2, RotateCcw, Send } from "lucide-react";
import { useState } from "react";
import * as api from "@/mock/api";
import { formatMoney } from "@/mock/format";
import { MAX_PHOTO_BYTES, formatMiB, typeLabel } from "@/mock/photo-fixtures";
import { SAMPLE_PHOTOS, photoByRef } from "@/mock/photos";
import { useDemo } from "@/mock/store";
import { Feedback, useFeedback } from "./form-feedback";
import { AppShell, PageHeader, backLinkClass } from "./shell";
import {
  EvidenceBlock,
  HistoryList,
  TaskMeta,
  TaskNotFound,
  UnavailablePrivate,
} from "./task-bits";
import {
  Button,
  Field,
  Notice,
  PaymentBadge,
  StatusBadge,
  inputClass,
} from "./ui";

export function EvidenceReview({ taskId }: { taskId: string }) {
  return (
    <AppShell role="EMPLOYER" title="Kanıtları incele">
      <PageHeader
        title="Kanıtları incele"
        back={
          <Link
            to="/employer/tasks/$taskId"
            params={{ taskId }}
            className={backLinkClass}
            aria-label="Görev ayrıntılarına dön"
          >
            <ArrowLeft />
          </Link>
        }
      />
      <ReviewContent key={taskId} taskId={taskId} />
    </AppShell>
  );
}
function ReviewContent({ taskId }: { taskId: string }) {
  const { actor, state, run } = useDemo();
  const navigate = useNavigate();
  const feedback = useFeedback();
  const [note, setNote] = useState("");
  const result = api.getTask(state, taskId, actor?.id);
  if (!result.ok) return <TaskNotFound />;
  const task = result.data;
  const evidence = api.listTaskEvidence(state, actor?.id ?? null, taskId);
  if (!evidence.ok) return <UnavailablePrivate />;
  const latest = evidence.data[0];
  if (!latest) return <Notice title="Henüz kanıt gönderilmedi" />;
  const owner = actor?.id === task.ownerId;
  const noteError = feedback.error?.fields?.["note"];
  function review(decision: "APPROVE" | "REQUEST_REVISION") {
    if (!actor) return;
    const r = run((s) =>
      api.reviewTaskEvidence(s, actor.id, taskId, { decision, note }),
    );
    feedback.accept(
      r,
      decision === "REQUEST_REVISION"
        ? "Düzeltme istendi."
        : "Görev tamamlandı.",
    );
    if (r.ok) setNote("");
    if (r.ok && decision === "APPROVE")
      navigate({ to: "/employer/tasks/$taskId/completed", params: { taskId } });
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b pb-5">
        <div>
          <h2 className="text-lg font-bold">{task.title}</h2>
          <div className="mt-2">
            <TaskMeta task={task} />
          </div>
        </div>
        <StatusBadge status={task.status} />
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="size-9 shrink-0 text-success" />
            <div>
              <h2 className="font-bold">Kanıtlar gönderildi</h2>
              <p className="text-sm text-muted-foreground">
                {
                  state.users.find((u) => u.id === latest.submittedBy)
                    ?.displayName
                }{" "}
                · Sürüm {latest.version}
              </p>
            </div>
          </div>
          <EvidenceBlock evidence={latest} title="Gönderilen fotoğraflar" />
          {evidence.data.length > 1 && (
            <details className="border-t pt-4">
              <summary className="cursor-pointer text-sm font-semibold">
                Önceki gönderimler ({evidence.data.length - 1})
              </summary>
              <div className="mt-4 space-y-4">
                {evidence.data.slice(1).map((e) => (
                  <EvidenceBlock
                    key={e.id}
                    evidence={e}
                    title={`Kanıt sürümü ${e.version}`}
                  />
                ))}
              </div>
            </details>
          )}
        </div>
        <section className="space-y-4 border-y py-5 lg:sticky lg:top-6">
          <h2 className="font-bold">İnceleme kararı</h2>
          <p className="text-2xl font-bold">
            {formatMoney(task.proposedCompensation)}{" "}
            <span className="text-xs font-normal text-muted-foreground">
              örnek tutar
            </span>
          </p>
          <PaymentBadge status={task.paymentSimulationStatus} />
          <p className="text-xs text-muted-foreground">
            Gerçek para transferi yapılmaz.
          </p>
          <Feedback {...feedback} />
          {task.status === "REVISION_REQUESTED" && (
            <Notice tone="warning" title="Düzeltilmiş kanıt bekleniyor">
              Gerekçe: {task.lastReviewNote ?? "Gerekçe eklenmedi."}
            </Notice>
          )}
          {task.status === "COMPLETED" && (
            <Notice tone="success" title="İnceleme tamamlandı">
              Onaylanan kanıtları ve görev geçmişini görüntüleyebilirsiniz.
            </Notice>
          )}
          {owner &&
            task.status === "EVIDENCE_SUBMITTED" &&
            task.paymentSimulationStatus !== "HELD_SIMULATED" && (
              <Notice tone="warning" title="Simüle ödeme bekletmesi etkin değil">
                Düzeltme istemek veya onaylamak için simüle ödeme bekletmesi
                etkin olmalı.
              </Notice>
            )}
          {owner &&
            task.status === "EVIDENCE_SUBMITTED" &&
            task.paymentSimulationStatus === "HELD_SIMULATED" && (
              <>
                <Field
                  id="review-note"
                  label="İnceleme notu"
                  hint="Düzeltme için gerekçe zorunludur. Onay için not isteğe bağlıdır."
                  error={noteError}
                >
                  <textarea
                    id="review-note"
                    rows={4}
                    maxLength={500}
                    className={inputClass}
                    value={note}
                    onChange={(e) => {
                      if (noteError) feedback.clear();
                      setNote(e.target.value);
                    }}
                    aria-invalid={!!noteError}
                    aria-describedby={
                      noteError
                        ? "review-note-error review-note-count"
                        : "review-note-hint review-note-count"
                    }
                  />
                </Field>
                <p
                  id="review-note-count"
                  className="-mt-2 text-right text-xs text-muted-foreground"
                >
                  {note.trim().length}/500 karakter
                </p>
                <Button className="w-full" onClick={() => review("APPROVE")}>
                  <Check /> Onayla ve tamamla
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => review("REQUEST_REVISION")}
                >
                  <RotateCcw /> Düzeltme iste
                </Button>
              </>
            )}
        </section>
      </div>
      {(() => {
        const h = api.getTaskHistory(state, actor?.id ?? null, taskId);
        return h.ok ? <HistoryList events={h.data} state={state} /> : null;
      })()}
    </div>
  );
}

export function SubmitEvidence({ taskId }: { taskId: string }) {
  return (
    <AppShell role="TASK_TAKER" title="Kanıt gönder">
      <PageHeader
        title="Kanıt gönder"
        back={
          <Link
            to="/taker/tasks/$taskId"
            params={{ taskId }}
            className={backLinkClass}
            aria-label="Görev ayrıntılarına dön"
          >
            <ArrowLeft />
          </Link>
        }
      />
      <SubmitContent key={taskId} taskId={taskId} />
    </AppShell>
  );
}
function SubmitContent({ taskId }: { taskId: string }) {
  const { state, actor, run } = useDemo();
  const navigate = useNavigate();
  const feedback = useFeedback();
  const evidence = api.listTaskEvidence(state, actor?.id ?? null, taskId);
  const latest = evidence.ok ? evidence.data[0] : undefined;
  const [photos, setPhotos] = useState<string[]>(latest?.photoRefs ?? []);
  const [notes, setNotes] = useState(latest?.notes ?? "");
  const result = api.getTask(state, taskId, actor?.id);
  if (!result.ok) return <TaskNotFound />;
  const task = result.data;
  if (actor?.id !== task.assignedTaskTakerId) return <UnavailablePrivate />;
  if (task.status !== "ASSIGNED" && task.status !== "REVISION_REQUESTED") {
    return (
      <Notice title="Bu aşamada kanıt gönderilemez">
        Son durumu ve varsa önceki gönderimi görmek için görev ayrıntılarına
        dönün.
      </Notice>
    );
  }
  const fields = feedback.error?.fields;
  return (
    <form
      noValidate
      className="mx-auto max-w-2xl space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (!actor) return;
        const r = run((s) =>
          api.submitTaskEvidence(s, actor.id, taskId, {
            photoRefs: photos,
            notes,
          }),
        );
        feedback.accept(r);
        if (r.ok) navigate({ to: "/taker/tasks/$taskId", params: { taskId } });
      }}
    >
      <h2 className="text-lg font-bold">{task.title}</h2>
      <Feedback {...feedback} />
      {task.paymentSimulationStatus !== "HELD_SIMULATED" && (
        <Notice tone="warning" title="Simüle ödeme bekletmesi bekleniyor">
          İşveren simüle ödemeyi bekletmeye aldığında kanıt gönderebilirsiniz.
          Gerçek para transferi yapılmaz.
        </Notice>
      )}
      {task.status === "REVISION_REQUESTED" && (
        <Notice tone="warning" title="Düzeltme istendi">
          Gerekçe: {task.lastReviewNote ?? "Gerekçe eklenmedi."}
        </Notice>
      )}
      <fieldset
        aria-describedby={fields?.["photos"] ? "photos-error" : "photos-hint"}
      >
        <legend className="mb-1 font-semibold">Örnek fotoğraflar</legend>
        <p id="photos-hint" className="mb-1 text-xs text-muted-foreground">
          JPEG veya PNG · 1–5 fotoğraf · Fotoğraf başına en fazla 10 MiB ·
          Gönderim başına en fazla 50 MiB.
        </p>
        <p className="mb-3 text-xs font-medium" aria-live="polite">
          {photos.length}/5 seçildi · Toplam{" "}
          {formatMiB(
            photos.reduce((sum, r) => sum + (photoByRef(r)?.sizeBytes ?? 0), 0),
          )}{" "}
          · Kurgusal örnek fotoğraflar
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {SAMPLE_PHOTOS.map((p) => (
            <label
              key={p.ref}
              className={`relative cursor-pointer overflow-hidden rounded-xl border-2 bg-card ${photos.includes(p.ref) ? "border-brand" : "border-border"}`}
            >
              <img
                src={p.src}
                alt={p.label}
                className="aspect-[4/3] w-full object-cover"
              />
              <span className="flex items-start gap-2 p-2 text-xs font-medium">
                <input
                  type="checkbox"
                  className="size-4 shrink-0 accent-primary"
                  checked={photos.includes(p.ref)}
                  onChange={(e) => {
                    if (fields?.["photos"]) feedback.clear();
                    setPhotos((old) =>
                      e.target.checked
                        ? [...old, p.ref]
                        : old.filter((r) => r !== p.ref),
                    );
                  }}
                />
                <span className="min-w-0">
                  <span className="block">{p.label}</span>
                  <span
                    className={`block font-normal ${p.sizeBytes > MAX_PHOTO_BYTES ? "text-destructive" : "text-muted-foreground"}`}
                  >
                    {typeLabel(p.mimeType)} · {formatMiB(p.sizeBytes)}
                  </span>
                </span>
              </span>
            </label>
          ))}
        </div>
        {fields?.["photos"] && (
          <p
            id="photos-error"
            role="alert"
            className="mt-2 text-sm font-medium text-destructive"
          >
            {fields["photos"]}
          </p>
        )}
      </fieldset>
      <Field
        id="evidence-notes"
        label="Gözle görülen ayrıntılar"
        hint={`${notes.trim().length}/2.000 karakter · En az 10 karakter`}
        error={fields?.["notes"]}
      >
        <textarea
          id="evidence-notes"
          rows={5}
          maxLength={2000}
          className={inputClass}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          aria-invalid={!!fields?.["notes"]}
          aria-describedby={
            fields?.["notes"] ? "evidence-notes-error" : "evidence-notes-hint"
          }
        />
      </Field>
      <Button type="submit" className="w-full">
        <Send />
        {task.status === "REVISION_REQUESTED"
          ? "Kanıtı yeniden gönder"
          : "Kanıt gönder"}
      </Button>
    </form>
  );
}

export function TaskCompleted({ taskId }: { taskId: string }) {
  const { state, actor } = useDemo();
  const result = api.getTask(state, taskId, actor?.id);
  const history = api.getTaskHistory(state, actor?.id ?? null, taskId);
  return (
    <AppShell role="EMPLOYER" title="Görev tamamlandı">
      <PageHeader title="Görev tamamlandı" />
      {!result.ok ? (
        <TaskNotFound />
      ) : !history.ok ? (
        <UnavailablePrivate />
      ) : result.data.status !== "COMPLETED" ? (
        <Notice title="Bu görev henüz tamamlanmadı" />
      ) : (
        <div className="space-y-8">
          <div className="mx-auto flex max-w-lg flex-col items-center gap-5 py-8 text-center">
            <span className="grid size-24 place-items-center rounded-full bg-success-soft text-success">
              <Check className="size-14" />
            </span>
            <h2 className="text-3xl font-extrabold">Görev tamamlandı</h2>
            <p className="text-muted-foreground">{result.data.title}</p>
            <PaymentBadge status={result.data.paymentSimulationStatus} />
            <p className="text-sm text-muted-foreground">
              Kanıt onaylandı ve simüle ödeme serbest bırakıldı.
              <br />
              Gerçek para transferi yapılmaz.
            </p>
            <Button asChild>
              <Link to="/employer">Görevlerimi gör</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/employer/tasks/$taskId/review" params={{ taskId }}>
                Kanıt incelemesini gör
              </Link>
            </Button>
          </div>
          <HistoryList events={history.data} state={state} />
        </div>
      )}
    </AppShell>
  );
}
