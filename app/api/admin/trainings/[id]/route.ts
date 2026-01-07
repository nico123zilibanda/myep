import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";

// ================= DELETE TRAINING =================
export async function DELETE(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = Number(req.url.split("/").pop());
  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid training ID" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("Training")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("DELETE TRAINING ERROR:", error);
    return NextResponse.json({ message: "Failed to delete training" }, { status: 500 });
  }

  return NextResponse.json({ message: "Training deleted" });
}

// ================= UPDATE TRAINING =================
export async function PATCH(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = Number(req.url.split("/").pop());
  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid training ID" }, { status: 400 });
  }

  const data = await req.json();

  const { data: updated, error } = await supabaseAdmin
    .from("Training")
    .update({
      title: data.title,
      description: data.description || "",
      type: data.type,
      resourceUrl: data.resourceUrl || "",
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("UPDATE TRAINING ERROR:", error);
    return NextResponse.json({ message: "Failed to update training" }, { status: 500 });
  }

  return NextResponse.json(updated);
}
