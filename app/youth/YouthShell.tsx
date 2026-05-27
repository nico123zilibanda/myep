
"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import clsx from "clsx";

import {
  ChevronLeft,
  X,
} from "lucide-react";

import YouthTopbar from "@/components/youth/YouthTopbar";
import YouthMenu from "@/components/youth/YouthSidebar";

import { CurrentUser } from "@/lib/auth";

/* ================= TYPES ================= */

interface Props {
  user: CurrentUser;

  children: React.ReactNode;
}

/* ================= COMPONENT ================= */

export default function YouthShell({
  user,
  children,
}: Props) {
  const [
    sidebarCollapsed,
    setSidebarCollapsed,
  ] = useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  /* ================= ESC CLOSE ================= */

  useEffect(() => {
    const handleEsc = (
      e: KeyboardEvent,
    ) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEsc,
    );

    return () =>
      document.removeEventListener(
        "keydown",
        handleEsc,
      );
  }, []);

  /* ================= BODY LOCK ================= */

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "auto";
    }

    return () => {
      document.body.style.overflow =
        "auto";
    };
  }, [mobileOpen]);

  /* ================= UI ================= */

  return (
    <div
      className="
        flex h-screen overflow-hidden

        bg-zinc-50
        dark:bg-zinc-950
      "
    >
      {/* ================= DESKTOP SIDEBAR ================= */}

      <aside
        className={clsx(
          `
            hidden lg:flex
            flex-col

            border-r border-zinc-200/70
            dark:border-zinc-800/80

            bg-white/80
            dark:bg-zinc-900/80

            backdrop-blur-xl

            shadow-sm

            transition-all duration-300 ease-in-out
          `,
          sidebarCollapsed
            ? "w-20"
            : "w-72",
        )}
      >
        {/* ================= HEADER ================= */}

        <div
          className="
            flex h-16 items-center justify-between

            border-b border-zinc-200/70
            dark:border-zinc-800/80

            px-4
          "
        >
          {/* LOGO */}
          <div
            className="
              flex items-center gap-3

              overflow-hidden
            "
          >
            <div
              className="
                relative

                size-10 overflow-hidden

                rounded-2xl

                border border-zinc-200
                dark:border-zinc-800

                shadow-sm
              "
            >
              <Image
                src="/logo.png"
                alt="logo"
                fill
                className="object-cover"
              />
            </div>

            {!sidebarCollapsed && (
              <div
                className="
                  flex flex-col

                  leading-tight
                "
              >
                <span
                  className="
                    truncate

                    text-[15px]
                    font-semibold

                    text-zinc-900
                    dark:text-white
                  "
                >
                  Mlele DC
                </span>

                <span
                  className="
                    text-xs

                    text-zinc-500
                  "
                >
                  Fursa Portal
                </span>
              </div>
            )}
          </div>

          {/* TOGGLE */}
          <button
            onClick={() =>
              setSidebarCollapsed(
                (prev) => !prev,
              )
            }
            className="
              hidden xl:flex

              size-8 items-center justify-center

              rounded-xl

              transition

              hover:bg-zinc-100
              dark:hover:bg-zinc-800
            "
          >
            <ChevronLeft
              size={16}
              className={clsx(
                `
                  transition-transform duration-300
                `,
                sidebarCollapsed &&
                  "rotate-180",
              )}
            />
          </button>
        </div>

        {/* ================= MENU ================= */}

        <div
          className="
            flex-1 overflow-y-auto

            py-6
          "
        >
          <YouthMenu
            isCollapsed={
              sidebarCollapsed
            }
          />
        </div>

        {/* ================= FOOTER ================= */}

        {!sidebarCollapsed && (
          <div
            className="
              border-t border-zinc-200/70
              dark:border-zinc-800/80

              px-5 py-4
            "
          >
            <div
              className="
                rounded-2xl

                bg-linear-to-r
                from-primary
                to-indigo-600

                p-4

                text-white
              "
            >
              <p
                className="
                  text-sm font-medium
                "
              >
                Mfumo wa Vijana
              </p>

              <p
                className="
                  mt-1

                  text-xs opacity-80
                "
              >
                Mfumo rasmi wa fursa,
                mafunzo, na maendeleo ya
                vijana Wilaya ya Mlele.
              </p>
            </div>
          </div>
        )}
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}

      {mobileOpen && (
        <div
          className="
            fixed inset-0 z-50

            lg:hidden
          "
        >
          {/* OVERLAY */}
          <div
            onClick={() =>
              setMobileOpen(false)
            }
            className="
              absolute inset-0

              bg-black/50

              backdrop-blur-sm
            "
          />

          {/* PANEL */}
          <aside
            className="
              relative z-50

              flex h-full w-[85%]
              max-w-[320px]
              flex-col

              border-r border-zinc-200
              dark:border-zinc-800

              bg-white
              dark:bg-zinc-950

              shadow-2xl

              animate-in
              slide-in-from-left
              duration-300
            "
          >
            {/* HEADER */}
            <div
              className="
                flex h-16 items-center justify-between

                border-b border-zinc-200
                dark:border-zinc-800

                px-4
              "
            >
              {/* LOGO */}
              <div
                className="
                  flex items-center gap-3
                "
              >
                <div
                  className="
                    relative

                    size-10 overflow-hidden

                    rounded-2xl
                  "
                >
                  <Image
                    src="/logo.png"
                    alt="logo"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p
                    className="
                      text-sm
                      font-semibold
                    "
                  >
                    Mlele DC
                  </p>

                  <p
                    className="
                      text-xs
                      text-zinc-500
                    "
                  >
                    Fursa Portal
                  </p>
                </div>
              </div>

              {/* CLOSE */}
              <button
                onClick={() =>
                  setMobileOpen(false)
                }
                className="
                  flex size-9 items-center justify-center

                  rounded-xl

                  transition

                  hover:bg-zinc-100
                  dark:hover:bg-zinc-800
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* MENU */}
            <div
              className="
                flex-1 overflow-y-auto

                py-6
              "
            >
              <YouthMenu
                isCollapsed={false}
                onItemClick={() =>
                  setMobileOpen(false)
                }
              />
            </div>
          </aside>
        </div>
      )}

      {/* ================= MAIN ================= */}

      <div
        className="
          flex min-w-0 flex-1 flex-col
        "
      >
        {/* TOPBAR */}
        <YouthTopbar
          user={user}
          onMenuClick={() =>
            setMobileOpen(true)
          }
        />

        {/* PAGE */}
        <main
          className="
            flex-1 overflow-y-auto

            bg-zinc-50
            dark:bg-zinc-950
          "
        >
          <div
            className="
              mx-auto w-full max-w-7xl

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

