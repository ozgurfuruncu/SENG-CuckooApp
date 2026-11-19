import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createRoot } from "react-dom/client";
import {
  MockAdapter,
  DemoError,
  DEMO_PASSWORD,
  statusLabels,
  paymentLabels,
  actionLabels,
  samplePhotos,
  photoLabels,
} from "./model.ts";
import type { Task, DemoUser } from "./model.ts";
import "./styles.css";

const api = new MockAdapter();
const money = (n: number) =>
  new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(n);
const date = (s?: string | null) =>
  s
    ? new Intl.DateTimeFormat("tr-TR", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Europe/Istanbul",
      }).format(new Date(s))
    : "Belirtilmedi";
const go = (path: string) => {
  window.location.hash = path;
};
const person = (id: string | null) =>
  api.demoUsers().find((u) => u.id === id)?.name || "Henüz atanmadı";
function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    home: (
      <>
        <path d="m3 10 9-7 9 7v11H3Z" />
        <path d="M9 21v-8h6v8" />
      </>
    ),
    tasks: (
      <>
        <rect x="4" y="5" width="16" height="16" rx="2" />
        <path d="M8 3v4m8-4v4M8 12h8m-8 4h5" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    search: (
      <>
        <circle cx="10" cy="10" r="6" />
        <path d="m15 15 6 6" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 22v-3a8 8 0 0 1 16 0v3" />
      </>
    ),
    history: (
      <>
        <path d="M3 11a9 9 0 1 1 2 7M3 4v7h7m2-5v6l4 3" />
      </>
    ),
    pin: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    camera: (
      <>
        <path d="m8 5 2-3h4l2 3h5v15H3V5Z" />
        <circle cx="12" cy="12" r="4" />
      </>
    ),
    shield: (
      <>
        <path d="m12 2 9 4v6c0 6-9 10-9 10S3 18 3 12V6Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    check: <path d="m5 12 4 4L20 5" />,
    exit: (
      <>
        <path d="M9 3H3v18h6m4-14 5 5-5 5m-5-5h15" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.tasks}
    </svg>
  );
}
function Bird({ large = false }: { large?: boolean }) {
  return (
    <svg
      className={large ? "bird large" : "bird"}
      viewBox="0 0 140 150"
      aria-hidden="true"
    >
      <ellipse cx="70" cy="140" rx="44" ry="6" fill="#b6c9f3" />
      <path d="M36 106Q4 137 31 136L64 115" fill="#102a65" />
      <ellipse cx="74" cy="83" rx="43" ry="53" fill="#244eac" />
      <ellipse cx="83" cy="95" rx="28" ry="38" fill="#f5f8ff" />
      <path d="M42 74Q15 95 34 119Q65 112 61 86" fill="#102a65" />
      <ellipse cx="71" cy="54" rx="10" ry="14" fill="white" />
      <ellipse cx="96" cy="57" rx="10" ry="14" fill="white" />
      <circle cx="74" cy="56" r="4" fill="#102a65" />
      <circle cx="94" cy="59" r="4" fill="#102a65" />
      <path d="m84 67 16 6-15 7Z" fill="#e2aa39" />
      <path
        d="m59 135-8 8h17m19-8 2 8h13"
        stroke="#102a65"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="m46 34 17-16-2 13 16-12-3 17" fill="#244eac" />
    </svg>
  );
}
function Badge({ task }: { task: Task }) {
  return (
    <span className={`badge ${task.status.toLowerCase()}`}>
      {statusLabels[task.status]}
    </span>
  );
}
function Notice({
  children,
  tone = "info",
}: {
  children: React.ReactNode;
  tone?: string;
}) {
  return (
    <div className={`notice ${tone}`}>
      <Icon name="shield" />
      <div>{children}</div>
    </div>
  );
}
function Empty({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="empty">
      <Icon name="tasks" size={34} />
      <h2>{title}</h2>
      <p>{children || "Yeni bir işlem olduğunda burada görünecek."}</p>
    </div>
  );
}
function Dialog({
  title,
  children,
  confirm,
  close,
  danger = false,
}: {
  title: string;
  children: React.ReactNode;
  confirm: () => void;
  close: () => void;
  danger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const el = ref.current;
    el?.querySelector<HTMLButtonElement>("button")?.focus();
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && el) {
        const nodes = el.querySelectorAll<HTMLElement>("button");
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
      previous?.focus();
    };
  }, [close]);
  return (
    <div className="modal-backdrop">
      <div
        ref={ref}
        className="modal card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <span className="round-icon">
          <Icon name={danger ? "tasks" : "check"} size={28} />
        </span>
        <h2 id="dialog-title">{title}</h2>
        {children}
        <div className="actions">
          <button className="button secondary" onClick={close}>
            Vazgeç
          </button>
          <button
            className={`button ${danger ? "danger" : ""}`}
            onClick={confirm}
          >
            İşlemi onayla
          </button>
        </div>
      </div>
    </div>
  );
}
function App() {
  useSyncExternalStore(api.subscribe, api.getSnapshot);
  const [path, setPath] = useState(window.location.hash.slice(1) || "/giris");
  const [message, setMessage] = useState<{
    text: string;
    error: boolean;
  } | null>(null);
  const [dialog, setDialog] = useState<{
    title: string;
    body: string;
    action: () => void;
    danger?: boolean;
  } | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const keepFeedbackAfterNavigation = useRef(false);
  const user = api.currentUser();
  useEffect(() => {
    const change = () => {
      setPath(window.location.hash.slice(1) || "/giris");
      if (keepFeedbackAfterNavigation.current) {
        keepFeedbackAfterNavigation.current = false;
      } else {
        setMessage(null);
      }
    };
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    (heading.current || document.querySelector<HTMLElement>("main h1"))?.focus();
    window.scrollTo(0, 0);
  }, [path]);
  useEffect(() => {
    if (message?.error)
      document.querySelector<HTMLElement>('[role="alert"]')?.focus();
  }, [message]);
  const act = (fn: () => void, success: string) => {
    try {
      const previousHash = window.location.hash;
      fn();
      keepFeedbackAfterNavigation.current = previousHash !== window.location.hash;
      setMessage({ text: success, error: false });
    } catch (e) {
      setMessage({
        text:
          e instanceof DemoError
            ? e.message
            : "Beklenmeyen bir demo hatası oluştu. Örnek verileri sıfırlayıp yeniden deneyin.",
        error: true,
      });
    }
  };
  const ask = (
    title: string,
    body: string,
    action: () => void,
    danger = false,
  ) => setDialog({ title, body, action, danger });
  const isEmployer = user?.role === "EMPLOYER";
  const nav = [
    { path: "/panel", title: "Genel bakış", icon: "home" },
    {
      path: "/gorevler",
      title: isEmployer ? "Görevlerim" : "Görevleri keşfet",
      icon: "tasks",
    },
    ...(isEmployer
      ? [{ path: "/yeni", title: "Görev oluştur", icon: "plus" }]
      : [{ path: "/basvurular", title: "Başvurularım", icon: "tasks" }]),
    { path: "/profil", title: "Profilim", icon: "user" },
    { path: "/gecmis", title: "Görev geçmişi", icon: "history" },
  ];
  const titles: Record<string, string> = {
    "/panel": "Genel bakış",
    "/gorevler": isEmployer ? "Görevlerim" : "Görevleri keşfet",
    "/yeni": "Görev oluştur",
    "/basvurular": "Başvurularım",
    "/profil": "Profilim",
    "/gecmis": "Görev geçmişi",
  };
  const details = path.match(
    /^\/gorev\/([^/]+)(?:\/(basvurular|kanitlar|gecmis))?$/,
  );
  const feedback = message && (
    <div
      className={`feedback ${message.error ? "error" : "success"}`}
      role={message.error ? "alert" : "status"}
      tabIndex={-1}
    >
      {message.text}
      <button aria-label="Bildirimi kapat" onClick={() => setMessage(null)}>
        ×
      </button>
    </div>
  );
  return (
    <>
      <a
        className="skip"
        href="#icerik"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("icerik")?.focus();
        }}
      >
        İçeriğe geç
      </a>
      <div className="demo-bar">
        <span>
          <strong>Tasarım demosu</strong>
          <span className="desktop-copy">
            {" "}
            · Kurgusal kişiler ve örnek fotoğraflar
          </span>{" "}
          · Gerçek para transferi yapılmaz.
        </span>
        <button
          onClick={() =>
            ask(
              "Örnek veriler sıfırlansın mı?",
              "Bu oturumdaki görevler ve değişiklikler silinir; hazır örnekler geri yüklenir.",
              () => {
                api.reset();
                go("/giris");
              },
              true,
            )
          }
        >
          Demoyu sıfırla
        </button>
      </div>
      {!user || ["/giris", "/kayit", "/"].includes(path) ? (
        <main id="icerik" tabIndex={-1} className="auth-main">
          <Auth register={path === "/kayit"} act={act} feedback={feedback} />
        </main>
      ) : (
        <div className="app-layout">
          <aside className="sidebar">
            <a className="brand" href="#/panel" aria-label="Cuckoo genel bakış">
              <Bird />
              <span>
                Cuckoo<small>İzinli fotoğraf, açık süreç.</small>
              </span>
            </a>
            <div className="role-tag">
              {isEmployer ? "İşveren alanı" : "Görev alan paneli"}
            </div>
            <nav aria-label="Ana gezinme">
              {nav.map((n) => (
                <a
                  key={n.path}
                  className={path === n.path ? "active" : ""}
                  href={`#${n.path}`}
                  aria-current={path === n.path ? "page" : undefined}
                >
                  <Icon name={n.icon} />
                  {n.title}
                </a>
              ))}
              <button
                className="mobile-logout"
                onClick={() => {
                  api.logout();
                  go("/giris");
                }}
              >
                Çıkış yap
              </button>
            </nav>
            <div className="sidebar-foot">
              <Icon name="shield" />
              <p>
                Yalnızca izinli dış görünüm fotoğrafları.
                <br />
                Beyan edilen bilgiler doğrulanmaz.
              </p>
              <button
                onClick={() => {
                  api.logout();
                  go("/giris");
                }}
              >
                <Icon name="exit" />
                Çıkış yap
              </button>
            </div>
          </aside>
          <div className="workspace">
            <header className="topbar">
              <div className="breadcrumb">
                Çalışma alanı <span>/</span>{" "}
                {details ? "Görev ayrıntısı" : titles[path] || "Sayfa"}
              </div>
              <div className="demo-switch">
                <label htmlFor="demo-user">Örnek kullanıcı</label>
                <select
                  id="demo-user"
                  value={user.id}
                  onChange={(e) =>
                    act(
                      () => api.switchDemoUser(e.target.value),
                      "Örnek kullanıcı değişti; görevlerdeki ilerleme korundu.",
                    )
                  }
                >
                  {api.demoUsers().map((u) => (
                    <option value={u.id} key={u.id}>
                      {u.name} ·{" "}
                      {u.role === "EMPLOYER" ? "İşveren" : "Görev alan"}
                    </option>
                  ))}
                </select>
                <span className="avatar" aria-hidden="true">
                  {user.name
                    .split(" ")
                    .map((x) => x[0])
                    .join("")}
                </span>
              </div>
            </header>
            <main id="icerik" tabIndex={-1} className="content">
              {feedback}
              {details ? (
                <TaskDetail
                  key={`${details[1]}-${details[2] || "ozet"}-${user.id}`}
                  id={details[1]}
                  tab={details[2] || "ozet"}
                  user={user}
                  act={act}
                  ask={ask}
                />
              ) : (
                <>
                  <div className="page-heading">
                    <div>
                      <p className="eyebrow">CUCKOO · SENİN ÇALIŞMA ALANIN</p>
                      <h1 ref={heading} tabIndex={-1}>
                        {titles[path] || "Sayfa bulunamadı"}
                      </h1>
                    </div>
                    <span className="today">19 Kasım 2026 · Sprint 2</span>
                  </div>
                  {path === "/panel" ? (
                    <Dashboard user={user} />
                  ) : path === "/gorevler" ? (
                    <TaskList user={user} />
                  ) : path === "/yeni" ? (
                    isEmployer ? (
                      <CreateTask act={act} />
                    ) : (
                      <Notice>
                        Görev oluşturmak yalnızca işverenlere açık.
                      </Notice>
                    )
                  ) : path === "/profil" ? (
                    <Profile key={user.id} user={user} act={act} />
                  ) : path === "/basvurular" ? (
                    <Applications user={user} />
                  ) : path === "/gecmis" ? (
                    <History user={user} />
                  ) : (
                    <Empty title="Bu sayfa bulunamadı">
                      <a href="#/panel">Genel bakışa dön</a>
                    </Empty>
                  )}
                </>
              )}
              <footer className="page-footer">
                <span>Cuckoo · SENG 321, Takım 5</span>
                <span>
                  Yerel prototip · Sayfa yenilenince örnekler sıfırlanır.
                </span>
              </footer>
            </main>
          </div>
        </div>
      )}
      {dialog && (
        <Dialog
          title={dialog.title}
          danger={dialog.danger}
          close={() => setDialog(null)}
          confirm={() => {
            const action = dialog.action;
            setDialog(null);
            action();
          }}
        >
          <p>{dialog.body}</p>
        </Dialog>
      )}
    </>
  );
}
type Act = (fn: () => void, success: string) => void;
type Ask = (
  title: string,
  body: string,
  action: () => void,
  danger?: boolean,
) => void;
function Auth({
  register,
  act,
  feedback,
}: {
  register: boolean;
  act: Act;
  feedback: React.ReactNode;
}) {
  const [email, setEmail] = useState("deniz@example.test");
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [role, setRole] = useState<"EMPLOYER" | "TASK_TAKER">("EMPLOYER");
  return (
    <div className="auth-grid">
      <section className="welcome">
        <div className="brand">
          <Bird />
          <span>Cuckoo</span>
        </div>
        <div>
          <p className="eyebrow">BİRBİRİMİZE YAKIN, SÜRECE HÂKİM.</p>
          <h1>
            Senin için bir çift göz.
            <br />
            <span>İzinli, sade, şeffaf.</span>
          </h1>
          <p>
            Aracın dış görünümü için fotoğraf görevi oluştur, yerel bir görevli
            seç ve gelen kanıtları tek yerde incele.
          </p>
        </div>
        <div className="welcome-art">
          <div className="orbit" />
          <Bird large />
          <div className="floating-card">
            <Icon name="camera" />4 açı, tek görev
          </div>
          <div className="floating-card second">
            <Icon name="shield" />
            Katılımcılara özel kanıt
          </div>
        </div>
        <p className="welcome-note">
          Araç teslimi, sürüş veya profesyonel inceleme içermez.
        </p>
      </section>
      <section
        className="auth-card card"
        data-screen={register ? "O02-Kayit" : "O01-Giris"}
      >
        <p className="eyebrow">HOŞ GELDİN</p>
        <h2>
          {register ? "Örnek hesabını oluştur" : "Kaldığın yerden devam et"}
        </h2>
        <p className="muted">
          Bu bir tasarım demosu. Gerçek e-posta veya şifre girme.
        </p>
        {feedback}
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            act(
              () => {
                if (register) api.registerUser({ email, password, role });
                else api.createSession({ email, password });
                go(
                  api.currentUser()?.role === "TASK_TAKER" &&
                    !api.currentUser()?.operatingCity
                    ? "/profil"
                    : "/panel",
                );
              },
              register ? "Örnek hesap oluşturuldu." : "Örnek oturum açıldı.",
            );
          }}
        >
          {!register && (
            <label>
              Hazır örnek hesap
              <select
                aria-label="Hazır örnek hesap"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setPassword(DEMO_PASSWORD);
                }}
                value={email}
              >
                {api.demoUsers().map((u) => (
                  <option key={u.id} value={u.email}>
                    {u.name} ·{" "}
                    {u.role === "EMPLOYER" ? "İşveren" : "Görev alan"}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label>
            E-posta
            <input
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@example.test"
              required
            />
          </label>
          <label>
            Demo şifresi
            <input
              type="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-describedby="demo-password"
            />
          </label>
          <small id="demo-password">
            Yalnızca demo şifresi: <strong>Demo1234!</strong>
          </small>
          {register && (
            <label>
              Hesap türü
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as typeof role)}
              >
                <option value="EMPLOYER">İşveren</option>
                <option value="TASK_TAKER">Görev alan</option>
              </select>
            </label>
          )}
          <button className="button full" type="submit">
            {register ? "Örnek hesap oluştur" : "Giriş yap"}
          </button>
        </form>
        <p className="auth-link">
          {register
            ? "Hazır bir hesapla denemek ister misin?"
            : "Yeni bir örnek hesap mı?"}{" "}
          <a href={register ? "#/giris" : "#/kayit"}>
            {register ? "Giriş yap" : "Kayıt ol"}
          </a>
        </p>
        <Notice>
          Hesaplar, fotoğraflar ve ödeme adımları simüledir. Gerçek para
          transferi yapılmaz.
        </Notice>
      </section>
    </div>
  );
}
function TaskCard({ task }: { task: Task }) {
  return (
    <article className="task-card card">
      <div className="task-image">
        <img
          src="/assets/vehicle-on.svg"
          alt="Kurgusal araç çizimi; gerçek araç fotoğrafı değildir"
        />
        <span className="image-label">Örnek görsel</span>
      </div>
      <div className="task-card-body">
        <div className="row">
          <span className="overline">ARAÇ FOTOĞRAFLARI</span>
          <Badge task={task} />
        </div>
        <h3>
          <a href={`#/gorev/${task.id}`}>{task.title}</a>
        </h3>
        <p className="muted clamp">{task.description}</p>
        <div className="task-meta">
          <span>
            <Icon name="pin" size={16} />
            {task.city}
          </span>
          <span>
            {money(task.proposedCompensation)} <small>simüle</small>
          </span>
        </div>
        <div className="card-bottom">
          <small>
            {task.id} ·{" "}
            {task.requestedBy
              ? date(task.requestedBy).split(" ").slice(0, 3).join(" ")
              : "Hedef tarih yok"}
          </small>
          <a className="text-link" href={`#/gorev/${task.id}`}>
            Ayrıntıları gör
          </a>
        </div>
      </div>
    </article>
  );
}
function Dashboard({ user }: { user: DemoUser }) {
  const employer = user.role === "EMPLOYER";
  const tasks = api
    .listTasks()
    .filter((t) =>
      employer ? t.employerId === user.id : t.assignedWorkerId === user.id,
    );
  return (
    <div data-screen={employer ? "E01-Panel" : "G01-Panel"}>
      <section className="hero-banner">
        <div>
          <p>{user.name}, hoş geldin.</p>
          <h2>
            {employer
              ? "Bir görevle başla.\nHer adımı birlikte takip edelim."
              : "Yakınındaki görevleri keşfet.\nSüreci güvenle takip et."}
          </h2>
          <a className="button light" href={employer ? "#/yeni" : "#/gorevler"}>
            <Icon name={employer ? "plus" : "search"} />
            {employer ? "Yeni görev oluştur" : "Açık görevleri keşfet"}
          </a>
        </div>
        <Bird large />
      </section>
      <div className="stats">
        <div className="card stat">
          <span>Aktif görev</span>
          <strong>
            {
              tasks.filter(
                (t) => !["COMPLETED", "CANCELLED"].includes(t.status),
              ).length
            }
          </strong>
          <small>Takip edilecek adımlar</small>
        </div>
        <div className="card stat">
          <span>İnceleme bekleyen</span>
          <strong>
            {tasks.filter((t) => t.status === "EVIDENCE_SUBMITTED").length}
          </strong>
          <small>Kanıtlar katılımcılara özel</small>
        </div>
        <div className="card stat">
          <span>Tamamlanan</span>
          <strong>
            {tasks.filter((t) => t.status === "COMPLETED").length}
          </strong>
          <small>Simüle süreç tamamlandı</small>
        </div>
      </div>
      {!employer && !user.operatingCity && (
        <Notice tone="warning">
          Başvurmadan önce çalışma şehrini seçmelisin.{" "}
          <a href="#/profil">Profilini tamamla</a>
        </Notice>
      )}
      <div className="section-heading">
        <h2>{employer ? "Görevlerin" : "Atandığın görevler"}</h2>
        <a href={employer ? "#/gorevler" : "#/gecmis"}>Tümünü gör</a>
      </div>
      <div className="task-grid">
        {tasks.slice(0, 3).map((t) => (
          <TaskCard key={t.id} task={t} />
        ))}
      </div>
      {!tasks.length && (
        <Empty title="Henüz bir görevin yok">
          {employer
            ? "İzinli bir araç fotoğrafı görevi oluşturarak başlayabilirsin."
            : "Açık görevleri keşfedip başvuru yapabilirsin."}
        </Empty>
      )}
      <div className="bottom-note">
        <Icon name="shield" />
        <div>
          <strong>Ne yaptığımız net.</strong>
          <p>
            Yalnızca izinli dış görünüm kaydı. Ödemeler simüle, şehir ve
            beceriler kişilerin kendi beyanıdır.
          </p>
        </div>
      </div>
    </div>
  );
}
function TaskList({ user }: { user: DemoUser }) {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const employer = user.role === "EMPLOYER";
  const tasks = api
    .listTasks({ city, search })
    .filter((t) =>
      employer
        ? t.employerId === user.id && (!status || t.status === status)
        : t.status === "OPEN",
    );
  return (
    <div data-screen={employer ? "E02-Gorevler" : "G03-Kesfet"}>
      <p className="intro">
        {employer
          ? "Açık görevlerinden tamamlananlara, tüm süreci bir arada gör."
          : "Yalnızca izinli araç fotoğrafı görevleri. Şehir ve arama ile sana uygun görevi bul."}
      </p>
      {!employer && (
        <Notice>
          Çalışma şehrin:{" "}
          <strong>{user.operatingCity || "Henüz seçilmedi"}</strong>. Başvuru
          öncesi şehir zorunlu; başka şehirlerdeki ilanlara bakabilirsin.{" "}
          <a href="#/profil">Profili düzenle</a>
        </Notice>
      )}
      <div className="filters card">
        <label className="search-field">
          Görev ara
          <div>
            <Icon name="search" />
            <input
              type="search"
              value={search}
              placeholder="Başlık veya açıklama"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </label>
        <label>
          Şehir
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Tüm şehirler</option>
            {["Ankara", "İstanbul", "İzmir", "Bursa", "Antalya"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        {employer ? (
          <label>
            Görev durumu
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Tüm durumlar</option>
              {Object.entries(statusLabels).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <label>
            Kategori
            <select>
              <option>İzinli araç fotoğrafları</option>
            </select>
          </label>
        )}
        <button
          className="button secondary"
          onClick={() => {
            setSearch("");
            setCity("");
            setStatus("");
          }}
        >
          Filtreleri temizle
        </button>
      </div>
      <p className="result-count" role="status">
        {tasks.length} görev bulundu
      </p>
      <div className="task-grid">
        {tasks.map((t) => (
          <TaskCard task={t} key={t.id} />
        ))}
      </div>
      {!tasks.length && (
        <Empty title="Bu filtrelerde görev bulunamadı">
          Aramanı veya şehir filtresini değiştir. Yeni bir görev için daha sonra
          tekrar bakabilirsin.
        </Empty>
      )}
    </div>
  );
}
function CreateTask({ act }: { act: Act }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [amount, setAmount] = useState("450");
  const [requiredEvidence, setRequiredEvidence] = useState(
    "Önden, arkadan ve iki yandan dört fotoğraf ile görünür ayrıntı notları.",
  );
  const [permission, setPermission] = useState(false);
  const [deadline, setDeadline] = useState("");
  return (
    <div className="form-layout" data-screen="E03-Gorev-Olustur">
      <form
        className="card form-card"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          act(() => {
            if (amount.trim() === "")
              throw new DemoError(
                400,
                "INVALID_AMOUNT",
                "Örnek tutarı girin; sıfır da olabilir.",
              );
            const t = api.createTask({
              title,
              description,
              city,
              proposedCompensation: Number(amount),
              category: "VEHICLE_PHOTO_CHECK",
              requiredEvidence,
              permissionConfirmed: permission,
              requestedBy: deadline ? `${deadline}:00+03:00` : null,
            });
            go(`/gorev/${t.id}`);
          }, "Görev oluşturuldu ve başvurulara açıldı.");
        }}
      >
        <div className="form-section">
          <span className="step-dot">1</span>
          <div>
            <h2>Görevi anlat</h2>
            <p className="muted">
              Kişisel bilgi paylaşmadan, hangi görüntülere ihtiyaç duyduğunu
              yaz.
            </p>
          </div>
        </div>
        <label>
          Görev başlığı <span className="required">Zorunlu</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            minLength={5}
            maxLength={150}
            required
            placeholder="Çankaya · dört açıdan dış görünüm"
          />
          <small>5–150 karakter</small>
        </label>
        <label>
          Açıklama <span className="required">Zorunlu</span>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minLength={20}
            maxLength={2000}
            required
            placeholder="İzinli dış görünüm fotoğraflarının kapsamını belirt."
          />
          <small>
            20–2.000 karakter · Sürüş veya mekanik inceleme talep etme.
          </small>
        </label>
        <div className="two-col">
          <label>
            Şehir <span className="required">Zorunlu</span>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            >
              <option value="">Şehir seç</option>
              {["Ankara", "İstanbul", "İzmir", "Bursa", "Antalya"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label>
            Örnek tutar (TL) <span className="required">Zorunlu</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <small>Yalnızca simülasyon; ücret tahsil edilmez.</small>
          </label>
        </div>
        <label>
          İstenen kanıt <span className="required">Zorunlu</span>
          <textarea
            rows={3}
            value={requiredEvidence}
            onChange={(e) => setRequiredEvidence(e.target.value)}
            maxLength={1000}
            required
          />
        </label>
        <label>
          Hedef tarih ve saat{" "}
          <span className="optional">İsteğe bağlı · Türkiye saati</span>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </label>
        <label className="check-label">
          <input
            type="checkbox"
            checked={permission}
            onChange={(e) => setPermission(e.target.checked)}
          />
          <span>
            Araç sahibinin ve konumun izninin alınması gerektiğini onaylıyorum.{" "}
            <strong>Zorunlu</strong>
          </span>
        </label>
        <div className="actions">
          <a className="button secondary" href="#/gorevler">
            Vazgeç
          </a>
          <button className="button" type="submit">
            Görevi yayımla
          </button>
        </div>
      </form>
      <aside className="card help-card">
        <span className="round-icon">
          <Icon name="camera" size={28} />
        </span>
        <h2>
          Bir fotoğraf görevi.
          <br />
          Sınırları belli.
        </h2>
        <p>
          Yalnızca park halindeki aracın izinli dış görünümü ve görülebilen
          ayrıntılar.
        </p>
        <ul>
          <li>Tek kategori: araç fotoğrafları</li>
          <li>Plaka ve kişisel bilgileri kadraj dışında tut</li>
          <li>Kanıtlar yalnızca katılımcılara açık</li>
          <li>Gerçek para transferi yapılmaz</li>
        </ul>
        <Bird />
      </aside>
    </div>
  );
}
function Profile({ user, act }: { user: DemoUser; act: Act }) {
  const [city, setCity] = useState(user.operatingCity || "");
  const [occupation, setOccupation] = useState(user.occupation || "");
  const [skills, setSkills] = useState(user.skills.join(", "));
  return (
    <div className="form-layout" data-screen="G02-Profil">
      <form
        className="card form-card"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          act(() => {
            api.updateMyProfile({
              operatingCity: city || null,
              occupation: occupation || null,
              skills: skills
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            });
          }, "Profil kaydedildi. Bilgilerin kendi beyanına dayanır.");
        }}
      >
        <div className="profile-heading">
          <span className="avatar big">
            {user.name
              .split(" ")
              .map((x) => x[0])
              .join("")}
          </span>
          <div>
            <h2>{user.name}</h2>
            <p className="muted">
              {user.role === "EMPLOYER" ? "İşveren" : "Görev alan"} · Örnek
              hesap
            </p>
          </div>
        </div>
        <Notice>
          Şehir, meslek ve beceriler kendi beyanındır; doğrulanmış uzmanlık veya
          kimlik anlamına gelmez.
        </Notice>
        <label>
          Çalışma şehri
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            aria-describedby="city-help"
          >
            <option value="">Henüz seçilmedi</option>
            {["Ankara", "İstanbul", "İzmir", "Bursa", "Antalya"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <small id="city-help">
            Görev alanlar için başvurmadan önce zorunludur.
          </small>
        </label>
        <label>
          Meslek veya uğraş <span className="optional">İsteğe bağlı</span>
          <input
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            maxLength={100}
            placeholder="Örneğin öğrenci"
          />
        </label>
        <label>
          Beceriler <span className="optional">İsteğe bağlı</span>
          <input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            aria-describedby="skills-help"
            placeholder="Fotoğraf çekimi, ayrıntı notları"
          />
          <small id="skills-help">
            Virgülle ayır; en fazla 10 beceri, her biri en fazla 60 karakter.
          </small>
        </label>
        <div className="actions">
          <button className="button">Profili kaydet</button>
          <a className="button secondary" href="#/gorevler">
            Görevleri keşfet
          </a>
        </div>
      </form>
      <aside className="card help-card">
        <h2>
          Şehrini seç,
          <br />
          ilk adımı at.
        </h2>
        <p>
          Çalışma şehrin yalnızca beyan ettiğin çalışma alanıdır. Konum takibi
          veya GPS doğrulaması yapılmaz.
        </p>
        <Bird large />
      </aside>
    </div>
  );
}
function TaskDetail({
  id,
  tab,
  user,
  act,
  ask,
}: {
  id: string;
  tab: string;
  user: DemoUser;
  act: Act;
  ask: Ask;
}) {
  const [note, setNote] = useState("");
  const [reviewNote, setReviewNote] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  let task: Task;
  try {
    task = api.getTask(id);
  } catch {
    return (
      <Empty title="Görev bulunamadı">
        <a href="#/gorevler">Görevlere dön</a>
      </Empty>
    );
  }
  const own = task.employerId === user.id;
  const assigned = task.assignedWorkerId === user.id;
  const participant = own || assigned;
  const myApplication = api.listMyApplications().find((a) => a.taskId === id);
  const evidence = participant ? api.listTaskEvidence(id) : [];
  const latest = evidence.at(-1);
  const canSubmit =
    assigned &&
    ["ASSIGNED", "REVISION_REQUESTED"].includes(task.status) &&
    task.paymentSimulationStatus === "HELD_SIMULATED";
  return (
    <div data-screen={`${own ? "E" : "G"}-Gorev-${tab}`}>
      <a className="back-link" href="#/gorevler">
        Görevlere dön
      </a>
      <div className="detail-heading">
        <div>
          <p className="eyebrow">{id} · İZİNLİ ARAÇ FOTOĞRAFLARI</p>
          <h1 tabIndex={-1}>{task.title}</h1>
          <div className="detail-sub">
            <span>
              <Icon name="pin" size={17} />
              {task.city}
            </span>
            <span>Hedef: {date(task.requestedBy)}</span>
          </div>
        </div>
        <Badge task={task} />
      </div>
      <div className="progress-track" aria-label="Görev ilerlemesi">
        {[
          "Görev oluşturuldu",
          "Görevli seçildi",
          "Kanıt inceleniyor",
          "Tamamlandı",
        ].map((s, i) => (
          <span
            key={s}
            className={
              (
                task.status === "CANCELLED"
                  ? i === 0
                  : i <=
                    (task.status === "OPEN"
                      ? 0
                      : task.status === "ASSIGNED"
                        ? 1
                        : task.status === "COMPLETED"
                          ? 3
                          : 2)
              )
                ? "done"
                : ""
            }
          >
            <span>{i + 1}</span>
            {s}
          </span>
        ))}
      </div>
      <nav className="tabs" aria-label="Görev bölümleri">
        {[
          { k: "ozet", v: "Genel bakış" },
          { k: "basvurular", v: "Başvurular" },
          { k: "kanitlar", v: "Kanıtlar" },
          { k: "gecmis", v: "İşlem geçmişi" },
        ].map((t) => (
          <a
            key={t.k}
            aria-current={tab === t.k ? "page" : undefined}
            className={tab === t.k ? "active" : ""}
            href={`#/gorev/${id}${t.k === "ozet" ? "" : `/${t.k}`}`}
          >
            {t.v}
          </a>
        ))}
      </nav>
      <div className="detail-layout">
        <section>
          {tab === "ozet" && (
            <>
              <div className="card detail-card">
                <img
                  className="detail-cover"
                  src="/assets/vehicle-on.svg"
                  alt="Örnek araç çizimi"
                />
                <div className="detail-copy">
                  <h2>Görev açıklaması</h2>
                  <p>{task.description}</p>
                  <h3>İstenen kanıt</h3>
                  <p>{task.requiredEvidence}</p>
                  <Notice>
                    Araç sahibi ve konum için izin gerektiği işveren tarafından
                    onaylandı. Bu bir doğrulama veya uzman incelemesi değildir.
                  </Notice>
                </div>
              </div>
              {user.role === "TASK_TAKER" && !assigned && (
                <div className="card detail-copy apply-card">
                  <h2>Bu göreve başvur</h2>
                  {!user.operatingCity && (
                    <Notice tone="warning">
                      Başvuru için çalışma şehri gerekli.{" "}
                      <a href="#/profil">Çalışma şehrini seç</a>
                    </Notice>
                  )}
                  {myApplication ? (
                    <Notice tone="success">
                      {task.status === "CANCELLED"
                        ? "Görev iptal edildi."
                        : task.assignedWorkerId
                          ? "Başka bir görevli seçildi."
                          : "Başvurun alındı. İşverenin seçimi bekleniyor."}
                    </Notice>
                  ) : (
                    <form
                      noValidate
                      onSubmit={(e) => {
                        e.preventDefault();
                        act(() => {
                          api.applyForTask(id, note);
                        }, "Başvurun alındı. Durumunu Başvurularım ekranından izleyebilirsin.");
                      }}
                    >
                      <label>
                        Başvuru notu{" "}
                        <span className="optional">İsteğe bağlı</span>
                        <textarea
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          maxLength={500}
                          rows={3}
                        />
                      </label>
                      <button
                        className="button"
                        disabled={!user.operatingCity || task.status !== "OPEN"}
                        type="submit"
                      >
                        Başvuru gönder
                      </button>
                      {task.status !== "OPEN" && (
                        <p className="muted">
                          Bu görev yeni başvurulara kapalı.
                        </p>
                      )}
                    </form>
                  )}
                </div>
              )}
            </>
          )}
          {tab === "basvurular" &&
            (own ? (
              <div className="card detail-copy">
                <h2>Başvuran kişiler</h2>
                <p className="muted">
                  Tek bir kişi seçebilirsin. Şehir, meslek ve beceriler
                  kişilerin kendi beyanıdır.
                </p>
                {api.listTaskApplications(id).length ? (
                  api.listTaskApplications(id).map((a) => {
                    const p = api.demoUsers().find((u) => u.id === a.workerId)!;
                    return (
                      <article className="applicant" key={a.id}>
                        <div className="row">
                          <span className="avatar">{p.name[0]}</span>
                          <div className="grow">
                            <h3>{p.name}</h3>
                            <p className="muted">
                              {p.operatingCity} ·{" "}
                              {p.occupation || "Meslek belirtilmedi"}
                            </p>
                          </div>
                          {task.assignedWorkerId === p.id && (
                            <span className="badge completed">Seçildi</span>
                          )}
                        </div>
                        <div className="tags">
                          {p.skills.map((s) => (
                            <span key={s}>{s}</span>
                          ))}
                        </div>
                        <p>{a.note || "Başvuru notu eklenmedi."}</p>
                        <small>
                          Kendi beyanı · doğrulanmış yeterlilik değildir.
                        </small>
                        <button
                          className="button secondary"
                          disabled={task.status !== "OPEN"}
                          onClick={() =>
                            ask(
                              "Bu kişi göreve atansın mı?",
                              `${p.name} bu görevin tek atanmış görevlisi olacak. Ardından simüle ödeme bekletmesini kaydetmelisin.`,
                              () =>
                                act(() => {
                                  api.assignTask(id, a.id);
                                }, "Görevli atandı. Şimdi simüle ödeme bekletmesini kaydedebilirsin."),
                            )
                          }
                        >
                          Görevli olarak seç
                        </button>
                      </article>
                    );
                  })
                ) : (
                  <Empty title="Henüz başvuru yok">
                    Örnek kullanıcıyı Ece Demir olarak değiştir, çalışma şehrini
                    seç ve bu açık göreve başvur.
                  </Empty>
                )}
              </div>
            ) : (
              <Notice>
                Başvuru listesi yalnızca görevin sahibine açık.{" "}
                <a href="#/basvurular">Kendi başvurularımı gör</a>
              </Notice>
            ))}
          {tab === "kanitlar" &&
            (!participant ? (
              <div className="card detail-copy">
                <span className="round-icon">
                  <Icon name="shield" size={32} />
                </span>
                <h2>Bu kanıtlar sana kapalı</h2>
                <p>
                  Yalnızca görev sahibi ve atanmış görevli, örnek fotoğrafları
                  ve notları görüntüleyebilir. Başvurmuş olmak erişim sağlamaz.
                </p>
              </div>
            ) : (
              <>
                {latest ? (
                  <div className="card detail-copy evidence-card">
                    <div className="row">
                      <span className="round-icon green">
                        <Icon name="check" />
                      </span>
                      <div>
                        <h2>Kanıtlar gönderildi</h2>
                        <p className="muted">
                          {evidence.length}. gönderim ·{" "}
                          {date(latest.submittedAt)}
                        </p>
                      </div>
                    </div>
                    <Notice>
                      Katılımcılara özel · Bunlar yerel örnek çizimlerdir,
                      gerçek fotoğraf veya dosya değildir.
                    </Notice>
                    <div className="photo-grid">
                      {api.evidencePreviews(id, latest.id).map((p) => (
                        <figure key={p}>
                          <img
                            src={`/assets/vehicle-${p}.svg`}
                            alt={`${photoLabels[p]} · kurgusal örnek`}
                          />
                          <figcaption>{photoLabels[p]} · Örnek</figcaption>
                        </figure>
                      ))}
                    </div>
                    <div className="note-box">
                      <strong>Görevlinin notu</strong>
                      <p>{latest.notes}</p>
                    </div>
                    {evidence.length > 1 && (
                      <details>
                        <summary>
                          Önceki gönderimler ({evidence.length - 1})
                        </summary>
                        {evidence.slice(0, -1).map((e) => (
                          <div className="note-box" key={e.id}>
                            <strong>
                              {date(e.submittedAt)} · {e.photoCount} örnek
                            </strong>
                            <p>{e.notes}</p>
                          </div>
                        ))}
                      </details>
                    )}
                    {own && (
                      <div className="review-box">
                        <h3>İnceleme kararı</h3>
                        <label>
                          İnceleme / düzeltme notu{" "}
                          <span className="optional">
                            İsteğe bağlı · en fazla 500 karakter
                          </span>
                          <textarea
                            value={reviewNote}
                            onChange={(e) => setReviewNote(e.target.value)}
                            maxLength={500}
                            rows={3}
                            placeholder="Hangi açı veya ayrıntının tekrar gösterilmesini istediğini belirt."
                          />
                        </label>
                        <div className="actions">
                          <button
                            className="button"
                            disabled={
                              task.status !== "EVIDENCE_SUBMITTED" ||
                              task.paymentSimulationStatus !== "HELD_SIMULATED"
                            }
                            onClick={() =>
                              ask(
                                "Kanıtları onaylayıp görevi tamamla",
                                "Bu tek işlem görevi tamamlar ve simüle ödemeyi serbest bırakır. Gerçek para transferi yapılmaz.",
                                () =>
                                  act(() => {
                                    api.reviewTaskEvidence(id, {
                                      decision: "APPROVE",
                                      note: reviewNote,
                                    });
                                  }, "Görev tamamlandı. Simüle ödeme serbest bırakıldı; gerçek para transferi yapılmadı."),
                              )
                            }
                          >
                            Onayla ve tamamla
                          </button>
                          <button
                            className="button secondary"
                            disabled={task.status !== "EVIDENCE_SUBMITTED"}
                            onClick={() =>
                              act(() => {
                                api.reviewTaskEvidence(id, {
                                  decision: "REQUEST_REVISION",
                                  note: reviewNote,
                                });
                              }, "Düzeltme istendi. Atanmış görevli kanıtlarını yeniden gönderebilir.")
                            }
                          >
                            Düzeltme iste
                          </button>
                        </div>
                        {task.status !== "EVIDENCE_SUBMITTED" && (
                          <p className="muted">
                            İnceleme işlemleri yalnızca yeni bir kanıt gönderimi
                            beklerken kullanılabilir.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="card">
                    <Empty title="Henüz kanıt gönderilmedi">
                      Atanmış görevli, simüle bekletme kaydından sonra örnek
                      kanıt gönderebilir.
                    </Empty>
                  </div>
                )}
                {task.status === "REVISION_REQUESTED" && (
                  <Notice tone="warning">
                    Düzeltme istendi:{" "}
                    {api
                      .getTaskHistory(id)
                      .filter((e) => e.action === "REVISION_REQUESTED")
                      .at(-1)?.detail ||
                      "İşveren ek not bırakmadı. İstenen kanıt kapsamını yeniden kontrol et."}
                  </Notice>
                )}
                {assigned && (
                  <form
                    className="card detail-copy evidence-form"
                    noValidate
                    onSubmit={(e) => {
                      e.preventDefault();
                      act(() => {
                        api.submitTaskEvidence(id, { photos, notes: note });
                        setPhotos([]);
                        setNote("");
                      }, "Örnek kanıtlar gönderildi. İşverenin incelemesi bekleniyor.");
                    }}
                  >
                    <h2>
                      {task.status === "REVISION_REQUESTED"
                        ? "Düzeltilmiş kanıt gönder"
                        : "Örnek kanıt gönder"}
                    </h2>
                    {!canSubmit && (
                      <Notice tone="warning">
                        {task.paymentSimulationStatus !== "HELD_SIMULATED"
                          ? "Göndermek için önce işverenin simüle ödeme bekletmesini kaydetmesi gerekir."
                          : "Bu durumda yeni kanıt gönderilemez. Düzeltme istenirse yeniden açılır."}
                      </Notice>
                    )}
                    <fieldset disabled={!canSubmit}>
                      <legend>Örnek fotoğraf seçimi · 1–5 adet</legend>
                      <div className="photo-choices">
                        {samplePhotos.map((p) => (
                          <label
                            className={
                              photos.includes(p)
                                ? "photo-choice selected"
                                : "photo-choice"
                            }
                            key={p}
                          >
                            <img src={`/assets/vehicle-${p}.svg`} alt="" />
                            <span>
                              <input
                                type="checkbox"
                                checked={photos.includes(p)}
                                onChange={(e) =>
                                  setPhotos(
                                    e.target.checked
                                      ? [...photos, p]
                                      : photos.filter((x) => x !== p),
                                  )
                                }
                              />
                              {photoLabels[p]}
                            </span>
                          </label>
                        ))}
                      </div>
                      <p className="muted">
                        Gerçek dosya seçilmez veya yüklenmez. Plaka ve kişisel
                        bilgi içermeyen kurgusal örnekler kullanılır.
                      </p>
                      <label>
                        Kanıt notları{" "}
                        <span className="required">
                          Zorunlu · 10–2.000 karakter
                        </span>
                        <textarea
                          rows={4}
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          minLength={10}
                          maxLength={2000}
                          required
                        />
                      </label>
                      <button type="submit" className="button">
                        {task.status === "REVISION_REQUESTED"
                          ? "Düzeltilmiş kanıtı gönder"
                          : "Kanıtları gönder"}
                      </button>
                    </fieldset>
                  </form>
                )}
              </>
            ))}
          {tab === "gecmis" &&
            (participant ? (
              <div className="card detail-copy">
                <h2>Görev işlem geçmişi</h2>
                <p className="muted">
                  Yalnızca görev sahibi ve atanmış görevliye açık.
                </p>
                <ol className="timeline">
                  {api.getTaskHistory(id).map((e) => (
                    <li key={e.id}>
                      <strong>{actionLabels[e.action] || e.action}</strong>
                      <p>{e.detail}</p>
                      <small>
                        {person(e.actorId)} · {date(e.occurredAt)}
                      </small>
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <Notice>
                İşlem geçmişi yalnızca görev katılımcılarına açık.
              </Notice>
            ))}
        </section>
        <aside>
          <div className="card task-summary">
            <h2>Görev özeti</h2>
            <div className="compensation">
              <strong>{money(task.proposedCompensation)}</strong>
              <span>Örnek tutar · simüle</span>
            </div>
            <dl>
              <dt>Görev durumu</dt>
              <dd>{statusLabels[task.status]}</dd>
              <dt>Görevli</dt>
              <dd>
                {participant
                  ? person(task.assignedWorkerId)
                  : "Katılımcılara özel"}
              </dd>
              <dt>Ödeme simülasyonu</dt>
              <dd>{paymentLabels[task.paymentSimulationStatus]}</dd>
            </dl>
            <Notice>Gerçek para transferi yapılmaz.</Notice>
            {own && (
              <>
                <a
                  className="button full"
                  href={`#/gorev/${id}/${task.status === "OPEN" ? "basvurular" : "kanitlar"}`}
                >
                  {task.status === "OPEN"
                    ? "Başvuruları incele"
                    : "Kanıtları incele"}
                </a>
                {task.status === "ASSIGNED" && (
                  <button
                    className="button secondary full"
                    disabled={task.paymentSimulationStatus !== "NOT_HELD"}
                    onClick={() =>
                      ask(
                        "Simüle ödeme bekletmesini kaydet",
                        "Kart veya banka bilgisi istenmez. Bu yalnızca prototip durumunu değiştirir; gerçek para transferi yapılmaz.",
                        () =>
                          act(() => {
                            api.simulatePaymentHold(id);
                          }, "Simüle bekletme kaydedildi. Atanmış görevli artık kanıt gönderebilir."),
                      )
                    }
                  >
                    Simüle bekletmeyi kaydet
                  </button>
                )}
                <button
                  className="button ghost-danger full"
                  disabled={!["OPEN", "ASSIGNED"].includes(task.status)}
                  onClick={() =>
                    ask(
                      "Görev iptal edilsin mi?",
                      "Görev başvurulara kapanır. Varsa simüle ödeme bekletmesi de iptal edilir. Bu adım geri alınmaz.",
                      () =>
                        act(() => {
                          api.cancelTask(id);
                        }, "Görev iptal edildi; varsa simüle bekletme iptal edildi."),
                      true,
                    )
                  }
                >
                  Görevi iptal et
                </button>
                <small>
                  İptal yalnızca başvuruya açık veya atanmış görevlerde
                  kullanılabilir.
                </small>
              </>
            )}
            {assigned && (
              <a className="button full" href={`#/gorev/${id}/kanitlar`}>
                Kanıt alanını aç
              </a>
            )}
            {task.status === "COMPLETED" && (
              <div className="completion">
                <span className="round-icon green">
                  <Icon name="check" size={28} />
                </span>
                <h3>Görev tamamlandı!</h3>
                <p>
                  Kanıt onaylandı. Simüle ödeme aynı adımda serbest bırakıldı.
                </p>
                <a href="#/gecmis">Görev geçmişini gör</a>
              </div>
            )}
            {task.status === "CANCELLED" && (
              <Notice tone="warning">
                Bu görev iptal edildi. Başvuru, atama ve kanıt gönderimi kapalı.
              </Notice>
            )}
          </div>
          <div className="privacy-note">
            <Icon name="shield" />
            <p>
              Fotoğraflar ve geçmiş katılımcılara özel. İndirme ve herkese açık
              paylaşım bu prototipte sunulmaz.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
function Applications({ user }: { user: DemoUser }) {
  const apps = api.listMyApplications();
  return (
    <div data-screen="G05-Basvurular">
      <p className="intro">
        Başvurularının durumunu ve atandığın görevlerin sonraki adımını izle.
      </p>
      {user.role !== "TASK_TAKER" ? (
        <Notice>Başvuru yapmak görev alanlara açık.</Notice>
      ) : !apps.length ? (
        <Empty title="Henüz başvurun yok">
          <a href="#/gorevler">Açık görevleri keşfet</a>
        </Empty>
      ) : (
        <div className="card application-list">
          {apps.map((a) => {
            const t = api.getTask(a.taskId);
            return (
              <article key={a.id}>
                <div>
                  <h2>
                    <a href={`#/gorev/${t.id}`}>{t.title}</a>
                  </h2>
                  <p className="muted">
                    {t.city} · {date(a.submittedAt)}
                  </p>
                  <p>
                    {t.status === "CANCELLED"
                      ? "Görev iptal edildi"
                      : t.assignedWorkerId === user.id
                        ? `Sen atandın · ${paymentLabels[t.paymentSimulationStatus]}`
                        : t.assignedWorkerId
                          ? "Başka bir görevli seçildi"
                          : "Başvurun alındı · Seçim bekleniyor"}
                  </p>
                </div>
                <Badge task={t} />
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
function History({ user }: { user: DemoUser }) {
  const tasks = api
    .listTasks()
    .filter((t) => t.employerId === user.id || t.assignedWorkerId === user.id);
  return (
    <div data-screen="O03-Gecmis">
      <Notice>
        Yalnızca sahibi olduğun veya atandığın görevler görünür. Başvuru tek
        başına özel geçmişe erişim sağlamaz.
      </Notice>
      <div className="card application-list">
        {tasks.map((t) => (
          <article key={t.id}>
            <div>
              <h2>
                <a href={`#/gorev/${t.id}/gecmis`}>{t.title}</a>
              </h2>
              <p className="muted">
                {t.city} · {paymentLabels[t.paymentSimulationStatus]}
              </p>
            </div>
            <Badge task={t} />
          </article>
        ))}
      </div>
      {!tasks.length && (
        <Empty title="Görüntülenebilecek görev geçmişi yok">
          Katılımcısı olduğun görevler burada görünecek.
        </Empty>
      )}
    </div>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
