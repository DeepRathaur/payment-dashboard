import type { Metadata } from "next";
import { TransactionsPage } from "@/features/transactions";

export const metadata: Metadata = {
  title: "Transactions",
  description: "View and filter payment transactions",
};

export default function TransactionsRoute() {
  return <TransactionsPage />;
}
