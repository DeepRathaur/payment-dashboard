"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { TransactionStatus } from "@prisma/client";
import {
  DEFAULT_TRANSACTION_FILTERS,
  type TransactionFilters,
} from "../types";

const PARAM_PAGE = "page";
const PARAM_LIMIT = "limit";
const PARAM_SEARCH = "search";
const PARAM_STATUS = "status";
const PARAM_DATE_FROM = "dateFrom";
const PARAM_DATE_TO = "dateTo";

function parseFiltersFromSearchParams(
  searchParams: ReturnType<typeof useSearchParams>
): TransactionFilters {
  const page = Math.max(
    1,
    parseInt(searchParams.get(PARAM_PAGE) ?? "1", 10) || 1
  );
  const limit = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get(PARAM_LIMIT) ?? "10", 10) || 10)
  );
  const status = searchParams.get(PARAM_STATUS);
  const validStatuses: (TransactionStatus | "")[] = [
    "",
    "PENDING",
    "SUCCEEDED",
    "FAILED",
    "CANCELLED",
    "REFUNDED",
  ];

  return {
    page,
    limit,
    search: searchParams.get(PARAM_SEARCH) ?? DEFAULT_TRANSACTION_FILTERS.search,
    status: status && validStatuses.includes(status as TransactionStatus | "") ? (status as TransactionStatus | "") : "",
    dateFrom: searchParams.get(PARAM_DATE_FROM) ?? DEFAULT_TRANSACTION_FILTERS.dateFrom,
    dateTo: searchParams.get(PARAM_DATE_TO) ?? DEFAULT_TRANSACTION_FILTERS.dateTo,
  };
}

export function useTransactionFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => parseFiltersFromSearchParams(searchParams),
    [searchParams]
  );

  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);
  const DEBOUNCE_MS = 300;

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [filters.search]);

  const setFilters = useCallback(
    (updates: Partial<TransactionFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      if (updates.page !== undefined) {
        if (updates.page <= 1) params.delete(PARAM_PAGE);
        else params.set(PARAM_PAGE, String(updates.page));
      }
      if (updates.limit !== undefined) {
        if (updates.limit === DEFAULT_TRANSACTION_FILTERS.limit)
          params.delete(PARAM_LIMIT);
        else params.set(PARAM_LIMIT, String(updates.limit));
      }
      if (updates.search !== undefined) {
        if (!updates.search) params.delete(PARAM_SEARCH);
        else params.set(PARAM_SEARCH, updates.search);
        params.delete(PARAM_PAGE);
      }
      if (updates.status !== undefined) {
        if (!updates.status) params.delete(PARAM_STATUS);
        else params.set(PARAM_STATUS, updates.status);
        params.delete(PARAM_PAGE);
      }
      if (updates.dateFrom !== undefined) {
        if (!updates.dateFrom) params.delete(PARAM_DATE_FROM);
        else params.set(PARAM_DATE_FROM, updates.dateFrom);
        params.delete(PARAM_PAGE);
      }
      if (updates.dateTo !== undefined) {
        if (!updates.dateTo) params.delete(PARAM_DATE_TO);
        else params.set(PARAM_DATE_TO, updates.dateTo);
        params.delete(PARAM_PAGE);
      }

      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  return {
    filters,
    setFilters,
    debouncedSearch: debouncedSearch,
  };
}
