"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Column<T> = {
  id: string;
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
  headerClassName?: string;
};

type DataTableProps<T extends Record<string, unknown>> = {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  emptyMessage?: string;
  className?: string;
  rowClassName?: string | ((row: T) => string);
};

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  keyExtractor,
  emptyMessage = "No data yet",
  className,
  rowClassName,
}: DataTableProps<T>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden",
        "bg-white dark:bg-zinc-900/80 shadow-[var(--shadow-card)]",
        "overflow-x-auto",
        className
      )}
    >
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-800/30">
            {columns.map((col) => (
              <th
                key={col.id}
                className={cn(
                  "px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400 whitespace-nowrap",
                  "sm:px-6",
                  col.headerClassName
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <motion.tbody
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="divide-y divide-zinc-100 dark:divide-zinc-800"
        >
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-zinc-500 dark:text-zinc-400 sm:px-6"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <motion.tr
                key={keyExtractor(row)}
                variants={staggerItem}
                className={cn(
                  "transition-colors hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30",
                  typeof rowClassName === "function"
                    ? rowClassName(row)
                    : rowClassName
                )}
              >
                {columns.map((col) => {
                  const value =
                    typeof col.accessor === "function"
                      ? col.accessor(row)
                      : (row[col.accessor] as React.ReactNode);
                  return (
                    <td
                      key={col.id}
                      className={cn(
                        "px-4 py-3 text-zinc-900 dark:text-zinc-100 whitespace-nowrap sm:px-6",
                        col.className
                      )}
                    >
                      {value}
                    </td>
                  );
                })}
              </motion.tr>
            ))
          )}
        </motion.tbody>
      </table>
    </div>
  );
}
