"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Menu as MenuIcon,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";

type NavbarProps = {
  user: {
    email: string;
    fullName: string; // Ensure fullName is included
    role: "ADMIN" | "YOUTH"; 
    image?: string | null;
  };
};

export default function Navbar({ user }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();

  // 🔔 Fetch unread messages count (admin only)
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
      } catch (err) {
        console.error("Failed to load notifications count", err);
      }
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
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button className="lg:hidden text-gray-600">
          <MenuIcon />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 hidden md:block">
          Dashboard
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5 relative">
        {/* 🔔 ADMIN ONLY */}
        {user.role === "ADMIN" && (
          <button
            onClick={() => router.push("/admin/questions")}
            className="relative text-gray-500 hover:text-gray-700"
          >
            <MessageCircle size={22} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        )}

        {/* USER */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <Image
            src={user.image || "/avatar.png"}
            alt="User"
            width={34}
            height={34}
            className="rounded-full border"
          />

          <div className="hidden md:flex flex-col leading-tight">            
            {/* Display the user's full name */}
            <span className="text-sm font-medium text-gray-800">
              {user.fullName} {/* Display full name */}
            </span>
            <span className="text-xs text-gray-500 text-right">
              {user.role}
            </span>
          </div>

          <ChevronDown size={16} className="text-gray-400 hidden md:block" />
        </div>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 top-12 w-44 bg-white border rounded-lg shadow-lg text-sm z-50">
            <button
              onClick={() => router.push("/profile")}
              className="w-full px-4 py-2 hover:bg-gray-100"
            >
              Profile
            </button>
            <hr />
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-red-500 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
