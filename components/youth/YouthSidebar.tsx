"use client";

import Link from "next/link";
import { Home, User, Briefcase, GraduationCap, FileQuestion, Bookmark } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { name: "Dashboard", href: "/youth", icon: Home },
  { name: "Opportunities", href: "/youth/opportunities", icon: Briefcase },
  { name: "Saved Opportunities", href: "/youth/saved-opportunities", icon: Bookmark },
  { name: "Trainings", href: "/youth/trainings", icon: GraduationCap },
  { name: "Questions", href: "/youth/questions", icon: FileQuestion },
  { name: "Profile", href: "/youth/profile", icon: User },
];

export default function YouthSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shrink-0 transition-all duration-300 flex flex-col`}
    >
      {/* Logo / Portal Name */}
      <div className="flex items-center justify-between px-5 py-4">
        <h1 className={`text-2xl font-bold text-blue-600 dark:text-blue-400 ${isCollapsed ? "hidden" : "block"}`}>
          Youth Portal
        </h1>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? "➤" : "⬅"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`
                flex items-center gap-3 px-4 py-2 rounded-lg transition
                ${active
                  ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                }
              `}
            >
              <Icon size={18} />
              {!isCollapsed && <span className="truncate">{link.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-xs text-gray-400 dark:text-gray-500 px-4 py-3">
        {!isCollapsed && `© ${new Date().getFullYear()} Youth Portal`}
      </div>
    </aside>
  );
}
