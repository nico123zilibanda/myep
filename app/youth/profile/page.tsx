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
              Taarifa Binafsi
            </h2>

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Sasisha maelezo ya wasifu wako na taarifa binafsi.
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
             Mipangilio ya Usalama
            </h2>

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Badilisha nenosiri lako na uweke akaunti yako salama.
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
