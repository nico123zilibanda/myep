"use client";

import { useEffect, useState } from "react";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import { Loader2 } from "lucide-react";
import { useAppToast } from "@/lib/toast";

export default function ProfileForm() {
const { showSuccess, showError } = useAppToast();
  
  const [form, setForm] = useState<any>(null);
  const [initialForm, setInitialForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/admin/profile", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          const prepared = {
            ...res.data,
            dateOfBirth: res.data.dateOfBirth
              ? new Date(res.data.dateOfBirth).toISOString().slice(0, 10)
              : "",
          };

          setForm(prepared);
          setInitialForm(prepared);
        } else {
          showError("SERVER_ERROR");
        }
      })
      .catch(() => showError("SERVER_ERROR"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        showError(data.messageKey || "ACTION_FAILED");
        return;
      }

      showSuccess(data.messageKey || "ACTION_SUCCESS");
      setInitialForm(form);
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!form) {
    return (
      <div className="text-sm text-red-500">
        Imeshindikana kupakia taarifa za profile
      </div>
    );
  }

  const isDirty = JSON.stringify(form) !== JSON.stringify(initialForm);

  return (
    <form
      onSubmit={handleSubmit}
      className="card border-default space-y-6 p-6 rounded-xl shadow-sm"
    >
      {/* HEADER */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-(--text-primary)">
          Taarifa za Wasifu
        </h3>

        <p className="text-sm opacity-70">
          Sasisha taarifa zako binafsi
        </p>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Jina Kamili"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Barua Pepe"
          name="email"
          value={form.email}
          disabled
          onChange={() => {}}
        />

        <FormInput
          label="Namba ya Simu"
          name="phone"
          value={form.phone || ""}
          onChange={handleChange}
        />

        <FormSelect
          label="Jinsia"
          name="gender"
          value={form.gender || ""}
          onChange={handleChange}
          options={[
            { value: "Male", label: "Mwanaume" },
            { value: "Female", label: "Mwanamke" },
          ]}
        />

        <FormInput
          label="Tarehe ya Kuzaliwa"
          name="dateOfBirth"
          type="date"
          value={form.dateOfBirth}
          onChange={handleChange}
        />

        <FormSelect
          label="Kiwango cha Elimu"
          name="educationLevel"
          value={form.educationLevel || ""}
          onChange={handleChange}
          options={[
            { value: "PRIMARY", label: "Elimu ya Msingi" },
            { value: "O_LEVEL", label: "Kidato cha Nne" },
            { value: "CERTIFICATE", label: "Astashahada (Certificate)" },
            { value: "DIPLOMA", label: "Stashahada (Diploma)" },
            { value: "DEGREE", label: "Shahada (Degree)" },
          ]}
        />

        <FormInput
          label="Role"
          name="role"
          value={form.roles?.name}
          disabled
          onChange={() => {}}
        />
      </div>

      <p className="text-xs opacity-70">
        Barua pepe na role haziwezi kubadilishwa
      </p>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={isSubmitting || !isDirty}
        className="
          w-full flex items-center justify-center gap-2
          rounded-lg py-3 font-medium
          bg-(--btn-primary) text-(--btn-text)
          hover:shadow-md
          disabled:opacity-60
          focus:outline-none focus:ring-2 focus:ring-(--btn-focus)
          transition
        "
      >
        {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
        {isSubmitting ? "Inahifadhi..." : "Hifadhi Mabadiliko"}
      </button>
    </form>
  );
}
