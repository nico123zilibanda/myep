import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { getRequestMetaFromReq } from "@/lib/requestMeta";
import { MessageKey } from "@/lib/messages";
import { CategorySchema } from "@/lib/validators/category";

// ================= GET ALL =================
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, messageKey: "UNAUTHORIZED" satisfies MessageKey },
        { status: 401 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("Category")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey },
      { status: 500 }
    );
  }
}

// ================= CREATE =================
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const meta = getRequestMetaFromReq(req);

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, messageKey: "UNAUTHORIZED" satisfies MessageKey },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = CategorySchema.safeParse(body);

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

    const { name, description } = parsed.data;

    const { data, error } = await supabaseAdmin
      .from("Category")
      .insert({ name, description })
      .select()
      .single();

    if (error) throw error;

    logAudit({
      action: "CREATE",
      entity: "CATEGORY",
      entityId: data.id,
      description: `Category "${data.name}" created`,
      userId: user.id,
      role: user.role,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json(
      {
        success: true,
        messageKey: "CATEGORY_CREATE_SUCCESS" satisfies MessageKey,
        data,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey },
      { status: 500 }
    );
  }
}
