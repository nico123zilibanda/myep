
import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Halmashauri ya Wilaya ya Mlele — Institutional Logo
 *
 * Used in:
 *   - Public navbar
 *   - Authentication pages
 *   - Admin / Youth sidebars
 *   - Government footer
 *
 * The logo is presented as a circular institutional mark.
 * The original asset remains untouched while the component
 * provides the visual framing and responsive presentation.
 */

export type HalmashauriLogoSize =
  | "xs" // 24px — inline marks
  | "sm" // 32px — compact sidebar
  | "md" // 40px — sidebar / mobile navigation
  | "lg" // 56px — navbar
  | "xl"; // 80px — auth / hero areas

const sizeMap: Record<HalmashauriLogoSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

interface HalmashauriLogoProps {
  size?: HalmashauriLogoSize;

  /** Override width/height in px. Takes precedence over `size`. */
  px?: number;

  className?: string;

  /** Accessible label. */
  alt?: string;

  /**
   * Adds the full institutional badge treatment:
   * background, double ring and subtle shadow.
   */
  framed?: boolean;

  /** Priority hint for important above-the-fold logos. */
  priority?: boolean;
}

export function HalmashauriLogo({
  size = "md",
  px,
  className,
  alt = "Halmashauri ya Wilaya ya Mlele",
  framed = false,
  priority = false,
}: HalmashauriLogoProps) {
  const dim = px ?? sizeMap[size];

  /*
   * Core logo image.
   *
   * `rounded-full + overflow-hidden` is important because
   * the source is a JPEG. Without overflow clipping, the
   * square JPEG corners can still remain visible.
   */
  const logo = (
    <span
      className="relative block shrink-0 overflow-hidden rounded-full"
      style={{
        width: dim,
        height: dim,
      }}
    >
      <Image
        src="/logo.jpeg"
        alt={alt}
        fill
        priority={priority}
        sizes={`${dim}`}
        className="select-none object-cover"
      />
    </span>
  );

  /*
   * Simple circular logo.
   *
   * Useful when the logo needs to stay visually lightweight,
   * for example in a compact navbar or sidebar.
   */
  if (!framed) {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center",
          "rounded-full",
          className
        )}
        aria-label={alt}
        role="img"
      >
        {logo}
      </span>
    );
  }

  /*
   * Professional institutional badge.
   *
   * Visual hierarchy:
   *
   *   outer subtle ring
   *        ↓
   *   white/paper breathing space
   *        ↓
   *   inner green ring
   *        ↓
   *   circular logo
   */
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        "rounded-full",
        "bg-gov-paper",
        "p-1",
        "ring-1 ring-gov-green-100",
        "shadow-sm",
        "shadow-gov-green-950/10",
        "transition-all duration-200",
        "hover:shadow-md",
        "hover:ring-gov-green-200",
        className
      )}
      style={{
        width: dim + 8,
        height: dim + 8,
      }}
      aria-label={alt}
      role="img"
    >
      <span
        className={cn(
          "relative flex items-center justify-center",
          "rounded-full",
          "p-0.5",
          "bg-gov-paper",
          "ring-1 ring-gov-green-200/80"
        )}
      >
        {logo}
      </span>
    </span>
  );
}

export default HalmashauriLogo;

