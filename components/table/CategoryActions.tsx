"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

interface Props {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function CategoryActions({
  onView,
  onEdit,
  onDelete,
}: Props) {
  const base =
    "p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-1";

  return (
    <div className="flex items-center gap-2">
      {onView && (
        <button
          onClick={onView}
          title="Angalia"
          className={`${base} text-gray-600 hover:bg-gray-100 focus:ring-gray-400 dark:text-gray-300 dark:hover:bg-gray-800`}
        >
          <Eye size={16} />
        </button>
      )}

      {onEdit && (
        <button
          onClick={onEdit}
          title="Hariri"
          className={`${base} text-blue-600 hover:bg-blue-100 focus:ring-blue-400 dark:text-blue-400 dark:hover:bg-blue-900`}
        >
          <Pencil size={16} />
        </button>
      )}

      {onDelete && (
        <button
          onClick={onDelete}
          title="Futa"
          className={`${base} text-red-600 hover:bg-red-100 focus:ring-red-400 dark:text-red-400 dark:hover:bg-red-900`}
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}
