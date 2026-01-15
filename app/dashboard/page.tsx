import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  console.log("Dashboard getCurrentUser:", user);

  if (!user) {
    console.log("No user found, redirecting to /login");
    return redirect("/login");
  }

  // Role-based redirect
  if (user.role === "ADMIN") return redirect("/admin");
  if (user.role === "YOUTH") return redirect("/youth");

  return redirect("/login"); // fallback
}
