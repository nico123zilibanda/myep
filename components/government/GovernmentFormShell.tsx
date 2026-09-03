
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { TanzaniaLogo } from "./TanzaniaLogo";
import { HalmashauriLogo } from "./HalmashauriLogo";

/**
 * GovernmentFormShell
 * --------------------------------------------------------------
 * Reusable visual/form shell for the entire system.
 *
 * Provides:
 *   - Tanzania Government identity
 *   - Halmashauri identity
 *   - Back-to-home navigation
 *   - Consistent government form styling
 *   - Responsive desktop/mobile layout
 */

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

  /** Custom identity panel content. */
  identityContent?: React.ReactNode;
}

export function GovernmentFormShell({
  title,
  description,
  children,
  footer,
  maxWidth = "lg",
  className,
  identityContent,
}: GovernmentFormShellProps) {
  const router = useRouter();

  const handleBackHome = () => {
    router.push("/");
  };

  return (
    <div
      className={cn(
        "relative min-h-[calc(100vh-4rem)] w-full overflow-hidden",
        "bg-gov-canvas text-gov-ink",
        className
      )}
    >
      {/* ============================================================ */}
      {/* AMBIENT BACKGROUND                                            */}
      {/* ============================================================ */}

      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gov-green-100/40 blur-3xl dark:bg-gov-green-400/10"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gov-blue-100/40 blur-3xl dark:bg-gov-blue-400/10"
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-stretch px-4 py-10 sm:px-6 lg:grid-cols-5 lg:gap-10 lg:py-14">

        {/* ============================================================ */}
        {/* IDENTITY PANEL                                                */}
        {/* ============================================================ */}

        <aside className="relative lg:col-span-2">
          <div
            className={cn(
              "relative flex h-full flex-col justify-between overflow-hidden rounded-3xl",
              "border border-gov-green-100 bg-gov-green-600 text-white",
              "p-7 sm:p-9 lg:p-10",
              "shadow-lg shadow-gov-green-900/10"
            )}
          >
            {/* Top institutional stripe */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 flex h-1.5"
            >
              <div className="flex-1 bg-gov-green-500" />
              <div className="flex-1 bg-gov-gold-500" />
              <div className="flex-1 bg-gov-blue-500" />
              <div className="flex-1 bg-gov-ink-soft/70" />
            </div>

            {identityContent ?? (
              <div className="flex flex-col gap-7">

                {/* ================================================== */}
                {/* TANZANIA LOGO + BACK HOME                           */}
                {/* ================================================== */}

                <div className="flex items-center justify-between gap-4">

                  {/* Tanzania identity */}
                  <div className="flex min-w-0 items-center gap-3">
                    <TanzaniaLogo
                      size="md"
                      priority
                    />

                    <div className="flex min-w-0 flex-col leading-tight">
                      <span className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                        Serikali ya Tanzania
                      </span>

                      <span className="text-sm font-semibold text-white">
                        Mfumo wa Kidijitali
                      </span>
                    </div>
                  </div>

                  {/* Back to home */}
                  <button
                    type="button"
                    onClick={handleBackHome}
                    aria-label="Rudi kwenye ukurasa wa mwanzo"
                    className={cn(
                      "group inline-flex shrink-0 items-center gap-2",
                      "rounded-xl border border-white/15",
                      "bg-white/10 px-3 py-2",
                      "text-xs font-semibold text-white",
                      "backdrop-blur-sm",
                      "transition-all duration-200",
                      "hover:border-white/25",
                      "hover:bg-white/15",
                      "hover:shadow-sm",
                      "focus:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-gov-gold-300",
                      "focus-visible:ring-offset-2",
                      "focus-visible:ring-offset-gov-green-600"
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

                {/* ================================================== */}
                {/* HALMASHAURI IDENTITY                               */}
                {/* ================================================== */}

                <div className="flex items-start gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/15">
                  <HalmashauriLogo
                    size="md"
                    framed
                    className="h-12! w-12!"
                  />

                  <div className="flex flex-col leading-tight">
                    <span className="text-base font-bold tracking-tight">
                      Halmashauri ya Wilaya ya Mlele
                    </span>

                    <span className="text-sm font-medium text-white/85">
                      Mlele District Council
                    </span>
                  </div>
                </div>

                {/* ================================================== */}
                {/* IDENTITY STATEMENT                                  */}
                {/* ================================================== */}

                <div className="mt-2">
                  <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                    Mfumo Rasmi wa
                    <br />
                    Huduma za Fursa na
                    <br />
                    Maendeleo
                  </h1>

                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">
                    Jukwaa rasmi la Serikali la kutoa fursa za ajira,
                    mafunzo, mikopo na huduma nyingine kwa wananchi wa
                    Wilaya ya Mlele.
                  </p>
                </div>
              </div>
            )}

            {/* Bottom accent */}
            <div className="mt-10 flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
              <span>
                Jamii · Uwazi · Maendeleo
              </span>

              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gov-gold-400" />
                Mfumo Hai
              </span>
            </div>
          </div>
        </aside>

        {/* ============================================================ */}
        {/* FORM PANEL                                                    */}
        {/* ============================================================ */}

        <main className="relative mt-8 flex items-center justify-center lg:col-span-3 lg:mt-0">
          <div
            className={cn(
              "w-full",
              maxWidth === "sm" && "max-w-md",
              maxWidth === "md" && "max-w-lg",
              maxWidth === "lg" && "max-w-xl",
              maxWidth === "xl" && "max-w-2xl",
              !["sm", "md", "lg", "xl"].includes(maxWidth) &&
                `max-w-[${maxWidth}]`
            )}
          >
            {/* Mobile identity strip */}
            <div className="mb-6 flex items-center justify-between gap-3 lg:hidden">

              <div className="flex items-center gap-3">
                <HalmashauriLogo
                  size="sm"
                  framed
                  priority
                />

                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-bold text-gov-ink">
                    Halmashauri ya Wilaya ya Mlele
                  </span>

                  <span className="text-xs text-gov-ink-soft/70">
                    Mlele District Council
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
                  "rounded-xl border border-gov-mist",
                  "bg-gov-paper px-3 py-2",
                  "text-xs font-semibold text-gov-ink",
                  "shadow-sm",
                  "transition-all duration-200",
                  "hover:border-gov-green-200",
                  "hover:bg-gov-green-50",
                  "hover:text-gov-green-700",
                  "focus:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-gov-green-400"
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

            {/* Form card */}
            <div className="rounded-3xl border border-gov-mist bg-gov-paper p-6 shadow-sm sm:p-8 lg:p-10">
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

            {/* Bottom meta */}
            <p className="mt-6 text-center text-[11px] uppercase tracking-[0.18em] text-gov-ink-soft/60">
              © {new Date().getFullYear()} Halmashauri ya Wilaya ya Mlele ·
              Serikali ya Tanzania
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default GovernmentFormShell;

