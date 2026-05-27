import {
  Bookmark,
  Briefcase,
  FileQuestion,
  GraduationCap,
  Home,
  Settings,
  UserCircle2,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

/* ================= TYPES ================= */

export interface YouthMenuItem {
  label: string;

  href: string;

  icon: LucideIcon;

  badge?: string | number;
}

export interface YouthMenuSection {
  title: string;

  items: YouthMenuItem[];
}

/* ================= MENU ================= */

export const youthMenuItems: YouthMenuSection[] =
  [
    /* ================= MAIN ================= */

    {
      title: "KUU",

      items: [
        {
          label: "Dashibodi",

          href: "/youth",

          icon: Home,
        },

        {
          label: "Fursa",

          href:
            "/youth/opportunities",

          icon: Briefcase,
        },

        {
          label:
            "Fursa Zilizohifadhiwa",

          href:
            "/youth/saved-opportunities",

          icon: Bookmark,
        },

        {
          label:
            "Mafunzo na Matangazo",

          href: "/youth/trainings",

          icon: GraduationCap,
        },

        {
          label: "Maswali",

          href: "/youth/questions",

          icon: FileQuestion,
        },
      ],
    },

    /* ================= ACCOUNT ================= */

    {
      title: "AKAUNTI",

      items: [
        {
          label: "Wasifu Wangu",

          href: "/youth/profile",

          icon: UserCircle2,
        },

        {
          label: "Mipangilio",

          href: "/youth/settings",

          icon: Settings,
        },
      ],
    },
  ];