import { cookies } from "next/headers";
import { verifyJwt } from "./jwt";
import { supabaseAdmin } from "./supabaseAdmin";

export type CurrentUser = {
  id: number;
  email: string;
  fullName: string;
  role: "ADMIN" | "YOUTH";
  language: "sw" | "en";
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const payload = verifyJwt(token);
  if (!payload) return null;

  // 🔥 Fetch fresh user from DB
  const { data: user, error } = await supabaseAdmin
    .from("User")
    .select(`
      id,
      email,
      fullName,
      language,
      Role(name)
    `)
    .eq("id", payload.id)
    .single();

  if (error || !user) return null;

  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.Role.name,
    language: user.language,
  };
}
