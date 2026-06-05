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
                  <div className="h-px flex-1 bg-linear-to-r from-border to-transparent" />

                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.24em]
                      text-muted-foreground/80
                    "
                  >
                    {t(section.title)}
                  </p>

                  <div className="h-px flex-1 bg-linear-to-l from-border to-transparent" />
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

                            bg-linear-to-r
                            from-primary
                            via-primary
                            to-indigo-600

                            text-primary-foreground

                            shadow-lg
                            shadow-primary/20
                          `
                          : `
                            border-transparent

                            text-muted-foreground

                            hover:border-border
                            hover:bg-muted/60
                            hover:text-foreground

                            dark:hover:bg-zinc-900/70
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
                            from-primary/5
                            via-primary/3
                            to-indigo-500/5
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
                              bg-white/10
                            `
                            : `
                              bg-muted/70

                              group-hover:bg-background

                              dark:bg-zinc-800/80
                              dark:group-hover:bg-zinc-800
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

                border-primary/10

                bg-linear-to-br
                from-background
                via-muted/40
                to-primary/5

                p-5

                shadow-sm
              "
            >
              {/* ================= DECORATIONS ================= */}

              <div
                className="
                  absolute -right-6 -top-6

                  size-20 rounded-full

                  bg-primary/10

                  blur-2xl
                "
              />

              <div
                className="
                  absolute -bottom-8 -left-6

                  size-24 rounded-full

                  bg-indigo-500/10

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

                    border-primary/10

                    bg-primary/10

                    px-3 py-1

                    text-xs font-semibold
                    text-primary
                  "
                >
                  <Sparkles className="size-3.5" />

                  Mlele DC Fursa Portal
                </div>

                {/* TITLE */}

                <h3
                  className="
                    text-sm font-bold
                    tracking-tight
                    text-foreground
                  "
                >
                  Mfumo wa Halmashauri ya Wilaya ya
                  Mlele
                </h3>

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-2

                    text-xs
                    leading-relaxed

                    text-muted-foreground
                  "
                >
                   Mfumo wa kisasa wa vijana kwa ajili ya
                  fursa, mafunzo, ajira, na maendeleo ya
                  kijamii ndani ya Wilaya ya Mlele.
                </p>

                {/* STATUS */}

                <div
                  className="
                    mt-4 flex items-center gap-2

                    rounded-2xl border

                    border-border/60

                    bg-background/70

                    px-3 py-2

                    text-xs text-muted-foreground

                    backdrop-blur-sm
                  "
                >
                  <div
                    className="
                      size-2 rounded-full

                      bg-emerald-500

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
                    text-muted-foreground
                  "
                >
                  © {new Date().getFullYear()} Mlele
                  DC
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}