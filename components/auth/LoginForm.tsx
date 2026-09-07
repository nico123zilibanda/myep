
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
  ShieldCheck,
} from "lucide-react";

import { useAppToast } from "@/lib/toast";
import type { MessageKey } from "@/lib/messages";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* ============================================================================
 * TYPES
 * ========================================================================== */

interface LoginFormData {
  email: string;
  password: string;
}

interface ApiResponse {
  success: boolean;
  messageKey: MessageKey;
  redirectTo?: string;
}

/* ============================================================================
 * COMPONENT
 * ========================================================================== */

export default function LoginForm() {
  const router = useRouter();

  const { showSuccess, showError } = useAppToast();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  /* ==========================================================================
   * HANDLE CHANGE
   * ======================================================================== */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  /* ==========================================================================
   * SUBMIT
   * ======================================================================== */

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        showError(data.messageKey);
        return;
      }

      showSuccess(data.messageKey);

      setTimeout(() => {
        router.replace(
          data.redirectTo || "/dashboard",
        );
      }, 700);
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================================================
   * TOGGLE PASSWORD
   * ======================================================================== */

  const togglePassword = () => {
    setShowPassword((previous) => !previous);
  };

  /* ==========================================================================
   * UI
   * ======================================================================== */

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* ======================================================================
          EMAIL
      ====================================================================== */}

      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="
            text-sm
            font-medium
            text-foreground
          "
        >
          Barua Pepe
        </Label>

        <div className="relative">
          <Mail
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
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
            disabled={loading}
            className="
              h-12
              rounded-2xl
              border-border/60
              bg-background/70
              pl-11
              shadow-sm
              transition-all

              placeholder:text-muted-foreground/60

              focus-visible:ring-2
              focus-visible:ring-primary/30

              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />
        </div>
      </div>

      {/* ======================================================================
          PASSWORD
      ====================================================================== */}

      <div className="space-y-2">
        <div
          className="
            flex
            items-center
            justify-between
            gap-3
          "
        >
          <Label
            htmlFor="password"
            className="
              text-sm
              font-medium
              text-foreground
            "
          >
            Nenosiri
          </Label>

          <Link
            href="/forgot-password"
            tabIndex={loading ? -1 : 0}
            className="
              text-xs
              font-semibold
              text-primary
              transition-colors
              hover:text-primary/80
              focus:outline-none
              focus-visible:rounded
              focus-visible:ring-2
              focus-visible:ring-primary/30
            "
          >
            Umesahau nenosiri?
          </Link>
        </div>

        <div className="relative">
          <LockKeyhole
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
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
            disabled={loading}
            className="
              h-12
              rounded-2xl
              border-border/60
              bg-background/70
              pl-11
              pr-12
              shadow-sm
              transition-all

              placeholder:text-muted-foreground/60

              focus-visible:ring-2
              focus-visible:ring-primary/30

              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />

          <button
            type="button"
            onClick={togglePassword}
            disabled={loading}
            aria-label={
              showPassword
                ? "Ficha nenosiri"
                : "Onyesha nenosiri"
            }
            aria-pressed={showPassword}
            className="
              absolute
              right-3
              top-1/2
              flex
              size-9
              -translate-y-1/2
              items-center
              justify-center
              rounded-xl
              text-muted-foreground
              transition-all
              hover:bg-muted
              hover:text-foreground
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary/30
              disabled:pointer-events-none
              disabled:opacity-50
            "
          >
            {showPassword ? (
              <EyeOff
                aria-hidden="true"
                className="size-4"
              />
            ) : (
              <Eye
                aria-hidden="true"
                className="size-4"
              />
            )}
          </button>
        </div>
      </div>

      {/* ======================================================================
          LOGIN BUTTON
      ====================================================================== */}

      <Button
        type="submit"
        disabled={loading}
        className="
          h-12
          w-full
          rounded-xl

          bg-primary
          text-primary-foreground

          text-sm
          font-semibold

          shadow-md
          shadow-gov-green-900/15

          transition-all
          duration-200

          hover:bg-primary-hover
          hover:shadow-lg
          hover:shadow-gov-green-900/20

          active:scale-[0.99]

          dark:shadow-black/20

          disabled:cursor-not-allowed
          disabled:opacity-70
        "
      >
        {loading ? (
          <>
            <Loader2
              aria-hidden="true"
              className="
                mr-2
                size-4
                animate-spin
              "
            />

            Inaingia...
          </>
        ) : (
          <>
            Ingia Kwenye Mfumo

            <ArrowRight
              aria-hidden="true"
              className="
                ml-2
                size-4
              "
            />
          </>
        )}
      </Button>

      {/* ======================================================================
          SECURITY MESSAGE
      ====================================================================== */}

      <div
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-border/50
          bg-muted/30
          px-3
          py-2.5
          text-center
        "
      >
        <ShieldCheck
          aria-hidden="true"
          className="
            size-4
            shrink-0
            text-primary
          "
        />

        <span
          className="
            text-[11px]
            font-medium
            text-muted-foreground
          "
        >
          Taarifa zako zinalindwa kwa usalama
        </span>
      </div>

      {/* ======================================================================
          DIVIDER
      ====================================================================== */}

      <div className="relative py-1">
        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
            flex
            items-center
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
            flex
            justify-center
            text-xs
            uppercase
          "
        >
          <span
            className="
              bg-background
              px-3
              font-medium
              text-muted-foreground
            "
          >
            AU
          </span>
        </div>
      </div>

      {/* ======================================================================
          REGISTER
      ====================================================================== */}

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
          tabIndex={loading ? -1 : 0}
          className="
            font-semibold
            text-primary
            transition-colors
            hover:text-primary/80
            focus:outline-none
            focus-visible:rounded
            focus-visible:ring-2
            focus-visible:ring-primary/30
          "
        >
          Jisajili hapa
        </Link>
      </div>
    </form>
  );
}

