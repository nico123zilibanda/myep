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
  Category?: {
    name: string;
  };
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
        cache: "no-store", // 🔑 important
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
    const onFocus = () => {
      fetchOpportunities();
    };

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        onFocus();
      }
    });

    return () => {
      document.removeEventListener("visibilitychange", onFocus);
    };
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

      if (categoryFilter !== "ALL" && op.Category?.name !== categoryFilter) {
        return false;
      }

      if (statusFilter === "OPEN" && isExpired) return false;
      if (statusFilter === "EXPIRED" && !isExpired) return false;

      return true;
    });
  }, [opportunities, categoryFilter, statusFilter]);

  /* ================= SAVE / UNSAVE (OPTIMISTIC UI) ================= */
  const toggleSave = async (id: number, isSaved: boolean) => {
    // 1️⃣ Optimistic UI
    setOpportunities((prev) =>
      prev.map((op) =>
        op.id === id ? { ...op, isSaved: !isSaved } : op
      )
    );

    try {
      const res = await fetch("/api/youth/saved-opportunities", {
        method: isSaved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opportunityId: id }),
      });

      if (!res.ok) throw new Error();
    } catch {
      // 2️⃣ Rollback
      setOpportunities((prev) =>
        prev.map((op) =>
          op.id === id ? { ...op, isSaved } : op
        )
      );

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

      {/* INFO */}
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

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.map((op) => (
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
