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
import { useAppToast } from "@/lib/toast";
import { useDictionary } from "@/lib/i18n/useDictionary";

/* ================= PAGE ================= */
export default function AuditLogsPage() {
  const { showSuccess, showError } = useAppToast();
  const t = useDictionary();

  const [logs, setLogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);

  const perPage = 5;

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
      showError(err.message || "SERVER_ERROR");
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

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

    if (ua.includes("windows")) return t("DEVICE_WINDOWS");
    if (ua.includes("mac os")) return t("DEVICE_MAC");
    if (ua.includes("android")) return t("DEVICE_ANDROID");
    if (ua.includes("iphone")) return t("DEVICE_IPHONE");
    if (ua.includes("ipad")) return t("DEVICE_IPAD");
    if (ua.includes("linux")) return t("DEVICE_LINUX");

    return t("DEVICE_UNKNOWN");
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-(--text-primary)">
        {t("AUDIT_LOGS_TITLE")}
      </h1>

      <div className="card border-default p-4 shadow">
        <TableSearch value={search} onChange={setSearch} />
      </div>

      <Modal
        open={!!deleteTarget}
        onClose={() => { if (!deleting) setDeleteTarget(null); }}
        title={t("CONFIRM_DELETE_TITLE")}
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm opacity-70">
            {t("AUDIT_DELETE_CONFIRM_TEXT")}
          </p>

          <p className="text-xs opacity-70">
            {t("AUDIT_DELETE_WARNING")}
          </p>

          <div className="flex justify-end gap-3 pt-4">
            <button
              disabled={deleting}
              onClick={() => setDeleteTarget(null)}
              className="rounded-lg px-4 py-2 text-sm border border-default"
            >
              {t("CANCEL")}
            </button>

            <button
              onClick={confirmDelete}
              disabled={deleting}
              className="rounded-lg px-4 py-2 text-sm font-medium bg-(--btn-primary) text-(--btn-text)"
            >
              {deleting
                ? t("DELETE_LOADING")
                : t("CONFIRM_DELETE")}
            </button>
          </div>
        </div>
      </Modal>

      <div className="card border-default overflow-x-auto">
        <DataTable>
          <TableHeader
            columns={[
              t("AUDIT_TABLE_ACTION"),
              t("AUDIT_TABLE_ENTITY"),
              t("AUDIT_TABLE_DESCRIPTION"),
              t("AUDIT_TABLE_USER"),
              t("AUDIT_TABLE_IP"),
              t("AUDIT_TABLE_DEVICE"),
              t("AUDIT_TABLE_DATE"),
              t("AUDIT_TABLE_REMOVE"),
            ]}
          />

          <tbody>
            {loading ? (
              Array.from({ length: perPage }).map((_, idx) => (
                <TableRow key={idx}>
                  <td colSpan={8} className="px-4 py-6">
                    <Skeleton className="h-4 w-full rounded" />
                  </td>
                </TableRow>
              ))
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <td colSpan={8} className="px-4 py-8 text-center opacity-70">
                  {t("AUDIT_LOGS_EMPTY")}
                </td>
              </TableRow>
            ) : (
              paginatedData.map((log) => (
                <TableRow key={log.id}>
                  <td className="px-4 py-4 font-medium">
                    {log.action}
                  </td>
                  <td className="px-4 py-4">
                    {log.entity}
                  </td>
                  <td className="px-4 py-4 opacity-70">
                    {log.description || "-"}
                  </td>
                  <td className="px-4 py-4">
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
              ))
            )}
          </tbody>
        </DataTable>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}