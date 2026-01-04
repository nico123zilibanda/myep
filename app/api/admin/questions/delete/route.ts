import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function DELETE(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.Role.name !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { message: "Invalid question ID" },
        { status: 400 }
      );
    }

    await prisma.question.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Question deleted" });
  } catch (error) {
    console.error("DELETE question error:", error);
    return NextResponse.json(
      { message: "Failed to delete question" },
      { status: 500 }
    );
  }
}
