import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.Role.name !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = Number(req.url.split("/").pop());
  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
  }

  const { isActive } = await req.json();

  const updated = await prisma.user.update({
    where: { id },
    data: { isActive },
  });

  return NextResponse.json(updated);
}


export async function DELETE(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.Role.name !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = Number(req.url.split("/").pop());
  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
  }

  await prisma.user.delete({ where: { id } });

  return NextResponse.json({ message: "Youth deleted successfully" });
}
