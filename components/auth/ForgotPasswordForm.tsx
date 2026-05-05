"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAppToast } from "@/lib/toast";

export default function ForgotPasswordForm() {
  const { showSuccess, showError } = useAppToast();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      showError("ACTION_FAILED");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        showError("SERVER_ERROR");
        return;
      }

      showSuccess(data.message);
    } catch {
      setLoading(false);
      showError("SERVER_ERROR");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="text-sm font-medium">Barua pepe</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className="mt-1 w-full px-4 py-3 border rounded-xl"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl flex justify-center items-center gap-2"
      >
        {loading && <Loader2 className="animate-spin" size={18} />}
        Tuma kiungo cha reset
      </button>
    </form>
  );
}
