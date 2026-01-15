import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    /* ================= AUTH ================= */
    const user = await getCurrentUser();

    if (!user || user.role !== "YOUTH") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    /* ================= QUERY ================= */
    const { data: opportunities, error } = await supabaseAdmin
      .from("Opportunity")
      .select(`
        id,
        title,
        description,
        requirements,
        howToApply,
        deadline,
        location,
        Category:categoryId (
          name
        ),
        SavedOpportunity (
          userId
        )
      `)
      .eq("status", "PUBLISHED")
      // 🔑 MUHIMU SANA
      .eq("SavedOpportunity.userId", user.id)
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("SUPABASE GET OPPORTUNITIES ERROR:", error);
      return NextResponse.json(
        { message: "Failed to load opportunities" },
        { status: 500 }
      );
    }

    /* ================= FORMAT ================= */
    const formatted = (opportunities || []).map((op: any) => ({
      id: op.id,
      title: op.title,
      description: op.description,
      requirements: op.requirements,
      howToApply: op.howToApply,
      deadline: op.deadline,
      location: op.location,
      Category: op.Category ?? null,

      // 🔑 sasa ni accurate 100%
      isSaved: (op.SavedOpportunity?.length ?? 0) > 0,
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("YOUTH GET OPPORTUNITIES ERROR:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
