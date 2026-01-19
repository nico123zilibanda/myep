"use client";

import { useEffect, useState } from "react";
import QuestionForm from "@/components/youth/QuestionForm";
import StatusBadge from "@/components/ui/StatusBadge";

/* ================= TYPES ================= */
interface Question {
  id: number;
  questionText: string;
  answerText?: string;
  status: "PENDING" | "ANSWERED" | "REJECTED";
}

/* ================= PAGE ================= */
export default function YouthQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/youth/questions");
      if (!res.ok) throw new Error("Imeshindikana kupakia maswali");
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error(err);
      alert("Imeshindikana kupakia maswali");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-6">
      {/* Ask question */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <QuestionForm onSuccess={fetchQuestions} />
      </div>

      {/* My questions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Maswali Yangu</h2>

        {/* Loading */}
        {loading && (
          <div className="space-y-4 animate-pulse">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && questions.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Bado hujauliza swali lolote
          </p>
        )}

        {/* Questions list */}
        {!loading && questions.length > 0 && (
          <div className="space-y-4 max-h-125 overflow-y-auto">
            {questions.map((q) => (
              <div
                key={q.id}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-2 hover:shadow-sm transition-shadow duration-200"
              >
                <div className="flex justify-between items-start">
                  <p className="font-medium text-gray-800 dark:text-gray-100">{q.questionText}</p>
                  <StatusBadge status={q.status} />
                </div>

                {q.answerText && (
                  <div className="bg-green-50 dark:bg-green-900 p-3 rounded text-sm text-gray-700 dark:text-green-100">
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
