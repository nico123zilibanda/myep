import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
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

  if (!user || user.role !== "YOUTH") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data: questions, error } = await supabaseAdmin
      .from("Question")
      .select("*")
      .eq("userId", user.id)
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("SUPABASE GET QUESTIONS ERROR:", error);
      return NextResponse.json({ message: "Failed to load questions" }, { status: 500 });
    }

    const formatted: QuestionResponse[] = (questions || []).map((q: any) => ({
      id: q.id,
      questionText: q.questionText,
      answerText: q.answerText ?? null,
      status: q.status as "PENDING" | "ANSWERED",
      createdAt: new Date(q.createdAt).toISOString(),
      answeredAt: q.answeredAt ? new Date(q.answeredAt).toISOString() : null,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("YOUTH GET QUESTIONS ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

/**
 * POST: Youth aulize swali
 */
export async function POST(req: Request) {
  const user = await getCurrentUser();

  if (!user || user.role !== "YOUTH") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: { questionText?: string } = await req.json();
    const questionText = body.questionText?.trim();

    if (!questionText) {
      return NextResponse.json({ message: "Question is required" }, { status: 400 });
    }

    const { data: question, error } = await supabaseAdmin
      .from("Question")
      .insert({
        questionText,
        userId: user.id,
        status: "PENDING",
      })
      .select()
      .single();

    if (error) {
      console.error("SUPABASE POST QUESTION ERROR:", error);
      return NextResponse.json({ message: "Failed to submit question" }, { status: 500 });
    }

    return NextResponse.json({
      id: question.id,
      questionText: question.questionText,
      status: question.status as "PENDING",
      createdAt: new Date(question.createdAt).toISOString(),
    }, { status: 201 });

  } catch (error) {
    console.error("YOUTH POST QUESTION ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
