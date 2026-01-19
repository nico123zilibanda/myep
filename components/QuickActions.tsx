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
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
  red: "bg-red-100 text-red-600",
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
    group
  bg-white dark:bg-gray-900
    rounded-2xl p-5
    shadow-sm
    text-left
    transition-all duration-300
    hover:shadow-md hover:-translate-y-0.5
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
  "    >
      <div className={`inline-flex p-3 rounded-lg ${colorMap[color]}`}>
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="mt-4 font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </button>
  );
}
