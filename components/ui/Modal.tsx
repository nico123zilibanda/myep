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
        bg-black/40 dark:bg-black/70
        px-4
      "
    >
      <div
        className={`
          relative w-full ${sizeClasses[size]}
          max-h-[90vh] overflow-y-auto
          rounded-xl shadow-xl
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-800
          animate-in fade-in zoom-in-95
        `}
      >
        {/* Header */}
        <div
          className="
            sticky top-0 z-10
            flex items-center justify-between
            px-6 py-4
            border-b border-gray-200 dark:border-gray-800
            bg-white dark:bg-gray-900
          "
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              rounded-md p-1
              text-gray-500 hover:text-gray-700
              dark:text-gray-400 dark:hover:text-gray-200
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-gray-700 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
}
