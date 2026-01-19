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
          Category Details
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Ongeza au hariri category ya fursa au mafunzo
        </p>
      </div>

      {/* CATEGORY NAME */}
      <FormInput
        label="Jina la Category"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Mfano: Ajira, Mikopo, Mafunzo"
        required
      />

      {/* DESCRIPTION */}
      <FormInput
        label="Maelezo"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Maelezo mafupi kuhusu category hii"
      />

      {/* SUBMIT */}
      <button
        type="submit"
        className="
      w-full rounded-lg
      bg-blue-600 hover:bg-blue-700
      text-white py-3
      font-medium
      shadow-sm
      transition
    "
      >
        Hifadhi Category
      </button>
    </form>

  );
}
