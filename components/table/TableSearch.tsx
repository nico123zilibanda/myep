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
      className="border px-3 py-2 rounded-lg text-sm w-64"
    />
  );
}
