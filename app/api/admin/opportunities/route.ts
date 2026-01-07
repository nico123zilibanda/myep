import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";

// ================= GET ALL OPPORTUNITIES =================
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabaseAdmin
      .from("Opportunity")
      .select(`
        *,
        Category:categoryId (id, name)
      `)
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("GET OPPORTUNITIES ERROR:", error);
      return NextResponse.json(
        { message: error.message || "Failed to load opportunities" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET OPPORTUNITIES ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// ================= CREATE OPPORTUNITY =================
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser(req);
    console.log("Current User in POST:", user); // 🔥 debug

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    if (!data.title || !data.deadline) {
      return NextResponse.json(
        { message: "Title and deadline are required" },
        { status: 400 }
      );
    }

    const { data: newOpportunity, error } = await supabaseAdmin
      .from("Opportunity")
      .insert({
        title: data.title,
        description: data.description || "",
        requirements: data.requirements || "",
        howToApply: data.howToApply || "",
        deadline: new Date(data.deadline).toISOString(),
        location: data.location || "",
        attachmentUrl: data.attachmentUrl || "",
        status: data.status || "PUBLISHED",
        categoryId: data.categoryId ?? null,
        createdById: user.id, // ✅ must not be null
      })
      .select()
      .single();

    if (error) {
      console.error("CREATE OPPORTUNITY ERROR:", error);
      return NextResponse.json(
        { message: error.message || "Failed to create opportunity" },
        { status: 500 }
      );
    }

    return NextResponse.json(newOpportunity);
  } catch (err) {
    console.error("POST OPPORTUNITY ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
