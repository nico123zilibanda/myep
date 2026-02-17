import { ReactNode, useEffect, useState } from "react";

/* ================= TYPES ================= */
interface Props {
  title: string;
  value: string;
  icon: ReactNode;
  loading?: boolean;
}

/* ================= COMPONENT ================= */
export default function StatCard({
  title,
  value,
  icon,
  loading = false,
}: Props) {
  /* ================= COUNTER ANIMATION ================= */
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (loading) return;

    let start = 0;
    const end = Number(value) || 0;
    const duration = 500;
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
      className="
        card border-default
        rounded-xl p-5
        shadow-sm hover:shadow-md
        transition
        flex items-center gap-4
        min-h-25
      "
    >
      {/* ICON */}
      <div className="p-3 rounded-lg bg-black/5 flex items-center justify-center w-12 h-12">
        {icon}
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-sm font-medium opacity-70">
          {title}
        </p>

        {loading ? (
          <div className="mt-2 h-6 w-24 rounded-lg card border-default animate-pulse" />
        ) : (
          <p className="text-2xl font-bold text-(--text-primary) mt-1">
            {displayValue}
          </p>
        )}
      </div>
    </div>
  );
}
