import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { getRequestMetaFromReq } from "@/lib/requestMeta";
import { MessageKey } from "@/lib/messages";

// ================= GET ALL CATEGORIES =================
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          messageKey: "UNAUTHORIZED" satisfies MessageKey,
        },
        { status: 401 }
      );
    }

    const { data: categories, error } = await supabaseAdmin
      .from("Category")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("SUPABASE GET CATEGORIES ERROR:", error);
      return NextResponse.json(
        {
          success: false,
          messageKey: "CATEGORY_FETCH_FAILED" satisfies MessageKey,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: categories });
  } catch (err) {
    console.error("CATEGORIES GET ERROR:", err);
    return NextResponse.json(
      {
        success: false,
        messageKey: "SERVER_ERROR" satisfies MessageKey,
      },
      { status: 500 }
    );
  }
}

// ================= CREATE CATEGORY =================
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const meta = getRequestMetaFromReq(req);

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          messageKey: "UNAUTHORIZED" satisfies MessageKey,
        },
        { status: 401 }
      );
    }

    const { name, description } = await req.json();

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          messageKey: "ACTION_FAILED" satisfies MessageKey,
        },
        { status: 400 }
      );
    }

    const { data: category, error } = await supabaseAdmin
      .from("Category")
      .insert({ name, description })
      .select()
      .single();

    if (error) throw error;

    // Audit log
    logAudit({
      action: "CREATE",
      entity: "CATEGORY",
      entityId: category.id,
      description: `Category "${category.name}" created`,
      userId: user.id,
      role: user.role,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json(
      {
        success: true,
        messageKey: "CATEGORY_CREATE_SUCCESS" satisfies MessageKey,
        data: category,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("CATEGORY POST ERROR:", err);
    return NextResponse.json(
      {
        success: false,
        messageKey: "SERVER_ERROR" satisfies MessageKey,
      },
      { status: 500 }
    );
  }
}
