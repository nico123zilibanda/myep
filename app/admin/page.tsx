import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AdminDashboard from "./AdminDashboard";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

interface Stats {
  vijanaCount: number;
  opportunitiesCount: number;
  trainingsCount: number;
  questionsCount: number;
}

export default async function AdminPage() {
  const user = await getCurrentUser(); 

  // Auth + Role check (SERVER SIDE)
  if (!user) {
    redirect("/login");  // Redirect if the user is not logged in
    return;
  }

  if (user.role !== "ADMIN") {
    redirect("/login");  // Redirect if the user is not an admin
    return;
  }

  try {
    const stats: Stats = await fetchAdminStats();
    return <AdminDashboard stats={stats} />;
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return (
      <div className="p-4 text-red-500">
        <h3>Something went wrong while fetching data. Please try again later.</h3>
      </div>
    );
  }
}

async function fetchAdminStats(): Promise<Stats> {
  const [
    { count: vijanaCount },
    { count: opportunitiesCount },
    { count: trainingsCount },
    { count: questionsCount },
  ] = await Promise.all([
    supabaseAdmin
      .from("User")
      .select("*", { count: "exact", head: true })
      .eq("roleId", 1),

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

  return {
    vijanaCount: vijanaCount ?? 0,
    opportunitiesCount: opportunitiesCount ?? 0,
    trainingsCount: trainingsCount ?? 0,
    questionsCount: questionsCount ?? 0,
  };
}
