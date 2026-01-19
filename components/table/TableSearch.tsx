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
        border border-gray-300 dark:border-gray-600
        rounded-lg px-3 py-2
        text-sm text-gray-800 dark:text-gray-100
        bg-white dark:bg-gray-800
        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
        shadow-sm
        transition
      "
    />
  );
}
