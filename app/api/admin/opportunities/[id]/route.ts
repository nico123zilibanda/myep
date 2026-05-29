import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { getRequestMetaFromReq } from "@/lib/requestMeta";
import { MessageKey } from "@/lib/messages";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

// ================= DELETE OPPORTUNITY =================
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    const meta = getRequestMetaFromReq(req);

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          messageKey: "UNAUTHORIZED",
        },
        { status: 401 }
      );
    }

    const { id: idParam } = await params;
    const id = Number(idParam);

    if (isNaN(id)) {
      return NextResponse.json(
        {
          success: false,
          messageKey: "OPPORTUNITY_NOT_FOUND",
        },
        { status: 400 }
      );
    }

    const { data: opportunity } = await supabaseAdmin
      .from("Opportunity")
      .select("title")
      .eq("id", id)
      .single();

    const { error } = await supabaseAdmin
      .from("Opportunity")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          messageKey: "OPPORTUNITY_FAILED_DELETED",
        },
        { status: 500 }
      );
    }

    await logAudit({
      action: "DELETE",
      entity: "OPPORTUNITY",
      entityId: id,
      description: `Opportunity "${
        opportunity?.title ?? "Unknown"
      }" deleted`,
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });

    return NextResponse.json({
      success: true,
      messageKey: "OPPORTUNITY_DELETE_SUCCESS",
    });
  } catch (err) {
    console.error("DELETE OPPORTUNITY ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        messageKey: "SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}


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

    const url = new URL(req.url);
    const id = Number(url.pathname.split("/").pop());

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, messageKey: "OPPORTUNITY_NOT_FOUND" satisfies MessageKey },
        { status: 400 }
      );
    }

    // 🔥 CHANGE: JSON → FormData
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) || "";
    const requirements = (formData.get("requirements") as string) || "";
    const howToApply = (formData.get("howToApply") as string) || "";
    const deadline = formData.get("deadline") as string;
    const location = (formData.get("location") as string) || "";
    const status = (formData.get("status") as string) || "PUBLISHED";
    const categoryId = Number(formData.get("categoryId"));

    // 🔥 RESOURCE LOGIC
    const resourceTypeRaw = formData.get("resourceType") as string | null;

    const resourceType =
      resourceTypeRaw === "VIDEO" ||
      resourceTypeRaw === "PDF" ||
      resourceTypeRaw === "LINK"
        ? resourceTypeRaw
        : null;

    const file = formData.get("file") as File | null;
    const resourceUrlInput = formData.get("resourceUrl") as string | null;

    if (!title || !deadline || !categoryId) {
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" satisfies MessageKey },
        { status: 400 }
      );
    }

    // 🔥 GET EXISTING (IMPORTANT for update logic)
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from("Opportunity")
      .select("resourceType, resourceUrl")
      .eq("id", id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json(
        { success: false, messageKey: "OPPORTUNITY_NOT_FOUND" satisfies MessageKey },
        { status: 404 }
      );
    }

    let resourceUrl: string | null = resourceUrlInput || null;

    // ================= FILE UPLOAD =================
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const cloudinaryType =
        resourceType === "PDF"
          ? "raw"
          : resourceType === "VIDEO"
          ? "video"
          : "auto";

      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: cloudinaryType,
              folder: "opportunities",
              use_filename: true,
              unique_filename: true,
            },
            (err, result) => (err ? reject(err) : resolve(result))
          )
          .end(buffer);
      });

      resourceUrl = uploadResult.secure_url;
    }

    // ================= VALIDATION =================
    if (resourceType === "LINK" && !resourceUrl) {
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" satisfies MessageKey },
        { status: 400 }
      );
    }

    if ((resourceType === "VIDEO" || resourceType === "PDF") && !file && !existing.resourceUrl) {
      return NextResponse.json(
        { success: false, messageKey: "ACTION_FAILED" satisfies MessageKey },
        { status: 400 }
      );
    }

    // 🔥 KEEP OLD FILE IF NO NEW ONE
    if (!file && !resourceUrlInput) {
      resourceUrl = existing.resourceUrl;
    }

    // 🔥 CLEAR RESOURCE IF TYPE REMOVED
    const finalResourceType = resourceType || null;
    const finalResourceUrl = finalResourceType ? resourceUrl : null;

    const { data, error } = await supabaseAdmin
      .from("Opportunity")
      .update({
        title,
        description,
        requirements,
        howToApply,
        deadline: new Date(deadline).toISOString(),
        location,
        status,
        categoryId,

        // 🔥 RESOURCE
        resourceType: finalResourceType,
        resourceUrl: finalResourceUrl,
      })
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
      entity: "OPPORTUNITY",
      entityId: id,
      description: `Opportunity "${data.title}" updated (${finalResourceType || "NO_RESOURCE"})`,
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      messageKey: "OPPORTUNITY_UPDATE_SUCCESS" satisfies MessageKey,
      data,
    });

  } catch (err) {
    console.error("PATCH OPPORTUNITY ERROR:", err);
    return NextResponse.json(
      { success: false, messageKey: "SERVER_ERROR" satisfies MessageKey },
      { status: 500 }
    );
  }
}
