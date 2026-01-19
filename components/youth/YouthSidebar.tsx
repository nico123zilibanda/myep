"use client";

import Link from "next/link";
import {
  Home,
  User,
  Briefcase,
  GraduationCap,
  FileQuestion,
  Bookmark,
  ChevronLeft,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

const links = [
  { name: "Dashboard", href: "/youth", icon: Home },
  { name: "Opportunities", href: "/youth/opportunities", icon: Briefcase },
  { name: "Saved Opportunities", href: "/youth/saved-opportunities", icon: Bookmark },
  { name: "Trainings", href: "/youth/trainings", icon: GraduationCap },
  { name: "Questions", href: "/youth/questions", icon: FileQuestion },
  { name: "Profile", href: "/youth/profile", icon: User },
];

export default function YouthSidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const sidebarContent = (
    <aside
      className={clsx(
        "h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b">
        {!collapsed && (
          <span className="font-bold text-blue-600 dark:text-blue-400">
            Youth Portal
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ChevronLeft
            size={16}
            className={clsx("transition-transform", collapsed && "rotate-180")}
          />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {links.map((l) => {
          const Icon = l.icon;
          const active = pathname === l.href;

          return (
            <Link
              key={l.name}
              href={l.href}
              onClick={onClose}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition",
                collapsed && "justify-center",
                active
                  ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              <Icon size={18} />
              {!collapsed && <span>{l.name}</span>}
            </Link>
          );
        })}
      </nav>
      {/* Footer */}
        {!collapsed && (
          <div className="mt-auto px-3 py-4 text-xs text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-800">
            © {new Date().getFullYear()} Youth Portal
          </div>
        )}
    </aside>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block">{sidebarContent}</div>

      {/* Mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <div className="relative z-50 h-full w-64">{sidebarContent}</div>
        </div>
      )}
    </>
  );
}
