
"use client";

import { ReactNode, useEffect } from "react";

import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;

  children: ReactNode;

  size?: "sm" | "md" | "lg" | "xl";

  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;

  description?: string;

  footer?: ReactNode;

  className?: string;
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
};

export default function Modal({
  title,
  open,
  onClose,

  children,

  size = "md",

  closeOnOutsideClick = true,
  showCloseButton = true,

  description = "Taarifa Hapa Chini",

  footer,

  className,
}: ModalProps) {
  /* ================= ESC CLOSE ================= */

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEsc,
      );
    };
  }, [open, onClose]);

  /* ================= BODY SCROLL ================= */

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  /* ================= EARLY RETURN ================= */

  if (!open) return null;

  /* ================= UI ================= */

  return (
    <div
      onClick={
        closeOnOutsideClick
          ? onClose
          : undefined
      }
      className="
        fixed inset-0 z-100

        flex items-center justify-center

        overflow-y-auto

        bg-black/60
        backdrop-blur-sm

        px-4 py-6
        sm:p-6

        animate-in fade-in duration-200
      "
    >
      {/* MODAL */}
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          `
            relative w-full

            overflow-hidden

            rounded-3xl

            border border-border/60

            bg-background

            shadow-2xl

            animate-in
            zoom-in-95
            slide-in-from-bottom-4
            duration-200
          `,
          sizeClasses[size],
          className,
        )}
      >
        {/* DECORATION */}
        <div
          className="
            pointer-events-none

            absolute right-0 top-0

            h-72 w-72

            translate-x-1/3 -translate-y-1/3

            rounded-full

            bg-primary/10

            blur-3xl
          "
        />

        {/* HEADER */}
        <div
          className="
            relative z-10

            flex items-start justify-between gap-4

            border-b border-border/60

            bg-background/95
            backdrop-blur

            px-5 py-4
            sm:px-6
          "
        >
          {/* TITLE */}
          <div className="space-y-1">
            <h2
              className="
                text-lg
                font-semibold
                tracking-tight
              "
            >
              {title}
            </h2>

            {description && (
              <p
                className="
                  text-sm
                  text-muted-foreground
                "
              >
                {description}
              </p>
            )}
          </div>

          {/* CLOSE */}
          {showCloseButton && (
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={onClose}
              className="
                shrink-0

                rounded-xl

                text-muted-foreground
                hover:text-foreground
              "
            >
              <X className="size-4" />
            </Button>
          )}
        </div>

        {/* BODY */}
        <div
          className="
            relative z-10

            max-h-[75vh]
            overflow-y-auto

            px-5 py-5
            sm:px-6 sm:py-6
          "
        >
          {children}
        </div>

        {/* FOOTER */}
        {footer && (
          <div
            className="
              relative z-10

              flex items-center justify-end gap-3

              border-t border-border/60

              bg-muted/30

              px-5 py-4
              sm:px-6
            "
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

