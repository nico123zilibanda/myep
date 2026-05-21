
"use client";

import { useState } from "react";

import Link from "next/link";

import { Loader2, Mail, ArrowLeft } from "lucide-react";

import { useAppToast } from "@/lib/toast";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

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

        body: JSON.stringify({
          email: cleanEmail,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showError("SERVER_ERROR");
        return;
      }

      showSuccess(data.message);

      setEmail("");
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* INFO */}
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
            <Mail className="size-5" />
          </div>

          <div className="space-y-1">
            <h3
              className="
                text-sm
                font-semibold

                text-foreground
              "
            >
              Rudisha Akaunti Yako
            </h3>

            <p
              className="
                text-sm
                leading-relaxed

                text-muted-foreground
              "
            >
              Weka barua pepe yako ili utumiwe kiungo cha kubadilisha
              nenosiri.
            </p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* EMAIL */}
        <div className="space-y-2">
          <Label htmlFor="email">
            Barua Pepe
          </Label>

          <div className="relative">
            <Mail
              className="
                absolute left-3 top-1/2

                size-4

                -translate-y-1/2

                text-muted-foreground
              "
            />

            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
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

              Inatuma...
            </>
          ) : (
            "Tuma Kiungo cha Reset"
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

