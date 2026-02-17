"use client";

import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AppearanceSettings() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="card p-6 shadow-sm space-y-4">

      <div>
        <h3 className="font-semibold">Appearance</h3>
        <p className="text-sm opacity-70">
          Choose how the interface looks
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">

        {/* LIGHT */}
        <button
          onClick={() => setTheme("light")}
          className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition
            ${
              resolvedTheme === "light"
                ? "border-blue-500 bg-blue-50"
                : "border-default"
            }`}
        >
          <Sun size={20} />
          Light
        </button>

        {/* DARK */}
        <button
          onClick={() => setTheme("dark")}
          className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition
            ${
              resolvedTheme === "dark"
                ? "border-blue-500 bg-blue-950/40"
                : "border-default"
            }`}
        >
          <Moon size={20} />
          Dark
        </button>

        {/* SYSTEM */}
        <button
          onClick={() => setTheme("system")}
          className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition
            ${
              resolvedTheme === "system"
                ? "border-blue-500 bg-blue-50"
                : "border-default"
            }`}
        >
          <Laptop size={20} />
          System
        </button>

      </div>
    </div>
  );
}
