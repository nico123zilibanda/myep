import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma"; // ✅ HAPA NDIPO PRISMA INATOKA

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

    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      return NextResponse.json(
        { message: "Email tayari imesajiliwa." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(passwordHash, 10);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        passwordHash: hashedPassword,
        phone,
        gender,
        dateOfBirth: new Date(dateOfBirth),
        educationLevel,
        roleId: 2,
      },
    });

    return NextResponse.json(
      { message: "Usajili umefanikiwa", userId: user.id },
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
