// app/api/admin/youth/[id]/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { getRequestMetaFromReq } from "@/lib/requestMeta";

export const runtime = "nodejs";

// ================= UPDATE YOUTH STATUS =================
export async function PATCH(req: Request) {
  const user = await getCurrentUser();
  const meta = getRequestMetaFromReq(req);

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = Number(req.url.split("/").pop());
  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid youth ID" }, { status: 400 });
  }

  const { isActive } = await req.json();

  const { data: updatedUser, error } = await supabaseAdmin
    .from("User")
    .update({ isActive })
    .eq("id", id)
    .select("id, fullName, email, isActive")
    .single();

  if (error) {
    console.error("UPDATE YOUTH ERROR:", error);
    return NextResponse.json({ message: "Failed to update youth" }, { status: 500 });
  }

  // ================= AUDIT LOG =================
  logAudit({
    action: "UPDATE",
    entity: "YOUTH",
    entityId: id,
    description: `Youth "${updatedUser.fullName ?? updatedUser.email}" status updated to ${
      isActive ? "ACTIVE" : "INACTIVE"
    }`,
    userId: user.id,
    ipAddress: meta.ipAddress,
    userAgent: meta.userAgent,
  }).catch(console.error);

  return NextResponse.json(updatedUser);
}

// ================= DELETE YOUTH =================
export async function DELETE(req: Request) {
  const user = await getCurrentUser();
  const meta = getRequestMetaFromReq(req);

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = Number(req.url.split("/").pop());
  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid youth ID" }, { status: 400 });
  }

  // Chukua taarifa kabla ya kufuta (kwa audit)
  const { data: youth } = await supabaseAdmin
    .from("User")
    .select("fullName, email")
    .eq("id", id)
    .single();

  const { error } = await supabaseAdmin
    .from("User")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("DELETE YOUTH ERROR:", error);
    return NextResponse.json({ message: "Failed to delete youth" }, { status: 500 });
  }

  // ================= AUDIT LOG =================
  logAudit({
    action: "DELETE",
    entity: "YOUTH",
    entityId: id,
    description: `Youth "${youth?.fullName ?? youth?.email ?? "Unknown"}" deleted`,
    userId: user.id,
    ipAddress: meta.ipAddress,
    userAgent: meta.userAgent,
  }).catch(console.error);

  return NextResponse.json({ message: "Youth deleted successfully" });
}
