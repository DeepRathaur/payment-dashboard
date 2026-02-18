"use client";

import { useQuery } from "@tanstack/react-query";
import type { AnalyticsSummary } from "@/lib/api-types";

async function fetchAnalytics(): Promise<AnalyticsSummary> {
  const res = await fetch("/api/analytics");
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Failed to fetch analytics");
  }
  return res.json();
}

export function useAnalyticsQuery() {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics,
  });
}
