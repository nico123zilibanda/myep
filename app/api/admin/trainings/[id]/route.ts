import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { logAudit } from "@/lib/audit";
import { getRequestMetaFromReq } from "@/lib/requestMeta";
import { MessageKey } from "@/lib/messages";

export const runtime = "nodejs";

// ================= UPDATE TRAINING =================
export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    const meta = getRequestMetaFromReq(req);

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, messageKey: "UNAUTHORIZED" satisfies MessageKey },
        { status: 401 }
      );
    }

    const id = Number(req.url.split("/").pop());
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, messageKey: "TRAINING_NOT_FOUND" satisfies MessageKey },
        { status: 400 }
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
            overwrite: true,
          },
          (err, result) => (err ? reject(err) : resolve(result))
        ).end(buffer);
      });

      resourceUrl = uploadResult.secure_url;
    }

    const { data, error } = await supabaseAdmin
      .from("Training")
      .update({ title, description, type, resourceUrl })
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" satisfies MessageKey },
        { status: 500 }
      );
    }

    logAudit({
      action: "UPDATE",
      entity: "TRAINING",
      entityId: id,
      description: `Training updated to "${data.title}" (${data.type})`,
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      messageKey: "TRAINING_UPDATE_SUCCESS" satisfies MessageKey,
      data,
    });

  } catch (err) {
    console.error("UPDATE TRAINING ERROR:", err);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey },
      { status: 500 }
    );
  }
}

// ================= DELETE TRAINING =================
export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    const meta = getRequestMetaFromReq(req);

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, messageKey: "UNAUTHORIZED" satisfies MessageKey },
        { status: 401 }
      );
    }

    const id = Number(req.url.split("/").pop());
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, messageKey: "TRAINING_NOT_FOUND" satisfies MessageKey },
        { status: 400 }
      );
    }

    const { data: training } = await supabaseAdmin
      .from("Training")
      .select("title")
      .eq("id", id)
      .single();

    const { error } = await supabaseAdmin
      .from("Training")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" satisfies MessageKey },
        { status: 500 }
      );
    }

    logAudit({
      action: "DELETE",
      entity: "TRAINING",
      entityId: id,
      description: `Training "${training?.title ?? "Unknown"}" deleted`,
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      messageKey: "TRAINING_DELETE_SUCCESS" satisfies MessageKey,
    });

  } catch (err) {
    console.error("DELETE TRAINING ERROR:", err);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey },
      { status: 500 }
    );
  }
}
