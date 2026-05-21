
import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        `
        field-sizing-content

        flex min-h-24 w-full

        rounded-xl

        border border-input

        bg-background

        px-3 py-2

        text-sm

        shadow-sm

        transition-all

        outline-none

        placeholder:text-muted-foreground

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

        resize-y
      `,
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };

