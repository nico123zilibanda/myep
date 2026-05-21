
"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import {
  Loader2,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ArrowRight,
} from "lucide-react";

import { useAppToast } from "@/lib/toast";

import type { MessageKey } from "@/lib/messages";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

/* ================= TYPES ================= */

interface LoginFormData {
  email: string;
  password: string;
}

interface ApiResponse {
  success: boolean;
  messageKey: MessageKey;
  redirectTo?: string;
}

/* ================= COMPONENT ================= */

export default function LoginForm() {
  const router = useRouter();

  const { showSuccess, showError } =
    useAppToast();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] =
    useState<LoginFormData>({
      email: "",
      password: "",
    });

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(
        "/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(form),
        },
      );

      const data: ApiResponse =
        await res.json();

      setLoading(false);

      if (!res.ok) {
        showError(data.messageKey);
        return;
      }

      showSuccess(data.messageKey);

      setTimeout(() => {
        router.replace(
          data.redirectTo ||
            "/dashboard",
        );
      }, 700);
    } catch {
      setLoading(false);

      showError("SERVER_ERROR");
    }
  };

  /* ================= UI ================= */

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-6
      "
    >
      {/* ================= EMAIL ================= */}

      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="
            text-sm font-medium
          "
        >
          Barua Pepe
        </Label>

        <div className="relative">
          <Mail
            className="
              absolute left-4 top-1/2
              size-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            id="email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="example@email.com"
            value={form.email}
            onChange={handleChange}
            className="
              h-12
              rounded-2xl
              border-border/60
              bg-background/70
              pl-11
              shadow-sm
              transition-all
              focus-visible:ring-2
              focus-visible:ring-primary/30
            "
          />
        </div>
      </div>

      {/* ================= PASSWORD ================= */}

      <div className="space-y-2">
        <div
          className="
            flex items-center
            justify-between
          "
        >
          <Label
            htmlFor="password"
            className="
              text-sm font-medium
            "
          >
            Nenosiri
          </Label>

          <Link
            href="/forgot-password"
            className="
              text-xs font-medium
              text-primary
              transition-colors
              hover:text-primary/80
            "
          >
            Umesahau nenosiri?
          </Link>
        </div>

        <div className="relative">
          <LockKeyhole
            className="
              absolute left-4 top-1/2
              size-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            id="password"
            name="password"
            required
            autoComplete="current-password"
            placeholder="Andika nenosiri lako"
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={form.password}
            onChange={handleChange}
            className="
              h-12
              rounded-2xl
              border-border/60
              bg-background/70
              pl-11
              pr-12
              shadow-sm
              transition-all
              focus-visible:ring-2
              focus-visible:ring-primary/30
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword,
              )
            }
            className="
              absolute right-4 top-1/2
              -translate-y-1/2
              text-muted-foreground
              transition-colors
              hover:text-foreground
            "
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* ================= LOGIN BUTTON ================= */}

      <Button
        type="submit"
        disabled={loading}
        className="
          h-12 w-full
          rounded-2xl
          text-sm font-semibold
          shadow-lg shadow-primary/20
        "
      >
        {loading ? (
          <>
            <Loader2
              className="
                mr-2 size-4
                animate-spin
              "
            />

            Inaingia...
          </>
        ) : (
          <>
            Ingia Kwenye Mfumo

            <ArrowRight
              className="
                ml-2 size-4
              "
            />
          </>
        )}
      </Button>

      {/* ================= DIVIDER ================= */}

      <div
        className="
          relative
          py-1
        "
      >
        <div
          className="
            absolute inset-0
            flex items-center
          "
        >
          <span
            className="
              w-full
              border-t
              border-border/60
            "
          />
        </div>

        <div
          className="
            relative
            flex justify-center
            text-xs uppercase
          "
        >
          <span
            className="
              bg-background
              px-3
              text-muted-foreground
            "
          >
            AU
          </span>
        </div>
      </div>

      {/* ================= REGISTER ================= */}

      <div
        className="
          text-center
          text-sm
          text-muted-foreground
        "
      >
        Bado huna akaunti?{" "}

        <Link
          href="/register"
          className="
            font-semibold
            text-primary
            transition-colors
            hover:text-primary/80
          "
        >
          Jisajili hapa
        </Link>
      </div>
    </form>
  );
}

