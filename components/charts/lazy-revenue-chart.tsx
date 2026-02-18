"use client";

import dynamic from "next/dynamic";
import { ChartWrapper } from "@/components/ui";
import { SkeletonChart } from "@/components/ui";
import { useAnalyticsQuery } from "@/hooks";

const RevenueChart = dynamic(
  () =>
    import("./revenue-chart").then((mod) => ({ default: mod.RevenueChart })),
  {
    loading: () => <SkeletonChart className="border-0 shadow-none" />,
    ssr: false,
  }
);

export function LazyRevenueChart() {
  const { data: analytics } = useAnalyticsQuery();
  return (
    <ChartWrapper title="Revenue" subtitle="Last 14 days (from API when dummy backend on)">
      <RevenueChart volumeByDay={analytics?.volumeByDay} />
    </ChartWrapper>
  );
}
