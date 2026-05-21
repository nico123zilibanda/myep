
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import translate from "@/lib/i18n/translate";

import type { MessageKey } from "@/lib/messages";

interface Option {
  value: string | number;
  label?: string;
  labelKey?: MessageKey;
}

interface FormSelectProps {
  label?: string;
  labelKey?: MessageKey;

  name: string;

  value: string | number;

  onChange: (value: string) => void;

  options: Option[];

  placeholder?: string;
  placeholderKey?: MessageKey;

  required?: boolean;
  error?: string;
  disabled?: boolean;

  className?: string;
}

export default function FormSelect({
  label,
  labelKey,

  value,
  onChange,

  options,

  placeholder,
  placeholderKey,

  required = false,
  error,
  disabled = false,

  className,
}: FormSelectProps) {
  const { lang } = useLanguage();

  const finalLabel = labelKey
    ? translate(labelKey, lang)
    : label;

  const finalPlaceholder =
    placeholderKey
      ? translate(
          placeholderKey,
          lang,
        )
      : placeholder;

  return (
    <div className="space-y-2">
      {/* LABEL */}
      {finalLabel && (
        <Label
          className="
            inline-flex items-center gap-1
          "
        >
          {finalLabel}

          {required && (
            <span className="text-destructive">
              *
            </span>
          )}
        </Label>
      )}

      {/* SELECT */}
      <div className="space-y-1">
        <Select
          value={String(value)}
          onValueChange={onChange}
          disabled={disabled}
        >
          <SelectTrigger
            className={cn(
              error &&
                `
                border-destructive
                focus-visible:ring-destructive/20
              `,
              className,
            )}
          >
            <SelectValue
              placeholder={
                finalPlaceholder ||
                "Select option"
              }
            />
          </SelectTrigger>

          <SelectContent>
            {options.map((opt) => (
              <SelectItem
                key={String(opt.value)}
                value={String(
                  opt.value,
                )}
              >
                {opt.labelKey
                  ? translate(
                      opt.labelKey,
                      lang,
                    )
                  : opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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
    </div>
  );
}

