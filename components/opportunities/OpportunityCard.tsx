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
  const deadline = new Date(opportunity.deadline);
  const isExpired = deadline < new Date();

  if (loading) {
    return (
      <div className="card border-default rounded-xl p-5 space-y-4 animate-pulse">
        <div className="h-4 w-1/3 bg-black/10 rounded" />
        <div className="h-6 w-2/3 bg-black/10 rounded" />
        <div className="h-12 w-full bg-black/10 rounded" />
        <div className="h-4 w-1/2 bg-black/10 rounded" />
        <div className="h-8 w-full bg-black/10 rounded mt-2" />
      </div>
    );
  }

  return (
    <div className="card border-default rounded-xl p-5 space-y-4 hover:shadow-md transition-shadow duration-200">
      {/* BADGES */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs px-2 py-1 rounded-full bg-black/5 flex items-center gap-1">
          <Folder size={12} />
          {opportunity.Category?.name || "Bila Kundi"}
        </span>

        <span
          className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
            isExpired
              ? "bg-red-500/10 text-red-500"
              : "bg-green-500/10 text-green-500"
          }`}
        >
          <Clock size={12} />
          {isExpired ? "Imefungwa" : "Bado Wazi"}
        </span>
      </div>

      {/* TITLE */}
      <h3 className="font-semibold">{opportunity.title}</h3>

      {/* DESCRIPTION */}
      <p className="text-sm opacity-70 line-clamp-3">
        {opportunity.description}
      </p>

      {/* META */}
      <div className="text-sm opacity-70 space-y-1">
        <div className="flex gap-2 items-center">
          <MapPin size={16} />
          {opportunity.location || "Haijabainishwa"}
        </div>

        <div className="flex gap-2 items-center">
          <Calendar size={16} />
          <span className="bg-black/5 px-2 py-0.5 rounded-full text-xs">
            Deadline: {deadline.toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="border-t border-default pt-3 flex justify-between items-center">
        <button
          onClick={() => onToggleSave(opportunity.id, opportunity.isSaved)}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition ${
            opportunity.isSaved
              ? "bg-(--primary) text-white"
              : "bg-black/5 hover:bg-black/10"
          }`}
        >
          <Bookmark size={14} />
          {opportunity.isSaved ? "Saved" : "Save"}
        </button>

        <Link
          href={`/youth/opportunities/${opportunity.id}`}
          className="text-xs font-medium opacity-70 hover:opacity-100"
        >
          Soma Maelezo →
        </Link>
      </div>
    </div>
  );
}
