import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { getRequestMetaFromReq } from "@/lib/requestMeta";

export const runtime = "nodejs";

const ALLOWED_STATUSES = ["PUBLISHED", "DRAFT", "CLOSED"];

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    const meta = getRequestMetaFromReq(req);

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, messageKey: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const id = Number(url.pathname.split("/")[4]);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, messageKey: "OPPORTUNITY_NOT_FOUND" },
        { status: 400 }
      );
    }

    const { status } = await req.json();

    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        { success: false, messageKey: "INVALID_STATUS" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("Opportunity")
      .update({
        status,
        updatedAt: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" },
        { status: 500 }
      );
    }

    logAudit({
      action: "STATUS_CHANGE",
      entity: "OPPORTUNITY",
      entityId: id,
      description: `Status changed to "${status}"`,
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      messageKey: "STATUS_UPDATED",
      data,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}