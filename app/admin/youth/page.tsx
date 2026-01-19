"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import CategoryActions from "@/components/table/CategoryActions";
import Modal from "@/components/ui/Modal";

/* ================= TYPES ================= */
interface Youth {
  id: string;
  fullName?: string;
  email?: string | null;
  phone?: string | null;
  educationLevel?: string | null;
  gender?: string | null;
  dateOfBirth?: string | null;
  isActive: boolean;
  createdAt?: string | null;
}

/* ================= SKELETON ================= */
function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i}>
          <td colSpan={7} className="px-4 py-4">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </td>
        </TableRow>
      ))}
    </>
  );
}

/* ================= PAGE ================= */
export default function YouthPage() {
  const [youth, setYouth] = useState<Youth[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [viewing, setViewing] = useState<Youth | null>(null);

  /* ================= FETCH ================= */
  const fetchYouth = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/youth", {
        credentials: "include",
        cache: "no-store",
      });

      const data = await res.json();
      if (Array.isArray(data)) setYouth(data);
      else setYouth([]);
    } catch (err) {
      console.error("Failed to load youth:", err);
      setYouth([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYouth();
  }, []);

  /* Reset page on search */
  useEffect(() => {
    setPage(1);
  }, [search]);

  /* ================= FILTER ================= */
  const filtered = youth.filter(
    (v) =>
      (v.fullName ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (v.email ?? "").toLowerCase().includes(search.toLowerCase())
  );

  /* ================= PAGINATION ================= */
  const perPage = 5;
  const totalPages = Math.ceil(filtered.length / perPage);

  const paginatedData = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  /* ================= ACTIONS ================= */
  const toggleStatus = async (id: string, isActive: boolean) => {
    try {
      await fetch(`/api/admin/youth/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
        credentials: "include",
      });
      fetchYouth();
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const handleDelete = async (id: string, name?: string) => {
    if (!confirm(`Una uhakika unataka kufuta account ya ${name ?? "kijana"}?`))
      return;

    try {
      await fetch(`/api/admin/youth/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setYouth((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      console.error("Failed to delete youth:", err);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Vijana
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Orodha ya vijana waliojisajili kwenye mfumo
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href="/api/admin/youth/export/csv"
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition"
          >
            Export CSV
          </a>
          <a
            href="/api/admin/youth/export/excel"
            className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm transition"
          >
            Export Excel
          </a>
          <a
            href="/api/admin/youth/export/pdf"
            className="px-3 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm transition"
          >
            Export PDF
          </a>
        </div>
      </div>

      {/* SEARCH (DARK MODE FIXED) */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-800">
        <TableSearch value={search} onChange={setSearch} />
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 overflow-x-auto">
        <DataTable>
          <TableHeader
            columns={[
              "Jina",
              "Email",
              "Simu",
              "Elimu",
              "Status",
              "Tarehe",
              "Actions",
            ]}
          />

          <tbody>
            {loading ? (
              <TableSkeleton rows={perPage} />
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-gray-500 dark:text-gray-400"
                >
                  Hakuna vijana waliopatikana
                </td>
              </TableRow>
            ) : (
              paginatedData.map((v) => (
                <TableRow key={v.id}>
                  <td className="px-4 py-4 font-medium text-gray-800 dark:text-gray-100">
                    {v.fullName ?? "-"}
                  </td>
                  <td className="px-4 py-4 text-gray-600 dark:text-gray-300">
                    {v.email ?? "-"}
                  </td>
                  <td className="px-4 py-4 text-gray-600 dark:text-gray-300">
                    {v.phone ?? "-"}
                  </td>
                  <td className="px-4 py-4 text-gray-600 dark:text-gray-300">
                    {v.educationLevel ?? "-"}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                        ${
                          v.isActive
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                        }`}
                    >
                      {v.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-600 dark:text-gray-300">
                    {v.createdAt
                      ? new Date(v.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-4">
                    <CategoryActions
                      onView={() => setViewing(v)}
                      onEdit={() => toggleStatus(v.id, v.isActive)}
                      onDelete={() => handleDelete(v.id, v.fullName)}
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

      {/* VIEW MODAL */}
      <Modal
        title="Wasifu wa Kijana"
        open={!!viewing}
        onClose={() => setViewing(null)}
        size="md"
      >
        {viewing && (
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <p><strong>Jina:</strong> {viewing.fullName ?? "-"}</p>
            <p><strong>Email:</strong> {viewing.email ?? "-"}</p>
            <p><strong>Simu:</strong> {viewing.phone ?? "-"}</p>
            <p><strong>Elimu:</strong> {viewing.educationLevel ?? "-"}</p>
            <p><strong>Jinsia:</strong> {viewing.gender ?? "-"}</p>
            <p>
              <strong>Tarehe ya Kuzaliwa:</strong>{" "}
              {viewing.dateOfBirth
                ? new Date(viewing.dateOfBirth).toLocaleDateString()
                : "-"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {viewing.isActive ? "Active" : "Inactive"}
            </p>
            <p>
              <strong>Amejiunga:</strong>{" "}
              {viewing.createdAt
                ? new Date(viewing.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
