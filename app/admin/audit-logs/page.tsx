
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ShieldCheck,
  Search,
  Trash2,
  Globe,
  Monitor,
  Smartphone,
  Laptop,
  CalendarClock,
  User2,
  Database,
  AlertTriangle,
  RefreshCcw,
} from "lucide-react";

import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import { Skeleton } from "@/components/ui/Skeleton";
import Modal from "@/components/ui/Modal";
import ActionButtons from "@/components/table/ActionButtons";

import { Button } from "@/components/ui/button";
import { useAppToast } from "@/lib/toast";
import { useDictionary } from "@/lib/i18n/useDictionary";

/* ================= TYPES ================= */

interface AuditLog {
  id: number;
  action: string;
  entity: string;
  description?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: string;

  User?: {
    fullName?: string | null;
    email?: string | null;
  } | null;
}

/* ================= HELPERS ================= */

const actionStyles: Record<string, string> = {
  CREATE:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",

  UPDATE:
    "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",

  DELETE:
    "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",

  LOGIN:
    "bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20",

  LOGOUT:
    "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20",
};

function getActionStyle(action: string) {
  return (
    actionStyles[action] ||
    "bg-muted text-muted-foreground border border-border"
  );
}

/* ================= PAGE ================= */

export default function AuditLogsPage() {
  const { showSuccess, showError } = useAppToast();
  const t = useDictionary();

  const [logs, setLogs] = useState<AuditLog[]>([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [deleteTarget, setDeleteTarget] =
    useState<AuditLog | null>(null);

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
      showError(err.message || "SERVER_ERROR");
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  /* ================= FILTER ================= */

  const filtered = useMemo(() => {
    return logs.filter((log) =>
      [
        log.action,
        log.entity,
        log.description ?? "",
        log.User?.fullName ?? "",
        log.ipAddress ?? "",
      ].some((field) =>
        field.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [logs, search]);

  const totalPages = Math.ceil(filtered.length / perPage);

  const paginatedData = filtered.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  /* ================= STATS ================= */

  const totalLogs = logs.length;

  const deleteLogs = logs.filter(
    (l) => l.action === "DELETE",
  ).length;

  const loginLogs = logs.filter(
    (l) => l.action === "LOGIN",
  ).length;

  const todayLogs = logs.filter((l) => {
    const today = new Date().toDateString();

    return (
      new Date(l.createdAt).toDateString() === today
    );
  }).length;

  /* ================= DELETE ================= */

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);

      const res = await fetch(
        `/api/admin/audit-logs/${deleteTarget.id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        showError(data.messageKey || "SERVER_ERROR");
        return;
      }

      showSuccess(data.messageKey);

      setLogs((prev) =>
        prev.filter((l) => l.id !== deleteTarget.id),
      );

      setDeleteTarget(null);
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setDeleting(false);
    }
  };

  /* ================= DEVICE ================= */

  function getDeviceName(userAgent?: string | null) {
    if (!userAgent) {
      return {
        label: t("DEVICE_UNKNOWN"),
        icon: Monitor,
      };
    }

    const ua = userAgent.toLowerCase();

    if (ua.includes("windows")) {
      return {
        label: t("DEVICE_WINDOWS"),
        icon: Laptop,
      };
    }

    if (ua.includes("mac os")) {
      return {
        label: t("DEVICE_MAC"),
        icon: Laptop,
      };
    }

    if (ua.includes("android")) {
      return {
        label: t("DEVICE_ANDROID"),
        icon: Smartphone,
      };
    }

    if (ua.includes("iphone")) {
      return {
        label: t("DEVICE_IPHONE"),
        icon: Smartphone,
      };
    }

    if (ua.includes("ipad")) {
      return {
        label: t("DEVICE_IPAD"),
        icon: Smartphone,
      };
    }

    if (ua.includes("linux")) {
      return {
        label: t("DEVICE_LINUX"),
        icon: Monitor,
      };
    }

    return {
      label: t("DEVICE_UNKNOWN"),
      icon: Monitor,
    };
  }

  /* ================= UI ================= */

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl border bg-background p-6 shadow-sm">
        <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border bg-muted/60 px-3 py-1 text-xs font-medium">
              <ShieldCheck className="size-3.5" />
              Ufuatiliaji wa Usalama.                        v.                                        4.                                            
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {t("AUDIT_LOGS_TITLE")}
              </h1>

              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                {t("AUDIT_LOGS_DESCRIPTION")}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            className="gap-2"
            onClick={fetchLogs}
          >
            <RefreshCcw className="size-4" />
            {t("REFRESH")}
          </Button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border bg-background p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Logs
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {totalLogs}
              </h2>
            </div>

            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <Activity className="size-5" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border bg-background p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Login Activities
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {loginLogs}
              </h2>
            </div>

            <div className="rounded-2xl bg-violet-500/10 p-3 text-violet-500">
              <User2 className="size-5" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border bg-background p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Deleted Records
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {deleteLogs}
              </h2>
            </div>

            <div className="rounded-2xl bg-red-500/10 p-3 text-red-500">
              <Trash2 className="size-5" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border bg-background p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Today's Activities
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {todayLogs}
              </h2>
            </div>

            <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-500">
              <CalendarClock className="size-5" />
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="rounded-3xl border bg-background p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-2xl bg-primary/10 p-2 text-primary">
              <Search className="size-4" />
            </div>

            <div>
              <h3 className="text-sm font-semibold">
                Search Audit Logs
              </h3>

              <p className="text-xs text-muted-foreground">
                Find activities, actions, devices and users.
              </p>
            </div>
          </div>

          <div className="w-full lg:max-w-md">
            <TableSearch
              value={search}
              onChange={setSearch}
            />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl border bg-background shadow-sm">
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
                  <td colSpan={8} className="px-4 py-5">
                    <Skeleton className="h-12 w-full rounded-2xl" />
                  </td>
                </TableRow>
              ))
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <td
                  colSpan={8}
                  className="py-20 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="rounded-full bg-muted p-4">
                      <Database className="size-7 text-muted-foreground" />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {t("AUDIT_LOGS_EMPTY")}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        No matching audit records were found.
                      </p>
                    </div>
                  </div>
                </td>
              </TableRow>
            ) : (
              paginatedData.map((log) => {
                const device = getDeviceName(log.userAgent);
                const DeviceIcon = device.icon;

                return (
                  <TableRow
                    key={log.id}
                    className="transition hover:bg-muted/40"
                  >
                    {/* ACTION */}
                    <td className="px-4 py-4">
                      <span
                        className={`
                          inline-flex items-center rounded-full px-3 py-1
                          text-xs font-semibold
                          ${getActionStyle(log.action)}
                        `}
                      >
                        {log.action}
                      </span>
                    </td>

                    {/* ENTITY */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="rounded-xl bg-muted p-2">
                          <Database className="size-4 text-muted-foreground" />
                        </div>

                        <span className="font-medium">
                          {log.entity}
                        </span>
                      </div>
                    </td>

                    {/* DESCRIPTION */}
                    <td className="max-w-sm px-4 py-4">
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {log.description || "-"}
                      </p>
                    </td>

                    {/* USER */}
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <p className="font-medium">
                          {log.User?.fullName ?? "-"}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {log.User?.email ?? ""}
                        </p>
                      </div>
                    </td>

                    {/* IP */}
                    <td className="px-4 py-4">
                      <div className="inline-flex items-center gap-2 rounded-xl border bg-muted/30 px-3 py-2 text-sm">
                        <Globe className="size-4 text-muted-foreground" />
                        {log.ipAddress ?? "-"}
                      </div>
                    </td>

                    {/* DEVICE */}
                    <td className="px-4 py-4">
                      <div className="inline-flex items-center gap-2 rounded-xl border bg-muted/30 px-3 py-2 text-sm">
                        <DeviceIcon className="size-4 text-muted-foreground" />
                        {device.label}
                      </div>
                    </td>

                    {/* DATE */}
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-4 py-4">
                      <ActionButtons
                        onDelete={() =>
                          setDeleteTarget(log)
                        }
                      />
                    </td>
                  </TableRow>
                );
              })
            )}
          </tbody>
        </DataTable>
      </div>

      {/* PAGINATION */}
      <div className="rounded-3xl border bg-background p-4 shadow-sm">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* DELETE MODAL */}
      <Modal
        open={!!deleteTarget}
        onClose={() => {
          if (!deleting) setDeleteTarget(null);
        }}
        title={t("CONFIRM_DELETE_TITLE")}
        size="sm"
      >
        <div className="space-y-5">
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-destructive/10 p-2 text-destructive">
                <AlertTriangle className="size-5" />
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">
                  {t("AUDIT_DELETE_CONFIRM_TEXT")}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {t("AUDIT_DELETE_WARNING")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              disabled={deleting}
              onClick={() => setDeleteTarget(null)}
            >
              {t("CANCEL")}
            </Button>

            <Button
              variant="destructive"
              disabled={deleting}
              onClick={confirmDelete}
            >
              {deleting
                ? t("DELETE_LOADING")
                : t("CONFIRM_DELETE")}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

