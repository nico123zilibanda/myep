"use client";

export default function TableSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full sm:w-64
        border border-(--border)
        rounded-lg px-3 py-2
        text-sm text-(--foreground)
        bg-(--card)
        focus:outline-none focus:ring-2 focus:ring-blue-500
        shadow-sm
        transition
        hover:opacity-80
      "
    />
  );
}
