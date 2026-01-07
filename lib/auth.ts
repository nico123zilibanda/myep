// lib/auth.ts
import { supabaseAdmin } from "./supabaseAdmin";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// Define TypeScript types for User and Role
type Role = {
  name: string;
};

type User = {
  id: string;
  email: string;
  fullName: string;
  role: Role[]; // Supabase returns role as an array
};

export async function getCurrentUser(req?: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const decoded: { id: string } = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id: string };

    // Query user from Supabase
    const { data: user, error } = await supabaseAdmin
      .from("User")
      .select("id, email, fullName, role(name)")
      .eq("id", decoded.id)
      .single();

    if (error || !user) return null;

    return {
      id: user.id,
      email: user.email,
      role: user.role[0]?.name || null, // safely get first role name
      fullName: user.fullName,
    };
  } catch (err) {
    console.error("Error getting current user:", err);
    return null;
  }
}
