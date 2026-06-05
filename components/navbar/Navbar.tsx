
"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Menu as MenuIcon,
  MessageCircle,
  ChevronDown,
  User,
  LogOut,
  Settings,
  BellDot,
  ShieldCheck,
} from "lucide-react";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import clsx from "clsx";

import { useDictionary } from "@/lib/i18n/useDictionary";

type NavbarProps = {
  user: {
    id: number;
    email: string;
    fullName: string;
    role: "ADMIN" | "YOUTH";
    image?: string | null;
  };

  onMenuClick?: () => void;
  enableDropdown?: boolean;
};

export default function Navbar({
  user,
  onMenuClick,
  enableDropdown = true,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const router = useRouter();
  const pathname = usePathname();
  const t = useDictionary();

  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ================= PAGE TITLE ================= */

  const pageTitle = useMemo(() => {
    if (pathname.includes("/opportunities")) {
      return t("OPPORTUNITY");
    }

    if (pathname.includes("/categories")) {
      return t("CATEGORIES");
    }

    if (pathname.includes("/trainings")) {
      return t("TRAININGS_TITLE");
    }

    if (pathname.includes("/youth")) {
      return t("YOUTH_TITLE");
    }

    if (pathname.includes("/audit-logs")) {
      return t("AUDIT_LOGS_TITLE");
    }

    if (pathname.includes("/profile")) {
      return t("PROFILE_PAGE_TITLE");
    }

    if (pathname.includes("/settings")) {
      return t("settings");
    }

    return t("ADMIN_DASHBOARD");
  }, [pathname, t]);

  /* ================= INITIALS ================= */

  const getInitials = (name: string) => {
    const names = name.trim().split(" ");

    if (names.length === 1) {
      return names[0][0].toUpperCase();
    }

    return (
      names[0][0] + names[names.length - 1][0]
    ).toUpperCase();
  };

  /* ================= AVATAR COLOR ================= */

  const stringToColor = (str: string) => {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    return `hsl(${hash % 360}, 70%, 50%)`;
  };

  const userColor = stringToColor(user.fullName);

  /* ================= LOAD NOTIFICATIONS ================= */

  useEffect(() => {
    if (user.role !== "ADMIN") return;

    const loadCount = async () => {
      try {
        const res = await fetch(
          "/api/admin/notifications/count",
          {
            credentials: "include",
            cache: "no-store",
          },
        );

        const data = await res.json();

        setUnreadCount(Number(data.count) || 0);
      } catch {}
    };

    loadCount();
  }, [user.role]);

  /* ================= CLOSE OUTSIDE ================= */

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  /* ================= ESC CLOSE ================= */

  useEffect(() => {
    const handleEsc = (
      e: KeyboardEvent,
    ) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEsc,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEsc,
      );
    };
  }, []);

  /* ================= LOGOUT ================= */

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      toast.success(
        data.message || "Logged out successfully",
      );

      router.replace("/login");
    } catch {
      toast.error("Failed to logout");
    }
  };

  return (
    <header
      className="
        sticky top-0 z-40
        h-20 w-full
        border-b border-border/60
        bg-background/75
        backdrop-blur-2xl
      "
    >
      <div
        className="
          flex h-full items-center justify-between
          px-4 sm:px-6 lg:px-8
        "
      >
        {/* ================= LEFT ================= */}

        <div className="flex items-center gap-4">
          {/* MOBILE MENU */}
          <button
            onClick={onMenuClick}
            className="
              lg:hidden
              flex size-11 items-center justify-center
              rounded-2xl
              border border-border
              bg-background/80
              hover:bg-muted
              transition-all duration-200
            "
          >
            <MenuIcon size={21} />
          </button>

          {/* PAGE INFO */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div
                className="
                  hidden sm:flex
                  size-8 items-center justify-center
                  rounded-xl
                  bg-primary/10
                  text-primary
                "
              >
                <ShieldCheck size={16} />
              </div>

              <h1
                className="
                  text-lg sm:text-xl
                  font-bold tracking-tight
                  text-foreground
                "
              >
                {pageTitle}
              </h1>
            </div>

            <p
              className="
                hidden sm:block
                mt-1 text-xs
                text-muted-foreground
              "
            >
              Karibu tena, {user.fullName}
            </p>
          </div>
        </div>

        {/* ================= RIGHT ================= */}

        <div
          className="relative flex items-center gap-3"
          ref={dropdownRef}
        >
          {/* NOTIFICATIONS */}
          {user.role === "ADMIN" && (
            <button
              onClick={() =>
                router.push("/admin/questions")
              }
              className="
                relative flex size-11 items-center justify-center
                rounded-2xl
                border border-border
                bg-background/80
                hover:bg-muted
                transition-all duration-200
              "
            >
              <MessageCircle size={19} />

              {unreadCount > 0 && (
                <>
                  <span
                    className="
                      absolute -right-1 -top-1
                      flex min-w-5 h-5 items-center justify-center
                      rounded-full
                      bg-red-500
                      px-1
                      text-[10px] font-bold text-white
                    "
                  >
                    {unreadCount}
                  </span>

                  <span
                    className="
                      absolute inset-0
                      rounded-2xl
                      animate-pulse
                      bg-red-500/10
                    "
                  />
                </>
              )}
            </button>
          )}

          {/* USER BUTTON */}
          <button
            disabled={!enableDropdown}
            onClick={() =>
              enableDropdown &&
              setOpen((prev) => !prev)
            }
            aria-expanded={open}
            aria-haspopup="true"
            className="
              group flex items-center gap-3
              rounded-2xl
              border border-transparent
              px-2 py-1.5
              transition-all duration-200
              hover:border-border
              hover:bg-muted/60
            "
          >
            {/* AVATAR */}
            <div className="relative">
              <div
                className="
                  flex size-11 items-center justify-center
                  rounded-2xl
                  text-sm font-bold text-white
                  ring-2 ring-background
                  shadow-lg
                  transition-transform duration-300
                  group-hover:scale-105
                "
                style={{
                  backgroundColor: userColor,
                }}
              >
                {getInitials(user.fullName)}
              </div>

              <div
                className="
                  absolute -bottom-0.5 -right-0.5
                  size-3 rounded-full
                  border-2 border-background
                  bg-emerald-500
                "
              />
            </div>

            {/* USER INFO */}
            <div
              className="
                hidden md:flex
                flex-col items-start leading-tight
              "
            >
              <span
                className="
                  max-w-35
                  truncate text-sm font-semibold
                  text-foreground
                "
              >
                {user.fullName}
              </span>

              <span
                className="
                  text-xs uppercase tracking-wide
                  text-muted-foreground
                "
              >
                Msimamizi
              </span>
            </div>

            {/* ICON */}
            <ChevronDown
              size={16}
              className={clsx(
                `
                hidden md:block
                text-muted-foreground
                transition-transform duration-200
                `,
                open && "rotate-180",
              )}
            />
          </button>

          {/* ================= DROPDOWN ================= */}

          {open && enableDropdown && (
            <div
              className="
                absolute right-0 top-16
                w-72 overflow-hidden
                rounded-3xl
                border border-border
                bg-background/95
                shadow-2xl
                backdrop-blur-2xl
                animate-in fade-in zoom-in-95 slide-in-from-top-2
              "
            >
              {/* TOP */}
              <div
                className="
                  relative overflow-hidden
                  border-b border-border
                  p-5
                "
              >
                <div
                  className="
                    absolute inset-0
                    bg-linear-to-br
                    from-primary/8
                    via-transparent
                    to-indigo-500/5
                  "
                />

                <div className="relative flex items-center gap-4">
                  <div
                    className="
                      flex size-14 items-center justify-center
                      rounded-2xl
                      text-base font-bold text-white
                      shadow-lg
                    "
                    style={{
                      backgroundColor: userColor,
                    }}
                  >
                    {getInitials(user.fullName)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3
                      className="
                        truncate text-sm font-bold
                        text-foreground
                      "
                    >
                      {user.fullName}
                    </h3>

                    <p
                      className="
                        mt-1 truncate
                        text-xs text-muted-foreground
                      "
                    >
                      {user.email}
                    </p>

                    <div
                      className="
                        mt-3 inline-flex items-center gap-2
                        rounded-full
                        border border-primary/20
                        bg-primary/8
                        px-2.5 py-1
                        text-[11px] font-semibold
                        text-primary
                      "
                    >
                      <BellDot size={12} />
                      Msimamizi
                    </div>
                  </div>
                </div>
              </div>

              {/* MENU ITEMS */}
              <div className="p-2">
                {/* PROFILE */}
                <button
                  onClick={() => {
                    setOpen(false);
                    router.push("/admin/profile");
                  }}
                  className="
                    flex w-full items-center gap-3
                    rounded-2xl
                    px-4 py-3
                    text-sm font-medium
                    text-foreground
                    transition-all duration-200
                    hover:bg-muted
                  "
                >
                  <div
                    className="
                      flex size-9 items-center justify-center
                      rounded-xl
                      bg-primary/10
                      text-primary
                    "
                  >
                    <User size={16} />
                  </div>

                  <div className="flex flex-col items-start">
                    <span>{t("PROFILE")}</span>

                    <span
                      className="
                        text-xs font-normal
                        text-muted-foreground
                      "
                    >
                      Dhibiti akaunti yako
                    </span>
                  </div>
                </button>

                {/* SETTINGS */}
                <button
                  onClick={() => {
                    setOpen(false);
                    router.push("/admin/settings");
                  }}
                  className="
                    flex w-full items-center gap-3
                    rounded-2xl
                    px-4 py-3
                    text-sm font-medium
                    text-foreground
                    transition-all duration-200
                    hover:bg-muted
                  "
                >
                  <div
                    className="
                      flex size-9 items-center justify-center
                      rounded-xl
                      bg-indigo-500/10
                      text-indigo-500
                    "
                  >
                    <Settings size={16} />
                  </div>

                  <div className="flex flex-col items-start">
                    <span>
                      {t("SETTINGS")}
                    </span>

                    <span
                      className="
                        text-xs font-normal
                        text-muted-foreground
                      "
                    >
                      Badilisha dashibodi yako
                    </span>
                  </div>
                </button>

                {/* DIVIDER */}
                <div className="my-2 h-px bg-border" />

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="
                    flex w-full items-center gap-3
                    rounded-2xl
                    px-4 py-3
                    text-sm font-medium
                    text-red-600
                    transition-all duration-200
                    hover:bg-red-500/10
                  "
                >
                  <div
                    className="
                      flex size-9 items-center justify-center
                      rounded-xl
                      bg-red-500/10
                    "
                  >
                    <LogOut size={16} />
                  </div>

                  <div className="flex flex-col items-start">
                    <span>
                      {t("LOGOUT")}
                      </span>

                    <span
                      className="
                        text-xs font-normal
                        text-red-500/70
                      "
                    >
                      Toka kwenye akaunti yako
                    </span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

