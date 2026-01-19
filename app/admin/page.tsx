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

  // ================= AUTH & ROLE CHECK =================
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/login");

  // ================= DATA =================
  try {
    const stats = await fetchAdminStats();
    return <AdminDashboard stats={stats} />;
  } catch (error) {
    console.error("Error fetching admin stats:", error);

    return (
      <div className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-900/20 p-6">
        <h3 className="font-semibold text-red-600">
          Kuna tatizo la kupakia taarifa
        </h3>
        <p className="text-sm text-red-500 mt-1">
          Tafadhali jaribu tena baadae.
        </p>
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
      .select
      ("*", 
        { count: "exact", 
          head: true })
      .eq("roleId", 1),

    supabaseAdmin
      .from("Opportunity")
      .select("*", 
        { count: "exact", 
          head: true 
        }),

    supabaseAdmin
      .from("Training")
      .select("*", 
        { count: "exact",
           head: true 
          }),

    supabaseAdmin
      .from("Question")
      .select("*", 
        { count: "exact", 
        head: true 
      }),
  ]);

  return {
    vijanaCount: vijanaCount ?? 0,
    opportunitiesCount: opportunitiesCount ?? 0,
    trainingsCount: trainingsCount ?? 0,
    questionsCount: questionsCount ?? 0,
  };
}
 