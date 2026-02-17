"use client";

import { LucideIcon } from "lucide-react";

interface QuickActionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: "blue" | "green" | "purple" | "red";
  onClick: () => void;
}

const colorMap = {
  blue: "text-blue-600",
  green: "text-green-600",
  purple: "text-purple-600",
  red: "text-red-600",
};

export default function QuickAction({
  title,
  description,
  icon: Icon,
  color,
  onClick,
}: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className="
        card border-default
        cursor-pointer
        group
        rounded-2xl p-5
        text-left
        shadow-sm
        transition hover:shadow-md hover:-translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-(--btn-focus)
      "
    >
      <div className={`inline-flex p-3 rounded-lg bg-black/5 ${colorMap[color]}`}>
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="mt-4 font-semibold text-(--text-primary)">
        {title}
      </h3>

      <p className="text-sm opacity-70">
        {description}
      </p>
    </button>
  );
}
