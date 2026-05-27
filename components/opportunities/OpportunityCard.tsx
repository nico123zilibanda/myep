
"use client";

import Link from "next/link";

import {
  ArrowUpRight,
  Bookmark,
  Calendar,
  Clock3,
  ExternalLink,
  FileText,
  Folder,
  MapPin,
  Sparkles,
  Video,
} from "lucide-react";

import clsx from "clsx";

import { Opportunity } from "@/types/opportunity";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/Skeleton";

/* ================= TYPES ================= */

interface OpportunityCardProps {
  opportunity: Opportunity;

  onToggleSave: (
    id: number,
    isSaved: boolean
  ) => void;

  onViewResource?: (
    op: Opportunity
  ) => void;

  loading?: boolean;
}

/* ================= COMPONENT ================= */

export default function OpportunityCard({
  opportunity,
  onToggleSave,
  onViewResource,
  loading = false,
}: OpportunityCardProps) {
  const deadline = new Date(
    opportunity.deadline
  );

  const isExpired =
    deadline < new Date();

  /* ================= RESOURCE ================= */

  const hasResource =
    Boolean(opportunity.resourceType) &&
    Boolean(opportunity.resourceUrl);

  const resourceType =
    opportunity.resourceType;

  const resourceMap = {
    VIDEO: {
      icon: <Video className="size-4" />,
      label: "Video",
      color:
        "bg-red-500/10 text-red-500 border-red-500/20",
    },

    PDF: {
      icon: <FileText className="size-4" />,
      label: "PDF",
      color:
        "bg-orange-500/10 text-orange-500 border-orange-500/20",
    },

    LINK: {
      icon: (
        <ExternalLink className="size-4" />
      ),
      label: "Link",
      color:
        "bg-blue-500/10 text-blue-500 border-blue-500/20",
    },
  } as const;

  const resource =
    hasResource && resourceType
      ? resourceMap[resourceType]
      : null;

  /* ================= DATE FORMAT ================= */

  const formattedDeadline =
    deadline.toLocaleDateString(
      "sw-TZ",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <Card
        className="
          overflow-hidden

          rounded-[28px]

          border-border/60
        "
      >
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* TOP */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-7 w-28 rounded-full" />

              <Skeleton className="h-7 w-24 rounded-full" />
            </div>

            {/* TITLE */}
            <div className="space-y-3">
              <Skeleton className="h-8 w-4/5 rounded-2xl" />

              <Skeleton className="h-4 w-full rounded-xl" />

              <Skeleton className="h-4 w-5/6 rounded-xl" />
            </div>

            {/* META */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-1/2 rounded-xl" />

              <Skeleton className="h-5 w-2/3 rounded-xl" />
            </div>

            {/* BUTTONS */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 flex-1 rounded-2xl" />

              <Skeleton className="h-10 w-28 rounded-2xl" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ================= UI ================= */

  return (
    <Card
      className="
        group

        relative overflow-hidden

        rounded-[30px]

        border-border/60

        bg-background/90

        backdrop-blur-xl

        transition-all duration-500

        hover:-translate-y-2
        hover:border-primary/20
        hover:shadow-2xl
        hover:shadow-primary/10
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute right-0 top-0

          h-40 w-40

          translate-x-1/3 -translate-y-1/3

          rounded-full

          bg-primary/10

          blur-3xl

          opacity-0

          transition-opacity duration-500

          group-hover:opacity-100
        "
      />

      {/* TOP STRIP */}
      <div
        className="
          absolute inset-x-0 top-0

          h-1

          bg-linear-to-r
          from-primary
          via-indigo-500
          to-primary/70

          opacity-80
        "
      />

      <div className="relative z-10 flex h-full flex-col">
        {/* ================= CONTENT ================= */}

        <CardContent className="flex-1 p-6">
          {/* BADGES */}
          <div className="flex items-start justify-between gap-3">
            <Badge
              variant="secondary"
              className="
                rounded-full

                border-0

                bg-primary/10
                px-3 py-1

                text-primary
              "
            >
              <Folder className="mr-1 size-3.5" />

              {opportunity.Category?.name ||
                "Bila Kundi"}
            </Badge>

            <Badge
              className={clsx(
                `
                  rounded-full

                  border-0

                  px-3 py-1
                `,
                isExpired
                  ? `
                    bg-red-500/10
                    text-red-500
                  `
                  : `
                    bg-emerald-500/10
                    text-emerald-600
                    dark:text-emerald-400
                  `
              )}
            >
              <Clock3 className="mr-1 size-3.5" />

              {isExpired
                ? "Imefungwa"
                : "Inaendelea"}
            </Badge>
          </div>

          {/* RESOURCE */}
          {resource && (
            <div className="mt-5">
              <div
                className={clsx(
                  `
                    inline-flex items-center gap-2

                    rounded-full
                    border

                    px-3 py-1.5

                    text-xs
                    font-semibold
                  `,
                  resource.color
                )}
              >
                {resource.icon}

                {resource.label}
              </div>
            </div>
          )}

          {/* TITLE */}
          <div className="mt-5 space-y-3">
            <h3
              className="
                line-clamp-2

                text-xl
                font-bold
                tracking-tight

                transition-colors duration-300

                group-hover:text-primary
              "
            >
              {opportunity.title}
            </h3>

            <p
              className="
                line-clamp-3

                text-sm
                leading-7
                text-muted-foreground
              "
            >
              {opportunity.description}
            </p>
          </div>

          {/* META */}
          <div className="mt-6 space-y-3">
            {/* LOCATION */}
            <div
              className="
                flex items-center gap-3

                rounded-2xl

                bg-muted/40

                px-3 py-2.5
              "
            >
              <div
                className="
                  flex size-9 items-center justify-center

                  rounded-xl

                  bg-background

                  shadow-sm
                "
              >
                <MapPin className="size-4 text-primary" />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="
                    text-[11px]
                    font-medium
                    uppercase
                    tracking-wide
                    text-muted-foreground
                  "
                >
                  Eneo
                </p>

                <p
                  className="
                    truncate

                    text-sm
                    font-medium
                  "
                >
                  {opportunity.location ||
                    "Haijabainishwa"}
                </p>
              </div>
            </div>

            {/* DEADLINE */}
            <div
              className="
                flex items-center gap-3

                rounded-2xl

                bg-muted/40

                px-3 py-2.5
              "
            >
              <div
                className="
                  flex size-9 items-center justify-center

                  rounded-xl

                  bg-background

                  shadow-sm
                "
              >
                <Calendar className="size-4 text-primary" />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="
                    text-[11px]
                    font-medium
                    uppercase
                    tracking-wide
                    text-muted-foreground
                  "
                >
                  Mwisho wa Maombi
                </p>

                <p
                  className="
                    text-sm
                    font-medium
                  "
                >
                  {formattedDeadline}
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        {/* ================= FOOTER ================= */}

        <CardFooter
          className="
            border-t border-border/60

            bg-muted/20

            px-6 py-5
          "
        >
          <div
            className="
              flex w-full flex-col gap-3

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* SAVE */}
            <Button
              size="sm"
              variant={
                opportunity.isSaved
                  ? "default"
                  : "secondary"
              }
              className="
                rounded-2xl

                px-4
              "
              onClick={() =>
                onToggleSave(
                  opportunity.id,
                  opportunity.isSaved
                )
              }
            >
              <Bookmark
                className={clsx(
                  `
                    size-4
                  `,
                  opportunity.isSaved &&
                    "fill-current"
                )}
              />

              {opportunity.isSaved
                ? "Imehifadhiwa"
                : "Hifadhi"}
            </Button>

            {/* ACTIONS */}
            <div className="flex items-center gap-2">
              {hasResource && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="
                    rounded-2xl
                  "
                  onClick={() =>
                    onViewResource?.(
                      opportunity
                    )
                  }
                >
                  <Sparkles className="size-4" />

                  Fungua
                </Button>
              )}

              <Button
                asChild
                size="sm"
                className="
                  rounded-2xl
                "
              >
                <Link
                  href={`/youth/opportunities/${opportunity.id}`}
                >
                  Maelezo

                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}

