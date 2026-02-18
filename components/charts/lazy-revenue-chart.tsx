"use client";

import dynamic from "next/dynamic";
import { ChartWrapper } from "@/components/ui";
import { SkeletonChart } from "@/components/ui";

const RevenueChart = dynamic(
  () =>
    import("./revenue-chart").then((mod) => ({ default: mod.RevenueChart })),
  {
    loading: () => <SkeletonChart className="border-0 shadow-none" />,
    ssr: false,
  }
);

export function LazyRevenueChart() {
  return (
    <ChartWrapper
      title="Revenue"
      subtitle="Last 7 days"
    >
      <RevenueChart />
    </ChartWrapper>
  );
}
