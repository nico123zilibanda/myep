import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      opportunitiesCount,
      trainingsCount,
      questionsCount,
    ] = await Promise.all([
      prisma.opportunity.count(),
      prisma.training.count(),
      prisma.question.count(), // maswali ya vijana
    ]);

    return NextResponse.json({
      opportunities: opportunitiesCount,
      trainings: trainingsCount,
      questions: questionsCount,
    });
  } catch (error) {
    console.error("YOUTH DASHBOARD STATS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to load dashboard stats" },
      { status: 500 }
    );
  }
}
