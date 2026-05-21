"use client";

import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useDictionary } from "@/lib/i18n/useDictionary";

type ThemeOption = "light" | "dark" | "system";

export default function AppearanceSettings() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useDictionary();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const options: {
    key: ThemeOption;
    icon: React.ReactNode;
    label: string;
  }[] = [
    { key: "light", icon: <Sun size={20} />, label: t("THEME_LIGHT") },
    { key: "dark", icon: <Moon size={20} />, label: t("THEME_DARK") },
    { key: "system", icon: <Laptop size={20} />, label: t("THEME_SYSTEM") },
  ];

  return (
    <div className="rounded-3xl border bg-background p-6 shadow-sm space-y-6">
      {/* HEADER */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-foreground">
          {t("APPEARANCE_TITLE")}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t("APPEARANCE_DESCRIPTION")}
        </p>
      </div>

      {/* OPTIONS */}
      <div className="grid grid-cols-3 gap-4">
        {options.map((opt) => {
          const isActive = resolvedTheme === opt.key;

          return (
            <button
              key={opt.key}
              onClick={() => setTheme(opt.key)}
              className={`
                relative flex flex-col items-center justify-center gap-2
                rounded-2xl border p-5
                transition-all duration-200

                ${
                  isActive
                    ? "border-primary bg-primary/10 text-primary shadow-sm"
                    : "border-border bg-background hover:bg-muted/40"
                }
              `}
            >
              {/* ICON WRAPPER */}
              <div
                className={`
                  flex h-12 w-12 items-center justify-center rounded-xl
                  ${
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground"
                  }
                `}
              >
                {opt.icon}
              </div>

              <span className="text-sm font-medium">
                {opt.label}
              </span>

              {/* ACTIVE INDICATOR */}
              {isActive && (
                <div className="absolute bottom-2 h-1 w-10 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}