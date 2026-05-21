
"use client";

import { useState } from "react";

import {
  Loader2,
  SendHorizonal,
  MessageSquareText,
} from "lucide-react";

import { useDictionary } from "@/lib/i18n/useDictionary";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/Card";

import { Textarea } from "@/components/ui/textarea";

interface AnswerFormProps {
  onSubmit: (a: string) => Promise<void>;
}

export default function AnswerForm({
  onSubmit,
}: AnswerFormProps) {
  const t = useDictionary();

  const [answer, setAnswer] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  /* ================= SUBMIT ================= */

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    if (!answer.trim()) {
      alert(t("ANSWER_REQUIRED"));
      return;
    }

    try {
      setIsSubmitting(true);

      await onSubmit(answer);

      setAnswer("");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= UI ================= */

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* ================= HERO ================= */}
      <Card
        className="
          relative overflow-hidden

          border-border/60

          bg-linear-to-br
          from-emerald-500/5
          via-background
          to-background
        "
      >
        <div
          className="
            absolute right-0 top-0

            h-52 w-52

            translate-x-1/3
            -translate-y-1/3

            rounded-full

            bg-emerald-500/10

            blur-3xl
          "
        />

        <CardContent
          className="
            relative z-10

            flex items-start gap-4

            p-6
          "
        >
          <div
            className="
              flex size-14
              items-center
              justify-center

              rounded-2xl

              bg-emerald-500/10

              text-emerald-600
              dark:text-emerald-400
            "
          >
            <MessageSquareText className="size-7" />
          </div>

          <div className="space-y-1">
            <h2
              className="
                text-xl
                font-semibold
                tracking-tight
              "
            >
              Write Response
            </h2>

            <p
              className="
                max-w-2xl

                text-sm
                leading-relaxed

                text-muted-foreground
              "
            >
              Respond professionally and
              clearly to the user inquiry.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ================= FORM ================= */}
      <Card>
        <CardContent className="space-y-6 p-6">
          {/* HEADER */}
          <div className="space-y-1">
            <h3
              className="
                text-lg
                font-semibold
                tracking-tight
              "
            >
              Response Message
            </h3>

            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              Your response will be visible
              to the user immediately after
              submission.
            </p>
          </div>

          {/* TEXTAREA */}
          <div className="space-y-2">
            <label
              className="
                text-sm
                font-medium
              "
            >
              {t(
                "ANSWER_PLACEHOLDER",
              )}
            </label>

            <div className="relative">
              <Textarea
                value={answer}
                onChange={(e) =>
                  setAnswer(
                    e.target.value,
                  )
                }
                rows={7}
                placeholder={t(
                  "ANSWER_PLACEHOLDER",
                )}
                className="
                  min-h-44

                  resize-none

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
                {answer.length} chars
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div
            className="
              flex items-center
              justify-end
            "
          >
            <Button
              type="submit"
              size="lg"
              disabled={
                isSubmitting ||
                !answer.trim()
              }
              className="
                min-w-52
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

                  {t(
                    "ANSWER_SUBMITTING_BUTTON",
                  )}
                </>
              ) : (
                <>
                  <SendHorizonal className="size-4" />

                  {t(
                    "ANSWER_SUBMIT_BUTTON",
                  )}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

