import {
  LayoutDashboard,
  Users,
  Briefcase,
  GraduationCap,
  HelpCircle,
  User,
  Logs,
  Settings,
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
        label: "Kategoria",
        href: "/admin/categories",
        icon: Briefcase,
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
            {
        label: "Vijana",
        href: "/admin/youth",
        icon: Users,
      },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      {
        label: "Wasifu",
        href: "/admin/profile",
        icon: User,
      },
      {
        label: "Kumbukumbu",
        href: "/admin/audit-logs",
        icon: Logs,
      },
      {
        label: "Mpangilio",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];
