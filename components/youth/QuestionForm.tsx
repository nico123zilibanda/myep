"use client";

import { useState } from "react";

interface QuestionFormProps {
  onSuccess?: () => void;
  initialData?: any;
}

export default function QuestionForm({ onSuccess, initialData }: QuestionFormProps) {
  const [questionText, setQuestionText] = useState(initialData?.questionText || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!questionText.trim()) {
      setError("Tafadhali andika swali");
      return;
    }

    try {
      setLoading(true);

      // Call your API
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


      // Optional success callback
      onSuccess?.();

      setQuestionText(""); // reset form
    } catch (err) {
      setError("Tatizo limetokea, jaribu tena");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        rows={4}
        value={questionText}
        onChange={e => setQuestionText(e.target.value)}
        placeholder="Andika swali lako hapa..."
        className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
      >
        {loading ? "Inatuma..." : "Tuma Swali"}
      </button>
    </form>
  );
}
