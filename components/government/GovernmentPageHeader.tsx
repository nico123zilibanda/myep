import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * GovernmentPageHeader
 * --------------------------------------------------------------
 * A small, consistent page header used on dashboard / internal
 * pages. Keeps headings and descriptions consistent across the
 * system while remaining accessible and responsive.
 */

interface GovernmentPageHeaderProps {
  title: string;
  description?: string;
  /** Optional eyebrow text rendered above the title in primary color. */
  eyebrow?: string;
  /** Right-side actions (buttons). */
  actions?: React.ReactNode;
  className?: string;
}

export function GovernmentPageHeader({
  title,
  description,
  eyebrow,
  actions,
  className,
}: GovernmentPageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-gov-mist pb-5 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div>
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gov-green-700">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gov-ink sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gov-ink-soft/80">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export default GovernmentPageHeader;