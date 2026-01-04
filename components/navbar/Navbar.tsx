"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Menu as MenuIcon,
  MessageCircle,
  ChevronDown,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";

type NavbarProps = {
  user: {
    fullName: string;
    Role: { name: string };
    image?: string | null;
  };
};

export default function Navbar({ user }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();

  // 🔔 Fetch unread messages count
  useEffect(() => {
    const loadCount = async () => {
      try {
        const res = await fetch("/api/admin/notifications/count");
        const data = await res.json();
        setUnreadCount(data.count || 0);
      } catch (err) {
        console.error("Failed to load notifications count");
      }
    };

    loadCount();
  }, []);

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
          Admin Dashboard
        </h1>
      </div>

      {/* CENTER */}
      {/* <div className="hidden md:flex items-center gap-2 px-3 py-2 border rounded-lg bg-gray-50">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent outline-none text-sm w-64"
        />
      </div> */}

      {/* RIGHT */}
      <div className="flex items-center gap-5 relative">

        {/* 🔔 MESSAGE ICON */}
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
            <span className="text-sm font-medium text-gray-800">
              {user.fullName}
            </span>
            <span className="text-xs text-gray-500 text-right">
              {user.Role.name}
            </span>
          </div>

          <ChevronDown size={16} className="text-gray-400 hidden md:block" />
        </div>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 top-12 w-44 bg-white border rounded-lg shadow-lg text-sm z-50">
            <button className="w-full px-4 py-2 hover:bg-gray-100">
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
