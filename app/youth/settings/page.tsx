"use client";

import AppearanceSettings from "@/components/settings/AppearanceSettings";
import LanguageSettings from "@/components/settings/LanguageSettings";

import {
  Settings2,
  Sparkles,
  Palette,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";

export default function SettingsPage() {
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

              Personal Preferences
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
                Settings
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
                Customize your experience,
                personalize the interface and
                manage how the application
                behaves across your account.
              </p>
            </div>

            {/* FEATURES */}
            <div className="flex flex-wrap gap-3">
              {[
                "Dark mode support",
                "Personalized experience",
                "Secure preferences",
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
                <Settings2 className="h-8 w-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold tracking-tight">
                  App Preferences
                </h2>

                <p className="max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  Manage your appearance,
                  layout and interface
                  preferences from one
                  central place.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    icon: Palette,
                    label: "Theme Customization",
                    color: "text-violet-500",
                  },
                  {
                    icon: ShieldCheck,
                    label: "Secure Configuration",
                    color: "text-emerald-500",
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

      {/* ================= SETTINGS SECTION ================= */}

      <section className="space-y-5">
        {/* SECTION HEADER */}
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-11 w-11 items-center justify-center

              rounded-2xl

              bg-violet-500/10

              text-violet-600
            "
          >
            <SlidersHorizontal className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight">
              Appearance & Preferences
            </h2>

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Adjust visual appearance and
              personalize your experience.
            </p>
          </div>
        </div>

        {/* SETTINGS CARD */}
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
          {/* BACKGROUND EFFECTS */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-violet-500/5 blur-3xl" />

            <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-blue-500/5 blur-3xl" />
          </div>

          {/* CONTENT */}
          <div className="relative z-10">
            <AppearanceSettings />

            {/* FUTURE SETTINGS */}
            
              <div className="mt-8">
                <LanguageSettings />
              </div>
           
          </div>
        </div>
      </section>
    </div>
  );
}

