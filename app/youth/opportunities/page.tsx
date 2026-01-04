"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MapPin,
  Calendar,
  Folder,
  Info,
  Clock,
  Bookmark,
} from "lucide-react";

/* ================= TYPES ================= */
interface Opportunity {
  id: number;
  title: string;
  description: string;
  requirements: string;
  howToApply: string;
  deadline: string;
  location: string;
  isSaved: boolean; // hali ya kuwa saved au la
  Category?: {
    name: string;
  };
}

/* ================= PAGE ================= */
export default function YouthOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "OPEN" | "EXPIRED">(
    "ALL"
  );

  /* ================= FETCH OPPORTUNITIES ================= */
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const res = await fetch("/api/youth/opportunities");
        const data = await res.json();
        setOpportunities(data);
      } catch {
        alert("Imeshindikana kupakia fursa");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  /* ================= FILTERS ================= */
  const categories = useMemo(() => {
    const cats = opportunities
      .map((o) => o.Category?.name)
      .filter(Boolean) as string[];
    return ["ALL", ...Array.from(new Set(cats))];
  }, [opportunities]);

  const filteredOpportunities = useMemo(() => {
    const now = new Date();

    return opportunities.filter((op) => {
      const deadline = new Date(op.deadline);
      const isExpired = deadline < now;

      if (categoryFilter !== "ALL" && op.Category?.name !== categoryFilter) {
        return false;
      }

      if (statusFilter === "OPEN" && isExpired) return false;
      if (statusFilter === "EXPIRED" && !isExpired) return false;

      return true;
    });
  }, [opportunities, categoryFilter, statusFilter]);

  /* ================= TOGGLE SAVE/UNSAVE ================= */
  const toggleSave = async (id: number, isSaved: boolean) => {
    try {
      // call API: POST ili save, DELETE ili unsave
      const res = await fetch("/api/youth/saved-opportunities", {
        method: isSaved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opportunityId: id }),
      });

      if (!res.ok) {
        throw new Error("Failed to toggle save");
      }

      // optimistic UI update
      setOpportunities((prev) =>
        prev.map((op) =>
          op.id === id ? { ...op, isSaved: !isSaved } : op
        )
      );
    } catch (err) {
      alert("Imeshindikana kuhifadhi fursa");
    }
  };

  if (loading) {
    return <p className="text-gray-500">Inapakia fursa...</p>;
  }

  /* ================= RENDER ================= */
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Fursa Zilizopo
        </h1>
        <p className="text-gray-500 text-sm">
          Angalia fursa zilizotangazwa na upate maelekezo ya kuzifikia
        </p>
      </div>

      {/* INFO NOTE */}
      <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5 flex gap-3">
        <Info className="text-yellow-600 mt-1" size={20} />
        <p className="text-sm text-yellow-700">
          Mfumo huu hautumiki kuomba fursa. Soma maelezo ya kila
          fursa ili kujua hatua zinazofuata.
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "ALL" ? "Makundi Yote" : cat}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "ALL" | "OPEN" | "EXPIRED")
          }
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="ALL">Zote</option>
          <option value="OPEN">Bado Ziko Wazi</option>
          <option value="EXPIRED">Zilizofungwa</option>
        </select>
      </div>

      {/* EMPTY STATE */}
      {filteredOpportunities.length === 0 && (
        <p className="text-gray-500 text-sm">
          Hakuna fursa zinazolingana na vigezo ulivyochagua.
        </p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.map((op) => (
          <OpportunityCard
            key={op.id}
            opportunity={op}
            onToggleSave={toggleSave} // pass toggle function
          />
        ))}
      </div>
    </div>
  );
}

/* ================= CARD ================= */
function OpportunityCard({
  opportunity,
  onToggleSave,
}: {
  opportunity: Opportunity;
  onToggleSave: (id: number, isSaved: boolean) => void;
}) {
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
      <h3 className="font-semibold text-gray-800">{opportunity.title}</h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-600">{opportunity.description}</p>

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

      {/* SAVE / DETAILS */}
      <div className="border-t pt-3 flex justify-between items-center text-sm">
        {/* Save / Unsave button */}
          <button
            onClick={() => onToggleSave(opportunity.id, opportunity.isSaved)}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition ${
              opportunity.isSaved
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Bookmark size={14} className={opportunity.isSaved ? "text-white" : "text-gray-700"} />
            {opportunity.isSaved ? "Saved" : "Save"}
          </button>


        {/* Details link */}
        <a
          href={`/youth/opportunities/${opportunity.id}`}
          className="text-blue-600 font-medium hover:underline text-xs"
        >
          Soma Maelezo →
        </a>
      </div>
    </div>
  );
}
