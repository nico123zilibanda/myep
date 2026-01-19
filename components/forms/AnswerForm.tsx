"use client";

import { useState } from "react";

export default function AnswerForm({ onSubmit }: { onSubmit: (a: string) => void }) {
  const [answer, setAnswer] = useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(answer);
      }}
      className="space-y-4"
    >
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
      <button className="
        bg-green-600 hover:bg-green-700
        text-white px-4 py-2
        rounded-lg font-medium transition
        ">
        Tuma Jibu
      </button>
    </form>
  );
}
