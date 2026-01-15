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
        label: "Categories",
        href: "/admin/categories",
        icon: Briefcase,
      },
      {
        label: "Opportunities",
        href: "/admin/opportunities",
        icon: Briefcase,
      },
      {
        label: "Trainings",
        href: "/admin/trainings",
        icon: GraduationCap,
      },
      {
        label: "Questions",
        href: "/admin/questions",
        icon: HelpCircle,
      },
            {
        label: "Youth",
        href: "/admin/youth",
        icon: Users,
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
