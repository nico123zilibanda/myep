"use client";

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

  // delete confirmation
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

  /* ================= FILTER + PAGINATION ================= */
  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
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
        `/api/admin/categories/${deleteTarget.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const json = await res.json();

      if (!res.ok) {
        showError((json.messageKey as MessageKey) || "ACTION_FAILED");
        return;
      }

      setCategories((prev) =>
        prev.filter((c) => c.id !== deleteTarget.id)
      );

      showSuccess("CATEGORY_DELETE_SUCCESS");
      setDeleteTarget(null);
    } catch (error) {
      console.error("Delete error:", error);
      showError("ACTION_FAILED");
    } finally {
      setDeleting(false);
    }
  };

  /* ================= CREATE ================= */
  const handleSubmit = async (form: {
    name: string;
    description?: string;
  }) => {
    if (editing) {
      await handleEdit(editing.id, form.name, form.description);
      return;
    }

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok) {
        showError((json.messageKey as MessageKey) || "ACTION_FAILED");
        return;
      }

      setCategories((prev) => [json.data, ...prev]);
      setOpen(false);
      showSuccess("CATEGORY_CREATE_SUCCESS");
    } catch (error) {
      console.error("Create error:", error);
      showError("ACTION_FAILED");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = async (
    id: number,
    name: string,
    description?: string
  ) => {
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, description }),
      });

      const json = await res.json();

      if (!res.ok) {
        showError((json.messageKey as MessageKey) || "ACTION_FAILED");
        return;
      }

      setCategories((prev) =>
        prev.map((c) => (c.id === id ? json.data : c))
      );

      setOpen(false);
      setEditing(null);
      showSuccess("CATEGORY_UPDATE_SUCCESS");
    } catch (error) {
      console.error("PATCH error:", error);
      showError("ACTION_FAILED");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Kategoria
        </h1>
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-shadow shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          + Ongeza Kategori
        </button>
      </div>

      {/* CREATE / EDIT MODAL */}
      <Modal
        key={editing ? editing.id : "new"}
        title={editing ? "Hariri Kategori" : "Ongeza Kategori"}
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        size="sm"
      >
        <CategoryForm
          initialData={editing || undefined}
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
            Je, una uhakika unataka kufuta category{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              "{deleteTarget?.name}"
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

      {/* Search */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-800">
        <TableSearch value={search} onChange={setSearch} />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 overflow-x-auto">
        <DataTable>
          <TableHeader columns={["Jina", "Maelezo", "Actions"]} />

          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
                  <td colSpan={3} className="px-4 py-6">
                    <Skeleton className="h-4 w-full rounded" />
                  </td>
                </TableRow>
              ))
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <td
                  colSpan={3}
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  Hakuna category
                </td>
              </TableRow>
            ) : (
              paginatedData.map((cat) => (
                <TableRow
                  key={cat.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-4 font-medium">
                    {cat.name}
                  </td>
                  <td className="px-4 py-4 text-gray-600 dark:text-gray-300">
                    {cat.description || "-"}
                  </td>
                  <td className="px-4 py-4">
                    <ActionButtons
                      onEdit={() => {
                        setEditing(cat);
                        setOpen(true);
                      }}
                      onDelete={() => setDeleteTarget(cat)}
                    />

                  </td>
                </TableRow>
              ))
            )}
          </tbody>
        </DataTable>
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
