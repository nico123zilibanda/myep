"use client";

import { useState } from "react";
import YouthSidebar from "@/components/youth/YouthSidebar";
import YouthTopbar from "@/components/youth/YouthTopbar";

export default function YouthLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <YouthSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <YouthTopbar onMenuClick={() => setMobileOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
