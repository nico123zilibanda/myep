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
  const base =
    "p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-1";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* VIEW */}
      {onView && (
        <button
          onClick={onView}
          title="Angalia"
          className={`${base} text-(--foreground) hover:opacity-80 focus:ring-(--border)`}
        >
          <Eye size={16} />
        </button>
      )}

      {/* EDIT */}
      {onEdit && (
        <button
          onClick={onEdit}
          title="Hariri"
          className={`${base} text-blue-600 hover:opacity-80 focus:ring-blue-400`}
        >
          <Pencil size={16} />
        </button>
      )}

      {/* PUBLISH */}
      {onPublish && status !== "PUBLISHED" && (
        <button
          onClick={onPublish}
          title="Chapisha"
          className={`${base} text-green-600 hover:opacity-80 focus:ring-green-400`}
        >
          <CheckCircle size={16} />
        </button>
      )}

      {/* DELETE */}
      {onDelete && (
        <button
          onClick={onDelete}
          title="Futa"
          className={`${base} text-red-600 hover:opacity-80 focus:ring-red-400`}
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}
