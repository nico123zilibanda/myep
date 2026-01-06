
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "@/lib/db";

interface RegisterForm {
  fullName: string;
  email: string;
  passwordHash: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  educationLevel: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RegisterForm = await req.json();
    const { fullName, email, passwordHash, phone, gender, dateOfBirth, educationLevel } = body;

    if (!fullName || !email || !passwordHash || !phone || !gender || !dateOfBirth || !educationLevel) {
      return NextResponse.json({ message: "Tafadhali jaza taarifa zote." }, { status: 400 });
    }

    // ✅ Debug print
    console.log("Connecting to database...");

    const existingUser = await query(`SELECT id FROM "User" WHERE email = $1`, [email]);
    console.log("Existing user check result:", existingUser.rows);

    if (existingUser.rows.length > 0) {
      return NextResponse.json({ message: "Email tayari imesajiliwa." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(passwordHash, 10);

    const newUser = await query(
      `INSERT INTO "User" (fullName, email, passwordHash, phone, gender, dateOfBirth, educationLevel, roleId)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
      [fullName, email, hashedPassword, phone, gender, new Date(dateOfBirth), educationLevel, 1] // roleId=1 for YOUTH
    );

    console.log("New user created:", newUser.rows[0]);

    return NextResponse.json({ message: "Usajili umefanikiwa", userId: newUser.rows[0].id }, { status: 201 });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json({ message: "Server error", error: String(error) }, { status: 500 });
  }
}
