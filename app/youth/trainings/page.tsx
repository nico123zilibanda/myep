"use client";

import { useEffect, useState } from "react";
import { BookOpen, Video, FileText, Info, ExternalLink, Search } from "lucide-react";
import Modal from "@/components/ui/Modal";

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
  const [search, setSearch] = useState("");
  const [viewingVideo, setViewingVideo] = useState<Training | null>(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const res = await fetch("/api/youth/trainings");
        if (!res.ok) throw new Error("Imeshindikana kupakia mafunzo");
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

  const filteredTrainings = trainings.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (training: Training) => {
    if (training.type === "VIDEO") {
      setViewingVideo(training);
    } else {
      window.open(training.resourceUrl, "_blank");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-1/4 bg-black/10 rounded" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 card border-default rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center opacity-70 mt-20">{error}</p>;
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Mafunzo kwa Vijana</h1>
        <p className="opacity-70">
          Angalia mafunzo yaliyotangazwa na Halmashauri au taasisi mbalimbali
        </p>
      </div>

      {/* INFO */}
      <div className="card border-default rounded-xl p-4 flex gap-3 items-start">
        <Info className="mt-1 opacity-70" size={20} />
        <p className="text-sm opacity-70">
          Mfumo huu hautumii maombi ya mafunzo. Tafadhali fuata maelekezo yaliyoainishwa kwenye kila mafunzo.
        </p>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 opacity-50" size={16} />
        <input
          type="text"
          placeholder="Tafuta mafunzo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full pl-10 pr-4 py-2 rounded-lg
            card border-default
            focus:ring-(--btn-focus)
            outline-none
            text-sm
          "
        />
      </div>

      {/* EMPTY */}
      {filteredTrainings.length === 0 && (
        <p className="text-center opacity-70 mt-10">
          Hakuna mafunzo yaliyotangazwa kwa sasa.
        </p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrainings.map((training) => (
          <TrainingCard
            key={training.id}
            training={training}
            onView={() => handleView(training)}
          />
        ))}
      </div>

      {/* VIDEO MODAL */}
      <Modal
        title={viewingVideo?.title || ""}
        open={!!viewingVideo}
        onClose={() => setViewingVideo(null)}
      >
        {viewingVideo && (
          <video
            src={viewingVideo.resourceUrl}
            controls
            className="w-full rounded-lg"
          />
        )}
      </Modal>
    </div>
  );
}

/* ================= CARD ================= */
function TrainingCard({
  training,
  onView,
}: {
  training: Training;
  onView: () => void;
}) {
  const typeMap = {
    VIDEO: { icon: <Video size={16} />, label: "Video" },
    PDF: { icon: <FileText size={16} />, label: "PDF" },
    ARTICLE: { icon: <BookOpen size={16} />, label: "Article" },
  } as const;

  const config = typeMap[training.type];

  return (
    <div className="card border-default rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition">
      <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-black/5">
        {config.icon}
        {config.label}
      </span>

      <h3 className="mt-4 text-lg font-semibold line-clamp-2">
        {training.title}
      </h3>

      <p className="mt-2 text-sm opacity-70 line-clamp-4">
        {training.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={onView}
          className="flex items-center gap-1 text-sm font-medium opacity-70 hover:opacity-100"
        >
          {training.type === "VIDEO" ? "Angalia Video" : "Angalia Maelekezo"}
          <ExternalLink size={14} />
        </button>

        <span className="text-xs opacity-50">Soma zaidi</span>
      </div>
    </div>
  );
}
