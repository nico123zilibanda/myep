
"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({
  className,
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        `
        relative

        overflow-hidden

        rounded-xl

        bg-muted

        before:absolute
        before:inset-0

        before:animate-pulse

        before:bg-linear-to-r
        before:from-transparent
        before:via-white/40
        before:to-transparent

        dark:before:via-white/5
      `,
        className,
      )}
    />
  );
}

