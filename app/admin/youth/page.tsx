"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import CategoryActions from "@/components/table/CategoryActions";
import Modal from "@/components/ui/Modal";

interface Youth {
  id: string; // Supabase IDs are string
  fullName?: string;
  email?: string | null;
  phone?: string | null;
  educationLevel?: string | null;
  gender?: string | null;
  dateOfBirth?: string | null;
  isActive: boolean;
  createdAt?: string | null;
}

export default function YouthPage() {
  const [youth, setYouth] = useState<Youth[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [viewing, setViewing] = useState<Youth | null>(null);

  /* ================= FETCH YOUTH ================= */
  const fetchYouth = async () => {
    try {
      const res = await fetch("/api/admin/youth");
      const data: Youth[] = await res.json();
      if (Array.isArray(data)) setYouth(data);
      else setYouth([]);
    } catch (err) {
      console.error("Failed to load youth:", err);
      setYouth([]);
    }
  };

  useEffect(() => {
    fetchYouth();
  }, []);

  /* ================= FILTER ================= */
  const filtered = youth.filter((v) =>
    (v.fullName ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (v.email ?? "").toLowerCase().includes(search.toLowerCase())
  );

  /* ================= PAGINATION ================= */
  const perPage = 5;
  const totalPages = Math.ceil(filtered.length / perPage);
  const data = filtered.slice((page - 1) * perPage, page * perPage);

  /* ================= ACTIONS ================= */
  const toggleStatus = async (id: string, isActive: boolean) => {
    try {
      await fetch(`/api/admin/youth/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });
      fetchYouth();
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const handleDelete = async (id: string, name?: string) => {
    if (!confirm(`Una uhakika unataka kufuta account ya ${name ?? "youth"}?`)) return;

    try {
      await fetch(`/api/admin/youth/${id}`, { method: "DELETE" });
      setYouth((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      console.error("Failed to delete youth:", err);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Vijana</h1>
        <div className="flex gap-2">
          <a
            href="/api/admin/youth/export/csv"
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Export CSV
          </a>
          <a
            href="/api/admin/youth/export/excel"
            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Export Excel
          </a>
          <a
            href="/api/admin/youth/export/pdf"
            className="px-3 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
          >
            Export PDF
          </a>
        </div>
      </div>

      {/* ===== SEARCH ===== */}
      <TableSearch value={search} onChange={setSearch} />

      {/* ===== TABLE ===== */}
      <DataTable>
        <TableHeader
          columns={["Jina", "Email", "Simu", "Elimu", "Status", "Tarehe", "Actions"]}
        />
        <tbody>
          {data.map((v) => (
            <TableRow key={v.id}>
              <td>{v.fullName ?? "-"}</td>
              <td>{v.email ?? "-"}</td>
              <td>{v.phone ?? "-"}</td>
              <td>{v.educationLevel ?? "-"}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    v.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {v.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td>{v.createdAt ? new Date(v.createdAt).toLocaleDateString() : "-"}</td>
              <td>
                <CategoryActions
                  onView={() => setViewing(v)}
                  onEdit={() => toggleStatus(v.id, v.isActive)}
                  onDelete={() => handleDelete(v.id, v.fullName)}
                />
              </td>
            </TableRow>
          ))}
        </tbody>
      </DataTable>

      {/* ===== PAGINATION ===== */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {/* ===== VIEW MODAL ===== */}
      <Modal title="Wasifu wa Kijana" open={!!viewing} onClose={() => setViewing(null)}>
        {viewing && (
          <div className="space-y-4 text-sm">
            <p><strong>Jina:</strong> {viewing.fullName ?? "-"}</p>
            <p><strong>Email:</strong> {viewing.email ?? "-"}</p>
            <p><strong>Simu:</strong> {viewing.phone ?? "-"}</p>
            <p><strong>Elimu:</strong> {viewing.educationLevel ?? "-"}</p>
            <p><strong>Jinsia:</strong> {viewing.gender ?? "-"}</p>
            <p>
              <strong>Tarehe ya Kuzaliwa:</strong>{" "}
              {viewing.dateOfBirth ? new Date(viewing.dateOfBirth).toLocaleDateString() : "-"}
            </p>
            <p><strong>Status:</strong> {viewing.isActive ? "Active" : "Inactive"}</p>
            <p>
              <strong>Amejiunga:</strong>{" "}
              {viewing.createdAt ? new Date(viewing.createdAt).toLocaleDateString() : "-"}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
