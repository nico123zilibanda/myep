interface StatusBadgeProps {
  status: "PENDING" | "ANSWERED" | "REJECTED";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  let styles = "";
  let label = "";

  switch (status) {
    case "ANSWERED":
      styles = "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100";
      label = "Answered";
      break;
    case "PENDING":
      styles = "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100";
      label = "Pending";
      break;
    case "REJECTED":
      styles = "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100";
      label = "Rejected";
      break;
    default:
      styles = "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
      label = status;
  }

  return (
    <span
      className={`text-xs font-medium px-2 py-1 rounded-full ${styles}`}
    >
      {label}
    </span>
  );
}
