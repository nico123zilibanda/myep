import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ count: 0 }, { status: 401 });
    }

    const pendingCount = await prisma.question.count({
      where: { status: "PENDING" },
    });

    return NextResponse.json({ count: pendingCount });
  } catch (err) {
    console.error("NOTIFICATIONS COUNT ERROR:", err);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
