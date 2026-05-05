"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { Info, Search } from "lucide-react";
import OpportunityCard from "@/components/opportunities/OpportunityCard";
import Modal from "@/components/ui/Modal";

import { Opportunity } from "@/types/opportunity";
/* ================= PAGE ================= */
export default function YouthOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] =
    useState<"ALL" | "OPEN" | "EXPIRED">("ALL");

  const [search, setSearch] = useState("");

  // 🔥 VIDEO MODAL
  const [viewingVideo, setViewingVideo] =
    useState<Opportunity | null>(null);

  /* ================= FETCH ================= */
  const fetchOpportunities = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/youth/opportunities", {
        cache: "no-store",
      });

      const data = await res.json();

      setOpportunities(Array.isArray(data) ? data : []);
    } catch {
      alert("Imeshindikana kupakia fursa");
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOpportunities();
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

      // category
      if (categoryFilter !== "ALL" && op.Category?.name !== categoryFilter)
        return false;

      // status
      if (statusFilter === "OPEN" && isExpired) return false;
      if (statusFilter === "EXPIRED" && !isExpired) return false;

      // search
      if (
        search &&
        !op.title.toLowerCase().includes(search.toLowerCase()) &&
        !op.description.toLowerCase().includes(search.toLowerCase())
      )
        return false;

      return true;
    });
  }, [opportunities, categoryFilter, statusFilter, search]);

  /* ================= RESOURCE HANDLER ================= */
  const handleViewResource = (op: Opportunity) => {
    if (op.resourceType === "VIDEO") {
      setViewingVideo(op);
    } else if (op.resourceUrl) {
      window.open(op.resourceUrl, "_blank");
    }
  };

  /* ================= SAVE ================= */
  const toggleSave = async (id: number, isSaved: boolean) => {
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
      setOpportunities((prev) =>
        prev.map((op) =>
          op.id === id ? { ...op, isSaved } : op
        )
      );
      alert("Imeshindikana kuhifadhi fursa");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">
          Fursa Zilizopo
        </h1>
        <p className="text-sm opacity-70">
          Angalia fursa na resources (video, pdf, link)
        </p>
      </div>

      {/* INFO */}
      <div className="card border-default rounded-xl p-5 flex gap-3">
        <Info size={20} />
        <p className="text-sm opacity-70">
          Mfumo huu hautumiki kuomba fursa. Tumia link/video/pdf zilizowekwa kupata maelezo.
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-wrap gap-4">
        {/* SEARCH */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 opacity-50" size={16} />
          <input
            type="text"
            placeholder="Tafuta fursa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg card border-default text-sm"
          />
        </div>

        {/* CATEGORY */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg px-3 py-2 text-sm card border-default"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "ALL" ? "Makundi Yote" : cat}
            </option>
          ))}
        </select>

        {/* STATUS */}
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value as "ALL" | "OPEN" | "EXPIRED"
            )
          }
          className="rounded-lg px-3 py-2 text-sm card border-default"
        >
          <option value="ALL">Zote</option>
          <option value="OPEN">Wazi</option>
          <option value="EXPIRED">Zimefungwa</option>
        </select>
      </div>

      {/* EMPTY */}
      {!loading && filteredOpportunities.length === 0 && (
        <p className="text-center opacity-70 mt-10">
          Hakuna fursa zilizopatikana
        </p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="card border-default rounded-xl p-5 animate-pulse h-40"
              />
            ))
          : filteredOpportunities.map((op) => (
              <OpportunityCard
                key={op.id}
                opportunity={op}
                onToggleSave={toggleSave}
                onViewResource={handleViewResource}
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
            src={viewingVideo.resourceUrl || ""}
            controls
            className="w-full rounded-lg"
          />
        )}
      </Modal>
    </div>
  );
}