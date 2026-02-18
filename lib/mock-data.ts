/**
 * Dummy backend – mock data for Phase 2 (no DB).
 * Multi-tenant: data keyed by orgId. Enable with USE_DUMMY_BACKEND=true.
 */

import type { TransactionListItem } from "@/features/transactions/types";
import type { TransactionStatus } from "@prisma/client";
import type { AnalyticsSummary, SettlementListItem, SettlementStatus } from "./api-types";

export type { AnalyticsSummary, SettlementListItem, SettlementStatus } from "./api-types";

export const MOCK_ORG_IDS = ["org_mock_1", "org_mock_2", "org_mock_3"] as const;
export const DEFAULT_MOCK_ORG_ID = MOCK_ORG_IDS[0];

const PAYMENT_METHODS = ["Card", "Bank transfer", "Wallet", "Card"];
const CUSTOMERS = [
  { id: "c1", name: "Acme Corp", email: "billing@acme.example" },
  { id: "c2", name: "Jane Doe", email: "jane@example.com" },
  { id: "c3", name: "Widgets Inc", email: "pay@widgets.io" },
  { id: "c4", name: null, email: "one-off@example.com" },
  { id: "c5", name: "Beta LLC", email: "finance@beta.example" },
];

const STATUSES: TransactionStatus[] = [
  "SUCCEEDED",
  "SUCCEEDED",
  "SUCCEEDED",
  "PENDING",
  "FAILED",
  "REFUNDED",
  "CANCELLED",
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function daysAgo(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

function generateTransactionsForOrg(orgId: string): TransactionListItem[] {
  const list: TransactionListItem[] = [];
  const idPrefix = orgId.replace("org_", "tx_").slice(0, 8);
  for (let i = 1; i <= 80; i++) {
    const daysBack = Math.floor(Math.random() * 60);
    const createdAt = daysAgo(daysBack);
    const customer = randomItem(CUSTOMERS);
    const status = randomItem(STATUSES);
    const amount = [500, 1999, 5000, 12500, 29900, 50000][Math.floor(Math.random() * 6)];
    list.push({
      id: `${idPrefix}_${i}`,
      externalId: `pay_${idPrefix}${String(i).padStart(4, "0")}`,
      amount,
      currency: "USD",
      status,
      type: "CHARGE",
      paymentMethod: randomItem(PAYMENT_METHODS),
      createdAt: createdAt.toISOString(),
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
      },
    });
  }
  return list.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

function generateSettlementsForOrg(orgId: string): SettlementListItem[] {
  const list: SettlementListItem[] = [];
  const idPrefix = orgId.replace("org_", "set_").slice(0, 8);
  const statuses: SettlementStatus[] = ["COMPLETED", "COMPLETED", "PENDING", "PROCESSING", "FAILED"];
  for (let i = 1; i <= 20; i++) {
    const daysBack = i * 3 + Math.floor(Math.random() * 2);
    const createdAt = daysAgo(daysBack);
    const settledAt = randomItem(statuses) === "COMPLETED" ? daysAgo(daysBack - 1) : null;
    list.push({
      id: `${idPrefix}_${i}`,
      externalId: `set_${idPrefix}${String(i).padStart(3, "0")}`,
      amount: 50000 + Math.floor(Math.random() * 200000),
      currency: "USD",
      status: randomItem(statuses),
      settledAt: settledAt ? settledAt.toISOString() : null,
      createdAt: createdAt.toISOString(),
    });
  }
  return list.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

const transactionsByOrg = new Map<string, TransactionListItem[]>();
const settlementsByOrg = new Map<string, SettlementListItem[]>();

function getTransactionsForOrg(orgId: string): TransactionListItem[] {
  if (!transactionsByOrg.has(orgId)) {
    transactionsByOrg.set(orgId, generateTransactionsForOrg(orgId));
  }
  return transactionsByOrg.get(orgId)!;
}

function getSettlementsForOrg(orgId: string): SettlementListItem[] {
  if (!settlementsByOrg.has(orgId)) {
    settlementsByOrg.set(orgId, generateSettlementsForOrg(orgId));
  }
  return settlementsByOrg.get(orgId)!;
}

export type TransactionFilters = {
  page: number;
  limit: number;
  search: string;
  status: TransactionStatus | "";
  dateFrom: string;
  dateTo: string;
};

export function getMockTransactions(
  orgId: string,
  filters: TransactionFilters
): { data: TransactionListItem[]; total: number } {
  let list = [...getTransactionsForOrg(orgId)];

  if (filters.search.trim()) {
    const term = filters.search.trim().toLowerCase();
    list = list.filter(
      (t) =>
        t.id.toLowerCase().includes(term) ||
        (t.externalId?.toLowerCase().includes(term)) ||
        t.customer?.name?.toLowerCase().includes(term) ||
        t.customer?.email?.toLowerCase().includes(term)
    );
  }

  if (filters.status) {
    list = list.filter((t) => t.status === filters.status);
  }

  if (filters.dateFrom) {
    const from = new Date(filters.dateFrom);
    list = list.filter((t) => new Date(t.createdAt) >= from);
  }
  if (filters.dateTo) {
    const to = new Date(filters.dateTo);
    to.setHours(23, 59, 59, 999);
    list = list.filter((t) => new Date(t.createdAt) <= to);
  }

  const total = list.length;
  const start = (filters.page - 1) * filters.limit;
  const data = list.slice(start, start + filters.limit);
  return { data, total };
}

export function getMockSettlements(
  orgId: string,
  options: { page?: number; limit?: number; status?: string } = {}
): { data: SettlementListItem[]; total: number } {
  let list = [...getSettlementsForOrg(orgId)];
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.min(50, Math.max(1, options.limit ?? 10));

  if (options.status) {
    list = list.filter((s) => s.status === options.status);
  }

  const total = list.length;
  const start = (page - 1) * limit;
  const data = list.slice(start, start + limit);
  return { data, total };
}

export function getMockAnalytics(orgId: string): AnalyticsSummary {
  const list = getTransactionsForOrg(orgId);
  const totalVolume = list.reduce((s, t) => s + t.amount, 0);
  const succeeded = list.filter((t) => t.status === "SUCCEEDED");
  const successRate = list.length ? (succeeded.length / list.length) * 100 : 0;

  const countByStatus: Record<string, number> = {};
  for (const t of list) {
    countByStatus[t.status] = (countByStatus[t.status] ?? 0) + 1;
  }

  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = daysAgo(13 - i);
    d.setHours(0, 0, 0, 0);
    const next = new Date(d);
    next.setDate(next.getDate() + 1);
    const value = list
      .filter((t) => {
        const created = new Date(t.createdAt);
        return created >= d && created < next && t.status === "SUCCEEDED";
      })
      .reduce((s, t) => s + t.amount, 0);
    return { date: d.toISOString().slice(0, 10), value };
  });

  return {
    totalVolume,
    transactionCount: list.length,
    successRate: Math.round(successRate * 10) / 10,
    volumeByDay: last14,
    countByStatus,
  };
}

export function isDummyBackend(): boolean {
  return process.env.USE_DUMMY_BACKEND === "true";
}

/** Artificial latency (ms) for mock APIs */
const MOCK_LATENCY_MS = { min: 300, max: 700 };

export function mockLatency(): Promise<void> {
  const ms = MOCK_LATENCY_MS.min + Math.random() * (MOCK_LATENCY_MS.max - MOCK_LATENCY_MS.min);
  return new Promise((r) => setTimeout(r, ms));
}
