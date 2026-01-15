"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import Pagination from "@/components/table/Pagination";
import Modal from "@/components/ui/Modal";
import TrainingsForm from "@/components/forms/TrainingsForm";
import CategoryActions from "@/components/table/CategoryActions";
import TableSearch from "@/components/table/TableSearch";

/* ================= TYPES ================= */
interface Training {
  id: number;
  title: string;
  description: string;
  type: "ARTICLE" | "VIDEO" | "PDF";
  resourceUrl: string;
}

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Training | null>(null);
  const [viewing, setViewing] = useState<Training | null>(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  /* ================= FETCH ================= */
  const fetchTrainings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/trainings", {
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();
      setTrainings(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  /* ================= FILTER + PAGINATION ================= */
  const filtered = trainings.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.type.toLowerCase().includes(search.toLowerCase())
  );

  const perPage = 5;
  const totalPages = Math.ceil(filtered.length / perPage);
  const data = filtered.slice((page - 1) * perPage, page * perPage);

  /* ================= ACTIONS ================= */
  const handleDelete = async (id: number) => {
    if (!confirm("Una uhakika unataka kufuta training?")) return;

    const res = await fetch(`/api/admin/trainings/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      setTrainings(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleSubmit = async (formData: FormData) => {
    if (editing) {
      await fetch(`/api/admin/trainings/${editing.id}`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });
    } else {
      await fetch("/api/admin/trainings", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
    }

    setOpen(false);
    setEditing(null);
    fetchTrainings();
  };

  /* ================= VIEW HANDLER (FIXED) ================= */
const handleView = (training: Training) => {
  if (training.type === "ARTICLE" || training.type === "PDF") {
    window.open(training.resourceUrl, "_blank");
    return;
  }

  if (training.type === "VIDEO") {
    setViewing(training);
  }
};


  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Trainings</h1>

        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={16} />
          Ongeza Training
        </button>
      </div>

      {/* CREATE / EDIT MODAL */}
      <Modal
        title={editing ? "Hariri Training" : "Ongeza Training"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <TrainingsForm initialData={editing} onSubmit={handleSubmit} />
      </Modal>

      {/* SEARCH */}
      <TableSearch value={search} onChange={setSearch} />

      {/* TABLE */}
      <DataTable>
        <TableHeader
          columns={["Title", "Type", "Description", "Resource", "Actions"]}
        />

        <tbody>
          {/* LOADING */}
          {loading && (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                Inapakia trainings...
              </td>
            </tr>
          )}

          {/* EMPTY */}
          {!loading && data.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-400">
                Hakuna training iliyopatikana
              </td>
            </tr>
          )}

          {/* DATA */}
          {!loading &&
            data.map(t => (
              <TableRow key={t.id}>
                <td className="px-4 py-3 font-medium">{t.title}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium
                      ${
                        t.type === "ARTICLE"
                          ? "bg-blue-100 text-blue-700"
                          : t.type === "VIDEO"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {t.type}
                  </span>
                </td>

                <td className="px-4 py-3 truncate max-w-xs">
                  {t.description}
                </td>

                {/* VIEW */}
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleView(t)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {t.type === "PDF" ? "Open PDF" : "View"}
                  </button>
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3">
                  <CategoryActions
                    onEdit={() => {
                      setEditing(t);
                      setOpen(true);
                    }}
                    onDelete={() => handleDelete(t.id)}
                  />
                </td>
              </TableRow>
            ))}
        </tbody>
      </DataTable>

      {/* PAGINATION */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* VIDEO MODAL */}
      <Modal
        title={viewing?.title || ""}
        open={!!viewing}
        onClose={() => setViewing(null)}
      >
        {viewing && (
          <video
            src={viewing.resourceUrl}
            controls
            className="w-full rounded-lg"
          />
        )}
      </Modal>
    </div>
  );
}
