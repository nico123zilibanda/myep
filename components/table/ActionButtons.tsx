"use client";

import { Eye, Pencil, Trash2, CheckCircle } from "lucide-react";

interface ActionButtonsProps {
  status?: string;
  onView?: () => void;
  onEdit?: () => void;
  onPublish?: () => void;
  onDelete?: () => void;
}

export default function ActionButtons({
  status,
  onView,
  onEdit,
  onPublish,
  onDelete,
}: ActionButtonsProps) {
  const baseBtnClasses = `
    p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-1 
    transition text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700
  `;

  return (
    <div className="flex gap-2 flex-wrap">
      {onView && (
        <button onClick={onView} className={baseBtnClasses} title="View">
          <Eye size={16} />
        </button>
      )}

      {onEdit && (
        <button
          onClick={onEdit}
          className={`${baseBtnClasses} text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900`}
          title="Edit"
        >
          <Pencil size={16} />
        </button>
      )}

      {onPublish && status !== "PUBLISHED" && (
        <button
          onClick={onPublish}
          className={`${baseBtnClasses} text-green-600 hover:bg-green-100 dark:hover:bg-green-900`}
          title="Publish"
        >
          <CheckCircle size={16} />
        </button>
      )}

      {onDelete && (
        <button
          onClick={onDelete}
          className={`${baseBtnClasses} text-red-600 hover:bg-red-100 dark:hover:bg-red-900`}
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}
