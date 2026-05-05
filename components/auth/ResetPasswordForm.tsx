"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useAppToast } from "@/lib/toast";

export default function ResetPasswordForm() {
  const { showSuccess, showError } = useAppToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔒 Token validation on load
  useEffect(() => {
    if (!token) {
      showError("TOKEN_INVALID");
      router.replace("/login");
    }
  }, [token, router, showError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validation
    if (password.length < 8) {
      showError("PASSWORD_TOO_SHORT");
      return;
    }

    if (password !== confirm) {
      showError("PASSWORD_NOT_MATCH");
      return;
    }

    if (!token) {
      showError("TOKEN_INVALID");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword: password,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        showError(data.message || "SERVER_ERROR");
        return;
      }

      showSuccess(data.message);

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
        <label className="text-sm font-medium">Nenosiri Jipya</label>

        <div className="relative mt-1">
          <input
            type={show ? "text" : "password"}
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Angalau herufi 8"
            className="w-full px-4 py-3 border rounded-xl"
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

      {/* CONFIRM PASSWORD */}
      <div>
        <label className="text-sm font-medium">Thibitisha Nenosiri</label>
        <input
          type={show ? "text" : "password"}
          value={confirm}
          required
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Rudia nenosiri"
          className="mt-1 w-full px-4 py-3 border rounded-xl"
        />
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl flex justify-center items-center gap-2"
      >
        {loading && <Loader2 className="animate-spin" size={18} />}
        Badilisha Nenosiri
      </button>
    </form>
  );
}