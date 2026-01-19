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
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600",
  },
  green: {
    border: "border-green-500",
    bg: "bg-green-50 dark:bg-green-900/20",
    text: "text-green-600",
  },
  purple: {
    border: "border-purple-500",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    text: "text-purple-600",
  },
  red: {
    border: "border-red-500",
    bg: "bg-red-50 dark:bg-red-900/20",
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
    const duration = 800; // ms
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
        relative overflow-hidden
        rounded-2xl border-l-4 ${styles.border}
        bg-white dark:bg-gray-900
        p-5 shadow-sm
        transition-all duration-300
        hover:shadow-md hover:-translate-y-0.5
      `}
    >
      {loading ? (
        <div className="space-y-3 animate-pulse">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {title}
            </p>

            {/* 🔥 COUNT ANIMATION */}
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tabular-nums">
              {displayValue.toLocaleString()}
            </h2>
          </div>

          <div
            className={`
              p-3 rounded-xl ${styles.bg} ${styles.text}
              text-3xl
            `}
          >
            {icon}
          </div>
        </div>
      )}
    </div>
  );
}
