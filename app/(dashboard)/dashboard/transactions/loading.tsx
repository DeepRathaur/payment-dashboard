import { Skeleton, SkeletonTable } from "@/components/ui";

export default function TransactionsLoading() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <Skeleton className="mb-1 h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/80 p-4 sm:p-5 shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-10 w-[200px] rounded-xl" />
          <Skeleton className="h-10 w-[120px] rounded-xl" />
          <Skeleton className="h-10 w-[100px] rounded-xl" />
          <Skeleton className="h-10 w-[100px] rounded-xl" />
        </div>
      </div>
      <SkeletonTable rows={8} />
    </div>
  );
}
