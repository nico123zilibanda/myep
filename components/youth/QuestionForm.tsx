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
        className="bg-(--card) border border-default rounded-2xl p-6 sm:p-8 space-y-5 transition-shadow hover:shadow-md"
      >
        {/* HEADER */}
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold text-(--text-primary)">
            Uliza Swali
          </h2>
          <p className="text-sm sm:text-base opacity-70">
            Andika swali lako hapa, litajibiwa na admin
          </p>
        </div>

        {/* TEXTAREA */}
        <div className="space-y-1">
          <label
            htmlFor="question"
            className="text-sm sm:text-base font-medium text-(--text-primary)"
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
            className="w-full resize-none rounded-xl
              border border-default
              bg-(--card) px-4 py-3
              text-sm sm:text-base text-(--foreground)
              placeholder:opacity-50
              focus:outline-none focus:ring-2 focus:ring-(--btn-focus)
              transition-all duration-200"
          />
        </div>

        {/* ERROR */}
        {error && (
          <p role="alert" className="text-sm text-red-500">
            {error}
          </p>
        )}

        {/* SUBMIT */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl w-full
              bg-(--btn-primary) text-(--btn-primary-text)
              text-sm sm:text-base font-medium px-6 py-3
              transition disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-(--btn-focus)"
          >
            {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
            {isSubmitting ? "Inatuma..." : "Tuma Swali"}
          </button>
        </div>
      </form>
    </div>
  );
}
