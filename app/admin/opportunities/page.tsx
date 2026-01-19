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
      if (!res.ok) throw new Error("Failed to load opportunities");
      const data: Opportunity[] = await res.json();
      setOpportunities(data);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load categories");
      const data: Category[] = await res.json();
      setCategories(data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchOpportunities();
    fetchCategories();
  }, []);

  /* Reset page on search */
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
  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Una hakika unataka kufuta opportunity: "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/opportunities/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) return alert(result.message);

      setOpportunities((prev) => prev.filter((o) => o.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = async (id: number, form: Opportunity) => {
    try {
      const res = await fetch(`/api/admin/opportunities/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      setOpen(false);
      setEditing(null);
      fetchOpportunities();
    } catch (error) {
      console.error(error);
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

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      setOpen(false);
      fetchOpportunities();
    } catch (error: any) {
      alert(error.message);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Opportunities
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
          className="
            inline-flex items-center justify-center gap-2
            rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium
            text-white hover:bg-blue-700 transition
            focus:outline-none focus:ring-2 focus:ring-blue-500
            w-full sm:w-auto
          "
        >
          + Ongeza Opportunity
        </button>
      </div>

      {/* MODAL */}
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

      {/* SEARCH */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-800">
        <TableSearch value={search} onChange={setSearch} />
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 overflow-x-auto">
        <DataTable>
          <TableHeader columns={["Title", "Deadline", "Category", "Actions"]} />

          <tbody>
            {loading ? (
              <TableSkeleton rows={perPage} />
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-gray-500 dark:text-gray-400"
                >
                  <p className="text-sm">Hakuna opportunity iliyopatikana</p>
                  <p className="text-xs mt-1">
                    Jaribu kubadilisha search au ongeza mpya
                  </p>
                </td>
              </TableRow>
            ) : (
              paginatedData.map((o) => (
                <TableRow key={o.id}>
                  <td className="px-4 py-4 font-medium text-gray-800 dark:text-gray-100">
                    {o.title}
                  </td>
                  <td className="px-4 py-4 text-gray-600 dark:text-gray-300">
                    {new Date(o.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-gray-600 dark:text-gray-300">
                    {o.Category?.name || "-"}
                  </td>
                  <td className="px-4 py-4">
                    <ActionButtons
                      status={o.status}
                      onEdit={() => {
                        setEditing(o);
                        setOpen(true);
                      }}
                      onDelete={() => handleDelete(o.id, o.title)}
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
