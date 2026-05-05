import Link from "next/link";
import {
  MapPin,
  Calendar,
  Folder,
  Clock,
  Bookmark,
  Video,
  FileText,
  ExternalLink,
} from "lucide-react";

import { Opportunity } from "@/types/opportunity";

/* ================= TYPES ================= */
interface OpportunityCardProps {
  opportunity: Opportunity;
  onToggleSave: (id: number, isSaved: boolean) => void;
  onViewResource?: (op: Opportunity) => void;
  loading?: boolean;
}

export default function OpportunityCard({
  opportunity,
  onToggleSave,
  onViewResource,
  loading = false,
}: OpportunityCardProps) {

  const deadline = new Date(opportunity.deadline);
  const isExpired = deadline < new Date();

  // 🔥 SAFE RESOURCE CHECK
  const hasResource =
    Boolean(opportunity.resourceType) &&
    Boolean(opportunity.resourceUrl);

  const resourceType = opportunity.resourceType;

  const resourceMap = {
    VIDEO: { icon: <Video size={14} />, label: "Video" },
    PDF: { icon: <FileText size={14} />, label: "PDF" },
    LINK: { icon: <ExternalLink size={14} />, label: "Link" },
  } as const;

  const resource =
    hasResource && resourceType
      ? resourceMap[resourceType]
      : null;

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="card border-default rounded-xl p-5 space-y-4 animate-pulse">
        <div className="h-4 w-1/3 bg-black/10 rounded" />
        <div className="h-6 w-2/3 bg-black/10 rounded" />
        <div className="h-12 w-full bg-black/10 rounded" />
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="card border-default rounded-xl p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-200 group">

      {/* ================= TOP ================= */}
      <div className="space-y-3">

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

        {/* RESOURCE BADGE */}
        {resource && (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-600">
            {resource.icon}
            {resource.label}
          </span>
        )}

        {/* TITLE */}
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition">
          {opportunity.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm opacity-70 line-clamp-3">
          {opportunity.description}
        </p>

        {/* META */}
        <div className="text-sm opacity-70 space-y-1">
          <div className="flex gap-2 items-center">
            <MapPin size={14} />
            {opportunity.location || "Haijabainishwa"}
          </div>

          <div className="flex gap-2 items-center">
            <Calendar size={14} />
            <span className="bg-black/5 px-2 py-0.5 rounded-full text-xs">
              {deadline.toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="border-t border-default pt-3 mt-4 flex justify-between items-center">

        {/* SAVE BUTTON */}
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

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">

          {/* VIEW RESOURCE */}
          {hasResource && (
            <button
              onClick={() => onViewResource?.(opportunity)}
              className="text-xs flex items-center gap-1 text-blue-600 hover:underline"
            >
              {resourceType === "VIDEO" && "Tazama Video"}
              {resourceType === "PDF" && "Fungua PDF"}
              {resourceType === "LINK" && "Tembelea Link"}

              <ExternalLink size={12} />
            </button>
          )}

          {/* DETAILS */}
          <Link
            href={`/youth/opportunities/${opportunity.id}`}
            className="text-xs font-medium opacity-70 hover:opacity-100"
          >
            Maelezo →
          </Link>

        </div>
      </div>
    </div>
  );
}