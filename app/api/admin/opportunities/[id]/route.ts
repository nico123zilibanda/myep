import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function DELETE(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.Role.name !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const segments = url.pathname.split("/");
  const id = Number(segments[segments.length - 1]);

  if (isNaN(id)) return NextResponse.json({ message: "Invalid opportunity ID" }, { status: 400 });

  await prisma.opportunity.delete({ where: { id } });
  return NextResponse.json({ message: "Opportunity deleted successfully" });
}

export async function PATCH(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.Role.name !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const segments = url.pathname.split("/");
  const id = Number(segments[segments.length - 1]);

  if (isNaN(id)) return NextResponse.json({ message: "Invalid opportunity ID" }, { status: 400 });

  const data = await req.json();

  const updatedOpportunity = await prisma.opportunity.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      requirements: data.requirements,
      howToApply: data.howToApply,
      deadline: data.deadline ? new Date(data.deadline) : undefined,
      location: data.location,
      attachmentUrl: data.attachmentUrl,
      status: data.status,
      categoryId: data.categoryId,
    },
  });

  return NextResponse.json(updatedOpportunity);
}
