import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.Role?.name !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status");

    const questions = await prisma.question.findMany({
      where: status === "PENDING" ? { status: "PENDING" } : undefined,
      orderBy: { createdAt: "desc" },
      include: {
        User: {
          select: {
            fullName: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error("GET questions error:", error);
    return NextResponse.json(
      { message: "Failed to load questions" },
      { status: 500 }
    );
  }
}
