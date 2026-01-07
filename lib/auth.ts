// lib/auth.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { supabase } from "./supabase";

export interface AuthUser {
  [x: string]: any;
  id: number;
  email: string;
  role: "ADMIN" | "YOUTH";
}

// now req is optional, and if missing it reads cookies directly
export async function getCurrentUser(req?: Request): Promise<AuthUser | null> {
  try {
    let token: string | null = null;

    // ✅ Read from request header if provided
    if (req) {
      const authHeader = req.headers.get("Authorization");
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.replace("Bearer ", "");
      }
    }

    // ✅ Read from cookies if no token from headers
    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get("token")?.value ?? null;
    }

    if (!token) return null;

    // Decode token using your JWT_SECRET
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (err) {
    console.error("getCurrentUser error:", err);
    return null;
  }
}
