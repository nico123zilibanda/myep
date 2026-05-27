
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

import {
  Sparkles,
  ChevronRight,
} from "lucide-react";

import { youthMenuItems } from "./menuItems";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Badge } from "@/components/ui/badge";

/* ================= TYPES ================= */

interface YouthMenuProps {
  isCollapsed: boolean;
  onItemClick?: () => void;
}

/* ================= COMPONENT ================= */

export default function YouthMenu({
  isCollapsed,
  onItemClick,
}: YouthMenuProps) {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={80}>
      <div
        className={clsx(
          "flex h-full flex-col",
          isCollapsed ? "px-2" : "px-3",
        )}
      >
        {/* ================= NAVIGATION ================= */}

        <nav className="flex-1 space-y-8">
          {youthMenuItems.map((section) => (
            <div key={section.title}>
              {/* SECTION TITLE */}
              {!isCollapsed && (
                <div className="mb-3 flex items-center gap-2 px-3">
                  <div className="h-px flex-1 bg-linear-to-r from-border to-transparent" />

                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.22em]
                      text-muted-foreground/80
                    "
                  >
                    {section.title}
                  </p>

                  <div className="h-px flex-1 bg-linear-to-l from-border to-transparent" />
                </div>
              )}

              {/* ITEMS */}
              <div className="space-y-1.5">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                  const navItem = (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onItemClick}
                      title={
                        isCollapsed
                          ? item.label
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
                      {/* ACTIVE GLOW */}
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

                      {/* HOVER EFFECT */}
                      {!isActive && (
                        <div
                          className="
                            absolute inset-0

                            opacity-0
                            transition-opacity duration-300

                            group-hover:opacity-100

                            bg-linear-to-r
                            from-primary/4
                            to-indigo-500/3
                          "
                        />
                      )}

                      {/* ICON */}
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

                      {/* LABEL */}
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
                              {item.label}
                            </p>
                          </div>

                          {/* OPTIONAL BADGE */}
                          {"badge" in item &&
                            item.badge && (
                              <Badge
                                variant="secondary"
                                className="
                                  relative z-10

                                  rounded-full

                                  px-2 py-0.5

                                  text-[10px]
                                "
                              >
                                {item.badge}
                              </Badge>
                            )}

                          {/* ARROW */}
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

                  /* ================= COLLAPSED ================= */

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
                          "
                        >
                          {item.label}
                        </TooltipContent>
                      </Tooltip>
                    );
                  }

                  /* ================= NORMAL ================= */

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
              {/* BACKGROUND DECOR */}
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

              <div className="relative z-10">
                {/* BADGE */}
                <div
                  className="
                    mb-4 inline-flex items-center gap-2

                    rounded-full border

                    border-primary/10

                    bg-primary/8

                    px-3 py-1

                    text-xs font-semibold
                    text-primary
                  "
                >
                  <Sparkles className="size-3.5" />

                  Smart Youth Platform
                </div>

                {/* TITLE */}
                <h3
                  className="
                    text-sm font-bold
                    tracking-tight
                    text-foreground
                  "
                >
                  Mlele DC Fursa Portal
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
                  © {new Date().getFullYear()} Mlele DC
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

