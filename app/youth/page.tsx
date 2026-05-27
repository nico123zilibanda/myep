"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Info,
  MessageCircle,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Clock3,
} from "lucide-react";

import Link from "next/link";

import StatCard from "@/components/youth/StatCard";

import {
  Card,
  CardContent,
} from "@/components/ui/Card";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/Alert";

import { Skeleton } from "@/components/ui/Skeleton";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

/* ================= TYPES ================= */

interface DashboardStats {
  opportunities: number;
  trainings: number;
  questions: number;
}

interface User {
  name: string;
}

/* ================= GREETING ================= */

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Habari za Asubuhi";
  }

  if (hour < 18) {
    return "Habari za Mchana";
  }

  return "Habari za Jioni";
}

/* ================= COMPONENT ================= */

export default function YouthDashboard() {
  const [stats, setStats] =
    useState<DashboardStats | null>(
      null
    );

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  /* ================= FETCH ================= */

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsRes, userRes] =
          await Promise.all([
            fetch(
              "/api/youth/dashboard/stats"
            ),
            fetch("/api/youth/me"),
          ]);

        const statsData =
          await statsRes.json();

        const userData =
          await userRes.json();

        setStats(statsData);

        setUser(userData);
      } catch (error) {
        console.error(
          "Dashboard load error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /* ================= DATE ================= */

  const today = useMemo(() => {
    return new Date().toLocaleDateString(
      "sw-TZ",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  }, []);

  /* ================= UI ================= */

  return (
    <div className="space-y-8">
      {/* ================= HERO ================= */}

      <section
        className="
          relative overflow-hidden

          rounded-[32px]

          border border-border/60

          bg-linear-to-br
          from-primary/12
          via-background
          to-indigo-500/4

          p-6 sm:p-8 lg:p-10

          shadow-sm
        "
      >
        {/* GLOW */}
        <div
          className="
            absolute -right-10 -top-10

            h-64 w-64

            rounded-full

            bg-primary/10

            blur-3xl
          "
        />

        <div
          className="
            absolute -bottom-16 left-0

            h-56 w-56

            rounded-full

            bg-indigo-500/10

            blur-3xl
          "
        />

        {/* GRID */}
        <div
          className="
            relative z-10

            flex flex-col gap-8

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* LEFT */}
          <div className="max-w-3xl">
            {/* BADGE */}
            <Badge
              variant="secondary"
              className="
                mb-5

                rounded-full

                border border-primary/10

                bg-background/70

                px-4 py-1.5

                text-xs
                font-semibold

                backdrop-blur-sm
              "
            >
              <Sparkles className="mr-2 size-3.5 text-primary" />

              Mfumo wa Vijana wa Mlele DC
            </Badge>

            {/* TITLE */}
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-72 rounded-2xl" />

                <Skeleton className="h-5 w-full max-w-xl rounded-xl" />
              </div>
            ) : (
              <>
                <h1
                  className="
                    text-3xl
                    font-black
                    tracking-tight

                    sm:text-4xl
                    xl:text-5xl
                  "
                >
                  {getGreeting()},{" "}
                  <span className="text-primary">
                    {user?.name ??
                      "Kijana"}
                  </span>{" "}
                  👋
                </h1>

                <p
                  className="
                    mt-5

                    max-w-2xl

                    text-sm
                    leading-relaxed
                    text-muted-foreground

                    sm:text-base
                  "
                >
                  Karibu kwenye
                  dashibodi yako ya
                  fursa, mafunzo, na
                  maendeleo ya vijana.
                  Endelea kufuatilia
                  taarifa muhimu na
                  nafasi mpya
                  zinazopatikana kila
                  siku.
                </p>
              </>
            )}

            {/* ACTIONS */}
            <div
              className="
                mt-7

                flex flex-wrap items-center gap-3
              "
            >
              <Button
                asChild
                size="lg"
                className="
                  rounded-2xl
                "
              >
                <Link href="/youth/opportunities">
                  Angalia Fursa

                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="
                  rounded-2xl
                "
              >
                <Link href="/youth/trainings">
                  Mafunzo
                </Link>
              </Button>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
              grid grid-cols-2 gap-4

              lg:w-[320px]
            "
          >
            <div
              className="
                rounded-3xl

                border border-border/60

                bg-background/70

                p-5

                backdrop-blur-xl
              "
            >
              <div
                className="
                  mb-3

                  flex size-11 items-center justify-center

                  rounded-2xl

                  bg-primary/10

                  text-primary
                "
              >
                <Clock3 className="size-5" />
              </div>

              <p
                className="
                  text-xs
                  text-muted-foreground
                "
              >
                Leo ni
              </p>

              <h3
                className="
                  mt-2

                  text-sm
                  font-semibold
                  leading-relaxed
                "
              >
                {today}
              </h3>
            </div>

            <div
              className="
                rounded-3xl

                border border-border/60

                bg-background/70

                p-5

                backdrop-blur-xl
              "
            >
              <div
                className="
                  mb-3

                  flex size-11 items-center justify-center

                  rounded-2xl

                  bg-emerald-500/10

                  text-emerald-500
                "
              >
                <ShieldCheck className="size-5" />
              </div>

              <p
                className="
                  text-xs
                  text-muted-foreground
                "
              >
                Mfumo
              </p>

              <h3
                className="
                  mt-2

                  text-sm
                  font-semibold
                "
              >
                Unafanya kazi vizuri
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}

      <section>
        {/* HEADER */}
        <div
          className="
            mb-5

            flex flex-col gap-2

            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <h2
              className="
                text-xl
                font-bold
                tracking-tight
              "
            >
              Muhtasari wa Mfumo
            </h2>

            <p
              className="
                mt-1

                text-sm
                text-muted-foreground
              "
            >
              Takwimu muhimu za
              akaunti yako kwa sasa.
            </p>
          </div>

          <div
            className="
              flex items-center gap-2

              text-xs
              text-emerald-600

              dark:text-emerald-400
            "
          >
            <TrendingUp className="size-4" />

            Mfumo unaendelea vizuri
          </div>
        </div>

        {/* GRID */}
        <div
          className="
            grid grid-cols-1 gap-5

            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          <StatCard
            title="Fursa Zilizopo"
            value={String(
              stats?.opportunities ?? 0
            )}
            loading={loading}
            icon={
              <Briefcase className="size-5" />
            }
          />

          <StatCard
            title="Mafunzo"
            value={String(
              stats?.trainings ?? 0
            )}
            loading={loading}
            icon={
              <GraduationCap className="size-5" />
            }
          />

          <StatCard
            title="Maswali Yako"
            value={String(
              stats?.questions ?? 0
            )}
            loading={loading}
            icon={
              <MessageCircle className="size-5" />
            }
          />
        </div>
      </section>

      {/* ================= QUICK SECTION ================= */}

      <section
        className="
          grid grid-cols-1 gap-5

          xl:grid-cols-3
        "
      >
        {/* LEFT */}
        <div className="xl:col-span-2">
          <Alert
            className="
              rounded-[28px]

              border-primary/10

              bg-primary/3
            "
          >
            <Info className="size-5" />

            <div>
              <AlertTitle>
                Kumbuka Muhimu
              </AlertTitle>

              <AlertDescription
                className="
                  mt-2

                  leading-relaxed
                "
              >
                Baadhi ya fursa ndani
                ya mfumo huu
                zinahitaji kufuata
                maelekezo maalum ya
                maombi. Hakikisha
                unasoma maelezo ya
                kila tangazo kabla ya
                kuwasiliana au
                kushiriki.
              </AlertDescription>
            </div>
          </Alert>
        </div>

        {/* RIGHT */}
        <Card
          className="
            rounded-[28px]

            border-border/60
          "
        >
          <CardContent className="p-6">
            <div
              className="
                flex size-12 items-center justify-center

                rounded-2xl

                bg-primary/10

                text-primary
              "
            >
              <Sparkles className="size-5" />
            </div>

            <h3
              className="
                mt-5

                text-lg
                font-bold
              "
            >
              Ushauri wa Leo
            </h3>

            <p
              className="
                mt-3

                text-sm
                leading-relaxed
                text-muted-foreground
              "
            >
              Tembelea mfumo mara kwa
              mara ili kuona fursa
              mpya, mafunzo, na
              matangazo muhimu
              yanayoongezwa kila siku.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* ================= INFO CARDS ================= */}

      <section
        className="
          grid grid-cols-1 gap-5

          lg:grid-cols-2
        "
      >
        {/* CARD 1 */}
        <Card
          className="
            group

            rounded-[28px]

            border-border/60

            transition-all duration-300

            hover:-translate-y-1
            hover:shadow-xl
          "
        >
          <CardContent className="p-6">
            <div
              className="
                flex size-12 items-center justify-center

                rounded-2xl

                bg-indigo-500/10

                text-indigo-500
              "
            >
              <GraduationCap className="size-5" />
            </div>

            <h3
              className="
                mt-5

                text-lg
                font-bold
              "
            >
              Mafunzo na Elimu
            </h3>

            <p
              className="
                mt-3

                text-sm
                leading-relaxed
                text-muted-foreground
              "
            >
              Endelea kujifunza kupitia
              mafunzo yanayowekwa ndani
              ya mfumo ili kuongeza
              uwezo wako wa kitaaluma
              na ajira.
            </p>
          </CardContent>
        </Card>

        {/* CARD 2 */}
        <Card
          className="
            group

            rounded-[28px]

            border-border/60

            transition-all duration-300

            hover:-translate-y-1
            hover:shadow-xl
          "
        >
          <CardContent className="p-6">
            <div
              className="
                flex size-12 items-center justify-center

                rounded-2xl

                bg-emerald-500/10

                text-emerald-500
              "
            >
              <Briefcase className="size-5" />
            </div>

            <h3
              className="
                mt-5

                text-lg
                font-bold
              "
            >
              Fursa za Ajira
            </h3>

            <p
              className="
                mt-3

                text-sm
                leading-relaxed
                text-muted-foreground
              "
            >
              Chunguza nafasi mpya za
              kazi, mafunzo kwa vitendo,
              pamoja na miradi ya
              maendeleo inayowekwa kila
              siku.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* ================= LOADING ================= */}

      {loading && (
        <div
          className="
            flex items-center justify-center

            py-2
          "
        >
          <p
            className="
              text-sm
              text-muted-foreground
            "
          >
            Inapakia taarifa za
            dashibodi...
          </p>
        </div>
      )}
    </div>
  );
}