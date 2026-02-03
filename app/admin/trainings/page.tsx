"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import Pagination from "@/components/table/Pagination";
import Modal from "@/components/ui/Modal";
import TrainingsForm from "@/components/forms/TrainingsForm";
import ActionButtons from "@/components/table/ActionButtons";
import TableSearch from "@/components/table/TableSearch";
import { Skeleton } from "@/components/ui/Skeleton";
import { showSuccess, showError } from "@/lib/toast";
import type { MessageKey } from "@/lib/messages";

/* ================= TYPES ================= */
interface Training {
  id: number;
  title: string;
  description: string;
  type: "ARTICLE" | "VIDEO" | "PDF";
  resourceUrl: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  messageKey: MessageKey;
  data?: T;
}

/* ================= PAGE ================= */
export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Training | null>(null);
  const [viewing, setViewing] = useState<Training | null>(null);

  // delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<Training | null>(null);
  const [deleting, setDeleting] = useState(false);

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

      if (!res.ok) {
        showError(data.messageKey ?? "SERVER_ERROR");
        return;
      }

      setTrainings(data);
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  /* Reset page on search */
  useEffect(() => {
    setPage(1);
  }, [search]);

  /* ================= FILTER + PAGINATION ================= */
  const filtered = trainings.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.type.toLowerCase().includes(search.toLowerCase())
  );

  const perPage = 5;
  const totalPages = Math.ceil(filtered.length / perPage);

  const paginatedData = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  /* ================= DELETE (CONFIRMED) ================= */
  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);

      const res = await fetch(
        `/api/admin/trainings/${deleteTarget.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        showError(data.messageKey);
        return;
      }

      setTrainings((prev) =>
        prev.filter((t) => t.id !== deleteTarget.id)
      );

      showSuccess(data.messageKey);
      setDeleteTarget(null);
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setDeleting(false);
    }
  };

  /* ================= CREATE / UPDATE ================= */
  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await fetch(
        editing
          ? `/api/admin/trainings/${editing.id}`
          : "/api/admin/trainings",
        {
          method: editing ? "PATCH" : "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        showError(data.messageKey);
        return;
      }

      showSuccess(data.messageKey);
      setOpen(false);
      setEditing(null);
      fetchTrainings();
    } catch {
      showError("SERVER_ERROR");
    }
  };

  /* ================= VIEW ================= */
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
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Mafunzo
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Articles, videos na PDFs za mafunzo
          </p>
        </div>

        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          <Plus size={16} />
          Ongeza Mafunzo
        </button>
      </div>

      {/* CREATE / EDIT MODAL */}
      <Modal
        title={editing ? "Hariri Mafunzo" : "Ongeza Mafunzo"}
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
      >
        <TrainingsForm initialData={editing} onSubmit={handleSubmit} />
      </Modal>

      {/* DELETE CONFIRM MODAL */}
      <Modal
        open={!!deleteTarget}
        onClose={() => {
          if (!deleting) setDeleteTarget(null);
        }}
        title="Thibitisha Kufuta"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Je, una uhakika unataka kufuta mafunzo{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              "{deleteTarget?.title}"
            </span>
            ?
          </p>

          <p className="text-xs text-red-600">
            Kitendo hiki hakiwezi kurejeshwa.
          </p>

          <div className="flex justify-end gap-3 pt-4">
            <button
              disabled={deleting}
              onClick={() => setDeleteTarget(null)}
              className="rounded-lg px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
            >
              Ghairi
            </button>

            <button
              onClick={confirmDelete}
              disabled={deleting}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
            >
              {deleting ? "Inafuta..." : "Ndiyo, Futa"}
            </button>
          </div>
        </div>
      </Modal>

      {/* SEARCH */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-800">
        <TableSearch value={search} onChange={setSearch} />
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 overflow-x-auto">
        <DataTable>
          <TableHeader
            columns={["Kichwa", "Aina", "Maelezo", "Resource", "Actions"]}
          />

          <tbody>
            {loading ? (
              Array.from({ length: perPage }).map((_, i) => (
                <TableRow key={i}>
                  <td colSpan={5} className="px-4 py-6">
                    <Skeleton className="h-4 w-full rounded" />
                  </td>
                </TableRow>
              ))
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-gray-500"
                >
                  Hakuna mafunzo yaliyopatikana
                </td>
              </TableRow>
            ) : (
              paginatedData.map((t) => (
                <TableRow key={t.id}>
                  <td className="px-4 py-4 font-medium">
                    {t.title}
                  </td>

                  <td className="px-4 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800">
                      {t.type}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-gray-600 dark:text-gray-300 truncate max-w-xs">
                    {t.description}
                  </td>

                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleView(t)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {t.type === "PDF" ? "Open PDF" : "View"}
                    </button>
                  </td>

                  <td className="px-4 py-4">
                    <ActionButtons
                      onEdit={() => {
                        setEditing(t);
                        setOpen(true);
                      }}
                      onDelete={() => setDeleteTarget(t)}
                    />
                  </td>
                </TableRow>
              ))
            )}
          </tbody>
        </DataTable>
      </div>

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
        size="lg"
      >
        {viewing && (
          <video
            src={viewing.resourceUrl}
            controls
            className="w-full rounded-xl"
          />
        )}
      </Modal>
    </div>
  );
}
