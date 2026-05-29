import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const pathSegments = url.pathname.split("/");

    const id = Number(
      pathSegments[pathSegments.length - 1]
    );

    if (!id || isNaN(id)) {
      return NextResponse.json(
        {
          message: "Invalid ID",
        },
        {
          status: 400,
        }
      );
    }

    const user = await getCurrentUser();

    if (!user || user.role !== "YOUTH") {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { data, error } =
      await supabaseAdmin
        .from("Training")
        .select(`
          id,
          title,
          description,
          type,
          resourceUrl
        `)
        .eq("id", id)
        .single();

    if (error || !data) {
      console.error(
        "SUPABASE GET TRAINING ERROR:",
        error
      );

      return NextResponse.json(
        {
          message: "Not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      resourceUrl: data.resourceUrl,
    });
  } catch (err) {
    console.error(
      "YOUTH GET TRAINING ERROR:",
      err
    );

    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}