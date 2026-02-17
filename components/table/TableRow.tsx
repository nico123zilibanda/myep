"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface TableRowProps {
  children: ReactNode;
  className?: string;
}

export default function TableRow({ children, className }: TableRowProps) {
  return (
    <tr
      className={clsx(
        "border-b last:border-0 hover:opacity-80 transition-colors duration-200",
        "border-(--border)",
        className
      )}
    >
      {children}
    </tr>
  );
}
