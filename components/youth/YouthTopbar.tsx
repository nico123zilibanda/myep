"use client";

import { LogOut } from "lucide-react";

export default function YouthTopbar() {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <span className="font-medium text-gray-700">
        Youth Dashboard
      </span>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm text-red-600 hover:underline"
      >
        <LogOut size={16} />
        Logout
      </button>
    </header>
  );
}
