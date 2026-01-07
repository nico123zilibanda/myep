import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "@/lib/auth";
import * as XLSX from "xlsx";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return new Response("Unauthorized", { status: 401 });

  const { data: youth, error } = await supabase
    .from("User")
    .select("fullName, email, phone, educationLevel, isActive, createdAt")
    .eq("role", "YOUTH")
    .order("createdAt", { ascending: false });

  if (error) return new Response(error.message, { status: 500 });

  const data = youth.map(v => ({
    "Full Name": v.fullName,
    Email: v.email,
    Phone: v.phone ?? "",
    "Education Level": v.educationLevel ?? "",
    Status: v.isActive ? "Active" : "Inactive",
    "Created At": new Date(v.createdAt).toISOString().split("T")[0],
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Vijana");

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=vijana.xlsx",
    },
  });
}
