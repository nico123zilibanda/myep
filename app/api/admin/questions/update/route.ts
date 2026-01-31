import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { getRequestMetaFromReq } from "@/lib/requestMeta";
import { MessageKey } from "@/lib/messages";

export const runtime = "nodejs";

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    const meta = getRequestMetaFromReq(req);

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, messageKey: "UNAUTHORIZED" satisfies MessageKey},
        { status: 401 }
      );
    }

    const { id, answerText } = await req.json();

    if (!id || !answerText?.trim()) {
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" satisfies MessageKey},
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
        { success: false, messageKey: "QUESTION_UPDATE_FAILED" satisfies MessageKey},
        { status: 500 }
      );
    }

    logAudit({
      action: "UPDATE",
      entity: "QUESTION",
      entityId: id,
      description: "Question answered",
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      messageKey: "QUESTION_UPDATE_SUCCESS" satisfies MessageKey,
      data,
    });
  } catch (error) {
    console.error("PATCH QUESTION ERROR:", error);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey},
      { status: 500 }
    );
  }
}
