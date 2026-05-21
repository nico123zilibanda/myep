
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  Sparkles,
} from "lucide-react";
import clsx from "clsx";

import { menuItems } from "./menuItems";
import { useDictionary } from "@/lib/i18n/useDictionary";

interface MenuProps {
  isCollapsed: boolean;
  onItemClick?: () => void;
}

export default function Menu({
  isCollapsed,
  onItemClick,
}: MenuProps) {
  const pathname = usePathname();
  const t = useDictionary();

  return (
    <div
      className={clsx(
        "flex h-full flex-col",
        isCollapsed ? "px-2" : "px-3",
      )}
    >
      {/* TOP SECTION */}
      <div className="flex-1 overflow-y-auto pb-6">
        <nav className="space-y-8">
          {menuItems.map((section) => (
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
                    {t(section.title)}
                  </p>

                  <div className="h-px flex-1 bg-linear-to-l from-border to-transparent" />
                </div>
              )}

              {/* MENU ITEMS */}
              <div className="space-y-1.5">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onItemClick}
                      title={isCollapsed ? t(item.label) : undefined}
                      className={clsx(
                        `
                        group relative flex items-center overflow-hidden
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
                            shadow-lg shadow-primary/20
                          `
                          : `
                            border-transparent
                            text-muted-foreground
                            hover:border-border
                            hover:bg-muted/60
                            hover:text-foreground
                            dark:hover:bg-zinc-900/80
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

                      {/* HOVER BG */}
                      {!isActive && (
                        <div
                          className="
                            absolute inset-0
                            opacity-0 transition-opacity duration-300
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
                          relative z-10 flex items-center justify-center
                          rounded-xl transition-all duration-300
                          `,
                          isCollapsed
                            ? "size-10"
                            : "size-9",
                          isActive
                            ? "bg-white/10"
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
                            "transition-transform duration-300",
                            !isActive && "group-hover:scale-110",
                          )}
                        />
                      </div>

                      {/* LABEL */}
                      {!isCollapsed && (
                        <>
                          <div className="relative z-10 min-w-0 flex-1">
                            <p
                              className={clsx(
                                "truncate text-sm font-semibold",
                                isActive
                                  ? "text-white"
                                  : "text-foreground",
                              )}
                            >
                              {t(item.label)}
                            </p>
                          </div>

                          <ChevronRight
                            size={16}
                            className={clsx(
                              `
                              relative z-10 transition-all duration-300
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
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* FOOTER */}
      {!isCollapsed && (
        <div className="px-2 pb-3">
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
                bg-primary/10 blur-2xl
              "
            />

            <div
              className="
                absolute -bottom-8 -left-6
                size-24 rounded-full
                bg-indigo-500/10 blur-3xl
              "
            />

            <div className="relative z-10">
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
                Smart Platform
              </div>

              <h3 className="text-sm font-bold tracking-tight text-foreground">
                Mlele District Council
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Digital opportunity management system designed for youth
                empowerment, learning resources, and employment growth.
              </p>

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
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />

                System running normally
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

