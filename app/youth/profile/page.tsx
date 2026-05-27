"use client";

import ProfileForm from "@/components/youth/profile/ProfileForm";
import ChangePasswordForm from "@/components/youth/profile/ChangePasswordForm";

import {
  User2,
  ShieldCheck,
  Sparkles,
  Settings2,
  CheckCircle2,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 sm:p-6 lg:p-8">
      {/* ================= HERO ================= */}

      <section
        className="
          relative overflow-hidden

          rounded-[34px]

          border border-zinc-200/70
          dark:border-zinc-800/70

          bg-white/80
          dark:bg-zinc-950/50

          p-6 sm:p-8 lg:p-10

          shadow-sm
          backdrop-blur-xl
        "
      >
        {/* BACKGROUND GLOWS */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT */}
          <div className="max-w-3xl space-y-5">
            {/* BADGE */}
            <div
              className="
                inline-flex items-center gap-2

                rounded-full

                border border-blue-500/20

                bg-blue-500/10

                px-4 py-2

                text-xs font-semibold

                text-blue-600
                dark:text-blue-400
              "
            >
              <Sparkles className="h-3.5 w-3.5" />

              Youth Account Center
            </div>

            {/* TITLE */}
            <div className="space-y-4">
              <h1
                className="
                  text-3xl font-bold tracking-tight

                  text-zinc-900
                  dark:text-white

                  sm:text-4xl lg:text-5xl
                "
              >
                Profile Settings
              </h1>

              <p
                className="
                  max-w-2xl

                  text-sm leading-relaxed

                  text-zinc-600
                  dark:text-zinc-400

                  sm:text-base
                "
              >
                Manage your personal
                information, update account
                details and improve your
                account security settings in
                one place.
              </p>
            </div>

            {/* FEATURES */}
            <div className="flex flex-wrap gap-3">
              {[
                "Secure account",
                "Profile management",
                "Privacy protected",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    inline-flex items-center gap-2

                    rounded-2xl

                    border border-zinc-200/70
                    dark:border-zinc-800/70

                    bg-white/70
                    dark:bg-zinc-900/60

                    px-4 py-2

                    text-xs font-medium

                    text-zinc-700
                    dark:text-zinc-300
                  "
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />

                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CARD */}
          <div
            className="
              relative overflow-hidden

              rounded-[30px]

              border border-zinc-200/70
              dark:border-zinc-800/70

              bg-white/70
              dark:bg-zinc-900/60

              p-6

              shadow-sm
              backdrop-blur-xl
            "
          >
            <div className="space-y-5">
              <div
                className="
                  flex h-16 w-16 items-center justify-center

                  rounded-3xl

                  bg-linear-to-br
                  from-blue-600
                  to-indigo-600

                  text-white

                  shadow-lg shadow-blue-500/20
                "
              >
                <User2 className="h-8 w-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold tracking-tight">
                  Account Settings
                </h2>

                <p className="max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  Keep your information
                  accurate and your account
                  protected with strong
                  security settings.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    icon: ShieldCheck,
                    label: "Security Enabled",
                    color: "text-emerald-500",
                  },
                  {
                    icon: Settings2,
                    label: "Customizable Profile",
                    color: "text-blue-500",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="
                      flex items-center gap-3

                      rounded-2xl

                      border border-zinc-200/70
                      dark:border-zinc-800/70

                      bg-background/60

                      px-4 py-3
                    "
                  >
                    <item.icon
                      className={`h-5 w-5 ${item.color}`}
                    />

                    <span className="text-sm font-medium">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROFILE FORM ================= */}

      <section className="space-y-5">
        {/* SECTION HEADER */}
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-11 w-11 items-center justify-center

              rounded-2xl

              bg-blue-500/10

              text-blue-600
            "
          >
            <User2 className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight">
              Personal Information
            </h2>

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Update your profile details
              and personal information.
            </p>
          </div>
        </div>

        {/* FORM */}
        <ProfileForm />
      </section>

      {/* ================= PASSWORD FORM ================= */}

      <section className="space-y-5">
        {/* SECTION HEADER */}
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-11 w-11 items-center justify-center

              rounded-2xl

              bg-red-500/10

              text-red-500
            "
          >
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight">
              Security Settings
            </h2>

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Change your password and keep
              your account secure.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div
          className="
            relative overflow-hidden

            rounded-[34px]

            border border-zinc-200/70
            dark:border-zinc-800/70

            bg-white/80
            dark:bg-zinc-950/50

            p-6 sm:p-8

            shadow-sm
            backdrop-blur-xl
          "
        >
          {/* BACKGROUND */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-red-500/5 blur-3xl" />

            <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-violet-500/5 blur-3xl" />
          </div>

          <div className="relative z-10">
            <ChangePasswordForm />
          </div>
        </div>
      </section>
    </div>
  );
}

