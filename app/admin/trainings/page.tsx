"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableRow  from "@/components/table/TableRow";
import Pagination from "@/components/table/Pagination";
import Modal from "@/components/ui/Modal";
import TrainingsForm from "@/components/forms/TrainingsForm";
import CategoryActions from "@/components/table/CategoryActions";
import TableSearch from "@/components/table/TableSearch";

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");


  const fetchTrainings = async () => {
    const res = await fetch("/api/admin/trainings");
    const data = await res.json();
    setTrainings(data);
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const filtered = trainings.filter(t =>
  t.title.toLowerCase().includes(search.toLowerCase()) ||
  t.type.toLowerCase().includes(search.toLowerCase())
  );

  const perPage = 5;
  const totalPages = Math.ceil(filtered.length / perPage);
  const data = filtered.slice((page - 1) * perPage, page * perPage);


  // DELETE
  const handleDelete = async (id: number) => {
    if (!confirm("Una uhakika unataka kufuta training?")) return;

    const res = await fetch(`/api/admin/trainings/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setTrainings(prev => prev.filter(t => t.id !== id));
    }
  };

// CREATE / UPDATE
const handleSubmit = async (formData: FormData) => {
  if (editing) {
    await fetch(`/api/admin/trainings/${editing.id}`, {
      method: "PATCH",
      body: formData, // ✅ NO headers
    });
  } else {
    await fetch("/api/admin/trainings", {
      method: "POST",
      body: formData, // ✅ NO headers
    });
  }

  setOpen(false);
  setEditing(null);
  fetchTrainings();
};

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Trainings</h1>
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Ongeza Training
        </button>
      </div>

      <Modal
        title={editing ? "Hariri Training" : "Ongeza Training"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <TrainingsForm initialData={editing} onSubmit={handleSubmit} />
      </Modal>
      <TableSearch value={search} onChange={setSearch} />

      <DataTable>
        <TableHeader columns={["Title", "Type", "URL", "Actions"]} />
        <tbody>
          {data.map(t => (
            <TableRow key={t.id}>
              <td className="px-4 py-3">{t.title}</td>
              <td className="px-4 py-3">{t.type}</td>
              <td className="px-4 py-3 truncate">{t.resourceUrl}</td>
              <td className="px-4 py-3">
                <CategoryActions
                  onEdit={() => {
                    setEditing(t);
                    setOpen(true);
                  }}
                  onDelete={() => handleDelete(t.id)}
                />
              </td>
            </TableRow>
          ))}
        </tbody>
      </DataTable>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
