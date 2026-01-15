import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || "";
  const type = formData.get("type") as "ARTICLE" | "VIDEO" | "PDF";
  const file = formData.get("file") as File | null;
  const resourceUrlInput = formData.get("resourceUrl") as string | null;

  if (!title || !type) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  let resourceUrl = resourceUrlInput || "";

  // ================= CLOUDINARY UPLOAD (FIXED) =================
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());

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
        },
        (error, result) => (error ? reject(error) : resolve(result))
      ).end(buffer);
    });

    resourceUrl = uploadResult.secure_url;
  }

  if (!resourceUrl) {
    return NextResponse.json({ message: "Resource required" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("Training")
    .insert({ title, description, type, resourceUrl, createdById: user.id })
    .select()
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create training" }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("Training")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    return NextResponse.json({ message: "Failed to fetch" }, { status: 500 });
  }

  return NextResponse.json(data);
}
