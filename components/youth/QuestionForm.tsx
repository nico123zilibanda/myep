
"use client";

import { useEffect, useState } from "react";

import {
  Loader2,
  MessageSquarePlus,
  SendHorizonal,
  Sparkles,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/Card";

import {
  Alert,
  AlertDescription,
} from "@/components/ui/Alert";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

interface QuestionFormProps {
  onSuccess?: () => void;

  initialData?: {
    questionText?: string;
  };
}

export default function QuestionForm({
  onSuccess,
  initialData,
}: QuestionFormProps) {
  const [questionText, setQuestionText] =
    useState(
      initialData?.questionText || ""
    );

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  /* ================= SYNC ================= */

  useEffect(() => {
    if (
      initialData?.questionText
    ) {
      setQuestionText(
        initialData.questionText
      );
    }
  }, [initialData]);

  /* ================= SUBMIT ================= */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    if (
      !questionText.trim()
    ) {
      setError(
        "Tafadhali andika swali kabla ya kutuma"
      );

      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch(
        "/api/youth/questions",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            questionText,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        setError(
          data.message ||
            "Imeshindikana kutuma swali"
        );

        return;
      }

      onSuccess?.();

      setQuestionText("");
    } catch {
      setError(
        "Tatizo limetokea. Tafadhali jaribu tena."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* ================= HERO ================= */}

        <Card
          className="
            relative overflow-hidden

            rounded-[30px]

            border-border/60

            bg-linear-to-br
            from-primary/10
            via-background
            to-background
          "
        >
          {/* GLOW */}
          <div
            className="
              absolute right-0 top-0

              h-60 w-60

              translate-x-1/3
              -translate-y-1/3

              rounded-full

              bg-primary/10

              blur-3xl
            "
          />

          <CardContent
            className="
              relative z-10

              flex flex-col gap-5

              p-6

              sm:flex-row
              sm:items-start

              sm:p-8
            "
          >
            {/* ICON */}
            <div
              className="
                flex size-16 shrink-0
                items-center
                justify-center

                rounded-3xl

                bg-primary/10

                text-primary
              "
            >
              <MessageSquarePlus className="size-8" />
            </div>

            {/* CONTENT */}
            <div className="space-y-3">
              <div
                className="
                  inline-flex items-center gap-2

                  rounded-full

                  border

                  bg-background/80

                  px-3 py-1

                  text-xs
                  font-semibold

                  backdrop-blur
                "
              >
                <Sparkles className="size-3.5 text-primary" />

                Youth Support System
              </div>

              <div className="space-y-2">
                <h2
                  className="
                    text-2xl
                    font-black
                    tracking-tight

                    sm:text-3xl
                  "
                >
                  Uliza Swali Lako
                </h2>

                <p
                  className="
                    max-w-2xl

                    text-sm
                    leading-7

                    text-muted-foreground

                    sm:text-base
                  "
                >
                  Tuma swali lako kwa
                  admin na upate msaada,
                  ushauri, au majibu ya
                  maswali yanayohusiana
                  na maendeleo yako,
                  elimu, kazi, au maisha
                  ya kila siku.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================= FORM ================= */}

        <Card className="rounded-[30px] border-border/60">
          <CardContent className="space-y-6 p-6 sm:p-8">
            {/* HEADER */}
            <div className="space-y-1">
              <h3
                className="
                  text-xl
                  font-semibold
                  tracking-tight
                "
              >
                Andika Swali
              </h3>

              <p
                className="
                  text-sm
                  leading-6

                  text-muted-foreground
                "
              >
                Hakikisha umeelezea
                swali lako kwa uwazi ili
                kupata msaada sahihi.
              </p>
            </div>

            {/* TEXTAREA */}
            <div className="space-y-3">
              <Label htmlFor="question">
                Swali lako
              </Label>

              <div className="relative">
                <Textarea
                  id="question"
                  rows={7}
                  value={
                    questionText
                  }
                  onChange={(e) =>
                    setQuestionText(
                      e.target.value
                    )
                  }
                  placeholder="Mfano: Nawezaje kuboresha maisha yangu ya kielimu?"
                  aria-invalid={
                    !!error
                  }
                  className="
                    min-h-48

                    resize-none

                    rounded-2xl

                    border-border/60

                    bg-background

                    pr-20
                  "
                />

                {/* CHARACTER COUNT */}
                <div
                  className="
                    absolute bottom-3 right-3

                    rounded-full

                    border border-border

                    bg-background/90

                    px-2.5 py-1

                    text-[11px]
                    font-medium

                    text-muted-foreground

                    backdrop-blur-sm
                  "
                >
                  {
                    questionText.length
                  }{" "}
                  chars
                </div>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <Alert
                variant="destructive"
                className="
                  rounded-2xl
                "
              >
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* FOOTER */}
            <div
              className="
                flex flex-col gap-4

                border-t border-border/60

                pt-5

                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              {/* NOTE */}
              <div
                className="
                  text-sm
                  leading-6

                  text-muted-foreground
                "
              >
                Swali lako litatumwa
                moja kwa moja kwa admin
                kwa ajili ya mapitio na
                majibu.
              </div>

              {/* BUTTON */}
              <Button
                type="submit"
                size="lg"
                disabled={
                  isSubmitting ||
                  !questionText.trim()
                }
                className="
                  min-w-48

                  rounded-2xl
                "
              >
                {isSubmitting ? (
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
                  <>
                    <SendHorizonal className="size-4" />

                    Tuma Swali
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

