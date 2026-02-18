"use client";

import {
  FilterBar,
  FilterBarSelect,
  FilterBarSearch,
  FilterBarDateRange,
} from "@/components/ui";
import { TRANSACTION_STATUS_OPTIONS } from "../types";
import type { TransactionFilters } from "../types";

type TransactionsFiltersProps = {
  filters: TransactionFilters;
  onFiltersChange: (updates: Partial<TransactionFilters>) => void;
  onExportCsv: () => void;
  isExporting?: boolean;
};

export function TransactionsFilters({
  filters,
  onFiltersChange,
  onExportCsv,
  isExporting = false,
}: TransactionsFiltersProps) {
  return (
    <FilterBar
      title="Filters"
      actions={
        <button
          type="button"
          onClick={onExportCsv}
          disabled={isExporting}
          className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
        >
          {isExporting ? "Exporting…" : "Export CSV"}
        </button>
      }
    >
      <FilterBarSearch
        placeholder="Search by ID, customer…"
        value={filters.search}
        onChange={(v) => onFiltersChange({ search: v })}
      />
      <FilterBarSelect
        label="Status"
        placeholder="All statuses"
        value={filters.status}
        onChange={(v) => onFiltersChange({ status: v as TransactionFilters["status"] })}
        options={TRANSACTION_STATUS_OPTIONS}
      />
      <FilterBarDateRange
        from={filters.dateFrom}
        to={filters.dateTo}
        onFromChange={(v) => onFiltersChange({ dateFrom: v })}
        onToChange={(v) => onFiltersChange({ dateTo: v })}
      />
    </FilterBar>
  );
}
