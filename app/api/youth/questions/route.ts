// app/api/youth/questions/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

interface QuestionResponse {
  id: number;
  questionText: string;
  answerText: string | null;
  status: "PENDING" | "ANSWERED";
  createdAt: string;
  answeredAt: string | null;
}

/**
 * GET: Youth apate maswali yake mwenyewe
 */
export async function GET() {
  const user = await getCurrentUser();

  if (!user || user.Role.name !== "YOUTH") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const questions = await prisma.question.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        questionText: true,
        answerText: true,
        status: true,
        createdAt: true,
        answeredAt: true,
      },
    });

    // 🔹 Type-safe formatting
    const formatted: QuestionResponse[] = questions.map((q) => ({
      id: q.id,
      questionText: q.questionText,
      answerText: q.answerText ?? null,
      status: q.status as "PENDING" | "ANSWERED",
      createdAt: q.createdAt.toISOString(),
      answeredAt: q.answeredAt ? q.answeredAt.toISOString() : null,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("GET youth questions error:", error);
    return NextResponse.json({ message: "Failed to load questions" }, { status: 500 });
  }
}

/**
 * POST: Youth aulize swali
 */
export async function POST(req: Request) {
  const user = await getCurrentUser();

  if (!user || user.Role.name !== "YOUTH") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: { questionText?: string } = await req.json();
    const questionText = body.questionText?.trim();

    if (!questionText) {
      return NextResponse.json({ message: "Question is required" }, { status: 400 });
    }

    const question = await prisma.question.create({
      data: {
        questionText,
        userId: user.id,
        status: "PENDING", // 🔹 default status
      },
      select: {
        id: true,
        questionText: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        id: question.id,
        questionText: question.questionText,
        status: question.status as "PENDING",
        createdAt: question.createdAt.toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST youth question error:", error);
    return NextResponse.json({ message: "Failed to submit question" }, { status: 500 });
  }
}
