"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import translate from "@/lib/i18n/translate";
import type { MessageKey } from "@/lib/messages";

interface InputProps {
  label?: string;
  labelKey?: MessageKey;

  name: string;
  type?: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  placeholder?: string;
  placeholderKey?: MessageKey;

  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export default function FormInput({
  label,
  labelKey,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  placeholderKey,
  required = false,
  disabled = false,
  error,
  className = "",
}: InputProps) {
  const { lang } = useLanguage();

  const finalLabel = labelKey
    ? translate(labelKey, lang)
    : label;

  const finalPlaceholder = placeholderKey
    ? translate(placeholderKey, lang)
    : placeholder;

  return (
    <div className="flex flex-col gap-1.5">
      {/* LABEL */}
      {finalLabel && (
        <label
          htmlFor={name}
          className="
            text-sm font-medium
            text-[--text-primary]
          "
        >
          {finalLabel}

          {required && (
            <span className="text-red-500 ml-0.5">
              *
            </span>
          )}
        </label>
      )}

      {/* INPUT */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={finalPlaceholder}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        className={`
          w-full rounded-xl
          border border-[--border]
          bg-[--card]
          px-4 py-2.5 text-sm
          text-[--foreground]
          transition-all duration-200
          focus:outline-none
          focus:ring-2 focus:ring-[--btn-focus]
          disabled:opacity-50
          disabled:cursor-not-allowed
          ${error ? "border-red-500 focus:ring-red-500" : ""}
          ${className}
        `}
      />

      {/* ERROR */}
      {error && (
        <span className="text-xs text-red-600">
          {error}
        </span>
      )}
    </div>
  );
}