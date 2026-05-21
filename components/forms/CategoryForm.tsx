
"use client";

import { useEffect, useState } from "react";

import {
  Loader2,
  Sparkles,
  Tags,
} from "lucide-react";

import FormInput from "./FormInput";

import { useDictionary } from "@/lib/i18n/useDictionary";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/Card";
import { Textarea } from "@/components/ui/textarea";

export default function CategoryForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (data: any) => Promise<void>;
  initialData?: any;
}) {
  const t = useDictionary();

  /* ================= STATE ================= */

  const [form, setForm] = useState({
    name:
      initialData?.name || "",

    description:
      initialData?.description || "",
  });

  const [isSubmitting,
    setIsSubmitting] =
    useState(false);

  /* ================= SYNC ================= */

  useEffect(() => {
    setForm({
      name:
        initialData?.name || "",

      description:
        initialData?.description ||
        "",
    });
  }, [initialData]);

  /* ================= CHANGE ================= */

  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } =
      e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      await onSubmit(form);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= UI ================= */

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* ================= HERO ================= */}
      <Card
        className="
          relative overflow-hidden

          border-border/60

          bg-linear-to-br
          from-emerald-500/5
          via-background
          to-background
        "
      >
        {/* GLOW */}
        <div
          className="
            pointer-events-none

            absolute right-0 top-0

            h-56 w-56

            translate-x-1/3
            -translate-y-1/3

            rounded-full

            bg-emerald-500/10

            blur-3xl
          "
        />

        <CardContent
          className="
            relative z-10

            flex items-start gap-4

            p-6
          "
        >
          {/* ICON */}
          <div
            className="
              flex size-14
              items-center justify-center

              rounded-2xl

              bg-emerald-500/10

              text-emerald-600
              dark:text-emerald-400
            "
          >
            <Tags className="size-7" />
          </div>

          {/* TEXT */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2
                className="
                  text-xl
                  font-semibold
                  tracking-tight
                "
              >
                Category Management
              </h2>

              <Sparkles
                className="
                  size-4
                  text-emerald-500
                "
              />
            </div>

            <p
              className="
                max-w-xl

                text-sm leading-relaxed

                text-muted-foreground
              "
            >
              Create and organize
              categories for
              opportunities,
              trainings, and learning
              resources.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ================= FORM ================= */}
      <Card>
        <CardContent className="p-6 space-y-6">
          {/* HEADER */}
          <div className="space-y-1">
            <h3
              className="
                text-lg
                font-semibold
                tracking-tight
              "
            >
              Category Details
            </h3>

            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              Define the category name
              and optional description.
            </p>
          </div>

          {/* FIELDS */}
          <div className="space-y-5">
            {/* NAME */}
            <FormInput
              labelKey="CATEGORY_NAME_LABEL"
              placeholderKey="CATEGORY_NAME_PLACEHOLDER"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="
                  text-sm
                  font-medium
                "
              >
                {t(
                  "CATEGORY_DESCRIPTION_LABEL",
                )}
              </label>

              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder={t(
                  "CATEGORY_DESCRIPTION_PLACEHOLDER",
                )}
                className="
                  min-h-28
                "
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div
            className="
              flex items-center
              justify-end
            "
          >
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="
                min-w-45
              "
            >
              {isSubmitting && (
                <Loader2
                  className="
                    size-4
                    animate-spin
                  "
                />
              )}

              {isSubmitting
                ? t(
                    "CATEGORY_SAVING_BUTTON",
                  )
                : t(
                    "CATEGORY_SAVE_BUTTON",
                  )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

