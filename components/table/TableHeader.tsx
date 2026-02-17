"use client";

interface TableHeaderProps {
  columns: string[];
}

export default function TableHeader({ columns }: TableHeaderProps) {
  return (
    <thead className="bg-(--card) border-b sticky top-0 z-10 transition-colors">
      <tr>
        {columns.map((col) => (
          <th
            key={col}
            className="px-4 py-3 text-left font-semibold text-(--foreground) text-sm"
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}
