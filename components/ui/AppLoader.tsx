
"use client";

import { LoaderCircle } from "lucide-react";

interface AppLoaderProps {
  text?: string;
  fullscreen?: boolean;
}

export default function AppLoader({
  text = "Loading...",
  fullscreen = true,
}: AppLoaderProps) {
  return (
    <div
      className={`
        ${
          fullscreen
            ? "fixed inset-0 z-9999"
            : "relative min-h-50"
        }

        flex items-center justify-center

        bg-background/90
        backdrop-blur-sm
      `}
    >
      <div
        className="
          flex flex-col items-center gap-4

          rounded-3xl

          border border-border/60

          bg-card/80

          px-8 py-7

          shadow-xl

          backdrop-blur
        "
      >
        {/* SPINNER */}
        <div
          className="
            flex size-14 items-center justify-center

            rounded-2xl

            bg-primary/10
          "
        >
          <LoaderCircle
            className="
              size-7

              animate-spin

              text-primary
            "
          />
        </div>

        {/* TEXT */}
        <div className="space-y-1 text-center">
          <p className="text-sm font-medium">
            {text}
          </p>

          <p
            className="
              text-xs
              text-muted-foreground
            "
          >
            Please wait a moment
          </p>
        </div>
      </div>
    </div>
  );
}

