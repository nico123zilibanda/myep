"use client";

export default function DataTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-(--border) shadow-sm bg-(--card) transition-colors">
      <table className="w-full min-w-37.5 text-sm divide-y divide-(--border) transition-colors">
        {children}
      </table>
    </div>
  );
}
