"use client";

import { AnimatedPageWrapper, AnimatedPageSection, KpiCard } from "@/components/ui";
import { LazyRevenueChart } from "@/components/charts";

export function DashboardHomeClient() {
  return (
    <AnimatedPageWrapper>
      <AnimatedPageSection>
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Overview of your payment activity.
          </p>
        </div>
      </AnimatedPageSection>

      <AnimatedPageSection>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Total volume"
            value="$0"
            subtitle="This month"
            gradient
          />
          <KpiCard title="Transactions" value="0" subtitle="Last 30 days" />
          <KpiCard title="Success rate" value="—" />
          <KpiCard title="Disputes" value="0" subtitle="Open" />
        </div>
      </AnimatedPageSection>

      <AnimatedPageSection>
        <LazyRevenueChart />
      </AnimatedPageSection>
    </AnimatedPageWrapper>
  );
}
