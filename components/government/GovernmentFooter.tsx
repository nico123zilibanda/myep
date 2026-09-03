import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HalmashauriLogo } from "./HalmashauriLogo";
import { TanzaniaLogo } from "./TanzaniaLogo";
import { Mail, Phone, MapPin } from "lucide-react";

/**
 * GovernmentFooter
 * --------------------------------------------------------------
 * Reusable footer used by the public marketing/landing pages.
 *
 * Composition:
 *   - Halmashauri logo (institutional identity)
 *   - Tanzania Government identity line
 *   - Institutional contact information
 *   - Copyright / official system notice
 *
 * Uses the Tanzania-flag-inspired color palette in a single,
 * subtle tricolor accent stripe — never overpowering.
 */

interface GovernmentFooterProps {
  className?: string;
  /** Hide links column (used in narrow contexts). */
  compact?: boolean;
}

const defaultNavLinks = [
  { label: "Huduma", href: "#services" },
  { label: "Jinsi Inavyofanya", href: "#how-it-works" },
  { label: "Kuhusu", href: "#about" },
  { label: "Ingia", href: "/login" },
];

export function GovernmentFooter({
  className,
  compact = false,
}: GovernmentFooterProps) {
  return (
    <footer
      className={cn(
        "relative w-full border-t border-gov-mist bg-gov-paper text-gov-ink",
        className
      )}
    >
      {/* Top tricolor accent — very subtle */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 flex"
      >
        <div className="flex-1 bg-gov-green-600" />
        <div className="flex-1 bg-gov-gold-500" />
        <div className="flex-1 bg-gov-blue-500" />
        <div className="flex-1 bg-gov-ink-soft/70" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div
          className={cn(
            "grid gap-10",
            compact
              ? "md:grid-cols-2"
              : "md:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {/* ================= IDENTITY ================= */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-start gap-3">
              <HalmashauriLogo size="md" />
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold text-gov-ink">
                  Halmashauri ya Wilaya ya Mlele
                </span>
                <span className="text-xs font-medium text-gov-ink-soft/70">
                  Mlele District Council
                </span>
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-gov-ink-soft/80">
              Mfumo rasmi wa kidijitali wa kutoa fursa za ajira, mafunzo,
              mikopo na huduma nyingine kwa wananchi wa Wilaya ya Mlele.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <TanzaniaLogo size="sm" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gov-ink-soft/80">
                Serikali ya Tanzania
              </span>
            </div>
          </div>

          {/* ================= LINKS ================= */}
          {!compact && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gov-ink-soft">
                Mfumo
              </h4>
              <ul className="mt-4 space-y-2.5">
                {defaultNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gov-ink-soft transition-colors hover:text-gov-green-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ================= CONTACT ================= */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gov-ink-soft">
              Mawasiliano
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-gov-ink-soft">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gov-green-700" />
                <span>Wilaya ya Mlele, Mkoa wa Katavi, Tanzania</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-gov-green-700" />
                <span>+255 000 000 000</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-gov-green-700" />
                <span>info@mleledc.go.tz</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-gov-mist pt-6 text-xs text-gov-ink-soft/80 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} Halmashauri ya Wilaya ya Mlele ·
            Haki zote zimehifadhiwa.
          </p>
          <p className="font-medium uppercase tracking-[0.18em] text-gov-ink-soft/70">
            Mfumo Rasmi wa Serikali
          </p>
        </div>
      </div>
    </footer>
  );
}

export default GovernmentFooter;