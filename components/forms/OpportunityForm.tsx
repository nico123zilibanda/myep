"use client";

import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

interface Category {
  id: number;
  name: string;
}

interface OpportunityFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  categories: Category[];
}

export default function OpportunityForm({
  onSubmit,
  initialData,
  categories,
}: OpportunityFormProps) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    requirements: initialData?.requirements || "",
    howToApply: initialData?.howToApply || "",
    deadline: initialData?.deadline
      ? new Date(initialData.deadline).toISOString().slice(0, 10)
      : "",
    location: initialData?.location || "",
    attachmentUrl: initialData?.attachmentUrl || "",
    status: initialData?.status || "PUBLISHED",
    categoryId: initialData?.categoryId ?? (categories[0]?.id ?? 0),
  });

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
      attachmentUrl: initialData?.attachmentUrl || "",
      status: initialData?.status || "PUBLISHED",
      categoryId: initialData?.categoryId ?? (categories[0]?.id ?? 0),
    });
  }, [initialData, categories]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "categoryId" ? Number(value) : value,
    }));
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <FormInput label="Title" name="title" value={form.title} onChange={handleChange} />
      <FormInput label="Description" name="description" value={form.description} onChange={handleChange} />
      <FormInput label="Requirements" name="requirements" value={form.requirements} onChange={handleChange} />
      <FormInput label="How to Apply" name="howToApply" value={form.howToApply} onChange={handleChange} />
      <FormInput label="Deadline" name="deadline" type="date" value={form.deadline} onChange={handleChange} />
      <FormInput label="Location" name="location" value={form.location} onChange={handleChange} />
      <FormInput label="Attachment URL" name="attachmentUrl" value={form.attachmentUrl} onChange={handleChange} />

      <FormSelect
        label="Status"
        name="status"
        value={form.status}
        onChange={handleChange}
        options={[
          { value: "PUBLISHED", label: "PUBLISHED" },
          { value: "DRAFT", label: "DRAFT" },
          { value: "CLOSED", label: "CLOSED" },
        ]}
      />

      <FormSelect
        label="Category"
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        options={categories.map(c => ({ value: c.id, label: c.name }))}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Hifadhi
      </button>
    </form>
  );
}
