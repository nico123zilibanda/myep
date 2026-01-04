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
  return (
    <div className="flex gap-2">
      {/* View */}
      {onView && (
        <button
          onClick={onView}
          className="p-2 rounded hover:bg-gray-100 text-gray-600"
          title="View"
        >
          <Eye size={16} />
        </button>
      )}

      {/* Edit */}
      {onEdit && (
        <button
          onClick={onEdit}
          className="p-2 rounded hover:bg-blue-100 text-blue-600"
          title="Toggle Status"
        >
          <Pencil size={16} />
        </button>
      )}

      {/* Delete */}
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
