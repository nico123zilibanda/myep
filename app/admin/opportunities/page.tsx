"use client";

import { ReactNode, useEffect, useState } from "react";
import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import Modal from "@/components/ui/Modal";
import OpportunityForm from "@/components/forms/OpportunityForm";
import ActionButtons from "@/components/table/ActionButtons";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAppToast } from "@/lib/toast";
import type { MessageKey } from "@/lib/messages";

/* ================= TYPES ================= */
interface Category {
  id: number;
  name: string;
}

interface Opportunity {
  type: ReactNode;
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
            <div className="h-4 w-full animate-pulse rounded bg-(--skeleton)" />
          </td>
        </TableRow>
      ))}
    </>
  );
}

/* ================= PAGE ================= */
export default function OpportunitiesPage() {
  const { showSuccess, showError } = useAppToast();
  
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Opportunity | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Opportunity | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
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

  /* ================= DELETE ================= */
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

  /* ================= CREATE / UPDATE ================= */
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
          <h1 className="text-xl font-semibold text-(--text-primary)">
            Fursa
          </h1>
          <p className="text-sm opacity-70">
            Manage opportunities zote za mfumo
          </p>
        </div>

        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-(--btn-primary) px-4 py-2 text-sm font-medium text-(--btn-text) hover:shadow-lg transition"
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
        onClose={() => { if (!deleting) setDeleteTarget(null); }}
        title="Thibitisha Kufuta"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm opacity-70">
            Je, una uhakika unataka kufuta fursa: "
            <span className="font-semibold text-(--text-primary)">
              {" "}{deleteTarget?.title}
            </span> "
            ?
          </p>

          <p className="text-xs opacity-70">
            Kitendo hiki hakiwezi kurejeshwa.
          </p>

          <div className="flex justify-end gap-3 pt-4">
            <button
              disabled={deleting}
              onClick={() => setDeleteTarget(null)}
              className="
          rounded-lg px-4 py-2 text-sm
          border border-default
          hover:shadow-sm
          disabled:opacity-50
          transition
        "
            >
              Ghairi
            </button>

            <button
              onClick={confirmDelete}
              disabled={deleting}
              className="
          rounded-lg px-4 py-2 text-sm font-medium
          bg-(--btn-primary) text-(--btn-text)
          hover:shadow-sm
          disabled:opacity-60
          transition
        "
            >
              {deleting ? "Inafuta..." : "Ndiyo, Futa"}
            </button>
          </div>
        </div>
      </Modal>


      {/* SEARCH */}
      <div className="card border-default p-4 shadow">
        <TableSearch value={search} onChange={setSearch} />
      </div>

      {/* TABLE */}
      <div className="card border-default overflow-x-auto">
        <DataTable>
          <TableHeader
            columns={["Kichwa", "Tarehe Ya Mwisho", "Kategori", "Actions"]}
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
                <td colSpan={5} className="px-4 py-10 text-center opacity-70">
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
                    {new Date(t.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    {t.Category?.name}
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
    </div>
  );
}
