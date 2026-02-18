"use client";

import { motion } from "framer-motion";
import { slideUp, slideUpTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

type FilterBarProps = {
  children: React.ReactNode;
  className?: string;
  /** Optional title or summary above filters */
  title?: string;
  /** Optional actions (e.g. export, add) on the right */
  actions?: React.ReactNode;
};

export function FilterBar({
  children,
  className,
  title,
  actions,
}: FilterBarProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideUp}
      transition={slideUpTransition}
      className={cn(
        "rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80",
        "bg-white dark:bg-zinc-900/80 shadow-[var(--shadow-card)]",
        "p-4 sm:p-5",
        className
      )}
    >
      {(title ?? actions) && (
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {title && (
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {title}
            </h3>
          )}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </motion.div>
  );
}

type FilterBarSelectProps = {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
};

export function FilterBarSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Select",
  className,
}: FilterBarSelectProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {label}
        </label>
      )}
      <select
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "rounded-xl border border-zinc-200 dark:border-zinc-700",
          "bg-white dark:bg-zinc-800/50 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:ring-indigo-400/20 dark:focus:border-indigo-400",
          "min-w-[120px]"
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

type FilterBarSearchProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function FilterBarSearch({
  value,
  onChange,
  placeholder = "Search…",
  className,
}: FilterBarSearchProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 sr-only">
        Search
      </label>
      <input
        type="search"
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "rounded-xl border border-zinc-200 dark:border-zinc-700",
          "bg-white dark:bg-zinc-800/50 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:ring-indigo-400/20 dark:focus:border-indigo-400",
          "min-w-[160px] sm:min-w-[200px]"
        )}
      />
    </div>
  );
}

type FilterBarDateRangeProps = {
  from?: string;
  to?: string;
  onFromChange?: (value: string) => void;
  onToChange?: (value: string) => void;
  className?: string;
};

export function FilterBarDateRange({
  from,
  to,
  onFromChange,
  onToChange,
  className,
}: FilterBarDateRangeProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end gap-2 sm:gap-3",
        className
      )}
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          From
        </label>
        <input
          type="date"
          value={from ?? ""}
          onChange={(e) => onFromChange?.(e.target.value)}
          className={cn(
            "rounded-xl border border-zinc-200 dark:border-zinc-700",
            "bg-white dark:bg-zinc-800/50 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100",
            "focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          )}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          To
        </label>
        <input
          type="date"
          value={to ?? ""}
          onChange={(e) => onToChange?.(e.target.value)}
          className={cn(
            "rounded-xl border border-zinc-200 dark:border-zinc-700",
            "bg-white dark:bg-zinc-800/50 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100",
            "focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          )}
        />
      </div>
    </div>
  );
}
