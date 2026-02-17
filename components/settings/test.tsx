"use client";
import { useTheme } from "next-themes";

export default function TestTheme() {
  const { setTheme } = useTheme();

  return (
    <div className="space-x-4">
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
    </div>
  );
}
