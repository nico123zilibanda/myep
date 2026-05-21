import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status:
    | "PENDING"
    | "ANSWERED"
    | "REJECTED";

  className?: string;

  withDot?: boolean;
}

const statusMap = {
  ANSWERED: {
    label: "Answered",

    className: `
      border-green-500/20
      bg-green-500/10
      text-green-700

      dark:text-green-400
    `,

    dot: "bg-green-500",
  },

  PENDING: {
    label: "Pending",

    className: `
      border-yellow-500/20
      bg-yellow-500/10
      text-yellow-700

      dark:text-yellow-400
    `,

    dot: "bg-yellow-500",
  },

  REJECTED: {
    label: "Rejected",

    className: `
      border-red-500/20
      bg-red-500/10
      text-red-700

      dark:text-red-400
    `,

    dot: "bg-red-500",
  },
};

export default function StatusBadge({
  status,
  className,
  withDot = true,
}: StatusBadgeProps) {
  const data =
    statusMap[status] ?? {
      label: status,

      className: `
        border-border
        bg-muted
        text-muted-foreground
      `,

      dot: "bg-muted-foreground",
    };

  return (
    <span
      data-slot="status-badge"
      className={cn(
        `
        inline-flex items-center gap-1.5

        rounded-full

        border

        px-2.5 py-1

        text-xs
        font-medium

        transition-colors
      `,
        data.className,
        className,
      )}
    >
      {/* DOT */}
      {withDot && (
        <span
          className={cn(
            `
            size-1.5
            rounded-full
          `,
            data.dot,
          )}
        />
      )}

      {data.label}
    </span>
  );
}

