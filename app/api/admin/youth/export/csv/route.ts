import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return new Response("Unauthorized", { status: 401 });

  const { data: youth, error } = await supabase
    .from("User")
    .select("fullName, email, phone, educationLevel, isActive, createdAt")
    .eq("role", "YOUTH")
    .order("createdAt", { ascending: false });

  if (error) return new Response(error.message, { status: 500 });

  const header = ["Full Name", "Email", "Phone", "Education Level", "Status", "Created At"];
  const rows = youth.map(v => [
    v.fullName,
    v.email,
    v.phone ?? "",
    v.educationLevel ?? "",
    v.isActive ? "Active" : "Inactive",
    new Date(v.createdAt).toISOString().split("T")[0],
  ]);

  const csv = [header, ...rows].map(r => r.map(val => `"${val}"`).join(",")).join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=youth.csv",
    },
  });
}
