"use client";

import { useState } from "react";
import YouthTopbar from "@/components/youth/YouthTopbar";
import YouthMenu from "@/components/youth/YouthSidebar";
import Image from "next/image";
import clsx from "clsx";
import { CurrentUser } from "@/lib/auth";
import { ChevronLeft, X } from "lucide-react";

interface Props {
  user: CurrentUser;
  children: React.ReactNode;
}

export default function YouthShell({ user, children }: Props) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      style={{ backgroundColor: "var(--app-bg)", color: "var(--text-primary)" }}
      className="min-h-screen flex transition-colors"
    >
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className={clsx(
          "hidden lg:flex flex-col transition-all duration-300",
          sidebarCollapsed ? "w-20" : "w-64"
        )}
        style={{ backgroundColor: "var(--card)", borderRight: "1px solid var(--border)" }}
      >
        {/* SIDEBAR HEADER */}
        <div
          className="h-16 flex items-center justify-between px-4 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <Image src="/logo.png" alt="logo" width={32} height={32} />
            {!sidebarCollapsed && (
              <span className="font-bold text-lg text-blue-600 truncate">
                Youth Portal
              </span>
            )}
          </div>

          <button
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            style={{ color: "var(--foreground)" }}
            className="p-1.5 rounded-lg hover:opacity-80 transition"
            title={sidebarCollapsed ? "Expand" : "Collapse"}
          >
            <ChevronLeft
              size={16}
              className={clsx(
                "transition-transform",
                sidebarCollapsed && "rotate-180"
              )}
            />
          </button>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto py-4">
          <YouthMenu
            isCollapsed={sidebarCollapsed}
            onItemClick={() => setMobileOpen(false)}
          />
        </div>
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden mt-6">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          <aside
            className="relative z-50 w-64 h-full"
            style={{ backgroundColor: "var(--card)", borderRight: "1px solid var(--border)" }}
          >
            <div
              className="h-16 flex items-center justify-between px-4 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <span className="font-bold text-blue-600">Youth Portal</span>
              <button onClick={() => setMobileOpen(false)}>
                <X style={{ color: "var(--foreground)" }} />
              </button>
            </div>

            <YouthMenu
              isCollapsed={false}
              onItemClick={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <YouthTopbar onMenuClick={() => setMobileOpen(true)} user={user} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
