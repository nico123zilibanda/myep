"use client";

import { useRouter } from "next/navigation";
import { Menu as MenuIcon, MessageCircle, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDictionary } from "@/lib/i18n/useDictionary";

type NavbarProps = {
  user: {
    id: number;
    email: string;
    fullName: string;
    role: "ADMIN" | "YOUTH";
    image?: string | null; // unused, we will show initials
  };
  onMenuClick?: () => void;
};

export default function Navbar({ user, onMenuClick }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();
  const t = useDictionary();

  // Function to get initials from fullName
  const getInitials = (name: string) => {
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  // Dynamic color based on user name
  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 60%, 50%)`;
  };
  const userColor = stringToColor(user.fullName);

  useEffect(() => {
    if (user.role !== "ADMIN") return;

    const loadCount = async () => {
      try {
        const res = await fetch("/api/admin/notifications/count", {
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json();
        setUnreadCount(Number(data.count) || 0);
      } catch {}
    };

    loadCount();
  }, [user.role]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      toast.success(data.message || "Umetoka kwenye mfumo");
      router.replace("/login");
    } catch (err) {
      toast.error("Imeshindikana kutoka. Jaribu tena.");
    }
  };

  return (
    <header
      className="
        sticky top-0 z-40
        h-16 w-full
        bg-(--card)/80
        backdrop-blur
        border-b border-(--border)
        flex items-center justify-between
        px-4 md:px-6
        transition-colors
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* MOBILE MENU BUTTON */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-(--foreground) hover:opacity-80 transition"
        >
          <MenuIcon size={22} />
        </button>

        <h1 className="text-lg font-semibold text-(--foreground) hidden md:block">
         {t("ADMIN_DASHBOARD")}
         </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 relative">
        {/* Notifications */}
        {user.role === "ADMIN" && (
          <button
            onClick={() => router.push("/admin/questions")}
            className="relative p-2 rounded-xl text-(--foreground) hover:opacity-80 transition"
          >
            <MessageCircle size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        )}

        {/* User avatar + initials */}
        <div
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 cursor-pointer rounded-xl px-2 py-1.5 hover:opacity-80 transition"
        >
          {/* Avatar */}
          <div
            className="
              w-10 h-10
              rounded-full
              flex items-center justify-center
              text-white font-medium text-sm
              border transition-transform duration-200
              hover:scale-105
            "
            style={{ backgroundColor: userColor, borderColor: "var(--border)" }}
          >
            {getInitials(user.fullName)}
          </div>

          {/* Name + role */}
          <div className="hidden md:flex flex-col leading-tight">
            <span className="text-sm font-medium text-(--foreground)">
              {user.fullName}
            </span>
            <span className="text-xs opacity-70">{user.role}</span>
          </div>

          <ChevronDown
            size={16}
            className="hidden md:block opacity-60 text-(--foreground)"
          />
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-14 w-44 bg-(--card) border border-(--border) rounded-xl shadow-xl text-sm z-50 overflow-hidden animate-in fade-in zoom-in-95 transition-colors">
            <button
              onClick={() => {
                setOpen(false);
                router.push("/profile");
              }}
              className="w-full px-4 py-2 text-left hover:opacity-80 transition"
            >
              {t("PROFILE")}
            </button>

            <div className="h-px bg-(--border)" />

            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-red-600 hover:opacity-80 transition"
            >
              {t("LOGOUT")}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
