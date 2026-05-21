"use client";

import { useEffect, useState } from "react";

import {
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  Link2,
  Loader2,
  Upload,
  Video,
} from "lucide-react";

import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

import { useDictionary } from "@/lib/i18n/useDictionary";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/textarea";

/* ================= TYPES ================= */

interface Category {
  id: number;
  name: string;
}

interface OpportunityFormProps {
  onSubmit: (data: FormData) => Promise<void> | void;

  initialData?: any;

  categories: Category[];
}

type ResourceType = "VIDEO" | "PDF" | "LINK";

/* ================= LIMITS ================= */

const MAX_VIDEO_SIZE = 10 * 1024 * 1024;

const MAX_PDF_SIZE = 2 * 1024 * 1024;

export default function OpportunityForm({
  onSubmit,
  initialData,
  categories,
}: OpportunityFormProps) {
  const t = useDictionary();

  /* ================= STATE ================= */

  const [form, setForm] = useState({
    title: initialData?.title || "",

    description: initialData?.description || "",

    requirements: initialData?.requirements || "",

    howToApply: initialData?.howToApply || "",

    deadline: initialData?.deadline
      ? new Date(initialData.deadline).toISOString().slice(0, 10)
      : "",

    location: initialData?.location || "",

    status: initialData?.status || "PUBLISHED",

    categoryId: initialData?.categoryId ?? categories[0]?.id ?? 0,

    resourceType: initialData?.resourceType || "",

    resourceUrl: initialData?.resourceUrl || "",
  });

  const [file, setFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ================= RESET ================= */

  useEffect(() => {
    setForm({
      title: initialData?.title || "",

      description: initialData?.description || "",

      requirements: initialData?.requirements || "",

      howToApply: initialData?.howToApply || "",

      deadline: initialData?.deadline
        ? new Date(initialData.deadline).toISOString().slice(0, 10)
        : "",

      location: initialData?.location || "",

      status: initialData?.status || "PUBLISHED",

      categoryId: initialData?.categoryId ?? categories[0]?.id ?? 0,

      resourceType: initialData?.resourceType || "",

      resourceUrl: initialData?.resourceUrl || "",
    });

    setFile(null);
  }, [initialData, categories]);

  /* ================= INPUT CHANGE ================= */

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= SELECT CHANGE ================= */

  const handleSelectChange = (name: string, value: string) => {
    if (name === "resourceType") {
      setForm((prev) => ({
        ...prev,

        resourceType: value as ResourceType,

        resourceUrl: "",
      }));

      setFile(null);

      return;
    }

    setForm((prev) => ({
      ...prev,

      [name]: name === "categoryId" ? Number(value) : value,
    }));
  };

  /* ================= FILE ================= */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const selectedFile = e.target.files[0];

    if (form.resourceType === "VIDEO" && selectedFile.size > MAX_VIDEO_SIZE) {
      alert("Video size too large");

      e.target.value = "";

      return;
    }

    if (form.resourceType === "PDF" && selectedFile.size > MAX_PDF_SIZE) {
      alert("PDF size too large");

      e.target.value = "";

      return;
    }

    setFile(selectedFile);
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    if (file) {
      formData.append("file", file);
    }

    try {
      setIsSubmitting(true);

      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= RESOURCE ICON ================= */

  const resourceIcon =
    form.resourceType === "VIDEO"
      ? Video
      : form.resourceType === "PDF"
        ? FileText
        : Link2;

  const ResourceIcon = resourceIcon;

  /* ================= UI ================= */

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* HERO */}
      <Card
        className="
          relative overflow-hidden

          border-border/60

          bg-linear-to-br
          from-blue-500/5
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

            bg-blue-500/10

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

              bg-blue-500/10

              text-blue-600
              dark:text-blue-400
            "
          >
            <BriefcaseBusiness className="size-7" />
          </div>

          <div className="space-y-1">
            <h2
              className="
                text-xl
                font-semibold
                tracking-tight
              "
            >
              {t("OPPORTUNITY_FORM_TITLE")}
            </h2>

            <p
              className="
                max-w-2xl

                text-sm
                leading-relaxed

                text-muted-foreground
              "
            >
              {t("OPPORTUNITY_FORM_SUBTITLE")}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* FORM */}
      <Card>
        <CardContent className="p-6 space-y-8">
          {/* HEADER */}
          <div className="space-y-1">
            <h3
              className="
                text-lg
                font-semibold
                tracking-tight
              "
            >
              Opportunity Details
            </h3>

            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              Fill all required opportunity information.
            </p>
          </div>

          {/* GRID */}
          <div
            className="
              grid grid-cols-1
              gap-5

              md:grid-cols-2
            "
          >
            <FormInput
              labelKey="OPPORTUNITY_TITLE_LABEL"
              name="title"
              value={form.title}
              onChange={handleInputChange}
              required
            />

            <FormInput
              labelKey="OPPORTUNITY_LOCATION_LABEL"
              name="location"
              value={form.location}
              onChange={handleInputChange}
              required
            />

            <div className="relative">
              
              <FormInput
                labelKey="OPPORTUNITY_DEADLINE_LABEL"
                name="deadline"
                type="date"
                value={form.deadline}
                onChange={handleInputChange}
                required
              />
              
            </div>

            <FormSelect
              labelKey="OPPORTUNITY_STATUS_LABEL"
              name="status"
              value={form.status}
              onChange={(value) => handleSelectChange("status", value)}
              options={[
                {
                  value: "PUBLISHED",
                  labelKey: "STATUS_PUBLISHED",
                },
                {
                  value: "DRAFT",
                  labelKey: "STATUS_DRAFT",
                },
                {
                  value: "CLOSED",
                  labelKey: "STATUS_CLOSED",
                },
              ]}
            />

            {/* DESCRIPTION */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium">
                {t("OPPORTUNITY_DESCRIPTION_LABEL")}
              </label>

              <Textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                className="min-h-28"
              />
            </div>

            {/* REQUIREMENTS */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium">
                {t("OPPORTUNITY_REQUIREMENTS_LABEL")}
              </label>

              <Textarea
                name="requirements"
                value={form.requirements}
                onChange={handleInputChange}
                className="min-h-28"
              />
            </div>

            {/* HOW TO APPLY */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium">
                {t("OPPORTUNITY_HOW_TO_APPLY_LABEL")}
              </label>

              <Textarea
                name="howToApply"
                value={form.howToApply}
                onChange={handleInputChange}
                className="min-h-28"
              />
            </div>

            <FormSelect
              labelKey="OPPORTUNITY_CATEGORY_LABEL"
              name="categoryId"
              value={form.categoryId}
              onChange={(value) => handleSelectChange("categoryId", value)}
              options={categories.map((c) => ({
                value: c.id,
                label: c.name,
              }))}
            />

            <FormSelect
              labelKey="OPPORTUNITY_RESOURCE_TYPE_LABEL"
              name="resourceType"
              value={form.resourceType}
              onChange={(value) => handleSelectChange("resourceType", value)}
              options={[
                {
                  value: "VIDEO",
                  labelKey: "TRAINING_TYPE_VIDEO",
                },
                {
                  value: "PDF",
                  labelKey: "TRAINING_TYPE_PDF",
                },
                {
                  value: "LINK",
                  labelKey: "TRAINING_TYPE_ARTICLE",
                },
              ]}
              placeholderKey="SELECT_PLACEHOLDER"
            />

            {/* FILE UPLOAD */}
            {(form.resourceType === "VIDEO" || form.resourceType === "PDF") && (
              <div className="md:col-span-2">
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
                    <div
                      className="
                        flex size-12
                        items-center justify-center

                        rounded-2xl

                        bg-primary/10

                        text-primary
                      "
                    >
                      <ResourceIcon className="size-5" />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <h4 className="font-medium">Upload Resource</h4>

                        <p
                          className="
                            text-sm
                            text-muted-foreground
                          "
                        >
                          {form.resourceType === "VIDEO"
                            ? "Upload educational video"
                            : "Upload PDF document"}
                        </p>
                      </div>

                      <input
                        type="file"
                        accept={
                          form.resourceType === "VIDEO"
                            ? "video/*"
                            : "application/pdf"
                        }
                        onChange={handleFileChange}
                        className="
                          block w-full

                          text-sm
                          text-muted-foreground

                          file:mr-4
                          file:rounded-xl
                          file:border-0

                          file:bg-primary
                          file:px-4
                          file:py-2

                          file:text-sm
                          file:font-medium

                          file:text-primary-foreground

                          hover:file:opacity-90
                        "
                      />

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
                          <Upload className="size-3.5" />

                          {file.name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LINK */}
            {form.resourceType === "LINK" && (
              <div className="md:col-span-2">
                <FormInput
                  labelKey="OPPORTUNITY_RESOURCE_URL_LABEL"
                  name="resourceUrl"
                  value={form.resourceUrl}
                  onChange={handleInputChange}
                />
              </div>
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
              disabled={isSubmitting}
              className="
                min-w-55
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
                ? t("OPPORTUNITY_SAVING_BUTTON")
                : t("OPPORTUNITY_SAVE_BUTTON")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
