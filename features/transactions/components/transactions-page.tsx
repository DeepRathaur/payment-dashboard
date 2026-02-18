"use client";

import { useMemo, useState } from "react";
import { AnimatedPageWrapper, AnimatedPageSection, SkeletonTable } from "@/components/ui";
import { useTransactionFilters } from "../hooks/use-transaction-filters";
import { useTransactionsQuery } from "../hooks/use-transactions";
import { transactionsToCsv, downloadCsv } from "../utils/csv";
import { TransactionsFilters } from "./transactions-filters";
import { TransactionsTable } from "./transactions-table";
import { TransactionsPagination } from "./transactions-pagination";

export function TransactionsPage() {
  const { filters, setFilters, debouncedSearch } = useTransactionFilters();
  const queryFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch }),
    [filters, debouncedSearch]
  );

  const { data, isLoading, isError, error } = useTransactionsQuery(queryFilters);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportCsv = async () => {
    setIsExporting(true);
    try {
      const params = new URLSearchParams();
      params.set("limit", "1000");
      params.set("page", "1");
      if (queryFilters.search) params.set("search", queryFilters.search);
      if (queryFilters.status) params.set("status", queryFilters.status);
      if (queryFilters.dateFrom) params.set("dateFrom", queryFilters.dateFrom);
      if (queryFilters.dateTo) params.set("dateTo", queryFilters.dateTo);

      const res = await fetch(`/api/transactions?${params.toString()}`);
      if (!res.ok) throw new Error("Export failed");
      const json = await res.json();
      const csv = transactionsToCsv(json.data);
      const date = new Date().toISOString().slice(0, 10);
      downloadCsv(csv, `transactions-${date}.csv`);
    } catch {
      // ignore
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <AnimatedPageWrapper>
      <AnimatedPageSection>
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Transactions
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            View and filter payment transactions.
          </p>
        </div>
      </AnimatedPageSection>

      <AnimatedPageSection>
        <TransactionsFilters
          filters={filters}
          onFiltersChange={setFilters}
          onExportCsv={handleExportCsv}
          isExporting={isExporting}
        />
      </AnimatedPageSection>

      <AnimatedPageSection>
        {isError && (
          <div className="rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 px-4 py-3 text-sm text-red-700 dark:text-red-400">
            {(error as Error)?.message ?? "Something went wrong."}
          </div>
        )}
        {!isError && isLoading && <SkeletonTable rows={8} />}
        {!isError && !isLoading && data && (
          <>
            <TransactionsTable data={data.data} />
            {data.totalPages > 0 && (
              <div className="mt-4">
                <TransactionsPagination
                  page={data.page}
                  totalPages={data.totalPages}
                  total={data.total}
                  limit={data.limit}
                  onPageChange={(page) => setFilters({ page })}
                  isLoading={isLoading}
                />
              </div>
            )}
          </>
        )}
      </AnimatedPageSection>
    </AnimatedPageWrapper>
  );
}
