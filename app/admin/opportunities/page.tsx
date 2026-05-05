"use client";

import { ReactNode, useEffect, useState } from "react";
import { Plus } from "lucide-react";

import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import Modal from "@/components/ui/Modal";
import OpportunityForm from "@/components/forms/OpportunityForm";
import ActionButtons from "@/components/table/ActionButtons";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAppToast } from "@/lib/toast";
import type { MessageKey } from "@/lib/messages";
import { useDictionary } from "@/lib/i18n/useDictionary";

/* ================= TYPES ================= */
interface Category {
  id: number;
  name: string;
}

interface Opportunity {
  type: ReactNode;
  id: number;
  title: string;
  description?: string;
  requirements?: string;
  howToApply?: string;
  deadline: string;
  location?: string;

  // 🔥 mpya
  resourceType?: "PDF" | "VIDEO" | "LINK";
  resourceUrl?: string;

  status: string;
  categoryId: number | null;
  Category?: { id: number; name: string };
}

interface ApiResponse<T = any> {
  success: boolean;
  messageKey: MessageKey;
  data?: T;
}

/* ================= PAGE ================= */
export default function OpportunitiesPage() {
  const { showSuccess, showError } = useAppToast();
  const t = useDictionary();

  const [viewing, setViewing] = useState<Opportunity | null>(null); // 🔥 mpya

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Opportunity | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Opportunity | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  /* ================= STATUS CHANGE ================= */
  const handleStatusChange = async (
    id: number,
    newStatus: string,
    showToast = true
  ) => {
    try {
      const res = await fetch(
        `/api/admin/opportunities/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
          credentials: "include",
        }
      );

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        showError(data.messageKey);
        return;
      }

      if (showToast) showSuccess(data.messageKey);

      setOpportunities((prev) =>
        prev.map((o) =>
          o.id === id ? { ...o, status: newStatus } : o
        )
      );
    } catch {
      showError("SERVER_ERROR");
    }
  };

  /* ================= FETCH ================= */
  const fetchOpportunities = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/opportunities", {
        credentials: "include",
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        showError(data.messageKey ?? "SERVER_ERROR");
        return;
      }

      const now = new Date();

      // AUTO CLOSE AFTER DEADLINE
      const updated = await Promise.all(
        data.map(async (opp: Opportunity) => {
          if (
            opp.status === "PUBLISHED" &&
            new Date(opp.deadline) < now
          ) {
            await handleStatusChange(opp.id, "CLOSED", false);
            return { ...opp, status: "CLOSED" };
          }
          return opp;
        })
      );

      setOpportunities(updated);
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories", {
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        showError(result.messageKey ?? "SERVER_ERROR");
        return;
      }

      setCategories(result.data || []);
    } catch {
      showError("SERVER_ERROR");
    }
  };

  useEffect(() => {
    fetchOpportunities();
    fetchCategories();
  }, []);

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
  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);

      const res = await fetch(
        `/api/admin/opportunities/${deleteTarget.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        showError(data.messageKey);
        return;
      }

      showSuccess(data.messageKey);

      setOpportunities((prev) =>
        prev.filter((o) => o.id !== deleteTarget.id)
      );

      setDeleteTarget(null);
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setDeleting(false);
    }
  };

  /* ================= VIEW (🔥 mpya) ================= */
  const handleView = (opp: Opportunity) => {
    if (!opp.resourceUrl) return;

    if (opp.resourceType === "PDF" || opp.resourceType === "LINK") {
      window.open(opp.resourceUrl, "_blank");
      return;
    }

    if (opp.resourceType === "VIDEO") {
      setViewing(opp);
    }
  };

  /* ================= CREATE / UPDATE ================= */
  const handleEdit = async (id: number, form: Opportunity) => {
    try {
      const res = await fetch(`/api/admin/opportunities/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        showError(data.messageKey);
        return;
      }

      showSuccess(data.messageKey);
      setOpen(false);
      setEditing(null);
      fetchOpportunities();
    } catch {
      showError("SERVER_ERROR");
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await fetch(
        editing
          ? `/api/admin/opportunities/${editing.id}`
          : "/api/admin/opportunities",
        {
          method: editing ? "PATCH" : "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        showError(data.messageKey);
        return;
      }

      showSuccess(data.messageKey);
      setOpen(false);
      setEditing(null);
      fetchOpportunities();
    } catch {
      showError("SERVER_ERROR");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">

      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">{t("OPPORTUNITY")}</h1>
          <p className="text-sm opacity-70">{t("OPPORTUNITY_PAGE_DESC")}</p>
        </div>

        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-(--btn-primary) px-4 py-2 text-sm font-medium text-(--btn-text) hover:shadow-lg transition"
        >
          <Plus size={16} />
          {t("ADD_OPPORTUNITY")}
        </button>
      </div>

      {/* CREATE / EDIT MODAL */}
      <Modal
        title={editing ? t("EDIT_OPPORTUNITY") : t("ADD_OPPORTUNITY")}
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

      {/* DELETE MODAL */}
      <Modal
        open={!!deleteTarget}
        onClose={() => { if (!deleting) setDeleteTarget(null); }}
        title={t("CONFIRM_DELETE_TITLE")}
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm opacity-70">
            {t("OPPORTUNITY_DELETE_CONFIRM")}
            <span className="font-semibold">
              {" "}{deleteTarget?.title}
            </span>
          </p>

          <div className="flex justify-end gap-3 pt-4">
            <button
              disabled={deleting}
              onClick={() => setDeleteTarget(null)}
              className="rounded-lg px-4 py-2 text-sm border"
            >
              {t("CANCEL")}
            </button>

            <button
              onClick={confirmDelete}
              disabled={deleting}
              className="rounded-lg px-4 py-2 text-sm font-medium bg-(--btn-primary) text-(--btn-text)"
            >
              {deleting ? t("DELETING") : t("CONFIRM_DELETE")}
            </button>
          </div>
        </div>
      </Modal>

      {/* VIDEO MODAL */}
      <Modal
        title={viewing?.title || ""}
        open={!!viewing}
        onClose={() => setViewing(null)}
        size="lg"
      >
        {viewing && (
          <video
            src={viewing.resourceUrl}
            controls
            className="w-full rounded-xl"
          />
        )}
      </Modal>

      {/* SEARCH */}
      <div className="card border-default p-4 shadow">
        <TableSearch value={search} onChange={setSearch} />
      </div>

      {/* TABLE */}
      <div className="card border-default overflow-x-auto">
        <DataTable>
          <TableHeader
            columns={[
              t("TABLE_OPP_TITLE"),
              t("TABLE_OPP_DEADLINE"),
              t("TABLE_OPP_CATEGORY"),
              "Resource",
              "Status",
              t("TABLE_OPP_ACTIONS"),
            ]}
          />

          <tbody>
            {loading ? (
              Array.from({ length: perPage }).map((_, i) => (
                <TableRow key={i}>
                  <td colSpan={6} className="px-4 py-6">
                    <Skeleton className="h-4 w-full rounded" />
                  </td>
                </TableRow>
              ))
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <td colSpan={6} className="px-4 py-10 text-center opacity-70">
                  {t("NO_OPPORTUNITY_FOUND")}
                </td>
              </TableRow>
            ) : (
              paginatedData.map((opp) => (
                <TableRow key={opp.id} className="hover:shadow-sm transition">
                  <td className="px-4 py-4 font-medium">{opp.title}</td>

                  <td className="px-4 py-4">
                    {new Date(opp.deadline).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4">
                    {opp.Category?.name}
                  </td>

                  {/* RESOURCE */}
                  <td className="px-4 py-4">
                    {opp.resourceUrl ? (
                      <button
                        onClick={() => handleView(opp)}
                        className="text-(--btn-primary) hover:underline text-sm"
                      >
                        {opp.resourceType === "PDF"
                          ? "Open PDF"
                          : opp.resourceType === "VIDEO"
                          ? "Watch Video"
                          : "Open Link"}
                      </button>
                    ) : (
                      <span className="text-xs opacity-50">No file</span>
                    )}
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full
                        ${
                          opp.status === "PUBLISHED"
                            ? "bg-green-100 text-green-700"
                            : opp.status === "DRAFT"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {opp.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-4">
                    <ActionButtons
                      status={opp.status}
                      onEdit={() => {
                        setEditing(opp);
                        setOpen(true);
                      }}
                      onPublish={() =>
                        handleStatusChange(opp.id, "PUBLISHED")
                      }
                      onUnpublish={() =>
                        handleStatusChange(opp.id, "DRAFT")
                      }
                      onClose={() =>
                        handleStatusChange(opp.id, "CLOSED")
                      }
                      onDelete={() => setDeleteTarget(opp)}
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