"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import CategoryActions from "@/components/table/CategoryActions";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import { showSuccess, showError } from "@/lib/toast";
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

/* ================= SKELETON ================= */
function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i}>
          <td colSpan={5} className="px-4 py-4">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </td>
        </TableRow>
      ))}
    </>
  );
}

/* ================= PAGE ================= */
export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [selected, setSelected] = useState<Question | null>(null);
  const [viewing, setViewing] = useState<Question | null>(null);
  const [answer, setAnswer] = useState("");

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

  /* Reset page on search */
  useEffect(() => {
    setPage(1);
  }, [search]);

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
    if (!selected) {
      showError("ACTION_FAILED");
      return;
    }

    if (!answer.trim()) {
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
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch("/api/admin/questions/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        showError(data.messageKey);
        return;
      }

      showSuccess(data.messageKey);
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch {
      showError("SERVER_ERROR");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Maswali ya Vijana
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Maswali yaliyoulizwa na vijana na majibu yake
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
            columns={["Swali", "Aliyeuliza", "Jibu", "Hali", "Actions"]}
          />

          <tbody>
            {loading ? (
              <TableSkeleton rows={perPage} />
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-gray-500 dark:text-gray-400"
                >
                  Hakuna maswali yaliyopatikana
                </td>
              </TableRow>
            ) : (
              paginatedData.map((q) => (
                <TableRow key={q.id}>
                  <td className="px-4 py-4 max-w-xs truncate font-medium">
                    {q.questionText}
                  </td>
                  <td className="px-4 py-4">
                    {q.User?.fullName || "-"}
                  </td>
                  <td className="px-4 py-4 max-w-xs truncate">
                    {q.answerText || "-"}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={q.status} />
                  </td>
                  <td className="px-4 py-4">
                    <CategoryActions
                      onView={() => setViewing(q)}
                      onEdit={() => {
                        setSelected(q);
                        setAnswer(q.answerText || "");
                      }}
                      onDelete={() => handleDelete(q.id)}
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

      {/* ANSWER MODAL */}
      <Modal
        title="Jibu Swali"
        open={!!selected}
        onClose={() => setSelected(null)}
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm font-medium">
            {selected?.questionText}
          </p>

          <textarea
            rows={4}
            className="
              w-full rounded-lg border
              border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-900
              p-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
            placeholder="Andika jibu hapa..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <button
            onClick={submitAnswer}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
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
            <p className="text-gray-500 mb-1">Swali</p>
            <p className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              {viewing?.questionText}
            </p>
          </div>

          <div>
            <p className="text-gray-500 mb-1">Jibu</p>
            <p className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
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
