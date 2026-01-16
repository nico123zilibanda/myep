import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { signJwt } from "@/lib/jwt";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // 1️⃣ Basic validation
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    // 2️⃣ Fetch user (NO ROLE JOIN)
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
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 3️⃣ Check if account is active
    if (!user.isActive) {
      return NextResponse.json(
        { message: "Account is inactive. Contact the admin." },
        { status: 403 }
      );
    }

    // 4️⃣ Verify password
    const isValidPassword = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 5️⃣ Map roleId → role name (SAFE & EXPLICIT)
    let role: "ADMIN" | "YOUTH" | null = null;

    if (user.roleId === 2) role = "ADMIN";
    if (user.roleId === 1) role = "YOUTH";

    if (!role) {
      return NextResponse.json(
        { message: "User role invalid" },
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

    // 7️⃣ Response + cookie
    const res = NextResponse.json({
      success: true,
      role,
      redirectTo: "/dashboard",
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60, // 1 hour
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
