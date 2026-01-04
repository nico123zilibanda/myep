interface TrainingCardProps {
  title: string;
  type: "Article" | "Video" | "PDF";
  description: string;
}

export default function TrainingCard({
  title,
  type,
  description,
}: TrainingCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow transition">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <span className="inline-block mb-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
        {type}
      </span>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
