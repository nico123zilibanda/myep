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

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === "visible") fetchOpportunities();
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

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-(--text-primary)">
          Fursa Zilizopo
        </h1>

        <p className="text-sm sm:text-base opacity-70">
          Angalia fursa zilizotangazwa na upate maelekezo ya kuzifikia
        </p>
      </div>

      {/* INFO */}
      <div className="card border-default rounded-xl p-5 flex gap-3 shadow-sm">
        <div className="p-2 rounded-md bg-black/5">
          <Info size={20} />
        </div>

        <p className="text-sm opacity-70">
          Mfumo huu hautumiki kuomba fursa. Soma maelezo ya kila fursa ili kujua hatua zinazofuata.
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="
            rounded-lg px-3 py-2 text-sm
            card border-default
            focus:outline-none
            focus:ring-2 focus:ring-(--btn-focus)
          "
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
          className="
            rounded-lg px-3 py-2 text-sm
            card border-default
            focus:outline-none
            focus:ring-2 focus:ring-(--btn-focus)
          "
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
                className="card border-default rounded-xl p-5 space-y-4 animate-pulse"
              >
                <div className="h-4 w-24 rounded card border-default" />
                <div className="h-6 w-3/4 rounded card border-default" />
                <div className="h-3 w-full rounded card border-default" />
                <div className="h-3 w-full rounded card border-default" />
                <div className="h-6 w-20 rounded card border-default mt-2" />
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
