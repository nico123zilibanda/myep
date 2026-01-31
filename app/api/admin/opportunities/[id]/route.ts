import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { getRequestMetaFromReq } from "@/lib/requestMeta";
import { MessageKey } from "@/lib/messages";

export const runtime = "nodejs";

// ================= DELETE OPPORTUNITY =================
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

    const url = new URL(req.url);
    const id = Number(url.pathname.split("/").pop());

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, messageKey: "OPPORTUNITY_NOT_FOUND" satisfies MessageKey },
        { status: 400 }
      );
    }

    const { data: opportunity } = await supabaseAdmin
      .from("Opportunity")
      .select("title")
      .eq("id", id)
      .single();

    const { error } = await supabaseAdmin
      .from("Opportunity")
      .delete()
      .eq("id", id);
    if (error) {
      return NextResponse.json(
        { success: false, messageKey: "OPPORTUNITY_FAILED_DELETED" satisfies MessageKey },
        { status: 500 }
      );
    }
    logAudit({
      action: "DELETE",
      entity: "OPPORTUNITY",
      entityId: id,
      description: `Opportunity "${opportunity?.title ?? "Unknown"}" deleted`,
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      messageKey: "OPPORTUNITY_DELETE_SUCCESS" satisfies MessageKey,
    });
  } catch (err) {
    console.error("DELETE OPPORTUNITY ERROR:", err);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey },
      { status: 500 }
    );
  }
}

// ================= UPDATE OPPORTUNITY =================
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

    const url = new URL(req.url);
    const id = Number(url.pathname.split("/").pop());

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, messageKey: "OPPORTUNITY_NOT_FOUND" satisfies MessageKey },
        { status: 400 }
      );
    }

    const {
      title,
      description,
      requirements,
      howToApply,
      deadline,
      location,
      attachmentUrl,
      status,
      categoryId,
    } = await req.json();

    if (!title || !deadline) {
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" satisfies MessageKey },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("Opportunity")
      .update({
        title,
        description: description || "",
        requirements: requirements || "",
        howToApply: howToApply || "",
        deadline: new Date(deadline).toISOString(),
        location: location || "",
        attachmentUrl: attachmentUrl || "",
        status: status || "PUBLISHED",
        categoryId: categoryId || null,
      })
      .eq("id", id)
      .select()
      .single();
    if (error || !data) {
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" satisfies MessageKey },
        { status: 500 }
      );
    }
    logAudit({
      action: "UPDATE",
      entity: "OPPORTUNITY",
      entityId: id,
      description: `Opportunity updated to "${data.title}"`,
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      messageKey: "OPPORTUNITY_UPDATE_SUCCESS" satisfies MessageKey,
      data,
    });

  } catch (err) {
    console.error("PATCH OPPORTUNITY ERROR:", err);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey },
      { status: 500 }
    );
  }
}
