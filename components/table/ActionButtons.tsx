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
  return (
    <div className="flex gap-2">
      {onView && (
        <button
          onClick={onView}
          className="p-2 rounded hover:bg-gray-100"
          title="View"
        >
          <Eye size={16} />
        </button>
      )}

      {onEdit && (
        <button
          onClick={onEdit}
          className="p-2 rounded hover:bg-blue-100 text-blue-600"
          title="Edit"
        >
          <Pencil size={16} />
        </button>
      )}

      {onPublish && status !== "PUBLISHED" && (
        <button
          onClick={onPublish}
          className="p-2 rounded hover:bg-green-100 text-green-600"
          title="Publish"
        >
          <CheckCircle size={16} />
        </button>
      )}

      {onDelete && (
        <button
          onClick={onDelete}
          className="p-2 rounded hover:bg-red-100 text-red-600"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}
