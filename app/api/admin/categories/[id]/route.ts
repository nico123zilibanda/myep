import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { getRequestMetaFromReq } from "@/lib/requestMeta";
import { MessageKey } from "@/lib/messages";
import { CategorySchema } from "@/lib/validators/category";

export const runtime = "nodejs";

// Params kama Promise<{ id: string }>
type Params = { params: Promise<{ id: string }> };

// ================= GET ONE =================
export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = await params;
    const categoryId = Number(id);

    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN")
      return NextResponse.json(
        { success: false, messageKey: "UNAUTHORIZED" satisfies MessageKey },
        { status: 401 }
      );

    if (isNaN(categoryId))
      return NextResponse.json(
        { success: false, messageKey: "CATEGORY_NOT_FOUND" satisfies MessageKey },
        { status: 404 }
      );

    const { data, error } = await supabaseAdmin
      .from("Category")
      .select("*")
      .eq("id", categoryId)
      .single();

    if (error || !data)
      return NextResponse.json(
        { success: false, messageKey: "CATEGORY_NOT_FOUND" satisfies MessageKey },
        { status: 404 }
      );

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey },
      { status: 500 }
    );
  }
}

// ================= UPDATE =================
export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const categoryId = Number(id);

    const user = await getCurrentUser();
    const meta = getRequestMetaFromReq(req);

    if (!user || user.role !== "ADMIN")
      return NextResponse.json(
        { success: false, messageKey: "UNAUTHORIZED" satisfies MessageKey },
        { status: 401 }
      );

    if (isNaN(categoryId))
      return NextResponse.json(
        { success: false, messageKey: "CATEGORY_NOT_FOUND" satisfies MessageKey },
        { status: 404 }
      );

    const body = await req.json();
    const parsed = CategorySchema.partial().safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          messageKey: "VALIDATION_ERROR",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("Category")
      .update(parsed.data)
      .eq("id", categoryId)
      .select()
      .single();

    if (error || !data)
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" },
        { status: 500 }
      );

    logAudit({
      action: "UPDATE",
      entity: "CATEGORY",
      entityId: categoryId,
      description: `Category updated`,
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      messageKey: "CATEGORY_UPDATE_SUCCESS",
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

// ================= DELETE =================
export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = await params;
    const categoryId = Number(id);

    const user = await getCurrentUser();
    const meta = getRequestMetaFromReq(_);

    if (!user || user.role !== "ADMIN")
      return NextResponse.json({ success: false, messageKey: "UNAUTHORIZED" }, { status: 401 });

    if (isNaN(categoryId))
      return NextResponse.json({ success: false, messageKey: "CATEGORY_NOT_FOUND" }, { status: 404 });

    const { data: existing } = await supabaseAdmin
      .from("Category")
      .select("name")
      .eq("id", categoryId)
      .single();

    if (!existing)
      return NextResponse.json({ success: false, messageKey: "CATEGORY_NOT_FOUND" }, { status: 404 });

    const { error } = await supabaseAdmin.from("Category").delete().eq("id", categoryId);

    if (error)
      return NextResponse.json({ success: false, messageKey: "CATEGORY_FAILED_DELETED" }, { status: 500 });

    logAudit({
      action: "DELETE",
      entity: "CATEGORY",
      entityId: categoryId,
      description: `Category "${existing.name}" deleted`,
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      messageKey: "CATEGORY_DELETE_SUCCESS",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, messageKey: "SERVER_ERROR" }, { status: 500 });
  }
}
