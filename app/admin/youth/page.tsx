"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import ActionButtons from "@/components/table/ActionButtons";
import Modal from "@/components/ui/Modal";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAppToast } from "@/lib/toast";
import type { MessageKey } from "@/lib/messages";
import { useDictionary } from "@/lib/i18n/useDictionary";

/* ================= TYPES ================= */
interface Youth {
  id: number;
  fullName?: string;
  email?: string | null;
  phone?: string | null;
  educationLevel?: string | null;
  gender?: string | null;
  dateOfBirth?: string | null;
  isActive: boolean;
  createdAt?: string | null;
}

interface ApiResponse<T = any> {
  success: boolean;
  messageKey: MessageKey;
  data?: T;
}

/* ================= PAGE ================= */
export default function YouthPage() {
  const { showSuccess, showError } = useAppToast();
  const t = useDictionary();

  const [youth, setYouth] = useState<Youth[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [viewing, setViewing] = useState<Youth | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Youth | null>(null);
  const [deleting, setDeleting] = useState(false);

  /* ================= FETCH ================= */
  const fetchYouth = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/youth", {
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) {
        showError(data.messageKey ?? "SERVER_ERROR");
        setYouth([]);
        return;
      }
      setYouth(data.data ?? data);
    } catch {
      showError("SERVER_ERROR");
      setYouth([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchYouth(); }, []);
  useEffect(() => { setPage(1); }, [search]);

  /* ================= FILTER + PAGINATION ================= */
  const filtered = youth.filter(
    (v) =>
      (v.fullName ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (v.email ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const perPage = 5;
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginatedData = filtered.slice((page - 1) * perPage, page * perPage);

  /* ================= STATUS TOGGLE ================= */
  const toggleStatus = async (v: Youth) => {
    try {
      const res = await fetch(`/api/admin/youth/${v.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !v.isActive }),
        credentials: "include",
      });
      const data: ApiResponse = await res.json();
      if (!res.ok) {
        showError(data.messageKey);
        return;
      }
      showSuccess(data.messageKey);
      fetchYouth();
    } catch {
      showError("SERVER_ERROR");
    }
  };

  /* ================= DELETE ================= */
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      const res = await fetch(`/api/admin/youth/${deleteTarget.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data: ApiResponse = await res.json();
      if (!res.ok) {
        showError(data.messageKey);
        return;
      }
      showSuccess(data.messageKey);
      setYouth((prev) => prev.filter((x) => x.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setDeleting(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold text-(--text-primary)">
          {t("YOUTH_TITLE")}
        </h1>
        <p className="text-sm opacity-70">
          {t("YOUTH_PAGE_DESC")}
        </p>
      </div>

      {/* SEARCH */}
      <div className="card border-default p-4 shadow">
        <TableSearch value={search} onChange={setSearch} />
      </div>

      {/* TABLE */}
      <div className="card border-default overflow-x-auto">
        <DataTable>
          <TableHeader
            columns={[
              t("YOUTH_NAME"),
              t("YOUTH_EMAIL"),
              t("YOUTH_PHONE"),
              t("YOUTH_EDUCATION"),
              t("YOUTH_STATUS"),
              t("YOUTH_DATE"),
              t("YOUTH_ACTIONS")
            ]} />
          <tbody>
            {loading ? (
              Array.from({ length: perPage }).map((_, i) => (
                <TableRow key={i}>
                  <td colSpan={7} className="px-4 py-6"><Skeleton className="h-4 w-full rounded" /></td>
                </TableRow>
              ))
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <td colSpan={7} className="px-4 py-10 text-center opacity-70">
                  {t("NO_YOUTH_FOUND")}
                </td>
              </TableRow>
            ) : (
              paginatedData.map((v) => (
                <TableRow key={v.id} className="hover:shadow-sm transition">
                  <td className="px-4 py-4 font-medium text-(--text-primary)">{v.fullName ?? "-"}</td>
                  <td className="px-4 py-4 opacity-70">{v.email ?? "-"}</td>
                  <td className="px-4 py-4 opacity-70">{v.phone ?? "-"}</td>
                  <td className="px-4 py-4 opacity-70">{v.educationLevel ?? "-"}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${v.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {v.isActive ? t("ACTIVE") : t("INACTIVE")}
                    </span>
                  </td>
                  <td className="px-4 py-4 opacity-70">{v.createdAt ? new Date(v.createdAt).toLocaleDateString() : "-"}</td>
                  <td className="px-4 py-4">
                    <ActionButtons
                      onView={() => setViewing(v)}
                      onEdit={() => toggleStatus(v)}
                      onDelete={() => setDeleteTarget(v)}
                    />
                  </td>
                </TableRow>
              ))
            )}
          </tbody>
        </DataTable>
      </div>

      {/* PAGINATION */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {/* DELETE CONFIRM MODAL */}
      <Modal
        open={!!deleteTarget}
        onClose={() => { if (!deleting) setDeleteTarget(null); }}
        title={t("DELETE_CONFIRM_TITLE")}
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm opacity-70">
            {t("CONFIRM_DELETE_YOUTH")}
            <span className="font-semibold text-(--text-primary)">
              {" "}{deleteTarget?.fullName}
            </span>
            ?
          </p>

          <p className="text-xs opacity-70">
            {t("CONFIRM_DELETE_DESCRIPTION")}

          </p>

          <div className="flex justify-end gap-3 pt-4">
            <button
              disabled={deleting}
              onClick={() => setDeleteTarget(null)}
              className="
          rounded-lg px-4 py-2 text-sm
          border border-default
          hover:shadow-sm
          disabled:opacity-50
          transition
        "
            >
              {t("CANCEL")}

            </button>

            <button
              onClick={confirmDelete}
              disabled={deleting}
              className="
          rounded-lg px-4 py-2 text-sm font-medium
          bg-(--btn-primary) text-(--btn-text)
          hover:shadow-sm
          disabled:opacity-60
          transition
        "
            >
              {deleting ? t("DELETING") : t("CONFIRM_DELETE")}
            </button>
          </div>
        </div>
      </Modal>


      {/* VIEW MODAL */}
      <Modal title={t("YOUTH_PROFILE")}
        open={!!viewing}
        onClose={() => setViewing(null)}>
        {viewing && (
          <div className="space-y-3 text-sm">
            <p><strong>{t("YOUTH_NAME")}:</strong> {viewing.fullName ?? "-"}</p>
            <p><strong>{t("YOUTH_EMAIL")}:</strong> {viewing.email ?? "-"}</p>
            <p><strong>{t("YOUTH_PHONE")}:</strong> {viewing.phone ?? "-"}</p>
            <p><strong>{t("YOUTH_EDUCATION")}:</strong> {viewing.educationLevel ?? "-"}</p>
            <p><strong>{t("YOUTH_GENDER")}:</strong> {viewing.gender ?? "-"}</p>
            <p><strong>{t("YOUTH_STATUS")}:</strong> {viewing.isActive ? t("ACTIVE") : t("INACTIVE")}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
