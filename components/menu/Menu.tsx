"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "./menuItems";
import clsx from "clsx";

export default function Menu() {
  const pathname = usePathname();

  return (
    <nav className="mt-6 px-2 text-sm">
      {menuItems.map(section => (
        <div key={section.title} className="mb-6">
          
          {/* Section title */}
          <p className="hidden lg:block text-xs text-gray-400 uppercase px-3 mb-2">
            {section.title}
          </p>

          {/* Links */}
          <div className="flex flex-col gap-1">
            {section.items.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition",
                    "hover:bg-blue-100 hover:text-blue-700",
                    isActive
                      ? "bg-blue-600 text-white hover:bg-blue-600"
                      : "text-gray-600"
                  )}
                >
                  <Icon size={18} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
