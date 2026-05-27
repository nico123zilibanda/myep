"use client";

import { useMemo, useState } from "react";

import FormInput from "@/components/forms/FormInput";

import {
  Loader2,
  Eye,
  EyeOff,
  Shield,
  CheckCircle2,
  AlertTriangle,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

import { useAppToast } from "@/lib/toast";
import { useDictionary } from "@/lib/i18n/useDictionary";

export default function ChangePasswordForm() {
  const { showSuccess, showError } =
    useAppToast();

  const t = useDictionary();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [errorKey, setErrorKey] = useState<
    string | null
  >(null);

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  /* ================= VALIDATIONS ================= */

  const validations = useMemo(() => {
    const password = form.password;

    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),

      match:
        password.length > 0 &&
        password === form.confirmPassword,
    };
  }, [form]);

  const passedCount = Object.values(
    validations
  ).filter(Boolean).length;

  const passwordStrength =
    passedCount <= 2
      ? "weak"
      : passedCount <= 4
      ? "medium"
      : "strong";

  /* ================= INPUT ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errorKey) {
      setErrorKey(null);
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setErrorKey(null);

    if (!validations.length) {
      setErrorKey("PASSWORD_TOO_SHORT_LOCAL");
      return;
    }

    if (!validations.match) {
      setErrorKey(
        "PASSWORD_MISMATCH_LOCAL"
      );

      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch(
        "/api/youth/profile/password",
        {
          method: "PATCH",
          credentials: "include",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            password: form.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        showError(
          data.messageKey ||
            "ACTION_FAILED"
        );

        return;
      }

      showSuccess(
        data.messageKey ||
          "PASSWORD_CHANGED"
      );

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

  /* ================= HELPERS ================= */

  const isDisabled =
    isSubmitting ||
    !form.password ||
    !form.confirmPassword;

  const strengthStyles = {
    weak: {
      text: "Weak Password",
      bar: "w-1/3 bg-red-500",
      textColor: "text-red-500",
    },

    medium: {
      text: "Medium Password",
      bar: "w-2/3 bg-amber-500",
      textColor: "text-amber-500",
    },

    strong: {
      text: "Strong Password",
      bar: "w-full bg-emerald-500",
      textColor: "text-emerald-500",
    },
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        relative overflow-hidden

        rounded-[30px]

        border border-border/60

        bg-background/80

        p-6 sm:p-8

        shadow-sm
        backdrop-blur-xl

        space-y-8
      "
    >
      {/* BACKGROUND EFFECTS */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      {/* ================= HEADER ================= */}

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
        <div
          className="
            flex h-14 w-14 shrink-0 items-center justify-center

            rounded-3xl

            bg-linear-to-br
            from-red-500
            to-rose-500

            text-white

            shadow-lg shadow-red-500/20
          "
        >
          <Shield className="h-6 w-6" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-500">
            <Sparkles className="h-3.5 w-3.5" />
            Security Settings
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {t("SECURITY_TITLE")}
            </h2>

            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {t("SECURITY_SUBTITLE")}
            </p>
          </div>
        </div>
      </div>

      {/* ================= ERROR ================= */}

      {errorKey && (
        <div
          className="
            relative flex items-start gap-3

            rounded-2xl

            border border-red-500/20
            bg-red-500/5

            px-4 py-3
          "
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

          <div>
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              {t(errorKey)}
            </p>
          </div>
        </div>
      )}

      {/* ================= CONTENT ================= */}

      <div className="relative grid gap-8 xl:grid-cols-2">
        {/* LEFT */}

        <div className="space-y-6">
          {/* PASSWORD */}

          <div className="relative">
            <FormInput
              labelKey="NEW_PASSWORD_LABEL"
              name="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={form.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (prev) => !prev
                )
              }
              className="
                absolute right-3 top-9

                flex h-10 w-10 items-center justify-center

                rounded-xl

                border border-border

                bg-background/80

                text-muted-foreground

                transition-all duration-200

                hover:bg-muted
                hover:text-foreground
              "
            >
              {showPassword ? (
                <EyeOff size={17} />
              ) : (
                <Eye size={17} />
              )}
            </button>
          </div>

          {/* PASSWORD STRENGTH */}

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Password Strength
              </span>

              <span
                className={`
                  text-xs font-semibold
                  ${strengthStyles[passwordStrength].textColor}
                `}
              >
                {
                  strengthStyles[
                    passwordStrength
                  ].text
                }
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className={`
                  h-full rounded-full transition-all duration-500
                  ${strengthStyles[passwordStrength].bar}
                `}
              />
            </div>
          </div>

          {/* REQUIREMENTS */}

          <div
            className="
              rounded-3xl

              border border-border/60

              bg-muted/30

              p-5
            "
          >
            <div className="mb-5 flex items-center gap-2">
              <LockKeyhole className="h-4 w-4 text-primary" />

              <p className="text-sm font-semibold">
                Password Requirements
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  ok: validations.length,
                  label:
                    "At least 8 characters",
                },

                {
                  ok: validations.uppercase,
                  label:
                    "One uppercase letter",
                },

                {
                  ok: validations.lowercase,
                  label:
                    "One lowercase letter",
                },

                {
                  ok: validations.number,
                  label: "One number",
                },

                {
                  ok: validations.special,
                  label:
                    "One special character",
                },
              ].map((rule, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    className={`
                      h-4 w-4

                      ${
                        rule.ok
                          ? "text-emerald-500"
                          : "text-muted-foreground/40"
                      }
                    `}
                  />

                  <span
                    className={`
                      text-sm

                      ${
                        rule.ok
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }
                    `}
                  >
                    {rule.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="space-y-6">
          {/* CONFIRM PASSWORD */}

          <div className="relative">
            <FormInput
              labelKey="CONFIRM_PASSWORD_LABEL"
              name="confirmPassword"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  (prev) => !prev
                )
              }
              className="
                absolute right-3 top-9

                flex h-10 w-10 items-center justify-center

                rounded-xl

                border border-border

                bg-background/80

                text-muted-foreground

                transition-all duration-200

                hover:bg-muted
                hover:text-foreground
              "
            >
              {showConfirmPassword ? (
                <EyeOff size={17} />
              ) : (
                <Eye size={17} />
              )}
            </button>
          </div>

          {/* MATCH STATUS */}

          {form.confirmPassword && (
            <div className="flex items-center gap-2 text-xs">
              <div
                className={`
                  h-2 w-2 rounded-full

                  ${
                    validations.match
                      ? "bg-emerald-500"
                      : "bg-red-500"
                  }
                `}
              />

              <span
                className={
                  validations.match
                    ? "text-emerald-500"
                    : "text-red-500"
                }
              >
                {validations.match
                  ? "Passwords match"
                  : "Passwords do not match"}
              </span>
            </div>
          )}

          {/* STATUS CARD */}

          <div
            className={`
              rounded-3xl border p-5 transition-all duration-300

              ${
                form.confirmPassword.length === 0
                  ? `
                    border-border
                    bg-muted/20
                  `
                  : validations.match
                  ? `
                    border-emerald-500/20
                    bg-emerald-500/5
                  `
                  : `
                    border-red-500/20
                    bg-red-500/5
                  `
              }
            `}
          >
            <div className="flex items-start gap-3">
              <CheckCircle2
                className={`
                  mt-0.5 h-5 w-5 shrink-0

                  ${
                    validations.match
                      ? "text-emerald-500"
                      : "text-muted-foreground"
                  }
                `}
              />

              <div>
                <p className="text-sm font-semibold">
                  Password Confirmation
                </p>

                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {form.confirmPassword.length === 0
                    ? "Confirm your password to continue."
                    : validations.match
                    ? "Passwords match successfully."
                    : "Passwords do not match."}
                </p>
              </div>
            </div>
          </div>

          {/* SECURITY TIP */}

          <div
            className="
              rounded-3xl

              border border-primary/10

              bg-primary/5

              p-5
            "
          >
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 text-primary" />

              <div>
                <p className="text-sm font-semibold">
                  Security Tip
                </p>

                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Use a strong and unique password
                  that you have not used on other
                  systems or websites.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SUBMIT ================= */}

      <div className="relative flex justify-end">
        <button
          disabled={isDisabled}
          type="submit"
          className="
            inline-flex items-center justify-center gap-2

            rounded-2xl

            bg-primary
            hover:bg-primary/90

            px-6 py-3.5

            text-sm font-semibold
            text-primary-foreground

            shadow-lg shadow-primary/20

            transition-all duration-200

            hover:-translate-y-0.5

            disabled:pointer-events-none
            disabled:opacity-50
          "
        >
          {isSubmitting && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}

          {isSubmitting
            ? t(
                "CHANGING_PASSWORD_BUTTON"
              )
            : t(
                "CHANGE_PASSWORD_BUTTON"
              )}
        </button>
      </div>
    </form>
  );
}