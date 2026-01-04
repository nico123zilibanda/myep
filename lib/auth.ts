import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

/* =========================
   PASSWORD HELPERS
========================= */
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
) {
  return bcrypt.compare(password, hashedPassword);
}

/* =========================
   JWT HELPERS
========================= */
export function generateToken(payload: {
  userId: number;
  role: string;
}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as {
    userId: number;
    role: string;
    iat: number;
    exp: number;
  };
}

/* =========================
   CURRENT USER (FIXED)
========================= */
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    include: { Role: true },
  });

  return user;
}
