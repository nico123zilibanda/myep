import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function PATCH(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = Number(req.url.split("/").pop());
  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid training ID" }, { status: 400 });
  }

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || "";
  const type = formData.get("type") as "ARTICLE" | "VIDEO" | "PDF";
  const file = formData.get("file") as File | null;
  const resourceUrlInput = formData.get("resourceUrl") as string | null;

  if (!title || !type) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  let resourceUrl = resourceUrlInput || "";

  // ================= UPLOAD FILE TO CLOUDINARY (FIXED) =================
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());

    // Correct resource_type based on type
    const resourceType =
      type === "PDF" ? "raw" :
      type === "VIDEO" ? "video" :
      "auto";

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType,
          folder: "trainings",
          access_mode: "public",
          use_filename: true,
          unique_filename: true,
          overwrite: true,
        },
        (err, result) => (err ? reject(err) : resolve(result))
      ).end(buffer);
    });

    resourceUrl = uploadResult.secure_url;
  }

  // ================= UPDATE TRAINING =================
  const { data: updated, error } = await supabaseAdmin
    .from("Training")
    .update({ title, description, type, resourceUrl })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("UPDATE TRAINING ERROR:", error);
    return NextResponse.json({ message: "Failed to update training" }, { status: 500 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = Number(req.url.split("/").pop());
  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid training ID" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("Training").delete().eq("id", id);
  if (error) {
    console.error("DELETE TRAINING ERROR:", error);
    return NextResponse.json({ message: "Failed to delete training" }, { status: 500 });
  }

  return NextResponse.json({ message: "Training deleted successfully" });
}
