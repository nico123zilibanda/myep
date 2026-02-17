"use client";

import { useEffect, useState } from "react";
import QuestionForm from "@/components/youth/QuestionForm";
import StatusBadge from "@/components/ui/StatusBadge";
import { showError } from "@/lib/toast";
import type { MessageKey } from "@/lib/messages";

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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/youth/questions", {
        credentials: "include",
        cache: "no-store",
      });

      const result: ApiResponse<Question[]> = await res.json();

      if (!res.ok) {
        showError(result.messageKey ?? "SERVER_ERROR");
        setQuestions([]);
        return;
      }

      setQuestions(result.data || []);
    } catch (err) {
      console.error(err);
      showError("SERVER_ERROR");
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Ask Question */}
      <div className="border border-default rounded-xl p-6">
        <QuestionForm onSuccess={fetchQuestions} />
      </div>

      {/* My Questions */}
      <div className="border border-default rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-(--text-primary)">
          Maswali Yangu
        </h2>

        {/* Loading */}
        {loading && (
          <div className="space-y-4 animate-pulse">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-black/10 rounded-xl" />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && questions.length === 0 && (
          <p className="text-sm opacity-70">
            Bado hujauliza swali lolote
          </p>
        )}

        {/* Questions */}
        {!loading && questions.length > 0 && (
          <div className="space-y-4 max-h-125 overflow-y-auto">
            {questions.map((q) => (
              <div
                key={q.id}
                className="border border-default rounded-xl p-4 space-y-2 hover:shadow-sm transition"
              >
                <div className="flex justify-between items-start gap-3">
                  <p className="font-medium text-(--text-primary) truncate">
                    {q.questionText}
                  </p>

                  <StatusBadge status={q.status} />
                </div>

                {q.answerText && (
                  <div className="bg-green-500/10 p-3 rounded text-sm">
                    <strong>Jibu:</strong> {q.answerText}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
