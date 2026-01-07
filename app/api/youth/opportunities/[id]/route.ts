import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const pathname = new URL(req.url).pathname;
    const id = Number(pathname.split("/").pop());

    if (!id || isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const user = await getCurrentUser();

    // Fetch opportunity by ID with Category and SavedOpportunity for this user
    const { data: opportunities, error } = await supabaseAdmin
      .from("Opportunity")
      .select(`
        *,
        Category:categoryId (name),
        SavedOpportunity:savedOpportunities(userId)
      `)
      .eq("id", id);

    if (error) {
      console.error("SUPABASE GET OPPORTUNITY ERROR:", error);
      return NextResponse.json({ message: "Failed to fetch opportunity" }, { status: 500 });
    }

    const opportunity = opportunities?.[0];

    if (!opportunity) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    // Check if current user has saved this opportunity
    const isSaved = opportunity.SavedOpportunity?.some((s: any) => s.userId === user?.id) ?? false;

    return NextResponse.json({
      id: opportunity.id,
      title: opportunity.title,
      description: opportunity.description,
      requirements: opportunity.requirements,
      howToApply: opportunity.howToApply,
      deadline: opportunity.deadline,
      location: opportunity.location,
      Category: opportunity.Category,
      isSaved,
    });
  } catch (err) {
    console.error("YOUTH GET OPPORTUNITY ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
