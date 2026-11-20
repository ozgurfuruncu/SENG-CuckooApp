import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  ClipboardList,
  Home,
  LogOut,
  PlusCircle,
  RotateCcw,
  Search,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import mascot from "@/assets/mascot.png";
import { cn } from "@/lib/utils";
import { DEMO_ACCOUNTS, useDemo } from "@/mock/store";
import type { Role } from "@/mock/types";
import { Button, Card } from "./ui";

export function Logo({
  light,
  size = "md",
}: {
  light?: boolean;
  size?: "md" | "lg";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-extrabold",
        light ? "text-sidebar-foreground" : "text-primary",
        size === "lg" ? "text-3xl" : "text-xl",
      )}
    >
      <img
        src={mascot}
        alt=""
        width={1024}
        height={1024}
        className={size === "lg" ? "size-12" : "size-8"}
      />
      Cuckoo
    </span>
  );
}

const NAV = {
  EMPLOYER: [
    { to: "/employer", label: "Görevlerim", icon: Home, exact: true },
    {
      to: "/employer/tasks/new",
      label: "Görev oluştur",
      icon: PlusCircle,
      exact: true,
    },
    { to: "/employer/profile", label: "Profil", icon: UserRound },
  ],
  TASK_TAKER: [
    { to: "/taker", label: "Görevlerim", icon: ClipboardList, exact: true },
    { to: "/taker/find", label: "Görev bul", icon: Search },
    { to: "/taker/profile", label: "Profil", icon: UserRound },
  ],
} as const satisfies Record<
  Role,
  readonly { to: string; label: string; icon: typeof Home; exact?: boolean }[]
>;

/** Maps the current screen to the equivalent screen for the other role so one task can be played from both sides. */
function taskIdFromPath(path: string): string | null {
  const m = path.match(/^\/(employer|taker)\/tasks\/([^/]+)/);
  return m && m[2] && m[2] !== "new" ? m[2] : null;
}

export function DemoBar() {
  const { actor, state, setActorId, reset } = useDemo();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="border-b border-warning/30 bg-warning-soft text-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2">
        <span className="rounded-md bg-warning px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-primary-foreground">
          Demo
        </span>
        <label className="flex min-w-0 items-center gap-2 font-medium">
          <span className="shrink-0">Görüntüleyen hesap</span>
          <select
            aria-label="Demo hesabı seç"
            className="min-w-0 rounded-lg border border-input bg-card px-2 py-1.5 text-sm"
            value={actor?.id ?? ""}
            onChange={(e) => {
              const id = e.target.value || null;
              setActorId(id);
              const u = state.users.find((x) => x.id === id);
              const taskId = taskIdFromPath(path);
              if (!u) navigate({ to: "/" });
              else if (taskId)
                navigate(
                  u.role === "EMPLOYER"
                    ? { to: "/employer/tasks/$taskId", params: { taskId } }
                    : { to: "/taker/tasks/$taskId", params: { taskId } },
                );
              else
                navigate({
                  to: u.role === "EMPLOYER" ? "/employer" : "/taker",
                });
            }}
          >
            <option value="">Oturum kapalı</option>
            {state.users.map((u) => (
              <option key={u.id} value={u.id}>
                {DEMO_ACCOUNTS.find((d) => d.id === u.id)?.label ??
                  `${u.role === "EMPLOYER" ? "İşveren" : "Görev Alan"} · ${u.email}`}
              </option>
            ))}
          </select>
        </label>
        <Button variant="ghost" size="sm" onClick={reset}>
          <RotateCcw /> Demoyu sıfırla
        </Button>
        <details className="relative ml-auto">
          <summary className="cursor-pointer rounded-md px-2 py-1 font-medium text-warning">
            Ekip incelemesi bekleniyor
          </summary>
          <div className="absolute right-0 z-30 mt-2 w-72 rounded-xl border bg-card p-4 text-foreground shadow-card">
            <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
              Açık kararlar
            </p>
            <ul className="list-disc space-y-1 pl-4 text-sm">
              <li>Düzeltme koşulları ve inceleme notu</li>
              <li>Kanıt indirme</li>
              <li>Fotoğraf sayısı dışındaki dosya sınırları</li>
              <li>Kanıtların saklama süresi</li>
              <li>Kanıtlara erişim ve görünürlük kuralları</li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
}

export function AppShell({
  role,
  title,
  children,
}: {
  role: Role;
  title: string;
  children: ReactNode;
}) {
  const { actor, setActorId } = useDemo();
  const navigate = useNavigate();
  const items: readonly {
    to: (typeof NAV)[Role][number]["to"];
    label: string;
    icon: typeof Home;
    exact?: boolean;
  }[] = NAV[role];
  const logout = () => {
    setActorId(null);
    navigate({ to: "/" });
  };
  return (
    <div className="flex min-h-screen flex-col" data-screen={title}>
      <DemoBar />
      <div className="flex flex-1">
        <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col bg-sidebar p-4 text-sidebar-foreground md:flex">
          <Link to="/" className="mb-8 px-2">
            <Logo light />
          </Link>
          <nav aria-label="Ana gezinme" className="flex flex-1 flex-col gap-1">
            {items.map((it) => (
              <Link
                key={it.to}
                to={it.to}
                activeOptions={{ exact: it.exact ?? false }}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent data-[status=active]:bg-sidebar-accent data-[status=active]:text-sidebar-foreground"
              >
                <it.icon className="size-4" aria-hidden /> {it.label}
              </Link>
            ))}
          </nav>
          {actor && (
            <p className="mb-2 truncate px-3 text-xs text-sidebar-foreground/70">
              {actor.displayName}
            </p>
          )}
          <Button
            variant="ghost"
            onClick={logout}
            className="justify-start text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <LogOut className="size-4" aria-hidden /> Çıkış yap
          </Button>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col pb-20 md:pb-0">
          <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b bg-card px-4 py-3 md:hidden">
            <Logo />
            <Button
              variant="ghost"
              onClick={logout}
              className="px-2 text-muted-foreground"
              aria-label="Çıkış yap"
            >
              <LogOut className="size-5" />
            </Button>
          </header>
          <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 md:px-8 md:py-8">
            {!actor ? (
              <SignedOutGate />
            ) : actor.role !== role ? (
              <WrongRole role={role} />
            ) : (
              children
            )}
          </main>
        </div>
      </div>
      <nav
        aria-label="Mobil ana gezinme"
        className="fixed inset-x-0 bottom-0 z-20 flex border-t bg-card md:hidden"
      >
        {items.map((it) => (
          <Link
            key={it.to}
            to={it.to}
            activeOptions={{ exact: it.exact ?? false }}
            className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-medium text-muted-foreground data-[status=active]:text-primary"
          >
            <it.icon className="size-5" aria-hidden /> {it.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function SignedOutGate() {
  return (
    <Card className="mx-auto max-w-md space-y-3 text-center">
      <p className="text-lg font-bold">Bir demo hesabı seçin</p>
      <p className="text-sm text-muted-foreground">
        Oturumunuz kapalı. Üstteki listeden bir hesap seçin veya aşağıdaki
        seçeneklerden biriyle demoyu başlatın.
      </p>
      <DemoEntryButtons />
    </Card>
  );
}

function WrongRole({ role }: { role: Role }) {
  return (
    <Card className="mx-auto max-w-md space-y-3 text-center">
      <p className="text-lg font-bold">
        {role === "EMPLOYER"
          ? "Bu ekran işverenlere yöneliktir"
          : "Bu ekran görev alanlara yöneliktir"}
      </p>
      <p className="text-sm text-muted-foreground">
        Devam etmek için üstteki listeden uygun bir demo hesabı seçin.
      </p>
      <DemoEntryButtons />
    </Card>
  );
}

export function DemoEntryButtons({ className }: { className?: string }) {
  const { setActorId } = useDemo();
  const navigate = useNavigate();
  return (
    <div className={cn("flex flex-wrap justify-center gap-2", className)}>
      <Button
        variant="outline"
        onClick={() => {
          setActorId("u-deniz");
          navigate({ to: "/employer" });
        }}
      >
        İşveren demosunu dene
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          setActorId("u-sarah");
          navigate({ to: "/taker" });
        }}
      >
        Görev Alan demosunu dene
      </Button>
    </div>
  );
}

export const backLinkClass =
  "grid size-10 shrink-0 place-items-center rounded-xl text-primary hover:bg-accent";

/** `back` is a typed <Link> rendered by the page, e.g. <Link to="/employer" className={backLinkClass} aria-label="Back"><ArrowLeft /></Link>. */
export function PageHeader({
  title,
  back,
  children,
}: {
  title: string;
  back?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
      <div className="flex min-w-0 items-center gap-2">
        {back}
        <h1 className="text-xl font-extrabold md:text-2xl">{title}</h1>
      </div>
      {children}
    </div>
  );
}
