"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const FALLBACK_DATA = [
  { name: "Mon", value: 4200 },
  { name: "Tue", value: 3800 },
  { name: "Wed", value: 5100 },
  { name: "Thu", value: 4400 },
  { name: "Fri", value: 6200 },
  { name: "Sat", value: 5300 },
  { name: "Sun", value: 4800 },
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type RevenueChartProps = {
  /** From /api/analytics volumeByDay (date, value in cents) */
  volumeByDay?: { date: string; value: number }[];
};

export function RevenueChart({ volumeByDay }: RevenueChartProps) {
  const chartData =
    volumeByDay?.length ?
      volumeByDay.map((d) => ({
        name: DAY_NAMES[new Date(d.date).getDay()] ?? d.date.slice(5),
        value: d.value,
      }))
    : FALLBACK_DATA;

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-700" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          className="text-zinc-500 dark:text-zinc-400"
        />
        <YAxis
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          className="text-zinc-500 dark:text-zinc-400"
        />
        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "1px solid var(--tw-border-color)",
          }}
          formatter={(value: number) => [
            `$${(Number(value) / 100).toLocaleString()}`,
            "Revenue",
          ]}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#6366f1"
          strokeWidth={2}
          fill="url(#revenueGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
