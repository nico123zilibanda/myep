import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ count: 0 }, { status: 401 });
    }

    const { count, error } = await supabaseAdmin
      .from("Question")
      .select("*", { count: "exact", head: true })
      .eq("status", "PENDING");

    if (error) {
      console.error("SUPABASE COUNT ERROR:", error);
      return NextResponse.json({ count: 0 }, { status: 500 });
    }

    return NextResponse.json({ count: count ?? 0 });
  } catch (err) {
    console.error("NOTIFICATIONS COUNT ERROR:", err);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
