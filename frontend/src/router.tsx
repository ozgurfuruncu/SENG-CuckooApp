import {
  Link,
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AuthScreen } from "./components/cuckoo/auth-screen";
import {
  EvidenceReview,
  SubmitEvidence,
  TaskCompleted,
} from "./components/cuckoo/evidence-screens";
import {
  CreateTaskScreen,
  ProfileScreen,
} from "./components/cuckoo/form-screens";
import {
  EmployerDashboard,
  FindTasks,
  TakerDashboard,
} from "./components/cuckoo/list-screens";
import { TaskDetails } from "./components/cuckoo/task-screens";
import { Welcome } from "./components/cuckoo/welcome-screen";
import { DemoProvider } from "./mock/store";

const rootRoute = createRootRoute({
  component: () => (
    <DemoProvider>
      <Outlet />
    </DemoProvider>
  ),
  notFoundComponent: () => (
    <main className="mx-auto max-w-lg space-y-4 px-6 py-12">
      <h1 className="text-2xl font-bold">Sayfa bulunamadı</h1>
      <Link to="/" className="text-primary underline">
        Ana sayfaya dön
      </Link>
    </main>
  ),
});

const welcome = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Welcome,
});
const signIn = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signin",
  component: AuthScreen,
});
const signUp = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: () => <AuthScreen signup />,
});
const employer = createRoute({
  getParentRoute: () => rootRoute,
  path: "/employer",
  component: EmployerDashboard,
});
const employerProfile = createRoute({
  getParentRoute: () => rootRoute,
  path: "/employer/profile",
  component: () => <ProfileScreen role="EMPLOYER" />,
});
const createTask = createRoute({
  getParentRoute: () => rootRoute,
  path: "/employer/tasks/new",
  component: CreateTaskScreen,
});
const employerTask = createRoute({
  getParentRoute: () => rootRoute,
  path: "/employer/tasks/$taskId",
  component: function EmployerTaskPage() {
    const { taskId } = employerTask.useParams();
    return <TaskDetails taskId={taskId} role="EMPLOYER" />;
  },
});
const reviewTask = createRoute({
  getParentRoute: () => rootRoute,
  path: "/employer/tasks/$taskId/review",
  component: function ReviewTaskPage() {
    const { taskId } = reviewTask.useParams();
    return <EvidenceReview taskId={taskId} />;
  },
});
const completedTask = createRoute({
  getParentRoute: () => rootRoute,
  path: "/employer/tasks/$taskId/completed",
  component: function CompletedTaskPage() {
    const { taskId } = completedTask.useParams();
    return <TaskCompleted taskId={taskId} />;
  },
});
const taker = createRoute({
  getParentRoute: () => rootRoute,
  path: "/taker",
  component: TakerDashboard,
});
const takerProfile = createRoute({
  getParentRoute: () => rootRoute,
  path: "/taker/profile",
  component: () => <ProfileScreen role="TASK_TAKER" />,
});
const findTasks = createRoute({
  getParentRoute: () => rootRoute,
  path: "/taker/find",
  component: FindTasks,
});
const takerTask = createRoute({
  getParentRoute: () => rootRoute,
  path: "/taker/tasks/$taskId",
  component: function TakerTaskPage() {
    const { taskId } = takerTask.useParams();
    return <TaskDetails taskId={taskId} role="TASK_TAKER" />;
  },
});
const submitEvidence = createRoute({
  getParentRoute: () => rootRoute,
  path: "/taker/tasks/$taskId/evidence",
  component: function SubmitEvidencePage() {
    const { taskId } = submitEvidence.useParams();
    return <SubmitEvidence taskId={taskId} />;
  },
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    welcome,
    signIn,
    signUp,
    employer,
    employerProfile,
    createTask,
    employerTask,
    reviewTask,
    completedTask,
    taker,
    takerProfile,
    findTasks,
    takerTask,
    submitEvidence,
  ]),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
