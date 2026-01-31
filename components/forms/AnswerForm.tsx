"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function AnswerForm({
  onSubmit,
}: {
  onSubmit: (a: string) => Promise<void>;
}) {
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!answer.trim()) return;

    try {
      setIsSubmitting(true); 
      await onSubmit(answer);   
      setAnswer("");            
    } finally {
      setIsSubmitting(false);   
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        rows={4}
        placeholder="Andika jibu hapa..."
        className="
          w-full rounded-lg border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-900
          p-3 text-sm
          text-gray-800 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-green-500
        "
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full
          flex items-center justify-center gap-2
          bg-green-600 hover:bg-green-700
          disabled:bg-green-400
          text-white px-4 py-2
          rounded-lg font-medium
          transition
        "
      >
        {isSubmitting && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        {isSubmitting ? "Inatuma..." : "Tuma Jibu"}
      </button>
    </form>
  );
}
