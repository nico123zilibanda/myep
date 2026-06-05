
"use client";

import {
  ShieldCheck,
  UserCircle2,
  LockKeyhole,
  Mail,
  Settings2,
  BadgeCheck,
  Activity,
} from "lucide-react";

import ProfileForm from "@/components/profile/ProfileForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";

import { useDictionary } from "@/lib/i18n/useDictionary";

/* ================= PAGE ================= */

export default function ProfilePage() {
  const t = useDictionary();

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl border bg-background p-6 shadow-sm">
        <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium">
              <ShieldCheck className="size-3.5" />
              Usimamizi wa Akaunti
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {t("PROFILE_PAGE_TITLE")}
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                {t("PROFILE_DESCRIPTION")}
              </p>
            </div>
          </div>

          {/* RIGHT PROFILE PREVIEW */}
          <div className="flex items-center gap-4 rounded-3xl border bg-muted/30 p-4 backdrop-blur-sm">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <UserCircle2 className="size-9  bg-emerald-500/10 dark:text-emerald-400" />
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold">
                {/* {t("ADMIN_ACCOUNT")} */}
                Akaunti ya Msimamizi
              </h3>

              <p className="text-sm text-muted-foreground">
                {/* {t("PROFILE_SECURITY_TEXT")} */}
                Usalama wa Wasifu
              </p>

              <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <BadgeCheck className="size-3.5" />
                Akaunti Imethibitishwa
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* PROFILE */}
        <div className="rounded-3xl border bg-background p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Hali ya Wasifu
              </p>

              <h2 className="text-xl font-bold">
                Inatumika
              </h2>

              <p className="text-xs text-muted-foreground">
                Wasifu wako unatumika kikamilifu na unapatikana kwa matumizi.
              </p>
            </div>

            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <UserCircle2 className="size-5" />
            </div>
          </div>
        </div>

        {/* SECURITY */}
        <div className="rounded-3xl border bg-background p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Kiwango cha Usalama
              </p>

              <h2 className="text-xl font-bold">
                Imara
              </h2>

              <p className="text-xs text-muted-foreground">
                Akaunti yako inalindwa kwa mfumo salama wa uthibitishaji.
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-500">
              <ShieldCheck className="size-5" />
            </div>
          </div>
        </div>

        {/* SETTINGS */}
        <div className="rounded-3xl border bg-background p-5 shadow-sm sm:col-span-2 xl:col-span-1">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Shughuli za Akaunti
              </p>

              <h2 className="text-xl font-bold">
                Imara
              </h2>

              <p className="text-xs text-muted-foreground">
                Hakuna shughuli zisizo za kawaida zilizogunduliwa hivi karibuni.
              </p>
            </div>

            <div className="rounded-2xl bg-violet-500/10 p-3 text-violet-500">
              <Activity className="size-5" />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* PROFILE FORM */}
        <div className="xl:col-span-2">
          <div className="overflow-hidden rounded-3xl border bg-background shadow-sm">
            {/* HEADER */}
            <div className="border-b bg-muted/20 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                  <Settings2 className="size-5" />
                </div>

                <div>
                  <h2 className="font-semibold">
                    {/* {t("PROFILE_INFORMATION")} */}
                    Taarifa za Wasifu
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Sasisha taarifa zako binafsi na maelezo ya akaunti yako.
                  </p>
                </div>
              </div>
            </div>

            {/* BODY */}
            <div className="p-6">
              <ProfileForm />
            </div>
          </div>
        </div>

        {/* SECURITY SIDEBAR */}
        <div className="space-y-6">
          {/* CHANGE PASSWORD */}
          <div className="overflow-hidden rounded-3xl border bg-background shadow-sm">
            <div className="border-b bg-muted/20 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-red-500/10 p-2 text-red-500">
                  <LockKeyhole className="size-5" />
                </div>

                <div>
                  <h2 className="font-semibold">
                    {/* {t("CHANGE_PASSWORD")} */}
                    Badilisha Nenosiri
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Linda akaunti yako kwa kutumia nenosiri imara.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <ChangePasswordForm />
            </div>
          </div>

          {/* SECURITY INFO */}
          <div className="rounded-3xl border bg-background p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-500/10 p-2 text-emerald-500">
                <ShieldCheck className="size-5" />
              </div>

              <div>
                <h3 className="font-semibold">
                  Vigezo vya Usalama
                </h3>

                <p className="text-sm text-muted-foreground">
                  Hakikisha akaunti yako ya msimamizi inalindwa wakati wote.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl border bg-muted/20 p-4">
                <Mail className="mt-0.5 size-4 text-primary" />

                <div>
                  <p className="text-sm font-medium">
                    Tumia barua pepe sahihi
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Hakikisha taarifa za urejeshaji wa akaunti zinakufikia.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border bg-muted/20 p-4">
                <LockKeyhole className="mt-0.5 size-4 text-red-500" />

                <div>
                  <p className="text-sm font-medium">
                    Nenosiri Imara
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Tumia herufi kubwa, herufi ndogo, alama maalum na namba.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border bg-muted/20 p-4">
                <ShieldCheck className="mt-0.5 size-4 text-emerald-500" />

                <div>
                  <p className="text-sm font-medium">
                    Linda Akaunti Yako
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Usiwahi kushiriki taarifa zako za kuingia kwenye mfumo na watu wengine.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

