import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import * as XLSX from "xlsx";

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

  const data = vijana.map(v => ({
    "Full Name": v.fullName,
    Email: v.email,
    Phone: v.phone ?? "",
    "Education Level": v.educationLevel ?? "",
    Status: v.isActive ? "Active" : "Inactive",
    "Created At": v.createdAt.toISOString().split("T")[0],
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Vijana");

  const buffer = XLSX.write(workbook, {
    type: "buffer",
    bookType: "xlsx",
  });

  return new Response(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=vijana.xlsx",
    },
  });
}
