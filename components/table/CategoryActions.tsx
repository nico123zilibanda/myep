"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

interface Props {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function CategoryActions({ onView, onEdit, onDelete }: Props) {
  const btnBase = "p-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400";

  return (
    <div className="flex gap-2">
      {/* View */}
      {onView && (
        <button
          onClick={onView}
          className={`${btnBase} text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800`}
          title="View"
        >
          <Eye size={16} />
        </button>
      )}

      {/* Edit */}
      {onEdit && (
        <button
          onClick={onEdit}
          className={`${btnBase} text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900`}
          title="Edit"
        >
          <Pencil size={16} />
        </button>
      )}

      {/* Delete */}
      {onDelete && (
        <button
          onClick={onDelete}
          className={`${btnBase} text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900`}
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}
