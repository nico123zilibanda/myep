export default function TableHeader({ columns }: { columns: string[] }) {
  return (
    <thead className="bg-gray-50 border-b">
      <tr>
        {columns.map((col) => (
          <th
            key={col}
            className="px-4 py-3 text-left font-semibold text-gray-600"
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}
