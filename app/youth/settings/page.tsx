"use client";

import {
  Globe2,
  Languages,
  LayoutDashboard,
  MonitorCog,
  Palette,
  Settings2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import AppearanceSettings from "@/components/settings/AppearanceSettings";
import LanguageSettings from "@/components/settings/LanguageSettings";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { Separator } from "@/components/ui/separator";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Alert } from "@/components/ui/Alert";

interface OverviewCardProps {
  title: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
}

function OverviewCard({
  title,
  label,
  description,
  icon,
  badge,
}: OverviewCardProps) {
  return (
    <Card
      className="
        group

        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-md
      "
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <Badge variant="secondary">{label}</Badge>

            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{title}</h3>

              <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            <Badge variant="outline">{badge}</Badge>
          </div>

          <div
            className="
              flex
              size-12
              items-center
              justify-center

              rounded-2xl

              bg-primary/10

              text-primary

              transition-transform

              group-hover:scale-110
            "
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
/* ================= PAGE ================= */

export default function SettingsPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* HERO SECTION */}

      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5" />

        <CardContent className="relative p-8">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            {/* LEFT */}

            <div className="max-w-3xl space-y-6">
              <Badge variant="secondary" className="gap-2 px-3 py-1">
                <MonitorCog className="size-3.5" />
                Mipangilio ya Mfumo
              </Badge>

              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight">
                  {t("settings")}
                </h1>

                <p className="max-w-2xl text-muted-foreground">
                  {t("customizeApp")}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Secure</Badge>

                <Badge variant="outline">Responsive</Badge>

                <Badge variant="outline">Personalized</Badge>
              </div>
            </div>

            {/* RIGHT */}

            <Card className="w-full max-w-md border-dashed bg-muted/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="
                flex
                size-16
                items-center
                justify-center

                rounded-2xl

                bg-primary/10

                text-primary
              "
                  >
                    <Settings2 className="size-8" />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="font-semibold">Mapendeleo ya Msimamizi</h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Badilisha mwonekano wa mfumo, theme na mapendeleo ya
                        dashboard kwa urahisi.
                      </p>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <Badge>
                        <ShieldCheck className="mr-1 size-3" />
                        Mfumo Salama
                      </Badge>

                      <Button variant="ghost" size="sm">
                        More
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* SETTINGS OVERVIEW */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          label="Mwonekano"
          title="Mandhari"
          description="Badilisha mfumo kuwa wa giza au mwanga."
          badge="Dark / Light"
          icon={<Palette className="size-5" />}
        />

        <OverviewCard
          label="Lugha"
          title="Tafsiri"
          description="Badilisha lugha na mapendeleo ya mfumo."
          badge="2 Languages"
          icon={<Languages className="size-5" />}
        />

        <OverviewCard
          label="Experience"
          title="Modern UI"
          description="Dashboard imeboreshwa kwa matumizi bora."
          badge="Enhanced"
          icon={<Sparkles className="size-5" />}
        />

        <OverviewCard
          label="Mfumo"
          title="Imara"
          description="Mipangilio yote inafanya kazi kawaida."
          badge="Healthy"
          icon={<LayoutDashboard className="size-5" />}
        />
      </div>

      {/* SETTINGS CONTENT */}
      <div className="grid gap-8 xl:grid-cols-3">
        {/* ================= MAIN SETTINGS ================= */}

        <div className="space-y-8 xl:col-span-2">
          {/* APPEARANCE */}

          <Card className="overflow-hidden">
            {/* HEADER */}

            <CardHeader className="pb-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className="
                flex
                size-12
                items-center
                justify-center

                rounded-2xl

                bg-primary/10

                text-primary
              "
                  >
                    <Palette className="size-5" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle>Mipangilio ya Mwonekano</CardTitle>

                      <Badge variant="secondary">Active</Badge>
                    </div>

                    <CardDescription>
                      Binafsisha muonekano wa mfumo kwa kuchagua theme
                      inayokufaa. Mabadiliko yataonekana mara moja ndani ya
                      dashboard nzima.
                    </CardDescription>
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  <Palette className="size-4" />
                  Theme
                </Button>
              </div>
            </CardHeader>

            <Separator />

            {/* CONTENT */}

            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* INFO */}

                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="border-dashed bg-muted/20 shadow-none">
                    <CardContent className="flex items-center gap-3 p-4">
                      <div
                        className="
                    flex
                    size-10
                    items-center
                    justify-center

                    rounded-xl

                    bg-primary/10

                    text-primary
                  "
                      >
                        <Palette className="size-4" />
                      </div>

                      <div>
                        <p className="text-sm font-medium">Theme</p>

                        <p className="text-xs text-muted-foreground">
                          Dark / Light
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed bg-muted/20 shadow-none">
                    <CardContent className="flex items-center gap-3 p-4">
                      <div
                        className="
                    flex
                    size-10
                    items-center
                    justify-center

                    rounded-xl

                    bg-emerald-500/10

                    text-emerald-600
                  "
                      >
                        <ShieldCheck className="size-4" />
                      </div>

                      <div>
                        <p className="text-sm font-medium">Secure</p>

                        <p className="text-xs text-muted-foreground">
                          Preference Saved
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed bg-muted/20 shadow-none">
                    <CardContent className="flex items-center gap-3 p-4">
                      <div
                        className="
                    flex
                    size-10
                    items-center
                    justify-center

                    rounded-xl

                    bg-violet-500/10

                    text-violet-600
                  "
                      >
                        <Sparkles className="size-4" />
                      </div>

                      <div>
                        <p className="text-sm font-medium">Experience</p>

                        <p className="text-xs text-muted-foreground">
                          Optimized UI
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                {/* SETTINGS */}

                <AppearanceSettings />
              </div>
            </CardContent>
          </Card>

          {/* LANGUAGE */}

          <div className="overflow-hidden rounded-3xl border bg-background shadow-sm">
      <div className="border-b bg-muted/20 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-500/10 p-2 text-blue-500">
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

      <div className="p-6">
        <LanguageSettings />
      </div>
    </div>
        </div>

        {/* ================= SIDEBAR ================= */}

        <div className="space-y-6">
          {/* QUICK SUMMARY */}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="
              flex
              size-11
              items-center
              justify-center

              rounded-2xl

              bg-primary/10

              text-primary
            "
                  >
                    <Settings2 className="size-5" />
                  </div>

                  <div>
                    <CardTitle className="text-base">Muhtasari</CardTitle>

                    <CardDescription>Dashboard Preferences</CardDescription>
                  </div>
                </div>

                <Badge>Active</Badge>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="space-y-5 pt-6">
              <div className="flex items-start gap-3">
                <div
                  className="
            mt-0.5

            rounded-xl

            bg-primary/10

            p-2

            text-primary
          "
                >
                  <Palette className="size-4" />
                </div>

                <div>
                  <p className="text-sm font-medium">Kubadilisha Theme</p>

                  <p className="text-sm text-muted-foreground">
                    Hamia kati ya Light na Dark Mode wakati wowote.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <div
                  className="
            mt-0.5

            rounded-xl

            bg-blue-500/10

            p-2

            text-blue-600
          "
                >
                  <Globe2 className="size-4" />
                </div>

                <div>
                  <p className="text-sm font-medium">Lugha</p>

                  <p className="text-sm text-muted-foreground">
                    Mfumo unaunga mkono lugha nyingi.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <div
                  className="
            mt-0.5

            rounded-xl

            bg-emerald-500/10

            p-2

            text-emerald-600
          "
                >
                  <ShieldCheck className="size-4" />
                </div>

                <div>
                  <p className="text-sm font-medium">Usalama</p>

                  <p className="text-sm text-muted-foreground">
                    Mipangilio yako huhifadhiwa kwa usalama.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SYSTEM TIPS */}

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div
                  className="
            flex
            size-11
            items-center
            justify-center

            rounded-2xl

            bg-violet-500/10

            text-violet-600
          "
                >
                  <Sparkles className="size-5" />
                </div>

                <div>
                  <CardTitle className="text-base">Vidokezo</CardTitle>

                  <CardDescription>
                    Boresha matumizi ya dashboard.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="space-y-4 pt-6">
              <Alert>
                <p className="font-medium">🌙 Dark Mode</p>

                <p className="mt-1 text-sm">
                  Tumia Dark Mode wakati wa usiku ili kupunguza uchovu wa macho.
                </p>
              </Alert>

              <Alert variant="success">
                <p className="font-medium">💾 Auto Save</p>

                <p className="mt-1 text-sm">
                  Mabadiliko ya theme huhifadhiwa moja kwa moja.
                </p>
              </Alert>

              <Alert variant="warning">
                <p className="font-medium">🌍 Language</p>

                <p className="mt-1 text-sm">
                  Unaweza kubadilisha lugha baadae bila kupoteza taarifa zako.
                </p>
              </Alert>
            </CardContent>
          </Card>

          {/* STATUS */}

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Badge>System Healthy</Badge>

                <h3 className="text-lg font-semibold">
                  Dashboard iko tayari kutumika
                </h3>

                <p className="text-sm text-muted-foreground">
                  Hakuna tatizo lililogunduliwa kwenye mipangilio ya mfumo.
                  Unaweza kuendelea kubinafsisha dashboard yako.
                </p>

                <Button className="w-full">Endelea kutumia mfumo</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
