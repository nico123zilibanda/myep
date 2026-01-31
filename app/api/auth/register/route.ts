// app/api/auth/register/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { logAudit } from "@/lib/audit";
import { getRequestMetaFromReq } from "@/lib/requestMeta";
import { MessageKey } from "@/lib/messages";

export async function POST(req: NextRequest) {
  const meta = getRequestMetaFromReq(req);

  try {
    const body = await req.json();

    const {
      fullName,
      email,
      passwordHash,
      phone,
      gender,
      dateOfBirth,
      educationLevel,
    } = body;

    // 1️⃣ Validation
    if (
      !fullName ||
      !email ||
      !passwordHash ||
      !phone ||
      !gender ||
      !dateOfBirth ||
      !educationLevel
    ) {
      return NextResponse.json(
        {
          success: false,
          messageKey: "ACTION_FAILED" satisfies MessageKey,
        },
        { status: 400 }
      );
    }

    // 2️⃣ Check if user exists
    const { data: existingUser, error: selectError } = await supabaseAdmin
      .from("User")
      .select("id")
      .eq("email", email)
      .single();

    if (selectError && selectError.code !== "PGRST116") {
      console.error("SUPABASE SELECT ERROR:", selectError);

      logAudit({
        action: "REGISTER_FAILED",
        entity: "AUTH",
        description: `Registration failed during email check: ${email}`,
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      }).catch(console.error);

      return NextResponse.json(
        {
          success: false,
          messageKey: "SERVER_ERROR" satisfies MessageKey,
        },
        { status: 500 }
      );
    }

    if (existingUser) {
      logAudit({
        action: "REGISTER_FAILED",
        entity: "AUTH",
        description: `Registration attempt with existing email: ${email}`,
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      }).catch(console.error);

      return NextResponse.json(
        {
          success: false,
          messageKey: "AUTH_REGISTER_EMAIL_EXISTS" satisfies MessageKey,
        },
        { status: 400 }
      );
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(passwordHash, 10);

    // 4️⃣ Insert user
    const { data: createdUser, error: insertError } = await supabaseAdmin
      .from("User")
      .insert({
        fullName,
        email,
        passwordHash: hashedPassword,
        phone,
        gender,
        dateOfBirth,
        educationLevel,
        roleId: 1, // YOUTH
      })
      .select("id")
      .single();

    if (insertError || !createdUser) {
      console.error("SUPABASE INSERT ERROR:", insertError);

      logAudit({
        action: "REGISTER_FAILED",
        entity: "AUTH",
        description: `Registration failed during insert: ${email}`,
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      }).catch(console.error);

      return NextResponse.json(
        {
          success: false,
          messageKey: "SERVER_ERROR" satisfies MessageKey,
        },
        { status: 500 }
      );
    }

    // ✅ Success audit
    logAudit({
      action: "REGISTER_SUCCESS",
      entity: "AUTH",
      userId: createdUser.id,
      role: "YOUTH",
      description: `New user registered: ${email}`,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    // ✅ Success response
    return NextResponse.json(
      {
        success: true,
        messageKey: "AUTH_REGISTER_SUCCESS" satisfies MessageKey,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    logAudit({
      action: "REGISTER_FAILED",
      entity: "AUTH",
      description: "Unhandled registration error",
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json(
      {
        success: false,
        messageKey: "SERVER_ERROR" satisfies MessageKey,
      },
      { status: 500 }
    );
  }
}
