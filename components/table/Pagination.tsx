"use client";

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  const base =
    "px-3 py-1 border rounded text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="flex flex-wrap justify-end gap-2 mt-4">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={`${base} bg-(--card) border-(--border) text-(--foreground) hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        Prev
      </button>

      <span className="px-3 py-1 text-sm text-(--foreground) flex items-center">
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className={`${base} bg-(--card) border-(--border) text-(--foreground) hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        Next
      </button>
    </div>
  );
}
