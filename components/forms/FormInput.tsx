
"use client";

import * as React from "react";

import { AlertCircle } from "lucide-react";

import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import translate from "@/lib/i18n/translate";

import type { MessageKey } from "@/lib/messages";

interface InputProps {
  label?: string;
  labelKey?: MessageKey;

  description?: string;

  name: string;

  type?: string;

  value: string | number;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;

  placeholder?: string;
  placeholderKey?: MessageKey;

  required?: boolean;
  disabled?: boolean;

  error?: string;

  className?: string;

  inputClassName?: string;
}

export default function FormInput({
  label,
  labelKey,

  description,

  name,

  type = "text",

  value,
  onChange,

  placeholder,
  placeholderKey,

  required = false,
  disabled = false,

  error,

  className,
  inputClassName,
}: InputProps) {
  const { lang } = useLanguage();

  /* ================= LABEL ================= */

  const finalLabel = labelKey
    ? translate(labelKey, lang)
    : label;

  /* ================= PLACEHOLDER ================= */

  const finalPlaceholder =
    placeholderKey
      ? translate(
          placeholderKey,
          lang,
        )
      : placeholder;

  /* ================= UI ================= */

  return (
    <div
      data-slot="form-input"
      className={cn(
        "space-y-2",
        className,
      )}
    >
      {/* LABEL */}
      {finalLabel && (
        <div className="space-y-1">
          <label
            htmlFor={name}
            className="
              inline-flex items-center gap-1

              text-sm
              font-medium
            "
          >
            {finalLabel}

            {required && (
              <span className="text-destructive">
                *
              </span>
            )}
          </label>

          {description && (
            <p
              className="
                text-xs
                text-muted-foreground
              "
            >
              {description}
            </p>
          )}
        </div>
      )}

      {/* INPUT */}
      <div className="relative">
        <Input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={
            finalPlaceholder
          }
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          className={cn(
            `
            h-11

            pr-10
          `,
            error &&
              `
              border-destructive

              focus-visible:ring-destructive/20
            `,
            inputClassName,
          )}
        />

        {/* ERROR ICON */}
        {error && (
          <AlertCircle
            className="
              pointer-events-none

              absolute right-3 top-1/2

              size-4

              -translate-y-1/2

              text-destructive
            "
          />
        )}
      </div>

      {/* ERROR */}
      {error && (
        <div
          className="
            flex items-center gap-1.5

            text-xs
            text-destructive
          "
        >
          <AlertCircle className="size-3.5" />

          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

