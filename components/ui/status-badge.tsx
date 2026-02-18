"use client";

import { cn } from "@/lib/utils";

export type StatusVariant =
  | "success"
  | "warning"
  | "error"
  | "neutral"
  | "info"
  | "pending";

const variantStyles: Record<
  StatusVariant,
  string
> = {
  success:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-500/30",
  warning:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border-amber-200/60 dark:border-amber-500/30",
  error:
    "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-400 border-red-200/60 dark:border-red-500/30",
  neutral:
    "bg-zinc-100 text-zinc-700 dark:bg-zinc-600/20 dark:text-zinc-300 border-zinc-200/60 dark:border-zinc-500/30",
  info:
    "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400 border-indigo-200/60 dark:border-indigo-500/30",
  pending:
    "bg-zinc-50 text-zinc-600 dark:bg-zinc-500/15 dark:text-zinc-400 border-zinc-200/60 dark:border-zinc-500/30",
};

type StatusBadgeProps = {
  children: React.ReactNode;
  variant?: StatusVariant;
  className?: string;
  dot?: boolean;
};

export function StatusBadge({
  children,
  variant = "neutral",
  className,
  dot = true,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "size-1.5 shrink-0 rounded-full",
            variant === "success" && "bg-emerald-500 dark:bg-emerald-400",
            variant === "warning" && "bg-amber-500 dark:bg-amber-400",
            variant === "error" && "bg-red-500 dark:bg-red-400",
            variant === "neutral" && "bg-zinc-500 dark:bg-zinc-400",
            variant === "info" && "bg-indigo-500 dark:bg-indigo-400",
            variant === "pending" && "bg-zinc-400 dark:bg-zinc-500"
          )}
        />
      )}
      {children}
    </span>
  );
}
