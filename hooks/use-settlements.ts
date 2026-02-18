"use client";

import { useQuery } from "@tanstack/react-query";
import type { SettlementsResponse } from "@/lib/api-types";

export type SettlementsFilters = {
  page?: number;
  limit?: number;
  status?: string;
};

async function fetchSettlements(
  filters: SettlementsFilters = {}
): Promise<SettlementsResponse> {
  const params = new URLSearchParams();
  if (filters.page != null) params.set("page", String(filters.page));
  if (filters.limit != null) params.set("limit", String(filters.limit));
  if (filters.status) params.set("status", filters.status);

  const res = await fetch(`/api/settlements?${params.toString()}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Failed to fetch settlements");
  }
  return res.json();
}

export function useSettlementsQuery(filters: SettlementsFilters = {}) {
  return useQuery({
    queryKey: ["settlements", filters],
    queryFn: () => fetchSettlements(filters),
  });
}
