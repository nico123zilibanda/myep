import Link from "next/link";

interface OpportunityCardProps {
  id: number;
  title: string;
  category: string;
  deadline: string;
  location: string;
}

export default function OpportunityCard({
  id,
  title,
  category,
  deadline,
  location,
}: OpportunityCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>

      <p className="text-sm text-gray-600">
        <strong>Aina:</strong> {category}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Eneo:</strong> {location}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Mwisho:</strong> {deadline}
      </p>

      <Link
        href={`/opportunities/${id}`}
        className="inline-block mt-3 text-green-700 font-medium"
      >
        Soma zaidi →
      </Link>
    </div>
  );
}
