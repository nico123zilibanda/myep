"use client";

import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
  footer?: ReactNode;
}

export default function Modal({
  title,
  open,
  onClose,
  children,
  size = "md",
  closeOnOutsideClick = true,
  showCloseButton = true,
  footer,
}: ModalProps) {
  // ✅ Close on ESC key
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
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  // ✅ Prevent background scroll
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

  if (!open) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
  };

  return (
    <div
      onClick={closeOnOutsideClick ? onClose : undefined}
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50 backdrop-blur-sm
        transition-opacity duration-300
        px-4
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative w-full ${sizeClasses[size]}
          max-h-[90vh] overflow-y-auto
          rounded-2xl shadow-2xl
          bg-white dark:bg-zinc-900
          border border-zinc-200 dark:border-zinc-800
          transform transition-all duration-300
          scale-100 opacity-100
        `}
      >
        {/* HEADER */}
        <div
          className="
            sticky top-0 z-10
            flex items-center justify-between
            px-6 py-4
            border-b border-zinc-200 dark:border-zinc-800
            bg-inherit
          "
        >
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            {title}
          </h2>

          {showCloseButton && (
            <button
              onClick={onClose}
              className="
                rounded-md p-1
                opacity-70 hover:opacity-100
                hover:bg-zinc-100 dark:hover:bg-zinc-800
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
                transition
              "
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-6 text-zinc-700 dark:text-zinc-300">
          {children}
        </div>

        {/* FOOTER (Optional) */}
        {footer && (
          <div
            className="
              px-6 py-4
              border-t border-zinc-200 dark:border-zinc-800
              bg-zinc-50 dark:bg-zinc-900
              flex justify-end gap-3
            "
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}