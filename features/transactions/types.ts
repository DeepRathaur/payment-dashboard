import type { TransactionStatus } from "@prisma/client";

export type TransactionFilters = {
  page: number;
  limit: number;
  search: string;
  status: TransactionStatus | "";
  dateFrom: string;
  dateTo: string;
};

export const DEFAULT_TRANSACTION_FILTERS: TransactionFilters = {
  page: 1,
  limit: 10,
  search: "",
  status: "",
  dateFrom: "",
  dateTo: "",
};

export const TRANSACTION_STATUS_OPTIONS: { value: TransactionStatus | ""; label: string }[] = [
  { value: "", label: "All statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "SUCCEEDED", label: "Succeeded" },
  { value: "FAILED", label: "Failed" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "REFUNDED", label: "Refunded" },
];

export type TransactionListItem = {
  id: string;
  externalId: string | null;
  amount: number;
  currency: string;
  status: TransactionStatus;
  type: string;
  paymentMethod: string;
  createdAt: string;
  customer: {
    id: string;
    name: string | null;
    email: string | null;
  } | null;
};

export type TransactionsResponse = {
  data: TransactionListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
