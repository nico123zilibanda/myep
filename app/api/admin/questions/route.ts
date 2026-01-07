import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const status = url.searchParams.get("status");

    let query = supabaseAdmin
      .from("Question")
      .select(`
        *,
        User:userId (id, fullName, email)
      `)
      .order("createdAt", { ascending: false });

    // Only filter if status is PENDING
    if (status === "PENDING") {
      query = query.eq("status", "PENDING");
    }

    const { data, error } = await query;

    if (error) {
      console.error("SUPABASE GET QUESTIONS ERROR:", error);
      return NextResponse.json(
        { message: "Failed to fetch questions" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET QUESTIONS ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
