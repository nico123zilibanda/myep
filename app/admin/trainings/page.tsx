
"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Plus,
  GraduationCap,
  FileText,
  Video,
  BookOpen,
  Search,
  ExternalLink,
} from "lucide-react";

import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import Pagination from "@/components/table/Pagination";
import Modal from "@/components/ui/Modal";
import TrainingsForm from "@/components/forms/TrainingsForm";
import ActionButtons from "@/components/table/ActionButtons";
import TableSearch from "@/components/table/TableSearch";

import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/button";

import { useAppToast } from "@/lib/toast";

import type { MessageKey } from "@/lib/messages";

import { useDictionary } from "@/lib/i18n/useDictionary";

/* ================= TYPES ================= */

interface Training {
  id: number;
  title: string;
  description: string;

  type:
    | "ARTICLE"
    | "VIDEO"
    | "PDF";

  resourceUrl: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  messageKey: MessageKey;
  data?: T;
}

/* ================= HELPERS ================= */

const typeStyles = {
  ARTICLE:
    "bg-blue-500/10 text-blue-600 border border-blue-500/20",

  VIDEO:
    "bg-purple-500/10 text-purple-600 border border-purple-500/20",

  PDF:
    "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
};

const typeIcons = {
  ARTICLE: (
    <BookOpen className="size-3.5" />
  ),

  VIDEO: (
    <Video className="size-3.5" />
  ),

  PDF: (
    <FileText className="size-3.5" />
  ),
};

/* ================= PAGE ================= */

export default function TrainingsPage() {
  const { showSuccess, showError } =
    useAppToast();

  const t = useDictionary();

  const [trainings, setTrainings] =
    useState<Training[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [open, setOpen] =
    useState(false);

  const [editing, setEditing] =
    useState<Training | null>(null);

  const [viewing, setViewing] =
    useState<Training | null>(null);

  const [deleteTarget, setDeleteTarget] =
    useState<Training | null>(null);

  const [deleting, setDeleting] =
    useState(false);

  const [page, setPage] =
    useState(1);

  const [search, setSearch] =
    useState("");

  const perPage = 5;

  /* ================= FETCH ================= */

  const fetchTrainings = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/admin/trainings",
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

        return;
      }

      setTrainings(data);
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  /* ================= FILTER ================= */

  const filtered = useMemo(() => {
    return trainings.filter(
      (t) =>
        t.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        t.type
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );
  }, [trainings, search]);

  const totalPages = Math.ceil(
    filtered.length / perPage
  );

  const paginatedData = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  /* ================= STATS ================= */

  const totalTrainings =
    trainings.length;

  const totalVideos =
    trainings.filter(
      (t) => t.type === "VIDEO"
    ).length;

  const totalArticles =
    trainings.filter(
      (t) => t.type === "ARTICLE"
    ).length;

  /* ================= DELETE ================= */

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);

      const res = await fetch(
        `/api/admin/trainings/${deleteTarget.id}`,
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

      setTrainings((prev) =>
        prev.filter(
          (t) =>
            t.id !== deleteTarget.id
        )
      );

      showSuccess(data.messageKey);

      setDeleteTarget(null);
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setDeleting(false);
    }
  };

  /* ================= CREATE / UPDATE ================= */

  const handleSubmit = async (
    formData: FormData
  ) => {
    try {
      const res = await fetch(
        editing
          ? `/api/admin/trainings/${editing.id}`
          : "/api/admin/trainings",
        {
          method: editing
            ? "PATCH"
            : "POST",

          body: formData,

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

      setOpen(false);

      setEditing(null);

      fetchTrainings();
    } catch {
      showError("SERVER_ERROR");
    }
  };

  /* ================= VIEW ================= */

  const handleView = (
    training: Training
  ) => {
    if (
      training.type ===
        "ARTICLE" ||
      training.type === "PDF"
    ) {
      window.open(
        training.resourceUrl,
        "_blank"
      );

      return;
    }

    if (
      training.type === "VIDEO"
    ) {
      setViewing(training);
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
              <GraduationCap className="size-3.5" />

              Learning Center
            </div>

            <div>
              <h1
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                "
              >
                {t(
                  "TRAININGS_TITLE"
                )}
              </h1>

              <p
                className="
                  mt-1

                  max-w-2xl

                  text-sm
                  text-muted-foreground
                "
              >
                {t(
                  "TRAININGS_DESCRIPTION"
                )}
              </p>
            </div>
          </div>

          <Button
            size="lg"
            className="
              w-full sm:w-auto
              shadow-sm
            "
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <Plus className="size-4" />

            {t("ADD_TRAINING")}
          </Button>
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
                Total Trainings
              </p>

              <h3
                className="
                  text-3xl
                  font-bold
                "
              >
                {totalTrainings}
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
              <GraduationCap className="size-5" />
            </div>
          </div>
        </div>

        {/* VIDEOS */}
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
                Videos
              </p>

              <h3
                className="
                  text-3xl
                  font-bold
                  text-purple-600
                "
              >
                {totalVideos}
              </h3>
            </div>

            <div
              className="
                flex size-12
                items-center
                justify-center

                rounded-2xl

                bg-purple-500/10

                text-purple-600
              "
            >
              <Video className="size-5" />
            </div>
          </div>
        </div>

        {/* ARTICLES */}
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
                Articles
              </p>

              <h3
                className="
                  text-3xl
                  font-bold
                  text-blue-600
                "
              >
                {totalArticles}
              </h3>
            </div>

            <div
              className="
                flex size-12
                items-center
                justify-center

                rounded-2xl

                bg-blue-500/10

                text-blue-600
              "
            >
              <BookOpen className="size-5" />
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
              t("TABLE_T_TITLE"),
              t("TABLE_T_TYPE"),
              t(
                "TABLE_T_DESCRIPTION"
              ),
              t(
                "TABLE_T_RESOURCES"
              ),
              t("TABLE_T_ACTIONS"),
            ]}
          />

          <tbody>
            {loading ? (
              Array.from({
                length: perPage,
              }).map((_, i) => (
                <TableRow key={i}>
                  <td
                    colSpan={5}
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
                  colSpan={5}
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
                          "NO_TRAININGS_FOUND"
                        )}
                      </p>

                      <p className="mt-1 text-xs">
                        Try another
                        keyword or add a
                        new training
                      </p>
                    </div>
                  </div>
                </td>
              </TableRow>
            ) : (
              paginatedData.map(
                (training) => (
                  <TableRow
                    key={training.id}
                    className="
                      transition-colors

                      hover:bg-muted/40
                    "
                  >
                    {/* TITLE */}
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

                            rounded-2xl

                            bg-primary/10

                            text-primary
                          "
                        >
                          <GraduationCap className="size-4" />
                        </div>

                        <div className="space-y-1">
                          <p className="font-medium">
                            {
                              training.title
                            }
                          </p>

                          <p
                            className="
                              text-xs
                              text-muted-foreground
                            "
                          >
                            Training #
                            {
                              training.id
                            }
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* TYPE */}
                    <td className="px-4 py-4">
                      <span
                        className={`
                          inline-flex items-center gap-2

                          rounded-full

                          px-3 py-1

                          text-xs
                          font-medium

                          ${typeStyles[
                            training.type
                          ]}
                        `}
                      >
                        {
                          typeIcons[
                            training.type
                          ]
                        }

                        {training.type}
                      </span>
                    </td>

                    {/* DESCRIPTION */}
                    <td className="px-4 py-4">
                      <div className="max-w-md">
                        <p
                          className="
                            line-clamp-2

                            text-sm
                            text-muted-foreground
                          "
                        >
                          {
                            training.description
                          }
                        </p>
                      </div>
                    </td>

                    {/* RESOURCE */}
                    <td className="px-4 py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() =>
                          handleView(
                            training
                          )
                        }
                      >
                        <ExternalLink className="size-4" />

                        {training.type ===
                        "PDF"
                          ? "Open PDF"
                          : "View"}
                      </Button>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-4 py-4">
                      <ActionButtons
                        onEdit={() => {
                          setEditing(
                            training
                          );

                          setOpen(true);
                        }}
                        onDelete={() =>
                          setDeleteTarget(
                            training
                          )
                        }
                      />
                    </td>
                  </TableRow>
                )
              )
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

      {/* CREATE / EDIT MODAL */}
      <Modal
        title={
          editing
            ? t("EDIT_TRAINING")
            : t("ADD_TRAINING")
        }
        open={open}
        onClose={() => {
          setOpen(false);

          setEditing(null);
        }}
      >
        <TrainingsForm
          initialData={editing}
          onSubmit={handleSubmit}
        />
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        open={!!deleteTarget}
        onClose={() => {
          if (!deleting) {
            setDeleteTarget(null);
          }
        }}
        title={t(
          "CONFIRM_DELETE_TITLE"
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
                "TRAINING_DELETE_CONFIRM"
              )}{" "}
              <span
                className="
                  font-semibold
                  text-foreground
                "
              >
                {
                  deleteTarget?.title
                }
              </span>
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

      {/* VIDEO MODAL */}
      <Modal
        title={
          viewing?.title || ""
        }
        open={!!viewing}
        onClose={() =>
          setViewing(null)
        }
        size="lg"
      >
        {viewing && (
          <div
            className="
              overflow-hidden

              rounded-2xl
              border

              bg-black
            "
          >
            <video
              src={
                viewing.resourceUrl
              }
              controls
              className="
                w-full
                rounded-2xl
              "
            />
          </div>
        )}
      </Modal>
    </div>
  );
}

