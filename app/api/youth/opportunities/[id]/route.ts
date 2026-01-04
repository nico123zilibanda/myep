import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    // ✅ SAFE ID extraction
    const pathname = new URL(req.url).pathname;
    const id = Number(pathname.split("/").pop());

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 }
      );
    }

    const user = await getCurrentUser();

    const opportunity = await prisma.opportunity.findUnique({
      where: { id },
      include: {
        Category: true,
        SavedOpportunity: user
          ? {
              where: { userId: user.id },
              select: { id: true },
            }
          : false,
      },
    });

    if (!opportunity) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: opportunity.id,
      title: opportunity.title,
      description: opportunity.description,
      requirements: opportunity.requirements,
      howToApply: opportunity.howToApply,
      deadline: opportunity.deadline,
      location: opportunity.location,
      Category: opportunity.Category,
      isSaved: opportunity.SavedOpportunity?.length > 0,
    });
  } catch (error) {
    console.error("YOUTH GET opportunity error:", error);
    return NextResponse.json(
      { message: "Failed to load opportunity" },
      { status: 500 }
    );
  }
}
