import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createSeed } from "./seed";
import type { DemoState, Result, User } from "./types";

interface DemoCtx {
  state: DemoState;
  actor: User | null;
  setActorId: (id: string | null) => void;
  run: <T>(fn: (s: DemoState) => Result<T>) => Result<T>;
  reset: () => void;
}
const Ctx = createContext<DemoCtx | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(createSeed);
  const ref = useRef(state);
  const [actorId, setActorId] = useState<string | null>(null);

  const run = useCallback(<T,>(fn: (s: DemoState) => Result<T>) => {
    const r = fn(ref.current);
    if (r.ok) {
      ref.current = r.state;
      setState(r.state);
    }
    return r;
  }, []);
  const reset = useCallback(() => {
    const s = createSeed();
    ref.current = s;
    setState(s);
    setActorId((id) => (id && s.users.some((u) => u.id === id) ? id : null));
  }, []);

  const value = useMemo(
    () => ({
      state,
      actor: state.users.find((u) => u.id === actorId) ?? null,
      setActorId,
      run,
      reset,
    }),
    [state, actorId, run, reset],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDemo() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useDemo outside DemoProvider");
  return c;
}

export const DEMO_ACCOUNTS = [
  { id: "u-deniz", label: "İşveren · Deniz Kaya" },
  { id: "u-kerem", label: "İşveren · Kerem Aydın (diğer görev sahibi)" },
  { id: "u-sarah", label: "Görev Alan · Sarah Ahmed" },
  { id: "u-mert", label: "Görev Alan · Mert Yılmaz" },
  { id: "u-ece", label: "Görev Alan · Ece Demir (şehir belirtilmedi)" },
];
