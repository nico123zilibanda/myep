import {
  LayoutDashboard,
  Users,
  Briefcase,
  GraduationCap,
  HelpCircle,
  User,
  Settings,
  LogOut,
} from "lucide-react";

export const menuItems = [
  {
    title: "MAIN",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        label: "Makundi Ya Fursa",
        href: "/admin/categories",
        icon: Briefcase,
      },
      {
        label: "Vijana",
        href: "/admin/youth",
        icon: Users,
      },
      {
        label: "Fursa",
        href: "/admin/opportunities",
        icon: Briefcase,
      },
      {
        label: "Mafunzo",
        href: "/admin/trainings",
        icon: GraduationCap,
      },
      {
        label: "Maswali",
        href: "/admin/questions",
        icon: HelpCircle,
      },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      {
        label: "Profile",
        href: "/admin/profile",
        icon: User,
      },
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];
