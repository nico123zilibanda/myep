"use client";

import { Eye, Pencil, Trash2, CheckCircle, XCircle, RotateCcw } from "lucide-react";

interface ActionButtonsProps {
  status?: string;
  onView?: () => void;
  onEdit?: () => void;
  onPublish?: () => void;
  onUnpublish?: () => void;
  onClose?: () => void;
  onDelete?: () => void;
}

export default function ActionButtons({
  status,
  onView,
  onEdit,
  onPublish,
  onUnpublish,
  onClose,
  onDelete,
}: ActionButtonsProps) {
  const base =
    "p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-1";

  return (
    <div className="flex items-center gap-2 flex-wrap">

      {/* EDIT */}
      {onEdit && (
        <button
          onClick={onEdit}
          title="Hariri"
          className={`${base} text-blue-600 hover:opacity-80`}
        >
          <Pencil size={16} />
        </button>
      )}

      {/* PUBLISH */}
      {onPublish && (status === "DRAFT" || status === "CLOSED") && (
        <button
          onClick={onPublish}
          title="Publish"
          className={`${base} text-green-600 hover:opacity-80`}
        >
          <CheckCircle size={16} />
        </button>
      )}

      {/* UNPUBLISH */}
      {onUnpublish && status === "PUBLISHED" && (
        <button
          onClick={onUnpublish}
          title="Unpublish"
          className={`${base} text-yellow-600 hover:opacity-80`}
        >
          <RotateCcw size={16} />
        </button>
      )}

      {/* CLOSE */}
      {onClose && status === "PUBLISHED" && (
        <button
          onClick={onClose}
          title="Close"
          className={`${base} text-orange-600 hover:opacity-80`}
        >
          <XCircle size={16} />
        </button>
      )}

      {/* DELETE */}
      {onDelete && (
        <button
          onClick={onDelete}
          title="Delete"
          className={`${base} text-red-600 hover:opacity-80`}
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}