import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
  color?: "blue" | "green" | "purple" | "red";
}

const colorMap = {
  blue: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100",
  green: "bg-green-50 text-green-600 border-green-200 hover:bg-green-100",
  purple: "bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100",
  red: "bg-red-50 text-red-600 border-red-200 hover:bg-red-100",
};

export default function QuickAction({
  title,
  description,
  icon: Icon,
  href,
  onClick,
  color = "blue",
}: Props) {
  const baseClasses = `
    group flex flex-col gap-3 p-5 rounded-xl border transition
    hover:shadow-md hover:-translate-y-0.5 text-left
    ${colorMap[color]}
  `;

  const Content = (
    <>
      {/* ICON */}
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white border">
        <Icon className="w-5 h-5" />
      </div>

      {/* TEXT */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 group-hover:underline">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {description}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-2 text-sm font-medium">
        {href ? "Fungua →" : "Ongeza →"}
      </div>
    </>
  );

  // 👉 NAVIGATION
  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {Content}
      </Link>
    );
  }

  // 👉 ACTION / MODAL
  return (
    <button onClick={onClick} className={baseClasses}>
      {Content}
    </button>
  );
}
