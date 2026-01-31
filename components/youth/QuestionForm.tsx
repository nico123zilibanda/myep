"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface QuestionFormProps {
  onSuccess?: () => void;
  initialData?: {
    questionText?: string;
  };
}

export default function QuestionForm({
  onSuccess,
  initialData,
}: QuestionFormProps) {
  const [questionText, setQuestionText] = useState(initialData?.questionText || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData?.questionText) {
      setQuestionText(initialData.questionText);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!questionText.trim()) {
      setError("Tafadhali andika swali kabla ya kutuma");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/youth/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionText }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Imeshindikana kutuma swali");
        return;
      }

      onSuccess?.();
      setQuestionText("");
    } catch {
      setError("Tatizo limetokea. Tafadhali jaribu tena.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fadeIn">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md p-6 sm:p-8 space-y-5 transition-shadow hover:shadow-lg"
      >
        {/* HEADER */}
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Uliza Swali
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Andika swali lako hapa, litajibiwa na admin
          </p>
        </div>

        {/* TEXTAREA */}
        <div className="space-y-1">
          <label
            htmlFor="question"
            className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300"
          >
            Swali
          </label>
          <textarea
            id="question"
            rows={5}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Mfano: Nawezaje kuboresha maisha yangu ya kielimu?"
            aria-invalid={!!error}
            className="w-full resize-none rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm sm:text-base text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>

        {/* ERROR */}
        {error && (
          <p
            role="alert"
            className="text-sm sm:text-base text-red-600 dark:text-red-400"
          >
            {error}
          </p>
        )}

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center 
            justify-center rounded-xl w-full
             bg-blue-600 hover:bg-blue-700
              text-white text-sm sm:text-base 
              font-medium px-6 py-3 transition-all 
              duration-200 disabled:opacity-50
               disabled:cursor-not-allowed 
               focus:outline-none focus:ring-2
                focus:ring-blue-500"
          >
            {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
            {isSubmitting ? "Inatuma..." : "Tuma Swali"}
          </button>
        </div>
      </form>
    </div>
  );
}
