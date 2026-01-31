import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { getRequestMetaFromReq } from "@/lib/requestMeta";
import { MessageKey } from "@/lib/messages";
export const runtime = "nodejs";

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    const meta = getRequestMetaFromReq(req);

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, messageKey: "UNAUTHORIZED" satisfies MessageKey},
        { status: 401 }
      );
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" satisfies MessageKey},
        { status: 400 }
      );
    }

    const { data: question } = await supabaseAdmin
      .from("Question")
      .select("questionText")
      .eq("id", id)
      .single();

    const { error } = await supabaseAdmin
      .from("Question")
      .delete()
      .eq("id", Number(id));

    if (error) {
      console.error("SUPABASE DELETE QUESTION ERROR:", error);
      return NextResponse.json(
        { success: false, messageKey: "QUESTION_DELETE_FAILED" satisfies MessageKey},
        { status: 500 }
      );
    }

    logAudit({
      action: "DELETE",
      entity: "QUESTION",
      entityId: id,
      description: `Deleted question: ${question?.questionText}`,
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      messageKey: "QUESTION_DELETE_SUCCESS" satisfies MessageKey,
    });
  } catch (error) {
    console.error("DELETE QUESTION ERROR:", error);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey},
      { status: 500 }
    );
  }
}
