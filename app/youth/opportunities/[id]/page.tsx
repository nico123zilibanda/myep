"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  MapPin,
  Calendar,
  Folder,
  Clock,
  Info,
  ArrowLeft,
} from "lucide-react";
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
  Category?: {
    name: string;
  };
}

/* ================= PAGE ================= */
export default function OpportunityDetailsPage() {
const params = useParams();
const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const res = await fetch(`/api/youth/opportunities/${id}`);
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

  if (loading) {
    return <p className="text-gray-500">Inapakia...</p>;
  }

  if (!opportunity) {
    return <p className="text-red-500">Fursa haijapatikana</p>;
  }

  const deadline = new Date(opportunity.deadline);
  const isExpired = deadline < new Date();

  return (
    <div className="space-y-8 max-w-4xl">
      {/* BACK */}
      <Link
        href="/youth/opportunities"
        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
      >
        <ArrowLeft size={16} />
        Rudi kwenye fursa
      </Link>

      {/* HEADER */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3 items-center">
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

        <h1 className="text-2xl font-bold text-gray-800">
          {opportunity.title}
        </h1>
      </div>

      {/* META */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          {opportunity.location || "Haijabainishwa"}
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          Deadline: {deadline.toLocaleDateString()}
        </div>
      </div>

      {/* DESCRIPTION */}
      <section className="bg-white border rounded-xl p-6 space-y-2">
        <h2 className="font-semibold text-gray-800">
          Maelezo ya Fursa
        </h2>
        <p className="text-gray-600 text-sm">
          {opportunity.description}
        </p>
      </section>

      {/* REQUIREMENTS */}
      {opportunity.requirements && (
        <section className="bg-white border rounded-xl p-6 space-y-2">
          <h2 className="font-semibold text-gray-800">
            Mahitaji
          </h2>
          <p className="text-gray-600 text-sm whitespace-pre-line">
            {opportunity.requirements}
          </p>
        </section>
      )}

      {/* HOW TO APPLY */}
      <section className="bg-blue-50 border border-blue-100 rounded-xl p-6 space-y-2">
        <div className="flex items-center gap-2">
          <Info className="text-blue-600" size={18} />
          <h2 className="font-semibold text-blue-700">
            Jinsi ya Kuomba
          </h2>
        </div>
        <p className="text-sm text-blue-700 whitespace-pre-line">
          {opportunity.howToApply}
        </p>
      </section>
    </div>
  );
}
