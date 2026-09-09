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
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium">
              <MonitorCog className="size-3.5" />
              Mipangilio ya Mfumo
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
              <h3 className="font-semibold">Mapendeleo ya Msimamizi</h3>

              <p className="text-sm text-muted-foreground">
                Badilisha mwonekano, lugha, na matumizi ya mfumo kwa urahisi.
              </p>

              <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="size-3.5" />
                Mfumo Salama
              </div>
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
                  <h2 className="font-semibold">Mipangilio ya Mwonekano</h2>

                  <p className="text-sm text-muted-foreground">
                    Badilisha muonekano wa dashibodi na theme ya mfumo.
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
                <div className="rounded-2xl bg-blue-500/10 dark:bg-blue-500/15 p-2 text-blue-600 dark:text-blue-400">
                  <Languages className="size-5" />
                </div>

                <div>
                  <h2 className="font-semibold">Mipangilio ya Lugha</h2>

                  <p className="text-sm text-muted-foreground">
                    Simamia tafsiri na lugha ndani ya mfumo.
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
      </div>
    </div>
  );
}
