import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";

/**
 * GET: Pata saved opportunities za youth
 */
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const { data, error } = await supabaseAdmin
      .from("SavedOpportunity")
      .select(`
        Opportunity:opportunityId (
          id,
          title,
          description,
          deadline,
          location,
          Category:categoryId ( name )
        )
      `)
      .eq("userId", user.id)
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("SUPABASE GET SAVED OPPORTUNITIES ERROR:", error);
      return NextResponse.json({ message: "Failed to load saved opportunities" }, { status: 500 });
    }

    const formatted = (data || []).map((s: any) => ({
      id: s.Opportunity.id,
      title: s.Opportunity.title,
      description: s.Opportunity.description,
      deadline: s.Opportunity.deadline,
      location: s.Opportunity.location,
      Category: s.Opportunity.Category,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("YOUTH GET saved opportunities error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

/**
 * POST: Save opportunity
 */
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const { opportunityId } = await req.json();
    if (!opportunityId || isNaN(opportunityId)) {
      return NextResponse.json({ message: "Invalid opportunity ID" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("SavedOpportunity")
      .insert({ userId: user.id, opportunityId: Number(opportunityId) });

    if (error) {
      // Handle duplicate save gracefully
      if (error.code === "23505" || error.message.includes("duplicate")) {
        return NextResponse.json({ message: "Opportunity already saved" }, { status: 409 });
      }
      console.error("SUPABASE SAVE OPPORTUNITY ERROR:", error);
      return NextResponse.json({ message: "Failed to save opportunity" }, { status: 500 });
    }

    return NextResponse.json({ message: "Opportunity saved successfully" });
  } catch (error) {
    console.error("YOUTH SAVE opportunity error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

/**
 * DELETE: Unsave opportunity
 */
export async function DELETE(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const { opportunityId } = await req.json();
    if (!opportunityId || isNaN(opportunityId)) {
      return NextResponse.json({ message: "Invalid opportunity ID" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("SavedOpportunity")
      .delete()
      .match({ userId: user.id, opportunityId: Number(opportunityId) });

    if (error) {
      console.error("SUPABASE UNSAVE OPPORTUNITY ERROR:", error);
      return NextResponse.json({ message: "Failed to unsave opportunity" }, { status: 500 });
    }

    return NextResponse.json({ message: "Opportunity removed from saved" });
  } catch (error) {
    console.error("YOUTH UNSAVE opportunity error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
