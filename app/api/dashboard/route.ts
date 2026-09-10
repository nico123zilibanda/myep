import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // ---------------------------------------------------------
    // 1. Check Users
    // ---------------------------------------------------------
    const usersResult = await supabaseAdmin
      .from("User")
      .select("id", { count: "exact", head: true });

    if (usersResult.error) {
      console.error("Dashboard - User query error:", usersResult.error);

      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch users",
          details:
            process.env.NODE_ENV !== "production"
              ? usersResult.error.message
              : undefined,
        },
        { status: 500 }
      );
    }

    // ---------------------------------------------------------
    // 2. Check Trainings
    // ---------------------------------------------------------
    const trainingsResult = await supabaseAdmin
      .from("Training")
      .select("id", { count: "exact", head: true });

    if (trainingsResult.error) {
      console.error(
        "Dashboard - Training query error:",
        trainingsResult.error
      );

      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch trainings",
          details:
            process.env.NODE_ENV !== "production"
              ? trainingsResult.error.message
              : undefined,
        },
        { status: 500 }
      );
    }

    // ---------------------------------------------------------
    // 3. Check Opportunities
    // ---------------------------------------------------------
    const opportunitiesResult = await supabaseAdmin
      .from("Opportunity")
      .select("id", { count: "exact", head: true });

    if (opportunitiesResult.error) {
      console.error(
        "Dashboard - Opportunity query error:",
        opportunitiesResult.error
      );

      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch opportunities",
          details:
            process.env.NODE_ENV !== "production"
              ? opportunitiesResult.error.message
              : undefined,
        },
        { status: 500 }
      );
    }

    // ---------------------------------------------------------
    // 4. Return dashboard statistics
    // ---------------------------------------------------------
    return NextResponse.json({
      success: true,

      stats: {
        youth: usersResult.count ?? 0,
        trainings: trainingsResult.count ?? 0,
        opportunities: opportunitiesResult.count ?? 0,
      },
    });
  } catch (error) {
    console.error("Dashboard API unexpected error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details:
          process.env.NODE_ENV !== "production"
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
      { status: 500 }
    );
  }
}
