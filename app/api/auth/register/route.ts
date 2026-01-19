// app/api/auth/register/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabaseAdmin"; // 🔑 use admin client

export async function POST(req: NextRequest) {
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
        { message: "Tafadhali jaza taarifa zote." },
        { status: 400 }
      );
    }

    // 🔍 Check if user already exists
    const { data: existingUser, error: selectError } = await supabaseAdmin
      .from("User")
      .select("id")
      .eq("email", email)
      .single();

    if (selectError && selectError.code !== "PGRST116") {
      // PGRST116 = record not found, ok
      console.error("SUPABASE SELECT ERROR:", selectError);
      return NextResponse.json({ message: selectError.message }, { status: 500 });
    }

    if (existingUser) {
      return NextResponse.json(
        { message: "Email tayari imesajiliwa." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(passwordHash, 10);

    const { error: insertError } = await supabaseAdmin.from("User").insert({
      fullName,
      email,
      passwordHash: hashedPassword,
      phone,
      gender,
      dateOfBirth,
      educationLevel,
      roleId: 2,
    });

    if (insertError) {
      console.error("SUPABASE INSERT ERROR:", insertError);
      return NextResponse.json({ message: insertError.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Usajili umefanikiwa" },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
