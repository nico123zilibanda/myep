// ================================
// components/table/TableRow.tsx
// ================================

"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TableRowProps {
  children: ReactNode;
  className?: string;
}

export default function TableRow({
  children,
  className,
}: TableRowProps) {
  return (
    <tr
      className={cn(
        `
          border-b border-border/50

          transition-all duration-200

          hover:bg-muted/40
          data-[state=selected]:bg-muted

          [&>td]:align-middle
          [&>td]:px-4
          [&>td]:py-4
        `,
        className,
      )}
    >
      {children}
    </tr>
  );
}