import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "YOUTH") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch all published opportunities
    const { data: opportunities, error } = await supabaseAdmin
      .from("Opportunity")
      .select(`
        *,
        Category:categoryId (name),
        SavedOpportunity:savedOpportunities!inner(userId) 
      `)
      .eq("status", "PUBLISHED")
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("SUPABASE GET OPPORTUNITIES ERROR:", error);
      return NextResponse.json({ message: "Failed to load opportunities" }, { status: 500 });
    }

    // Map to formatted response
    const formatted = opportunities.map((op: any) => ({
      id: op.id,
      title: op.title,
      description: op.description,
      deadline: op.deadline,
      location: op.location,
      Category: op.Category,
      // Check if the current user saved this opportunity
      isSaved: op.SavedOpportunity?.some((s: any) => s.userId === user.id) ?? false,
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("YOUTH GET OPPORTUNITIES ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
