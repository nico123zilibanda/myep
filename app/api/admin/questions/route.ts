import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import { MessageKey } from "@/lib/messages";

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, messageKey: "UNAUTHORIZED" satisfies MessageKey},
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const status = url.searchParams.get("status");

    let query = supabaseAdmin
      .from("Question")
      .select(`*, User:userId (id, fullName, email)`)
      .order("createdAt", { ascending: false });

    if (status === "PENDING") {
      query = query.eq("status", "PENDING");
    }

    const { data, error } = await query;

    if (error) {
      console.error("SUPABASE GET QUESTIONS ERROR:", error);
      return NextResponse.json(
        { success: false, messageKey: "QUESTION_FETCH_FAILED" satisfies MessageKey},
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageKey: "QUESTION_FETCH_SUCCESS" satisfies MessageKey,
      data,
    });
  } catch (error) {
    console.error("GET QUESTIONS ERROR:", error);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey},
      { status: 500 }
    );
  }
}
