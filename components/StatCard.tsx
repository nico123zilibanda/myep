"use client";

import { ReactNode, useEffect, useState } from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  color: "blue" | "green" | "purple" | "red";
  loading?: boolean;
}

const colorMap = {
  blue: {
    border: "border-blue-500",
    text: "text-blue-600",
  },
  green: {
    border: "border-green-500",
    text: "text-green-600",
  },
  purple: {
    border: "border-purple-500",
    text: "text-purple-600",
  },
  red: {
    border: "border-red-500",
    text: "text-red-600",
  },
};

export default function StatCard({
  title,
  value,
  icon,
  color,
  loading = false,
}: StatCardProps) {
  const styles = colorMap[color];
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (loading) return;

    let start = 0;
    const duration = 800;
    const increment = Math.max(1, Math.floor(value / (duration / 16)));

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, loading]);

  return (
    <div
      className={`
        card border-default
        relative overflow-hidden
        rounded-2xl border-l-4 ${styles.border}
        p-5 shadow-sm
        transition hover:shadow-md hover:-translate-y-0.5
      `}
    >
      {loading ? (
        <div className="space-y-3 animate-pulse">
          <div className="h-4 w-24 rounded bg-black/10" />
          <div className="h-8 w-16 rounded bg-black/10" />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-70">
              {title}
            </p>

            {/* COUNT */}
            <h2 className="text-3xl font-bold tabular-nums text-(--text-primary)">
              {displayValue.toLocaleString()}
            </h2>
          </div>

          <div
            className={`
              p-3 rounded-xl ${styles.text}
              text-3xl bg-black/5
            `}
          >
            {icon}
          </div>
        </div>
      )}
    </div>
  );
}
