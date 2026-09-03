"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

import {
  ChevronRight,
  Sparkles,
} from "lucide-react";

import { menuItems } from "./menuItems";

import { useDictionary } from "@/lib/i18n/useDictionary";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Badge } from "@/components/ui/badge";

/* ================= TYPES ================= */

interface MenuProps {
  isCollapsed: boolean;
  onItemClick?: () => void;
}

/* ================= COMPONENT ================= */

export default function Menu({
  isCollapsed,
  onItemClick,
}: MenuProps) {
  const pathname = usePathname();

  const t = useDictionary();

  return (
    <TooltipProvider delayDuration={80}>
      <div
        className={clsx(
          "flex h-full flex-col",
          isCollapsed ? "px-2" : "px-3",
        )}
      >
        {/* ================= NAVIGATION ================= */}

        <nav className="flex-1 space-y-8 overflow-y-auto pb-6">
          {menuItems.map((section) => (
            <div key={section.title}>
              {/* ================= SECTION TITLE ================= */}

              {!isCollapsed && (
                <div className="mb-4 flex items-center gap-3 px-3">
                  <div className="h-px flex-1 bg-linear-to-r from-gov-mist to-transparent" />

                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.24em]
                      text-gov-ink-soft/70
                    "
                  >
                    {t(section.title)}
                  </p>

                  <div className="h-px flex-1 bg-linear-to-l from-gov-mist to-transparent" />
                </div>
              )}

              {/* ================= MENU ITEMS ================= */}

              <div className="space-y-1.5">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(
                      `${item.href}/`,
                    );

                  const navItem = (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onItemClick}
                      title={
                        isCollapsed
                          ? t(item.label)
                          : undefined
                      }
                      className={clsx(
                        `
                          group relative flex items-center
                          overflow-hidden

                          rounded-2xl border

                          transition-all duration-300 ease-out
                        `,
                        isCollapsed
                          ? `
                            justify-center
                            px-2 py-3
                          `
                          : `
                            gap-3 px-4 py-3.5
                          `,
                        isActive
                          ? `
                            border-primary/20

                            bg-gov-green-600

                            text-white

                            shadow-md
                            shadow-gov-green-900/15
                          `
                          : `
                            border-transparent

                            text-gov-ink-soft

                            hover:border-gov-mist
                            hover:bg-gov-mist
                            hover:text-gov-green-700

                            dark:text-gov-paper/70
                            dark:hover:bg-gov-green-900
                            dark:hover:text-gov-paper
                          `,
                      )}
                    >
                      {/* ================= ACTIVE EFFECT ================= */}

                      {isActive && (
                        <>
                          <div className="absolute inset-0 bg-white/5" />

                          <div
                            className="
                              absolute left-0 top-2 bottom-2

                              w-1 rounded-full

                              bg-white/80
                            "
                          />
                        </>
                      )}

                      {/* ================= HOVER EFFECT ================= */}

                      {!isActive && (
                        <div
                          className="
                            absolute inset-0

                            opacity-0
                            transition-opacity duration-300

                            group-hover:opacity-100

                            bg-linear-to-r
                            from-gov-green-50
                            via-gov-green-50/60
                            to-transparent
                          "
                        />
                      )}

                      {/* ================= ICON ================= */}

                      <div
                        className={clsx(
                          `
                            relative z-10

                            flex items-center justify-center

                            rounded-xl

                            transition-all duration-300
                          `,
                          isCollapsed
                            ? "size-10"
                            : "size-9",
                          isActive
                            ? `
                              bg-white/15
                            `
                            : `
                              bg-gov-mist

                              group-hover:bg-gov-paper

                              dark:bg-gov-green-900
                              dark:group-hover:bg-gov-green-800
                            `,
                        )}
                      >
                        <Icon
                          size={18}
                          className={clsx(
                            `
                              transition-transform duration-300
                            `,
                            !isActive &&
                              "group-hover:scale-110",
                          )}
                        />
                      </div>

                      {/* ================= LABEL ================= */}

                      {!isCollapsed && (
                        <>
                          <div className="relative z-10 min-w-0 flex-1">
                            <p
                              className={clsx(
                                `
                                  truncate text-sm font-semibold
                                `,
                                isActive
                                  ? "text-white"
                                  : "text-foreground",
                              )}
                            >
                              {t(item.label)}
                            </p>
                          </div>

                          {/* ================= BADGE ================= */}

                          {"badge" in item &&
                            item.badge &&
                            typeof item.badge ===
                              "string" && (
                              <Badge
                                variant="secondary"
                                className="
                                  relative z-10

                                  rounded-full

                                  border border-border/50

                                  bg-background/70

                                  px-2 py-0.5

                                  text-[10px]
                                  font-semibold
                                "
                              >
                                {item.badge}
                              </Badge>
                            )}

                          {/* ================= ARROW ================= */}

                          <ChevronRight
                            size={16}
                            className={clsx(
                              `
                                relative z-10

                                transition-all duration-300
                              `,
                              isActive
                                ? `
                                  translate-x-0
                                  opacity-100

                                  text-white
                                `
                                : `
                                  -translate-x-1
                                  opacity-0

                                  text-muted-foreground

                                  group-hover:translate-x-0
                                  group-hover:opacity-100
                                `,
                            )}
                          />
                        </>
                      )}
                    </Link>
                  );

                  /* ================= COLLAPSED MODE ================= */

                  if (isCollapsed) {
                    return (
                      <Tooltip key={item.label}>
                        <TooltipTrigger asChild>
                          {navItem}
                        </TooltipTrigger>

                        <TooltipContent
                          side="right"
                          className="
                            rounded-xl
                            border-border/70
                            bg-background/95
                            backdrop-blur-xl
                          "
                        >
                          {t(item.label)}
                        </TooltipContent>
                      </Tooltip>
                    );
                  }

                  /* ================= NORMAL MODE ================= */

                  return (
                    <div key={item.label}>
                      {navItem}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* ================= FOOTER ================= */}

        {!isCollapsed && (
          <div className="px-2 pb-3 pt-6">
            <div
              className="
                relative overflow-hidden

                rounded-3xl border

                border-gov-green-100

                bg-gov-green-50

                p-5

                shadow-sm
              "
            >
              {/* ================= DECORATIONS ================= */}

              <div
                className="
                  absolute -right-6 -top-6

                  size-20 rounded-full

                  bg-gov-green-200

                  blur-2xl
                "
              />

              <div
                className="
                  absolute -bottom-8 -left-6

                  size-24 rounded-full

                  bg-gov-gold-200

                  blur-3xl
                "
              />

              {/* ================= CONTENT ================= */}

              <div className="relative z-10">
                {/* BADGE */}

                <div
                  className="
                    mb-4 inline-flex items-center gap-2

                    rounded-full border

                    border-gov-green-200

                    bg-gov-paper

                    px-3 py-1

                    text-xs font-semibold
                    text-gov-green-700
                  "
                >
                  <Sparkles className="size-3.5" />

                  Mfumo Rasmi wa Serikali
                </div>

                {/* TITLE */}

                <h3
                  className="
                    text-sm font-bold
                    tracking-tight
                    text-gov-ink
                  "
                >
                  Halmashauri ya Wilaya ya Mlele
                </h3>

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-2

                    text-xs
                    leading-relaxed

                    text-gov-ink-soft/80
                  "
                >
                   Mfumo rasmi wa fursa, mafunzo,
                   ajira, na maendeleo ya kijamii
                   ndani ya Wilaya ya Mlele.
                </p>

                {/* STATUS */}

                <div
                  className="
                    mt-4 flex items-center gap-2

                    rounded-2xl border

                    border-gov-green-200

                    bg-gov-paper

                    px-3 py-2

                    text-xs text-gov-ink-soft
                  "
                >
                  <div
                    className="
                      size-2 rounded-full

                      bg-gov-green-500

                      animate-pulse
                    "
                  />

                  Mfumo unafanya kazi vizuri
                </div>

                {/* COPYRIGHT */}

                <p
                  className="
                    mt-4

                    text-[10px]

                    text-gov-ink-soft/70
                  "
                >
                  © {new Date().getFullYear()} Halmashauri ya Mlele
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}