"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { MessageKey } from "@/lib/messages";
import translate from "@/lib/i18n/translate";

interface Option {
  value: string | number;
  label?: string;          // normal label
  labelKey?: MessageKey;   // translated label
}

interface FormSelectProps {
  labelKey: MessageKey;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholderKey?: MessageKey;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

export default function FormSelect({
  labelKey,
  name,
  value,
  onChange,
  options,
  placeholderKey,
  required = false,
  error,
  disabled = false,
}: FormSelectProps) {
  const { lang } = useLanguage();

  return (
    <div className="flex flex-col gap-1.5">
      {/* LABEL */}
      <label
        htmlFor={name}
        className="text-sm font-medium text-(--text-primary)"
      >
        {translate(labelKey, lang)}
        {required && <span className="text-red-600 ml-0.5">*</span>}
      </label>

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
        {placeholderKey && (
          <option value="">
            {translate(placeholderKey, lang)}
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