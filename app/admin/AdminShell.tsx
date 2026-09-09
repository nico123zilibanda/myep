
"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { ChevronLeft, X } from "lucide-react";

import Navbar from "@/components/navbar/Navbar";
import Menu from "@/components/menu/Menu";

import { HalmashauriLogo } from "@/components/government/HalmashauriLogo";
import { TanzaniaLogo } from "@/components/government/TanzaniaLogo";

import { CurrentUser } from "@/lib/auth";

interface Props {
  user: CurrentUser;
  children: React.ReactNode;
}

export default function AdminShell({
  user,
  children,
}: Props) {
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  /* =====================================================
   * CLOSE MOBILE SIDEBAR WITH ESC
   * ===================================================== */

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEsc,
      );
    };
  }, []);

  /* =====================================================
   * LOCK BODY SCROLL WHEN MOBILE SIDEBAR IS OPEN
   * ===================================================== */

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div
      className="
        flex h-screen overflow-hidden

        bg-background
        text-foreground

        transition-colors duration-200
      "
    >
      {/* =================================================
       * DESKTOP SIDEBAR
       * ================================================= */}

      <aside
        className={clsx(
          `
            hidden lg:flex
            flex-col

            border-r border-border

            bg-card

            shadow-sm

            transition-all duration-300 ease-in-out
          `,
          sidebarCollapsed
            ? "w-20"
            : "w-72",
        )}
      >
        {/* =================================================
         * TANZANIA-INSPIRED GOVERNMENT STRIPE
         * ================================================= */}

        <div
          aria-hidden="true"
          className="flex h-0.5 w-full shrink-0"
        >
          <div className="flex-1 bg-gov-green-600" />
          <div className="flex-1 bg-gov-gold-500" />
          <div className="flex-1 bg-gov-blue-500" />
          <div className="flex-1 bg-gov-ink-soft/50" />
        </div>

        {/* =================================================
         * SIDEBAR HEADER
         * ================================================= */}

        <div
          className="
            flex h-16 shrink-0 items-center justify-between

            border-b border-border

            px-4
          "
        >
          {/* LOGO + TITLE */}

          <div
            className="
              flex min-w-0 items-center gap-3
              overflow-hidden
            "
          >
            <HalmashauriLogo
              size="sm"
              priority
            />

            {!sidebarCollapsed && (
              <div
                className="
                  flex min-w-0 flex-col
                  leading-tight
                "
              >
                <span
                  className="
                    truncate

                    text-[14px]
                    font-bold

                    text-foreground
                  "
                >
                  Halmashauri ya Mlele
                </span>

                <span
                  className="
                    truncate

                    text-[11px]
                    font-medium

                    text-muted-foreground
                  "
                >
                  Mlele District Council
                </span>
              </div>
            )}
          </div>

          {/* COLLAPSE BUTTON */}

          <button
            type="button"
            onClick={() =>
              setSidebarCollapsed(
                (previous) => !previous,
              )
            }
            className="
              hidden xl:flex

              size-8 shrink-0
              items-center justify-center

              rounded-xl

              text-muted-foreground

              transition-colors

              hover:bg-muted
              hover:text-gov-green-600

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-gov-green-500
              focus-visible:ring-offset-2
              focus-visible:ring-offset-card
            "
            aria-label={
              sidebarCollapsed
                ? "Panua menyu"
                : "Punguza menyu"
            }
            aria-expanded={!sidebarCollapsed}
          >
            <ChevronLeft
              size={16}
              className={clsx(
                "transition-transform duration-300",
                sidebarCollapsed &&
                  "rotate-180",
              )}
            />
          </button>
        </div>

        {/* =================================================
         * SIDEBAR MENU
         * ================================================= */}

        <div
          className="
            flex-1 overflow-y-auto
            py-6
          "
        >
          <Menu
            isCollapsed={sidebarCollapsed}
          />
        </div>

        {/* =================================================
         * SIDEBAR GOVERNMENT INFO CARD
         * ================================================= */}

        {!sidebarCollapsed && (
          <div
            className="
              border-t border-border

              px-5 py-4
            "
          >
            <div
              className="
                relative overflow-hidden
                rounded-2xl

                border border-gov-green-500/30

                bg-gov-green-600
                dark:bg-gov-green-700

                p-4

                text-white

                shadow-sm
                shadow-gov-green-900/10
              "
            >
              {/* Tanzania-inspired accent */}

              <div
                aria-hidden="true"
                className="
                  absolute inset-x-0 top-0
                  flex h-0.5
                "
              >
                <div className="flex-1 bg-gov-gold-400" />
                <div className="flex-1 bg-gov-blue-400" />
                <div className="flex-1 bg-white/70" />
              </div>

              <div className="flex items-start gap-2">
                <TanzaniaLogo
                  size="sm"
                  className="h-7! w-7!"
                />

                <p
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-white/80
                  "
                >
                  Msimamizi
                </p>
              </div>

              <p
                className="
                  mt-2

                  text-sm
                  font-bold
                  leading-tight
                  text-white
                "
              >
                Mlele DC Fursa Portal
              </p>

              <p
                className="
                  mt-1

                  text-xs
                  leading-relaxed

                  text-white/85
                "
              >
                Mfumo rasmi wa usimamizi wa fursa,
                mafunzo, na maendeleo ya Wilaya ya
                Mlele.
              </p>
            </div>
          </div>
        )}
      </aside>

      {/* ===================================================
       * MOBILE SIDEBAR
       * =================================================== */}

      {mobileOpen && (
        <div
          className="
            fixed inset-0 z-50
            lg:hidden
          "
        >
          {/* =================================================
           * OVERLAY
           * ================================================= */}

          <button
            type="button"
            aria-label="Funga menyu"
            onClick={() =>
              setMobileOpen(false)
            }
            className="
              absolute inset-0

              cursor-default

              bg-black/50
              backdrop-blur-sm
            "
          />

          {/* =================================================
           * MOBILE PANEL
           * ================================================= */}

          <aside
            className="
              relative z-50

              flex h-full
              w-[85%]
              max-w-[320px]
              flex-col

              border-r border-border

              bg-card

              text-foreground

              shadow-2xl

              animate-in
              slide-in-from-left
              duration-300
            "
            aria-label="Menyu kuu"
          >
            {/* =================================================
             * TRICOLOR STRIPE
             * ================================================= */}

            <div
              aria-hidden="true"
              className="
                flex h-0.5 w-full shrink-0
              "
            >
              <div className="flex-1 bg-gov-green-600" />
              <div className="flex-1 bg-gov-gold-500" />
              <div className="flex-1 bg-gov-blue-500" />
              <div className="flex-1 bg-gov-ink-soft/50" />
            </div>

            {/* =================================================
             * MOBILE HEADER
             * ================================================= */}

            <div
              className="
                flex h-16 shrink-0
                items-center justify-between

                border-b border-border

                px-4
              "
            >
              {/* LOGO */}

              <div
                className="
                  flex min-w-0
                  items-center gap-3
                "
              >
                <HalmashauriLogo
                  size="sm"
                  priority
                />

                <div
                  className="
                    min-w-0
                  "
                >
                  <p
                    className="
                      truncate

                      text-sm
                      font-bold

                      text-foreground
                    "
                  >
                    Halmashauri ya Mlele
                  </p>

                  <p
                    className="
                      truncate

                      text-[11px]

                      text-muted-foreground
                    "
                  >
                    Mlele District Council
                  </p>
                </div>
              </div>

              {/* CLOSE BUTTON */}

              <button
                type="button"
                onClick={() =>
                  setMobileOpen(false)
                }
                className="
                  flex size-9 shrink-0
                  items-center justify-center

                  rounded-xl

                  text-muted-foreground

                  transition-colors

                  hover:bg-muted
                  hover:text-gov-green-600

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-gov-green-500
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-card
                "
                aria-label="Funga menyu"
              >
                <X size={18} />
              </button>
            </div>

            {/* =================================================
             * MOBILE MENU
             * ================================================= */}

            <div
              className="
                flex-1 overflow-y-auto
                py-6
              "
            >
              <Menu
                isCollapsed={false}
                onItemClick={() =>
                  setMobileOpen(false)
                }
              />
            </div>
          </aside>
        </div>
      )}

      {/* =====================================================
       * MAIN APPLICATION AREA
       * ===================================================== */}

      <div
        className="
          flex min-w-0
          flex-1 flex-col
        "
      >
        {/* =================================================
         * TOP NAVBAR
         * ================================================= */}

        <Navbar
          user={user}
          onMenuClick={() =>
            setMobileOpen(true)
          }
        />

        {/* =================================================
         * PAGE CONTENT
         * ================================================= */}

        <main
          className="
            flex-1 overflow-y-auto

            bg-background
            text-foreground

            transition-colors duration-200
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-7xl

              p-4
              md:p-6
              xl:p-8
            "
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

