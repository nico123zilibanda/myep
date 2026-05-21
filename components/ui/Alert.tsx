
import * as React from "react";

import { cn } from "@/lib/utils";

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "success"
    | "warning"
    | "destructive";
}

const variants = {
  default: `
    border-border
    bg-card
    text-card-foreground
  `,

  success: `
    border-green-500/20
    bg-green-500/10
    text-green-700

    dark:text-green-400
  `,

  warning: `
    border-yellow-500/20
    bg-yellow-500/10
    text-yellow-700

    dark:text-yellow-400
  `,

  destructive: `
    border-destructive/20
    bg-destructive/10
    text-destructive
  `,
};

function Alert({
  className,
  variant = "default",
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      data-slot="alert"
      className={cn(
        `
        relative w-full

        rounded-2xl

        border

        px-4 py-3

        text-sm

        shadow-sm
      `,
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

function AlertTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      data-slot="alert-title"
      className={cn(
        `
        mb-1

        font-medium
        leading-none
        tracking-tight
      `,
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        `
        text-sm
        opacity-90
      `,
        className,
      )}
      {...props}
    />
  );
}

export {
  Alert,
  AlertTitle,
  AlertDescription,
};

