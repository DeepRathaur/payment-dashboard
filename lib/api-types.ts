/**
 * Shared API response types (used by mock backend and React Query hooks).
 */

export type AnalyticsSummary = {
  totalVolume: number;
  transactionCount: number;
  successRate: number;
  volumeByDay: { date: string; value: number }[];
  countByStatus: Record<string, number>;
};

export type SettlementStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export type SettlementListItem = {
  id: string;
  externalId: string | null;
  amount: number;
  currency: string;
  status: SettlementStatus;
  settledAt: string | null;
  createdAt: string;
};

export type SettlementsResponse = {
  data: SettlementListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
