
"use client";

import { useEffect, useMemo, useState } from "react";

import QuestionForm from "@/components/youth/QuestionForm";
import StatusBadge from "@/components/ui/StatusBadge";

import { useAppToast } from "@/lib/toast";
import type { MessageKey } from "@/lib/messages";

import { Card, CardContent } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/Alert";

import {
  MessageCircleQuestion,
  Info,
  Sparkles,
  MessagesSquare,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

/* ================= TYPES ================= */

interface Question {
  id: number;
  questionText: string;
  answerText?: string;
  status: "PENDING" | "ANSWERED" | "REJECTED";
}

interface ApiResponse<T = any> {
  success: boolean;
  messageKey: MessageKey;
  data?: T;
}

/* ================= PAGE ================= */

export default function YouthQuestionsPage() {
  const { showError } = useAppToast();

  const [questions, setQuestions] = useState<
    Question[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  /* ================= FETCH ================= */

  const fetchQuestions = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        "/api/youth/questions",
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      const result: ApiResponse<Question[]> =
        await res.json();

      if (!res.ok) {
        showError(
          result.messageKey ||
            "SERVER_ERROR"
        );

        setQuestions([]);

        return;
      }

      setQuestions(result.data || []);
    } catch {
      showError("SERVER_ERROR");

      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  /* ================= STATS ================= */

  const stats = useMemo(() => {
    return {
      total: questions.length,

      answered: questions.filter(
        (q) => q.status === "ANSWERED"
      ).length,

      pending: questions.filter(
        (q) => q.status === "PENDING"
      ).length,
    };
  }, [questions]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-8 p-4 sm:p-6 lg:p-8">
        {/* HERO */}
        <div className="rounded-[32px] border p-8">
          <Skeleton className="h-8 w-44 rounded-xl" />

          <Skeleton className="mt-5 h-14 w-2/3 rounded-2xl" />

          <Skeleton className="mt-4 h-5 w-full rounded-xl" />

          <Skeleton className="mt-2 h-5 w-5/6 rounded-xl" />
        </div>

        {/* STATS */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Skeleton
              key={item}
              className="h-28 rounded-3xl"
            />
          ))}
        </div>

        {/* FORM */}
        <Skeleton className="h-105 rounded-[32px]" />

        {/* QUESTIONS */}
        <Skeleton className="h-125 rounded-[32px]" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 sm:p-6 lg:p-8">
      {/* ================= HERO ================= */}

      <section
        className="
          relative overflow-hidden

          rounded-[34px]

          border border-zinc-200/70
          dark:border-zinc-800/70

          bg-white/80
          dark:bg-zinc-950/50

          p-6 sm:p-8 lg:p-10

          shadow-sm
          backdrop-blur-xl
        "
      >
        {/* BACKGROUND GLOWS */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 space-y-6">
          {/* BADGE */}
          <div
            className="
              inline-flex items-center gap-2

              rounded-full

              border border-blue-500/20

              bg-blue-500/10

              px-4 py-2

              text-xs font-semibold

              text-blue-600
              dark:text-blue-400
            "
          >
            <Sparkles className="h-3.5 w-3.5" />

            Youth Support Center
          </div>

          {/* TITLE */}
          <div className="max-w-3xl space-y-4">
            <h1
              className="
                text-3xl font-bold tracking-tight

                text-zinc-900
                dark:text-white

                sm:text-4xl lg:text-5xl
              "
            >
              Maswali ya Vijana
            </h1>

            <p
              className="
                max-w-2xl

                text-sm leading-relaxed

                text-zinc-600
                dark:text-zinc-400

                sm:text-base
              "
            >
              Uliza maswali kuhusu elimu,
              ajira, mafunzo, mikopo,
              biashara na huduma mbalimbali
              za halmashauri. Timu yetu
              itakujibu haraka iwezekanavyo.
            </p>
          </div>

          {/* MINI FEATURES */}
          <div className="flex flex-wrap gap-3">
            {[
              "Majibu ya haraka",
              "Support ya vijana",
              "Huduma salama",
            ].map((item) => (
              <div
                key={item}
                className="
                  inline-flex items-center gap-2

                  rounded-2xl

                  border border-zinc-200/70
                  dark:border-zinc-800/70

                  bg-white/70
                  dark:bg-zinc-900/60

                  px-4 py-2

                  text-xs font-medium

                  text-zinc-700
                  dark:text-zinc-300
                "
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />

                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}

      <div className="grid gap-4 sm:grid-cols-3">
        {/* TOTAL */}
        <div
          className="
            relative overflow-hidden

            rounded-[28px]

            border border-zinc-200/70
            dark:border-zinc-800/70

            bg-white/80
            dark:bg-zinc-950/50

            p-5

            shadow-sm
            backdrop-blur-xl
          "
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Total Questions
              </p>

              <h3 className="text-3xl font-bold">
                {stats.total}
              </h3>
            </div>

            <div
              className="
                flex h-12 w-12 items-center justify-center

                rounded-2xl

                bg-blue-500/10

                text-blue-600
              "
            >
              <MessagesSquare className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* ANSWERED */}
        <div
          className="
            relative overflow-hidden

            rounded-[28px]

            border border-zinc-200/70
            dark:border-zinc-800/70

            bg-white/80
            dark:bg-zinc-950/50

            p-5

            shadow-sm
            backdrop-blur-xl
          "
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Answered
              </p>

              <h3 className="text-3xl font-bold text-emerald-600">
                {stats.answered}
              </h3>
            </div>

            <div
              className="
                flex h-12 w-12 items-center justify-center

                rounded-2xl

                bg-emerald-500/10

                text-emerald-600
              "
            >
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* PENDING */}
        <div
          className="
            relative overflow-hidden

            rounded-[28px]

            border border-zinc-200/70
            dark:border-zinc-800/70

            bg-white/80
            dark:bg-zinc-950/50

            p-5

            shadow-sm
            backdrop-blur-xl
          "
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Pending
              </p>

              <h3 className="text-3xl font-bold text-amber-600">
                {stats.pending}
              </h3>
            </div>

            <div
              className="
                flex h-12 w-12 items-center justify-center

                rounded-2xl

                bg-amber-500/10

                text-amber-600
              "
            >
              <Clock3 className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= INFO ALERT ================= */}

      <Alert
        className="
          rounded-[30px]

          border border-blue-500/20

          bg-blue-500/5

          p-5
        "
      >
        <Info className="h-5 w-5 text-blue-600" />

        <div>
          <AlertTitle className="font-semibold text-zinc-900 dark:text-white">
            Taarifa Muhimu
          </AlertTitle>

          <AlertDescription
            className="
              mt-2

              text-sm leading-relaxed

              text-zinc-600
              dark:text-zinc-400
            "
          >
            Majibu yanaweza kuchukua muda
            mfupi kutegemea na aina ya
            swali lako. Tafadhali kuwa na
            subira wakati timu yetu
            inachakata maombi yako.
          </AlertDescription>
        </div>
      </Alert>

      {/* ================= FORM SECTION ================= */}

      <Card
        className="
          overflow-hidden

          rounded-[34px]

          border border-zinc-200/70
          dark:border-zinc-800/70

          bg-white/80
          dark:bg-zinc-950/50

          shadow-sm
          backdrop-blur-xl
        "
      >
        <CardContent className="p-0">
          {/* HEADER */}
          <div
            className="
              flex flex-col gap-4

              border-b border-zinc-200/70
              dark:border-zinc-800/70

              p-6 sm:flex-row sm:items-center sm:justify-between
            "
          >
            <div className="space-y-2">
              <div
                className="
                  inline-flex items-center gap-2

                  rounded-full

                  border border-violet-500/20

                  bg-violet-500/10

                  px-3 py-1

                  text-xs font-semibold

                  text-violet-600
                "
              >
                <MessageCircleQuestion className="h-3.5 w-3.5" />

                New Question
              </div>

              <h2 className="text-xl font-bold tracking-tight">
                Uliza Swali Jipya
              </h2>

              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Tuma swali lako moja kwa
                moja kwa timu ya support.
              </p>
            </div>

            <div
              className="
                hidden h-14 w-14 items-center justify-center

                rounded-2xl

                bg-primary/10

                text-primary

                sm:flex
              "
            >
              <ChevronRight className="h-6 w-6" />
            </div>
          </div>

          {/* FORM */}
          <div className="p-6">
            <QuestionForm
              onSuccess={fetchQuestions}
            />
          </div>
        </CardContent>
      </Card>

      {/* ================= QUESTIONS LIST ================= */}

      <Card
        className="
          overflow-hidden

          rounded-[34px]

          border border-zinc-200/70
          dark:border-zinc-800/70

          bg-white/80
          dark:bg-zinc-950/50

          shadow-sm
          backdrop-blur-xl
        "
      >
        <CardContent className="p-0">
          {/* HEADER */}
          <div
            className="
              flex flex-col gap-4

              border-b border-zinc-200/70
              dark:border-zinc-800/70

              p-6 sm:flex-row sm:items-center sm:justify-between
            "
          >
            <div className="space-y-2">
              <div
                className="
                  inline-flex items-center gap-2

                  rounded-full

                  border border-emerald-500/20

                  bg-emerald-500/10

                  px-3 py-1

                  text-xs font-semibold

                  text-emerald-600
                "
              >
                <ShieldCheck className="h-3.5 w-3.5" />

                Question History
              </div>

              <h2 className="text-xl font-bold tracking-tight">
                Maswali Yangu
              </h2>

              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Orodha ya maswali yote
                uliyotuma pamoja na majibu.
              </p>
            </div>

            <div
              className="
                inline-flex items-center gap-2

                rounded-2xl

                border border-zinc-200
                dark:border-zinc-800

                bg-white/70
                dark:bg-zinc-900/60

                px-4 py-2

                text-sm font-medium
              "
            >
              <MessagesSquare className="h-4 w-4 text-primary" />

              {questions.length} total
            </div>
          </div>

          {/* EMPTY */}
          {questions.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div
                className="
                  flex h-20 w-20 items-center justify-center

                  rounded-[28px]

                  bg-primary/10

                  text-primary
                "
              >
                <MessageCircleQuestion className="h-10 w-10" />
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-tight">
                Hakuna Maswali
              </h3>

              <p
                className="
                  mt-3 max-w-md

                  text-sm leading-relaxed

                  text-zinc-500
                  dark:text-zinc-400
                "
              >
                Bado hujatuma swali lolote.
                Tumia form hapo juu kuanza
                kuuliza maswali yako.
              </p>
            </div>
          ) : (
            <div className="space-y-5 p-6">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="
                    group relative overflow-hidden

                    rounded-[28px]

                    border border-zinc-200/70
                    dark:border-zinc-800/70

                    bg-white/70
                    dark:bg-zinc-900/40

                    p-5

                    transition-all duration-300

                    hover:-translate-y-1
                    hover:shadow-lg
                  "
                >
                  {/* TOP */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      {/* ICON */}
                      <div
                        className="
                          flex h-12 w-12 shrink-0 items-center justify-center

                          rounded-2xl

                          bg-primary/10

                          text-primary
                        "
                      >
                        <MessageCircleQuestion className="h-5 w-5" />
                      </div>

                      {/* CONTENT */}
                      <div className="space-y-3">
                        <p
                          className="
                            text-sm leading-relaxed

                            text-zinc-700
                            dark:text-zinc-300

                            sm:text-base
                          "
                        >
                          {q.questionText}
                        </p>

                        <div className="flex items-center gap-2">
                          <StatusBadge
                            status={q.status}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ANSWER */}
                  {q.answerText && (
                    <div
                      className="
                        mt-5 overflow-hidden

                        rounded-2xl

                        border border-emerald-500/20

                        bg-emerald-500/5
                      "
                    >
                      {/* HEADER */}
                      <div
                        className="
                          flex items-center gap-2

                          border-b border-emerald-500/10

                          px-4 py-3
                        "
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />

                        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                          Jibu Kutoka Support Team
                        </span>
                      </div>

                      {/* BODY */}
                      <div className="px-4 py-4">
                        <p
                          className="
                            text-sm leading-relaxed

                            text-zinc-700
                            dark:text-zinc-300
                          "
                        >
                          {q.answerText}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

