"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, Calendar, Folder, Clock, Info, ArrowLeft } from "lucide-react";
import Link from "next/link";

/* ================= TYPES ================= */
interface Opportunity {
  id: number;
  title: string;
  description: string;
  requirements: string;
  howToApply: string;
  deadline: string;
  location: string;
  Category?: { name: string };
}

/* ================= PAGE ================= */
export default function OpportunityDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    if (!id) return;

    const fetchOpportunity = async () => {
      try {
        const res = await fetch(`/api/youth/opportunities/${id}`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setOpportunity(data);
      } catch {
        alert("Imeshindikana kupakia taarifa za fursa");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunity();
  }, [id]);

  /* ================= LOADING / ERROR STATES ================= */
  if (!id) return <p className="text-red-500">ID haijapatikana</p>;

  if (loading) {
    return (
      <div className="max-w-4xl space-y-4 animate-pulse">
        <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (!opportunity) return <p className="text-red-500">Fursa haijapatikana</p>;

  const deadline = new Date(opportunity.deadline);
  const isExpired = deadline < new Date();

  return (
    <div className="max-w-4xl space-y-8">
      {/* BACK */}
      <Link
        href="/youth/opportunities"
        className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
      >
        <ArrowLeft size={16} />
        Rudi kwenye fursa
      </Link>

      {/* HEADER */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3 items-center">
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

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
          {opportunity.title}
        </h1>
      </div>

      {/* META */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          {opportunity.location || "Haijabainishwa"}
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100">
            Deadline: {deadline.toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* DESCRIPTION */}
      <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-2 shadow-sm">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Maelezo ya Fursa
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {opportunity.description}
        </p>
      </section>

      {/* REQUIREMENTS */}
      {opportunity.requirements && (
        <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-2 shadow-sm">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Mahitaji</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm whitespace-pre-line">
            {opportunity.requirements}
          </p>
        </section>
      )}

      {/* HOW TO APPLY */}
      <section className="bg-blue-50 dark:bg-blue-900 border border-blue-100 dark:border-blue-700 rounded-xl p-6 space-y-2 shadow-sm">
        <div className="flex items-center gap-2">
          <Info className="text-blue-600 dark:text-blue-300" size={18} />
          <h2 className="font-semibold text-blue-700 dark:text-blue-300">
            Jinsi ya Kuomba
          </h2>
        </div>
        <p className="text-sm text-blue-700 dark:text-blue-200 whitespace-pre-line">
          {opportunity.howToApply}
        </p>
      </section>
    </div>
  );
}
