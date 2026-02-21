"use client";

import { useState } from "react";
import { Menu as MenuIcon, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface YouthTopbarProps {
  user: {
    id: number;
    fullName: string;
    email: string;
    role: "YOUTH" | "ADMIN";
    image?: string | null; // unused, we show initials
  };
  onMenuClick: () => void;
}

export default function YouthTopbar({ user, onMenuClick }: YouthTopbarProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

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

  // Logout function
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      toast.success(data.message || "Umetoka kwenye mfumo");
      router.replace("/login");
    } catch {
      toast.error("Imeshindikana kutoka. Jaribu tena.");
    }
  };

  return (
    <header
      style={{ backgroundColor: "var(--card)" }}
      className="
        sticky top-0 z-40
        h-16 w-full
        backdrop-blur
        border-b border-(--border)
        flex items-center justify-between
        px-4 sm:px-6
        transition-colors
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* MOBILE MENU BUTTON */}
        <button
          onClick={onMenuClick}
          style={{ color: "var(--foreground)" }}
          className="lg:hidden p-2 rounded-lg hover:opacity-80 transition"
        >
          <MenuIcon size={22} />
        </button>

        <h1
          style={{ color: "var(--foreground)" }}
          className="text-lg font-semibold hidden md:block"
        >
          Youth Dashboard
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 relative">
        {/* User avatar + initials */}
        <div
          onClick={() => setOpen((v) => !v)}
          className="
            flex items-center gap-2 cursor-pointer
            rounded-xl px-2 py-1.5
            hover:opacity-80
            transition
          "
        >
          {/* Avatar with initials */}
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

          {/* Name and role */}
          <div className="hidden md:flex flex-col leading-tight">
            <span
              className="text-sm font-medium"
              style={{ color: "var(--foreground)" }}
            >
              {user.fullName}
            </span>
            <span className="text-xs opacity-70">{user.role}</span>
          </div>

          {/* Chevron */}
          <ChevronDown
            size={16}
            className="hidden md:block opacity-60"
            style={{ color: "var(--foreground)" }}
          />
        </div>

        {/* Dropdown menu */}
        {open && (
          <div
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
            className="
              absolute right-0 top-14 w-44 border rounded-xl shadow-xl
              text-sm z-50 overflow-hidden animate-in fade-in zoom-in-95
              transition-colors
            "
          >
            <button
              onClick={() => {
                setOpen(false);
                router.push("/youth/profile");
              }}
              className="w-full px-4 py-2 text-left hover:opacity-80 transition"
            >
              Profile
            </button>

            <div
              className="h-px"
              style={{ backgroundColor: "var(--border)" }}
            />

            <button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="w-full px-4 py-2 text-left text-red-600 hover:opacity-80 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
