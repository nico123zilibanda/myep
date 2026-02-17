"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import QuickAction from "@/components/QuickActions";
import Modal from "@/components/ui/Modal";
import AnswerForm from "@/components/forms/AnswerForm";
import OpportunityForm from "@/components/forms/OpportunityForm";
import TrainingsForm from "@/components/forms/TrainingsForm";
import { showSuccess, showError } from "@/lib/toast";

import {
  Users,
  Briefcase,
  BookOpen,
  MessageCircle,
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

export default function AdminDashboard({ stats }: AdminDashboardProps) {
  const { vijanaCount, opportunitiesCount, trainingsCount, questionsCount } =
    stats;

  const [openModal, setOpenModal] =
    useState<"opportunity" | "training" | "question" | null>(null);

  const [pendingQuestions, setPendingQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [submitting, setSubmitting] = useState(false);

  /* ================= FETCH CATEGORIES ================= */

  useEffect(() => {
    fetch("/api/admin/categories", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setCategories(data.data || []))
      .catch(() => setCategories([]));
  }, []);

  /* ================= OPPORTUNITY SUBMIT ================= */

  const handleOpportunitySubmit = async (form: any) => {
    try {
      setSubmitting(true);

      const res = await fetch("/api/admin/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        showError(data.messageKey || "SERVER_ERROR");
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

const handleTrainingSubmit = async (formData: FormData) => {
  try {
    setSubmitting(true);

    const res = await fetch("/api/admin/trainings", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      showError(data.messageKey || "SERVER_ERROR");
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


  /* ================= QUESTIONS ================= */

  const fetchPendingQuestions = async () => {
    setLoadingQuestions(true);

    try {
      const res = await fetch("/api/admin/questions?status=PENDING", {
        credentials: "include",
        cache: "no-store",
      });

      const result: ApiResponse<Question[]> = await res.json();

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
    <div className="space-y-12">

      {/* ========= STATS ========= */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard title="Vijana" value={vijanaCount} color="blue" icon={<Users />} />
          <StatCard title="Fursa" value={opportunitiesCount} color="green" icon={<Briefcase />} />
          <StatCard title="Mafunzo" value={trainingsCount} color="purple" icon={<BookOpen />} />
          <StatCard title="Maswali" value={questionsCount} color="red" icon={<MessageCircle />} />
        </div>
      </section>

      {/* ========= QUICK ACTIONS ========= */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Vitendo vya Haraka</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <QuickAction
            title="Ongeza Fursa"
            description="Ajira, zabuni au mikopo"
            icon={Briefcase}
            color="green"
            onClick={() => setOpenModal("opportunity")}
          />

          <QuickAction
            title="Ongeza Mafunzo"
            description="Kozi, video au PDF"
            icon={BookOpen}
            color="purple"
            onClick={() => setOpenModal("training")}
          />

          <QuickAction
            title="Maswali"
            description="Maswali yanayosubiri"
            icon={MessageCircle}
            color="red"
            onClick={async () => {
              await fetchPendingQuestions();
              setOpenModal("question");
            }}
          />
        </div>
      </section>

      {/* ========= QUESTIONS MODAL ========= */}
      {openModal === "question" && (
        <Modal title="Maswali Yanayosubiri" open onClose={() => setOpenModal(null)}>
          <div className="space-y-4">
            {loadingQuestions && <p>Inapakia...</p>}

            {!loadingQuestions && pendingQuestions.length === 0 && (
              <p>Hakuna maswali.</p>
            )}

            {pendingQuestions.map((q) => (
              <div key={q.id} className="border rounded-xl p-4 space-y-3">
                <p className="font-medium">{q.questionText}</p>

                <AnswerForm
                  onSubmit={async (answer) => {
                    const res = await fetch("/api/admin/questions/update", {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      credentials: "include",
                      body: JSON.stringify({
                        id: q.id,
                        answerText: answer,
                      }),
                    });

                    if (res.ok) {
                      showSuccess("QUESTION_SAVED");
                      setPendingQuestions((prev) =>
                        prev.filter((x) => x.id !== q.id)
                      );
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* ========= OPPORTUNITY MODAL ========= */}
      {openModal === "opportunity" && (
        <Modal title="Ongeza Fursa" open onClose={() => setOpenModal(null)}>
          <OpportunityForm
            categories={categories}
            onSubmit={handleOpportunitySubmit}
          />
        </Modal>
      )}

      {/* ========= TRAINING MODAL ========= */}
      {openModal === "training" && (
        <Modal title="Ongeza Mafunzo" open onClose={() => setOpenModal(null)}>
          <TrainingsForm
            onSubmit={handleTrainingSubmit}
          />
        </Modal>
      )}
    </div>
  );
}
