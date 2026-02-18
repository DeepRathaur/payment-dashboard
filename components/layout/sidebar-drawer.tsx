"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayout } from "./layout-context";
import { NAV_FOOTER_ITEMS, NAV_ITEMS } from "./nav-config";
import { NavIcon } from "./icons";
import { cn } from "@/lib/utils";

const DRAWER_WIDTH = 280;

export function SidebarDrawer() {
  const pathname = usePathname();
  const { drawerOpen, closeDrawer } = useLayout();
  const onNavigate = () => closeDrawer();

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            role="presentation"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={closeDrawer}
          />
          <motion.aside
            initial={{ x: -DRAWER_WIDTH }}
            animate={{ x: 0 }}
            exit={{ x: -DRAWER_WIDTH }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className={cn(
              "fixed left-0 top-0 z-50 h-full w-[280px] flex flex-col",
              "border-r border-zinc-200 dark:border-zinc-800",
              "bg-white dark:bg-zinc-950",
              "md:hidden"
            )}
          >
            <div className="flex h-14 shrink-0 items-center border-b border-zinc-200 dark:border-zinc-800 px-4">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Payment Gateway
              </span>
            </div>
            <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-1">
              <div className="space-y-0.5">
                {NAV_ITEMS.map((item) => (
                  <DrawerLink key={item.href} item={item} pathname={pathname} onNavigate={onNavigate} />
                ))}
              </div>
              <div className="mt-auto pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-0.5">
                {NAV_FOOTER_ITEMS.map((item) => (
                  <DrawerLink key={item.href} item={item} pathname={pathname} onNavigate={onNavigate} />
                ))}
              </div>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function DrawerLink({
  item,
  pathname,
  onNavigate,
}: {
  item: { label: string; href: string; icon: "dashboard" | "transactions" | "customers" | "settlements" | "disputes" | "settings" | "api-keys" };
  pathname: string;
  onNavigate: () => void;
}) {
  const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100"
      )}
    >
      <NavIcon icon={item.icon} />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}
