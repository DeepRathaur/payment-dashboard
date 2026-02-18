"use client";

import { motion } from "framer-motion";
import { hoverScale, tapScale } from "@/lib/animations";
import { cn } from "@/lib/utils";

type KpiCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: { value: number; label?: string };
  icon?: React.ReactNode;
  className?: string;
  gradient?: boolean;
};

export function KpiCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  className,
  gradient = false,
}: KpiCardProps) {
  const isPositive = trend !== undefined && trend.value >= 0;

  return (
    <motion.div
      whileHover={hoverScale}
      whileTap={tapScale}
      className={cn(
        "rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80",
        "bg-white dark:bg-zinc-900/80",
        "shadow-[var(--shadow-card)] dark:shadow-none",
        "p-5 sm:p-6 transition-shadow hover:shadow-[var(--shadow-elevated)]",
        gradient && "bg-gradient-to-br from-indigo-500/10 via-white to-indigo-600/5 dark:from-indigo-500/10 dark:via-zinc-900/80 dark:to-indigo-600/5",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {title}
          </p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            {value}
          </p>
          {(subtitle ?? trend) && (
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              {subtitle && (
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {subtitle}
                </span>
              )}
              {trend !== undefined && (
                <span
                  className={cn(
                    "text-sm font-medium",
                    isPositive
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  )}
                >
                  {isPositive ? "+" : ""}
                  {trend.value}%
                  {trend.label && (
                    <span className="ml-1 font-normal text-zinc-500 dark:text-zinc-400">
                      {trend.label}
                    </span>
                  )}
                </span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/20 dark:text-indigo-400">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}
