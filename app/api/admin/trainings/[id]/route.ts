import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function DELETE(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.Role.name !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = Number(req.url.split("/").pop());
  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid training ID" }, { status: 400 });
  }

  await prisma.training.delete({ where: { id } });
  return NextResponse.json({ message: "Training deleted" });
}

export async function PATCH(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.Role.name !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = Number(req.url.split("/").pop());
  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid training ID" }, { status: 400 });
  }

  const data = await req.json();

  const updated = await prisma.training.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      type: data.type,
      resourceUrl: data.resourceUrl,
    },
  });

  return NextResponse.json(updated);
}
