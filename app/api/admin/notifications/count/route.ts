import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();

  if (!user || user.Role.name !== "ADMIN") {
    return NextResponse.json({ count: 0 }, { status: 401 });
  }

  // 🔔 Maswali mapya = PENDING
  const pendingCount = await prisma.question.count({
    where: {
      status: "PENDING",
    },
  });

  return NextResponse.json({ count: pendingCount });
}
