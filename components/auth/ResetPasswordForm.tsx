
"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Loader2,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

import { useAppToast } from "@/lib/toast";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

export default function ResetPasswordForm() {
  const { showSuccess, showError } = useAppToast();

  const searchParams = useSearchParams();

  const router = useRouter();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");

  const [confirm, setConfirm] = useState("");

  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);

  /* ================= TOKEN VALIDATION ================= */

  useEffect(() => {
    if (!token) {
      showError("TOKEN_INVALID");

      router.replace("/login");
    }
  }, [token, router, showError]);

  /* ================= SUBMIT ================= */

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

      if (!res.ok) {
        showError(data.message || "SERVER_ERROR");
        return;
      }

      showSuccess(data.message);

      setTimeout(() => {
        router.replace("/login");
      }, 900);
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* INFO CARD */}
      <div
        className="
          rounded-2xl

          border border-primary/10

          bg-primary/5

          p-4
        "
      >
        <div className="flex items-start gap-3">
          <div
            className="
              flex size-10 items-center justify-center

              rounded-xl

              bg-primary/10

              text-primary
            "
          >
            <ShieldCheck className="size-5" />
          </div>

          <div className="space-y-1">
            <h3
              className="
                text-sm
                font-semibold

                text-foreground
              "
            >
              Weka Nenosiri Jipya
            </h3>

            <p
              className="
                text-sm
                leading-relaxed

                text-muted-foreground
              "
            >
              Tumia nenosiri lenye usalama zaidi ili kulinda akaunti yako.
            </p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* PASSWORD */}
        <div className="space-y-2">
          <Label htmlFor="password">
            Nenosiri Jipya
          </Label>

          <div className="relative">
            <LockKeyhole
              className="
                absolute left-3 top-1/2

                size-4

                -translate-y-1/2

                text-muted-foreground
              "
            />

            <Input
              id="password"
              type={show ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Angalau herufi 8"
              className="
                h-12

                rounded-2xl

                border-border/60

                bg-background/60

                pl-10 pr-12

                backdrop-blur-sm

                focus-visible:ring-primary/30
              "
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="
                absolute right-3 top-1/2

                -translate-y-1/2

                text-muted-foreground

                transition-colors

                hover:text-foreground
              "
            >
              {show ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>

          <p
            className="
              text-xs
              text-muted-foreground
            "
          >
            Nenosiri linapaswa kuwa na angalau herufi 8.
          </p>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="space-y-2">
          <Label htmlFor="confirm">
            Thibitisha Nenosiri
          </Label>

          <div className="relative">
            <LockKeyhole
              className="
                absolute left-3 top-1/2

                size-4

                -translate-y-1/2

                text-muted-foreground
              "
            />

            <Input
              id="confirm"
              type={show ? "text" : "password"}
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Rudia nenosiri"
              className="
                h-12

                rounded-2xl

                border-border/60

                bg-background/60

                pl-10

                backdrop-blur-sm

                focus-visible:ring-primary/30
              "
            />
          </div>
        </div>

        {/* SUBMIT */}
        <Button
          type="submit"
          disabled={loading}
          className="
            h-12
            w-full

            rounded-2xl

            font-semibold

            shadow-lg
            shadow-primary/20
          "
        >
          {loading ? (
            <>
              <Loader2
                className="
                  size-4

                  animate-spin
                "
              />

              Inabadilisha...
            </>
          ) : (
            "Badilisha Nenosiri"
          )}
        </Button>
      </form>

      {/* BACK */}
      <div className="text-center">
        <Link
          href="/login"
          className="
            inline-flex items-center gap-2

            text-sm
            font-medium

            text-primary

            transition-colors

            hover:text-primary/80
          "
        >
          <ArrowLeft className="size-4" />

          Rudi kwenye Login
        </Link>
      </div>
    </div>
  );
}

