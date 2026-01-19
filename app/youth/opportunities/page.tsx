"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { Info } from "lucide-react";
import OpportunityCard from "@/components/opportunities/OpportunityCard";

/* ================= TYPES ================= */
export interface Opportunity {
  id: number;
  title: string;
  description: string;
  requirements: string;
  howToApply: string;
  deadline: string;
  location: string;
  isSaved: boolean;
  Category?: { name: string };
}

/* ================= PAGE ================= */
export default function YouthOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] =
    useState<"ALL" | "OPEN" | "EXPIRED">("ALL");

  /* ================= FETCH OPPORTUNITIES ================= */
  const fetchOpportunities = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/youth/opportunities", {
        cache: "no-store",
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setOpportunities(data);
      } else {
        setOpportunities([]);
      }
    } catch {
      alert("Imeshindikana kupakia fursa");
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /* 🔹 INITIAL LOAD */
  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  /* 🔹 REFRESH WHEN USER RETURNS TO PAGE */
  useEffect(() => {
    const onFocus = () => fetchOpportunities();
    const handler = () => {
      if (document.visibilityState === "visible") onFocus();
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [fetchOpportunities]);

  /* ================= FILTERS ================= */
  const categories = useMemo(() => {
    const cats = opportunities
      .map((o) => o.Category?.name)
      .filter((c): c is string => Boolean(c));
    return ["ALL", ...Array.from(new Set(cats))];
  }, [opportunities]);

  const filteredOpportunities = useMemo(() => {
    const now = new Date();
    return opportunities.filter((op) => {
      const isExpired = new Date(op.deadline) < now;

      if (categoryFilter !== "ALL" && op.Category?.name !== categoryFilter)
        return false;
      if (statusFilter === "OPEN" && isExpired) return false;
      if (statusFilter === "EXPIRED" && !isExpired) return false;

      return true;
    });
  }, [opportunities, categoryFilter, statusFilter]);

  /* ================= SAVE / UNSAVE ================= */
  const toggleSave = async (id: number, isSaved: boolean) => {
    setOpportunities((prev) =>
      prev.map((op) => (op.id === id ? { ...op, isSaved: !isSaved } : op))
    );

    try {
      const res = await fetch("/api/youth/saved-opportunities", {
        method: isSaved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opportunityId: id }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setOpportunities((prev) =>
        prev.map((op) => (op.id === id ? { ...op, isSaved } : op))
      );
      alert("Imeshindikana kuhifadhi fursa");
    }
  };

  /* ================= RENDER ================= */
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
          Fursa Zilizopo
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          Angalia fursa zilizotangazwa na upate maelekezo ya kuzifikia
        </p>
      </div>

      {/* INFO */}
      <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-100 dark:border-yellow-700 rounded-xl p-5 flex gap-3 shadow-sm">
        <Info className="text-yellow-600 dark:text-yellow-300 mt-1" size={20} />
        <p className="text-sm text-yellow-700 dark:text-yellow-200">
          Mfumo huu hautumiki kuomba fursa. Soma maelezo ya kila fursa ili kujua hatua zinazofuata.
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
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
          className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        >
          <option value="ALL">Zote</option>
          <option value="OPEN">Bado Ziko Wazi</option>
          <option value="EXPIRED">Zilizofungwa</option>
        </select>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 space-y-4 shadow animate-pulse"
              >
                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-3 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-3 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded mt-2"></div>
              </div>
            ))
          : filteredOpportunities.map((op) => (
              <OpportunityCard
                key={op.id}
                opportunity={op}
                onToggleSave={toggleSave}
              />
            ))}
      </div>
    </div>
  );
}
