import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";

// DELETE opportunity
export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const id = Number(url.pathname.split("/").pop());

    if (isNaN(id)) return NextResponse.json({ message: "Invalid opportunity ID" }, { status: 400 });

    const { error } = await supabase.from("Opportunity").delete().eq("id", id);

    if (error) {
      console.error("DELETE OPPORTUNITY ERROR:", error);
      return NextResponse.json({ message: "Failed to delete opportunity" }, { status: 500 });
    }

    return NextResponse.json({ message: "Opportunity deleted successfully" });
  } catch (err) {
    console.error("DELETE OPPORTUNITY ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// PATCH update opportunity
export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const id = Number(url.pathname.split("/").pop());
    if (isNaN(id)) return NextResponse.json({ message: "Invalid opportunity ID" }, { status: 400 });

    const {
      title,
      description,
      requirements,
      howToApply,
      deadline,
      location,
      attachmentUrl,
      status,
      categoryId,
    } = await req.json();

    if (!title || !deadline) {
      return NextResponse.json({ message: "Title and deadline are required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("Opportunity")
      .update({
        title,
        description: description || "",
        requirements: requirements || "",
        howToApply: howToApply || "",
        deadline: new Date(deadline).toISOString(),
        location: location || "",
        attachmentUrl: attachmentUrl || "",
        status: status || "PUBLISHED",
        categoryId: categoryId || null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("UPDATE OPPORTUNITY ERROR:", error);
      return NextResponse.json({ message: "Failed to update opportunity" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("PATCH OPPORTUNITY ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
