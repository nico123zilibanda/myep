"use client";

import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface YouthTopbarProps {
  user: {
    id: number;
    fullName: string;
    email: string;
    role: "YOUTH" | "ADMIN";
    image?: string | null;
  };
  onMenuClick: () => void;
  enableDropdown?: boolean; // 👈 optional control
}

export default function YouthTopbar({
  user,
  onMenuClick,
  enableDropdown = true,
}: YouthTopbarProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initials
  const getInitials = (name: string) => {
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  // Avatar color generator
  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 60%, 50%)`;
  };

  const userColor = stringToColor(user.fullName);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () =>
      document.removeEventListener("keydown", handleEsc);
  }, []);

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
      className="
        sticky top-0 z-40
        h-16 w-full
        bg-(--card)/80
        backdrop-blur-md
        border-b border-(--border)
        flex items-center justify-between
        px-4 sm:px-6
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-(--border)/40 transition"
        >
          <MenuIcon size={22} />
        </button>

        <h1 className="text-lg font-semibold hidden md:block text-(--foreground)">
          Youth Dashboard
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 relative" ref={dropdownRef}>
        <button
          disabled={!enableDropdown}
          onClick={() => enableDropdown && setOpen((v) => !v)}
          className="
            flex items-center gap-2
            rounded-xl px-2 py-1.5
            hover:bg-(--border)/40
            transition cursor-pointer
          "
          aria-expanded={open}
          aria-haspopup="true"
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
            style={{ backgroundColor: userColor }}
          >
            {getInitials(user.fullName)}
          </div>

          {/* Name + role */}
          <div className="hidden md:flex flex-col leading-tight text-left">
            <span className="text-sm font-medium text-(--foreground)">
              {user.fullName}
            </span>
            <span className="text-xs opacity-70">
              {user.role}
            </span>
          </div>

          {/* Chevron */}
          <ChevronDown
            size={16}
            className={`hidden md:block transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        {open && enableDropdown && (
          <div
            className="
              absolute right-0 top-14 w-48
              bg-white/80 dark:bg-zinc-900/80
              backdrop-blur-md
              border border-zinc-200 dark:border-zinc-800
              rounded-xl shadow-2xl
              text-sm z-50 overflow-hidden
              animate-in fade-in zoom-in-95 slide-in-from-top-2
            "
          >
            <button
              onClick={() => {
                setOpen(false);
                router.push("/youth/profile");
              }}
              className="w-full px-4 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              Profile
            </button>

            <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

            <button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}