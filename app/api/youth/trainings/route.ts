import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const trainings = await prisma.training.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        resourceUrl: true,
        createdAt: true,
      },
    });

    return NextResponse.json(trainings);
  } catch (error) {
    console.error("YOUTH GET trainings error:", error);
    return NextResponse.json(
      { message: "Failed to load trainings" },
      { status: 500 }
    );
  }
}
