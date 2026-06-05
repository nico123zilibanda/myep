
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
} from "lucide-react";

import { useAppToast } from "@/lib/toast";
import { useDictionary } from "@/lib/i18n/useDictionary";

export default function ChangePasswordForm() {
  const { showSuccess, showError } = useAppToast();

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

  /* ================= PASSWORD VALIDATION ================= */

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

  /* ================= INPUT CHANGE ================= */

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
      setErrorKey("PASSWORD_MISMATCH_LOCAL");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch(
        "/api/admin/profile/password",
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

  /* ================= BUTTON DISABLED ================= */

  const isDisabled =
    isSubmitting ||
    !form.password ||
    !form.confirmPassword;

  /* ================= PASSWORD STRENGTH ================= */

  const strengthStyles = {
    weak: {
      text: "Nenosiri Dhaifu",
      bar: "w-1/3 bg-red-500/80",
      textColor: "text-red-500",
    },

    medium: {
      text: "Nenosiri la Kati",
      bar: "w-2/3 bg-amber-500/80",
      textColor: "text-amber-500",
    },

    strong: {
      text: "Nenosiri Imara",
      bar: "w-full bg-emerald-500/80",
      textColor: "text-emerald-500",
    },
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-8"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      {/* ================= HEADER ================= */}

      <div className="relative flex items-start gap-4">
        <div
          className="
            flex h-12 w-12 shrink-0 items-center justify-center

            rounded-2xl

            bg-red-500/10
            text-red-500
          "
        >
          <Shield className="h-5 w-5" />
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">
            {t("SECURITY_TITLE")}
          </h2>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {t("SECURITY_SUBTITLE")}
          </p>
        </div>
      </div>

      {/* ================= ERROR ALERT ================= */}

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

      <div className="grid gap-8 xl:grid-cols-2">
        {/* LEFT SIDE */}

        <div className="space-y-5">
          {/* PASSWORD INPUT */}

          <div className="relative">
            <FormInput
              labelKey="NEW_PASSWORD_LABEL"
              name="password"
              placeholder="Nenosiri Jipya"
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

                bg-zinc-100
                dark:bg-zinc-800

                text-zinc-600
                dark:text-zinc-300

                transition-all duration-200

                hover:scale-105
                hover:bg-zinc-200
                dark:hover:bg-zinc-700
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
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Nguvu ya Nenosiri
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

          <div className="rounded-3xl border bg-muted/30 p-5">
            <div className="mb-4 flex items-center gap-2">
              <LockKeyhole className="h-4 w-4 text-primary" />

              <p className="text-sm font-semibold">
                Mahitaji ya Nenosiri
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  ok: validations.length,
                  label:
                    "Angalau herufi 8",
                },

                {
                  ok: validations.uppercase,
                  label:
                    "Herufi moja kubwa",
                },

                {
                  ok: validations.lowercase,
                  label:
                    "Herufi moja ndogo",
                },

                {
                  ok: validations.number,
                  label: "Namba moja",
                },

                {
                  ok: validations.special,
                  label:
                    "Alama maalum moja",
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
                          : "text-zinc-300 dark:text-zinc-700"
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

        {/* RIGHT SIDE */}

        <div className="space-y-5">
          {/* CONFIRM PASSWORD */}

          <div className="relative">
            <FormInput
              labelKey="CONFIRM_PASSWORD_LABEL"
              name="confirmPassword"
              placeholder="Thibitisha Nenosiri"
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

                bg-zinc-100
                dark:bg-zinc-800

                text-zinc-600
                dark:text-zinc-300

                transition-all duration-200

                hover:scale-105
                hover:bg-zinc-200
                dark:hover:bg-zinc-700
              "
            >
              {showConfirmPassword ? (
                <EyeOff size={17} />
              ) : (
                <Eye size={17} />
              )}
            </button>
          </div>

          {/* LIVE MATCH STATUS */}

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
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-500"
                }
              >
                {validations.match
                  ? "Manenosiri yanafanana"
                  : "Manenosiri hayafanani"}
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
                      : "text-zinc-400"
                  }
                `}
              />

              <div>
                <p className="text-sm font-semibold">
                  Uthibitisho wa Nenosiri
                </p>

                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {form.confirmPassword.length === 0
                    ? "Thibitisha nenosiri lako ili kuendelea."
                    : validations.match
                    ? "Manenosiri yanafanana kikamilifu."
                    : "Manenosiri hayafanani."}
                </p>
              </div>
            </div>
          </div>

          {/* SECURITY TIP */}

          <div className="rounded-3xl border bg-muted/30 p-5">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 text-primary" />

              <div>
                <p className="text-sm font-semibold">
                  Kidokezo cha Usalama
                </p>

                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Tumia nenosiri imara na la kipekee ambalo
                  hujawahi kulitumia kwenye mifumo au
                  tovuti nyingine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SUBMIT ================= */}

      <div className="flex justify-end">
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

            shadow-sm

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

