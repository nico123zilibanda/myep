"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import { TableRow } from "@/components/table/TableRow";
import TableSearch from "@/components/table/TableSearch";
import Pagination from "@/components/table/Pagination";
import Modal from "@/components/ui/Modal";
import OpportunityForm from "@/components/forms/OpportunityForm";
import ActionButtons from "@/components/table/ActionButtons";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchOpportunities = async () => {
    try {
      const res = await fetch("/api/admin/opportunities");
      if (!res.ok) throw new Error("Failed to load opportunities");
      const data = await res.json();
      setOpportunities(data);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchOpportunities();
    fetchCategories();
  }, []);

  const filtered = opportunities.filter(o =>
    o.title.toLowerCase().includes(search.toLowerCase())
  );

  const perPage = 5;
  const totalPages = Math.ceil(filtered.length / perPage);
  const data = filtered.slice((page - 1) * perPage, page * perPage);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Una hakika unataka kufuta opportunity: "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/opportunities/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) return alert(data.message);
      setOpportunities(prev => prev.filter(o => o.id !== id));
    } catch (error) {}
  };

  const handleEdit = async (id: number, form: any) => {
    try {
      const res = await fetch(`/api/admin/opportunities/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message);
      setOpen(false);
      setEditing(null);
      fetchOpportunities();
    } catch (error) {}
  };

  const handleSubmit = async (form: any) => {
    if (editing) {
      await handleEdit(editing.id, form);
    } else {
      try {
        const res = await fetch("/api/admin/opportunities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Failed to create opportunity");
        setOpen(false);
        fetchOpportunities();
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Opportunities</h1>
        <button
          onClick={() => { setEditing(null); setOpen(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Ongeza Opportunity
        </button>
      </div>

      <Modal
        title={editing ? "Hariri Opportunity" : "Ongeza Opportunity"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <OpportunityForm
          categories={categories}
          initialData={editing}
          onSubmit={handleSubmit}
        />
      </Modal>

      <TableSearch value={search} onChange={setSearch} />

      <DataTable>
        <TableHeader columns={["Title", "Deadline", "Category", "Actions"]} />
        <tbody>
          {data.map(o => (
            <TableRow key={o.id}>
              <td className="px-4 py-3">{o.title}</td>
              <td className="px-4 py-3">{new Date(o.deadline).toLocaleDateString()}</td>
              <td className="px-4 py-3">{o.Category?.name}</td>
              <td className="px-4 py-3">
                <ActionButtons
                  onEdit={() => { setEditing(o); setOpen(true); }}
                  onDelete={() => handleDelete(o.id, o.title)}
                  status={o.status}
                />
              </td>
            </TableRow>
          ))}
        </tbody>
      </DataTable>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
