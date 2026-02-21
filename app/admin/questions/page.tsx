"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import ActionButtons from "@/components/table/ActionButtons";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAppToast } from "@/lib/toast";
import type { MessageKey } from "@/lib/messages";

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

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [selected, setSelected] = useState<Question | null>(null);
  const [viewing, setViewing] = useState<Question | null>(null);
  const [answer, setAnswer] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<Question | null>(null);
  const [deleting, setDeleting] = useState(false);

  /* ================= FETCH ================= */
  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/questions", {
        credentials: "include",
        cache: "no-store",
      });

      const result: ApiResponse<Question[]> = await res.json();

      if (!res.ok) {
        showError(result.messageKey ?? "SERVER_ERROR");
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

  useEffect(() => setPage(1), [search]);

  /* ================= FILTER + PAGINATION ================= */
  const filtered = questions.filter(
    (q) =>
      q.questionText.toLowerCase().includes(search.toLowerCase()) ||
      q.User?.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const perPage = 5;
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginatedData = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  /* ================= ANSWER ================= */
  const submitAnswer = async () => {
    if (!selected || !answer.trim()) {
      showError("ACTION_FAILED");
      return;
    }

    try {
      const res = await fetch("/api/admin/questions/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: selected.id,
          answerText: answer,
        }),
      });

      const data: ApiResponse = await res.json();

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
    }
  };

  /* ================= DELETE ================= */
  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);

      const res = await fetch("/api/admin/questions/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: deleteTarget.id }),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        showError(data.messageKey);
        return;
      }

      showSuccess(data.messageKey);
      setQuestions((prev) => prev.filter((q) => q.id !== deleteTarget.id));
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
          Maswali ya Vijana
        </h1>
        <p className="text-sm opacity-70">
          Maswali yaliyoulizwa na vijana na majibu yake
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
            columns={["Swali", "Aliyeuliza", "Jibu", "Hali", "Actions"]}
          />

          <tbody>
            {loading ? (
              Array.from({ length: perPage }).map((_, i) => (
                <TableRow key={i}>
                  <td colSpan={5} className="px-4 py-6">
                    <Skeleton className="h-4 w-full rounded" />
                  </td>
                </TableRow>
              ))
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center opacity-70"
                >
                  Hakuna maswali yaliyopatikana
                </td>
              </TableRow>
            ) : (
              paginatedData.map((q) => (
                <TableRow key={q.id} className="hover:shadow-sm transition">
                  <td className="px-4 py-4 max-w-xs truncate font-medium text-(--text-primary)">
                    {q.questionText}
                  </td>
                  <td className="px-4 py-4 opacity-70">
                    {q.User?.fullName || "-"}
                  </td>
                  <td className="px-4 py-4 max-w-xs truncate opacity-70">
                    {q.answerText || "-"}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={q.status} />
                  </td>
                  <td className="px-4 py-4">
                    <ActionButtons
                      onView={() => setViewing(q)}
                      onEdit={() => {
                        setSelected(q);
                        setAnswer(q.answerText || "");
                      }}
                      onDelete={() => setDeleteTarget(q)}
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
        onClose={() => { if (!deleting) setDeleteTarget(null); }}
        title="Thibitisha Kufuta"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm opacity-70">
            Je, una uhakika unataka kufuta swali: "
            <span className="font-semibold text-(--text-primary)">
              {" "}{deleteTarget?.questionText}
            </span> "
            ?
          </p>

          <p className="text-xs opacity-70">
            Kitendo hiki hakiwezi kurejeshwa.
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
              Ghairi
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
              {deleting ? "Inafuta..." : "Ndiyo, Futa"}
            </button>
          </div>
        </div>
      </Modal>


      {/* ANSWER MODAL */}
      <Modal
        title="Jibu Swali"
        open={!!selected}
        onClose={() => setSelected(null)}
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm font-medium text-(--text-primary)">
            {selected?.questionText}
          </p>

          <textarea
            rows={4}
            className="
        w-full rounded-lg p-3
        card border-default
        focus:outline-none
        focus:ring-2 focus:ring-(--btn-focus)
        transition
      "
            placeholder="Andika jibu hapa..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <button
            onClick={submitAnswer}
            className="
        w-full
        bg-(--btn-primary) text-(--btn-text)
        py-2 rounded-lg
        hover:shadow-sm
        transition
      "
          >
            Tuma Jibu
          </button>
        </div>
      </Modal>


      {/* VIEW MODAL */}
      <Modal
        title="Maelezo ya Swali"
        open={!!viewing}
        onClose={() => setViewing(null)}
        size="md"
      >
        <div className="space-y-4 text-sm">
          <div>
            <p className="opacity-70 mb-1">Swali</p>
            <p className="card border-default p-3 rounded">
              {viewing?.questionText}
            </p>
          </div>

          <div>
            <p className="opacity-70 mb-1">Jibu</p>
            <p className="card border-default p-3 rounded">
              {viewing?.answerText || "Bado halijajibiwa"}
            </p>
          </div>

          <div className="flex justify-end">
            {viewing && <StatusBadge status={viewing.status} />}
          </div>
        </div>
      </Modal>

    </div>
  );
}
