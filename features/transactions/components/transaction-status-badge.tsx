"use client";

import { StatusBadge } from "@/components/ui";
import type { StatusVariant } from "@/components/ui";
import type { TransactionStatus } from "@prisma/client";

const STATUS_VARIANT: Record<TransactionStatus, StatusVariant> = {
  PENDING: "pending",
  SUCCEEDED: "success",
  FAILED: "error",
  CANCELLED: "neutral",
  REFUNDED: "warning",
};

const STATUS_LABEL: Record<TransactionStatus, string> = {
  PENDING: "Pending",
  SUCCEEDED: "Succeeded",
  FAILED: "Failed",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
};

export function TransactionStatusBadge({ status }: { status: TransactionStatus }) {
  return (
    <StatusBadge variant={STATUS_VARIANT[status]}>
      {STATUS_LABEL[status]}
    </StatusBadge>
  );
}
