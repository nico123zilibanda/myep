"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import { TableRow } from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import CategoryActions from "@/components/table/CategoryActions";
import Modal from "@/components/ui/Modal";
import CategoryForm from "@/components/forms/CategoryForm";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      if (!res.ok) throw new Error("Failed to load categories");
      const data = await res.json();
      setCategories(data);
    } catch (error: any) {
      console.error("Fetch categories error:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const perPage = 5;
  const totalPages = Math.ceil(filtered.length / perPage);
  const data = filtered.slice((page - 1) * perPage, page * perPage);

  // DELETE
  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Una hakika unataka kufuta category: "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Imeshindikana kufuta category");
        return;
      }

      setCategories(prev => prev.filter(c => c.id !== id));
      alert(`Category "${name}" imefutwa kwa mafanikio`);
    } catch (error) {
      console.error("Delete error:", error);
      alert("Imeshindikana kufuta category");
    }
  };

  // EDIT / UPDATE
  const handleEdit = async (id: number, name: string, description?: string) => {
    try {
      const url = `/api/admin/categories/${id}`; // tumia parameter halisi
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update category");
        return;
      }

      alert("Category updated successfully");
      fetchCategories();
      setOpen(false);
      setEditing(null);
    } catch (error) {
      console.error("PATCH error:", error);
      alert("Something went wrong");
    }
  };

  // CREATE / SAVE
  const handleSubmit = async (form: any) => {
    if (editing) {
      // Edit mode
      await handleEdit(editing.id, form.name, form.description);
    } else {
      // Create mode
      try {
        const res = await fetch("/api/admin/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (!res.ok) throw new Error("Imeshindikana ku-save category");

        setOpen(false);
        fetchCategories();
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Categories</h1>
        <button
          onClick={() => { setEditing(null); setOpen(true); }}
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
          {data.map(cat => (
            <TableRow key={cat.id}>
              <td className="px-4 py-3 font-medium">{cat.name}</td>
              <td className="px-4 py-3">{cat.description || "-"}</td>
              <td className="px-4 py-3">
                <CategoryActions
                  onEdit={() => { setEditing(cat); setOpen(true); }}
                  onDelete={() => handleDelete(cat.id, cat.name)}
                />
              </td>
            </TableRow>
          ))}
        </tbody>
      </DataTable>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
