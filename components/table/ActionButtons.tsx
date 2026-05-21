
"use client";

import {
  Eye,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";

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
  const iconClass = "size-4";

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {/* VIEW */}
      {onView && (
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={onView}
          title="View"
          className="
            text-muted-foreground
            hover:text-foreground
            hover:bg-muted
          "
        >
          <Eye className={iconClass} />
        </Button>
      )}

      {/* EDIT */}
      {onEdit && (
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={onEdit}
          title="Edit"
          className="
            text-blue-600 dark:text-blue-400
            hover:bg-blue-500/10
            hover:text-blue-700
            dark:hover:text-blue-300
          "
        >
          <Pencil className={iconClass} />
        </Button>
      )}

      {/* PUBLISH */}
      {onPublish &&
        (status === "DRAFT" || status === "CLOSED") && (
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={onPublish}
            title="Publish"
            className="
              text-emerald-600 dark:text-emerald-400
              hover:bg-emerald-500/10
              hover:text-emerald-700
              dark:hover:text-emerald-300
            "
          >
            <CheckCircle className={iconClass} />
          </Button>
        )}

      {/* UNPUBLISH */}
      {onUnpublish &&
        status === "PUBLISHED" && (
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={onUnpublish}
            title="Unpublish"
            className="
              text-amber-600 dark:text-amber-400
              hover:bg-amber-500/10
              hover:text-amber-700
              dark:hover:text-amber-300
            "
          >
            <RotateCcw className={iconClass} />
          </Button>
        )}

      {/* CLOSE */}
      {onClose &&
        status === "PUBLISHED" && (
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={onClose}
            title="Close"
            className="
              text-orange-600 dark:text-orange-400
              hover:bg-orange-500/10
              hover:text-orange-700
              dark:hover:text-orange-300
            "
          >
            <XCircle className={iconClass} />
          </Button>
        )}

      {/* DELETE */}
      {onDelete && (
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={onDelete}
          title="Delete"
          className="
            text-red-600 dark:text-red-400
            hover:bg-red-500/10
            hover:text-red-700
            dark:hover:text-red-300
          "
        >
          <Trash2 className={iconClass} />
        </Button>
      )}
    </div>
  );
}

