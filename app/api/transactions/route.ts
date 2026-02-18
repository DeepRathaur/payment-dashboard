import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { getServerEnv } from "@/lib/env";
import {
  isDummyBackend,
  mockLatency,
  getMockTransactions,
  DEFAULT_MOCK_ORG_ID,
} from "@/lib/mock-data";
import { getTransactions } from "@/features/transactions/transactions-api";
import {
  DEFAULT_TRANSACTION_FILTERS,
  type TransactionFilters,
} from "@/features/transactions/types";

export async function GET(request: NextRequest) {
  const useDummy = isDummyBackend();

  let orgId: string | null = null;
  if (!useDummy) {
    const { NEXTAUTH_SECRET } = getServerEnv();
    const token = await getToken({
      req: request,
      secret: NEXTAUTH_SECRET,
    });
    orgId = token?.orgId as string | null ?? null;
  } else {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    orgId = (token?.orgId as string | null) ?? DEFAULT_MOCK_ORG_ID;
    await mockLatency();
  }

  if (!orgId) {
    return NextResponse.json(
      { error: "Unauthorized or no organization" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const filters: TransactionFilters = {
    page: Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1),
    limit: Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("limit") ?? "10", 10) || 10)
    ),
    search: searchParams.get("search") ?? DEFAULT_TRANSACTION_FILTERS.search,
    status:
      (searchParams.get("status") as TransactionFilters["status"]) ??
      DEFAULT_TRANSACTION_FILTERS.status,
    dateFrom:
      searchParams.get("dateFrom") ?? DEFAULT_TRANSACTION_FILTERS.dateFrom,
    dateTo: searchParams.get("dateTo") ?? DEFAULT_TRANSACTION_FILTERS.dateTo,
  };

  try {
    if (useDummy) {
      const { data, total } = getMockTransactions(orgId, filters);
      const totalPages = Math.ceil(total / filters.limit);
      return NextResponse.json({
        data,
        total,
        page: filters.page,
        limit: filters.limit,
        totalPages,
      });
    }

    const { data, total } = await getTransactions(orgId, filters);
    const totalPages = Math.ceil(total / filters.limit);
    return NextResponse.json({
      data,
      total,
      page: filters.page,
      limit: filters.limit,
      totalPages,
    });
  } catch (e) {
    console.error("Transactions API error:", e);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
