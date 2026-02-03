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
import { showSuccess, showError } from "@/lib/toast";
import type { MessageKey } from "@/lib/messages";

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
  const [youth, setYouth] = useState<Youth[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [viewing, setViewing] = useState<Youth | null>(null);

  // delete confirmation
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

  useEffect(() => {
    fetchYouth();
  }, []);

  /* Reset page on search */
  useEffect(() => {
    setPage(1);
  }, [search]);

  /* ================= FILTER + PAGINATION ================= */
  const filtered = youth.filter(
    (v) =>
      (v.fullName ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (v.email ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const perPage = 5;
  const totalPages = Math.ceil(filtered.length / perPage);

  const paginatedData = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

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

  /* ================= DELETE (CONFIRMED) ================= */
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
      setYouth((prev) =>
        prev.filter((x) => x.id !== deleteTarget.id)
      );
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
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Vijana
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Orodha ya vijana waliojisajili kwenye mfumo
        </p>
      </div>

      {/* SEARCH */}
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
              Array.from({ length: perPage }).map((_, i) => (
                <TableRow key={i}>
                  <td colSpan={7} className="px-4 py-6">
                    <Skeleton className="h-4 w-full rounded" />
                  </td>
                </TableRow>
              ))
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-gray-500"
                >
                  Hakuna vijana waliopatikana
                </td>
              </TableRow>
            ) : (
              paginatedData.map((v) => (
                <TableRow key={v.id}>
                  <td className="px-4 py-4 font-medium">
                    {v.fullName ?? "-"}
                  </td>
                  <td className="px-4 py-4">{v.email ?? "-"}</td>
                  <td className="px-4 py-4">{v.phone ?? "-"}</td>
                  <td className="px-4 py-4">
                    {v.educationLevel ?? "-"}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        v.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {v.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {v.createdAt
                      ? new Date(v.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
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
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* DELETE CONFIRM MODAL */}
      <Modal
        open={!!deleteTarget}
        onClose={() => {
          if (!deleting) setDeleteTarget(null);
        }}
        title="Thibitisha Kufuta"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Je, una uhakika unataka kumfuta{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              "{deleteTarget?.fullName}"
            </span>
            ?
          </p>

          <p className="text-xs text-red-600">
            Kitendo hiki hakiwezi kurejeshwa.
          </p>

          <div className="flex justify-end gap-3 pt-4">
            <button
              disabled={deleting}
              onClick={() => setDeleteTarget(null)}
              className="rounded-lg px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
            >
              Ghairi
            </button>

            <button
              onClick={confirmDelete}
              disabled={deleting}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
            >
              {deleting ? "Inafuta..." : "Ndiyo, Futa"}
            </button>
          </div>
        </div>
      </Modal>

      {/* VIEW MODAL */}
      <Modal
        title="Wasifu wa Kijana"
        open={!!viewing}
        onClose={() => setViewing(null)}
      >
        {viewing && (
          <div className="space-y-3 text-sm">
            <p><strong>Jina:</strong> {viewing.fullName ?? "-"}</p>
            <p><strong>Email:</strong> {viewing.email ?? "-"}</p>
            <p><strong>Simu:</strong> {viewing.phone ?? "-"}</p>
            <p><strong>Elimu:</strong> {viewing.educationLevel ?? "-"}</p>
            <p><strong>Jinsia:</strong> {viewing.gender ?? "-"}</p>
            <p>
              <strong>Status:</strong>{" "}
              {viewing.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
