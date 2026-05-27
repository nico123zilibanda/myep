
"use client";

import { useMemo } from "react";

import { usePathname, useRouter } from "next/navigation";

import {
  BellDot,
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  User,
  ShieldCheck,
} from "lucide-react";

import { toast } from "sonner";

import clsx from "clsx";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface YouthTopbarProps {
  user: {
    id: number;
    fullName: string;
    email: string;
    role: "YOUTH" | "ADMIN";
    image?: string | null;
  };

  onMenuClick: () => void;

  enableDropdown?: boolean;
}

export default function YouthTopbar({
  user,
  onMenuClick,
  enableDropdown = true,
}: YouthTopbarProps) {
  const router = useRouter();

  const pathname = usePathname();

  /* ================= INITIALS ================= */

  const initials = useMemo(() => {
    const names =
      user.fullName.trim().split(" ");

    if (names.length === 1) {
      return names[0][0]?.toUpperCase();
    }

    return (
      names[0][0] +
      names[names.length - 1][0]
    ).toUpperCase();
  }, [user.fullName]);

  /* ================= PAGE TITLE ================= */

  const pageTitle = useMemo(() => {
    if (
      pathname.includes(
        "/opportunities"
      )
    ) {
      return "Fursa";
    }

    if (
      pathname.includes(
        "/saved-opportunities"
      )
    ) {
      return "Fursa Zilizohifadhiwa";
    }

    if (
      pathname.includes(
        "/trainings"
      )
    ) {
      return "Mafunzo na Matangazo";
    }

    if (
      pathname.includes(
        "/questions"
      )
    ) {
      return "Maswali";
    }

    if (
      pathname.includes(
        "/profile"
      )
    ) {
      return "Wasifu Wangu";
    }

    if (
      pathname.includes(
        "/settings"
      )
    ) {
      return "Mipangilio";
    }

    return "Dashibodi ya Vijana";
  }, [pathname]);

  /* ================= LOGOUT ================= */

  const handleLogout = async () => {
    try {
      const res = await fetch(
        "/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        },
      );

      const data = await res.json();

      toast.success(
        data.message ||
          "Umetoka kwenye mfumo",
      );

      router.replace("/login");
    } catch {
      toast.error(
        "Imeshindikana kutoka. Jaribu tena.",
      );
    }
  };

  /* ================= UI ================= */

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
          <Button
            variant="outline"
            size="icon"
            onClick={onMenuClick}
            className="
              lg:hidden

              size-11

              rounded-2xl

              border-border/70

              bg-background/80
            "
          >
            <Menu className="size-5" />
          </Button>

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
                <ShieldCheck className="size-4" />
              </div>

              <h1
                className="
                  text-lg sm:text-xl

                  font-bold

                  tracking-tight
                "
              >
                {pageTitle}
              </h1>
            </div>

            <p
              className="
                mt-1 hidden sm:block

                text-xs

                text-muted-foreground
              "
            >
              Karibu tena,{" "}
              {user.fullName}
            </p>
          </div>
        </div>

        {/* ================= RIGHT ================= */}

        <div className="flex items-center gap-3">
          {/* NOTIFICATIONS */}
          <Button
            variant="outline"
            size="icon"
            className="
              relative

              size-11

              rounded-2xl

              border-border/70

              bg-background/80
            "
          >
            <BellDot className="size-5" />

            <span
              className="
                absolute right-2 top-2

                size-2 rounded-full

                bg-red-500
              "
            />

            <span
              className="
                absolute inset-0

                rounded-2xl

                animate-pulse

                bg-red-500/5
              "
            />
          </Button>

          {/* ================= USER ================= */}

          {enableDropdown ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="
                    group

                    h-auto

                    rounded-2xl

                    border border-transparent

                    px-2 py-1.5

                    transition-all duration-200

                    hover:border-border
                    hover:bg-muted/60
                  "
                >
                  <div className="flex items-center gap-3">
                    {/* AVATAR */}
                    <div className="relative">
                      <Avatar
                        className="
                          size-11

                          border-2 border-background

                          shadow-md
                        "
                      >
                        <AvatarImage
                          src={
                            user.image || ""
                          }
                          alt={
                            user.fullName
                          }
                        />

                        <AvatarFallback
                          className="
                            bg-primary/10

                            font-bold

                            text-primary
                          "
                        >
                          {initials}
                        </AvatarFallback>
                      </Avatar>

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

                        flex-col items-start

                        leading-tight
                      "
                    >
                      <span
                        className="
                          max-w-36 truncate

                          text-sm font-semibold
                        "
                      >
                        {user.fullName}
                      </span>

                      <span
                        className="
                          text-xs uppercase

                          tracking-wide

                          text-muted-foreground
                        "
                      >
                        KIJANA
                      </span>
                    </div>

                    {/* ICON */}
                    <ChevronDown
                      className="
                        hidden md:block

                        size-4

                        text-muted-foreground

                        transition-transform duration-200

                        group-data-[state=open]:rotate-180
                      "
                    />
                  </div>
                </Button>
              </DropdownMenuTrigger>

              {/* ================= DROPDOWN ================= */}

              <DropdownMenuContent
                align="end"
                className="
                  w-72

                  overflow-hidden

                  rounded-3xl

                  border-border/70

                  bg-background/95

                  p-0

                  shadow-2xl

                  backdrop-blur-2xl
                "
              >
                {/* TOP */}
                <div
                  className="
                    relative overflow-hidden

                    border-b

                    p-5
                  "
                >
                  {/* BACKGROUND */}
                  <div
                    className="
                      absolute inset-0

                      bg-linear-to-br

                      from-primary/10
                      via-transparent
                      to-indigo-500/5
                    "
                  />

                  <div
                    className="
                      relative

                      flex items-center gap-4
                    "
                  >
                    <Avatar
                      className="
                        size-14

                        border-2 border-background

                        shadow-lg
                      "
                    >
                      <AvatarImage
                        src={
                          user.image || ""
                        }
                        alt={
                          user.fullName
                        }
                      />

                      <AvatarFallback
                        className="
                          bg-primary/10

                          text-base
                          font-bold

                          text-primary
                        "
                      >
                        {initials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <h3
                        className="
                          truncate

                          text-sm font-bold
                        "
                      >
                        {user.fullName}
                      </h3>

                      <p
                        className="
                          mt-1 truncate

                          text-xs

                          text-muted-foreground
                        "
                      >
                        {user.email}
                      </p>

                      <div
                        className="
                          mt-3

                          inline-flex items-center gap-2

                          rounded-full

                          border border-primary/20

                          bg-primary/8

                          px-2.5 py-1

                          text-[11px]
                          font-semibold

                          text-primary
                        "
                      >
                        <ShieldCheck className="size-3" />

                        Akaunti ya Kijana
                      </div>
                    </div>
                  </div>
                </div>

                {/* MENU */}
                <div className="p-2">
                  {/* PROFILE */}
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(
                        "/youth/profile",
                      )
                    }
                    className="
                      flex items-center gap-3

                      rounded-2xl

                      px-4 py-3

                      cursor-pointer
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
                      <User className="size-4" />
                    </div>

                    <div className="flex flex-col">
                      <span
                        className="
                          text-sm font-medium
                        "
                      >
                        Wasifu Wangu
                      </span>

                      <span
                        className="
                          text-xs

                          text-muted-foreground
                        "
                      >
                        Angalia taarifa zako
                      </span>
                    </div>
                  </DropdownMenuItem>

                  {/* SETTINGS */}
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(
                        "/youth/settings",
                      )
                    }
                    className="
                      flex items-center gap-3

                      rounded-2xl

                      px-4 py-3

                      cursor-pointer
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
                      <Settings className="size-4" />
                    </div>

                    <div className="flex flex-col">
                      <span
                        className="
                          text-sm font-medium
                        "
                      >
                        Mipangilio
                      </span>

                      <span
                        className="
                          text-xs

                          text-muted-foreground
                        "
                      >
                        Rekebisha akaunti yako
                      </span>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-2" />

                  {/* LOGOUT */}
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="
                      flex items-center gap-3

                      rounded-2xl

                      px-4 py-3

                      cursor-pointer

                      text-red-600

                      focus:text-red-600
                    "
                  >
                    <div
                      className="
                        flex size-9 items-center justify-center

                        rounded-xl

                        bg-red-500/10
                      "
                    >
                      <LogOut className="size-4" />
                    </div>

                    <div className="flex flex-col">
                      <span
                        className="
                          text-sm font-medium
                        "
                      >
                        Toka kwenye Mfumo
                      </span>

                      <span
                        className="
                          text-xs

                          text-red-500/70
                        "
                      >
                        Ondoka kwenye akaunti
                      </span>
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Avatar
              className="
                size-11

                border
              "
            >
              <AvatarImage
                src={user.image || ""}
                alt={user.fullName}
              />

              <AvatarFallback
                className="
                  bg-primary/10

                  font-bold

                  text-primary
                "
              >
                {initials}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </header>
  );
}

