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

type UserWithRole = {
  id: number;
  email: string;
  fullName: string;
  language: "sw" | "en";
  Role: {
    name: "ADMIN" | "YOUTH";
  }[];
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const payload = verifyJwt(token);

  if (!payload) return null;

  /* FETCH USER */
  const { data, error } = await supabaseAdmin
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

  if (error || !data) {
    return null;
  }

  const user = data as UserWithRole;

  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,

    // 🔥 FIX
    role: user.Role?.[0]?.name ?? "YOUTH",

    language: user.language,
  };
}