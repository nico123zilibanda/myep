"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useAppToast } from "@/lib/toast";
import type { MessageKey } from "@/lib/messages";

interface LoginFormData {
  email: string;
  password: string;
}

interface ApiResponse {
  success: boolean;
  messageKey: MessageKey;
  redirectTo?: string;
}

export default function LoginForm() {
  const { showSuccess, showError } = useAppToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data: ApiResponse = await res.json();
      setLoading(false);

      if (!res.ok) {
        showError(data.messageKey);
        return;
      }

      showSuccess(data.messageKey);

      setTimeout(() => {
        router.replace(data.redirectTo || "/dashboard");
      }, 600);
    } catch {
      setLoading(false);
      showError("SERVER_ERROR");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* EMAIL */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Barua pepe
        </label>
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="example@email.com"
          className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Nenosiri
        </label>

        <div className="relative mt-1">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            placeholder="Andika nenosiri lako"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* FORGOT PASSWORD */}
      {/* <div className="text-right">
        <Link
          href="/forgot-password"
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Umesahau nenosiri?
        </Link>
      </div> */}

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition"
      >
        {loading && <Loader2 className="animate-spin" size={18} />}
        Ingia
      </button>

      {/* REGISTER */}
      <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-4">
        Bado huna akaunti?{" "}
        <Link
          href="/register"
          className="text-indigo-600 dark:text-indigo-400 underline"
        >
          Jisajili
        </Link>
      </p>
    </form>
  );
}
