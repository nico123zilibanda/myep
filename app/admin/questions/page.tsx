
"use client";

import { useEffect, useMemo, useState } from "react";

import {
  MessageSquareText,
  Clock3,
  CheckCircle2,
  Search,
  User2,
  Loader2,
} from "lucide-react";

import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import ActionButtons from "@/components/table/ActionButtons";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useAppToast } from "@/lib/toast";
import type { MessageKey } from "@/lib/messages";
import { useDictionary } from "@/lib/i18n/useDictionary";

/* ================= TYPES ================= */

interface Question {
  id: number;
  questionText: string;
  answerText?: string;
  status: "PENDING" | "ANSWERED";
  User?: { fullName?: string };
}

interface ApiResponse<T = any> {
  success: boolean;
  messageKey: MessageKey;
  data?: T;
}

/* ================= PAGE ================= */

export default function AdminQuestionsPage() {
  const { showSuccess, showError } = useAppToast();
  const t = useDictionary();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [selected, setSelected] =
    useState<Question | null>(null);

  const [viewing, setViewing] =
    useState<Question | null>(null);

  const [answer, setAnswer] =
    useState("");

  const [deleteTarget, setDeleteTarget] =
    useState<Question | null>(null);

  const [deleting, setDeleting] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const perPage = 5;

  /* ================= FETCH ================= */

  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/admin/questions",
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      const result: ApiResponse<
        Question[]
      > = await res.json();

      if (!res.ok) {
        showError(
          result.messageKey ??
            "SERVER_ERROR"
        );

        return;
      }

      setQuestions(result.data || []);
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  /* ================= FILTER ================= */

  const filtered = useMemo(() => {
    return questions.filter(
      (q) =>
        q.questionText
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        q.User?.fullName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );
  }, [questions, search]);

  const totalPages = Math.ceil(
    filtered.length / perPage
  );

  const paginatedData = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  /* ================= STATS ================= */

  const totalQuestions =
    questions.length;

  const answeredQuestions =
    questions.filter(
      (q) => q.status === "ANSWERED"
    ).length;

  const pendingQuestions =
    questions.filter(
      (q) => q.status === "PENDING"
    ).length;

  /* ================= ANSWER ================= */

  const submitAnswer = async () => {
    if (
      !selected ||
      !answer.trim()
    ) {
      showError("ACTION_FAILED");

      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch(
        "/api/admin/questions/update",
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            id: selected.id,
            answerText: answer,
          }),
        }
      );

      const data: ApiResponse =
        await res.json();

      if (!res.ok) {
        showError(data.messageKey);

        return;
      }

      showSuccess(data.messageKey);

      setSelected(null);

      setAnswer("");

      fetchQuestions();
    } catch {
      showError("SERVER_ERROR");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= DELETE ================= */

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);

      const res = await fetch(
        "/api/admin/questions/delete",
        {
          method: "DELETE",

          headers: {
            "Content-Type":
              "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            id: deleteTarget.id,
          }),
        }
      );

      const data: ApiResponse =
        await res.json();

      if (!res.ok) {
        showError(data.messageKey);

        return;
      }

      showSuccess(data.messageKey);

      setQuestions((prev) =>
        prev.filter(
          (q) =>
            q.id !== deleteTarget.id
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
              <MessageSquareText className="size-3.5" />

              Usaidizi wa Jamii
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
                  "YOUTH_QUESTIONS"
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
                  "YOUTH_QUESTIONS_DESCRIPTION"
                )}
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
                Jumla ya Maswali
              </p>

              <h3
                className="
                  text-3xl
                  font-bold
                "
              >
                {totalQuestions}
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
              <MessageSquareText className="size-5" />
            </div>
          </div>
        </div>

        {/* ANSWERED */}
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
                Yaliyojibiwa
              </p>

              <h3
                className="
                  text-3xl
                  font-bold
                  text-emerald-600
                "
              >
                {
                  answeredQuestions
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
              <CheckCircle2 className="size-5" />
            </div>
          </div>
        </div>

        {/* PENDING */}
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
                Yanayosubiri
              </p>

              <h3
                className="
                  text-3xl
                  font-bold
                  text-amber-600
                "
              >
                {pendingQuestions}
              </h3>
            </div>

            <div
              className="
                flex size-12
                items-center
                justify-center

                rounded-2xl

                bg-amber-500/10

                text-amber-600
              "
            >
              <Clock3 className="size-5" />
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
              t("TABLE_QUESTION"),
              t("TABLE_ASKED_BY"),
              t("TABLE_ANSWER"),
              t("TABLE_STATUS"),
              t("TABLE_Q_ACTIONS"),
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
                          "NO_QUESTIONS_FOUND"
                        )}
                      </p>

                      <p className="mt-1 text-xs">
                        Jaribu kutumia neno lingine la utafutaji au futa kichujio cha utafutaji
                      </p>
                    </div>
                  </div>
                </td>
              </TableRow>
            ) : (
              paginatedData.map(
                (q) => (
                  <TableRow
                    key={q.id}
                    className="
                      transition-colors

                      hover:bg-muted/40
                    "
                  >
                    {/* QUESTION */}
                    <td className="px-4 py-4">
                      <div className="max-w-sm space-y-1">
                        <p
                          className="
                            line-clamp-2

                            font-medium
                            text-foreground
                          "
                        >
                          {
                            q.questionText
                          }
                        </p>

                        <div
                          className="
                            inline-flex items-center gap-1

                            text-xs
                            text-muted-foreground
                          "
                        >
                          <MessageSquareText className="size-3.5" />

                          Question #
                          {q.id}
                        </div>
                      </div>
                    </td>

                    {/* USER */}
                    <td className="px-4 py-4">
                      <div
                        className="
                          inline-flex items-center gap-2
                        "
                      >
                        <div
                          className="
                            flex size-8
                            items-center
                            justify-center

                            rounded-full

                            bg-primary/10

                            text-primary
                          "
                        >
                          <User2 className="size-4" />
                        </div>

                        <span
                          className="
                            text-sm
                            text-muted-foreground
                          "
                        >
                          {q.User
                            ?.fullName ||
                            "-"}
                        </span>
                      </div>
                    </td>

                    {/* ANSWER */}
                    <td className="px-4 py-4">
                      <div className="max-w-sm">
                        {q.answerText ? (
                          <p
                            className="
                              line-clamp-2

                              text-sm
                              text-muted-foreground
                            "
                          >
                            {
                              q.answerText
                            }
                          </p>
                        ) : (
                          <span
                            className="
                              inline-flex items-center gap-2

                              rounded-full

                              bg-amber-500/10

                              px-3 py-1

                              text-xs
                              font-medium

                              text-amber-600
                            "
                          >
                            <Clock3 className="size-3.5" />

                            Inasubiri jibu
                          </span>
                        )}
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="px-4 py-4">
                      <StatusBadge
                        status={q.status}
                      />
                    </td>

                    {/* ACTIONS */}
                    <td className="px-4 py-4">
                      <ActionButtons
                        onView={() =>
                          setViewing(q)
                        }
                        onEdit={() => {
                          setSelected(
                            q
                          );

                          setAnswer(
                            q.answerText ||
                              ""
                          );
                        }}
                        onDelete={() =>
                          setDeleteTarget(
                            q
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

      {/* DELETE MODAL */}
      <Modal
        open={!!deleteTarget}
        onClose={() => {
          if (!deleting)
            setDeleteTarget(null);
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
                "CONFIRM_DELETE_QUESTION"
              )}{" "}
              <span
                className="
                  font-semibold
                  text-foreground
                "
              >
                {
                  deleteTarget?.questionText
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
              onClick={() =>
                setDeleteTarget(
                  null
                )
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

      {/* ANSWER MODAL */}
      <Modal
        title={t(
          "ANSWER_QUESTION"
        )}
        open={!!selected}
        onClose={() =>
          setSelected(null)
        }
        size="md"
      >
        <div className="space-y-5">
          <div
            className="
              rounded-2xl
              border

              bg-muted/30

              p-4
            "
          >
            <p
              className="
                text-sm
                leading-relaxed
              "
            >
              {
                selected?.questionText
              }
            </p>
          </div>

          <div className="space-y-2">
            <label
              className="
                text-sm
                font-medium
              "
            >
              {t("WRITE_ANSWER")}
            </label>

            <Textarea
              rows={6}
              placeholder={t(
                "WRITE_ANSWER"
              )}
              value={answer}
              onChange={(e) =>
                setAnswer(
                  e.target.value
                )
              }
              className="
                min-h-32
              "
            />
          </div>

          <div
            className="
              flex justify-end
            "
          >
            <Button
              onClick={submitAnswer}
              disabled={
                submitting ||
                !answer.trim()
              }
              className="
                min-w-44
              "
            >
              {submitting && (
                <Loader2
                  className="
                    size-4
                    animate-spin
                  "
                />
              )}

              {submitting
                ? t(
                    "ANSWER_SUBMITTING_BUTTON"
                  )
                : t(
                    "SUBMIT_ANSWER"
                  )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* VIEW MODAL */}
      <Modal
        title={t(
          "QUESTION_DETAILS"
        )}
        open={!!viewing}
        onClose={() =>
          setViewing(null)
        }
        size="md"
      >
        <div className="space-y-5">
          {/* QUESTION */}
          <div className="space-y-2">
            <p
              className="
                text-sm
                font-medium
              "
            >
              {t("QUESTION")}
            </p>

            <div
              className="
                rounded-2xl
                border

                bg-muted/30

                p-4
              "
            >
              <p
                className="
                  text-sm
                  leading-relaxed
                "
              >
                {
                  viewing?.questionText
                }
              </p>
            </div>
          </div>

          {/* ANSWER */}
          <div className="space-y-2">
            <p
              className="
                text-sm
                font-medium
              "
            >
              {t("ANSWER")}
            </p>

            <div
              className="
                rounded-2xl
                border

                bg-muted/30

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
                {viewing?.answerText ||
                  t(
                    "NOT_ANSWERED_YET"
                  )}
              </p>
            </div>
          </div>

          <div
            className="
              flex justify-end
            "
          >
            {viewing && (
              <StatusBadge
                status={
                  viewing.status
                }
              />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

