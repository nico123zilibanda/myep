import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 20);
    const action = searchParams.get("action");

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabaseAdmin
      .from("AuditLog")
      .select(`
    id,
    action,
    entity,
    description,
    ipAddress,
    userAgent,
    createdAt,
    User:userId (
      id,
      fullName,
      email
    )
  `, { count: "exact" })
      .order("createdAt", { ascending: false })
      .range(from, to);


    if (action) {
      query = query.eq("action", action);
    }

    const { data, error, count } = await query;

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count,
      },
    });
  } catch (error) {
    console.error("AUDIT LOG FETCH ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
