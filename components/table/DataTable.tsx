
"use client";

import { cn } from "@/lib/utils";

interface DataTableProps {
  children: React.ReactNode;
  className?: string;
}

export default function DataTable({
  children,
  className,
}: DataTableProps) {
  return (
    <div
      className={cn(
        `
        relative w-full overflow-hidden
        rounded-3xl
        border border-border/60
        bg-background

        shadow-sm
        backdrop-blur supports-backdrop-filter:bg-background/95

        transition-colors
      `,
        className,
      )}
    >
      {/* Scroll Area */}
      <div className="overflow-x-auto">
        <table
          className="
            w-full
            min-w-180

            border-collapse
            text-sm

            caption-bottom
          "
        >
          {children}
        </table>
      </div>
    </div>
  );
}

