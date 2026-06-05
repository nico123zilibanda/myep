
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Briefcase,
  CalendarDays,
  FolderOpen,
  FileText,
  Video,
  Link2,
  MapPin,
  Search,
  Sparkles,
  Eye,
  Clock3,
  CheckCircle2,
  XCircle,
  Pencil,
  LayoutGrid,
} from "lucide-react";

import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import Modal from "@/components/ui/Modal";
import OpportunityForm from "@/components/forms/OpportunityForm";
import ActionButtons from "@/components/table/ActionButtons";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/button";

import { useAppToast } from "@/lib/toast";
import { useDictionary } from "@/lib/i18n/useDictionary";

import type { MessageKey } from "@/lib/messages";

/* ================= TYPES ================= */

interface Category {
  id: number;
  name: string;
}

interface Opportunity {
  id: number;
  title: string;
  description?: string;
  requirements?: string;
  howToApply?: string;
  deadline: string;
  location?: string;

  resourceType?: "PDF" | "VIDEO" | "LINK";
  resourceUrl?: string;

  status: "PUBLISHED" | "DRAFT" | "CLOSED";

  categoryId: number | null;
  Category?: { id: number; name: string };
}

interface ApiResponse<T = any> {
  success: boolean;
  messageKey: MessageKey;
  data?: T;
}

/* ================= HELPERS ================= */

const statusStyles: Record<Opportunity["status"], string> = {
  PUBLISHED:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",

  DRAFT:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",

  CLOSED:
    "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
};

const resourceIcons = {
  PDF: <FileText className="size-4" />,
  VIDEO: <Video className="size-4" />,
  LINK: <Link2 className="size-4" />,
};

const statusIcons = {
  PUBLISHED: <CheckCircle2 className="size-3.5" />,
  DRAFT: <Clock3 className="size-3.5" />,
  CLOSED: <XCircle className="size-3.5" />,
};

/* ================= PAGE ================= */

export default function OpportunitiesPage() {
  const { showSuccess, showError } = useAppToast();
  const t = useDictionary();

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Opportunity | null>(null);
  const [deleteTarget, setDeleteTarget] =
    useState<Opportunity | null>(null);

  const [viewing, setViewing] = useState<Opportunity | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "PUBLISHED" | "DRAFT" | "CLOSED"
  >("ALL");

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const perPage = 5;

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

      setOpportunities(data);
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
  }, [search, statusFilter]);

  /* ================= FILTER ================= */

  const filtered = useMemo(() => {
    return opportunities.filter((o) => {
      const matchesSearch =
        o.title.toLowerCase().includes(search.toLowerCase()) ||
        (o.location ?? "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (o.Category?.name ?? "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL"
          ? true
          : o.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [opportunities, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / perPage);

  const paginated = filtered.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  /* ================= STATS ================= */

  const publishedCount = opportunities.filter(
    (o) => o.status === "PUBLISHED",
  ).length;

  const draftCount = opportunities.filter(
    (o) => o.status === "DRAFT",
  ).length;

  const closedCount = opportunities.filter(
    (o) => o.status === "CLOSED",
  ).length;

  /* ================= STATUS ================= */

  const handleStatusChange = async (
    id: number,
    status: Opportunity["status"],
  ) => {
    try {
      const res = await fetch(
        `/api/admin/opportunities/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status }),
        },
      );

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        showError(data.messageKey);
        return;
      }

      showSuccess(data.messageKey);

      setOpportunities((prev) =>
        prev.map((o) =>
          o.id === id ? { ...o, status } : o,
        ),
      );
    } catch {
      showError("SERVER_ERROR");
    }
  };

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
        },
      );

      const data: ApiResponse = await res.json();

      console.log("DELETE STATUS:", res.status);
      console.log("DELETE RESPONSE:", data);
      if (!res.ok) {
        showError(data.messageKey);
        return;
      }

      showSuccess(data.messageKey);

      setOpportunities((prev) =>
        prev.filter((o) => o.id !== deleteTarget.id),
      );

      setDeleteTarget(null);
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setDeleting(false);
    }
  };

  /* ================= VIEW ================= */

  const handleView = (opp: Opportunity) => {
    if (!opp.resourceUrl) return;

    if (opp.resourceType === "VIDEO") {
      setViewing(opp);
      return;
    }

    window.open(opp.resourceUrl, "_blank");
  };

  /* ================= SUBMIT ================= */

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
        },
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
      {/* ================= HERO ================= */}

      <div className="relative overflow-hidden rounded-[28px] border bg-background shadow-sm">
        <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5" />

        <div className="relative flex flex-col gap-8 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border bg-muted/60 px-4 py-1.5 text-xs font-semibold">
              <Sparkles className="size-3.5" />
              Usimamizi wa Fursa
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {t("OPPORTUNITY")}
              </h1>

              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {t("OPPORTUNITY_PAGE_DESC")}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl border bg-background px-4 py-2 text-sm">
                <LayoutGrid className="size-4 text-primary" />
                <span className="font-medium">
                  {opportunities.length}
                </span>
                Jumla
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-4" />
                {publishedCount} Iliyochapishwa
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-600 dark:text-amber-400">
                <Clock3 className="size-4" />
                {draftCount} Rasimu
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-600 dark:text-red-400">
                <XCircle className="size-4" />
                {closedCount} Imefungwa
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className="h-12 rounded-2xl px-6 shadow-sm"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <Plus className="size-4" />
            {t("ADD_OPPORTUNITY")}
          </Button>
        </div>
      </div>

      {/* ================= FILTERS ================= */}

      <div className="rounded-[24px] border bg-background p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <TableSearch
              value={search}
              onChange={setSearch}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "ALL",
              "PUBLISHED",
              "DRAFT",
              "CLOSED",
            ].map((status) => (
              <button
                key={status}
                onClick={() =>
                  setStatusFilter(
                    status as
                      | "ALL"
                      | "PUBLISHED"
                      | "DRAFT"
                      | "CLOSED",
                  )
                }
                className={`
                  rounded-xl border px-4 py-2 text-sm font-medium transition
                  ${
                    statusFilter === status
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "hover:bg-muted"
                  }
                `}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}

      <div className="overflow-hidden rounded-[28px] border bg-background shadow-sm">
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
                  <td colSpan={6} className="px-4 py-5">
                    <Skeleton className="h-12 w-full rounded-2xl" />
                  </td>
                </TableRow>
              ))
            ) : paginated.length === 0 ? (
              <TableRow>
                <td
                  colSpan={6}
                  className="py-20 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="rounded-full bg-muted p-4">
                      <Search className="size-6 text-muted-foreground" />
                    </div>

                    <div className="space-y-1">
                      <p className="font-semibold">
                        {t("NO_OPPORTUNITY_FOUND")}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Jaribu kubadilisha utafutaji au vichujio.
                      </p>
                    </div>
                  </div>
                </td>
              </TableRow>
            ) : (
              paginated.map((opp) => (
                <TableRow
                  key={opp.id}
                  className="transition hover:bg-muted/40"
                >
                  {/* TITLE */}
                  <td className="px-4 py-5">
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-xl bg-primary/10 p-2 text-primary">
                          <Briefcase className="size-4" />
                        </div>

                        <div className="space-y-1">
                          <p className="font-semibold text-foreground">
                            {opp.title}
                          </p>

                          {opp.description && (
                            <p className="line-clamp-2 max-w-md text-xs leading-relaxed text-muted-foreground">
                              {opp.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {opp.location && (
                        <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="size-3.5" />
                          {opp.location}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* DEADLINE */}
                  <td className="px-4 py-5">
                    <div className="inline-flex items-center gap-2 rounded-xl border bg-muted/40 px-3 py-2 text-sm">
                      <CalendarDays className="size-4 text-muted-foreground" />
                      {new Date(
                        opp.deadline,
                      ).toLocaleDateString()}
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td className="px-4 py-5">
                    <div className="inline-flex items-center gap-2 rounded-xl border bg-muted/40 px-3 py-2 text-sm">
                      <FolderOpen className="size-4 text-muted-foreground" />
                      {opp.Category?.name || "-"}
                    </div>
                  </td>

                  {/* RESOURCE */}
                  <td className="px-4 py-5">
                    {opp.resourceUrl ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 rounded-xl"
                        onClick={() => handleView(opp)}
                      >
                        {opp.resourceType
                          ? resourceIcons[opp.resourceType]
                          : <FileText className="size-4" />}

                        {opp.resourceType || "FILE"}
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        No resource
                      </span>
                    )}
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-5">
                    <span
                      className={`
                        inline-flex items-center gap-1.5 rounded-full px-3 py-1.5
                        text-xs font-semibold
                        ${statusStyles[opp.status]}
                      `}
                    >
                      {statusIcons[opp.status]}
                      {opp.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-5">
                    <ActionButtons
                      status={opp.status}
                      onView={() => setViewing(opp)}
                      onEdit={() => {
                        setEditing(opp);
                        setOpen(true);
                      }}
                      onPublish={() =>
                        handleStatusChange(
                          opp.id,
                          "PUBLISHED",
                        )
                      }
                      onUnpublish={() =>
                        handleStatusChange(
                          opp.id,
                          "DRAFT",
                        )
                      }
                      onClose={() =>
                        handleStatusChange(
                          opp.id,
                          "CLOSED",
                        )
                      }
                      onDelete={() =>
                        setDeleteTarget(opp)
                      }
                    />
                  </td>
                </TableRow>
              ))
            )}
          </tbody>
        </DataTable>
      </div>

      {/* ================= PAGINATION ================= */}

      <div className="rounded-[24px] border bg-background p-4 shadow-sm">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* ================= CREATE / EDIT MODAL ================= */}

      <Modal
        title={
          editing
            ? t("EDIT_OPPORTUNITY")
            : t("ADD_OPPORTUNITY")
        }
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        size="lg"
      >
        <OpportunityForm
          categories={categories}
          initialData={editing}
          onSubmit={handleSubmit}
        />
      </Modal>

      {/* ================= DELETE MODAL ================= */}

      <Modal
        open={!!deleteTarget}
        onClose={() =>
          !deleting && setDeleteTarget(null)
        }
        title={t("CONFIRM_DELETE_TITLE")}
        size="sm"
      >
        <div className="space-y-5">
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("OPPORTUNITY_DELETE_CONFIRM")}{" "}
              <span className="font-semibold text-foreground">
                {deleteTarget?.title}
              </span>
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() =>
                setDeleteTarget(null)
              }
              disabled={deleting}
            >
              {t("CANCEL")}
            </Button>

            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleting}
            >
              {deleting
                ? t("DELETING")
                : t("CONFIRM_DELETE")}
            </Button>
          </div>
        </div>
      </Modal>

      {/* ================= VIEW MODAL ================= */}

      <Modal
        title={viewing?.title || ""}
        open={!!viewing}
        onClose={() => setViewing(null)}
        size="lg"
      >
        {viewing && (
          <div className="space-y-5">
            {/* VIDEO */}
            {viewing.resourceType === "VIDEO" &&
              viewing.resourceUrl && (
                <div className="overflow-hidden rounded-2xl border bg-black">
                  <video
                    src={viewing.resourceUrl}
                    controls
                    className="w-full rounded-2xl"
                  />
                </div>
              )}

            {/* DETAILS */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border p-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Category
                </p>

                <p className="font-medium">
                  {viewing.Category?.name || "-"}
                </p>
              </div>

              <div className="rounded-2xl border p-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Status
                </p>

                <span
                  className={`
                    inline-flex items-center gap-1.5 rounded-full px-3 py-1.5
                    text-xs font-semibold
                    ${statusStyles[viewing.status]}
                  `}
                >
                  {statusIcons[viewing.status]}
                  {viewing.status}
                </span>
              </div>

              <div className="rounded-2xl border p-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Deadline
                </p>

                <p className="font-medium">
                  {new Date(
                    viewing.deadline,
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="rounded-2xl border p-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Location
                </p>

                <p className="font-medium">
                  {viewing.location || "-"}
                </p>
              </div>
            </div>

            {viewing.description && (
              <div className="rounded-2xl border p-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Description
                </p>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {viewing.description}
                </p>
              </div>
            )}

            {viewing.requirements && (
              <div className="rounded-2xl border p-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Requirements
                </p>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {viewing.requirements}
                </p>
              </div>
            )}

            {viewing.howToApply && (
              <div className="rounded-2xl border p-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  How To Apply
                </p>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {viewing.howToApply}
                </p>
              </div>
            )}

            {viewing.resourceUrl &&
              viewing.resourceType !== "VIDEO" && (
                <Button
                  className="w-full rounded-2xl"
                  onClick={() =>
                    window.open(
                      viewing.resourceUrl,
                      "_blank",
                    )
                  }
                >
                  <Eye className="size-4" />
                  Open Resource
                </Button>
              )}
          </div>
        )}
      </Modal>
    </div>
  );
}

