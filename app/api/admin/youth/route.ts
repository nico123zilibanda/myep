import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();

  if (!user || user.Role.name !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const youthRole = await prisma.role.findFirst({
    where: { name: "YOUTH" },
  });

  if (!youthRole) {
    return NextResponse.json([], { status: 200 });
  }

  const vijana = await prisma.user.findMany({
    where: { roleId: youthRole.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      educationLevel: true,
      isActive: true,
      createdAt: true,
    },
  });

  return NextResponse.json(vijana);
}
