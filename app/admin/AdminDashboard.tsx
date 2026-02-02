"use client";

import { useState } from "react";
import StatCard from "@/components/StatCard";
import QuickAction from "@/components/QuickActions";
import Modal from "@/components/ui/Modal";
import AnswerForm from "@/components/forms/AnswerForm";
import OpportunityForm from "@/components/forms/OpportunityForm";
import TrainingsForm from "@/components/forms/TrainingsForm";

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

interface ApiResponse<T> {
  success: boolean;
  messageKey?: string;
  data: T;
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

  /* ================= HANDLERS ================= */

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

      setPendingQuestions(
        Array.isArray(result.data) ? result.data : []
      );
    } catch (error) {
      console.error(error);
      setPendingQuestions([]);
    } finally {
      setLoadingQuestions(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-12">
      {/* ========= HEADER ========= */}
      <header>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Muhtasari wa mfumo na vitendo vya haraka
        </p>
      </header>

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
            {loadingQuestions && (
              <p className="text-sm text-gray-500">Inapakia maswali...</p>
            )}

            {!loadingQuestions && pendingQuestions.length === 0 && (
              <p className="text-sm text-gray-500">
                Hakuna maswali yanayosubiri.
              </p>
            )}

            {pendingQuestions.map((q) => (
              <div
                key={q.id}
                className="rounded-xl border p-4 bg-gray-50 dark:bg-gray-900 space-y-3"
              >
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
                      setPendingQuestions((prev) =>
                        prev.filter((item) => item.id !== q.id)
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
            categories={[]}
            onSubmit={() => setOpenModal(null)}
          />
        </Modal>
      )}

      {/* ========= TRAINING MODAL ========= */}
      {openModal === "training" && (
        <Modal title="Ongeza Mafunzo" open onClose={() => setOpenModal(null)}>
          <TrainingsForm onSubmit={() => setOpenModal(null)} />
        </Modal>
      )}
    </div>
  );
}
