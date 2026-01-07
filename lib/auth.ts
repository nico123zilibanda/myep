// lib/auth.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { supabaseAdmin } from "./supabaseAdmin"; // <-- badala ya supabase
export async function getCurrentUser(req?: Request) {
  try {
    let token: string | null = null;

    // ✅ Read token
    if (req) {
      const authHeader = req.headers.get("Authorization");
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.replace("Bearer ", "");
      }
    }

    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get("token")?.value ?? null;
    }

    if (!token) return null;

    // ✅ Decode JWT
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // 🔹 Optional: fetch user from Supabase Admin client
    const { data: user, error } = await supabaseAdmin
      .from("User")
      .select("id, email, roleId, role(name)")
      .eq("id", decoded.id)
      .single();

    if (error || !user) return null;

    return {
      id: user.id,
      email: user.email,
      role: user.role.name, // "ADMIN" | "YOUTH"
    };
  } catch (err) {
    console.error("getCurrentUser error:", err);
    return null;
  }
}
