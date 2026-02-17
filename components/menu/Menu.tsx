"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "./menuItems";
import clsx from "clsx";

interface MenuProps {
  isCollapsed: boolean;
  onItemClick?: () => void;
}

export default function Menu({ isCollapsed, onItemClick }: MenuProps) {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        "flex flex-col h-full transition-all duration-300",
        isCollapsed ? "px-1" : "px-3"
      )}
    >
      {/* MENU */}
      <nav className="flex-1 text-sm space-y-6">
        {menuItems.map((section) => (
          <div key={section.title}>
            {/* SECTION TITLE */}
            {!isCollapsed && (
              <p className="px-3 mb-2 text-[11px] uppercase tracking-widest opacity-60">
                {section.title}
              </p>
            )}

            {/* LINKS */}
            <div className="flex flex-col gap-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onItemClick}
                    title={isCollapsed ? item.label : undefined}
                    className={clsx(
                      "group relative flex items-center rounded-xl px-3 py-2.5 transition-all duration-200",
                      isCollapsed ? "justify-center" : "gap-3",
                      isActive
                        ? "bg-blue-500/10 text-blue-600 font-medium"
                        : "opacity-80 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
                    )}
                  >
                    {/* ACTIVE INDICATOR */}
                    <span
                      className={clsx(
                        "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-blue-500 transition-all",
                        isActive && !isCollapsed
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />

                    {/* ICON */}
                    <Icon
                      size={18}
                      className={clsx(
                        "shrink-0 transition-colors",
                        isActive
                          ? "text-blue-600"
                          : "opacity-60 group-hover:opacity-100"
                      )}
                    />

                    {/* LABEL */}
                    {!isCollapsed && (
                      <span className="truncate">
                        {item.label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* FOOTER */}
      {!isCollapsed && (
        <div className="px-3 py-4 text-xs opacity-50">
          © {new Date().getFullYear()} Admin Panel
        </div>
      )}
    </div>
  );
}
