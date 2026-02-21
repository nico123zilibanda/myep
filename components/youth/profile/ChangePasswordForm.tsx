"use client";

import { useState } from "react";
import FormInput from "@/components/forms/FormInput";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useAppToast } from "@/lib/toast";

export default function ChangePasswordForm() {
  const { showSuccess, showError } = useAppToast();
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password.length < 8) {
      setError("Password lazima iwe angalau herufi 8");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Password hazifanani");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/youth/profile/password", {
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
          Usalama wa Akaunti
        </h3>
        <p className="text-sm opacity-70">
          Badilisha nenosiri la akaunti yako
        </p>
      </div>

      {/* PASSWORD */}
      <div className="relative">
        <FormInput
          label="Password Mpya"
          name="password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleChange}
          required
          error={error || undefined}
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
          Tumia angalau herufi 8 (ikiwezekana changanya namba au alama)
        </p>
      </div>

      {/* CONFIRM */}
      <FormInput
        label="Thibitisha Password Mpya"
        name="confirmPassword"
        type={showPassword ? "text" : "password"}
        value={form.confirmPassword}
        onChange={handleChange}
        required
        error={error || undefined}
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
        {isSubmitting ? "Inabadilisha..." : "Badilisha Password"}
      </button>
    </form>
  );
}
