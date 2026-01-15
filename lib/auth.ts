import { cookies } from "next/headers"; 
import { verifyJwt } from "./jwt";

// Current user type with role
export type CurrentUser = {
  id: string;
  fullName: string;
  email: string;
  role: "ADMIN" | "YOUTH";
  image?: string | null;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  let payload: any;
  try {
    payload = verifyJwt(token);
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }

  if (!payload || !payload.id || !payload.role || !payload.email) return null;

  // Map role safely to "ADMIN" | "YOUTH"
  const role = payload.role === "ADMIN" ? "ADMIN" : "YOUTH";

  // fullName fallback
  const fullName = payload.fullName || payload.name || payload.email.split("@")[0];

  return {
    id: payload.id.toString(),
    email: payload.email,
    role,
    fullName,
    image: payload.image || null,
  };
}
