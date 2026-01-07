import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

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

    const { data, error } = await supabaseAdmin
      .from("Question")
      .update({
        answerText: answerText.trim(),
        status: "ANSWERED",
        answeredAt: new Date().toISOString(),
      })
      .eq("id", Number(id))
      .select()
      .single();

    if (error) {
      console.error("SUPABASE UPDATE QUESTION ERROR:", error);
      return NextResponse.json(
        { message: "Failed to update question" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("PATCH QUESTION ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
