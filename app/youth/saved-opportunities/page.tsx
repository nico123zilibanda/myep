"use client";

import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import OpportunityCard from "@/components/opportunities/OpportunityCard";

/* ================= TYPES ================= */
interface Opportunity {
  id: number;
  title: string;
  description: string;
  deadline: string;
  location: string;
  isSaved: boolean;
  Category?: { name: string };
}

/* ================= PAGE ================= */
export default function SavedOpportunitiesPage() {
  const [savedOpportunities, setSavedOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH SAVED ================= */
  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await fetch("/api/youth/saved-opportunities");
        if (!res.ok) throw new Error();

        const data = await res.json();

        const formatted = (data || []).map((op: Opportunity) => ({
          ...op,
          isSaved: true,
        }));

        setSavedOpportunities(formatted);
      } catch {
        alert("Imeshindikana kupakia saved opportunities");
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, []);

  /* ================= UNSAVE ================= */
  const toggleSave = async (id: number) => {
    try {
      const res = await fetch("/api/youth/saved-opportunities", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opportunityId: id }),
      });

      if (!res.ok) throw new Error();

      setSavedOpportunities((prev) => prev.filter((op) => op.id !== id));
    } catch {
      alert("Imeshindikana kuondoa fursa");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-1/4 bg-black/10 rounded" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <OpportunityCard
              key={i}
              opportunity={{} as Opportunity}
              loading
              onToggleSave={() => {}}
            />
          ))}
        </div>
      </div>
    );
  }

  /* ================= EMPTY ================= */
  if (savedOpportunities.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Saved Opportunities</h1>

        <div className="card border-default rounded-xl p-5 flex gap-3">
          <Info className="mt-1 opacity-70" size={20} />
          <p className="text-sm opacity-70">
            Huna fursa yoyote uliyoihifadhi kwa sasa.
            Angalia fursa zilizopo na uzihifadhi kwa baadaye.
          </p>
        </div>
      </div>
    );
  }

  /* ================= RENDER ================= */
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Saved Opportunities</h1>
        <p className="text-sm opacity-70">
          Fursa ulizoziweka ili uweze kuzipata kwa urahisi
        </p>
      </div>

      {/* INFO */}
      <div className="card border-default rounded-xl p-5 flex gap-3">
        <Info className="mt-1 opacity-70" size={20} />
        <p className="text-sm opacity-70">
          Mfumo huu hautumiki kuomba fursa.
          Soma maelezo ya kila fursa ili kujua hatua zinazofuata.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedOpportunities.map((op) => (
          <OpportunityCard
            key={op.id}
            opportunity={op}
            onToggleSave={() => toggleSave(op.id)}
          />
        ))}
      </div>
    </div>
  );
}
