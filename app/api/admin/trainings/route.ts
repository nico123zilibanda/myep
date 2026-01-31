import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { logAudit } from "@/lib/audit";
import { getRequestMetaFromReq } from "@/lib/requestMeta";
import { MessageKey } from "@/lib/messages";

export const runtime = "nodejs";

// ================= CREATE TRAINING =================
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const meta = getRequestMetaFromReq(req);

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, messageKey: "UNAUTHORIZED" satisfies MessageKey },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) || "";
    const type = formData.get("type") as "ARTICLE" | "VIDEO" | "PDF";
    const file = formData.get("file") as File | null;
    const resourceUrlInput = formData.get("resourceUrl") as string | null;

    if (!title || !type) {
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" satisfies MessageKey },
        { status: 400 }
      );
    }

    let resourceUrl = resourceUrlInput || "";

    // ================= CLOUDINARY UPLOAD =================
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
          (err, result) => (err ? reject(err) : resolve(result))
        ).end(buffer);
      });

      resourceUrl = uploadResult.secure_url;
    }

    if (!resourceUrl) {
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" satisfies MessageKey },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("Training")
      .insert({
        title,
        description,
        type,
        resourceUrl,
        createdById: user.id,
      })
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" satisfies MessageKey },
        { status: 500 }
      );
    }

    logAudit({
      action: "CREATE",
      entity: "TRAINING",
      entityId: data.id,
      description: `Training "${data.title}" created (${data.type})`,
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json(
      {
        success: true,
        messageKey: "TRAINING_CREATE_SUCCESS" satisfies MessageKey,
        data,
      },
      { status: 201 }
    );

  } catch (err) {
    console.error("CREATE TRAINING ERROR:", err);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey },
      { status: 500 }
    );
  }
}

// ================= GET ALL TRAININGS =================
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, messageKey: "UNAUTHORIZED" satisfies MessageKey },
        { status: 401 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("Training")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      return NextResponse.json(
        { success: false, messageKey: "TRAINING_FETCH_FAILED" satisfies MessageKey },
        { status: 500 }
      );
    }

    return NextResponse.json(data);

  } catch (err) {
    console.error("GET TRAININGS ERROR:", err);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey },
      { status: 500 }
    );
  }
}
