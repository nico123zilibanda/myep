"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Video,
  FileText,
  Clock,
  MapPin,
  Info,
  ExternalLink,
} from "lucide-react";

/* ================= TYPES ================= */
interface Training {
  id: number;
  title: string;
  type: "VIDEO" | "PDF" | "ARTICLE";
  description: string;
  resourceUrl: string;
}

/* ================= PAGE ================= */
export default function YouthTrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const res = await fetch("/api/youth/trainings");

        if (!res.ok) {
          throw new Error("Imeshindikana kupakua mafunzo");
        }

        const data = await res.json();
        setTrainings(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  /* ================= STATES ================= */
  if (loading) {
    return <p className="text-gray-500">Inapakua mafunzo...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Mafunzo kwa Vijana
        </h1>
        <p className="text-gray-500 text-sm">
          Angalia mafunzo yaliyotangazwa na Halmashauri au taasisi
          mbalimbali
        </p>
      </div>

      {/* INFO NOTE */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex gap-3">
        <Info className="text-blue-600 mt-1" size={20} />
        <p className="text-sm text-blue-700">
          Mfumo huu hautumii maombi ya mafunzo. Tafadhali fuata
          maelekezo yaliyoainishwa kwenye kila mafunzo.
        </p>
      </div>

      {/* EMPTY STATE */}
      {trainings.length === 0 && (
        <p className="text-gray-500">
          Hakuna mafunzo yaliyotangazwa kwa sasa.
        </p>
      )}

      {/* TRAININGS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainings.map((training) => (
          <TrainingCard key={training.id} training={training} />
        ))}
      </div>
    </div>
  );
}

/* ================= CARD COMPONENT ================= */

function TrainingCard({ training }: { training: Training }) {
const typeConfig = {
  VIDEO: {
    icon: <Video size={16} />,
    label: "Video Training",
    color: "bg-green-100 text-green-700",
  },
  PDF: {
    icon: <FileText size={16} />,
    label: "PDF Guide",
    color: "bg-yellow-100 text-yellow-700",
  },
  ARTICLE: {
    icon: <BookOpen size={16} />,
    label: "Makala / Article",
    color: "bg-blue-100 text-blue-700",
  },
} as const;


  const config = typeConfig[training.type];

  return (
    <div className="bg-white border rounded-xl p-5 space-y-4 hover:shadow-sm transition">
      {/* TYPE BADGE */}
      <span
        className={`inline-flex items-center gap-2 text-xs font-medium px-2 py-1 rounded-full ${config.color}`}
      >
        {config.icon}
        {config.label}
      </span>

      {/* TITLE */}
      <h3 className="font-semibold text-gray-800">
        {training.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-600 line-clamp-3">
        {training.description}
      </p>

      {/* FOOTER */}
      <div className="flex items-center justify-between pt-3 border-t">
        <a
          href={training.resourceUrl}
          target="_blank"
          className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
        >
          Maelekezo ya Kushiriki
          <ExternalLink size={14} />
        </a>

        <span className="text-xs text-gray-400">
          Soma zaidi
        </span>
      </div>
    </div>
  );
}
