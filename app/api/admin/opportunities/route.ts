import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { getRequestMetaFromReq } from "@/lib/requestMeta";
import { MessageKey } from "@/lib/messages";

export const runtime = "nodejs";

// ================= GET ALL OPPORTUNITIES =================
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

    const { data, error } = await supabaseAdmin
      .from("Opportunity")
      .select(`
        *,
        Category:categoryId (id, name)
      `)
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("GET OPPORTUNITIES ERROR:", error);
      return NextResponse.json(
        {
          success: false,
          messageKey: "OPPORTUNITY_FETCH_FAILED" satisfies MessageKey,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET OPPORTUNITIES ERROR:", err);
    return NextResponse.json(
      {
        success: false,
        messageKey: "SERVER_ERROR" satisfies MessageKey,
      },
      { status: 500 }
    );
  }
}

// ================= CREATE OPPORTUNITY =================
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const meta = getRequestMetaFromReq(req);

    console.log("Current User in POST:", user); // 🔥 debug

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          messageKey: "UNAUTHORIZED" satisfies MessageKey,
        },
        { status: 401 }
      );
    }

    const data = await req.json();
    if (!data.title || !data.deadline) {
      return NextResponse.json(
        {
          success: false,
          messageKey: "ACTION_FAILED" satisfies MessageKey,
        },
        { status: 400 }
      );
    }

    const { data: newOpportunity, error } = await supabaseAdmin
      .from("Opportunity")
      .insert({
        title: data.title,
        description: data.description || "",
        requirements: data.requirements || "",
        howToApply: data.howToApply || "",
        deadline: new Date(data.deadline).toISOString(),
        location: data.location || "",
        attachmentUrl: data.attachmentUrl || "",
        status: data.status || "PUBLISHED",
        categoryId: data.categoryId ?? null,
        createdById: user.id,
      })
      .select()
      .single();
    if (error) throw error;

    logAudit({
      action: "CREATE",
      entity: "OPPORTUNITY",
      entityId: newOpportunity.id,
      description: `Opportunity "${newOpportunity.title}" created`,
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json(
      {
        success: true,
        messageKey: "OPPORTUNITY_CREATE_SUCCESS" satisfies MessageKey,
        data: newOpportunity,
      },
      { status: 201 }
    );
  }
  catch (err) {
    console.error("OPPORTUNITY POST ERROR:", err);
    return NextResponse.json(
      {
        success: false,
        messageKey: "SERVER_ERROR" satisfies MessageKey,
      },
      { status: 500 }
    );
  }
}
