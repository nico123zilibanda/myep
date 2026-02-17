"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import { Skeleton } from "@/components/ui/Skeleton";
import Modal from "@/components/ui/Modal";
import ActionButtons from "@/components/table/ActionButtons";
import { showSuccess, showError } from "@/lib/toast";

/* ================= TYPES ================= */
interface User {
  id: string;
  fullName: string;
  email: string;
}

interface AuditLog {
  userAgent: string | null;
  id: string;
  action: string;
  entity: string;
  description?: string | null;
  ipAddress?: string | null;
  createdAt: string;
  User?: User | null;
}

/* ================= PAGE ================= */
export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AuditLog | null>(null);
  const [deleting, setDeleting] = useState(false);

  const perPage = 8;

  /* ================= FETCH ================= */
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/audit-logs", {
        credentials: "include",
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.messageKey || "SERVER_ERROR");
      }

      setLogs(result.data || []);
    } catch (err: any) {
      console.error("Fetch audit logs error:", err);
      showError(err.message || "SERVER_ERROR");
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  /* ================= FILTER + PAGINATION ================= */
  const filtered = logs.filter((log) =>
    [log.action, log.entity, log.description ?? ""]
      .some((field) => field.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginatedData = filtered.slice((page - 1) * perPage, page * perPage);

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);

      const res = await fetch(
        `/api/admin/audit-logs/${deleteTarget.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        showError(data.messageKey || "SERVER_ERROR");
        return;
      }

      showSuccess(data.messageKey);

      setLogs(prev => prev.filter(l => l.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setDeleting(false);
    }
  };

  function getDeviceName(userAgent?: string | null) {
    if (!userAgent) return "-";

    const ua = userAgent.toLowerCase();

    if (ua.includes("windows")) return "Windows";
    if (ua.includes("mac os")) return "Mac Os";
    if (ua.includes("android")) return "Android";
    if (ua.includes("iphone")) return "iPhone";
    if (ua.includes("ipad")) return "iPad";
    if (ua.includes("linux")) return "Linux";

    return "Unknown Device";
  }

  /* ================= UI ================= */
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-(--text-primary)">
          Audit Logs
        </h1>
      </div>

      {/* SEARCH */}
      <div className="card border-default p-4 shadow">
        <TableSearch value={search} onChange={setSearch} />
      </div>
      <Modal
        open={!!deleteTarget}
        onClose={() => { if (!deleting) setDeleteTarget(null); }}
        title="Thibitisha Kufuta"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm opacity-70">
            Una uhakika unataka kufuta audit hii?
          </p>

          <p className="text-xs opacity-70">
            Kitendo hiki hakiwezi kurejeshwa.
          </p>

          <div className="flex justify-end gap-3 pt-4">
            <button
              disabled={deleting}
              onClick={() => setDeleteTarget(null)}
              className="rounded-lg px-4 py-2 text-sm border border-default"
            >
              Ghairi
            </button>

            <button
              onClick={confirmDelete}
              disabled={deleting}
              className="rounded-lg px-4 py-2 text-sm font-medium bg-(--btn-primary) text-(--btn-text)"
            >
              {deleting ? "Inafuta..." : "Ndiyo, Futa"}
            </button>
          </div>
        </div>
      </Modal>

      {/* TABLE */}
      <div className="card border-default overflow-x-auto">
        <DataTable>
          <TableHeader
            columns={["Action", "Entity", "Description", "User", "IP Address", "Mac Address", "Date", "Remove"]}
          />

          <tbody>
            {loading
              ? Array.from({ length: perPage }).map((_, idx) => (
                <TableRow key={idx}>
                  <td colSpan={8} className="px-4 py-6">
                    <Skeleton className="h-4 w-full rounded" />
                  </td>
                </TableRow>
              ))
              : paginatedData.length === 0
                ? (
                  <TableRow>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center opacity-70"
                    >
                      Hakuna audit logs
                    </td>
                  </TableRow>
                )
                : paginatedData.map((log) => (
                  <TableRow
                    key={log.id}
                    className="hover:shadow-sm transition"
                  >
                    <td className="px-4 py-4 font-medium text-(--text-primary)">
                      {log.action}
                    </td>
                    <td className="px-4 py-4 text-(--text-secondary)">
                      {log.entity}
                    </td>
                    <td className="px-4 py-4 opacity-70 truncate max-w-xs">
                      {log.description || "-"}
                    </td>
                    <td className="px-4 py-4 text-(--text-secondary)">
                      {log.User?.fullName ?? "-"}
                    </td>
                    <td className="px-4 py-4 opacity-70">
                      {log.ipAddress ?? "-"}
                    </td>
                    <td className="px-4 py-4 opacity-70">
                      {getDeviceName(log.userAgent)}
                    </td>

                    <td className="px-4 py-4 opacity-70">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      <ActionButtons
                        onDelete={() => setDeleteTarget(log)}
                      />
                    </td>

                  </TableRow>
                ))}
          </tbody>
        </DataTable>

      </div>

      {/* PAGINATION */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
