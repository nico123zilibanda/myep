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
              <h3 className="font-semibold">
                Mapendeleo ya Admin
              </h3>

              <p className="text-sm text-muted-foreground">
                Badilisha mwonekano,
                lugha, na matumizi ya
                mfumo kwa urahisi.
              </p>

              <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="size-3.5" />
                Mfumo Salama
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
                Mwonekano
              </p>

              <h2 className="text-xl font-bold">
                Theme
              </h2>

              <p className="text-xs text-muted-foreground">
                Badilisha mfumo kuwa wa
                giza au mwanga.
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
                Lugha
              </p>

              <h2 className="text-xl font-bold">
                Tafsiri
              </h2>

              <p className="text-xs text-muted-foreground">
                Badilisha lugha ya mfumo
                na mapendeleo ya tafsiri.
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
                Uzoefu wa Mtumiaji
              </p>

              <h2 className="text-xl font-bold">
                Bora Zaidi
              </h2>

              <p className="text-xs text-muted-foreground">
                Mfumo wa kisasa wa
                dashibodi umewezeshwa.
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
                Mfumo
              </p>

              <h2 className="text-xl font-bold">
                Imara
              </h2>

              <p className="text-xs text-muted-foreground">
                Mipangilio yote
                inafanya kazi kawaida.
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
                    Mipangilio ya
                    Mwonekano
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Badilisha muonekano
                    wa dashibodi na
                    theme ya mfumo.
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
                    Mipangilio ya Lugha
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Simamia tafsiri na
                    lugha ndani ya
                    mfumo.
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
                  Muhtasari wa
                  Mipangilio
                </h3>

                <p className="text-sm text-muted-foreground">
                  Simamia mapendeleo ya
                  dashibodi kwa urahisi.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl border bg-muted/20 p-4">
                <Palette className="mt-0.5 size-4 text-primary" />

                <div>
                  <p className="text-sm font-medium">
                    Kubadilisha Theme
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Hamia kati ya mode
                    ya giza na mwanga.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border bg-muted/20 p-4">
                <Globe2 className="mt-0.5 size-4 text-blue-500" />

                <div>
                  <p className="text-sm font-medium">
                    Msaada wa Lugha
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Mfumo unaunga
                    mkono lugha nyingi.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border bg-muted/20 p-4">
                <ShieldCheck className="mt-0.5 size-4 text-emerald-500" />

                <div>
                  <p className="text-sm font-medium">
                    Mipangilio Salama
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Taarifa zako za
                    mipangilio
                    zimehifadhiwa kwa
                    usalama.
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
                  Vidokezo vya Mfumo
                </h3>

                <p className="text-sm text-muted-foreground">
                  Boresha matumizi yako
                  ya admin.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm text-muted-foreground">
              <div className="rounded-2xl border bg-muted/20 p-4">
                Tumia dark mode kwa
                mwonekano mzuri zaidi
                wakati wa usiku.
              </div>

              <div className="rounded-2xl border bg-muted/20 p-4">
                Chagua lugha
                unayoielewa zaidi kwa
                matumizi rahisi ya
                mfumo.
              </div>

              <div className="rounded-2xl border bg-muted/20 p-4">
                Weka mfumo wako katika
                muonekano safi na
                unaokufaa kwa kazi za
                kila siku.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}