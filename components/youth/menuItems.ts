// components/youth/menuItems.ts
import {
  Home,
  Users,
  Briefcase,
  GraduationCap,
  FileQuestion,
  Bookmark,
  Settings,
} from "lucide-react";

export const youthMenuItems = [
  {
    title: "MAIN",
    items: [
      { label: "Dashboard", 
        href: "/youth", 
        icon: Home 
    },
      { label: "Fursa", 
        href: "/youth/opportunities", 
        icon: Briefcase 
    },
      { label: "Fursa Zilizohifadhiwa",
         href: "/youth/saved-opportunities", 
         icon: Bookmark 
        },
      { label: "Mafunzo/Tangazo",
         href: "/youth/trainings", 
         icon: GraduationCap 
        },
      { label: "Maswali", 
        href: "/youth/questions", 
        icon: FileQuestion 
    },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      { label: "Wasifu", 
        href: "/youth/profile", 
        icon: Users 
    },
    {
        label: "Mpangilio",
        href: "/youth/settings",
        icon: Settings,
      },
    ],
  },
];
