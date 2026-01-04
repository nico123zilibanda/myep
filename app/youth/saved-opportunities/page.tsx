"use client";

import { useEffect, useState } from "react";
import { MapPin, Calendar, Folder, Info, Clock, } from "lucide-react";
import Link from "next/link";

interface Opportunity {
  id: number;
  title: string;
  description: string;
  deadline: string;
  location: string;
  isSaved: boolean; // Hii ni muhimu kwa save/unsave
  Category?:
  {
    name: string

  };
}

export default function SavedOpportunitiesPage() {
  const [savedOpportunities, setSavedOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch saved opportunities
  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await fetch("/api/youth/saved-opportunities");
        const data = await res.json();
        setSavedOpportunities(data);
      } catch (err) {
        console.error("Failed to load saved opportunities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, []);

  // 🔹 Toggle Save / Unsave button
  const toggleSave = async (id: number, isSaved: boolean) => {
    try {
      const res = await fetch("/api/youth/saved-opportunities", {
        method: isSaved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opportunityId: id }),
      });

      if (!res.ok) throw new Error("Failed");

      // Update state after toggle
      setSavedOpportunities((prev) =>
        prev.map((op) =>
          op.id === id ? { ...op, isSaved: !isSaved } : op
        )
      );
    } catch {
      alert("Imeshindikana kuhifadhi/kuondoa fursa");
    }
  };

  if (loading) return <p>Inapakia saved opportunities...</p>;

  if (savedOpportunities.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Saved Opportunities</h1>
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5 flex gap-3">
          <Info className="text-yellow-600 mt-1" size={20} />
          <p className="text-sm text-yellow-700">
            Huna fursa yoyote uliyoihifadhi kwa sasa. Angalia fursa zilizopo na ihifadhi kwa baadaye.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Saved Opportunities</h1>
        <p className="text-gray-500 text-sm">
          Fursa ulizoziweka hapa ili uweze kuzipata kwa urahisi
        </p>
      </div>
      {/* INFO NOTE */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex gap-3">
        <Info className="text-blue-600 mt-1" size={20} />
        <p className="text-sm text-blue-700">
          Mfumo huu hautumiki kuomba fursa. Soma maelezo ya kila
          fursa ili kujua hatua zinazofuata.
        </p>
      </div>
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedOpportunities.map((op) => {
          const deadline = new Date(op.deadline);
          const isExpired = deadline < new Date();

          return (
            <div key={op.id} className="bg-white border rounded-xl p-5 space-y-3 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 flex items-center gap-1">
                  <Folder size={12} />
                  {op.Category?.name || "Bila Kundi"}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${isExpired
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                    }`}
                >
                  <Clock size={12} />
                  {isExpired ? "Imefungwa" : "Bado Wazi"}
                </span>
              </div>
              {/* TITLE */}
              <h3 className="font-semibold text-gray-800">{op.title}</h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-600">{op.description}</p>

              {/* META */}
              <div className="text-sm text-gray-500 space-y-1">
                {op.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {op.location}
                  </div>
                )}
                {op.deadline && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs">
                      Deadline: {deadline.toLocaleDateString()}
                    </span>
                  </div>
                )}
                {/* {op.Category?.name && (
                  <div className="flex items-center gap-2">
                    <Folder size={16} />
                    {op.Category.name}
                  </div>
                )} */}
              </div>

              {/* FOOTER: Save/Unsave + Link to Details */}
              <div className="border-t pt-3 flex justify-between items-center text-sm">
                {/* 🔹 Save / Unsave Button */}
                {/* <button
                  onClick={() => toggleSave(op.id, op.isSaved)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition ${
                    op.isSaved
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {op.isSaved ? "Saved" : "Save"}
                </button> */}

                {/* 🔹 Link to Details Page */}
                <Link
                  href={`/youth/opportunities/${op.id}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Soma Maelezo →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
