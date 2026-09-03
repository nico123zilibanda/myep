
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
      <section
        role="alert"
        className="
          rounded-xl
          border border-destructive/30
          bg-destructive/10
          p-6
        "
      >
        <h3 className="font-semibold text-destructive">
          Kuna tatizo la kupakia taarifa
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Tafadhali jaribu tena baadae.
        </p>
      </section>
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
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("roleId", 1),

    supabaseAdmin
      .from("Opportunity")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabaseAdmin
      .from("Training")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabaseAdmin
      .from("Question")
      .select("*", {
        count: "exact",
        head: true,
      }),
  ]);

  return {
    vijanaCount: vijanaCount ?? 0,
    opportunitiesCount: opportunitiesCount ?? 0,
    trainingsCount: trainingsCount ?? 0,
    questionsCount: questionsCount ?? 0,
  };
}

