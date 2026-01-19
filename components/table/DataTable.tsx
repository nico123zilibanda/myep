"use client";

export default function DataTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
      <table className="w-full min-w-150 text-sm divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </table>
    </div>
  );
}
