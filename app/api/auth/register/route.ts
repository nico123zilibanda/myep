export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";

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

    const { data: existingUser } = await supabase
      .from("User")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { message: "Email tayari imesajiliwa." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(passwordHash, 10);

          const { error } = await supabase.from("User").insert({
            fullName,
            email,
            passwordHash: hashedPassword,
            phone,
            gender,
            dateOfBirth,
            educationLevel,
            roleId: 2,
          });

          if (error) {
            console.error("SUPABASE INSERT ERROR:", error);
            return NextResponse.json({ message: error.message }, { status: 500 });
          }

    if (error) throw error;

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
