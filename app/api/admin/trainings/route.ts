export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Prisma MariaDB v7 instance
import { getCurrentUser } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.Role?.name !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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

  // ================= UPLOAD FILES TO CLOUDINARY =================
  if (file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: type === "VIDEO" ? "video" : "raw", // video for mp4, raw for PDF
          folder: "trainings",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    resourceUrl = uploadResult.secure_url;
  }

  if (!resourceUrl) {
    return NextResponse.json({ message: "Resource URL or file is required", status: 400 });
  }

  // ================= SAVE TO DATABASE =================
  const training = await prisma.training.create({
    data: {
      title,
      description,
      type,
      resourceUrl,
      createdById: user.id,
    },
  });

  return NextResponse.json(training);
}

// ================= GET TRAININGS =================
export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.Role?.name !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const trainings = await prisma.training.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(trainings);
}
