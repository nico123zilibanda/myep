"use client";

import FormSelect from "@/components/forms/FormSelect";
import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function LanguageSettings() {
  const { lang, setLang, t } = useLanguage();

  const handleChange = async (value: "sw" | "en") => {
    setLang(value);

    await fetch("/api/language", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: value }),
    });
  };

  return (
    <div className="card p-6 shadow-sm space-y-4">
      <div className="flex gap-2 items-center">
        <Globe size={18} />
        <div>
          <h3 className="font-semibold">{t("language")}</h3>
          <p className="text-sm opacity-70">
            {t("selectLanguage")}
          </p>
        </div>
      </div>

      <FormSelect
        label={t("language")}
        name="language"
        value={lang}
        onChange={(e) =>
          handleChange(e.target.value as "sw" | "en")
        }
        options={[
          { value: "sw", label: "Swahili" },
          { value: "en", label: "English" },
        ]}
      />
    </div>
  );
}
