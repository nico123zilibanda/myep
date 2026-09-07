"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { TanzaniaLogo } from "./TanzaniaLogo";

interface GovernmentFormShellProps {
  /** Form title shown above the form. */
  title: string;

  /** Optional short description shown below the title. */
  description?: string;

  /** The actual form content. */
  children: React.ReactNode;

  /** Optional content rendered below the form. */
  footer?: React.ReactNode;

  /** Maximum width of the form column on desktop. */
  maxWidth?: string;

  className?: string;

  /** Optional custom identity panel content. */
  identityContent?: React.ReactNode;
}

const HERO_IMAGES = [
  "/hero1.jpg",
  "/hero2.jpg",
  "/hero3.jpg",
  "/hero4.jpg",
  "/hero7.jpg",
];

export function GovernmentFormShell({
  title,
  description,
  children,
  footer,
  className,
  identityContent,
}: GovernmentFormShellProps) {
  const router = useRouter();

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const touchStartX = React.useRef<number | null>(null);

  const handleBackHome = () => {
    router.push("/");
  };

  /* ================================================================
   * SLIDER LOGIC
   * ================================================================ */

  const nextSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  const prevSlide = React.useCallback(() => {
    setCurrentSlide((prev) =>
      prev === 0 ? HERO_IMAGES.length - 1 : prev - 1,
    );
  }, []);

  const stopAutoSlide = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoSlide = React.useCallback(() => {
    stopAutoSlide();

    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
  }, [isPaused, stopAutoSlide]);

  React.useEffect(() => {
    startAutoSlide();

    return () => {
      stopAutoSlide();
    };
  }, [startAutoSlide, stopAutoSlide]);

  /* ================================================================
   * TOUCH / SWIPE
   * ================================================================ */

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>,
  ) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>,
  ) => {
    if (touchStartX.current === null) return;

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const diff = touchStartX.current - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
  };

  /* ================================================================
   * RENDER
   * ================================================================ */

  return (
    <div
      className={cn(
        "relative min-h-[calc(100vh-4rem)] w-full overflow-hidden",
        "bg-gov-canvas text-gov-ink",
        className,
      )}
    >
      {/* ============================================================
          AMBIENT BACKGROUND
      ============================================================ */}

      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gov-green-100/40 blur-3xl dark:bg-gov-green-400/10"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gov-blue-100/40 blur-3xl dark:bg-gov-blue-400/10"
      />

      {/* ============================================================
          MAIN LAYOUT

          HERO = 3 columns
          FORM = 2 columns

          This intentionally gives the image slider more width.
      ============================================================ */}

      <div
        className={cn(
          "relative mx-auto grid min-h-[calc(100vh-4rem)] w-full",
          "max-w-400 items-stretch",
          "gap-8 px-4 py-6",
          "sm:px-6 sm:py-8",
          "lg:grid-cols-5 lg:gap-8 lg:px-8 lg:py-10",
          "xl:gap-10 xl:px-10",
        )}
      >
        {/* ============================================================
            HERO / GOVERNMENT IDENTITY PANEL
        ============================================================ */}

        <aside
          className={cn(
            "relative min-h-105",
            "lg:col-span-3 lg:min-h-0",
          )}
        >
          <div
            className={cn(
              "relative h-full min-h-105 overflow-hidden",
              "rounded-[2rem]",
              "border border-white/10",
              "bg-gov-green-900",
              "shadow-2xl shadow-black/10",
              "dark:border-white/10",
            )}
          >
            {/* ========================================================
                TOP GOVERNMENT STRIPE
            ======================================================== */}

            <div
              aria-hidden
              className="absolute inset-x-0 top-0 z-40 flex h-1.5"
            >
              <div className="flex-1 bg-gov-green-500" />
              <div className="flex-1 bg-gov-gold-500" />
              <div className="flex-1 bg-gov-blue-500" />
              <div className="flex-1 bg-gov-ink-soft/70" />
            </div>

            {/* ========================================================
                IMAGE SLIDER
            ======================================================== */}

            <div
              className="absolute inset-0 z-0"
              onMouseEnter={() => {
                setIsPaused(true);
                stopAutoSlide();
              }}
              onMouseLeave={() => {
                setIsPaused(false);
              }}
              onFocus={() => {
                setIsPaused(true);
                stopAutoSlide();
              }}
              onBlur={() => {
                setIsPaused(false);
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {HERO_IMAGES.map((src, index) => {
                const isActive = currentSlide === index;

                return (
                  <div
                    key={src}
                    className={cn(
                      "absolute inset-0",
                      "transition-all duration-1000 ease-in-out",
                      isActive
                        ? "z-20 opacity-100"
                        : "z-10 opacity-0",
                    )}
                    aria-hidden={!isActive}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className={cn(
                        "object-cover",
                        "object-center",
                        "transition-transform duration-7000 ease-out",
                        isActive
                          ? "scale-105"
                          : "scale-100",
                      )}
                    />

                    {/* Very subtle image protection only.
                        No text / content overlay. */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-black/10"
                    />
                  </div>
                );
              })}

              {/* ======================================================
                  PREVIOUS
              ====================================================== */}

              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous image"
                className={cn(
                  "absolute left-5 top-1/2 z-40",
                  "-translate-y-1/2",
                  "inline-flex h-11 w-11 items-center justify-center",
                  "rounded-full",
                  "border border-white/20",
                  "bg-black/25 text-white",
                  "backdrop-blur-md",
                  "shadow-lg",
                  "transition-all duration-200",
                  "hover:scale-105 hover:bg-black/45",
                  "active:scale-95",
                  "focus:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-white",
                )}
              >
                <ChevronLeft
                  className="h-5 w-5"
                  aria-hidden
                />
              </button>

              {/* ======================================================
                  NEXT
              ====================================================== */}

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next image"
                className={cn(
                  "absolute right-5 top-1/2 z-40",
                  "-translate-y-1/2",
                  "inline-flex h-11 w-11 items-center justify-center",
                  "rounded-full",
                  "border border-white/20",
                  "bg-black/25 text-white",
                  "backdrop-blur-md",
                  "shadow-lg",
                  "transition-all duration-200",
                  "hover:scale-105 hover:bg-black/45",
                  "active:scale-95",
                  "focus:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-white",
                )}
              >
                <ChevronRight
                  className="h-5 w-5"
                  aria-hidden
                />
              </button>

              {/* ======================================================
                  SLIDE INDICATORS
              ====================================================== */}

              <div
                className={cn(
                  "absolute bottom-5 left-1/2 z-40",
                  "-translate-x-1/2",
                  "flex items-center gap-2",
                  "rounded-full",
                  "border border-white/15",
                  "bg-black/20",
                  "px-3 py-2",
                  "backdrop-blur-md",
                )}
                role="tablist"
                aria-label="Hero images"
              >
                {HERO_IMAGES.map((_, index) => {
                  const active = currentSlide === index;

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      aria-label={`Go to image ${index + 1}`}
                      aria-current={
                        active ? "true" : undefined
                      }
                      className={cn(
                        "h-2 rounded-full",
                        "transition-all duration-300",
                        "focus:outline-none",
                        "focus-visible:ring-2",
                        "focus-visible:ring-white",
                        active
                          ? "w-8 bg-white"
                          : "w-2 bg-white/45 hover:bg-white/80",
                      )}
                    />
                  );
                })}
              </div>
            </div>

            {/* ========================================================
                GOVERNMENT IDENTITY
                Only Tanzania logo — Halmashauri logo removed.
            ======================================================== */}

            {identityContent ?? (
              <div className="relative z-30 flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10">
                {/* ====================================================
                    TOP HEADER
                ==================================================== */}

                <div className="flex items-start justify-between gap-4">
                  <div
                    className={cn(
                      "inline-flex items-center",
                      "rounded-2xl",
                      "border border-white/15",
                      "bg-black/20",
                      "p-2.5",
                      "backdrop-blur-md",
                    )}
                  >
                    <TanzaniaLogo
                      size="md"
                      priority
                    />
                  </div>

                  {/* Back Home */}
                  <button
                    type="button"
                    onClick={handleBackHome}
                    aria-label="Rudi kwenye ukurasa wa mwanzo"
                    className={cn(
                      "group inline-flex shrink-0 items-center gap-2",
                      "rounded-xl",
                      "border border-white/20",
                      "bg-black/20",
                      "px-3.5 py-2.5",
                      "text-xs font-semibold text-white",
                      "backdrop-blur-md",
                      "transition-all duration-200",
                      "hover:border-white/30",
                      "hover:bg-black/35",
                      "hover:shadow-lg",
                      "focus:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-white",
                    )}
                  >
                    <ArrowLeft
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
                      aria-hidden
                    />

                    <span className="hidden sm:inline">
                      Rudi Nyumbani
                    </span>

                    <Home
                      className="h-3.5 w-3.5 sm:hidden"
                      aria-hidden
                    />
                  </button>
                </div>

                {/* ====================================================
                    BOTTOM BRANDING

                    Minimal branding — no text overlay on images.
                ==================================================== */}

                <div className="flex items-end justify-between gap-5">
                  <div
                    className={cn(
                      "inline-flex items-center gap-3",
                      "rounded-2xl",
                      "border border-white/15",
                      "bg-black/20",
                      "px-4 py-3",
                      "backdrop-blur-md",
                    )}
                  >
                    <div className="h-2.5 w-2.5 rounded-full bg-gov-gold-400 shadow-lg shadow-gov-gold-400/40" />

                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
                      Serikali ya Tanzania
                    </span>
                  </div>

                  {/* Slide number */}
                  <div
                    className={cn(
                      "hidden rounded-xl",
                      "border border-white/15",
                      "bg-black/20",
                      "px-3 py-2",
                      "text-xs font-medium text-white/80",
                      "backdrop-blur-md",
                      "sm:block",
                    )}
                  >
                    {String(currentSlide + 1).padStart(2, "0")}{" "}
                    <span className="text-white/40">
                      /
                    </span>{" "}
                    {String(HERO_IMAGES.length).padStart(2, "0")}
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* ============================================================
            FORM PANEL

            Reduced from 3 columns to 2 so the hero has more space.
        ============================================================ */}

        <main
          className={cn(
            "relative flex items-center justify-center",
            "lg:col-span-2",
          )}
        >
          <div className="w-full">
            {/* ========================================================
                MOBILE IDENTITY
            ======================================================== */}

            <div className="mb-6 flex items-center justify-between gap-3 lg:hidden">
              <div className="flex items-center gap-3">
                <TanzaniaLogo
                  size="sm"
                  framed
                  priority
                />

                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-bold text-gov-ink">
                    Serikali ya Tanzania
                  </span>

                  <span className="text-xs text-gov-ink-soft/70">
                    Mfumo wa Kidijitali
                  </span>
                </div>
              </div>

              {/* Mobile back button */}
              <button
                type="button"
                onClick={handleBackHome}
                aria-label="Rudi kwenye ukurasa wa mwanzo"
                className={cn(
                  "group inline-flex shrink-0 items-center gap-2",
                  "rounded-xl",
                  "border border-gov-mist",
                  "bg-gov-paper px-3 py-2",
                  "text-xs font-semibold text-gov-ink",
                  "shadow-sm",
                  "transition-all duration-200",
                  "hover:border-gov-green-200",
                  "hover:bg-gov-green-50",
                  "hover:text-gov-green-700",
                  "focus:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-gov-green-400",
                )}
              >
                <ArrowLeft
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
                  aria-hidden
                />

                <span className="hidden sm:inline">
                  Nyumbani
                </span>

                <Home
                  className="h-3.5 w-3.5 sm:hidden"
                  aria-hidden
                />
              </button>
            </div>

            {/* ========================================================
                FORM CARD
            ======================================================== */}

            <div
              className={cn(
                "rounded-3xl",
                "border border-gov-mist",
                "bg-gov-paper",
                "p-6",
                "shadow-sm",
                "sm:p-8",
                "lg:p-8",
                "xl:p-10",
              )}
            >
              <header className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-gov-ink sm:text-3xl">
                  {title}
                </h2>

                {description && (
                  <p className="mt-2 text-sm leading-relaxed text-gov-ink-soft/80">
                    {description}
                  </p>
                )}
              </header>

              <div className="gov-focus-ring">
                {children}
              </div>

              {footer && (
                <div className="mt-6 border-t border-gov-mist pt-5 text-center text-xs text-gov-ink-soft/70">
                  {footer}
                </div>
              )}
            </div>

            {/* ========================================================
                FOOTER META
            ======================================================== */}

            <p className="mt-6 text-center text-[11px] uppercase tracking-[0.18em] text-gov-ink-soft/60">
              © {new Date().getFullYear()} Halmashauri Ya Wilaya Ya Mlele
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default GovernmentFormShell;