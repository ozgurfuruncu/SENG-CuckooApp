import { Link } from "@tanstack/react-router";
import { ArrowRight, Plus, Search } from "lucide-react";
import { useState } from "react";
import mascot from "@/assets/mascot.png";
import { listTasks } from "@/mock/api";
import { formatMoney } from "@/mock/format";
import { CITIES } from "@/mock/seed";
import { useDemo } from "@/mock/store";
import { AppShell, PageHeader } from "./shell";
import { TaskCard } from "./task-bits";
import { Button, EmptyState, Field, inputClass } from "./ui";

export function EmployerDashboard() {
  const { actor, state } = useDemo();
  const tasks = listTasks(state, { ownerId: actor?.id ?? "signed-out" });
  return (
    <AppShell role="EMPLOYER" title="İşveren paneli">
      <div className="mb-7 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">
            Hoş geldiniz{actor ? `, ${actor.displayName.split(" ")[0]}` : ""}!
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Araç fotoğrafı görevleriniz
          </p>
        </div>
        <img src={mascot} alt="" className="size-16 object-contain" />
      </div>
      <Link
        to="/employer/tasks/new"
        className="mb-7 flex items-center gap-4 rounded-2xl bg-primary px-5 py-6 text-primary-foreground shadow-soft"
      >
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-card text-primary">
          <Plus />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold">Görev oluştur</h2>
          <p className="mt-1 text-sm text-primary-foreground/80">
            Dış görünüm fotoğrafları ve görülebilen ayrıntılar
          </p>
        </div>
        <ArrowRight className="size-5 shrink-0" />
      </Link>
      <div className="mb-7 grid grid-cols-3 gap-3 border-y py-4">
        {[
          ["Başvuruya açık", tasks.filter((t) => t.status === "OPEN").length],
          [
            "Devam eden",
            tasks.filter((t) =>
              ["ASSIGNED", "EVIDENCE_SUBMITTED", "REVISION_REQUESTED"].includes(
                t.status,
              ),
            ).length,
          ],
          ["Tamamlanan", tasks.filter((t) => t.status === "COMPLETED").length],
        ].map(([label, count]) => (
          <div key={label}>
            <p className="text-2xl font-bold">{count}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
      <h2 className="mb-4 text-lg font-bold">
        Görevlerim{" "}
        <span className="text-sm font-normal text-muted-foreground">
          ({tasks.length})
        </span>
      </h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            role="EMPLOYER"
            extra={
              <span className="text-xs font-semibold">
                {formatMoney(task.proposedCompensation)} (örnek tutar)
              </span>
            }
          />
        ))}
        {!tasks.length && <EmptyState title="Henüz görev yok" />}
      </div>
    </AppShell>
  );
}

export function TakerDashboard() {
  const { actor, state } = useDemo();
  const [tab, setTab] = useState("all");
  const my = state.tasks.filter(
    (t) =>
      t.assignedTaskTakerId === actor?.id ||
      state.applications.some(
        (a) => a.taskId === t.id && a.applicantId === actor?.id,
      ),
  );
  const tasks = my.filter(
    (t) =>
      tab === "all" ||
      (tab === "applications"
        ? t.assignedTaskTakerId !== actor?.id && t.status === "OPEN"
        : tab === "completed"
          ? t.status === "COMPLETED"
          : t.assignedTaskTakerId === actor?.id &&
            ["ASSIGNED", "EVIDENCE_SUBMITTED", "REVISION_REQUESTED"].includes(
              t.status,
            )),
  );
  return (
    <AppShell role="TASK_TAKER" title="Görev Alan paneli">
      <PageHeader title="Görevlerim">
        <Button asChild size="sm">
          <Link to="/taker/find">
            <Search /> Görev bul
          </Link>
        </Button>
      </PageHeader>
      <div
        role="group"
        aria-label="Görev filtreleri"
        className="mb-5 flex flex-wrap gap-2"
      >
        {(
          [
            ["all", "Tümü"],
            ["applications", "Başvurular"],
            ["active", "Devam eden"],
            ["completed", "Tamamlanan"],
          ] as const
        ).map(([value, label]) => (
          <Button
            key={value}
            aria-pressed={tab === value}
            variant={tab === value ? "primary" : "soft"}
            size="sm"
            onClick={() => setTab(value)}
          >
            {label}
          </Button>
        ))}
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            role="TASK_TAKER"
            extra={
              <span className="text-xs">
                {task.status === "CANCELLED"
                  ? "Görev iptal edildi"
                  : task.assignedTaskTakerId === actor?.id
                    ? "Size atandı"
                    : task.assignedTaskTakerId
                      ? "Başka bir kişiye atandı"
                      : "Başvuru gönderildi"}
              </span>
            }
          />
        ))}
        {!tasks.length && (
          <EmptyState
            title="Bu filtreye uygun görev yok"
            action={
              <Button asChild variant="outline">
                <Link to="/taker/find">
                  Görev bul <ArrowRight />
                </Link>
              </Button>
            }
          />
        )}
      </div>
    </AppShell>
  );
}

export function FindTasks() {
  const { state } = useDemo();
  const [city, setCity] = useState("");
  const tasks = listTasks(state, {
    status: "OPEN",
    ...(city ? { city } : {}),
    category: "VEHICLE_PHOTO_CHECK",
  });
  return (
    <AppShell role="TASK_TAKER" title="Görev bul">
      <PageHeader title="Görev bul" />
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Field id="filter-city" label="Şehir">
          <select
            id="filter-city"
            className={inputClass}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Tüm şehirler</option>
            {CITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field id="filter-category" label="Kategori">
          <select id="filter-category" className={inputClass}>
            <option value="VEHICLE_PHOTO_CHECK">
              Araç dış görünüm fotoğrafları
            </option>
          </select>
        </Field>
      </div>
      <p className="mb-3 text-sm text-muted-foreground">
        Başvuruya açık {tasks.length} görev
      </p>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            role="TASK_TAKER"
            extra={
              <span className="text-sm font-bold">
                {formatMoney(task.proposedCompensation)}{" "}
                <span className="text-xs font-normal">örnek tutar</span>
              </span>
            }
          />
        ))}
        {!tasks.length && (
          <EmptyState
            title="Bu şehirde başvuruya açık görev yok"
            action={
              <Button variant="outline" onClick={() => setCity("")}>
                Şehir filtresini temizle
              </Button>
            }
          />
        )}
      </div>
    </AppShell>
  );
}
