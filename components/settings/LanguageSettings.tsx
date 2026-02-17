"use client";

import FormSelect from "@/components/forms/FormSelect";
import { Globe } from "lucide-react";
import { useState } from "react";

export default function LanguageSettings() {
  const [lang, setLang] = useState("sw");

  return (
    <div className="card p-6 shadow-sm space-y-4">

      <div className="flex gap-2 items-center">
        <Globe size={18} />

        <div>
          <h3 className="font-semibold">Language</h3>
          <p className="text-sm opacity-70">
            Select application language
          </p>
        </div>
      </div>

      <FormSelect
        label="Language"
        name="language"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        options={[
          { value: "sw", label: "Swahili" },
          { value: "en", label: "English" },
        ]}
      />

    </div>
  );
}
