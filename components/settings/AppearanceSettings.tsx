"use client";

import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useDictionary } from "@/lib/i18n/useDictionary";

export default function AppearanceSettings() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useDictionary();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="card p-6 shadow-sm space-y-4">

      {/* HEADER */}
      <div>
        <h3 className="font-semibold">
          {t("APPEARANCE_TITLE")}
        </h3>
        <p className="text-sm opacity-70">
          {t("APPEARANCE_DESCRIPTION")}
        </p>
      </div>

      {/* OPTIONS */}
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
          {t("THEME_LIGHT")}
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
          {t("THEME_DARK")}
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
          {t("THEME_SYSTEM")}
        </button>

      </div>
    </div>
  );
}