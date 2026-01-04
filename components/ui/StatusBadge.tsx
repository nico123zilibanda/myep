interface StatusBadgeProps {
  status: "PENDING" | "ANSWERED";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles =
    status === "ANSWERED"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <span
      className={`text-xs font-medium px-2 py-1 rounded-full ${styles}`}
    >
      {status === "ANSWERED" ? "Answered" : "Pending"}
    </span>
  );
}
