"use client";

import { useState } from "react";
import FormInput from "@/components/forms/FormInput";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { showSuccess, showError } from "@/lib/toast";

export default function ChangePasswordForm() {
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

            const res = await fetch("/api/admin/profile/password", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: form.password }),
            });

            const data = await res.json();

            if (!res.ok) {
                showError(data.messageKey || "ACTION_FAILED");
                return;
            }

            showSuccess(data.messageKey || "ACTION_SUCCESS");
            setForm({ password: "", confirmPassword: "" });
        } catch {
            showError("SERVER_ERROR");
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
            {/* HEADER */}
            <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Usalama wa Akaunti
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
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
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

                <p className="text-xs text-gray-400 mt-1">
                    Tumia angalau herufi 8 (ikiwezekana changanya namba au alama)
                </p>
            </div>

            {/* CONFIRM PASSWORD */}
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
                {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
                {isSubmitting ? "Inabadilisha..." : "Badilisha Password"}
            </button>
        </form>
    );
}
