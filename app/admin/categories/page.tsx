"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow  from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import CategoryActions from "@/components/table/CategoryActions";
import Modal from "@/components/ui/Modal";
import CategoryForm from "@/components/forms/CategoryForm";

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
    if (!Number.isInteger(id)) {
      alert("Invalid category ID");
      return;
    }

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

      // update local state immediately (no extra fetch)
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? data : c))
      );

      alert("Category updated successfully");
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
    // EDIT MODE
    if (editing) {
      await handleEdit(editing.id, form.name, form.description);
      return;
    }

    // CREATE MODE
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Categories</h1>

        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Ongeza Category
        </button>
      </div>

      <Modal
        title={editing ? "Hariri Category" : "Ongeza Category"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <CategoryForm initialData={editing} onSubmit={handleSubmit} />
      </Modal>

      <TableSearch value={search} onChange={setSearch} />

      <DataTable>
        <TableHeader columns={["Jina", "Maelezo", "Actions"]} />

        <tbody>
          {loading ? (
            <TableRow>
              <td colSpan={3} className="px-4 py-6 text-center">
                Inapakia...
              </td>
            </TableRow>
          ) : paginatedData.length === 0 ? (
            <TableRow>
              <td colSpan={3} className="px-4 py-6 text-center">
                Hakuna category
              </td>
            </TableRow>
          ) : (
            paginatedData.map((cat) => (
              <TableRow key={cat.id}>
                <td className="px-4 py-3 font-medium">{cat.name}</td>
                <td className="px-4 py-3">{cat.description || "-"}</td>
                <td className="px-4 py-3">
                  <CategoryActions
                    onEdit={() => {
                      setEditing(cat); // ✅ ID remains number
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

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
