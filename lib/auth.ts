import { cookies } from "next/headers";
import { verifyJwt, JwtPayload } from "./jwt";

export type CurrentUser = JwtPayload & {
  id: string;
  email:string;
  fullName:string;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const payload = verifyJwt(token);
  if (!payload) return null;

  return {
    id: payload.id.toString(),
    email: payload.email,
    role: payload.role,        // ✅ now "ADMIN" | "YOUTH"
    fullName: payload.fullName
  };
}
