import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

/**
 * GET: Youth apate maswali yake mwenyewe
 */
export async function GET() {
  const user = await getCurrentUser();

  if (!user || user.Role.name !== "YOUTH") {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const questions = await prisma.question.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error("GET youth questions error:", error);
    return NextResponse.json(
      { message: "Failed to load questions" },
      { status: 500 }
    );
  }
}

/**
 * POST: Youth aulize swali
 */
export async function POST(req: Request) {
  const user = await getCurrentUser();

  if (!user || user.Role.name !== "YOUTH") {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { questionText } = await req.json();

    if (!questionText || !questionText.trim()) {
      return NextResponse.json(
        { message: "Question is required" },
        { status: 400 }
      );
    }

    const question = await prisma.question.create({
      data: {
        questionText,
        userId: user.id,
      },
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error("POST youth question error:", error);
    return NextResponse.json(
      { message: "Failed to submit question" },
      { status: 500 }
    );
  }
}
