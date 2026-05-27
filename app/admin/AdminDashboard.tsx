"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Clock3,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import clsx from "clsx";

import StatCard from "@/components/StatCard";
import QuickAction from "@/components/QuickActions";

import Modal from "@/components/ui/Modal";

import AnswerForm from "@/components/forms/AnswerForm";
import OpportunityForm from "@/components/forms/OpportunityForm";
import TrainingsForm from "@/components/forms/TrainingsForm";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/Alert";

import {
  Card,
  CardContent,
} from "@/components/ui/Card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/Skeleton";

import { useAppToast } from "@/lib/toast";

/* ================= TYPES ================= */

interface Stats {
  vijanaCount: number;

  opportunitiesCount: number;

  trainingsCount: number;

  questionsCount: number;
}

interface Question {
  id: number;

  questionText: string;
}

interface Category {
  id: number;

  name: string;
}

interface ApiResponse<T = any> {
  success: boolean;

  messageKey?: string;

  data?: T;
}

interface AdminDashboardProps {
  stats: Stats;
}

/* ================= GREETING ================= */

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Habari za Asubuhi";
  }

  if (hour < 18) {
    return "Habari za Mchana";
  }

  return "Habari za Jioni";
}

/* ================= COMPONENT ================= */

export default function AdminDashboard({
  stats,
}: AdminDashboardProps) {
  const { showSuccess, showError } =
    useAppToast();

  const {
    vijanaCount,
    opportunitiesCount,
    trainingsCount,
    questionsCount,
  } = stats;

  const [openModal, setOpenModal] =
    useState<
      | "opportunity"
      | "training"
      | "question"
      | null
    >(null);

  const [
    pendingQuestions,
    setPendingQuestions,
  ] = useState<Question[]>([]);

  const [
    loadingQuestions,
    setLoadingQuestions,
  ] = useState(false);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [submitting, setSubmitting] =
    useState(false);

  const [loadingStats, setLoadingStats] =
    useState(true);

  /* ================= FETCH CATEGORIES ================= */

  useEffect(() => {
    fetch("/api/admin/categories", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) =>
        setCategories(data.data || [])
      )
      .catch(() => setCategories([]))
      .finally(() =>
        setLoadingStats(false)
      );
  }, []);

  /* ================= DATE ================= */

  const today =
    new Date().toLocaleDateString(
      "sw-TZ",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  /* ================= OPPORTUNITY SUBMIT ================= */

  const handleOpportunitySubmit = async (
    form: any
  ) => {
    try {
      setSubmitting(true);

      const res = await fetch(
        "/api/admin/opportunities",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          credentials: "include",

          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        showError(
          data.messageKey ||
            "SERVER_ERROR"
        );

        return;
      }

      showSuccess(data.messageKey);

      setOpenModal(null);
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= TRAINING SUBMIT ================= */

  const handleTrainingSubmit = async (
    formData: FormData
  ) => {
    try {
      setSubmitting(true);

      const res = await fetch(
        "/api/admin/trainings",
        {
          method: "POST",

          body: formData,

          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        showError(
          data.messageKey ||
            "SERVER_ERROR"
        );

        return;
      }

      showSuccess(data.messageKey);

      setOpenModal(null);
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= FETCH QUESTIONS ================= */

  const fetchPendingQuestions =
    async () => {
      setLoadingQuestions(true);

      try {
        const res = await fetch(
          "/api/admin/questions?status=PENDING",
          {
            credentials: "include",

            cache: "no-store",
          }
        );

        const result: ApiResponse<
          Question[]
        > = await res.json();

        if (!res.ok) {
          setPendingQuestions([]);

          return;
        }

        setPendingQuestions(
          result.data || []
        );
      } catch {
        setPendingQuestions([]);
      } finally {
        setLoadingQuestions(false);
      }
    };

  /* ================= UI ================= */

  return (
    <div className="space-y-8">
      {/* ================= HERO ================= */}

      <section
        className="
          relative overflow-hidden

          rounded-[32px]

          border border-border/60

          bg-linear-to-br
          from-primary/12
          via-background
          to-indigo-500/5

          p-6 sm:p-8 lg:p-10

          shadow-sm
        "
      >
        {/* GLOW */}
        <div
          className="
            absolute -right-10 -top-10

            h-64 w-64

            rounded-full

            bg-primary/10

            blur-3xl
          "
        />

        <div
          className="
            absolute -bottom-16 left-0

            h-56 w-56

            rounded-full

            bg-indigo-500/10

            blur-3xl
          "
        />

        {/* CONTENT */}
        <div
          className="
            relative z-10

            flex flex-col gap-8

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* LEFT */}
          <div className="max-w-3xl">
            {/* BADGE */}
            <Badge
              variant="secondary"
              className="
                mb-5

                rounded-full

                border border-primary/10

                bg-background/70

                px-4 py-1.5

                text-xs
                font-semibold

                backdrop-blur-sm
              "
            >
              <Sparkles className="mr-2 size-3.5 text-primary" />

              Mfumo wa Usimamizi wa
              Mlele DC
            </Badge>

            {/* TITLE */}
            {loadingStats ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-72 rounded-2xl" />

                <Skeleton className="h-5 w-full max-w-xl rounded-xl" />
              </div>
            ) : (
              <>
                <h1
                  className="
                    text-3xl
                    font-black
                    tracking-tight

                    sm:text-4xl
                    xl:text-5xl
                  "
                >
                  {getGreeting()},{" "}
                  <span className="text-primary">
                    Admin
                  </span>{" "}
                  👋
                </h1>

                <p
                  className="
                    mt-5

                    max-w-2xl

                    text-sm
                    leading-relaxed
                    text-muted-foreground

                    sm:text-base
                  "
                >
                  Simamia vijana,
                  fursa, mafunzo, na
                  maswali yote ndani ya
                  mfumo wa Mlele District
                  Council kupitia
                  dashibodi hii ya
                  kisasa.
                </p>
              </>
            )}

            {/* ACTIONS */}
            <div
              className="
                mt-7

                flex flex-wrap items-center gap-3
              "
            >
              <Button
                size="lg"
                className="
                  rounded-2xl
                "
                onClick={() =>
                  setOpenModal(
                    "opportunity"
                  )
                }
              >
                Ongeza Fursa

                <ArrowRight className="ml-2 size-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="
                  rounded-2xl
                "
                onClick={() =>
                  setOpenModal(
                    "training"
                  )
                }
              >
                Ongeza Mafunzo
              </Button>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
              grid grid-cols-2 gap-4

              lg:w-[320px]
            "
          >
            {/* DATE */}
            <div
              className="
                rounded-3xl

                border border-border/60

                bg-background/70

                p-5

                backdrop-blur-xl
              "
            >
              <div
                className="
                  mb-3

                  flex size-11 items-center justify-center

                  rounded-2xl

                  bg-primary/10

                  text-primary
                "
              >
                <Clock3 className="size-5" />
              </div>

              <p
                className="
                  text-xs
                  text-muted-foreground
                "
              >
                Leo ni
              </p>

              <h3
                className="
                  mt-2

                  text-sm
                  font-semibold
                  leading-relaxed
                "
              >
                {today}
              </h3>
            </div>

            {/* STATUS */}
            <div
              className="
                rounded-3xl

                border border-border/60

                bg-background/70

                p-5

                backdrop-blur-xl
              "
            >
              <div
                className="
                  mb-3

                  flex size-11 items-center justify-center

                  rounded-2xl

                  bg-emerald-500/10

                  text-emerald-500
                "
              >
                <ShieldCheck className="size-5" />
              </div>

              <p
                className="
                  text-xs
                  text-muted-foreground
                "
              >
                Mfumo
              </p>

              <h3
                className="
                  mt-2

                  text-sm
                  font-semibold
                "
              >
                Unafanya kazi vizuri
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}

      <section>
        {/* HEADER */}
        <div
          className="
            mb-5

            flex flex-col gap-2

            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <h2
              className="
                text-xl
                font-bold
                tracking-tight
              "
            >
              Muhtasari wa Mfumo
            </h2>

            <p
              className="
                mt-1

                text-sm
                text-muted-foreground
              "
            >
              Takwimu muhimu za mfumo
              kwa sasa.
            </p>
          </div>

          <div
            className="
              flex items-center gap-2

              text-xs
              text-emerald-600

              dark:text-emerald-400
            "
          >
            <TrendingUp className="size-4" />

            Mfumo unaendelea vizuri
          </div>
        </div>

        {/* GRID */}
        <div
          className="
            grid grid-cols-1 gap-5

            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          <StatCard
            titleKey="STAT_TOTAL_USERS"
            value={vijanaCount}
            color="blue"
            icon={<Users />}
          />

          <StatCard
            titleKey="STAT_TOTAL_OPPORTUNITIES"
            value={opportunitiesCount}
            color="green"
            icon={<Briefcase />}
          />

          <StatCard
            titleKey="STAT_TOTAL_TRAININGS"
            value={trainingsCount}
            color="purple"
            icon={<BookOpen />}
          />

          <StatCard
            titleKey="STAT_TOTAL_APPLICATIONS"
            value={questionsCount}
            color="red"
            icon={<MessageCircle />}
          />
        </div>
      </section>

      {/* ================= QUICK ACTIONS ================= */}

      <section>
        {/* HEADER */}
        <div
          className="
            mb-5

            flex flex-col gap-2

            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <h2
              className="
                text-xl
                font-bold
                tracking-tight
              "
            >
              Vitendo vya Haraka
            </h2>

            <p
              className="
                mt-1

                text-sm
                text-muted-foreground
              "
            >
              Simamia shughuli muhimu
              kwa urahisi zaidi.
            </p>
          </div>
        </div>

        {/* GRID */}
        <div
          className="
            grid grid-cols-1 gap-5

            sm:grid-cols-2
            xl:grid-cols-3
          "
        >
          <QuickAction
            titleKey="QA_CREATE_OPPORTUNITY_TITLE"
            descriptionKey="QA_CREATE_OPPORTUNITY_DESC"
            icon={Briefcase}
            color="green"
            onClick={() =>
              setOpenModal(
                "opportunity"
              )
            }
          />

          <QuickAction
            titleKey="QA_CREATE_TRAINING_TITLE"
            descriptionKey="QA_CREATE_TRAINING_DESC"
            icon={BookOpen}
            color="purple"
            onClick={() =>
              setOpenModal("training")
            }
          />

          <QuickAction
            titleKey="QA_VIEW_APPLICATIONS_TITLE"
            descriptionKey="QA_VIEW_APPLICATIONS_DESC"
            icon={MessageCircle}
            color="red"
            onClick={async () => {
              await fetchPendingQuestions();

              setOpenModal("question");
            }}
          />
        </div>
      </section>

      {/* ================= INFO SECTION ================= */}

      <section
        className="
          grid grid-cols-1 gap-5

          xl:grid-cols-3
        "
      >
        {/* LEFT */}
        <div className="xl:col-span-2">
          <Alert
            className="
              rounded-[28px]

              border-primary/10

              bg-primary/3
            "
          >
            <Sparkles className="size-5" />

            <div>
              <AlertTitle>
                Taarifa Muhimu
              </AlertTitle>

              <AlertDescription
                className="
                  mt-2

                  leading-relaxed
                "
              >
                Hakikisha taarifa zote
                za fursa na mafunzo
                zinawekwa kwa usahihi
                ili vijana waweze kupata
                taarifa sahihi kwa wakati
                unaofaa.
              </AlertDescription>
            </div>
          </Alert>
        </div>

        {/* RIGHT */}
        <Card
          className="
            rounded-[28px]

            border-border/60
          "
        >
          <CardContent className="p-6">
            <div
              className="
                flex size-12 items-center justify-center

                rounded-2xl

                bg-primary/10

                text-primary
              "
            >
              <ShieldCheck className="size-5" />
            </div>

            <h3
              className="
                mt-5

                text-lg
                font-bold
              "
            >
              Mfumo wa Kisasa
            </h3>

            <p
              className="
                mt-3

                text-sm
                leading-relaxed
                text-muted-foreground
              "
            >
              Mfumo umeboreshwa kwa
              matumizi ya kisasa ili
              kuongeza ufanisi wa
              usimamizi wa taarifa za
              vijana, mafunzo, na
              fursa.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* ================= EXTRA CARDS ================= */}

      <section
        className="
          grid grid-cols-1 gap-5

          lg:grid-cols-2
        "
      >
        {/* CARD */}
        <Card
          className="
            group

            rounded-[28px]

            border-border/60

            transition-all duration-300

            hover:-translate-y-1
            hover:shadow-xl
          "
        >
          <CardContent className="p-6">
            <div
              className="
                flex size-12 items-center justify-center

                rounded-2xl

                bg-indigo-500/10

                text-indigo-500
              "
            >
              <Users className="size-5" />
            </div>

            <h3
              className="
                mt-5

                text-lg
                font-bold
              "
            >
              Usimamizi wa Vijana
            </h3>

            <p
              className="
                mt-3

                text-sm
                leading-relaxed
                text-muted-foreground
              "
            >
              Fuatilia taarifa za
              vijana waliosajiliwa ndani
              ya mfumo na usimamie
              maendeleo yao kwa
              ufanisi zaidi.
            </p>
          </CardContent>
        </Card>

        {/* CARD */}
        <Card
          className="
            group

            rounded-[28px]

            border-border/60

            transition-all duration-300

            hover:-translate-y-1
            hover:shadow-xl
          "
        >
          <CardContent className="p-6">
            <div
              className="
                flex size-12 items-center justify-center

                rounded-2xl

                bg-emerald-500/10

                text-emerald-500
              "
            >
              <Briefcase className="size-5" />
            </div>

            <h3
              className="
                mt-5

                text-lg
                font-bold
              "
            >
              Fursa na Ajira
            </h3>

            <p
              className="
                mt-3

                text-sm
                leading-relaxed
                text-muted-foreground
              "
            >
              Ongeza na simamia
              matangazo ya ajira,
              mafunzo, pamoja na
              shughuli mbalimbali za
              maendeleo ya vijana.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* ================= QUESTIONS MODAL ================= */}

      {openModal === "question" && (
        <Modal
          title="Maswali Yanayosubiri"
          open
          onClose={() =>
            setOpenModal(null)
          }
        >
          <div className="space-y-4">
            {/* LOADING */}
            {loadingQuestions && (
              <div
                className="
                  rounded-2xl

                  border border-zinc-200
                  dark:border-zinc-800

                  bg-zinc-50
                  dark:bg-zinc-900

                  p-6

                  text-center
                  text-sm text-zinc-500
                "
              >
                Inapakia maswali...
              </div>
            )}

            {/* EMPTY */}
            {!loadingQuestions &&
              pendingQuestions.length ===
                0 && (
                <div
                  className="
                    rounded-2xl

                    border border-dashed
                    border-zinc-300
                    dark:border-zinc-700

                    p-8

                    text-center
                  "
                >
                  <MessageCircle
                    className="
                      mx-auto mb-3

                      text-zinc-400
                    "
                    size={40}
                  />

                  <p className="text-sm text-zinc-500">
                    Hakuna maswali
                    yanayosubiri kwa
                    sasa.
                  </p>
                </div>
              )}

            {/* QUESTIONS */}
            {pendingQuestions.map(
              (q) => (
                <div
                  key={q.id}
                  className="
                    space-y-4

                    rounded-2xl

                    border border-zinc-200
                    dark:border-zinc-800

                    bg-white
                    dark:bg-zinc-900

                    p-5
                  "
                >
                  <div>
                    <p
                      className="
                        text-sm font-medium

                        leading-relaxed

                        text-zinc-900
                        dark:text-white
                      "
                    >
                      {q.questionText}
                    </p>
                  </div>

                  <AnswerForm
                    onSubmit={async (
                      answer
                    ) => {
                      const res =
                        await fetch(
                          "/api/admin/questions/update",
                          {
                            method:
                              "PATCH",

                            headers: {
                              "Content-Type":
                                "application/json",
                            },

                            credentials:
                              "include",

                            body: JSON.stringify(
                              {
                                id: q.id,

                                answerText:
                                  answer,
                              }
                            ),
                          }
                        );

                      if (res.ok) {
                        showSuccess(
                          "QUESTION_SAVED"
                        );

                        setPendingQuestions(
                          (prev) =>
                            prev.filter(
                              (x) =>
                                x.id !==
                                q.id
                            )
                        );
                      }
                    }}
                  />
                </div>
              )
            )}
          </div>
        </Modal>
      )}

      {/* ================= OPPORTUNITY MODAL ================= */}

      {openModal ===
        "opportunity" && (
        <Modal
          title="Ongeza Fursa"
          open
          onClose={() =>
            setOpenModal(null)
          }
        >
          <OpportunityForm
            categories={categories}
            onSubmit={
              handleOpportunitySubmit
            }
          />
        </Modal>
      )}

      {/* ================= TRAINING MODAL ================= */}

      {openModal === "training" && (
        <Modal
          title="Ongeza Mafunzo"
          open
          onClose={() =>
            setOpenModal(null)
          }
        >
          <TrainingsForm
            onSubmit={
              handleTrainingSubmit
            }
          />
        </Modal>
      )}
    </div>
  );
}