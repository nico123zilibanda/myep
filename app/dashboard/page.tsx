import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export default async function DashboardRedirect() {
  const cookieStore = await cookies(); // ✅ muhimu sana
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let decoded: any;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    redirect("/login");
  }

  if (decoded.role === "ADMIN") {
    redirect("/admin");
  }

  if (decoded.role === "YOUTH") {
    redirect("/youth");
  }

  redirect("/login");
}
