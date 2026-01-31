import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import type { MessageKey } from "@/lib/messages";

/* ================= TYPES ================= */
interface QuestionResponse {
  id: number;
  questionText: string;
  answerText: string | null;
  status: "PENDING" | "ANSWERED";
  createdAt: string;
  answeredAt: string | null;
}

interface ApiResponse<T = any> {
  success: boolean;
  messageKey: MessageKey;
  data?: T;
}

/* ================= GET: Youth apate maswali yake ================= */
export async function GET() {
  const user = await getCurrentUser();

  if (!user || user.role !== "YOUTH") {
    return NextResponse.json<ApiResponse>(
      { success: false, messageKey: "UNAUTHORIZED" satisfies MessageKey},
      { status: 401 }
    );
  }

  try {
    const { data: questions, error } = await supabaseAdmin
      .from("Question")
      .select("*")
      .eq("userId", user.id)
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("SUPABASE GET QUESTIONS ERROR:", error);
      return NextResponse.json<ApiResponse>(
        { success: false, messageKey: "QUESTION_FETCH_FAILED" satisfies MessageKey},
        { status: 500 }
      );
    }

    // 🔹 formatting inabaki exactly kama ilivyokuwa
    const formatted: QuestionResponse[] = (questions || []).map((q: any) => ({
      id: q.id,
      questionText: q.questionText,
      answerText: q.answerText ?? null,
      status: q.status as "PENDING" | "ANSWERED",
      createdAt: new Date(q.createdAt).toISOString(),
      answeredAt: q.answeredAt
        ? new Date(q.answeredAt).toISOString()
        : null,
    }));

    return NextResponse.json<ApiResponse<QuestionResponse[]>>({
      success: true,
      messageKey: "QUESTION_FETCH_SUCCESS",
      data: formatted,
    });
  } catch (error) {
    console.error("YOUTH GET QUESTIONS ERROR:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey},
      { status: 500 }
    );
  }
}

/* ================= POST: Youth aulize swali ================= */
export async function POST(req: Request) {
  const user = await getCurrentUser();

  if (!user || user.role !== "YOUTH") {
    return NextResponse.json<ApiResponse>(
      { success: false, messageKey: "UNAUTHORIZED" satisfies MessageKey},
      { status: 401 }
    );
  }

  try {
    const body: { questionText?: string } = await req.json();
    const questionText = body.questionText?.trim();

    if (!questionText) {
      return NextResponse.json<ApiResponse>(
        { success: false, messageKey: "ACTION_FAILED" satisfies MessageKey},
        { status: 400 }
      );
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
      return NextResponse.json<ApiResponse>(
        { success: false, messageKey: "QUESTION_CREATE_FAILED" satisfies MessageKey},
        { status: 500 }
      );
    }

    // 🔹 Audit log inabaki
    logAudit({
      action: "CREATE",
      entity: "QUESTION",
      entityId: question.id,
      description: "Youth submitted a new question",
      userId: user.id,
    }).catch(console.error);

    // 🔹 response formatted kama mwanzo (ila sasa ndani ya data)
    return NextResponse.json<ApiResponse<QuestionResponse>>(
      {
        success: true,
        messageKey: "QUESTION_CREATE_SUCCESS" satisfies MessageKey,
        data: {
          id: question.id,
          questionText: question.questionText,
          answerText: null,
          status: question.status as "PENDING",
          createdAt: new Date(question.createdAt).toISOString(),
          answeredAt: null,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("YOUTH POST QUESTION ERROR:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey},
      { status: 500 }
    );
  }
}
