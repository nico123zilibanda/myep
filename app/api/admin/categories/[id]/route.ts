import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";

/* ===================== HELPER ===================== */
const getIdFromReq = (req: Request) => {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // last part of URL
  return id ? Number(id) : null;
};

/* ===================== GET CATEGORY ===================== */
export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const id = getIdFromReq(req);
    if (!id) return NextResponse.json({ message: "Invalid category ID" }, { status: 400 });

    const { data, error } = await supabase
      .from("Category")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET CATEGORY ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

/* ===================== PATCH CATEGORY ===================== */
export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const id = getIdFromReq(req);
    if (!id) return NextResponse.json({ message: "Invalid category ID" }, { status: 400 });

    const { name, description } = await req.json();
    if (!name) return NextResponse.json({ message: "Category name is required" }, { status: 400 });

    const { data, error } = await supabase
      .from("Category")
      .update({ name, description })
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json({ message: "Failed to update category" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("PATCH CATEGORY ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

/* ===================== DELETE CATEGORY ===================== */
export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const id = getIdFromReq(req);
    if (!id) return NextResponse.json({ message: "Invalid category ID" }, { status: 400 });

    const { error } = await supabase
      .from("Category")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ message: "Failed to delete category" }, { status: 500 });
    }

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("DELETE CATEGORY ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
