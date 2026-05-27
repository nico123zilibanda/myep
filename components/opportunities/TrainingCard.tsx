"use client";

import Link from "next/link";

import {
ArrowUpRight,
BookOpen,
FileText,
PlayCircle,
Sparkles,
} from "lucide-react";

import {
Card,
CardContent,
CardFooter,
} from "@/components/ui/Card";

import {
Badge,
} from "@/components/ui/badge";

import {
Button,
} from "@/components/ui/button";

import { Skeleton } from "@/components/ui/Skeleton";

/* ================= TYPES ================= */

interface TrainingCardProps {
id?: number | string;

title: string;

type:
| "Article"
| "Video"
| "PDF";

description: string;

loading?: boolean;
}

/* ================= TYPE CONFIG ================= */

const typeConfig = {
Article: {
icon: BookOpen,
label: "Article",


badgeClass:
  `
    bg-emerald-500/10
    text-emerald-600

    hover:bg-emerald-500/10

    dark:text-emerald-400
  `,


},

Video: {
icon: PlayCircle,
label: "Video",


badgeClass:
  `
    bg-blue-500/10
    text-blue-600

    hover:bg-blue-500/10

    dark:text-blue-400
  `,


},

PDF: {
icon: FileText,
label: "PDF",


badgeClass:
  `
    bg-orange-500/10
    text-orange-600

    hover:bg-orange-500/10

    dark:text-orange-400
  `,


},
};

/* ================= COMPONENT ================= */

export default function TrainingCard({
id,
title,
type,
description,
loading = false,
}: TrainingCardProps) {
const config =
typeConfig[type];

const Icon =
config.icon;

/* ================= LOADING ================= */

if (loading) {
return ( <Card
     className="
       rounded-3xl
       border-border/60
     "
   > <CardContent className="space-y-5 p-6"> <div className="flex items-center justify-between"> <Skeleton className="h-6 w-28 rounded-full" />


        <Skeleton className="size-10 rounded-2xl" />
      </div>

      <Skeleton className="h-7 w-3/4 rounded-xl" />

      <Skeleton className="h-16 w-full rounded-2xl" />

      <Skeleton className="h-10 w-full rounded-2xl" />
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

    flex h-full flex-col justify-between

    rounded-3xl

    border-border/60

    transition-all duration-300

    hover:-translate-y-1
    hover:shadow-xl
  "
>
  {/* GLOW */}
  <div
    className="
      absolute right-0 top-0

      h-32 w-32

      translate-x-1/3 -translate-y-1/3

      rounded-full

      bg-primary/10

      blur-3xl
    "
  />

  {/* CONTENT */}
  <CardContent
    className="
      relative z-10

      space-y-5

      p-6
    "
  >
    {/* TOP */}
    <div className="flex items-start justify-between gap-4">
      {/* TYPE */}
      <Badge
        className={`
          rounded-full border-0

          px-3 py-1

          ${config.badgeClass}
        `}
      >
        <Icon className="mr-1 size-3.5" />

        {config.label}
      </Badge>

      {/* ICON */}
      <div
        className="
          flex size-12 items-center justify-center

          rounded-2xl

          bg-primary/10

          text-primary

          transition-transform duration-300

          group-hover:scale-110
          group-hover:rotate-3
        "
      >
        <Icon className="size-5" />
      </div>
    </div>

    {/* TITLE */}
    <div className="space-y-3">
      <h3
        className="
          line-clamp-2

          text-xl
          font-semibold
          tracking-tight

          transition-colors

          group-hover:text-primary
        "
      >
        {title}
      </h3>

      <p
        className="
          line-clamp-4

          text-sm
          leading-relaxed

          text-muted-foreground
        "
      >
        {description}
      </p>
    </div>

    {/* INFO */}
    <div
      className="
        inline-flex items-center gap-2

        rounded-full

        border

        bg-background/80

        px-3 py-1.5

        text-xs
        font-medium

        backdrop-blur
      "
    >
      <Sparkles className="size-3.5 text-primary" />

      Mafunzo kwa Vijana
    </div>
  </CardContent>

  {/* FOOTER */}
  <CardFooter
    className="
      relative z-10

      border-t

      px-6 py-4
    "
  >
    <Button
      asChild
      className="
        w-full

        rounded-2xl
      "
    >
      <Link
        href={
          id
            ? `/youth/trainings/${id}`
            : "#"
        }
      >
        Soma Zaidi

        <ArrowUpRight className="ml-2 size-4" />
      </Link>
    </Button>
  </CardFooter>
</Card>


);
}
