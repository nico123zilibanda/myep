import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";


export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const pathSegments = url.pathname.split("/"); 
    const id = Number(pathSegments[pathSegments.length - 1]); // last segment

    if (!id || isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const user = await getCurrentUser();
    if (!user || user.role !== "YOUTH") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // fetch opportunity
    const { data, error } = await supabaseAdmin
      .from("Opportunity")
      .select(`
        id,
        title,
        description,
        requirements,
        howToApply,
        deadline,
        location,
        status,
        Category:categoryId(name),
        SavedOpportunity(userId)
      `)
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error("SUPABASE GET OPPORTUNITY ERROR:", error);
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const isSaved = data.SavedOpportunity?.some(
      (s: any) => s.userId === user.id
    ) ?? false;

    return NextResponse.json({
      id: data.id,
      title: data.title,
      description: data.description,
      requirements: data.requirements,
      howToApply: data.howToApply,
      deadline: data.deadline,
      location: data.location,
      Category: data.Category ?? null,
      isSaved,
    });
  } catch (err) {
    console.error("YOUTH GET OPPORTUNITY ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
