"use client";

import { useQuery } from "@tanstack/react-query";
import type { TransactionsResponse } from "../types";
import type { TransactionFilters } from "../types";

async function fetchTransactions(
  filters: TransactionFilters
): Promise<TransactionsResponse> {
  const params = new URLSearchParams();
  params.set("page", String(filters.page));
  params.set("limit", String(filters.limit));
  if (filters.search) params.set("search", filters.search);
  if (filters.status) params.set("status", filters.status);
  if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.set("dateTo", filters.dateTo);

  const res = await fetch(`/api/transactions?${params.toString()}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Failed to fetch transactions");
  }
  return res.json();
}

export function useTransactionsQuery(filters: TransactionFilters) {
  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => fetchTransactions(filters),
  });
}
