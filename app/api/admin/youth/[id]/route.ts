// app/api/admin/youth/[id]/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { getRequestMetaFromReq } from "@/lib/requestMeta";
import { MessageKey } from "@/lib/messages";

export const runtime = "nodejs";

/* ===================== HELPER ===================== */
const getIdFromReq = (req: Request) => {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  return id ? Number(id) : null;
};

/* ===================== PATCH (UPDATE STATUS) ===================== */
export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    const meta = getRequestMetaFromReq(req);

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, messageKey: "UNAUTHORIZED" satisfies MessageKey },
        { status: 401 }
      );
    }

    const id = getIdFromReq(req);
    if (!id) {
      return NextResponse.json(
        { success: false, messageKey: "YOUTH_NOT_FOUND" satisfies MessageKey },
        { status: 400 }
      );
    }

    const { isActive } = await req.json();

    if (typeof isActive !== "boolean") {
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" satisfies MessageKey },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("User")
      .update({ isActive })
      .eq("id", id)
      .select("id, fullName, email, isActive")
      .single();

    if (error || !data) {
      console.error("UPDATE YOUTH ERROR:", error);
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" satisfies MessageKey },
        { status: 500 }
      );
    }

    /* ========== AUDIT LOG ========== */
    logAudit({
      action: "UPDATE",
      entity: "YOUTH",
      entityId: id,
      description: `Youth "${data.fullName ?? data.email}" status updated to ${
        isActive ? "ACTIVE" : "INACTIVE"
      }`,
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      messageKey: "YOUTH_STATUS_UPDATE_SUCCESS" satisfies MessageKey,
      data,
    });
  } catch (err) {
    console.error("PATCH YOUTH ERROR:", err);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey },
      { status: 500 }
    );
  }
}

/* ===================== DELETE YOUTH ===================== */
export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    const meta = getRequestMetaFromReq(req);

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, messageKey: "UNAUTHORIZED" satisfies MessageKey },
        { status: 401 }
      );
    }

    const id = getIdFromReq(req);
    if (!id) {
      return NextResponse.json(
        { success: false, messageKey: "YOUTH_NOT_FOUND" satisfies MessageKey },
        { status: 400 }
      );
    }

    const { data: youth } = await supabaseAdmin
      .from("User")
      .select("fullName, email")
      .eq("id", id)
      .single();

    const { error } = await supabaseAdmin
      .from("User")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE YOUTH ERROR:", error);
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" satisfies MessageKey },
        { status: 500 }
      );
    }

    /* ========== AUDIT LOG ========== */
    logAudit({
      action: "DELETE",
      entity: "YOUTH",
      entityId: id,
      description: `Youth "${youth?.fullName ?? youth?.email ?? "Unknown"}" deleted`,
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      messageKey: "YOUTH_DELETE_SUCCESS" satisfies MessageKey,
    });
  } catch (err) {
    console.error("DELETE YOUTH ERROR:", err);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey },
      { status: 500 }
    );
  }
}
