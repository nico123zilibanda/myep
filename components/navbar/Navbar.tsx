"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu as MenuIcon, MessageCircle, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

type NavbarProps = {
  user: {
    id: string;
    email: string;
    fullName: string;
    role: "ADMIN" | "YOUTH";
    image?: string | null;
  };
  onMenuClick?: () => void; // ✅ ADDED
};

export default function Navbar({ user, onMenuClick }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();

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
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    router.replace("/login");
  };

  return (
    <header
      className="
        sticky top-0 z-40
        h-16 w-full
        bg-white/80 dark:bg-gray-900/80
        backdrop-blur
        border-b border-gray-200 dark:border-gray-800
        flex items-center justify-between
        px-4 md:px-6
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* MOBILE MENU BUTTON */}
        <button
          onClick={onMenuClick}
          className="
            lg:hidden
            p-2 rounded-lg
            text-gray-600 dark:text-gray-300
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition
          "
        >
          <MenuIcon size={22} />
        </button>

        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100 hidden md:block">
          Admin Dashboard
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 relative">
        {/* Notifications */}
        {user.role === "ADMIN" && (
          <button
            onClick={() => router.push("/admin/questions")}
            className="
              relative p-2 rounded-xl
              text-gray-600 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition
            "
          >
            <MessageCircle size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        )}

        {/* User */}
        <div
          onClick={() => setOpen(v => !v)}
          className="
            flex items-center gap-2 cursor-pointer
            rounded-xl px-2 py-1.5
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition
          "
        >
          <Image
            src={user.image || "/avatar.png"}
            alt="avatar"
            width={34}
            height={34}
            className="rounded-full border border-gray-300 dark:border-gray-700"
          />

          <div className="hidden md:flex flex-col leading-tight">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
              {user.fullName}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {user.role}
            </span>
          </div>

          <ChevronDown size={16} className="text-gray-400 hidden md:block" />
        </div>

        {/* Dropdown */}
        {open && (
          <div
            className="
              absolute right-0 top-14 w-44
              bg-white dark:bg-gray-900
              border border-gray-200 dark:border-gray-800
              rounded-xl shadow-xl
              text-sm z-50
              overflow-hidden
              animate-in fade-in zoom-in-95
            "
          >
            <button
              onClick={() => {
                setOpen(false);
                router.push("/profile");
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Profile
            </button>

            <div className="h-px bg-gray-200 dark:bg-gray-800" />

            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
