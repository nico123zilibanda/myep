// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabaseAdmin } from "@/lib/supabaseAdmin"; // 🔑 admin client

const JWT_SECRET = process.env.JWT_SECRET!;

interface LoginForm {
  email: string;
  password: string;
}

// Map numeric roleId to string roles
const roleMap: { [key: number]: "YOUTH" | "ADMIN" } = {
  1: "YOUTH",
  2: "ADMIN",
};

export async function POST(req: NextRequest) {
  try {
    const body: LoginForm = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email na password vinahitajika." },
        { status: 400 }
      );
    }

    // 🔍 Find user in Supabase Admin
    const { data: user, error } = await supabaseAdmin
      .from("User")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      console.error("SUPABASE ADMIN SELECT ERROR:", error);
      return NextResponse.json(
        { message: "Email au password sio sahihi." },
        { status: 401 }
      );
    }

    // Optional: check if account is active
    if ("isActive" in user && !user.isActive) {
      return NextResponse.json(
        { message: "Account imezimwa. Wasiliana na admin." },
        { status: 403 }
      );
    }

    // ✅ Verify password
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { message: "Email au password sio sahihi." },
        { status: 401 }
      );
    }

    // 🔐 Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: roleMap[user.roleId] ?? "YOUTH",
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 🍪 Set HttpOnly cookie
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        role: roleMap[user.roleId] ?? "YOUTH",
      },
    });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
