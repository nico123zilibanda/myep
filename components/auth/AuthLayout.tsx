
"use client";

import React from "react";

import Link from "next/link";

import {
  Sparkles,
  ShieldCheck,
  BriefcaseBusiness,
  GraduationCap,
} from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div
      className="
        relative flex min-h-screen
        overflow-hidden

        bg-background
      "
    >
      {/* ====================================================== */}
      {/* BACKGROUND GLOW */}
      {/* ====================================================== */}

      <div
        className="
          pointer-events-none

          absolute left-0 top-0

          h-96 w-96

          rounded-full

          bg-primary/15

          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none

          absolute bottom-0 right-0

          h-105 w-105

          rounded-full

          bg-indigo-500/10

          blur-3xl
        "
      />

      {/* ====================================================== */}
      {/* LEFT SIDE */}
      {/* ====================================================== */}

      <div
        className="
          relative hidden

          w-1/2 flex-col
          justify-between

          overflow-hidden

          border-r border-border/50

          bg-linear-to-br
          from-primary
          via-primary/95
          to-indigo-700

          p-10

          text-white

          lg:flex
        "
      >
        {/* OVERLAY */}
        <div
          className="
            absolute inset-0

            bg-black/10
          "
        />

        {/* TOP */}
        <div className="relative z-10">
          {/* LOGO */}
          <Link
            href="/"
            className="
              inline-flex items-center gap-3
            "
          >
            <div
              className="
                flex size-12 items-center
                justify-center

                rounded-2xl

                bg-white/15

                backdrop-blur
              "
            >
              <ShieldCheck
                className="
                  size-6
                "
              />
            </div>

            <div>
              <h2
                className="
                  text-lg font-bold
                "
              >
                Mlele DC
              </h2>

              <p
                className="
                  text-sm text-white/70
                "
              >
                Fursa Portal
              </p>
            </div>
          </Link>

          {/* CONTENT */}
          <div className="mt-20 max-w-lg">
            {/* BADGE */}
            <div
              className="
                inline-flex items-center gap-2

                rounded-full

                border border-white/20

                bg-white/10

                px-4 py-2

                text-xs font-semibold

                backdrop-blur
              "
            >
              <Sparkles
                className="
                  size-3.5
                "
              />

              Mfumo Rasmi wa Vijana
            </div>

            {/* TITLE */}
            <h1
              className="
                mt-8

                text-5xl
                font-black
                leading-tight
              "
            >
              Karibu kwenye Mfumo wa
              Fursa kwa Vijana
            </h1>

            {/* DESC */}
            <p
              className="
                mt-6

                text-lg leading-relaxed

                text-white/75
              "
            >
              Jiunge na jukwaa la kisasa
              linalowaunganisha vijana
              na ajira, mafunzo,
              mikopo na fursa za
              maendeleo kupitia mfumo
              mmoja wenye uwazi na
              urahisi wa matumizi.
            </p>
          </div>
        </div>

        {/* BOTTOM CARDS */}
        <div
          className="
            relative z-10

            grid gap-4
          "
        >
          {[
            {
              title: "Ajira & Fursa",
              icon: BriefcaseBusiness,
            },

            {
              title: "Mafunzo ya Kisasa",
              icon: GraduationCap,
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  flex items-center gap-4

                  rounded-3xl

                  border border-white/10

                  bg-white/10

                  p-5

                  backdrop-blur-xl
                "
              >
                <div
                  className="
                    flex size-12
                    items-center
                    justify-center

                    rounded-2xl

                    bg-white/10
                  "
                >
                  <Icon
                    className="
                      size-6
                    "
                  />
                </div>

                <div>
                  <h3
                    className="
                      font-semibold
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-1 text-sm
                      text-white/70
                    "
                  >
                    Mfumo wa kisasa wa
                    maendeleo kwa vijana.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ====================================================== */}
      {/* RIGHT SIDE */}
      {/* ====================================================== */}

      <div
        className="
          relative flex flex-1
          items-center
          justify-center

          px-5 py-10

          sm:px-8
          lg:px-12
        "
      >
        <div
          className="
            w-full max-w-md
          "
        >
          {/* MOBILE LOGO */}
          <div
            className="
              mb-8 flex
              items-center justify-center

              lg:hidden
            "
          >
            <Link
              href="/"
              className="
                flex items-center gap-3
              "
            >
              <div
                className="
                  flex size-12
                  items-center
                  justify-center

                  rounded-2xl

                  bg-primary

                  text-white

                  shadow-lg
                "
              >
                <ShieldCheck
                  className="
                    size-6
                  "
                />
              </div>

              <div>
                <h2
                  className="
                    text-lg font-bold
                  "
                >
                  Mlele DC
                </h2>

                <p
                  className="
                    text-sm text-muted-foreground
                  "
                >
                  Fursa Portal
                </p>
              </div>
            </Link>
          </div>

          {/* AUTH CARD */}
          <div
            className="
              relative overflow-hidden

              rounded-[32px]

              border border-border/60

              bg-background/80

              shadow-2xl

              backdrop-blur-2xl
            "
          >
            {/* TOP GLOW */}
            <div
              className="
                absolute inset-x-0 top-0

                h-40

                bg-linear-to-b
                from-primary/10
                to-transparent
              "
            />

            <div
              className="
                relative z-10

                p-8 sm:p-10
              "
            >
              {/* HEADER */}
              <div className="text-center">
                <div
                  className="
                    mx-auto flex size-16
                    items-center
                    justify-center

                    rounded-3xl

                    bg-primary/10

                    text-primary
                  "
                >
                  <ShieldCheck
                    className="
                      size-8
                    "
                  />
                </div>

                <h1
                  className="
                    mt-6

                    text-3xl
                    font-black
                    tracking-tight
                  "
                >
                  {title}
                </h1>

                <p
                  className="
                    mt-3

                    text-sm leading-relaxed

                    text-muted-foreground
                  "
                >
                  {subtitle}
                </p>
              </div>

              {/* FORM CONTENT */}
              <div className="mt-8">
                {children}
              </div>

              {/* FOOTER */}
              <div
                className="
                  mt-8

                  border-t border-border/60

                  pt-6
                "
              >
                <p
                  className="
                    text-center text-xs

                    text-muted-foreground
                  "
                >
                  © {new Date().getFullYear()}{" "}
                  Mlele DC Fursa Portal.
                  Haki zote zimehifadhiwa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

