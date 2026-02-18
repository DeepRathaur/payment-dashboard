"use client";

import { useLayout } from "./layout-context";
import { useTheme } from "./theme-provider";
import { IconMenu, IconChevronLeft, IconSun, IconMoon } from "./icons";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { openDrawer, toggleSidebar, sidebarCollapsed } = useLayout();
  const { theme, setTheme, resolved } = useTheme();

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b border-zinc-200 dark:border-zinc-800",
        "bg-white/95 dark:bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-zinc-950/80",
        "px-4"
      )}
    >
      {/* Mobile: menu opens drawer */}
      <button
        type="button"
        onClick={openDrawer}
        className={cn(
          "p-2 rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 md:hidden"
        )}
        aria-label="Open menu"
      >
        <IconMenu />
      </button>

      {/* Desktop: collapse/expand sidebar */}
      <button
        type="button"
        onClick={toggleSidebar}
        className={cn(
          "hidden md:flex p-2 rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        )}
        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <IconChevronLeft
          className={cn("size-5 transition-transform", sidebarCollapsed && "rotate-180")}
        />
      </button>

      <div className="flex-1 min-w-0" />

      {/* Theme toggle */}
      <button
        type="button"
        onClick={cycleTheme}
        className={cn(
          "p-2 rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        )}
        aria-label={`Theme: ${theme}. Toggle.`}
        title={`Theme: ${theme}`}
      >
        {resolved === "dark" ? (
          <IconMoon className="size-5" />
        ) : (
          <IconSun className="size-5" />
        )}
      </button>

      {/* Placeholder for user menu / org switcher */}
      <div
        className={cn(
          "h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700 shrink-0"
        )}
        aria-hidden
      />
    </header>
  );
}
