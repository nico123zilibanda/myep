import { ReactNode, useEffect, useState } from "react";
import clsx from "clsx";

/* ================= TYPES ================= */
interface Props {
  title: string;
  value: string;
  icon: ReactNode;
  color?: "blue" | "green" | "purple" | "yellow";
  loading?: boolean; // optional skeleton loader
}

/* ================= COMPONENT ================= */
export default function StatCard({
  title,
  value,
  icon,
  color = "blue",
  loading = false,
}: Props) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-100",
    green: "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-100",
    purple: "bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-100",
    yellow: "bg-yellow-100 text-yellow-600 dark:bg-yellow-800 dark:text-yellow-100",
  };

  /* ================= COUNTER ANIMATION ================= */
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (loading) return;

    let start = 0;
    const end = Number(value) || 0;
    const duration = 500; // ms
    const stepTime = Math.abs(Math.floor(duration / (end || 1)));
    const timer = setInterval(() => {
      start += 1;
      if (start >= end) {
        setDisplayValue(String(end));
        clearInterval(timer);
      } else {
        setDisplayValue(String(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, loading]);

  return (
    <div
      className={clsx(
        "bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-lg transition-shadow duration-300 flex items-center gap-4",
        "min-h-25 sm:min-h-30"
      )}
    >
      {/* ICON */}
      <div
        className={clsx(
          "p-3 rounded-lg flex items-center justify-center w-12 h-12",
          colorMap[color]
        )}
      >
        {icon}
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-center">
        {/* TITLE */}
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>

        {/* VALUE */}
        {loading ? (
          // SKELETON LOADER
          <div className="mt-1 h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        ) : (
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">
            {displayValue}
          </p>
        )}
      </div>
    </div>
  );
}
