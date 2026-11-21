import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Lock,
  TriangleAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PAYMENT_LABEL, STATUS_LABEL } from "@/mock/format";
import type { PaymentSimulationStatus, TaskStatus } from "@/mock/types";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-soft hover:bg-primary/90",
        outline:
          "border border-primary/30 bg-card text-primary hover:bg-accent",
        soft: "bg-accent text-accent-foreground hover:bg-secondary",
        ghost: "text-primary hover:bg-accent",
        danger:
          "border border-destructive/40 bg-card text-destructive hover:bg-danger-soft",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant, size, asChild, ...props }, ref) {
    const C = asChild ? Slot : "button";
    return (
      <C
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

export function Card({
  className,
  children,
  as: As = "div",
}: {
  className?: string;
  children: ReactNode;
  as?: "div" | "section" | "article";
}) {
  return (
    <As
      className={cn(
        "rounded-2xl border bg-card p-5 text-card-foreground shadow-card",
        className,
      )}
    >
      {children}
    </As>
  );
}

export const inputClass =
  "w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground aria-[invalid=true]:border-destructive";

export function Field({
  id,
  label,
  hint,
  error,
  tag,
  optional,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string | undefined;
  tag?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="flex flex-wrap items-center gap-2 text-sm font-semibold"
      >
        {label}
        {optional && (
          <span className="text-xs font-normal text-muted-foreground">
            (isteğe bağlı)
          </span>
        )}
        {tag && (
          <span className="rounded-full bg-info-soft px-2 py-0.5 text-xs font-medium text-info">
            {tag}
          </span>
        )}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          className="flex items-center gap-1.5 text-xs font-medium text-destructive"
        >
          <AlertCircle className="size-3.5 shrink-0" aria-hidden /> {error}
        </p>
      )}
    </div>
  );
}
export const describe = (id: string) => `${id}-hint ${id}-error`;

const noticeStyles = {
  info: { cls: "border-info/20 bg-info-soft text-info", Icon: Info },
  success: {
    cls: "border-success/25 bg-success-soft text-success",
    Icon: CheckCircle2,
  },
  warning: {
    cls: "border-warning/25 bg-warning-soft text-warning",
    Icon: TriangleAlert,
  },
  error: {
    cls: "border-destructive/25 bg-danger-soft text-destructive",
    Icon: AlertCircle,
  },
  locked: { cls: "border-border bg-muted text-muted-foreground", Icon: Lock },
};
export function Notice({
  tone = "info",
  title,
  children,
  action,
  className,
}: {
  tone?: keyof typeof noticeStyles;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  const { cls, Icon } = noticeStyles[tone];
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn("flex gap-3 rounded-xl border p-4", cls, className)}
    >
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
      <div className="min-w-0 flex-1 space-y-1">
        <p className="font-semibold">{title}</p>
        {children && (
          <div className="text-sm text-foreground/80">{children}</div>
        )}
        {action && <div className="pt-2">{action}</div>}
      </div>
    </div>
  );
}

const statusStyle: Record<TaskStatus, string> = {
  OPEN: "bg-info-soft text-info",
  ASSIGNED: "bg-accent text-primary",
  EVIDENCE_SUBMITTED: "bg-warning-soft text-warning",
  REVISION_REQUESTED: "bg-danger-soft text-destructive",
  COMPLETED: "bg-success-soft text-success",
  CANCELLED: "bg-muted text-muted-foreground",
};
export function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        statusStyle[status],
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      <span className="sr-only">Görev durumu: </span>
      {STATUS_LABEL[status]}
    </span>
  );
}

const payStyle: Record<PaymentSimulationStatus, string> = {
  NOT_HELD: "border-border text-muted-foreground",
  HELD_SIMULATED: "border-info/30 text-info",
  RELEASED_SIMULATED: "border-success/30 text-success",
  VOIDED_SIMULATED:
    "border-border text-muted-foreground line-through decoration-1",
};
export function PaymentBadge({ status }: { status: PaymentSimulationStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-dashed bg-card px-2.5 py-1 text-xs font-medium",
        payStyle[status],
      )}
    >
      Simüle ödeme · {PAYMENT_LABEL[status]}
    </span>
  );
}

export function EmptyState({
  title,
  children,
  action,
}: {
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed bg-card/60 p-8 text-center">
      <p className="font-semibold">{title}</p>
      {children && (
        <p className="mt-1 text-sm text-muted-foreground">{children}</p>
      )}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}
