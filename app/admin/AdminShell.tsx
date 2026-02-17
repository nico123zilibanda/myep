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
    <div className="min-h-screen flex bg-(--background) transition-colors">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className={clsx(
          "hidden lg:flex flex-col transition-all duration-300",
          sidebarCollapsed ? "w-20" : "w-64",
          "bg-(--card) border-r border-(--border)"
        )}
      >
        {/* SIDEBAR HEADER */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-(--border)">
          <div className="flex items-center gap-2 overflow-hidden">
            <Image src="/logo.png" alt="logo" width={32} height={32} />
            {!sidebarCollapsed && (
              <span className="font-bold text-lg text-blue-600 truncate">
                Mlele Portal
              </span>
            )}
          </div>

          <button
            onClick={() => setSidebarCollapsed(prev => !prev)}
            className="p-1.5 rounded-lg text-(--foreground) hover:opacity-80 transition"
            title={sidebarCollapsed ? "Expand" : "Collapse"}
          >
            <ChevronLeft
              size={16}
              className={clsx("transition-transform", sidebarCollapsed && "rotate-180")}
            />
          </button>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto py-4">
          <Menu isCollapsed={sidebarCollapsed} />
        </div>
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden mt-6">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          <aside className="relative z-50 w-64 h-full bg-(--card) border-r border-(--border)">
            <div className="h-16 flex items-center justify-between px-4 border-b border-(--border)">
              <span className="font-bold text-blue-600">Mlele Portal</span>
              <button onClick={() => setMobileOpen(false)}>
                <X className="text-(--foreground)" />
              </button>
            </div>

            <Menu isCollapsed={false} onItemClick={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} onMenuClick={() => setMobileOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
