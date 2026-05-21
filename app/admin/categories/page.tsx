
"use client";

import { CategoryInput } from "@/lib/validators/category";
import { useEffect, useMemo, useState } from "react";

import {
  Plus,
  FolderOpen,
  Search,
  FileText,
  Layers3,
} from "lucide-react";

import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import ActionButtons from "@/components/table/ActionButtons";

import Modal from "@/components/ui/Modal";
import CategoryForm from "@/components/forms/CategoryForm";

import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/button";

import { useDictionary } from "@/lib/i18n/useDictionary";
import { useAppToast } from "@/lib/toast";

import type { MessageKey } from "@/lib/messages";

/* ================= TYPES ================= */

interface Category {
  id: number;
  name: string;
  description?: string | null;
}

/* ================= PAGE ================= */

export default function CategoriesPage() {
  const { showSuccess, showError } = useAppToast();

  const t = useDictionary();

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [open, setOpen] =
    useState(false);

  const [editing, setEditing] =
    useState<Category | null>(null);

  const [deleteTarget, setDeleteTarget] =
    useState<Category | null>(null);

  const [deleting, setDeleting] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const perPage = 5;

  /* ================= FETCH ================= */

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/admin/categories",
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      const json = await res.json();

      if (!res.ok) {
        showError(
          (json.messageKey as MessageKey) ||
            "ACTION_FAILED"
        );

        return;
      }

      setCategories(json.data || []);
    } catch (error) {
      console.error(
        "Fetch categories error:",
        error
      );

      showError("SERVER_ERROR");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  /* ================= EDIT ================= */

  useEffect(() => {
    if (editing) {
      setOpen(true);
    }
  }, [editing]);

  /* ================= FILTER ================= */

  const filtered = useMemo(() => {
    return categories.filter((c) =>
      c.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [categories, search]);

  const totalPages = Math.ceil(
    filtered.length / perPage
  );

  const paginatedData = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  /* ================= STATS ================= */

  const totalCategories =
    categories.length;

  const categoriesWithDescription =
    categories.filter(
      (c) => c.description
    ).length;

  /* ================= DELETE ================= */

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);

      const res = await fetch(
        `/api/admin/categories/${deleteTarget.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const json = await res.json();

      if (!res.ok) {
        showError(
          (json.messageKey as MessageKey) ||
            "ACTION_FAILED"
        );

        return;
      }

      setCategories((prev) =>
        prev.filter(
          (c) =>
            c.id !== deleteTarget.id
        )
      );

      showSuccess(
        "CATEGORY_DELETE_SUCCESS"
      );

      setDeleteTarget(null);
    } catch (error) {
      console.error(
        "Delete error:",
        error
      );

      showError("ACTION_FAILED");
    } finally {
      setDeleting(false);
    }
  };

  /* ================= CREATE / UPDATE ================= */

  const handleSubmit = async (
    form: CategoryInput
  ) => {
    try {
      const url = editing
        ? `/api/admin/categories/${editing.id}`
        : "/api/admin/categories";

      const method = editing
        ? "PATCH"
        : "POST";

      const res = await fetch(url, {
        method,

        headers: {
          "Content-Type":
            "application/json",
        },

        credentials: "include",

        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok) {
        if (json.errors) {
          throw {
            fieldErrors:
              json.errors,
          };
        }

        showError(
          (json.messageKey as MessageKey) ||
            "ACTION_FAILED"
        );

        return;
      }

      showSuccess(
        editing
          ? "CATEGORY_UPDATE_SUCCESS"
          : "CATEGORY_CREATE_SUCCESS"
      );

      setOpen(false);

      setEditing(null);

      await fetchCategories();
    } catch (err: any) {
      console.error(
        "Save category error:",
        err
      );

      if (err?.fieldErrors) {
        throw err;
      }

      showError("ACTION_FAILED");
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
              <Layers3 className="size-3.5" />

              Content Management
            </div>

            <div>
              <h1
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                "
              >
                {t("CATEGORY_TITLE")}
              </h1>

              <p
                className="
                  mt-1

                  max-w-2xl

                  text-sm
                  text-muted-foreground
                "
              >
                {t("CATEGORY_PAGE_DESC")}
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

            {t("ADD_CATEGORY")}
          </Button>
        </div>
      </div>

      {/* STATS */}
      <div
        className="
          grid gap-4

          md:grid-cols-2
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
                Total Categories
              </p>

              <h3
                className="
                  text-3xl
                  font-bold
                "
              >
                {totalCategories}
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
              <FolderOpen className="size-5" />
            </div>
          </div>
        </div>

        {/* WITH DESCRIPTION */}
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
                With Description
              </p>

              <h3
                className="
                  text-3xl
                  font-bold
                  text-emerald-600
                "
              >
                {
                  categoriesWithDescription
                }
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
              <FileText className="size-5" />
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
              t("TABLE_NAME"),
              t("TABLE_DESCRIPTION"),
              t("TABLE_ACTIONS"),
            ]}
          />

          <tbody>
            {loading ? (
              Array.from({
                length: perPage,
              }).map((_, idx) => (
                <TableRow key={idx}>
                  <td
                    colSpan={3}
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
                  colSpan={3}
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
                        No categories found
                      </p>

                      <p className="mt-1 text-xs">
                        Try another keyword
                        or create a new
                        category
                      </p>
                    </div>
                  </div>
                </td>
              </TableRow>
            ) : (
              paginatedData.map((cat) => (
                <TableRow
                  key={cat.id}
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

                          rounded-2xl

                          bg-primary/10

                          text-sm
                          font-semibold

                          text-primary
                        "
                      >
                        {cat.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <p className="font-medium">
                          {cat.name}
                        </p>

                        <p
                          className="
                            text-xs
                            text-muted-foreground
                          "
                        >
                          Category #
                          {cat.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* DESCRIPTION */}
                  <td className="px-4 py-4">
                    <div className="max-w-md">
                      {cat.description ? (
                        <p
                          className="
                            line-clamp-2

                            text-sm
                            text-muted-foreground
                          "
                        >
                          {
                            cat.description
                          }
                        </p>
                      ) : (
                        <span
                          className="
                            inline-flex items-center gap-2

                            rounded-full

                            bg-muted

                            px-3 py-1

                            text-xs
                            text-muted-foreground
                          "
                        >
                          No description
                        </span>
                      )}
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-4">
                    <ActionButtons
                      onEdit={() =>
                        setEditing(cat)
                      }
                      onDelete={() =>
                        setDeleteTarget(cat)
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

      {/* FORM MODAL */}
      <Modal
        title={
          editing
            ? t("EDIT_CATEGORY")
            : t("ADD_CATEGORY")
        }
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        size="sm"
      >
        <CategoryForm
          initialData={
            editing ?? undefined
          }
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
                "DELETE_CONFIRM_TEXT"
              )}{" "}
              <span
                className="
                  font-semibold
                  text-foreground
                "
              >
                {deleteTarget?.name}
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
                : t(
                    "CONFIRM_DELETE"
                  )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

