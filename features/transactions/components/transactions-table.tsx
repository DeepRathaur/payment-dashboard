"use client";

import { DataTable } from "@/components/ui";
import type { TransactionListItem } from "../types";
import { TransactionStatusBadge } from "./transaction-status-badge";

function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    minimumFractionDigits: 2,
  }).format(amount / 100);
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

function customerDisplay(row: TransactionListItem): string {
  if (row.customer?.name) return row.customer.name;
  if (row.customer?.email) return row.customer.email;
  return "—";
}

const columns = [
  {
    id: "id",
    header: "Transaction ID",
    accessor: (row: TransactionListItem) => (
      <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
        {row.externalId ?? row.id.slice(0, 12)}
      </span>
    ),
  },
  {
    id: "customer",
    header: "Customer",
    accessor: (row: TransactionListItem) => (
      <span className="text-zinc-900 dark:text-zinc-100">
        {customerDisplay(row)}
      </span>
    ),
  },
  {
    id: "amount",
    header: "Amount",
    accessor: (row: TransactionListItem) => (
      <span className="font-medium tabular-nums">
        {formatAmount(row.amount, row.currency)}
      </span>
    ),
  },
  {
    id: "status",
    header: "Status",
    accessor: (row: TransactionListItem) => (
      <TransactionStatusBadge status={row.status} />
    ),
  },
  {
    id: "paymentMethod",
    header: "Payment Method",
    accessor: (row: TransactionListItem) => (
      <span className="text-zinc-600 dark:text-zinc-400">{row.paymentMethod}</span>
    ),
  },
  {
    id: "createdAt",
    header: "Date",
    accessor: (row: TransactionListItem) => (
      <span className="text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
        {formatDate(row.createdAt)}
      </span>
    ),
  },
];

type TransactionsTableProps = {
  data: TransactionListItem[];
};

export function TransactionsTable({ data }: TransactionsTableProps) {
  return (
    <DataTable<TransactionListItem>
      columns={columns}
      data={data}
      keyExtractor={(row) => row.id}
      emptyMessage="No transactions found. Try adjusting filters."
    />
  );
}
