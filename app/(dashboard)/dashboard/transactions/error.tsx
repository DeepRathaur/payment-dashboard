"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function TransactionsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Transactions error boundary:", error);
  }, [error]);

  return (
    <div className="p-4 md:p-6">
      <div className="rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 p-6 text-center">
        <h2 className="text-lg font-semibold text-red-800 dark:text-red-300">
          Failed to load transactions
        </h2>
        <p className="mt-1 text-sm text-red-700 dark:text-red-400">
          {error.message || "An error occurred while loading this page."}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Try again
          </button>
          <Link
            href="/dashboard/transactions"
            className="rounded-xl border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            Reload
          </Link>
        </div>
      </div>
    </div>
  );
}
