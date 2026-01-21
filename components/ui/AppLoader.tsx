"use client";

export default function AppLoader() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Loading...
        </p>
      </div>
    </div>
  );
}
