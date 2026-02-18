import type { Metadata } from "next";
import { DashboardHomeClient } from "./dashboard-home-client";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Payment Gateway Admin dashboard overview",
};

export default function DashboardPage() {
  return <DashboardHomeClient />;
}
