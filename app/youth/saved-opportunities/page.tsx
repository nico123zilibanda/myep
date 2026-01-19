"use client";

import { useEffect, useState } from "react";
import { MapPin, Calendar, Folder, Info, Clock, Bookmark } from "lucide-react";
import Link from "next/link";
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
        if (!res.ok) throw new Error("Failed");

        const data = await res.json();

        // 🔹 Mark all as saved
        const formatted = (data || []).map((op: Opportunity) => ({
          ...op,
          isSaved: true,
        }));

        setSavedOpportunities(formatted);
      } catch (err) {
        console.error(err);
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

      if (!res.ok) throw new Error("Failed");

      // Remove from list
      setSavedOpportunities((prev) => prev.filter((op) => op.id !== id));
    } catch {
      alert("Imeshindikana kuondoa fursa");
    }
  };

  /* ================= LOADING / EMPTY STATES ================= */
  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <OpportunityCard key={i} opportunity={{} as Opportunity} loading onToggleSave={() => {}} />
          ))}
        </div>
      </div>
    );
  }

  if (savedOpportunities.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Saved Opportunities
        </h1>

        <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-100 dark:border-yellow-700 rounded-xl p-5 flex gap-3">
          <Info className="text-yellow-600 dark:text-yellow-300 mt-1" size={20} />
          <p className="text-sm text-yellow-700 dark:text-yellow-200">
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
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Saved Opportunities
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Fursa ulizoziweka ili uweze kuzipata kwa urahisi
        </p>
      </div>

      {/* INFO */}
      <div className="bg-blue-50 dark:bg-blue-900 border border-blue-100 dark:border-blue-700 rounded-xl p-5 flex gap-3">
        <Info className="text-blue-600 dark:text-blue-300 mt-1" size={20} />
        <p className="text-sm text-blue-700 dark:text-blue-200">
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
