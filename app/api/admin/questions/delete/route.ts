// app/api/admin/questions/delete/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ message: "Invalid question ID" }, { status: 400 });
    }

    const { error } = await supabase
      .from("Question")
      .delete()
      .eq("id", Number(id));

    if (error) {
      console.error("SUPABASE DELETE QUESTION ERROR:", error);
      return NextResponse.json({ message: "Failed to delete question" }, { status: 500 });
    }

    return NextResponse.json({ message: "Question deleted successfully" });
  } catch (err) {
    console.error("DELETE QUESTION ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
