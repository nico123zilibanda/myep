import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { getRequestMetaFromReq } from "@/lib/requestMeta";
import { MessageKey } from "@/lib/messages";

export const runtime = "nodejs";

// ================= GET ALL OPPORTUNITIES =================
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          messageKey: "UNAUTHORIZED" satisfies MessageKey,
        },
        { status: 401 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("Opportunity")
      .select(`
        *,
        Category:categoryId (id, name)
      `)
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("GET OPPORTUNITIES ERROR:", error);
      return NextResponse.json(
        {
          success: false,
          messageKey: "OPPORTUNITY_FETCH_FAILED" satisfies MessageKey,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET OPPORTUNITIES ERROR:", err);
    return NextResponse.json(
      {
        success: false,
        messageKey: "SERVER_ERROR" satisfies MessageKey,
      },
      { status: 500 }
    );
  }
}

// ================= CREATE OPPORTUNITY =================
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const meta = getRequestMetaFromReq(req);

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          messageKey: "UNAUTHORIZED" satisfies MessageKey,
        },
        { status: 401 }
      );
    }

    //FormData
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) || "";
    const requirements = (formData.get("requirements") as string) || "";
    const howToApply = (formData.get("howToApply") as string) || "";
    const deadline = formData.get("deadline") as string;
    const location = (formData.get("location") as string) || "";
    const status = (formData.get("status") as string) || "PUBLISHED";
    const categoryId = Number(formData.get("categoryId")) || null;
    const resourceType = formData.get("resourceType") as
      | "VIDEO"
      | "PDF"
      | "LINK"
      | null;

    const file = formData.get("file") as File | null;
    const resourceUrlInput = formData.get("resourceUrl") as string | null;

    //VALIDATION
    if (!title || !deadline) {
      return NextResponse.json(
        {
          success: false,
          messageKey: "ACTION_FAILED" satisfies MessageKey,
        },
        { status: 400 }
      );
    }

    let resourceUrl = resourceUrlInput || "";

    // ================= CLOUDINARY UPLOAD =================
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
              access_mode: "public",
              use_filename: true,
              unique_filename: true,
            },
            (err, result) => (err ? reject(err) : resolve(result))
          )
          .end(buffer);
      });

      resourceUrl = uploadResult.secure_url;
    }

    // VALIDATION
    if (resourceType && !resourceUrl) {
      return NextResponse.json(
        {
          success: false,
          messageKey: "ACTION_FAILED" satisfies MessageKey,
        },
        { status: 400 }
      );
    }

    //INSER DATA
    const { data: newOpportunity, error } = await supabaseAdmin
      .from("Opportunity")
      .insert({
        title,
        description,
        requirements,
        howToApply,
        deadline: new Date(deadline).toISOString(),
        location,
        status,
        categoryId,
        createdById: user.id,
        resourceType,
        resourceUrl,
      })
      .select()
      .single();

    if (error) throw error;

    logAudit({
      action: "CREATE",
      entity: "OPPORTUNITY",
      entityId: newOpportunity.id,
      description: `Opportunity "${newOpportunity.title}" created (${resourceType || "NO_RESOURCE"})`,
      userId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);

    return NextResponse.json(
      {
        success: true,
        messageKey: "OPPORTUNITY_CREATE_SUCCESS" satisfies MessageKey,
        data: newOpportunity,
      },
      { status: 201 }
    );

  } catch (err) {
    console.error("OPPORTUNITY POST ERROR:", err);
    return NextResponse.json(
      {
        success: false,
        messageKey: "SERVER_ERROR" satisfies MessageKey,
      },
      { status: 500 }
    );
  }
}
