"use client";

import { cn } from "@/lib/utils";

type TransactionsPaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
};

export function TransactionsPagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  isLoading,
}: TransactionsPaginationProps) {
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-4">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Showing <span className="font-medium text-zinc-700 dark:text-zinc-300">{from}</span> to{" "}
        <span className="font-medium text-zinc-700 dark:text-zinc-300">{to}</span> of{" "}
        <span className="font-medium text-zinc-700 dark:text-zinc-300">{total}</span> results
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1 || isLoading}
          className={cn(
            "rounded-xl border border-zinc-200 dark:border-zinc-700 px-3 py-2 text-sm font-medium",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          )}
        >
          Previous
        </button>
        <span className="px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400">
          Page {page} of {totalPages || 1}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages || isLoading}
          className={cn(
            "rounded-xl border border-zinc-200 dark:border-zinc-700 px-3 py-2 text-sm font-medium",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          )}
        >
          Next
        </button>
      </div>
    </div>
  );
}
