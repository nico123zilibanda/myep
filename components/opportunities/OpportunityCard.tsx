import Link from "next/link";
import {
  MapPin,
  Calendar,
  Folder,
  Clock,
  Bookmark,
} from "lucide-react";
import { Opportunity } from "@/app/youth/opportunities/page";

interface OpportunityCardProps {
  opportunity: Opportunity;
  onToggleSave: (id: number, isSaved: boolean) => void;
}

export default function OpportunityCard({
  opportunity,
  onToggleSave,
}: OpportunityCardProps) {
  const deadline = new Date(opportunity.deadline);
  const isExpired = deadline < new Date();

  return (
    <div className="bg-white border rounded-xl p-5 space-y-4 hover:shadow-sm transition">
      {/* BADGES */}
      <div className="flex items-center justify-between">
        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 flex items-center gap-1">
          <Folder size={12} />
          {opportunity.Category?.name || "Bila Kundi"}
        </span>

        <span
          className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
            isExpired
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          <Clock size={12} />
          {isExpired ? "Imefungwa" : "Bado Wazi"}
        </span>
      </div>

      {/* TITLE */}
      <h3 className="font-semibold text-gray-800">
        {opportunity.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-600 line-clamp-3">
        {opportunity.description}
      </p>

      {/* META */}
      <div className="text-sm text-gray-500 space-y-1">
        <div className="flex gap-2 items-center">
          <MapPin size={16} />
          {opportunity.location || "Haijabainishwa"}
        </div>

        <div className="flex gap-2 items-center">
          <Calendar size={16} />
          <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs">
            Deadline: {deadline.toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="border-t pt-3 flex justify-between items-center">
        <button
          onClick={() =>
            onToggleSave(opportunity.id, opportunity.isSaved)
          }
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition ${
            opportunity.isSaved
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Bookmark size={14} />
          {opportunity.isSaved ? "Saved" : "Save"}
        </button>

        <Link
          href={`/youth/opportunities/${opportunity.id}`}
          className="text-blue-600 font-medium hover:underline text-xs"
        >
          Soma Maelezo →
        </Link>
      </div>
    </div>
  );
}
