
import * as React from "react";

import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        `
        flex h-10 w-full min-w-0

        rounded-xl

        border border-input
        bg-background

        px-3 py-2

        text-sm

        shadow-sm

        transition-all

        outline-none

        file:inline-flex
        file:h-7
        file:border-0
        file:bg-transparent
        file:text-sm
        file:font-medium

        placeholder:text-muted-foreground

        disabled:pointer-events-none
        disabled:cursor-not-allowed
        disabled:opacity-50

        selection:bg-primary
        selection:text-primary-foreground

        focus-visible:border-ring
        focus-visible:ring-4
        focus-visible:ring-ring/20

        aria-invalid:border-destructive
        aria-invalid:ring-4
        aria-invalid:ring-destructive/20

        dark:bg-input/30
        dark:hover:bg-input/50
      `,
        className,
      )}
      {...props}
    />
  );
}

export { Input };

