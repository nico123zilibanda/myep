// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { prisma } from "@/lib/prisma"; // ✅ HAPA NDIPO PRISMA INATOKA

// interface RegisterForm {
//   fullName: string;
//   email: string;
//   passwordHash: string;
//   phone: string;
//   gender: string;
//   dateOfBirth: string;
//   educationLevel: string;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body: RegisterForm = await req.json();

//     const {
//       fullName,
//       email,
//       passwordHash,
//       phone,
//       gender,
//       dateOfBirth,
//       educationLevel,
//     } = body;

//     if (
//       !fullName ||
//       !email ||
//       !passwordHash ||
//       !phone ||
//       !gender ||
//       !dateOfBirth ||
//       !educationLevel
//     ) {
//       return NextResponse.json(
//         { message: "Tafadhali jaza taarifa zote." },
//         { status: 400 }
//       );
//     }

//     const exists = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (exists) {
//       return NextResponse.json(
//         { message: "Email tayari imesajiliwa." },
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(passwordHash, 10);

//     const user = await prisma.user.create({
//       data: {
//         fullName,
//         email,
//         passwordHash: hashedPassword,
//         phone,
//         gender,
//         dateOfBirth: new Date(dateOfBirth),
//         educationLevel,
//         roleId: 2,
//       },
//     });

//     return NextResponse.json(
//       { message: "Usajili umefanikiwa", userId: user.id },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("REGISTER ERROR:", error);
//     return NextResponse.json(
//       { message: "Server error" },
//       { status: 500 }
//     );
//   }
// }



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

    const {
      fullName,
      email,
      passwordHash,
      phone,
      gender,
      dateOfBirth,
      educationLevel,
    } = body;

    // ✅ Validation
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

    // ✅ Check if email exists
    const existingUser = await query(
      `SELECT id FROM "User" WHERE email = $1`,
      [email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { message: "Email tayari imesajiliwa." },
        { status: 400 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(passwordHash, 10);

    // ✅ Insert user
    const result = await query(
      `INSERT INTO "User"
       (fullName, email, "passwordHash", phone, gender, "dateOfBirth", "educationLevel", "roleId")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id`,
      [
        fullName,
        email,
        hashedPassword,
        phone,
        gender,
        new Date(dateOfBirth),
        educationLevel,
        2, // roleId
      ]
    );

    return NextResponse.json(
      {
        message: "Usajili umefanikiwa",
        userId: result.rows[0].id,
      },
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
