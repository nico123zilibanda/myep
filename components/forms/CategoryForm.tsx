"use client";

import { useState, useEffect } from "react";
import FormInput from "./FormInput";

export default function CategoryForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (data: any) => void;
  initialData?: any;
}) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
  });

  // Hii inahakikisha form inasynchronize na initialData wakati editing inabadilika
  useEffect(() => {
    setForm({
      name: initialData?.name || "",
      description: initialData?.description || "",
    });
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <FormInput
        label="Jina la Category"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <FormInput
        label="Maelezo"
        name="description"
        value={form.description}
        onChange={handleChange}
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
