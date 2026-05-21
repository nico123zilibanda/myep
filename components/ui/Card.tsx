
import * as React from "react";

import { cn } from "@/lib/utils";

/* ================= CARD ================= */

function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card"
      className={cn(
        `
        rounded-3xl

        border border-border/60

        bg-card

        text-card-foreground

        shadow-sm

        transition-colors
      `,
        className,
      )}
      {...props}
    />
  );
}

/* ================= HEADER ================= */

function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        `
        flex flex-col gap-1.5

        p-6
      `,
        className,
      )}
      {...props}
    />
  );
}

/* ================= TITLE ================= */

function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        `
        text-lg
        font-semibold
        tracking-tight
      `,
        className,
      )}
      {...props}
    />
  );
}

/* ================= DESCRIPTION ================= */

function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        `
        text-sm
        text-muted-foreground
      `,
        className,
      )}
      {...props}
    />
  );
}

/* ================= CONTENT ================= */

function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        `
        p-6 pt-0
      `,
        className,
      )}
      {...props}
    />
  );
}

/* ================= FOOTER ================= */

function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        `
        flex items-center

        p-6 pt-0
      `,
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};

