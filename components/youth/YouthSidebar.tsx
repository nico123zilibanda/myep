"use client";

import Link from "next/link";
import { Home, User, Briefcase, GraduationCap,FileQuestion } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/youth", icon: Home },
  { name: "Opportunities", href: "/youth/opportunities", icon: Briefcase },
  { name: "Saved Opportunities", href: "/youth/saved-opportunities",icon: Briefcase },
  { name: "Trainings", href: "/youth/trainings", icon: GraduationCap },
  { name: "Questions", href: "/youth/questions", icon: FileQuestion },
  { name: "Profile", href: "/youth/profile", icon: User },
];

export default function YouthSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r p-5">
      <h1 className="text-xl font-bold text-blue-600 mb-8">
        Youth Portal
      </h1>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
                ${active
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <Icon size={18} />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
