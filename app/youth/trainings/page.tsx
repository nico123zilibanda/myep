"use client";

import { useEffect, useState } from "react";
import { BookOpen, Video, FileText, Info, ExternalLink, Search } from "lucide-react";
import Modal from "@/components/ui/Modal"; // modal component yako

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

  // ✅ VIDEO MODAL STATE
  const [viewingVideo, setViewingVideo] = useState<Training | null>(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const res = await fetch("/api/youth/trainings");
        if (!res.ok) throw new Error("Imeshindikana kupakua mafunzo");
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

  /* ================= FILTER ================= */
  const filteredTrainings = trainings.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.type.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= VIEW HANDLER ================= */
  const handleView = (training: Training) => {
    if (training.type === "VIDEO") {
      setViewingVideo(training); // open modal
    } else {
      window.open(training.resourceUrl, "_blank"); // PDF or ARTICLE
    }
  };

  /* ================= UI ================= */
  if (loading) return <p className="text-gray-500 text-center mt-20">Inapakua mafunzo...</p>;
  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Mafunzo kwa Vijana</h1>
        <p className="text-gray-500">Angalia mafunzo yaliyotangazwa na Halmashauri au taasisi mbalimbali</p>
      </div>

      {/* INFO NOTE */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
        <Info className="text-blue-600 mt-1" size={20} />
        <p className="text-sm text-blue-700">
          Mfumo huu hautumii maombi ya mafunzo. Tafadhali fuata maelekezo yaliyoainishwa kwenye kila mafunzo.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center max-w-md w-full relative">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Tafuta mafunzo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      {/* EMPTY STATE */}
      {filteredTrainings.length === 0 && (
        <p className="text-gray-500 text-center mt-10">Hakuna mafunzo yaliyotangazwa kwa sasa.</p>
      )}

      {/* TRAININGS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrainings.map((training) => (
          <TrainingCard key={training.id} training={training} onView={() => handleView(training)} />
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

/* ================= CARD COMPONENT ================= */
function TrainingCard({ training, onView }: { training: Training; onView: () => void }) {
  const typeConfig = {
    VIDEO: { icon: <Video size={16} />, label: "Video Training", color: "bg-green-100 text-green-700" },
    PDF: { icon: <FileText size={16} />, label: "PDF Guide", color: "bg-yellow-100 text-yellow-700" },
    ARTICLE: { icon: <BookOpen size={16} />, label: "Makala / Article", color: "bg-blue-100 text-blue-700" },
  } as const;

  const config = typeConfig[training.type];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition shadow-sm">
      <span className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full ${config.color}`}>
        {config.icon}
        {config.label}
      </span>

      <h3 className="mt-4 text-lg font-semibold text-gray-900 line-clamp-2">{training.title}</h3>
      <p className="mt-2 text-sm text-gray-600 line-clamp-4">{training.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={onView}
          className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
        >
          {training.type === "VIDEO" ? "Angalia Video" : "Angalia Maelekezo"}
          <ExternalLink size={14} />
        </button>
        <span className="text-xs text-gray-400">Soma zaidi</span>
      </div>
    </div>
  );
}
