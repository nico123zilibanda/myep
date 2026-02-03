// app/api/admin/youth/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import { MessageKey } from "@/lib/messages";

export const runtime = "nodejs";

/* ===================== GET ALL YOUTH ===================== */
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
      .from("User")
      .select(`
        id,
        fullName,
        email,
        phone,
        educationLevel,
        gender,
        dateOfBirth,
        isActive,
        createdAt,
        roles:roleId (
          name
        )
      `)
      .eq("roleId", 1) // YOUTH
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("GET YOUTH ERROR:", error);
      return NextResponse.json(
        {
          success: false,
          messageKey: "SERVER_ERROR" satisfies MessageKey,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("GET YOUTH EXCEPTION:", err);
    return NextResponse.json(
      {
        success: false,
        messageKey: "SERVER_ERROR" satisfies MessageKey,
      },
      { status: 500 }
    );
  }
}
