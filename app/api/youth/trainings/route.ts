import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("Training")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("SUPABASE GET TRAININGS ERROR:", error);
      return NextResponse.json({ message: "Failed to load trainings" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("YOUTH GET trainings error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
