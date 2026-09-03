
import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Tanzania Government Logo
 *
 * Supporting national identity element used across:
 *   - Government forms
 *   - Authentication pages
 *   - Public-facing government sections
 *   - Institutional headers
 *
 * The emblem is presented as a clean circular institutional badge
 * while preserving the original Tanzania Government logo asset.
 */

export type TanzaniaLogoSize =
  | "sm" // 32px
  | "md" // 48px
  | "lg" // 72px
  | "xl" // 96px — desktop form panel
  | "2xl"; // 140px — hero / large identity panel

const sizeMap: Record<TanzaniaLogoSize, number> = {
  sm: 32,
  md: 48,
  lg: 72,
  xl: 96,
  "2xl": 140,
};

interface TanzaniaLogoProps {
  size?: TanzaniaLogoSize;

  /** Override width/height in px. Takes precedence over size. */
  px?: number;

  className?: string;

  /** Accessible label. */
  alt?: string;

  /** Eagerly load the logo when used above the fold. */
  priority?: boolean;

  /**
   * Adds a professional circular institutional frame.
   * Default: true.
   */
  framed?: boolean;
}

export function TanzaniaLogo({
  size = "md",
  px,
  className,
  alt = "Serikali ya Tanzania",
  priority = false,
  framed = true,
}: TanzaniaLogoProps) {
  const dim = px ?? sizeMap[size];

  /**
   * Core emblem.
   *
   * The image is clipped into a perfect circle so that even
   * if the source PNG contains a square canvas, the rendered
   * visual remains circular.
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
        src="/tanzania-logo.png"
        alt={alt}
        fill
        priority={priority}
        sizes={`${dim}`}
        className="select-none object-contain"
      />
    </span>
  );

  /**
   * Lightweight version.
   *
   * Useful where space is limited, such as compact navigation
   * or inline institutional branding.
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

  /**
   * Professional national identity badge.
   *
   * Layer structure:
   *
   *   outer ring
   *      ↓
   *   paper / white spacing
   *      ↓
   *   inner ring
   *      ↓
   *   Tanzania emblem
   */
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        "rounded-full",
        "bg-gov-paper",
        "p-1.5",
        "ring-1 ring-gov-green-100",
        "shadow-sm",
        "shadow-gov-green-950/10",
        className
      )}
      style={{
        width: dim + 12,
        height: dim + 12,
      }}
      aria-label={alt}
      role="img"
    >
      <span
        className={cn(
          "relative flex items-center justify-center",
          "rounded-full",
          "bg-gov-paper",
          "p-0.5",
          "ring-1 ring-gov-green-200/80"
        )}
      >
        {logo}
      </span>
    </span>
  );
}

export default TanzaniaLogo;

