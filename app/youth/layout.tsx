"use client";

import YouthSidebar from "@/components/youth/YouthSidebar";
import YouthTopbar from "@/components/youth/YouthTopbar";

export default function YouthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <YouthSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <YouthTopbar />

        {/* Page content */}
        <main className="flex-1 p-6 sm:p-8 md:p-10 lg:p-12 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
