// app/api/admin/youth/export/excel/route.ts
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import * as XLSX from "xlsx";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN")
    return new Response("Unauthorized", { status: 401 });

  const { data: youth, error } = await supabaseAdmin
    .from("User")
    .select("fullName, email, phone, educationLevel, program, employmentStatus, isActive, createdAt")
    .eq("roleId", 1) // ✅ YOUTH roleId
    .order("createdAt", { ascending: false });

  if (error) return new Response(error.message, { status: 500 });

  const data = youth.map(v => ({
    "Jina Kamili": v.fullName,
    "Email": v.email,
    "Simu": v.phone ?? "",
    "Elimu": v.educationLevel ?? "",
    "Taaluma": v.program ?? "",
    "Ajira": v.employmentStatus ?? "",
    "Hali": v.isActive ? "Active" : "Inactive",
    "Tarehe": new Date(v.createdAt).toISOString().split("T")[0],
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Vijana");

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  return new Response(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=vijana.xlsx",
    },
  });
}
