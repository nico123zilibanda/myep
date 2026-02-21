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
        label: "DASHBOARD",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        label: "CATEGORY",
        href: "/admin/categories",
        icon: Briefcase,
      },
      {
        label: "OPPORTUNITY",
        href: "/admin/opportunities",
        icon: Briefcase,
      },
      {
        label: "TRAININGS",
        href: "/admin/trainings",
        icon: GraduationCap,
      },
      {
        label: "QUESTIONS",
        href: "/admin/questions",
        icon: HelpCircle,
      },
            {
        label: "YOUTH",
        href: "/admin/youth",
        icon: Users,
      },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      {
        label: "PROFILE",
        href: "/admin/profile",
        icon: User,
      },
      {
        label: "LOGS",
        href: "/admin/audit-logs",
        icon: Logs,
      },
      {
        label: "SETTINGS",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];
