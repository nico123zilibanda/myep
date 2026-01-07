// app/admin/page.tsx
import { getCurrentUser } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const user = await getCurrentUser();

  // 🔐 Auth + Role check
  if (!user || user.role !== "ADMIN") {
    return <div className="p-6">Unauthorized</div>;
  }

  // 📊 COUNTS (Supabase Admin)
  const [
    { count: vijanaCount },
    { count: opportunitiesCount },
    { count: trainingsCount },
    { count: questionsCount },
  ] = await Promise.all([
    supabaseAdmin
      .from("User")
      .select("*", { count: "exact", head: true })
      .eq("roleId", 1), // YOUTH

    supabaseAdmin
      .from("Opportunity")
      .select("*", { count: "exact", head: true }),

    supabaseAdmin
      .from("Training")
      .select("*", { count: "exact", head: true }),

    supabaseAdmin
      .from("Question")
      .select("*", { count: "exact", head: true }),
  ]);

  return (
    <AdminDashboard
      stats={{
        vijanaCount: vijanaCount ?? 0,
        opportunitiesCount: opportunitiesCount ?? 0,
        trainingsCount: trainingsCount ?? 0,
        questionsCount: questionsCount ?? 0,
      }}
    />
  );
}
