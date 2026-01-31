import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { signJwt } from "@/lib/jwt";
import bcrypt from "bcryptjs";
import { logAudit } from "@/lib/audit";
import { getRequestMetaFromReq } from "@/lib/requestMeta";
import type { MessageKey } from "@/lib/messages";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const meta = getRequestMetaFromReq(req);

  try {
    const { email, password } = await req.json();

    // 1️⃣ Validation
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          messageKey: "ACTION_FAILED" satisfies MessageKey,
        },
        { status: 400 }
      );
    }

    // 2️⃣ Fetch user
    const { data: user, error } = await supabaseAdmin
      .from("User")
      .select(`
        id,
        email,
        fullName,
        passwordHash,
        isActive,
        roleId
      `)
      .eq("email", email)
      .single();

    if (error || !user) {
      logAudit({
        action: "LOGIN_FAILED",
        entity: "AUTH",
        description: `Failed login attempt for email: ${email}`,
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      }).catch(console.error);

      return NextResponse.json(
        {
          success: false,
          messageKey: "AUTH_LOGIN_FAILED" satisfies MessageKey,
        },
        { status: 401 }
      );
    }

    // 3️⃣ Account inactive
    if (!user.isActive) {
      logAudit({
        action: "LOGIN_BLOCKED",
        entity: "AUTH",
        userId: user.id,
        description: "Login attempt on inactive account",
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      }).catch(console.error);

      return NextResponse.json(
        {
          success: false,
          messageKey: "AUTH_LOGIN_BLOCKED" satisfies MessageKey,
        },
        { status: 403 }
      );
    }

    // 4️⃣ Verify password
    const isValidPassword = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isValidPassword) {
      logAudit({
        action: "LOGIN_FAILED",
        entity: "AUTH",
        userId: user.id,
        description: "Invalid password",
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      }).catch(console.error);

      return NextResponse.json(
        {
          success: false,
          messageKey: "AUTH_LOGIN_FAILED" satisfies MessageKey,
        },
        { status: 401 }
      );
    }

    // 5️⃣ Resolve role
    let role: "ADMIN" | "YOUTH" | null = null;
    if (user.roleId === 2) role = "ADMIN";
    if (user.roleId === 1) role = "YOUTH";

    if (!role) {
      return NextResponse.json(
        {
          success: false,
          messageKey: "SERVER_ERROR" satisfies MessageKey,
        },
        { status: 500 }
      );
    }

    // 6️⃣ Sign JWT
    const token = signJwt({
      id: user.id.toString(),
      email: user.email,
      fullName: user.fullName,
      role,
    });

    // ✅ Audit success
    logAudit({
      action: "LOGIN",
      entity: "AUTH",
      userId: user.id,
      role,
      description: "User logged in successfully",
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    // 7️⃣ Response
    const res = NextResponse.json({
      success: true,
      messageKey: "AUTH_LOGIN_SUCCESS" satisfies MessageKey,
      redirectTo: "/dashboard",
      role,
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    logAudit({
      action: "LOGIN_FAILED",
      entity: "AUTH",
      description: "Unhandled login error",
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
