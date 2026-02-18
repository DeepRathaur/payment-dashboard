"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOTTOM_NAV_ITEMS } from "./nav-config";
import { NavIcon } from "./icons";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-30 md:hidden",
        "flex items-center justify-around gap-1",
        "h-16 px-2 safe-area-pb",
        "border-t border-zinc-200 dark:border-zinc-800",
        "bg-white/95 dark:bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-zinc-950/80"
      )}
    >
      {BOTTOM_NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 py-2 rounded-lg text-xs font-medium transition-colors",
              isActive
                ? "text-zinc-900 dark:text-zinc-100"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
            )}
          >
            <NavIcon icon={item.icon} />
            <span className="truncate max-w-full">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
