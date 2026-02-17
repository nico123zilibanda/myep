"use client";

import { CategoryInput } from "@/lib/validators/category";
import { useEffect, useState } from "react";

import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import ActionButtons from "@/components/table/ActionButtons";
import Modal from "@/components/ui/Modal";
import CategoryForm from "@/components/forms/CategoryForm";
import { Skeleton } from "@/components/ui/Skeleton";

import { showSuccess, showError } from "@/lib/toast";
import type { MessageKey } from "@/lib/messages";

/* ================= TYPES ================= */

interface Category {
  id: number;
  name: string;
  description?: string | null;
}

/* ================= PAGE ================= */

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/categories", {
        credentials: "include",
        cache: "no-store",
      });

      const json = await res.json();

      if (!res.ok) {
        showError((json.messageKey as MessageKey) || "ACTION_FAILED");
        return;
      }

      setCategories(json.data || []);
    } catch (error) {
      console.error("Fetch categories error:", error);
      showError("SERVER_ERROR");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= ENSURE EDIT DATA BEFORE MODAL ================= */

  useEffect(() => {
    if (editing) setOpen(true);
  }, [editing]);

  /* ================= FILTER + PAGINATION ================= */

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const perPage = 5;
  const totalPages = Math.ceil(filtered.length / perPage);

  const paginatedData = filtered.slice((page - 1) * perPage, page * perPage);

  /* ================= DELETE ================= */

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);

      const res = await fetch(`/api/admin/categories/${deleteTarget.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const json = await res.json();

      if (!res.ok) {
        showError((json.messageKey as MessageKey) || "ACTION_FAILED");
        return;
      }

      setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));

      showSuccess("CATEGORY_DELETE_SUCCESS");
      setDeleteTarget(null);
    } catch (error) {
      console.error("Delete error:", error);
      showError("ACTION_FAILED");
    } finally {
      setDeleting(false);
    }
  };

  /* ================= CREATE / UPDATE ================= */

  const handleSubmit = async (form: CategoryInput) => {
    try {
      const url = editing
        ? `/api/admin/categories/${editing.id}`
        : "/api/admin/categories";

      const method = editing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const json = await res.json();

      // 🔥 IMPORTANT PART — field validation
      if (!res.ok) {
        if (json.errors) {
          // RHF itazipokea (Step 2)
          throw { fieldErrors: json.errors };
        }

        showError((json.messageKey as MessageKey) || "ACTION_FAILED");
        return;
      }

      showSuccess(
        editing ? "CATEGORY_UPDATE_SUCCESS" : "CATEGORY_CREATE_SUCCESS"
      );

      setOpen(false);
      setEditing(null);

      await fetchCategories();
    } catch (err: any) {
      console.error("Save category error:", err);

      // pass field errors to form
      if (err?.fieldErrors) {
        throw err;
      }

      showError("ACTION_FAILED");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* HEADER */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-(--text-primary)">Kategoria</h1>

        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-300 px-5 py-2 text-sm font-medium"
        >
          + Ongeza Kategori
        </button>
      </div>

      {/* FORM MODAL */}

      <Modal
        title={editing ? "Hariri Kategori" : "Ongeza Kategori"}
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        size="sm"
      >
        <CategoryForm
          initialData={editing ?? undefined}
          onSubmit={handleSubmit}
        />
      </Modal>

      {/* DELETE MODAL */}

      <Modal
        open={!!deleteTarget}
        onClose={() => !deleting && setDeleteTarget(null)}
        title="Thibitisha Kufuta"
        size="sm"
      >
        <div className="space-y-4">
          <p>
            Je, unataka kufuta <b>{deleteTarget?.name}</b> ?
          </p>

          <div className="flex justify-end gap-3">
            <button onClick={() => setDeleteTarget(null)}>Ghairi</button>

            <button onClick={confirmDelete}>
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
          <TableHeader columns={["Jina", "Maelezo", "Actions"]} />

          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
                  <td colSpan={5} className="px-4 py-6">
                    <Skeleton className="h-4 w-full rounded" />
                  </td>
                </TableRow>
              ))
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <td colSpan={3} className="px-4 py-10 text-center opacity-70">
                  Hakuna category
                </td>
              </TableRow>
            ) : (
              paginatedData.map((cat) => (
                <TableRow key={cat.id}>
                  <td className="px-4 py-4">
                    {cat.name}
                    </td>
                  <td className="px-4 py-4">
                    {cat.description || "-"}
                    </td>
                  <td>
                    <ActionButtons
                      onEdit={() => setEditing(cat)}
                      onDelete={() => setDeleteTarget(cat)}
                    />
                  </td>
                </TableRow>
              ))
            )}
          </tbody>
        </DataTable>
      </div>

      {/* PAGINATION */}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
