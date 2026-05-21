"use client";

import { ReactNode, useEffect, useState } from "react";

import { useDictionary } from "@/lib/i18n/useDictionary";
import { MessageKey } from "@/lib/messages";

import { TrendingUp } from "lucide-react";

interface StatCardProps {
  titleKey: MessageKey;
  value: number;
  icon: ReactNode;
  color: "blue" | "green" | "purple" | "red";
  loading?: boolean;
}

/* ================= COLORS ================= */

const colorMap = {
  blue: {
    icon: "text-blue-600",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "from-blue-500/20",
  },

  green: {
    icon: "text-emerald-600",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "from-emerald-500/20",
  },

  purple: {
    icon: "text-violet-600",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    glow: "from-violet-500/20",
  },

  red: {
    icon: "text-rose-600",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    glow: "from-rose-500/20",
  },
};

export default function StatCard({
  titleKey,
  value,
  icon,
  color,
  loading = false,
}: StatCardProps) {
  const t = useDictionary();

  const styles = colorMap[color];

  const [displayValue, setDisplayValue] =
    useState(0);

  /* ================= COUNT ANIMATION ================= */

  useEffect(() => {
    if (loading) return;

    let start = 0;

    const duration = 800;

    const increment = Math.max(
      1,
      Math.floor(value / (duration / 16))
    );

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, loading]);

  /* ================= UI ================= */

  return (
    <div
      className={`
        relative overflow-hidden
        rounded-3xl
        border ${styles.border}
        bg-white/70 dark:bg-zinc-900/60
        backdrop-blur-xl
        p-6
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
      `}
    >
      {/* Glow Effect */}
      <div
        className={`
          absolute top-0 right-0
          w-32 h-32
          rounded-full blur-3xl opacity-60
          bg-linear-to-br ${styles.glow} to-transparent
        `}
      />

      {/* Loading */}
      {loading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-4 w-28 rounded-full bg-zinc-200 dark:bg-zinc-800" />

          <div className="h-10 w-20 rounded-xl bg-zinc-200 dark:bg-zinc-800" />

          <div className="h-12 w-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
        </div>
      ) : (
        <div className="relative z-10">
          {/* TOP */}
          <div className="flex items-start justify-between">
            {/* LEFT */}
            <div className="space-y-3">
              {/* TITLE */}
              <p
                className="
                  text-sm font-medium
                  text-zinc-500 dark:text-zinc-400
                "
              >
                {t(titleKey)}
              </p>

              {/* VALUE */}
              <div className="flex items-end gap-2">
                <h2
                  className="
                    text-3xl md:text-4xl
                    font-bold tracking-tight
                    text-zinc-900 dark:text-white
                    tabular-nums
                  "
                >
                  {displayValue.toLocaleString()}
                </h2>

                {/* Trend */}
                <div
                  className="
                    mb-1
                    flex items-center gap-1
                    rounded-full
                    bg-emerald-500/10
                    px-2 py-1
                    text-[11px]
                    font-medium
                    text-emerald-600
                  "
                >
                  <TrendingUp size={12} />
                  Active
                </div>
              </div>
            </div>

            {/* ICON */}
            <div
              className={`
                flex items-center justify-center
                w-14 h-14
                rounded-2xl
                ${styles.bg}
                ${styles.icon}
                shadow-sm
              `}
            >
              <div className="scale-110">
                {icon}
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="mt-6">
            <div
              className="
                h-1.5
                overflow-hidden
                rounded-full
                bg-zinc-100 dark:bg-zinc-800
              "
            >
              <div
                className={`
                  h-full rounded-full
                  bg-linear-to-r
                  ${styles.glow}
                  to-transparent
                `}
                style={{
                  width: "75%",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}