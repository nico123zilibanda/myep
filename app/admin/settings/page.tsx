
"use client";

import {
  Settings2,
  Palette,
  Languages,
  ShieldCheck,
  Sparkles,
  MonitorCog,
  LayoutDashboard,
  Globe2,
} from "lucide-react";

import AppearanceSettings from "@/components/settings/AppearanceSettings";
import LanguageSettings from "@/components/settings/LanguageSettings";

import { useLanguage } from "@/lib/i18n/LanguageContext";

/* ================= PAGE ================= */

export default function SettingsPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl border bg-background p-6 shadow-sm">
        <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium">
              <MonitorCog className="size-3.5" />
              System Preferences
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {t("settings")}
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                {t("customizeApp")}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4 rounded-3xl border bg-muted/30 p-4 backdrop-blur-sm">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Settings2 className="size-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold">
                Admin Preferences
              </h3>

              <p className="text-sm text-muted-foreground">
                Customize appearance, language and system experience.
              </p>

              <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="size-3.5" />
                Secure Configuration
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SETTINGS OVERVIEW */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* THEME */}
        <div className="rounded-3xl border bg-background p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Appearance
              </p>

              <h2 className="text-xl font-bold">
                Theme
              </h2>

              <p className="text-xs text-muted-foreground">
                Customize dark and light interface styles.
              </p>
            </div>

            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <Palette className="size-5" />
            </div>
          </div>
        </div>

        {/* LANGUAGE */}
        <div className="rounded-3xl border bg-background p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Language
              </p>

              <h2 className="text-xl font-bold">
                Localization
              </h2>

              <p className="text-xs text-muted-foreground">
                Switch app language and translation preferences.
              </p>
            </div>

            <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-500">
              <Languages className="size-5" />
            </div>
          </div>
        </div>

        {/* EXPERIENCE */}
        <div className="rounded-3xl border bg-background p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                User Experience
              </p>

              <h2 className="text-xl font-bold">
                Enhanced
              </h2>

              <p className="text-xs text-muted-foreground">
                Modern dashboard experience enabled.
              </p>
            </div>

            <div className="rounded-2xl bg-violet-500/10 p-3 text-violet-500">
              <Sparkles className="size-5" />
            </div>
          </div>
        </div>

        {/* SYSTEM */}
        <div className="rounded-3xl border bg-background p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                System
              </p>

              <h2 className="text-xl font-bold">
                Stable
              </h2>

              <p className="text-xs text-muted-foreground">
                All configurations are operating normally.
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-500">
              <LayoutDashboard className="size-5" />
            </div>
          </div>
        </div>
      </div>

      {/* SETTINGS CONTENT */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* MAIN SETTINGS */}
        <div className="space-y-6 xl:col-span-2">
          {/* APPEARANCE */}
          <div className="overflow-hidden rounded-3xl border bg-background shadow-sm">
            {/* HEADER */}
            <div className="border-b bg-muted/20 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                  <Palette className="size-5" />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Appearance Settings
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Customize your dashboard appearance and interface theme.
                  </p>
                </div>
              </div>
            </div>

            {/* BODY */}
            <div className="p-6">
              <AppearanceSettings />
            </div>
          </div>

          {/* LANGUAGE */}
          <div className="overflow-hidden rounded-3xl border bg-background shadow-sm">
            {/* HEADER */}
            <div className="border-b bg-muted/20 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-blue-500/10 p-2 text-blue-500">
                  <Languages className="size-5" />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Language Settings
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Manage translations and localization preferences.
                  </p>
                </div>
              </div>
            </div>

            {/* BODY */}
            <div className="p-6">
              <LanguageSettings />
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          {/* QUICK INFO */}
          <div className="rounded-3xl border bg-background p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                <Settings2 className="size-5" />
              </div>

              <div>
                <h3 className="font-semibold">
                  Settings Overview
                </h3>

                <p className="text-sm text-muted-foreground">
                  Manage your dashboard preferences easily.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl border bg-muted/20 p-4">
                <Palette className="mt-0.5 size-4 text-primary" />

                <div>
                  <p className="text-sm font-medium">
                    Theme Personalization
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Switch between dark and light modes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border bg-muted/20 p-4">
                <Globe2 className="mt-0.5 size-4 text-blue-500" />

                <div>
                  <p className="text-sm font-medium">
                    Global Language Support
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Configure multilingual dashboard support.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border bg-muted/20 p-4">
                <ShieldCheck className="mt-0.5 size-4 text-emerald-500" />

                <div>
                  <p className="text-sm font-medium">
                    Secure Preferences
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Settings are safely stored and protected.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TIPS */}
          <div className="rounded-3xl border bg-background p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-violet-500/10 p-2 text-violet-500">
                <Sparkles className="size-5" />
              </div>

              <div>
                <h3 className="font-semibold">
                  Customization Tips
                </h3>

                <p className="text-sm text-muted-foreground">
                  Improve your admin experience.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm text-muted-foreground">
              <div className="rounded-2xl border bg-muted/20 p-4">
                Use dark mode for better night-time viewing experience.
              </div>

              <div className="rounded-2xl border bg-muted/20 p-4">
                Choose your preferred language for easier navigation.
              </div>

              <div className="rounded-2xl border bg-muted/20 p-4">
                Keep your interface clean and personalized for productivity.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

