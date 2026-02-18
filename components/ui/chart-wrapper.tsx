"use client";

import { motion } from "framer-motion";
import { slideUp, slideUpTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

type ChartWrapperProps = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
};

export function ChartWrapper({
  title,
  subtitle,
  children,
  className,
  action,
}: ChartWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideUp}
      transition={slideUpTransition}
      className={cn(
        "rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80",
        "bg-white dark:bg-zinc-900/80",
        "shadow-[var(--shadow-card)]",
        "overflow-hidden",
        className
      )}
    >
      {(title ?? subtitle ?? action) && (
        <div className="flex flex-col gap-0.5 border-b border-zinc-100 px-5 py-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div>
            {title && (
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="mt-2 sm:mt-0">{action}</div>}
        </div>
      )}
      <div className="p-4 sm:p-5 min-h-[240px] flex items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
}
