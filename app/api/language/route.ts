import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { getRequestMetaFromReq } from "@/lib/requestMeta";
import { MessageKey } from "@/lib/messages";
import { LanguageSchema } from "@/lib/validators/language";

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    const meta = getRequestMetaFromReq(req);

    if (!user) {
      return NextResponse.json(
        { success: false, messageKey: "UNAUTHORIZED" satisfies MessageKey },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = LanguageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          messageKey: "ACTION_FAILED" satisfies MessageKey,
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { language } = parsed.data;

    const { error } = await supabaseAdmin
      .from("User")
      .update({ language })
      .eq("id", user.id);

    if (error) throw error;

    logAudit({
      action: "UPDATE",
      entity: "USER",
      entityId: user.id,
      description: `Language changed to "${language}"`,
      userId: user.id,
      role: user.role,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      messageKey: "LANGUAGE_UPDATE_SUCCESS" satisfies MessageKey,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey },
      { status: 500 }
    );
  }
}
