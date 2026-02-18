import { prisma } from "@/lib/prisma";
import type { TransactionStatus } from "@prisma/client";
import type { TransactionFilters } from "./types";
import type { TransactionListItem } from "./types";

export async function getTransactions(
  organizationId: string,
  filters: TransactionFilters
): Promise<{ data: TransactionListItem[]; total: number }> {
  const { page, limit, search, status, dateFrom, dateTo } = filters;

  const where: Parameters<typeof prisma.transaction.findMany>[0]["where"] = {
    organizationId,
  };

  if (status) {
    where.status = status as TransactionStatus;
  }

  if (dateFrom || dateTo) {
    where.createdAt = {};
    if (dateFrom) {
      (where.createdAt as { gte?: Date }).gte = new Date(dateFrom);
    }
    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);
      (where.createdAt as { lte?: Date }).lte = to;
    }
  }

  if (search.trim()) {
    const term = search.trim().toLowerCase();
    where.OR = [
      { id: { contains: term, mode: "insensitive" } },
      { externalId: { contains: term, mode: "insensitive" } },
      {
        customer: {
          OR: [
            { name: { contains: term, mode: "insensitive" } },
            { email: { contains: term, mode: "insensitive" } },
          ],
        },
      },
    ];
  }

  const [data, total] = await Promise.all([
    prisma.transaction.findMany({
      where,
      include: {
        customer: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.transaction.count({ where }),
  ]);

  const list: TransactionListItem[] = data.map((t) => ({
    id: t.id,
    externalId: t.externalId,
    amount: t.amount,
    currency: t.currency,
    status: t.status,
    type: t.type,
    paymentMethod: getPaymentMethodFromMetadata(t.metadata),
    createdAt: t.createdAt.toISOString(),
    customer: t.customer
      ? {
          id: t.customer.id,
          name: t.customer.name,
          email: t.customer.email,
        }
      : null,
  }));

  return { data: list, total };
}

function getPaymentMethodFromMetadata(metadata: unknown): string {
  if (metadata && typeof metadata === "object" && "paymentMethod" in metadata) {
    const v = (metadata as { paymentMethod: unknown }).paymentMethod;
    if (typeof v === "string") return v;
  }
  return "Card";
}
