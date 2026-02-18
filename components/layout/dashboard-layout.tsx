"use client";

import { LayoutProvider } from "./layout-context";
import { Sidebar } from "./sidebar";
import { SidebarDrawer } from "./sidebar-drawer";
import { Navbar } from "./navbar";
import { BottomNav } from "./bottom-nav";
import { cn } from "@/lib/utils";

export function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <div className="flex h-screen flex-col bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
        <Navbar />
        <div className="flex flex-1 min-h-0">
          <Sidebar />
          <main
            className={cn(
              "flex-1 min-w-0 overflow-auto p-4 md:p-6",
              "pb-20 md:pb-6" /* extra bottom padding for mobile nav */
            )}
          >
            {children}
          </main>
        </div>
        <SidebarDrawer />
        <BottomNav />
      </div>
    </LayoutProvider>
  );
}
