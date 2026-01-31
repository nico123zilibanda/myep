import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  console.log(" DASHBOARD USER:", user);

  if (!user) return redirect("/login");

  if (user.role === "ADMIN") return redirect("/admin");
  if (user.role === "YOUTH") return redirect("/youth");

  return redirect("/login");
}
