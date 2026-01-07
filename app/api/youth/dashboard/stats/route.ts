import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "YOUTH") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const [opportunitiesRes, trainingsRes, questionsRes] = await Promise.all([
      supabaseAdmin.from("Opportunity").select("*", { count: "exact" }),
      supabaseAdmin.from("Training").select("*", { count: "exact" }),
      supabaseAdmin.from("Question").select("*", { count: "exact" }).eq("userId", user.id),
    ]);

    // check errors
    if (opportunitiesRes.error || trainingsRes.error || questionsRes.error) {
      console.error("Supabase count error:", opportunitiesRes.error, trainingsRes.error, questionsRes.error);
      return NextResponse.json({ message: "Failed to fetch stats" }, { status: 500 });
    }

    return NextResponse.json({
      opportunities: opportunitiesRes.count ?? 0,
      trainings: trainingsRes.count ?? 0,
      questions: questionsRes.count ?? 0,
    });
  } catch (error) {
    console.error("YOUTH DASHBOARD STATS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to load dashboard stats" },
      { status: 500 }
    );
  }
}
