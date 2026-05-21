
"use client";

import FormSelect from "@/components/forms/FormSelect";
import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Lang = "sw" | "en";

export default function LanguageSettings() {
  const { lang, setLang, t } = useLanguage();

  const handleChange = async (value: Lang) => {
    setLang(value);

    try {
      await fetch("/api/language", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language: value }),
      });
    } catch (error) {
      console.error("Language update failed", error);
    }
  };

  return (
    <div className="rounded-3xl border bg-background p-6 shadow-sm space-y-6">
      {/* HEADER */}
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-primary/10 p-2 text-primary">
          <Globe size={18} />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-foreground">
            {t("language")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t("selectLanguage")}
          </p>
        </div>
      </div>

      {/* SELECT */}
      <div className="space-y-2">
        <FormSelect
          label={t("language")}
          name="language"
          value={lang}
          onChange={(value) => handleChange(value as Lang)}
          options={[
            { value: "sw", label: "Swahili" },
            { value: "en", label: "English" },
          ]}
        />
      </div>
    </div>
  );
}

