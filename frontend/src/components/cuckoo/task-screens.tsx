import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, CreditCard, Send, X } from "lucide-react";
import { useState } from "react";
import * as api from "@/mock/api";
import { useDemo } from "@/mock/store";
import type { Role } from "@/mock/types";
import { Feedback, useFeedback } from "./form-feedback";
import { AppShell, PageHeader, backLinkClass } from "./shell";
import {
  EvidenceBlock,
  HistoryList,
  TaskNotFound,
  TaskSummary,
  UnavailablePrivate,
} from "./task-bits";
import { Button, EmptyState, Field, Notice, inputClass } from "./ui";

export function TaskDetails({ taskId, role }: { taskId: string; role: Role }) {
  const { actor, state } = useDemo();
  const result = api.getTask(state, taskId, actor?.id);
  return (
    <AppShell
      role={role}
      title={`${role === "EMPLOYER" ? "İşveren" : "Görev Alan"} · Görev ayrıntıları`}
    >
      <PageHeader
        title="Görev ayrıntıları"
        back={
          <Link
            to={role === "EMPLOYER" ? "/employer" : "/taker"}
            className={backLinkClass}
            aria-label="Görevlerime dön"
          >
            <ArrowLeft />
          </Link>
        }
      />
      {result.ok ? (
        <TaskContent key={taskId} taskId={taskId} role={role} />
      ) : (
        <TaskNotFound />
      )}
    </AppShell>
  );
}

function TaskContent({ taskId, role }: { taskId: string; role: Role }) {
  const { actor, state, run } = useDemo();
  const feedback = useFeedback();
  const [note, setNote] = useState("");
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const result = api.getTask(state, taskId, actor?.id);
  if (!result.ok || !actor) return null;
  const task = result.data;
  const owner = task.ownerId === actor.id;
  const assigned = task.assignedTaskTakerId === actor.id;
  const applications = api.listTaskApplications(state, actor.id, taskId);
  const evidence = api.listTaskEvidence(state, actor.id, taskId);
  const history = api.getTaskHistory(state, actor.id, taskId);
  const applied = state.applications.some(
    (a) => a.taskId === taskId && a.applicantId === actor.id,
  );
  return (
    <div className="space-y-6">
      <TaskSummary task={task} />
      <Feedback {...feedback} />
      {role === "EMPLOYER" && owner && (
        <>
          {task.status === "OPEN" && (
            <section className="space-y-3">
              <h2 className="text-lg font-bold">
                Başvurular ({applications.ok ? applications.data.length : 0})
              </h2>
              {applications.ok &&
                applications.data.map((a) => {
                  const u = state.users.find(
                    (user) => user.id === a.applicantId,
                  );
                  return (
                    <article
                      key={a.id}
                      className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card p-4"
                    >
                      <div className="min-w-0">
                        <h3 className="font-bold">{u?.displayName}</h3>
                        <p className="text-xs text-muted-foreground">
                          {u?.operatingCity} · Kendi beyanı
                        </p>
                        {u?.occupation && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            Meslek: {u.occupation} · Kendi beyanı
                          </p>
                        )}
                        {u?.skills && (
                          <p className="text-xs text-muted-foreground">
                            Beceriler: {u.skills} · Kendi beyanı
                          </p>
                        )}
                        {a.note && <p className="mt-2 text-sm">{a.note}</p>}
                      </div>
                      <Button
                        size="sm"
                        aria-label={`${u?.displayName ?? "Başvuran kişiyi"} ata`}
                        onClick={() =>
                          feedback.accept(
                            run((s) =>
                              api.assignTask(s, actor.id, taskId, {
                                applicationId: a.id,
                              }),
                            ),
                            "Görev atandı.",
                          )
                        }
                      >
                        <Check /> Ata
                      </Button>
                    </article>
                  );
                })}
              {applications.ok && !applications.data.length && (
                <EmptyState title="Henüz başvuru yok" />
              )}
            </section>
          )}
          {task.assignedTaskTakerId && (
            <section className="border-y py-4">
              <h2 className="text-sm font-semibold">Göreve atanan kişi</h2>
              <p className="mt-1 font-bold">
                {
                  state.users.find((u) => u.id === task.assignedTaskTakerId)
                    ?.displayName
                }
              </p>
            </section>
          )}
          {task.status === "ASSIGNED" &&
            task.paymentSimulationStatus === "NOT_HELD" && (
              <Notice
                title="Simüle ödemenin bekletilmesi gerekiyor"
                action={
                  <Button
                    onClick={() =>
                      feedback.accept(
                        run((s) =>
                          api.simulatePaymentHold(s, actor.id, taskId),
                        ),
                        "Simüle ödeme bekletmeye alındı.",
                      )
                    }
                  >
                    <CreditCard /> Bekletmeyi kaydet
                  </Button>
                }
              >
                Gerçek para transferi yapılmaz.
              </Notice>
            )}
          {task.status === "ASSIGNED" &&
            task.paymentSimulationStatus === "HELD_SIMULATED" && (
              <Notice title="Kanıt bekleniyor">
                Simüle ödeme bekletmeye alındı. Gerçek para transferi yapılmaz.
              </Notice>
            )}
          {task.status === "EVIDENCE_SUBMITTED" && (
            <Button asChild>
              <Link to="/employer/tasks/$taskId/review" params={{ taskId }}>
                <Check /> Kanıtları incele
              </Link>
            </Button>
          )}
          {task.status === "REVISION_REQUESTED" && (
            <Notice tone="warning" title="Düzeltme istendi">
              {task.lastReviewNote ?? "İnceleme notu eklenmedi."}
            </Notice>
          )}
          {task.status === "COMPLETED" && (
            <Button asChild variant="outline">
              <Link to="/employer/tasks/$taskId/completed" params={{ taskId }}>
                Tamamlanan görevi gör
              </Link>
            </Button>
          )}
          {["OPEN", "ASSIGNED", "CANCELLED"].includes(task.status) && (
            <div>
              {cancelConfirm ? (
                <Notice
                  tone="warning"
                  title="Bu görev iptal edilsin mi?"
                  action={
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="danger"
                        onClick={() => {
                          feedback.accept(
                            run((s) => api.cancelTask(s, actor.id, taskId)),
                            "Görev iptal edildi. Varsa simüle ödeme bekletmesi kaldırıldı.",
                          );
                          setCancelConfirm(false);
                        }}
                      >
                        <X /> İptali onayla
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setCancelConfirm(false)}
                      >
                        Vazgeç
                      </Button>
                    </div>
                  }
                >
                  Bu işlem görevi kapatır ve varsa simüle ödeme bekletmesini
                  kaldırır.
                </Notice>
              ) : (
                <Button variant="danger" onClick={() => setCancelConfirm(true)}>
                  <X />{" "}
                  {task.status === "CANCELLED"
                    ? "Yeniden iptal et"
                    : "Görevi iptal et"}
                </Button>
              )}
            </div>
          )}
        </>
      )}
      {role === "TASK_TAKER" && (
        <>
          {task.status === "OPEN" && (
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                feedback.accept(
                  run((s) => api.applyForTask(s, actor.id, taskId, { note })),
                  "Başvuru gönderildi.",
                );
              }}
            >
              <h2 className="text-lg font-bold">
                {applied ? "Başvuru gönderildi" : "Bu göreve başvur"}
              </h2>
              {!actor.operatingCity && (
                <Notice
                  tone="warning"
                  title="Çalışma şehrinizi belirtin"
                  action={
                    <Button asChild variant="outline">
                      <Link to="/taker/profile">Profili düzenle</Link>
                    </Button>
                  }
                >
                  Başvuru yapmadan önce profilinizde çalışma şehrinizi belirtin.
                </Notice>
              )}
              <Field id="application-note" label="Başvuru notu" optional>
                <textarea
                  id="application-note"
                  rows={3}
                  maxLength={500}
                  className={inputClass}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </Field>
              <Button type="submit">
                <Send />
                {applied ? "Yeniden başvur" : "Göreve başvur"}
              </Button>
            </form>
          )}
          {!assigned && task.status !== "OPEN" && (
            <Notice
              title={
                applied &&
                task.assignedTaskTakerId &&
                task.status !== "CANCELLED"
                  ? "Görev başka bir kişiye atandı"
                  : "Bu görev başvuruya kapalı"
              }
              action={
                <Button asChild variant="outline">
                  <Link to="/taker/find">Açık görevleri gör</Link>
                </Button>
              }
            />
          )}
          {assigned &&
            task.status === "ASSIGNED" &&
            task.paymentSimulationStatus === "NOT_HELD" && (
              <Notice tone="warning" title="Simüle ödeme kaydı bekleniyor">
                İşveren simüle ödemeyi bekletmeye aldığında kanıt
                gönderebilirsiniz. Gerçek para transferi yapılmaz.
              </Notice>
            )}
          {assigned &&
            ["ASSIGNED", "REVISION_REQUESTED"].includes(task.status) && (
              <>
                {task.status === "REVISION_REQUESTED" && (
                  <Notice tone="warning" title="Düzeltme istendi">
                    {task.lastReviewNote ?? "İnceleme notu eklenmedi."}
                  </Notice>
                )}
                <Button
                  asChild
                  variant={
                    task.paymentSimulationStatus === "NOT_HELD"
                      ? "outline"
                      : "primary"
                  }
                >
                  <Link to="/taker/tasks/$taskId/evidence" params={{ taskId }}>
                    {task.status === "REVISION_REQUESTED"
                      ? "Kanıtı düzelt"
                      : "Kanıt gönder"}
                  </Link>
                </Button>
              </>
            )}
          {assigned && task.status === "EVIDENCE_SUBMITTED" && (
            <Notice title="Kanıt gönderildi">
              İşverenin incelemesi bekleniyor.
            </Notice>
          )}
          {assigned && task.status === "COMPLETED" && (
            <Notice tone="success" title="Görev tamamlandı">
              Simüle ödeme serbest bırakıldı. Gerçek para transferi yapılmaz.
            </Notice>
          )}
        </>
      )}
      {evidence.ok ? (
        evidence.data[0] && <EvidenceBlock evidence={evidence.data[0]} />
      ) : (
        <UnavailablePrivate />
      )}
      {history.ok && <HistoryList events={history.data} state={state} />}
    </div>
  );
}
