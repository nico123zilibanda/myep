"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import { TableRow } from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import CategoryActions from "@/components/table/CategoryActions";
import Modal from "@/components/ui/Modal";

export default function YouthPage() {
  const [youth, setYouth] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [viewing, setViewing] = useState<any>(null);

  /* ================= FETCH ================= */
  const fetchYouth = async () => {
    try {
      const res = await fetch("/api/admin/youth");
      const data = await res.json();
      setYouth(data);
    } catch (error) {
      console.error("Failed to load youth");
    }
  };

  useEffect(() => {
    fetchYouth();
  }, []);

  /* ================= FILTER ================= */
  const filtered = youth.filter(
    (v) =>
      v.fullName.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= PAGINATION ================= */
  const perPage = 5;
  const totalPages = Math.ceil(filtered.length / perPage);
  const data = filtered.slice((page - 1) * perPage, page * perPage);

  /* ================= ACTIONS ================= */
  const toggleStatus = async (id: number, isActive: boolean) => {
    await fetch(`/api/admin/youth/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !isActive }),
    });

    fetchYouth();
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Una uhakika unataka kufuta account ya ${name}?`)) return;

    await fetch(`/api/admin/youth/${id}`, { method: "DELETE" });
    setYouth((prev) => prev.filter((v) => v.id !== id));
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
            className="px-3 py-2 text-sm bg-blue-500 rounded hover:bg-blue-600"
          >
            Export CSV
          </a>

          <a
            href="/api/admin/youth/export/excel"
            className="px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
          >
            Export Excel
          </a>

          <a
            href="/api/admin/youth/export/pdf"
            className="px-3 py-2 text-sm bg-cyan-300 text-white rounded hover:bg-cyan-400"
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
          {data.map((v) => (
            <TableRow key={v.id}>
              <td className="px-4 py-3">{v.fullName}</td>
              <td className="px-4 py-3">{v.email}</td>
              <td className="px-4 py-3">{v.phone || "-"}</td>
              <td className="px-4 py-3">{v.educationLevel || "-"}</td>
              <td className="px-4 py-3">
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
              <td className="px-4 py-3">
                {new Date(v.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <CategoryActions
                  onView={() => setViewing(v)} // ✅ Show modal
                  onEdit={() => toggleStatus(v.id, v.isActive)}
                  onDelete={() => handleDelete(v.id, v.fullName)}
                />
              </td>
            </TableRow>
          ))}
        </tbody>
      </DataTable>

      {/* ===== PAGINATION ===== */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* ===== VIEW MODAL ===== */}
      <Modal
        title="Wasifu wa Kijana"
        open={!!viewing}
        onClose={() => setViewing(null)}
      >
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-gray-500">Jina Kamili</p>
            <p className="font-medium">{viewing?.fullName}</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p>{viewing?.email}</p>
          </div>

          <div>
            <p className="text-gray-500">Simu</p>
            <p>{viewing?.phone || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">Kiwango cha Elimu</p>
            <p>{viewing?.educationLevel || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">Jinsia</p>
            <p>{viewing?.gender || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">Tarehe ya Kuzaliwa</p>
            <p>
              {viewing?.dateOfBirth
                ? new Date(viewing.dateOfBirth).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <span
              className={`inline-block px-2 py-1 rounded text-xs ${
                viewing?.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {viewing?.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div>
            <p className="text-gray-500">Amejiunga Tarehe</p>
            <p>{new Date(viewing?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
