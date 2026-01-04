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
        className="w-full border rounded-lg p-3"
        rows={4}
        placeholder="Andika jibu hapa..."
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
        Tuma Jibu
      </button>
    </form>
  );
}
