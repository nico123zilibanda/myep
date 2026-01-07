// lib/auth.ts (mfano na supabaseAdmin)
import { supabaseAdmin } from "./supabaseAdmin";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getCurrentUser(req?: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // query user from DB
    const { data: user, error } = await supabaseAdmin
      .from("User")
      .select("id, email, fullName, role(name)")
      .eq("id", decoded.id)
      .single();

    if (error || !user) return null;

    return {
      id: user.id,
      email: user.email,
      role: user.role.name,
      fullName: user.fullName, // sasa ipo
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}
