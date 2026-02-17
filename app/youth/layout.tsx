import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import YouthShell from "./YouthShell";

export default async function YouthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== "YOUTH") {
    redirect("/login");
  }

  return <YouthShell user={user}>{children}</YouthShell>;
}
