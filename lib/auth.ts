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

  Role:
    | {
        name: "ADMIN" | "YOUTH";
      }
    | {
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
    console.error("AUTH ERROR:", error);
    return null;
  }

  const user = data as unknown as UserWithRole;

  /* SAFE ROLE EXTRACTION */
  let role: "ADMIN" | "YOUTH" = "YOUTH";

  if (Array.isArray(user.Role)) {
    role = user.Role?.[0]?.name ?? "YOUTH";
  } else {
    role = user.Role?.name ?? "YOUTH";
  }

  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role,
    language: user.language,
  };
}