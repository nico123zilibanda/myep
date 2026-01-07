// app/api/admin/youth/[id]/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = req.url.split("/").pop();
  if (!id) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

  const { isActive } = await req.json();

  const { data, error } = await supabaseAdmin
    .from("User")
    .update({ isActive })
    .eq("id", Number(id))
    .select()
    .single();

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = req.url.split("/").pop();
  if (!id) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

  const { error } = await supabaseAdmin
    .from("User")
    .delete()
    .eq("id", Number(id));

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  return NextResponse.json({ message: "Youth deleted successfully" });
}
