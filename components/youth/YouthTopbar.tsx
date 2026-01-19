"use client";

import { LogOut, Sun, Moon, Menu } from "lucide-react";
import { useEffect, useState } from "react";

export default function YouthTopbar({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const [darkMode, setDarkMode] = useState(false);

  // Init theme on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    if (darkMode) {
      // Switch to LIGHT
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      // Switch to DARK
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b bg-white dark:bg-gray-900">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu size={18} />
        </button>

        <span className="font-semibold text-gray-800 dark:text-gray-100">
          Youth Dashboard
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        {/* <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button> */}

        {/* Logout */}
        <button
          onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST" });
            window.location.href = "/login";
          }}
          className="flex items-center gap-1 text-red-600 dark:text-red-400 hover:underline transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}
