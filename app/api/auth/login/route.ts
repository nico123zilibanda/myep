import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { signJwt } from "@/lib/jwt";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
  }

  try {
    const { data: user, error } = await supabaseAdmin
      .from("User")
      .select(`
        id,
        email,
        fullName,
        passwordHash,
        isActive,
        role:Role!User_roleId_fkey (name)
      `)
      .eq("email", email)
      .single();

    if (error || !user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    if (!user.isActive) {
      return NextResponse.json({ message: "Account is inactive. Contact the admin." }, { status: 403 });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Supabase role is array, take first element
    const roleName = Array.isArray(user.role) && user.role.length > 0 ? user.role[0].name : "YOUTH";

    // ✅ Generate JWT with fullName
    const token = signJwt({
      id: user.id.toString(),
      fullName: user.fullName,
      role: roleName as "ADMIN" | "YOUTH",
      email: user.email,
    });

    // Set httpOnly cookie
    const res = NextResponse.json({
      success: true,
      role: roleName,
      redirectTo: "/dashboard"
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
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
