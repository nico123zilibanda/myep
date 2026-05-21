"use client";

import { useState } from "react";
import Menu from "@/components/menu/Menu";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import clsx from "clsx";
import { CurrentUser } from "@/lib/auth";
import { ChevronLeft, X } from "lucide-react";

interface Props {
  user: CurrentUser;
  children: React.ReactNode;
}

export default function AdminShell({ user, children }: Props) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className={clsx(
          "hidden lg:flex flex-col border-r border-zinc-200/70 dark:border-zinc-800/80",
          "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl",
          "transition-all duration-300 ease-in-out",
          "shadow-sm",
          sidebarCollapsed ? "w-20" : "w-72"
        )}
      >
        {/* HEADER */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-200/70 dark:border-zinc-800/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative w-10 h-10 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <Image
                src="/logo.png"
                alt="logo"
                fill
                className="object-cover"
              />
            </div>

            {!sidebarCollapsed && (
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-[15px] text-zinc-900 dark:text-white truncate">
                  Mlele DC
                </span>

                <span className="text-xs text-zinc-500 truncate">
                  Admin Portal
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            className="
              hidden xl:flex
              items-center justify-center
              w-8 h-8 rounded-xl
              hover:bg-zinc-100 dark:hover:bg-zinc-800
              transition
            "
          >
            <ChevronLeft
              size={16}
              className={clsx(
                "transition-transform duration-300",
                sidebarCollapsed && "rotate-180"
              )}
            />
          </button>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto py-6">
          <Menu isCollapsed={sidebarCollapsed} />
        </div>

        {/* FOOTER */}
        {!sidebarCollapsed && (
          <div className="px-5 py-4 border-t border-zinc-200/70 dark:border-zinc-800/80">
            <div className="rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 p-4 text-white">
              <p className="text-sm font-medium">
                Mlele Opportunity System
              </p>

              <p className="text-xs opacity-80 mt-1">
                Production Admin Dashboard
              </p>
            </div>
          </div>
        )}
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* PANEL */}
          <aside
            className="
              relative z-50
              h-full w-[85%] max-w-[320px]
              bg-white dark:bg-zinc-950
              border-r border-zinc-200 dark:border-zinc-800
              shadow-2xl
              animate-in slide-in-from-left duration-300
              flex flex-col
            "
          >
            {/* HEADER */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="logo"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="font-semibold text-sm">Mlele DC</p>
                  <p className="text-xs text-zinc-500">
                    Admin Portal
                  </p>
                </div>
              </div>

              <button
                onClick={() => setMobileOpen(false)}
                className="
                  w-9 h-9 rounded-xl
                  flex items-center justify-center
                  hover:bg-zinc-100 dark:hover:bg-zinc-800
                  transition
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* MENU */}
            <div className="flex-1 overflow-y-auto py-6">
              <Menu
                isCollapsed={false}
                onItemClick={() => setMobileOpen(false)}
              />
            </div>
          </aside>
        </div>
      )}

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} onMenuClick={() => setMobileOpen(true)} />

        <main
          className="
            flex-1 overflow-y-auto
            bg-zinc-50 dark:bg-zinc-950
          "
        >
          <div className="max-w-7xl mx-auto w-full p-4 md:p-6 xl:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}