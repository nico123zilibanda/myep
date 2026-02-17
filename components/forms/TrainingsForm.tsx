"use client";

import { useEffect, useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { Loader2 } from "lucide-react";

interface TrainingsFormProps {
  onSubmit: (data: FormData) => Promise<void> | void;
  initialData?: any;
}

type TrainingType = "ARTICLE" | "VIDEO" | "PDF";

const MAX_VIDEO_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_PDF_SIZE = 2 * 1024 * 1024;   // 2MB

export default function TrainingsForm({ onSubmit, initialData }: TrainingsFormProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "ARTICLE" as TrainingType,
    resourceUrl: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
      alert("Video size isizidi 10MB");
      e.target.value = "";
      return;
    }

    if (form.type === "PDF" && selectedFile.size > MAX_PDF_SIZE) {
      alert("PDF size isizidi 2MB");
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🛑 guard against double submit
    if (submitting) return;

    if (!form.title.trim()) return alert("Title inahitajika");
    if (form.type === "ARTICLE" && !form.resourceUrl.trim())
      return alert("Resource URL inahitajika");
    if ((form.type === "VIDEO" || form.type === "PDF") && !file)
      return alert(`Chagua ${form.type} file`);

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
    transition-colors
      "
    >
      {/* TITLE */}
      <FormInput
        label="Kichwa Cha Funzo Au Tangazo"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Andika title ya training"
      />

      {/* DESCRIPTION */}
      <FormInput
        label="Maelezo"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Andika maaelezo mafupi ya mafunzo"
      />

      {/* TRAINING TYPE */}
      <FormSelect
        label="Aina Ya Mafunzo"
        name="type"
        value={form.type}
        onChange={handleChange}
        options={[
          { value: "ARTICLE", label: "ARTICLE" },
          { value: "VIDEO", label: "VIDEO" },
          { value: "PDF", label: "PDF" },
        ]}
      />

      {/* FILE UPLOAD */}
      {(form.type === "VIDEO" || form.type === "PDF") && (
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">
            Upload {form.type}
          </label>

          <input
            type="file"
            accept={form.type === "VIDEO" ? "video/*" : "application/pdf"}
            onChange={handleFileChange}
            className=" 
            border rounded-lg p-2
            bg-(--card) border-(--border)
            text-(--foreground)
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition hover:opacity-80"
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
          label="URL Ya Rasilimali"
          name="resourceUrl"
          value={form.resourceUrl}
          onChange={handleChange}
          placeholder="Andika link ya article"
        />
      )}

      {/* SUBMIT BUTTON (spinner only, no disable) */}
      <button
        type="submit"
        className="
            w-full flex items-center justify-center gap-2
            bg-blue-600 hover:bg-blue-700
            text-white py-3 rounded-lg
            font-medium shadow-sm
            transition
        "
      >
        {submitting && <Loader2 className="h-5 w-5 animate-spin" />}
        {submitting ? "Inahifadhi..." : "Hifadhi Funzo"}
      </button>
    </form>
  );
}
