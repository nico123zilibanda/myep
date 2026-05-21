"use client";

import { useEffect, useState } from "react";

import StatCard from "@/components/StatCard";
import QuickAction from "@/components/QuickActions";
import Modal from "@/components/ui/Modal";

import AnswerForm from "@/components/forms/AnswerForm";
import OpportunityForm from "@/components/forms/OpportunityForm";
import TrainingsForm from "@/components/forms/TrainingsForm";

import { useAppToast } from "@/lib/toast";

import {
  Users,
  Briefcase,
  BookOpen,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

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

/* ================= COMPONENT ================= */

export default function AdminDashboard({
  stats,
}: AdminDashboardProps) {
  const { showSuccess, showError } = useAppToast();

  const {
    vijanaCount,
    opportunitiesCount,
    trainingsCount,
    questionsCount,
  } = stats;

  const [openModal, setOpenModal] = useState<
    "opportunity" | "training" | "question" | null
  >(null);

  const [pendingQuestions, setPendingQuestions] =
    useState<Question[]>([]);

  const [loadingQuestions, setLoadingQuestions] =
    useState(false);

  const [categories, setCategories] = useState<
    Category[]
  >([]);

  const [submitting, setSubmitting] =
    useState(false);

  /* ================= FETCH CATEGORIES ================= */

  useEffect(() => {
    fetch("/api/admin/categories", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) =>
        setCategories(data.data || [])
      )
      .catch(() => setCategories([]));
  }, []);

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
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        showError(
          data.messageKey || "SERVER_ERROR"
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
          data.messageKey || "SERVER_ERROR"
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

  const fetchPendingQuestions = async () => {
    setLoadingQuestions(true);

    try {
      const res = await fetch(
        "/api/admin/questions?status=PENDING",
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      const result: ApiResponse<Question[]> =
        await res.json();

      if (!res.ok) {
        setPendingQuestions([]);
        return;
      }

      setPendingQuestions(result.data || []);
    } catch {
      setPendingQuestions([]);
    } finally {
      setLoadingQuestions(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-10">
      {/* ================= HERO SECTION ================= */}
      <section
        className="
          relative overflow-hidden
          rounded-3xl
          border border-zinc-200/70 dark:border-zinc-800/80
          bg-white/70 dark:bg-zinc-900/60
          backdrop-blur-xl
          p-6 md:p-8
          shadow-sm
        "
      >
        {/* Background Glow */}
        <div
          className="
            absolute top-0 right-0
            w-72 h-72
            bg-blue-500/10
            rounded-full blur-3xl
            -translate-y-1/2 translate-x-1/2
          "
        />

        <div className="relative z-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* LEFT */}
            <div className="space-y-3">
              <div
                className="
                  inline-flex items-center gap-2
                  rounded-full
                  bg-blue-100 dark:bg-blue-900/30
                  px-3 py-1
                  text-xs font-medium
                  text-blue-700 dark:text-blue-300
                "
              >
                Mlele District Council
              </div>

              <div>
                <h1
                  className="
                    text-2xl md:text-3xl
                    font-bold tracking-tight
                    text-zinc-900 dark:text-white
                  "
                >
                  Admin Dashboard
                </h1>

                <p
                  className="
                    mt-2
                    max-w-2xl
                    text-sm md:text-base
                    text-zinc-600 dark:text-zinc-400
                    leading-relaxed
                  "
                >
                  Simamia fursa, mafunzo, vijana na
                  maswali yote ndani ya mfumo wa
                  Mlele Opportunity Portal.
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div
              className="
                flex flex-wrap gap-3
              "
            >
              <button
                onClick={() =>
                  setOpenModal("opportunity")
                }
                className="
                  inline-flex items-center gap-2
                  rounded-2xl
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-5 py-3
                  text-sm font-medium
                  transition
                  shadow-lg shadow-blue-500/20
                "
              >
                Add Opportunity
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() =>
                  setOpenModal("training")
                }
                className="
                  inline-flex items-center gap-2
                  rounded-2xl
                  border border-zinc-200 dark:border-zinc-800
                  bg-white dark:bg-zinc-900
                  hover:bg-zinc-100 dark:hover:bg-zinc-800
                  px-5 py-3
                  text-sm font-medium
                  transition
                "
              >
                Add Training
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2
              className="
                text-lg font-semibold
                text-zinc-900 dark:text-white
              "
            >
              Mfumo Statistics
            </h2>

            <p className="text-sm text-zinc-500">
              Overview ya taarifa muhimu za mfumo
            </p>
          </div>
        </div>

        <div
          className="
            grid grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-5
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
      <section className="space-y-5">
        <div>
          <h2
            className="
              text-lg font-semibold
              text-zinc-900 dark:text-white
            "
          >
            Quick Actions
          </h2>

          <p className="text-sm text-zinc-500">
            Fanya shughuli muhimu kwa haraka
          </p>
        </div>

        <div
          className="
            grid grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            gap-5
          "
        >
          <QuickAction
            titleKey="QA_CREATE_OPPORTUNITY_TITLE"
            descriptionKey="QA_CREATE_OPPORTUNITY_DESC"
            icon={Briefcase}
            color="green"
            onClick={() =>
              setOpenModal("opportunity")
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

      {/* ================= QUESTIONS MODAL ================= */}
      {openModal === "question" && (
        <Modal
          title="Maswali Yanayosubiri"
          open
          onClose={() => setOpenModal(null)}
        >
          <div className="space-y-4">
            {/* LOADING */}
            {loadingQuestions && (
              <div
                className="
                  rounded-2xl
                  border border-zinc-200 dark:border-zinc-800
                  bg-zinc-50 dark:bg-zinc-900
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
              pendingQuestions.length === 0 && (
                <div
                  className="
                    rounded-2xl
                    border border-dashed
                    border-zinc-300 dark:border-zinc-700
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
                    Hakuna maswali yanayosubiri kwa
                    sasa.
                  </p>
                </div>
              )}

            {/* QUESTIONS */}
            {pendingQuestions.map((q) => (
              <div
                key={q.id}
                className="
                  rounded-2xl
                  border border-zinc-200 dark:border-zinc-800
                  bg-white dark:bg-zinc-900
                  p-5
                  space-y-4
                "
              >
                <div>
                  <p
                    className="
                      text-sm font-medium
                      text-zinc-900 dark:text-white
                      leading-relaxed
                    "
                  >
                    {q.questionText}
                  </p>
                </div>

                <AnswerForm
                  onSubmit={async (answer) => {
                    const res = await fetch(
                      "/api/admin/questions/update",
                      {
                        method: "PATCH",
                        headers: {
                          "Content-Type":
                            "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
                          id: q.id,
                          answerText: answer,
                        }),
                      }
                    );

                    if (res.ok) {
                      showSuccess(
                        "QUESTION_SAVED"
                      );

                      setPendingQuestions(
                        (prev) =>
                          prev.filter(
                            (x) => x.id !== q.id
                          )
                      );
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* ================= OPPORTUNITY MODAL ================= */}
      {openModal === "opportunity" && (
        <Modal
          title="Ongeza Fursa"
          open
          onClose={() => setOpenModal(null)}
        >
          <OpportunityForm
            categories={categories}
            onSubmit={handleOpportunitySubmit}
          />
        </Modal>
      )}

      {/* ================= TRAINING MODAL ================= */}
      {openModal === "training" && (
        <Modal
          title="Ongeza Mafunzo"
          open
          onClose={() => setOpenModal(null)}
        >
          <TrainingsForm
            onSubmit={handleTrainingSubmit}
          />
        </Modal>
      )}
    </div>
  );
}