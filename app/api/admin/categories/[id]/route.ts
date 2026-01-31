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
  const id = url.pathname.split("/").pop(); // last part of URL
  return id ? Number(id) : null;
};

/* ===================== GET CATEGORY ===================== */
export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, messageKey: "UNAUTHORIZED" satisfies MessageKey },
        { status: 401 }
      );
    }

    const id = getIdFromReq(req);
    if (!id) {
      return NextResponse.json(
        { success: false, messageKey: "CATEGORY_NOT_FOUND" satisfies MessageKey },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("Category")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, messageKey: "CATEGORY_NOT_FOUND" satisfies MessageKey },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("GET CATEGORY ERROR:", err);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey },
      { status: 500 }
    );
  }
}

/* ===================== PATCH CATEGORY ===================== */
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
        { success: false, messageKey: "CATEGORY_NOT_FOUND" satisfies MessageKey },
        { status: 400 }
      );
    }

    const { name, description } = await req.json();

    if (!name) {
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" satisfies MessageKey },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("Category")
      .update({ name, description })
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
      entity: "CATEGORY",
      entityId: id,
      description: `Category updated to "${name}"`,
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      messageKey: "CATEGORY_UPDATE_SUCCESS" satisfies MessageKey,
      data,
    });
  } catch (err) {
    console.error("PATCH CATEGORY ERROR:", err);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey },
      { status: 500 }
    );
  }
}

/* ===================== DELETE CATEGORY ===================== */
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
        { success: false, messageKey: "CATEGORY_NOT_FOUND" satisfies MessageKey },
        { status: 400 }
      );
    }

    const { data: category } = await supabaseAdmin
      .from("Category")
      .select("name")
      .eq("id", id)
      .single();

    const { error } = await supabaseAdmin
      .from("Category")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { success: false, messageKey: "CATEGORY_FAILED_DELETED" satisfies MessageKey },
        { status: 500 }
      );
    }

    logAudit({
      action: "DELETE",
      entity: "CATEGORY",
      entityId: id,
      description: `Category "${category?.name ?? "Unknown"}" deleted`,
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      messageKey: "CATEGORY_DELETE_SUCCESS" satisfies MessageKey,
    });
  } catch (err) {
    console.error("DELETE CATEGORY ERROR:", err);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey },
      { status: 500 }
    );
  }
}
