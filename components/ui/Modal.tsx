"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

export default function Modal({
  title,
  open,
  onClose,
  children,
  size = "md",
}: ModalProps) {
  if (!open) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/40
        px-4
      "
    >
      <div
        className={`
          relative w-full ${sizeClasses[size]}
          max-h-[90vh] overflow-y-auto
          rounded-xl shadow-xl
          card border-default
          animate-in fade-in zoom-in-95
        `}
      >
        {/* HEADER */}
        <div
          className="
            sticky top-0 z-10
            flex items-center justify-between
            px-6 py-4
            border-b border-default
            bg-inherit
          "
        >
          <h2 className="text-lg font-semibold text-(--text-primary)">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              rounded-md p-1
              opacity-70 hover:opacity-100
              bg-black/5
              focus:outline-none
              focus:ring-2 focus:ring-(--btn-focus)
              transition
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 opacity-90">
          {children}
        </div>
      </div>
    </div>
  );
}
