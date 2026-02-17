import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { getRequestMetaFromReq } from "@/lib/requestMeta";
import type { MessageKey } from "@/lib/messages";

export const runtime = "nodejs";

/* ================= GET PROFILE ================= */
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "YOUTH") {
      return NextResponse.json(
        { success: false, messageKey: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("User")
      .select(`
        id,
        fullName,
        email,
        phone,
        gender,
        dateOfBirth,
        educationLevel,
        isActive,
        createdAt,
        updatedAt,
        roles:roleId (
          name
        )
      `)
      .eq("id", user.id)
      .single();

    if (error || !data) {
      console.error("GET PROFILE ERROR:", error);
      return NextResponse.json(
        { success: false, messageKey: "SERVER_ERROR" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("GET PROFILE EXCEPTION:", err);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}


/* ================= UPDATE PROFILE ================= */
export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    const meta = getRequestMetaFromReq(req);

    if (!user || user.role !== "YOUTH") {
      return NextResponse.json(
        { success: false, messageKey: "UNAUTHORIZED" satisfies MessageKey},
        { status: 401 }
      );
    }

    const {
      fullName,
      phone,
      gender,
      dateOfBirth,
      educationLevel,
    } = await req.json();

    if (!fullName || typeof fullName !== "string") {
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" satisfies MessageKey},
        { status: 400 }
      );
    }

    const updateData = {
      fullName,
      phone: phone || null,
      gender: gender || null,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      educationLevel: educationLevel || null,
      updatedAt: new Date(),
    };

    const { error } = await supabaseAdmin
      .from("User")
      .update(updateData)
      .eq("id", user.id);

    if (error) {
      console.error("UPDATE PROFILE ERROR:", error);
      return NextResponse.json(
        { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey},
        { status: 500 }
      );
    }

    logAudit({
      action: "UPDATE",
      entity: "PROFILE",
      entityId: user.id,
      description: "Youth updated own profile",
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      messageKey: "ACTION_SUCCESS" satisfies MessageKey,
    });
  } catch (err) {
    console.error("PATCH PROFILE ERROR:", err);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey},
      { status: 500 }
    );
  }
}

