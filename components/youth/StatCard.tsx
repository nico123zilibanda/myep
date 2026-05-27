"use client";

import {
  ReactNode,
  useEffect,
  useState,
} from "react";

import {
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

import clsx from "clsx";

import {
  Card,
  CardContent,
} from "@/components/ui/Card";

import { Skeleton } from "@/components/ui/Skeleton";

/* ================= TYPES ================= */

interface Props {
  title: string;

  value: string;

  icon: ReactNode;

  loading?: boolean;

  trendLabel?: string;

  className?: string;
}

/* ================= COMPONENT ================= */

export default function StatCard({
  title,
  value,
  icon,
  loading = false,
  trendLabel = "Inaendelea",
  className,
}: Props) {
  /* ================= COUNTER ================= */

  const [displayValue, setDisplayValue] =
    useState("0");

  useEffect(() => {
    if (loading) return;

    let start = 0;

    const end =
      Number(value) || 0;

    const duration = 800;

    const increment =
      end > 0
        ? Math.ceil(end / 35)
        : 1;

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setDisplayValue(String(end));

        clearInterval(timer);
      } else {
        setDisplayValue(
          String(start)
        );
      }
    }, duration / 35);

    return () =>
      clearInterval(timer);
  }, [value, loading]);

  /* ================= UI ================= */

  return (
    <Card
      className={clsx(
        `
          group relative overflow-hidden

          rounded-[28px]

          border border-border/60

          bg-background/80

          backdrop-blur-xl

          transition-all duration-500

          hover:-translate-y-1.5
          hover:border-primary/20
          hover:shadow-2xl
          hover:shadow-primary/5
        `,
        className
      )}
    >
      {/* ================= BACKGROUND EFFECTS ================= */}

      {/* PRIMARY GLOW */}
      <div
        className="
          absolute -right-10 -top-10

          h-40 w-40

          rounded-full

          bg-primary/10

          blur-3xl

          transition-all duration-500

          group-hover:scale-125
          group-hover:opacity-100
        "
      />

      {/* SECONDARY GLOW */}
      <div
        className="
          absolute -bottom-10 -left-10

          h-32 w-32

          rounded-full

          bg-indigo-500/10

          blur-3xl

          opacity-0

          transition-all duration-500

          group-hover:opacity-100
        "
      />

      {/* TOP SHINE */}
      <div
        className="
          absolute inset-x-0 top-0

          h-px

          bg-linear-to-r
          from-transparent
          via-white/40
          to-transparent
        "
      />

      {/* ================= CONTENT ================= */}

      <CardContent className="relative z-10 p-6">
        <div className="flex items-start justify-between gap-4">
          {/* ================= LEFT ================= */}

          <div className="flex-1">
            {/* ICON */}
            <div
              className="
                mb-5

                flex size-14 items-center justify-center

                rounded-2xl

                border border-primary/10

                bg-linear-to-br
                from-primary/15
                to-primary/5

                text-primary

                shadow-sm

                transition-all duration-500

                group-hover:scale-110
                group-hover:rotate-3
              "
            >
              {icon}
            </div>

            {/* TITLE */}
            <p
              className="
                text-sm
                font-medium

                text-muted-foreground
              "
            >
              {title}
            </p>

            {/* VALUE */}
            {loading ? (
              <div className="mt-3 space-y-2">
                <Skeleton
                  className="
                    h-10 w-28

                    rounded-xl
                  "
                />

                <Skeleton
                  className="
                    h-4 w-24

                    rounded-lg
                  "
                />
              </div>
            ) : (
              <>
                <h3
                  className="
                    mt-2

                    text-4xl
                    font-bold
                    tracking-tight

                    text-foreground
                  "
                >
                  {displayValue}
                </h3>

                {/* SMALL INFO */}
                <div
                  className="
                    mt-3

                    flex items-center gap-2

                    text-xs
                    text-muted-foreground
                  "
                >
                  <TrendingUp className="size-3.5 text-emerald-500" />

                  Mfumo unaendelea vizuri
                </div>
              </>
            )}
          </div>

          {/* ================= STATUS ================= */}

          {!loading && (
            <div
              className="
                flex items-center gap-1.5

                rounded-full

                border border-emerald-500/10

                bg-emerald-500/10

                px-3 py-1.5

                text-[11px]
                font-semibold

                text-emerald-600

                backdrop-blur-sm

                dark:text-emerald-400
              "
            >
              <ArrowUpRight
                className="size-3.5"
              />

              {trendLabel}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}