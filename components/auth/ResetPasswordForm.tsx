"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { showError, showSuccess } from "@/lib/toast";

export default function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();

  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      showError("TOKEN_INVALID");
      router.replace("/login");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      showError("PASSWORD_TOO_SHORT");
      return;
    }

    if (password !== confirm) {
      showError("PASSWORD_NOT_MATCH");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        showError(data.messageKey);
        return;
      }

      showSuccess(data.messageKey);

      setTimeout(() => {
        router.replace("/login");
      }, 800);
    } catch {
      setLoading(false);
      showError("SERVER_ERROR");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* PASSWORD */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Nenosiri Jipya
        </label>

        <div className="relative mt-1">
          <input
            type={show ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Angalau herufi 8"
            className="w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-3 text-gray-400"
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* CONFIRM */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Thibitisha Nenosiri
        </label>

        <input
          type={show ? "text" : "password"}
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Rudia nenosiri"
          className="mt-1 w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* SUBMIT */}
      <button
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold flex justify-center gap-2"
      >
        {loading && <Loader2 size={18} className="animate-spin" />}
        Badilisha Nenosiri
      </button>

    </form>
  );
}
