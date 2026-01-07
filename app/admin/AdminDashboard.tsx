
"use client"
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import RegisterForm from "@/components/auth/RegisterForm";
import AnswerForm from "@/components/forms/AnswerForm";
import QuickAction from "@/components/QuickActions";
import OpportunityForm from "@/components/forms/OpportunityForm";
import TrainingsForm from "@/components/forms/TrainingsForm";
import { UserPlus, Briefcase, BookOpen, MessageCircle } from "lucide-react";

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

interface AdminDashboardProps {
  stats: Stats;
}

export default function AdminDashboard({ stats }: AdminDashboardProps) {
  const { vijanaCount, opportunitiesCount, trainingsCount, questionsCount } = stats;

  const [openModal, setOpenModal] = useState<
    "youth" | "opportunity" | "training" | "question" | null
  >(null);

  const [pendingQuestions, setPendingQuestions] = useState<Question[]>([]);

  const fetchPendingQuestions = async () => {
    try {
      const res = await fetch("/api/admin/questions?status=PENDING", {
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();

      setPendingQuestions(
        data.map((q: any) => ({
          ...q,
          id: Number(q.id),
        }))
      );
    } catch (err) {
      console.error("Error fetching pending questions", err);
    }
  };

  const handleYouthSubmit = (data: any) => {
    console.log("Submitted youth:", data);
    setOpenModal(null);
  };

  return (
    <div className="space-y-8">
      {/* STATS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="border-blue-500 p-4 rounded-xl border">
          <h3 className="font-semibold text-gray-800">Vijana</h3>
          <p className="text-2xl font-bold">{vijanaCount}</p>
        </div>
        <div className="border-green-500 p-4 rounded-xl border">
          <h3 className="font-semibold text-gray-800">Fursa</h3>
          <p className="text-2xl font-bold">{opportunitiesCount}</p>
        </div>
        <div className="border-purple-500 p-4 rounded-xl border">
          <h3 className="font-semibold text-gray-800">Mafunzo</h3>
          <p className="text-2xl font-bold">{trainingsCount}</p>
        </div>
        <div className="border-red-500 p-4 rounded-xl border">
          <h3 className="font-semibold text-gray-800">Maswali</h3>
          <p className="text-2xl font-bold">{questionsCount}</p>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickAction
            title="Ongeza Kijana"
            description="Sajili kijana mpya kwenye mfumo"
            icon={UserPlus}
            color="blue"
            onClick={() => setOpenModal("youth")}
          />
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
            title="Maswali Yanayosubiri"
            description="Maswali ambayo hayajajibiwa"
            icon={MessageCircle}
            color="red"
            onClick={async () => {
              await fetchPendingQuestions();
              setOpenModal("question");
            }}
          />
        </div>
      </section>

      {/* MODALS */}
      {openModal === "question" && (
        <Modal title="Maswali Yanayosubiri" open={true} onClose={() => setOpenModal(null)}>
          <div className="space-y-4">
            {pendingQuestions.length === 0 && (
              <p>Hakuna maswali yanayosubiri.</p>
            )}

            {pendingQuestions.map((q) => (
              <div key={q.id} className="border p-4 rounded-lg space-y-2">
                <p className="font-semibold">{q.questionText}</p>

                <AnswerForm
                  onSubmit={async (answer) => {
                    try {
                      const res = await fetch("/api/admin/questions/update", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify({
                          id: q.id,
                          answerText: answer,
                        }),
                      });
                      const data = await res.json();

                      if (!res.ok) {
                        alert(data.message || "Imeshindikana kujibu swali");
                        return;
                      }

                      // Ondoa swali lililojibiwa
                      setPendingQuestions((prev) =>
                        prev.filter((item) => item.id !== q.id)
                      );
                    } catch (err) {
                      console.error(err);
                      alert("Tatizo la mtandao");
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </Modal>
      )}

      {openModal === "opportunity" && (
        <Modal title="Ongeza Fursa" open={true} onClose={() => setOpenModal(null)}>
          <OpportunityForm onSubmit={(data) => { console.log(data); setOpenModal(null); }} categories={[]} />
        </Modal>
      )}
      {openModal === "training" && (
        <Modal title="Ongeza Mafunzo" open={true} onClose={() => setOpenModal(null)}>
          <TrainingsForm onSubmit={(data) => { console.log(data); setOpenModal(null); }} />
        </Modal>
      )}

    </div>
  );
}
