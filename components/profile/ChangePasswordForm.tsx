"use client";

import { useState } from "react";
import FormInput from "@/components/forms/FormInput";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useAppToast } from "@/lib/toast";
import { useDictionary } from "@/lib/i18n/useDictionary";

export default function ChangePasswordForm() {
  const { showSuccess, showError } = useAppToast();
  const t = useDictionary();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorKey(null);

    if (form.password.length < 8) {
      setErrorKey("PASSWORD_TOO_SHORT_LOCAL");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorKey("PASSWORD_MISMATCH_LOCAL");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/admin/profile/password", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        showError(data.messageKey || "ACTION_FAILED");
        return;
      }

      showSuccess(data.messageKey || "PASSWORD_CHANGED");

      setForm({
        password: "",
        confirmPassword: "",
      });
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled =
    isSubmitting ||
    !form.password ||
    !form.confirmPassword;

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-6
        card border-default
        p-6 rounded-xl
      "
    >
      {/* HEADER */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-[--text-primary]">
          {t("SECURITY_TITLE")}
        </h3>
        <p className="text-sm opacity-70">
          {t("SECURITY_SUBTITLE")}
        </p>
      </div>

      {/* PASSWORD */}
      <div className="relative">
        <FormInput
          labelKey="NEW_PASSWORD_LABEL"
          name="password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleChange}
          required
          error={errorKey ? t(errorKey) : undefined}
        />

        <button
          type="button"
          onClick={() => setShowPassword(p => !p)}
          className="
            absolute right-3 top-9
            p-1 rounded-md
            bg-black/5
            opacity-70 hover:opacity-100
            focus:outline-none focus:ring-2 focus:ring-[--btn-focus]
          "
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

        <p className="text-xs opacity-70 mt-1">
          {t("PASSWORD_HINT")}
        </p>
      </div>

      {/* CONFIRM */}
      <FormInput
        labelKey="CONFIRM_PASSWORD_LABEL"
        name="confirmPassword"
        type={showPassword ? "text" : "password"}
        value={form.confirmPassword}
        onChange={handleChange}
        required
        error={errorKey ? t(errorKey) : undefined}
      />

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={isDisabled}
        className="
          w-full
          flex items-center justify-center gap-2
          btn-primary
          py-3 rounded-lg
          font-medium
          disabled:opacity-60
        "
      >
        {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
        {isSubmitting
          ? t("CHANGING_PASSWORD_BUTTON")
          : t("CHANGE_PASSWORD_BUTTON")}
      </button>
    </form>
  );
}