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

/* ================= TYPES ================= */
interface Question {
  id: number;
  questionText: string;
  answerText?: string;
  status: "PENDING" | "ANSWERED";
  User?: { fullName?: string };
}

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [selected, setSelected] = useState<Question | null>(null);
  const [viewing, setViewing] = useState<Question | null>(null);
  const [answer, setAnswer] = useState("");

  /* ================= FETCH ================= */
  const fetchQuestions = async () => {
    try {
      const res = await fetch("/api/admin/questions", {
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to load questions");
      const data: Question[] = await res.json();
      setQuestions(data);
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  /* ================= FILTER + PAGINATION ================= */
  const filtered = questions.filter(q =>
    q.questionText.toLowerCase().includes(search.toLowerCase()) ||
    q.User?.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const perPage = 5;
  const totalPages = Math.ceil(filtered.length / perPage);
  const data = filtered.slice((page - 1) * perPage, page * perPage);

  /* ================= ANSWER ================= */
  const submitAnswer = async () => {
    if (!selected) return alert("Hakuna swali lililochaguliwa");
    if (!answer.trim()) return alert("Andika jibu kwanza");

    try {
      const res = await fetch("/api/admin/questions/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: selected.id, answerText: answer }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      setSelected(null);
      setAnswer("");
      fetchQuestions();
    } catch {
      alert("Imeshindikana kutuma jibu");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: number, questionText: string) => {
    if (!confirm(`Una uhakika unataka kufuta swali?\n"${questionText}"`))
      return;

    try {
      const res = await fetch("/api/admin/questions/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      setQuestions(prev => prev.filter(q => q.id !== id));
    } catch {
      alert("Imeshindikana kufuta swali");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Maswali ya Vijana</h1>
      <TableSearch value={search} onChange={setSearch} />

      <DataTable>
        <TableHeader columns={["Swali", "Aliyeuliza", "Jibu", "Status", "Actions"]} />
        <tbody>
          {data.map(q => (
            <TableRow key={q.id}>
              <td className="px-4 py-3 max-w-75 truncate">{q.questionText}</td>
              <td className="px-4 py-3">{q.User?.fullName || "-"}</td>
              <td className="px-4 py-3 max-w-75 truncate">{q.answerText || "-"}</td>
              <td className="px-4 py-3"><StatusBadge status={q.status} /></td>
              <td className="px-4 py-3">
                <CategoryActions
                  onView={() => setViewing(q)}
                  onEdit={() => { setSelected(q); setAnswer(q.answerText || ""); }}
                  onDelete={() => handleDelete(q.id, q.questionText)}
                />
              </td>
            </TableRow>
          ))}
        </tbody>
      </DataTable>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {/* ANSWER MODAL */}
      <Modal title="Jibu Swali" open={!!selected} onClose={() => setSelected(null)}>
        <div className="space-y-4">
          <p className="text-sm font-medium">{selected?.questionText}</p>
          <textarea
            rows={4}
            className="w-full border rounded-lg p-2"
            placeholder="Andika jibu hapa..."
            value={answer}
            onChange={e => setAnswer(e.target.value)}
          />
          <button onClick={submitAnswer} className="w-full bg-blue-600 text-white py-2 rounded-lg">
            Tuma Jibu
          </button>
        </div>
      </Modal>

      {/* VIEW MODAL */}
      <Modal title="Maelezo ya Swali" open={!!viewing} onClose={() => setViewing(null)}>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Swali</p>
            <p className="bg-gray-100 p-3 rounded">{viewing?.questionText}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Jibu</p>
            <p className="bg-gray-100 p-3 rounded">{viewing?.answerText || "Bado halijajibiwa"}</p>
          </div>
          <div className="flex justify-end">{viewing && <StatusBadge status={viewing.status} />}</div>
        </div>
      </Modal>
    </div>
  );
}
