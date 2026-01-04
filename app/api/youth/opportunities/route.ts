import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getCurrentUser();

    const opportunities = await prisma.opportunity.findMany({
      where: {
        status: "PUBLISHED",
      },
      include: {
        Category: {
          select: { name: true },
        },
        SavedOpportunity: user
          ? {
              where: { userId: user.id },
              select: { id: true },
            }
          : false,
      },
      orderBy: { createdAt: "desc" },
    });

    // 🔹 format response
    const formatted = opportunities.map((op) => ({
      id: op.id,
      title: op.title,
      description: op.description,
      deadline: op.deadline,
      location: op.location,
      Category: op.Category,
      isSaved: op.SavedOpportunity?.length > 0,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("YOUTH GET opportunities error:", error);
    return NextResponse.json(
      { message: "Failed to load opportunities" },
      { status: 500 }
    );
  }
}
