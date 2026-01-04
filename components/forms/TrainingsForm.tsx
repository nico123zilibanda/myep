"use client";

import {useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

interface TrainingsFormProps {
  onSubmit: (data: FormData) => void;
  initialData?: any;
}

type TrainingType = "ARTICLE" | "VIDEO" | "PDF";

export default function TrainingsForm({
  onSubmit,
  initialData,
}: TrainingsFormProps) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    type: (initialData?.type as TrainingType) || "ARTICLE",
    resourceUrl: initialData?.resourceUrl || "",
  });

  const [file, setFile] = useState<File | null>(null);

  /* ================= HANDLERS ================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // ⚠️ resourceUrl HAWEKWI file
    setForm(prev => ({ ...prev, resourceUrl: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("type", form.type);

    if (form.type === "ARTICLE") {
      formData.append("resourceUrl", form.resourceUrl);
    }

    if (form.type === "VIDEO" || form.type === "PDF") {
      if (file) {
        formData.append("file", file);
      }
    }

    onSubmit(formData);
  };

  /* ================= UI ================= */

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
      />

      <FormInput
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      <FormSelect
        label="Training Type"
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload {form.type}
          </label>
          <input
            type="file"
            accept={form.type === "VIDEO" ? "video/*" : "application/pdf"}
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* RESOURCE URL */}
      {form.type === "ARTICLE" && (
        <FormInput
          label="Resource URL"
          name="resourceUrl"
          value={form.resourceUrl}
          onChange={handleChange}
        />
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Hifadhi
      </button>
    </form>
  );
}
