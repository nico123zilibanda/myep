import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import { getRequestMetaFromReq } from "@/lib/requestMeta";
import { logAudit } from "@/lib/audit";
import { MessageKey } from "@/lib/messages";

export const runtime = "nodejs";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await params (Next 15)

    const user = await getCurrentUser();
    const meta = getRequestMetaFromReq(req);

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, messageKey: "UNAUTHORIZED" satisfies MessageKey },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" satisfies MessageKey },
        { status: 400 }
      );
    }

    // confirm record exists
    const { data: existing } = await supabaseAdmin
      .from("AuditLog")
      .select("id")
      .eq("id", id)
      .single();

    if (!existing) {
      return NextResponse.json(
        { success: false, messageKey: "AUDIT_NOT_FOUND" satisfies MessageKey },
        { status: 404 }
      );
    }

    const { error } = await supabaseAdmin.from("AuditLog").delete().eq("id", id);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" satisfies MessageKey },
        { status: 500 }
      );
    }

    // audit delete action
    logAudit({
      action: "DELETE",
      entity: "AUDIT_LOG",
      entityId: id,
      description: "Audit log deleted",
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      messageKey: "AUDIT_DELETE_SUCCESS" satisfies MessageKey,
    });
  } catch (err) {
    console.error("DELETE AUDIT ERROR:", err);

    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey },
      { status: 500 }
    );
  }
}
