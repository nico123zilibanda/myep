"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import Modal from "@/components/ui/Modal";
import OpportunityForm from "@/components/forms/OpportunityForm";
import ActionButtons from "@/components/table/ActionButtons";
import { showSuccess, showError } from "@/lib/toast";
import type { MessageKey } from "@/lib/messages";

/* ================= TYPES ================= */
interface Category {
  id: number;
  name: string;
}

interface Opportunity {
  id: number;
  title: string;
  description?: string;
  requirements?: string;
  howToApply?: string;
  deadline: string;
  location?: string;
  attachmentUrl?: string;
  status: string;
  categoryId: number | null;
  Category?: { id: number; name: string };
}

interface ApiResponse<T = any> {
  success: boolean;
  messageKey: MessageKey;
  data?: T;
}

/* ================= SKELETON ================= */
function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i}>
          <td colSpan={4} className="px-4 py-4">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </td>
        </TableRow>
      ))}
    </>
  );
}

/* ================= PAGE ================= */
export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Opportunity | null>(null);

  // delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<Opportunity | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH OPPORTUNITIES ================= */
  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/opportunities", {
        credentials: "include",
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        showError(data.messageKey ?? "SERVER_ERROR");
        return;
      }

      setOpportunities(data);
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH CATEGORIES ================= */
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories", {
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        showError(result.messageKey ?? "SERVER_ERROR");
        return;
      }

      setCategories(result.data || []);
    } catch {
      showError("SERVER_ERROR");
    }
  };

  useEffect(() => {
    fetchOpportunities();
    fetchCategories();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  /* ================= FILTER + PAGINATION ================= */
  const filtered = opportunities.filter((o) =>
    o.title.toLowerCase().includes(search.toLowerCase())
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
        `/api/admin/opportunities/${deleteTarget.id}`,
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

      showSuccess(data.messageKey);
      setOpportunities((prev) =>
        prev.filter((o) => o.id !== deleteTarget.id)
      );
      setDeleteTarget(null);
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setDeleting(false);
    }
  };

  /* ================= UPDATE ================= */
  const handleEdit = async (id: number, form: Opportunity) => {
    try {
      const res = await fetch(`/api/admin/opportunities/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        showError(data.messageKey);
        return;
      }

      showSuccess(data.messageKey);
      setOpen(false);
      setEditing(null);
      fetchOpportunities();
    } catch {
      showError("SERVER_ERROR");
    }
  };

  /* ================= CREATE ================= */
  const handleSubmit = async (form: Opportunity) => {
    if (editing) {
      await handleEdit(editing.id, form);
      return;
    }

    try {
      const res = await fetch("/api/admin/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        showError(data.messageKey);
        return;
      }

      showSuccess(data.messageKey);
      setOpen(false);
      fetchOpportunities();
    } catch {
      showError("SERVER_ERROR");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Fursa
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage opportunities zote za mfumo
          </p>
        </div>

        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          + Ongeza Fursa
        </button>
      </div>

      {/* CREATE / EDIT MODAL */}
      <Modal
        title={editing ? "Hariri Opportunity" : "Ongeza Opportunity"}
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
      >
        <OpportunityForm
          categories={categories}
          initialData={editing}
          onSubmit={handleSubmit}
        />
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
            Je, una uhakika unataka kufuta fursa{" "}
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
            columns={["Kichwa", "Tarehe Ya Mwisho", "Kategori", "Actions"]}
          />
          <tbody>
            {loading ? (
              <TableSkeleton rows={perPage} />
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <td colSpan={4} className="px-4 py-10 text-center text-gray-500">
                  Hakuna opportunity iliyopatikana
                </td>
              </TableRow>
            ) : (
              paginatedData.map((o) => (
                <TableRow key={o.id}>
                  <td className="px-4 py-4 font-medium">{o.title}</td>
                  <td className="px-4 py-4">
                    {new Date(o.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    {o.Category?.name || "-"}
                  </td>
                  <td className="px-4 py-4">
                    <ActionButtons
                      status={o.status}
                      onEdit={() => {
                        setEditing(o);
                        setOpen(true);
                      }}
                      onDelete={() => setDeleteTarget(o)}
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
    </div>
  );
}
