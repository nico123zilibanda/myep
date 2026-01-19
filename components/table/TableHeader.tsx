"use client";

interface TableHeaderProps {
  columns: string[];
}

export default function TableHeader({ columns }: TableHeaderProps) {
  return (
    <thead className="bg-gray-50 dark:bg-gray-800 border-b sticky top-0 z-10">
      <tr>
        {columns.map((col) => (
          <th
            key={col}
            className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300 text-sm"
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}
