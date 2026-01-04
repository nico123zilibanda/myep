// app/api/youth/saved-opportunities/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const saved = await prisma.savedOpportunity.findMany({
      where: { userId: user.id },
      include: { Opportunity: { include: { Category: true } } },
      orderBy: { createdAt: "desc" },
    });

    // Map for frontend
    const formatted = saved.map((s) => ({
      id: s.Opportunity.id,
      title: s.Opportunity.title,
      description: s.Opportunity.description,
      deadline: s.Opportunity.deadline,
      location: s.Opportunity.location,
      Category: s.Opportunity.Category,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("YOUTH GET saved opportunities error:", error);
    return NextResponse.json({ message: "Failed to load saved opportunities" }, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { opportunityId } = await req.json();

    if (!opportunityId || isNaN(opportunityId)) {
      return NextResponse.json(
        { message: "Invalid opportunity ID" },
        { status: 400 }
      );
    }

    await prisma.savedOpportunity.create({
      data: {
        userId: user.id,
        opportunityId: Number(opportunityId),
      },
    });

    return NextResponse.json({
      message: "Opportunity saved successfully",
    });
  } catch (error: any) {
    // Handle duplicate save gracefully
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Opportunity already saved" },
        { status: 409 }
      );
    }

    console.error("YOUTH SAVE opportunity error:", error);
    return NextResponse.json(
      { message: "Failed to save opportunity" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { opportunityId } = await req.json();

    if (!opportunityId || isNaN(opportunityId)) {
      return NextResponse.json(
        { message: "Invalid opportunity ID" },
        { status: 400 }
      );
    }

    await prisma.savedOpportunity.delete({
      where: {
        userId_opportunityId: {
          userId: user.id,
          opportunityId: Number(opportunityId),
        },
      },
    });

    return NextResponse.json({
      message: "Opportunity removed from saved",
    });
  } catch (error) {
    console.error("YOUTH UNSAVE opportunity error:", error);
    return NextResponse.json(
      { message: "Failed to unsave opportunity" },
      { status: 500 }
    );
  }
}
