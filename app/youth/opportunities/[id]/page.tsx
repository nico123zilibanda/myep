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
  Video,
  FileText,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

import { Opportunity } from "@/types/opportunity";

export default function OpportunityDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (!id) return <p className="text-red-500">ID haijapatikana</p>;

  if (loading) {
    return (
      <div className="max-w-4xl space-y-4 animate-pulse">
        <div className="h-6 w-1/4 bg-black/10 rounded" />
        <div className="h-10 w-3/4 bg-black/10 rounded" />
        <div className="h-48 bg-black/10 rounded" />
      </div>
    );
  }

  if (!opportunity) return <p className="text-red-500">Fursa haijapatikana</p>;

  const deadline = new Date(opportunity.deadline);
  const isExpired = deadline < new Date();

  const { resourceType, resourceUrl } = opportunity;

  return (
    <div className="max-w-4xl space-y-8">
      {/* BACK */}
      <Link
        href="/youth/opportunities"
        className="inline-flex items-center gap-2 text-sm opacity-70 hover:underline"
      >
        <ArrowLeft size={16} />
        Rudi kwenye fursa
      </Link>

      {/* HEADER */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3 items-center">
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

          {/* RESOURCE BADGE */}
          {resourceType && (
            <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 flex items-center gap-1">
              {resourceType === "VIDEO" && <Video size={12} />}
              {resourceType === "PDF" && <FileText size={12} />}
              {resourceType === "LINK" && <ExternalLink size={12} />}
              {resourceType}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold">
          {opportunity.title}
        </h1>
      </div>

      {/* META */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm opacity-70">
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          {opportunity.location || "Haijabainishwa"}
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span className="px-2 py-0.5 rounded-full bg-black/5">
            Deadline: {deadline.toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* ✅ RESOURCE SECTION (NOW CORRECT) */}
      {resourceType && resourceUrl && (
        <section className="card border-default rounded-xl p-6 space-y-5">
          {/* HEADER */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
              {resourceType === "VIDEO" && <Video size={20} />}
              {resourceType === "PDF" && <FileText size={20} />}
              {resourceType === "LINK" && <ExternalLink size={20} />}
            </div>

            <div>
              <h2 className="font-semibold">
                {resourceType === "VIDEO" && "Video ya Mafunzo"}
                {resourceType === "PDF" && "Hati ya PDF"}
                {resourceType === "LINK" && "Tembelea Link"}
              </h2>

              <p className="text-xs opacity-60">
                {resourceType === "VIDEO" && "Tazama video hapa chini"}
                {resourceType === "PDF" && "Soma au pakua PDF"}
                {resourceType === "LINK" && "Fungua link kwa taarifa zaidi"}
              </p>
            </div>
          </div>

          {/* CONTENT */}
          {resourceType === "VIDEO" && (
            <video
              src={resourceUrl}
              controls
              className="w-full rounded-lg"
            />
          )}

          {resourceType === "PDF" && (
            <div className="space-y-3">
              <iframe
                src={resourceUrl}
                className="w-full h-[500px] rounded-lg border"
              />
              <a
                href={resourceUrl}
                target="_blank"
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                Fungua PDF
                <ExternalLink size={14} />
              </a>
            </div>
          )}

          {resourceType === "LINK" && (
            <a
              href={resourceUrl}
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              Tembelea Link
              <ExternalLink size={14} />
            </a>
          )}
        </section>
      )}

      {/* DESCRIPTION */}
      <section className="card border-default rounded-xl p-6 space-y-2">
        <h2 className="font-semibold">Maelezo ya Fursa</h2>
        <p className="opacity-70 text-sm whitespace-pre-line">
          {opportunity.description}
        </p>
      </section>

      {/* REQUIREMENTS */}
      {opportunity.requirements && (
        <section className="card border-default rounded-xl p-6 space-y-2">
          <h2 className="font-semibold">Mahitaji</h2>
          <p className="opacity-70 text-sm whitespace-pre-line">
            {opportunity.requirements}
          </p>
        </section>
      )}

      {/* HOW TO APPLY */}
      {opportunity.howToApply && (
        <section className="card border-default rounded-xl p-6 space-y-2">
          <div className="flex items-center gap-2">
            <Info size={18} className="opacity-70" />
            <h2 className="font-semibold">Jinsi ya Kuomba</h2>
          </div>

          <p className="text-sm opacity-70 whitespace-pre-line">
            {opportunity.howToApply}
          </p>
        </section>
      )}
    </div>
  );
}