
"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Users,
  Search,
  User2,
  Mail,
  Phone,
  GraduationCap,
  CalendarDays,
  ShieldCheck,
  ShieldX,
} from "lucide-react";

import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import ActionButtons from "@/components/table/ActionButtons";

import Modal from "@/components/ui/Modal";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/button";

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
  const { showSuccess, showError } =
    useAppToast();

  const t = useDictionary();

  const [youth, setYouth] =
    useState<Youth[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [viewing, setViewing] =
    useState<Youth | null>(null);

  const [deleteTarget, setDeleteTarget] =
    useState<Youth | null>(null);

  const [deleting, setDeleting] =
    useState(false);

  const perPage = 5;

  /* ================= FETCH ================= */

  const fetchYouth = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/admin/youth",
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        showError(
          data.messageKey ??
            "SERVER_ERROR"
        );

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

  useEffect(() => {
    setPage(1);
  }, [search]);

  /* ================= FILTER ================= */

  const filtered = useMemo(() => {
    return youth.filter(
      (v) =>
        (v.fullName ?? "")
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        (v.email ?? "")
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );
  }, [youth, search]);

  const totalPages = Math.ceil(
    filtered.length / perPage
  );

  const paginatedData = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  /* ================= STATS ================= */

  const totalYouth =
    youth.length;

  const activeYouth =
    youth.filter(
      (v) => v.isActive
    ).length;

  const inactiveYouth =
    youth.filter(
      (v) => !v.isActive
    ).length;

  /* ================= STATUS ================= */

  const toggleStatus = async (
    v: Youth
  ) => {
    try {
      const res = await fetch(
        `/api/admin/youth/${v.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            isActive:
              !v.isActive,
          }),

          credentials: "include",
        }
      );

      const data: ApiResponse =
        await res.json();

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

      const res = await fetch(
        `/api/admin/youth/${deleteTarget.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data: ApiResponse =
        await res.json();

      if (!res.ok) {
        showError(data.messageKey);

        return;
      }

      showSuccess(data.messageKey);

      setYouth((prev) =>
        prev.filter(
          (x) =>
            x.id !== deleteTarget.id
        )
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
      {/* HERO */}
      <div
        className="
          relative overflow-hidden

          rounded-3xl
          border

          bg-background

          p-6

          shadow-sm
        "
      >
        <div
          className="
            absolute inset-0

            bg-linear-to-r
            from-primary/5
            via-transparent
            to-primary/5

            pointer-events-none
          "
        />

        <div
          className="
            relative

            flex flex-col gap-5

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div className="space-y-3">
            <div
              className="
                inline-flex items-center gap-2

                rounded-full
                border

                bg-muted/50

                px-3 py-1

                text-xs
                font-medium
              "
            >
              <Users className="size-3.5" />

              Community Members
            </div>

            <div>
              <h1
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                "
              >
                {t("YOUTH_TITLE")}
              </h1>

              <p
                className="
                  mt-1

                  max-w-2xl

                  text-sm
                  text-muted-foreground
                "
              >
                {t("YOUTH_PAGE_DESC")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div
        className="
          grid gap-4

          md:grid-cols-3
        "
      >
        {/* TOTAL */}
        <div
          className="
            rounded-3xl
            border

            bg-background

            p-5

            shadow-sm
          "
        >
          <div
            className="
              flex items-start
              justify-between
            "
          >
            <div className="space-y-1">
              <p
                className="
                  text-sm
                  text-muted-foreground
                "
              >
                Total Youth
              </p>

              <h3
                className="
                  text-3xl
                  font-bold
                "
              >
                {totalYouth}
              </h3>
            </div>

            <div
              className="
                flex size-12
                items-center
                justify-center

                rounded-2xl

                bg-primary/10

                text-primary
              "
            >
              <Users className="size-5" />
            </div>
          </div>
        </div>

        {/* ACTIVE */}
        <div
          className="
            rounded-3xl
            border

            bg-background

            p-5

            shadow-sm
          "
        >
          <div
            className="
              flex items-start
              justify-between
            "
          >
            <div className="space-y-1">
              <p
                className="
                  text-sm
                  text-muted-foreground
                "
              >
                Active
              </p>

              <h3
                className="
                  text-3xl
                  font-bold
                  text-emerald-600
                "
              >
                {activeYouth}
              </h3>
            </div>

            <div
              className="
                flex size-12
                items-center
                justify-center

                rounded-2xl

                bg-emerald-500/10

                text-emerald-600
              "
            >
              <ShieldCheck className="size-5" />
            </div>
          </div>
        </div>

        {/* INACTIVE */}
        <div
          className="
            rounded-3xl
            border

            bg-background

            p-5

            shadow-sm
          "
        >
          <div
            className="
              flex items-start
              justify-between
            "
          >
            <div className="space-y-1">
              <p
                className="
                  text-sm
                  text-muted-foreground
                "
              >
                Inactive
              </p>

              <h3
                className="
                  text-3xl
                  font-bold
                  text-red-600
                "
              >
                {inactiveYouth}
              </h3>
            </div>

            <div
              className="
                flex size-12
                items-center
                justify-center

                rounded-2xl

                bg-red-500/10

                text-red-600
              "
            >
              <ShieldX className="size-5" />
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div
        className="
          rounded-2xl
          border

          bg-background

          p-4

          shadow-sm
        "
      >
        <TableSearch
          value={search}
          onChange={setSearch}
        />
      </div>

      {/* TABLE */}
      <div
        className="
          overflow-hidden

          rounded-3xl
          border

          bg-background

          shadow-sm
        "
      >
        <DataTable>
          <TableHeader
            columns={[
              t("YOUTH_NAME"),
              t("YOUTH_EMAIL"),
              t("YOUTH_PHONE"),
              t(
                "YOUTH_EDUCATION"
              ),
              t("YOUTH_STATUS"),
              t("YOUTH_DATE"),
              t(
                "YOUTH_ACTIONS"
              ),
            ]}
          />

          <tbody>
            {loading ? (
              Array.from({
                length: perPage,
              }).map((_, i) => (
                <TableRow key={i}>
                  <td
                    colSpan={7}
                    className="px-4 py-5"
                  >
                    <Skeleton
                      className="
                        h-10
                        w-full

                        rounded-xl
                      "
                    />
                  </td>
                </TableRow>
              ))
            ) : paginatedData.length ===
              0 ? (
              <TableRow>
                <td
                  colSpan={7}
                  className="
                    py-16

                    text-center
                    text-sm

                    text-muted-foreground
                  "
                >
                  <div
                    className="
                      flex flex-col
                      items-center
                      gap-3
                    "
                  >
                    <div
                      className="
                        flex size-14
                        items-center
                        justify-center

                        rounded-2xl

                        bg-muted
                      "
                    >
                      <Search className="size-6 opacity-50" />
                    </div>

                    <div>
                      <p className="font-medium">
                        {t(
                          "NO_YOUTH_FOUND"
                        )}
                      </p>

                      <p className="mt-1 text-xs">
                        Try another
                        keyword or clear
                        search
                      </p>
                    </div>
                  </div>
                </td>
              </TableRow>
            ) : (
              paginatedData.map((v) => (
                <TableRow
                  key={v.id}
                  className="
                    transition-colors

                    hover:bg-muted/40
                  "
                >
                  {/* NAME */}
                  <td className="px-4 py-4">
                    <div
                      className="
                        flex items-center gap-3
                      "
                    >
                      <div
                        className="
                          flex size-10
                          items-center
                          justify-center

                          rounded-full

                          bg-primary/10

                          text-sm
                          font-semibold

                          text-primary
                        "
                      >
                        {v.fullName
                          ?.charAt(0)
                          ?.toUpperCase() ||
                          "Y"}
                      </div>

                      <div className="space-y-1">
                        <p className="font-medium">
                          {v.fullName ||
                            "-"}
                        </p>

                        <p
                          className="
                            text-xs
                            text-muted-foreground
                          "
                        >
                          Youth #
                          {v.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="px-4 py-4">
                    <div
                      className="
                        inline-flex items-center gap-2
                      "
                    >
                      <Mail className="size-4 text-muted-foreground" />

                      <span
                        className="
                          text-sm
                          text-muted-foreground
                        "
                      >
                        {v.email ||
                          "-"}
                      </span>
                    </div>
                  </td>

                  {/* PHONE */}
                  <td className="px-4 py-4">
                    <div
                      className="
                        inline-flex items-center gap-2
                      "
                    >
                      <Phone className="size-4 text-muted-foreground" />

                      <span
                        className="
                          text-sm
                          text-muted-foreground
                        "
                      >
                        {v.phone ||
                          "-"}
                      </span>
                    </div>
                  </td>

                  {/* EDUCATION */}
                  <td className="px-4 py-4">
                    <div
                      className="
                        inline-flex items-center gap-2
                      "
                    >
                      <GraduationCap className="size-4 text-muted-foreground" />

                      <span
                        className="
                          text-sm
                          text-muted-foreground
                        "
                      >
                        {v.educationLevel ||
                          "-"}
                      </span>
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-4">
                    <span
                      className={`
                        inline-flex items-center rounded-full px-3 py-1

                        text-xs
                        font-medium

                        ${
                          v.isActive
                            ? `
                              border border-emerald-500/20
                              bg-emerald-500/10
                              text-emerald-600
                            `
                            : `
                              border border-red-500/20
                              bg-red-500/10
                              text-red-600
                            `
                        }
                      `}
                    >
                      {v.isActive
                        ? t("ACTIVE")
                        : t(
                            "INACTIVE"
                          )}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="px-4 py-4">
                    <div
                      className="
                        inline-flex items-center gap-2

                        text-sm
                        text-muted-foreground
                      "
                    >
                      <CalendarDays className="size-4" />

                      {v.createdAt
                        ? new Date(
                            v.createdAt
                          ).toLocaleDateString()
                        : "-"}
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-4">
                    <ActionButtons
                      onView={() =>
                        setViewing(v)
                      }
                      onEdit={() =>
                        toggleStatus(v)
                      }
                      onDelete={() =>
                        setDeleteTarget(
                          v
                        )
                      }
                    />
                  </td>
                </TableRow>
              ))
            )}
          </tbody>
        </DataTable>
      </div>

      {/* PAGINATION */}
      <div
        className="
          rounded-2xl
          border

          bg-background

          p-4

          shadow-sm
        "
      >
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
          if (!deleting) {
            setDeleteTarget(null);
          }
        }}
        title={t(
          "DELETE_CONFIRM_TITLE"
        )}
        size="sm"
      >
        <div className="space-y-5">
          <div
            className="
              rounded-2xl

              border
              border-destructive/20

              bg-destructive/5

              p-4
            "
          >
            <p
              className="
                text-sm
                leading-relaxed

                text-muted-foreground
              "
            >
              {t(
                "CONFIRM_DELETE_YOUTH"
              )}{" "}
              <span
                className="
                  font-semibold
                  text-foreground
                "
              >
                {
                  deleteTarget?.fullName
                }
              </span>
            </p>

            <p className="mt-3 text-xs">
              {t(
                "CONFIRM_DELETE_DESCRIPTION"
              )}
            </p>
          </div>

          <div
            className="
              flex justify-end gap-3
            "
          >
            <Button
              variant="outline"
              disabled={deleting}
              onClick={() =>
                setDeleteTarget(null)
              }
            >
              {t("CANCEL")}
            </Button>

            <Button
              variant="destructive"
              disabled={deleting}
              onClick={confirmDelete}
            >
              {deleting
                ? t("DELETING")
                : t(
                    "CONFIRM_DELETE"
                  )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* VIEW MODAL */}
      <Modal
        title={t("YOUTH_PROFILE")}
        open={!!viewing}
        onClose={() =>
          setViewing(null)
        }
        size="md"
      >
        {viewing && (
          <div className="space-y-6">
            {/* PROFILE */}
            <div
              className="
                flex flex-col
                items-center

                gap-4
              "
            >
              <div
                className="
                  flex size-20
                  items-center
                  justify-center

                  rounded-full

                  bg-primary/10

                  text-2xl
                  font-bold

                  text-primary
                "
              >
                {viewing.fullName
                  ?.charAt(0)
                  ?.toUpperCase() ||
                  "Y"}
              </div>

              <div className="text-center">
                <h3
                  className="
                    text-lg
                    font-semibold
                  "
                >
                  {
                    viewing.fullName
                  }
                </h3>

                <p
                  className="
                    text-sm
                    text-muted-foreground
                  "
                >
                  Youth Member
                </p>
              </div>
            </div>

            {/* DETAILS */}
            <div className="grid gap-4">
              <div
                className="
                  rounded-2xl
                  border

                  bg-muted/30

                  p-4
                "
              >
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium">
                      {t(
                        "YOUTH_EMAIL"
                      )}
                    </span>

                    <span className="text-muted-foreground">
                      {viewing.email ||
                        "-"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium">
                      {t(
                        "YOUTH_PHONE"
                      )}
                    </span>

                    <span className="text-muted-foreground">
                      {viewing.phone ||
                        "-"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium">
                      {t(
                        "YOUTH_EDUCATION"
                      )}
                    </span>

                    <span className="text-muted-foreground">
                      {viewing.educationLevel ||
                        "-"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium">
                      {t(
                        "YOUTH_GENDER"
                      )}
                    </span>

                    <span className="text-muted-foreground">
                      {viewing.gender ||
                        "-"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium">
                      {t(
                        "YOUTH_STATUS"
                      )}
                    </span>

                    <span
                      className={`
                        inline-flex items-center rounded-full px-3 py-1

                        text-xs
                        font-medium

                        ${
                          viewing.isActive
                            ? `
                              border border-emerald-500/20
                              bg-emerald-500/10
                              text-emerald-600
                            `
                            : `
                              border border-red-500/20
                              bg-red-500/10
                              text-red-600
                            `
                        }
                      `}
                    >
                      {viewing.isActive
                        ? t("ACTIVE")
                        : t(
                            "INACTIVE"
                          )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

