import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.Role.name !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, answerText } = await req.json();

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { message: "Invalid question ID" },
        { status: 400 }
      );
    }

    if (!answerText || !answerText.trim()) {
      return NextResponse.json(
        { message: "Answer is required" },
        { status: 400 }
      );
    }

    const updated = await prisma.question.update({
      where: { id: Number(id) },
      data: {
        answerText: answerText.trim(),
        status: "ANSWERED",      // ✅ MUHIMU SANA
        answeredAt: new Date(),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("UPDATE question error:", error);
    return NextResponse.json(
      { message: "Failed to update question" },
      { status: 500 }
    );
  }
}
