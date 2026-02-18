import type { TransactionListItem } from "../types";

const CSV_HEADERS = [
  "Transaction ID",
  "External ID",
  "Customer",
  "Customer Email",
  "Amount",
  "Currency",
  "Status",
  "Type",
  "Payment Method",
  "Date (UTC)",
];

function escapeCsvCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function formatAmount(amount: number, currency: string): string {
  const value = (amount / 100).toFixed(2);
  return `${currency} ${value}`;
}

export function transactionsToCsv(rows: TransactionListItem[]): string {
  const lines = [CSV_HEADERS.join(",")];

  for (const row of rows) {
    const customerName = row.customer?.name ?? row.customer?.email ?? "—";
    const customerEmail = row.customer?.email ?? "—";
    const date = new Date(row.createdAt).toISOString();

    lines.push(
      [
        escapeCsvCell(row.id),
        escapeCsvCell(row.externalId ?? "—"),
        escapeCsvCell(customerName),
        escapeCsvCell(customerEmail),
        escapeCsvCell(formatAmount(row.amount, row.currency)),
        escapeCsvCell(row.currency),
        escapeCsvCell(row.status),
        escapeCsvCell(row.type),
        escapeCsvCell(row.paymentMethod),
        escapeCsvCell(date),
      ].join(",")
    );
  }

  return lines.join("\n");
}

export function downloadCsv(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
