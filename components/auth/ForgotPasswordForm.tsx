"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { showSuccess, showError } from "@/lib/toast";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        showError(data.messageKey);
        return;
      }

      showSuccess(data.messageKey);
    } catch {
      setLoading(false);
      showError("SERVER_ERROR");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Barua pepe
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className="mt-1 w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold flex justify-center gap-2"
      >
        {loading && <Loader2 size={18} className="animate-spin" />}
        Tuma Reset Link
      </button>
    </form>
  );
}
