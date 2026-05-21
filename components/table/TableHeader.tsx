
// ================================
// components/table/TableHeader.tsx
// ================================

"use client";

interface TableHeaderProps {
  columns: string[];
}

export default function TableHeader({
  columns,
}: TableHeaderProps) {
  return (
    <thead
      className="
        sticky top-0 z-10

        border-b border-border/60

        bg-muted/40
        backdrop-blur
        supports-backdrop-filter:bg-background/80
      "
    >
      <tr>
        {columns.map((col) => (
          <th
            key={col}
            className="
              h-12
              px-4

              text-left
              align-middle

              text-[11px]
              font-semibold
              uppercase
              tracking-[0.08em]

              text-muted-foreground
            "
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}







