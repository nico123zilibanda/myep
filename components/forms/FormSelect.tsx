"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { MessageKey } from "@/lib/messages";
import translate from "@/lib/i18n/translate";

interface Option {
  value: string | number;
  label?: string;
  labelKey?: MessageKey;
}

interface FormSelectProps {
  label?: string; // normal text
  labelKey?: MessageKey; // translated text

  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

  options: Option[];

  placeholder?: string;
  placeholderKey?: MessageKey;

  required?: boolean;
  error?: string;
  disabled?: boolean;
}

export default function FormSelect({
  label,
  labelKey,
  name,
  value,
  onChange,
  options,
  placeholder,
  placeholderKey,
  required = false,
  error,
  disabled = false,
}: FormSelectProps) {
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
          className="text-sm font-medium text-(--text-primary)"
        >
          {finalLabel}
          {required && (
            <span className="text-red-600 ml-0.5">*</span>
          )}
        </label>
      )}

      {/* SELECT */}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={!!error}
        className={`
          w-full rounded-xl
          border border-(--border)
          bg-(--card)
          px-4 py-2.5 text-sm
          text-(--foreground)
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-(--btn-focus)
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? "border-red-500 focus:ring-red-500" : ""}
        `}
      >
        {/* PLACEHOLDER */}
        {finalPlaceholder && (
          <option value="">
            {finalPlaceholder}
          </option>
        )}

        {/* OPTIONS */}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.labelKey
              ? translate(opt.labelKey, lang)
              : opt.label}
          </option>
        ))}
      </select>

      {/* ERROR */}
      {error && (
        <span className="text-xs text-red-600">
          {error}
        </span>
      )}
    </div>
  );
}