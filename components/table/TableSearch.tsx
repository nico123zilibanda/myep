
// ================================
// components/table/TableSearch.tsx
// ================================

"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface TableSearchProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function TableSearch({
  value,
  onChange,
  placeholder = "Search...",
}: TableSearchProps) {
  return (
    <div className="relative w-full sm:max-w-sm">
      <Search
        className="
          absolute left-3 top-1/2 z-10
          size-4 -translate-y-1/2
          text-muted-foreground
        "
      />

      <Input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-10
          rounded-xl

          pl-10

          border-border/60
          bg-background

          shadow-sm

          focus-visible:ring-4
          focus-visible:ring-primary/10
        "
      />
    </div>
  );
}