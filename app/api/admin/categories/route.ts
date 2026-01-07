import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";

// ================= GET ALL CATEGORIES =================
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { data: categories, error } = await supabaseAdmin
      .from("Category")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("SUPABASE GET CATEGORIES ERROR:", error);
      return NextResponse.json(
        { message: "Failed to fetch categories" },
        { status: 500 }
      );
    }

    return NextResponse.json(categories);
  } catch (err) {
    console.error("CATEGORIES GET ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// ================= CREATE CATEGORY =================
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, description } = await req.json();

    if (!name) {
      return NextResponse.json(
        { message: "Jina la category linahitajika" },
        { status: 400 }
      );
    }

    const { data: category, error } = await supabaseAdmin
      .from("Category")
      .insert({ name, description })
      .select()
      .single();

    if (error) {
      console.error("SUPABASE CREATE CATEGORY ERROR:", error);
      return NextResponse.json(
        { message: "Failed to create category" },
        { status: 500 }
      );
    }

    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    console.error("CATEGORIES POST ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
