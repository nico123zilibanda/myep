
"use client";

import { useEffect, useState } from "react";

import {
  GraduationCap,
  FileText,
  Video,
  Link2,
  Loader2,
  UploadCloud,
  Sparkles,
} from "lucide-react";

import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

import { useDictionary } from "@/lib/i18n/useDictionary";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/Card";

import { Textarea } from "@/components/ui/textarea";

/* ================= TYPES ================= */

interface TrainingsFormProps {
  onSubmit: (
    data: FormData,
  ) => Promise<void> | void;

  initialData?: any;
}

type TrainingType =
  | "ARTICLE"
  | "VIDEO"
  | "PDF";

/* ================= LIMITS ================= */

const MAX_VIDEO_SIZE =
  10 * 1024 * 1024;

const MAX_PDF_SIZE =
  2 * 1024 * 1024;

export default function TrainingsForm({
  onSubmit,
  initialData,
}: TrainingsFormProps) {
  const t = useDictionary();

  /* ================= STATE ================= */

  const [form, setForm] =
    useState({
      title: "",

      description: "",

      type:
        "ARTICLE" as TrainingType,

      resourceUrl: "",
    });

  const [file, setFile] =
    useState<File | null>(null);

  const [submitting,
    setSubmitting] =
    useState(false);

  /* ================= INITIAL DATA ================= */

  useEffect(() => {
    if (initialData) {
      setForm({
        title:
          initialData.title || "",

        description:
          initialData.description ||
          "",

        type:
          initialData.type ||
          "ARTICLE",

        resourceUrl:
          initialData.resourceUrl ||
          "",
      });

      setFile(null);
    }
  }, [initialData]);

  /* ================= INPUT CHANGE ================= */

  const handleInputChange = (
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

  /* ================= SELECT CHANGE ================= */

  const handleSelectChange = (
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,

      type:
        value as TrainingType,

      resourceUrl: "",
    }));

    setFile(null);
  };

  /* ================= FILE ================= */

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files?.length)
      return;

    const selectedFile =
      e.target.files[0];

    if (
      form.type === "VIDEO" &&
      selectedFile.size >
        MAX_VIDEO_SIZE
    ) {
      alert(
        t(
          "TRAINING_VIDEO_SIZE_ERROR",
        ),
      );

      e.target.value = "";

      return;
    }

    if (
      form.type === "PDF" &&
      selectedFile.size >
        MAX_PDF_SIZE
    ) {
      alert(
        t(
          "TRAINING_PDF_SIZE_ERROR",
        ),
      );

      e.target.value = "";

      return;
    }

    setFile(selectedFile);
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    if (submitting) return;

    if (!form.title.trim()) {
      return alert(
        t(
          "TRAINING_TITLE_REQUIRED",
        ),
      );
    }

    if (
      form.type === "ARTICLE" &&
      !form.resourceUrl.trim()
    ) {
      return alert(
        t(
          "TRAINING_URL_REQUIRED",
        ),
      );
    }

    if (
      (form.type === "VIDEO" ||
        form.type === "PDF") &&
      !file
    ) {
      return alert(
        t(
          "TRAINING_FILE_REQUIRED",
        ),
      );
    }

    const formData =
      new FormData();

    formData.append(
      "title",
      form.title,
    );

    formData.append(
      "description",
      form.description,
    );

    formData.append(
      "type",
      form.type,
    );

    if (
      form.type === "ARTICLE"
    ) {
      formData.append(
        "resourceUrl",
        form.resourceUrl,
      );
    }

    if (file) {
      formData.append(
        "file",
        file,
      );
    }

    try {
      setSubmitting(true);

      await onSubmit(formData);
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= ICON ================= */

  const typeIcon =
    form.type === "VIDEO"
      ? Video
      : form.type === "PDF"
      ? FileText
      : Link2;

  const TypeIcon = typeIcon;

  /* ================= UI ================= */

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* HERO */}
      <Card
        className="
          relative overflow-hidden

          border-border/60

          bg-linear-to-br
          from-violet-500/5
          via-background
          to-background
        "
      >
        <div
          className="
            absolute right-0 top-0

            h-56 w-56

            translate-x-1/3
            -translate-y-1/3

            rounded-full

            bg-violet-500/10

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
          <div
            className="
              flex size-14
              items-center justify-center

              rounded-2xl

              bg-violet-500/10

              text-violet-600
              dark:text-violet-400
            "
          >
            <GraduationCap className="size-7" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2
                className="
                  text-xl
                  font-semibold
                  tracking-tight
                "
              >
                Rasilimali ya Mafunzo
              </h2>

              <Sparkles
                className="
                  size-4
                  text-violet-500
                "
              />
            </div>

            <p
              className="
                max-w-2xl

                text-sm
                leading-relaxed

                text-muted-foreground
              "
            >
              Unda maudhui ya kielimu kwa watumiaji vijana
              katika Lango la Mlele DC.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* FORM */}
      <Card>
        <CardContent className="p-6 space-y-8">
          {/* FIELDS */}
          <div className="space-y-5">
            {/* TITLE */}
            <FormInput
              labelKey="TRAINING_TITLE_LABEL"
              placeholderKey="TRAINING_TITLE_PLACEHOLDER"
              name="title"
              value={form.title}
              onChange={
                handleInputChange
              }
              required
            />

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t(
                  "TRAINING_DESCRIPTION_LABEL",
                )}
              </label>

              <Textarea
                name="description"
                value={
                  form.description
                }
                onChange={
                  handleInputChange
                }
                placeholder={t(
                  "TRAINING_DESCRIPTION_PLACEHOLDER",
                )}
                className="min-h-28"
              />
            </div>

            {/* TYPE */}
            <FormSelect
              labelKey="TRAINING_TYPE_LABEL"
              name="type"
              value={form.type}
              onChange={
                handleSelectChange
              }
              options={[
                {
                  value:
                    "ARTICLE",
                  labelKey:
                    "TRAINING_TYPE_ARTICLE",
                },

                {
                  value:
                    "VIDEO",
                  labelKey:
                    "TRAINING_TYPE_VIDEO",
                },

                {
                  value: "PDF",
                  labelKey:
                    "TRAINING_TYPE_PDF",
                },
              ]}
            />

            {/* FILE */}
            {(form.type ===
              "VIDEO" ||
              form.type ===
                "PDF") && (
              <div
                className="
                  rounded-2xl

                  border border-dashed
                  border-border

                  bg-muted/30

                  p-6
                "
              >
                <div className="flex items-start gap-4">
                  {/* ICON */}
                  <div
                    className="
                      flex size-12
                      items-center justify-center

                      rounded-2xl

                      bg-violet-500/10

                      text-violet-600
                      dark:text-violet-400
                    "
                  >
                    <TypeIcon className="size-5" />
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h4 className="font-medium">
                        {form.type ===
                        "VIDEO"
                          ? t(
                              "TRAINING_UPLOAD_VIDEO_LABEL",
                            )
                          : t(
                              "TRAINING_UPLOAD_PDF_LABEL",
                            )}
                      </h4>

                      <p
                        className="
                          text-sm
                          text-muted-foreground
                        "
                      >
                        {form.type ===
                        "VIDEO"
                          ? "Upload learning video for youth training."
                          : "Upload educational PDF document."}
                      </p>
                    </div>

                    {/* INPUT */}
                    <input
                      type="file"
                      accept={
                        form.type ===
                        "VIDEO"
                          ? "video/*"
                          : "application/pdf"
                      }
                      onChange={
                        handleFileChange
                      }
                      className="
                        block w-full

                        text-sm
                        text-muted-foreground

                        file:mr-4
                        file:rounded-xl
                        file:border-0

                        file:bg-violet-600
                        hover:file:bg-violet-700

                        file:px-4
                        file:py-2

                        file:text-sm
                        file:font-medium

                        file:text-white

                        transition
                      "
                    />

                    {/* FILE INFO */}
                    {file && (
                      <div
                        className="
                          inline-flex items-center gap-2

                          rounded-full

                          bg-emerald-500/10

                          px-3 py-1

                          text-xs
                          font-medium

                          text-emerald-600
                          dark:text-emerald-400
                        "
                      >
                        <UploadCloud className="size-3.5" />

                        {file.name}

                        <span className="opacity-70">
                          (
                          {(
                            file.size /
                            1024 /
                            1024
                          ).toFixed(2)}
                          MB)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ARTICLE URL */}
            {form.type ===
              "ARTICLE" && (
              <FormInput
                labelKey="TRAINING_RESOURCE_URL_LABEL"
                placeholderKey="TRAINING_RESOURCE_URL_PLACEHOLDER"
                name="resourceUrl"
                value={
                  form.resourceUrl
                }
                onChange={
                  handleInputChange
                }
                required
              />
            )}
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
              disabled={
                submitting
              }
              className="
                min-w-52
              "
            >
              {submitting && (
                <Loader2
                  className="
                    size-4
                    animate-spin
                  "
                />
              )}

              {submitting
                ? t(
                    "TRAINING_SAVING_BUTTON",
                  )
                : t(
                    "TRAINING_SAVE_BUTTON",
                  )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

