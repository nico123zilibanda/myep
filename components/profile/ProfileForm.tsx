"use client";

import { useEffect, useState } from "react";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import { Loader2 } from "lucide-react";
import { useAppToast } from "@/lib/toast";
import { useDictionary } from "@/lib/i18n/useDictionary";

export default function ProfileForm() {
  const { showSuccess, showError } = useAppToast();
  const t = useDictionary();

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
        {t("PROFILE_LOAD_FAILED")}
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
          {t("PROFILE_INFO_TITLE")}
        </h3>
        <p className="text-sm opacity-70">
          {t("PROFILE_INFO_SUBTITLE")}
        </p>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          labelKey="PROFILE_FULLNAME_LABEL"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          required
        />

        <FormInput
          labelKey="EMAIL_LABEL"
          name="email"
          value={form.email}
          disabled
          onChange={() => {}}
        />

        <FormInput
          labelKey="PROFILE_PHONE_LABEL"
          name="phone"
          value={form.phone || ""}
          onChange={handleChange}
        />

        <FormSelect
          labelKey="PROFILE_GENDER_LABEL"
          name="gender"
          value={form.gender || ""}
          onChange={handleChange}
          options={[
            { value: "Male", label: t("GENDER_MALE") },
            { value: "Female", label: t("GENDER_FEMALE") },
          ]}
        />

        <FormInput
          labelKey="PROFILE_DOB_LABEL"
          name="dateOfBirth"
          type="date"
          value={form.dateOfBirth}
          onChange={handleChange}
        />

        <FormSelect
          labelKey="PROFILE_EDUCATION_LABEL"
          name="educationLevel"
          value={form.educationLevel || ""}
          onChange={handleChange}
          options={[
            { value: "PRIMARY", label: t("EDU_PRIMARY") },
            { value: "O_LEVEL", label: t("EDU_O_LEVEL") },
            { value: "CERTIFICATE", label: t("EDU_CERTIFICATE") },
            { value: "DIPLOMA", label: t("EDU_DIPLOMA") },
            { value: "DEGREE", label: t("EDU_DEGREE") },
          ]}
        />

        <FormInput
          labelKey="PROFILE_ROLE_LABEL"
          name="role"
          value={form.roles?.name}
          disabled
          onChange={() => {}}
        />
      </div>

      <p className="text-xs opacity-70">
        {t("PROFILE_EMAIL_LOCKED_NOTE")}
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
        {isSubmitting
          ? t("PROFILE_SAVING_BUTTON")
          : t("PROFILE_SAVE_BUTTON")}
      </button>
    </form>
  );
}