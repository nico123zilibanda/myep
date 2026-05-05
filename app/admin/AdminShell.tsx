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
    <div className="h-screen flex bg-background transition-colors overflow-hidden">

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className={clsx(
          "hidden lg:flex flex-col border-r border-border transition-all duration-300 ease-out",
          sidebarCollapsed ? "w-20" : "w-64",
          "bg-card"
        )}
      >
        {/* SIDEBAR HEADER */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <div className="flex items-center gap-2 overflow-hidden">
            <Image src="/logo.png" alt="logo" width={32} height={32} />
            {!sidebarCollapsed && (
              <span className="font-bold text-lg text-blue-600 truncate">
                Mlele Portal
              </span>
            )}
          </div>

          <button
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            className="p-2 rounded-lg hover:bg-muted transition"
            title={sidebarCollapsed ? "Expand" : "Collapse"}
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
        <div className="flex-1 overflow-y-auto py-4">
          <Menu isCollapsed={sidebarCollapsed} />
        </div>
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
            onClick={() => setMobileOpen(false)}
          />

          {/* Sidebar Panel */}
          <aside className="card relative w-full h-full bg-white animate-slideIn z-50">
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-border">
              <span className="font-bold text-blue-600 text-lg">
                Mlele Portal
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-muted transition"
              >
                <X />
              </button>
            </div>

            {/* Menu */}
            <div className="py-4">
              <Menu isCollapsed={false} onItemClick={() => setMobileOpen(false)} />
            </div>
          </aside>
        </div>
      )}

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} onMenuClick={() => setMobileOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}