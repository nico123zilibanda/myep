"use client";

import { LucideIcon, ArrowUpRight } from "lucide-react";

import { useDictionary } from "@/lib/i18n/useDictionary";
import { MessageKey } from "@/lib/messages";

interface QuickActionProps {
  titleKey: MessageKey;
  descriptionKey: MessageKey;
  icon: LucideIcon;
  color: "blue" | "green" | "purple" | "red";
  onClick: () => void;
}

/* ================= COLORS ================= */

const colorMap = {
  blue: {
    icon: "text-blue-600",
    bg: "bg-blue-500/10",
    glow: "from-blue-500/20",
    hover:
      "group-hover:border-blue-200 dark:group-hover:border-blue-800",
  },

  green: {
    icon: "text-emerald-600",
    bg: "bg-emerald-500/10",
    glow: "from-emerald-500/20",
    hover:
      "group-hover:border-emerald-200 dark:group-hover:border-emerald-800",
  },

  purple: {
    icon: "text-violet-600",
    bg: "bg-violet-500/10",
    glow: "from-violet-500/20",
    hover:
      "group-hover:border-violet-200 dark:group-hover:border-violet-800",
  },

  red: {
    icon: "text-rose-600",
    bg: "bg-rose-500/10",
    glow: "from-rose-500/20",
    hover:
      "group-hover:border-rose-200 dark:group-hover:border-rose-800",
  },
};

export default function QuickAction({
  titleKey,
  descriptionKey,
  icon: Icon,
  color,
  onClick,
}: QuickActionProps) {
  const t = useDictionary();

  const styles = colorMap[color];

  return (
    <button
      onClick={onClick}
      className={`
        group relative overflow-hidden
        rounded-3xl
        border border-zinc-200/70 dark:border-zinc-800/80
        ${styles.hover}
        bg-white/70 dark:bg-zinc-900/60
        backdrop-blur-xl
        p-6
        text-left
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500/30
      `}
    >
      {/* Glow Background */}
      <div
        className={`
          absolute top-0 right-0
          w-40 h-40
          rounded-full blur-3xl opacity-0
          transition-opacity duration-500
          bg-linear-to-br ${styles.glow} to-transparent
          group-hover:opacity-100
        `}
      />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* TOP */}
        <div className="flex items-start justify-between">
          {/* ICON */}
          <div
            className={`
              flex items-center justify-center
              w-14 h-14
              rounded-2xl
              ${styles.bg}
              ${styles.icon}
              shadow-sm
              transition-transform duration-300
              group-hover:scale-110
              group-hover:rotate-3
            `}
          >
            <Icon className="w-6 h-6" />
          </div>

          {/* ARROW */}
          <div
            className="
              flex items-center justify-center
              w-10 h-10
              rounded-xl
              bg-zinc-100 dark:bg-zinc-800
              text-zinc-500
              transition-all duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1
              group-hover:text-zinc-900
              dark:group-hover:text-white
            "
          >
            <ArrowUpRight size={18} />
          </div>
        </div>

        {/* TEXT */}
        <div className="mt-6">
          <h3
            className="
              text-lg font-semibold
              text-zinc-900 dark:text-white
              transition-colors
            "
          >
            {t(titleKey)}
          </h3>

          <p
            className="
              mt-2
              text-sm leading-relaxed
              text-zinc-500 dark:text-zinc-400
            "
          >
            {t(descriptionKey)}
          </p>
        </div>

        {/* BOTTOM ACTION */}
        <div
          className="
            mt-6
            flex items-center gap-2
            text-sm font-medium
            text-zinc-500
            transition-all duration-300
            group-hover:text-zinc-900
            dark:group-hover:text-white
          "
        >
          Open Action

          <ArrowUpRight
            size={15}
            className="
              transition-transform duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
          />
        </div>
      </div>
    </button>
  );
}