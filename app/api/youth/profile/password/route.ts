import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { getRequestMetaFromReq } from "@/lib/requestMeta";
import { MessageKey } from "@/lib/messages";

export const runtime = "nodejs";

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

    const { password } = await req.json();

    if (!password || password.length < 8) {
      return NextResponse.json(
        { success: false, messageKey: "INVALID_PASSWORD" satisfies MessageKey},
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const { error } = await supabaseAdmin
      .from("User")
      .update({
        passwordHash,
        updatedAt: new Date(),
      })
      .eq("id", user.id);

    if (error) {
      console.error("CHANGE PASSWORD ERROR:", error);
      return NextResponse.json(
        { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey},
        { status: 500 }
      );
    }

    logAudit({
      action: "UPDATE",
      entity: "PASSWORD",
      entityId: user.id,
      description: "Youth changed own password",
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      messageKey: "PASSWORD_CHANGED" satisfies MessageKey,
    });
  } catch (err) {
    console.error("CHANGE PASSWORD EXCEPTION:", err);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey},
      { status: 500 }
    );
  }
}
