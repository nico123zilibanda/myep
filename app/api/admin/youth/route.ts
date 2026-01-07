// app/api/admin/youth/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("User")
    .select(`
      id,
      fullName,
      email,
      phone,
      educationLevel,
      gender,
      dateOfBirth,
      isActive,
      createdAt,
      roles:roleId (
        name
      )
    `)
    .eq("roleId", 1) // ✅ YOUTH
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("SUPABASE ERROR:", error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(data);
}
