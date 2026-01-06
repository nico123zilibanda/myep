"use client";

import { useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

export default function MafunzoForm({
  onSubmit,
}: {
  onSubmit: (data: any) => void;
}) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    level: "",
    instructor: "",
    startDate: "",
    endDate: "",
    status: "UPCOMING",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <FormInput label="Jina la Mafunzo" name="title" value={form.title} onChange={handleChange} />
      <FormInput label="Mwalimu" name="instructor" value={form.instructor} onChange={handleChange} />

      <div className="grid grid-cols-2 gap-4">
        <FormSelect
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          options={["Technology", "Business", "Agriculture"]}
        />
        <FormSelect
          label="Level"
          name="level"
          value={form.level}
          onChange={handleChange}
          options={["Beginner", "Intermediate", "Advanced"]}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Start Date" name="startDate" type="date" value={form.startDate} onChange={handleChange} />
        <FormInput label="End Date" name="endDate" type="date" value={form.endDate} onChange={handleChange} />
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
        Hifadhi Mafunzo
      </button>
    </form>
  );
}
