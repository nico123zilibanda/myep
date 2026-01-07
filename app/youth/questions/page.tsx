"use client";

import { useEffect, useState } from "react";
import QuestionForm from "@/components/youth/QuestionForm";
import StatusBadge from "@/components/ui/StatusBadge";

export default function YouthQuestionsPage() {
  const [questions, setQuestions] = useState<any[]>([]);

  const fetchQuestions = async () => {
    try {
      const res = await fetch("/api/youth/questions");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error(err);
      alert("Imeshindikana kupakia maswali");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="space-y-8">
      {/* Ask question */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Uliza Swali</h2>
        <QuestionForm onSuccess={fetchQuestions} />
      </div>

      {/* My questions */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Maswali Yangu</h2>

        {questions.length === 0 ? (
          <p className="text-sm text-gray-500">
            Bado hujauliza swali lolote
          </p>
        ) : (
          <div className="space-y-4">
            {questions.map(q => (
              <div
                key={q.id}
                className="border rounded-lg p-4 space-y-2"
              >
                <div className="flex justify-between">
                  <p className="font-medium">{q.questionText}</p>
                  <StatusBadge status={q.status} />
                </div>

                {q.answerText && (
                  <div className="bg-green-50 p-3 rounded text-sm">
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
