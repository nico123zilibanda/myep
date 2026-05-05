"use client";

import { useEffect, useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { Loader2 } from "lucide-react";
import { useDictionary } from "@/lib/i18n/useDictionary";


interface TrainingsFormProps {
  onSubmit: (data: FormData) => Promise<void> | void;
  initialData?: any;
}

type TrainingType = "ARTICLE" | "VIDEO" | "PDF";

const MAX_VIDEO_SIZE = 10 * 1024 * 1024;
const MAX_PDF_SIZE = 2 * 1024 * 1024;

export default function TrainingsForm({
  onSubmit,
  initialData,
}: TrainingsFormProps) {

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "ARTICLE" as TrainingType,
    resourceUrl: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const t = useDictionary();

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        type: initialData.type || "ARTICLE",
        resourceUrl: initialData.resourceUrl || "",
      });
      setFile(null);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "type") {
      setForm(prev => ({
        ...prev,
        type: value as TrainingType,
        resourceUrl: "",
      }));
      setFile(null);
      return;
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const selectedFile = e.target.files[0];

    if (form.type === "VIDEO" && selectedFile.size > MAX_VIDEO_SIZE) {
      alert(t("TRAINING_VIDEO_SIZE_ERROR",));
      e.target.value = "";
      return;
    }

    if (form.type === "PDF" && selectedFile.size > MAX_PDF_SIZE) {
      alert(t("TRAINING_PDF_SIZE_ERROR",));
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitting) return;

    if (!form.title.trim())
      return alert(t("TRAINING_TITLE_REQUIRED",));

    if (form.type === "ARTICLE" && !form.resourceUrl.trim())
      return alert(t("TRAINING_URL_REQUIRED",));

    if ((form.type === "VIDEO" || form.type === "PDF") && !file)
      return alert(t("TRAINING_FILE_REQUIRED",));

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("type", form.type);

    if (form.type === "ARTICLE") {
      formData.append("resourceUrl", form.resourceUrl);
    }

    if (file) {
      formData.append("file", file);
    }

    try {
      setSubmitting(true);
      await onSubmit(formData);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-6
        bg-(--card)
        p-6 rounded-xl
        border border-(--border)
        shadow-sm
      "
    >
      {/* TITLE */}
      <FormInput
        labelKey="TRAINING_TITLE_LABEL"
        placeholderKey="TRAINING_TITLE_PLACEHOLDER"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
      />

      {/* DESCRIPTION */}
      <FormInput
        labelKey="TRAINING_DESCRIPTION_LABEL"
        placeholderKey="TRAINING_DESCRIPTION_PLACEHOLDER"
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      {/* TRAINING TYPE */}
      <FormSelect
        labelKey="TRAINING_TYPE_LABEL"
        name="type"
        value={form.type}
        onChange={handleChange}
        options={[
          { value: "ARTICLE", labelKey: "TRAINING_TYPE_ARTICLE" },
          { value: "VIDEO", labelKey: "TRAINING_TYPE_VIDEO" },
          { value: "PDF", labelKey: "TRAINING_TYPE_PDF" },
        ]}
      />

      {/* FILE UPLOAD */}
      {(form.type === "VIDEO" || form.type === "PDF") && (
        <div className="flex flex-col gap-1">
          <label className="font-medium text-(--text-primary)">
            {form.type === "VIDEO"
              ? t("TRAINING_UPLOAD_VIDEO_LABEL",)
              : t("TRAINING_UPLOAD_PDF_LABEL",)}
          </label>

          <input
            type="file"
            accept={form.type === "VIDEO" ? "video/*" : "application/pdf"}
            onChange={handleFileChange}
            className="
              border rounded-lg p-2
              bg-(--card) border-(--border)
              text-(--foreground)
              focus:outline-none focus:ring-2 focus:ring-(--btn-focus)
              transition hover:opacity-80
            "
          />

          {file && (
            <p className="text-xs text-green-600 mt-1">
              ✔ {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>
      )}

      {/* RESOURCE URL */}
      {form.type === "ARTICLE" && (
        <FormInput
          labelKey="TRAINING_RESOURCE_URL_LABEL"
          placeholderKey="TRAINING_RESOURCE_URL_PLACEHOLDER"
          name="resourceUrl"
          value={form.resourceUrl}
          onChange={handleChange}
          required
        />
      )}

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={submitting}
        className="
          w-full flex items-center justify-center gap-2
          bg-blue-600 hover:bg-blue-700
          disabled:bg-blue-400
          text-white py-3 rounded-lg
          font-medium shadow-sm
          transition
        "
      >
        {submitting && <Loader2 className="h-5 w-5 animate-spin" />}
        {submitting
          ? t("TRAINING_SAVING_BUTTON",)
          : t("TRAINING_SAVE_BUTTON",)}
      </button>
    </form>
  );
}