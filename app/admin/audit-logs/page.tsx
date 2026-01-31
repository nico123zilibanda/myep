"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import { Skeleton } from "@/components/ui/Skeleton";

/* ================= TYPES ================= */
interface AuditLog {
  fullName: string;
  id: number;
  action: string;
  entity: string;
  description?: string | null;
  ipAddress?: string | null;
  createdAt: string;
    User?: {
    id: number;
    fullName: string;
    email: string;
  } | null;
}

/* ================= PAGE ================= */
export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/audit-logs", {
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to load audit logs");
      }

      const result = await res.json();
      setLogs(result.data || []);
    } catch (error: any) {
      console.error("Fetch audit logs error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  /* ================= FILTER + PAGINATION ================= */
  const filtered = logs.filter(
    (log) =>
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.entity.toLowerCase().includes(search.toLowerCase()) ||
      (log.description ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const perPage = 8;
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginatedData = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  /* ================= UI ================= */
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Audit Logs
        </h1>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-800">
        <TableSearch value={search} onChange={setSearch} />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 overflow-x-auto transition-all duration-200">
        <DataTable>
          <TableHeader
            columns={[
              "Action",
              "Entity",
              "Description",
              "User",
              "IP Address",
              "Date",
            ]}
          />

          <tbody>
            {loading ? (
              Array.from({ length: perPage }).map((_, idx) => (
                <TableRow key={idx}>
                  <td colSpan={6} className="px-4 py-6">
                    <Skeleton className="h-4 w-full rounded" />
                  </td>
                </TableRow>
              ))
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  Hakuna audit logs
                </td>
              </TableRow>
            ) : (
              paginatedData.map((log) => (
                <TableRow
                  key={log.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-4 py-4 font-medium text-blue-600 dark:text-blue-400">
                    {log.action}
                  </td>
                  <td className="px-4 py-4 text-gray-700 dark:text-gray-300">
                    {log.entity}
                  </td>
                  <td className="px-4 py-4 text-gray-600 dark:text-gray-300 truncate max-w-xs">
                    {log.description || "-"}
                  </td>
                  <td className="px-4 py-4 text-gray-700 dark:text-gray-300">
                     {log.User?.fullName ?? "-"}
                  </td>
                  <td className="px-4 py-4 text-gray-500 dark:text-gray-400">
                    {log.ipAddress ?? "-"}
                  </td>
                  <td className="px-4 py-4 text-gray-500 dark:text-gray-400">
                    {new Date(log.createdAt).toLocaleString()}
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
