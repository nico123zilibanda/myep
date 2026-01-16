import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { signJwt } from "@/lib/jwt";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  
  // Basic validation for email and password
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    // Fetch user from Supabase
    const { data: user, error } = await supabaseAdmin
      .from("User")
      .select(`
        id,
        email,
        fullName,
        passwordHash,
        isActive,
        role:Role!User_roleId_fkey (
          name
        )
      `)
      .eq("email", email)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if account is active
    if (!user.isActive) {
      return NextResponse.json(
        { message: "Account is inactive. Contact the admin." },
        { status: 403 }
      );
    }

    // Check password validity
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = signJwt({
      id: user.id.toString(), 
      role: user.role.name,
      email: user.email,
      fullName: user.fullName,
    });

    // Set the token in cookies
    const res = NextResponse.json({
      success: true,
      role: user.role.name,
      redirectTo: "/dashboard", // Redirect to dashboard after login
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 3600,  // Token expires in 1 hour
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // Secure only in production
    });

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
