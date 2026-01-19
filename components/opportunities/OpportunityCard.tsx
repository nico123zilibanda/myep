import Link from "next/link";
import { MapPin, Calendar, Folder, Clock, Bookmark } from "lucide-react";

/* ================= TYPES ================= */
export interface Opportunity {
  id: number;
  title: string;
  description: string;
  deadline: string;
  location: string;
  isSaved: boolean;
  Category?: { name: string };
  requirements?: string;
  howToApply?: string;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  onToggleSave: (id: number, isSaved: boolean) => void;
  loading?: boolean;
}

export default function OpportunityCard({
  opportunity,
  onToggleSave,
  loading = false,
}: OpportunityCardProps) {
  const deadline = opportunity ? new Date(opportunity.deadline) : new Date();
  const isExpired = opportunity ? deadline < new Date() : false;

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 space-y-4 animate-pulse shadow-sm">
        <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-6 w-2/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-12 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-8 w-full bg-gray-300 dark:bg-gray-700 rounded mt-2"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 space-y-4 hover:shadow-md transition-shadow duration-200">
      {/* BADGES */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100 flex items-center gap-1">
          <Folder size={12} />
          {opportunity.Category?.name || "Bila Kundi"}
        </span>

        <span
          className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
            isExpired
              ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100"
              : "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
          }`}
        >
          <Clock size={12} />
          {isExpired ? "Imefungwa" : "Bado Wazi"}
        </span>
      </div>

      {/* TITLE */}
      <h3 className="font-semibold text-gray-800 dark:text-gray-100">
        {opportunity.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
        {opportunity.description}
      </p>

      {/* META */}
      <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
        <div className="flex gap-2 items-center">
          <MapPin size={16} />
          {opportunity.location || "Haijabainishwa"}
        </div>

        <div className="flex gap-2 items-center">
          <Calendar size={16} />
          <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100 px-2 py-0.5 rounded-full text-xs">
            Deadline: {deadline.toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between items-center">
        <button
          onClick={() => onToggleSave(opportunity.id, opportunity.isSaved)}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition ${
            opportunity.isSaved
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          <Bookmark size={14} />
          {opportunity.isSaved ? "Saved" : "Save"}
        </button>

        <Link
          href={`/youth/opportunities/${opportunity.id}`}
          className="text-blue-600 dark:text-blue-300 font-medium hover:underline text-xs"
        >
          Soma Maelezo →
        </Link>
      </div>
    </div>
  );
}
