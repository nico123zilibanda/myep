"use client";

export default function DataTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
      <table className="w-full text-sm">
        {children}
      </table>
    </div>
  );
}
