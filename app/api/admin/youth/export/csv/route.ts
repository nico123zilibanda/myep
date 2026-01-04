import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.Role.name !== "ADMIN") {
    return new Response("Unauthorized", { status: 401 });
  }

  const youthRole = await prisma.role.findFirst({
    where: { name: "YOUTH" },
  });

  if (!youthRole) {
    return new Response("", { status: 200 });
  }

  const vijana = await prisma.user.findMany({
    where: { roleId: youthRole.id },
    orderBy: { createdAt: "desc" },
    select: {
      fullName: true,
      email: true,
      phone: true,
      educationLevel: true,
      isActive: true,
      createdAt: true,
    },
  });

  const header = [
    "Full Name",
    "Email",
    "Phone",
    "Education Level",
    "Status",
    "Created At",
  ];

  const rows = vijana.map(v => [
    v.fullName,
    v.email,
    v.phone ?? "",
    v.educationLevel ?? "",
    v.isActive ? "Active" : "Inactive",
    v.createdAt.toISOString().split("T")[0],
  ]);

  const csv = [header, ...rows]
    .map(row => row.map(val => `"${val}"`).join(","))
    .join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=vijana.csv",
    },
  });
}
