"use client";

import { cn } from "@/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-700/50",
        className
      )}
      {...props}
    />
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 p-5 sm:p-6",
        "bg-white dark:bg-zinc-900/80 shadow-[var(--shadow-card)]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32 sm:h-9" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="size-10 shrink-0 rounded-xl" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden bg-white dark:bg-zinc-900/80 shadow-[var(--shadow-card)]">
      <div className="border-b border-zinc-100 dark:border-zinc-800 px-4 py-3 sm:px-6">
        <div className="flex gap-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-20 ml-auto" />
        </div>
      </div>
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-4 py-4 sm:px-6"
          >
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-20 rounded-full ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonChart({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden",
        "bg-white dark:bg-zinc-900/80 shadow-[var(--shadow-card)]",
        className
      )}
    >
      <div className="border-b border-zinc-100 dark:border-zinc-800 px-5 py-4">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="mt-1 h-4 w-48" />
      </div>
      <div className="p-5 flex items-end gap-2 h-[260px]">
        {[40, 65, 45, 80, 55, 70, 50, 85, 60, 75].map((h, i) => (
          <Skeleton
            key={i}
            className="flex-1 min-w-0 rounded-t-md"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}
