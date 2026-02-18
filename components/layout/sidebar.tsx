"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayout } from "./layout-context";
import { NAV_FOOTER_ITEMS, NAV_ITEMS } from "./nav-config";
import { NavIcon, IconChevronLeft } from "./icons";
import { cn } from "@/lib/utils";

const SIDEBAR_WIDTH_EXPANDED = 16 * 16; // 16rem = 256px
const SIDEBAR_WIDTH_COLLAPSED = 5 * 16; // 5rem = 80px

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useLayout();

  return (
    <motion.aside
      initial={false}
      animate={{
        width: sidebarCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      className={cn(
        "hidden md:flex flex-col shrink-0 border-r border-zinc-200 dark:border-zinc-800",
        "bg-white dark:bg-zinc-950"
      )}
    >
      <div className="flex h-14 shrink-0 items-center border-b border-zinc-200 dark:border-zinc-800 px-3 gap-2">
        {!sidebarCollapsed && (
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
            Payment Gateway
          </span>
        )}
        <button
          type="button"
          onClick={toggleSidebar}
          className={cn(
            "ml-auto p-2 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100",
            "dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
          )}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <IconChevronLeft
            className={cn("size-5 transition-transform", sidebarCollapsed && "rotate-180")}
          />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-1">
        <div className="space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <SidebarLink
              key={item.href}
              item={item}
              pathname={pathname}
              collapsed={sidebarCollapsed}
            />
          ))}
        </div>
        <div className="mt-auto pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-0.5">
          {NAV_FOOTER_ITEMS.map((item) => (
            <SidebarLink
              key={item.href}
              item={item}
              pathname={pathname}
              collapsed={sidebarCollapsed}
            />
          ))}
        </div>
      </nav>
    </motion.aside>
  );
}

function SidebarLink({
  item,
  pathname,
  collapsed,
}: {
  item: { label: string; href: string; icon: "dashboard" | "transactions" | "customers" | "settlements" | "disputes" | "settings" | "api-keys" };
  pathname: string;
  collapsed: boolean;
}) {
  const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100"
      )}
      title={collapsed ? item.label : undefined}
    >
      <NavIcon icon={item.icon} />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </Link>
  );
}
