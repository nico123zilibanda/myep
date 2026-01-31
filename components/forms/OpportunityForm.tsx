"use client";

import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { Loader2 } from "lucide-react";

interface Category {
  id: number;
  name: string;
}

interface OpportunityFormProps {
  onSubmit: (data: any) => Promise<void> | void;
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

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "categoryId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await onSubmit(form);
    } finally {
      setIsSubmitting(false);
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
          Opportunity Details
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Jaza taarifa muhimu za fursa
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Mfano: Internship ya ICT"
          required
        />

        <FormInput
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Mfano: Dodoma"
          required
        />

        <FormInput
          label="Deadline"
          name="deadline"
          type="date"
          value={form.deadline}
          onChange={handleChange}
          required
        />

        <FormSelect
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={[
            { value: "PUBLISHED", label: "Published" },
            { value: "DRAFT", label: "Draft" },
            { value: "CLOSED", label: "Closed" },
          ]}
        />

        <div className="md:col-span-2">
          <FormInput
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Elezea kwa ufupi kuhusu fursa"
          />
        </div>

        <div className="md:col-span-2">
          <FormInput
            label="Requirements"
            name="requirements"
            value={form.requirements}
            onChange={handleChange}
            placeholder="Sifa au vigezo vinavyohitajika"
          />
        </div>

        <div className="md:col-span-2">
          <FormInput
            label="How to Apply"
            name="howToApply"
            value={form.howToApply}
            onChange={handleChange}
            placeholder="Elekeza jinsi ya kuomba"
          />
        </div>

        <FormSelect
          label="Category"
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          options={categories.map(c => ({
            value: c.id,
            label: c.name,
          }))}
        />

        <FormInput
          label="Attachment URL"
          name="attachmentUrl"
          value={form.attachmentUrl}
          onChange={handleChange}
          placeholder="Link ya document (hiari)"
        />
      </div>

      {/* SUBMIT */}
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
        {isSubmitting ? "Inahifadhi..." : "Hifadhi Fursa"}
      </button>
    </form>
  );
}
