import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.Role.name !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const opportunities = await prisma.opportunity.findMany({
    include: { Category: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(opportunities);
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.Role.name !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  if (!data.title || !data.deadline || !data.categoryId) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  const newOpportunity = await prisma.opportunity.create({
    data: {
      title: data.title,
      description: data.description || "",
      requirements: data.requirements || "",
      howToApply: data.howToApply || "",
      deadline: new Date(data.deadline),
      location: data.location || "",
      attachmentUrl: data.attachmentUrl || "",
      status: data.status || "PUBLISHED",
      categoryId: data.categoryId,
      createdById: user.id,
    },
  });

  return NextResponse.json(newOpportunity);
}
