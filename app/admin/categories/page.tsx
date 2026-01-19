"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import CategoryActions from "@/components/table/CategoryActions";
import Modal from "@/components/ui/Modal";
import CategoryForm from "@/components/forms/CategoryForm";
import { Skeleton } from "@/components/ui/Skeleton";
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
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to load categories");
      }
      const data: Category[] = await res.json();
      setCategories(data);
    } catch (error: any) {
      console.error("Fetch categories error:", error);
      alert(error.message);
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

  /* ================= DELETE ================= */
  const handleDelete = async (id: number, name: string) => {
    if (!Number.isInteger(id)) {
      alert("Invalid category ID");
      return;
    }
    if (!confirm(`Una hakika unataka kufuta category: "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.message || "Imeshindikana kufuta category");
        return;
      }
      setCategories((prev) => prev.filter((c) => c.id !== id));
      alert(`Category "${name}" imefutwa kwa mafanikio`);
    } catch (error) {
      console.error("Delete error:", error);
      alert("Imeshindikana kufuta category");
    }
  };

  /* ================= EDIT / UPDATE ================= */
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
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to update category");
        return;
      }
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? data : c))
      );
      setOpen(false);
      setEditing(null);
    } catch (error) {
      console.error("PATCH error:", error);
      alert("Something went wrong");
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
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Imeshindikana ku-save category");
      }
      setCategories((prev) => [data, ...prev]);
      setOpen(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Categories
        </h1>
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-shadow shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          + Ongeza Category
        </button>
      </div>

      {/* Modal */}
      <Modal
        key={editing ? editing.id : "new"}
        title={editing ? "Hariri Category" : "Ongeza Category"}
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        size="sm"
      >
        <CategoryForm initialData={editing || undefined} onSubmit={handleSubmit} />
      </Modal>

      {/* Search */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-800">
        <TableSearch value={search} onChange={setSearch} />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 overflow-x-auto transition-all duration-200">
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
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-4 py-4 font-medium text-gray-800 dark:text-gray-100 truncate">
                    {cat.name}
                  </td>
                  <td className="px-4 py-4 text-gray-600 dark:text-gray-300 truncate">
                    {cat.description || "-"}
                  </td>
                  <td className="px-4 py-4">
                    <CategoryActions
                      onEdit={() => {
                        setEditing(cat);
                        setOpen(true);
                      }}
                      onDelete={() => handleDelete(cat.id, cat.name)}
                    />
                  </td>
                </TableRow>
              ))
            )}
          </tbody>
        </DataTable>
      </div>

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
