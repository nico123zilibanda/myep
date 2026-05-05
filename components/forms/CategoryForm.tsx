"use client";

import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import { Loader2 } from "lucide-react";
import { useDictionary } from "@/lib/i18n/useDictionary";

export default function CategoryForm({

  onSubmit,
  initialData,
}: {
  onSubmit: (data: any) => Promise<void>;
  initialData?: any;
}) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useDictionary();
  // sync wakati wa edit
  useEffect(() => {
    setForm({
      name: initialData?.name || "",
      description: initialData?.description || "",
    });
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);        // 🔥 spinner ON
      await onSubmit(form);         // 🔥 subiri api / action
    } finally {
      setIsSubmitting(false);       // 🔥 spinner OFF
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-6
        bg-white dark:bg-gray-900
        p-6 rounded-xl
        border border-gray-200 dark:border-gray-800
        shadow-sm
      "
    >
      {/* FORM HEADER */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {t("CATEGORY_FORM_TITLE")}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t("CATEGORY_FORM_SUBTITLE")}
        </p>
      </div>

      {/* CATEGORY NAME */}
      <FormInput
        labelKey="CATEGORY_NAME_LABEL"
        placeholderKey="CATEGORY_NAME_PLACEHOLDER"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />

      {/* DESCRIPTION */}
      <FormInput
        labelKey="CATEGORY_DESCRIPTION_LABEL"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholderKey="CATEGORY_DESCRIPTION_PLACEHOLDER"
      />

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full
          flex items-center justify-center gap-2
          bg-blue-600 hover:bg-blue-700
          disabled:bg-blue-400
          text-white py-3 rounded-lg
          font-medium shadow-sm
          transition
        "
      >
        {isSubmitting && (
          <Loader2 className="h-5 w-5 animate-spin" />
        )}
        {isSubmitting
          ? t("CATEGORY_SAVING_BUTTON")
          : t("CATEGORY_SAVE_BUTTON")}

      </button>
    </form>
  );
}