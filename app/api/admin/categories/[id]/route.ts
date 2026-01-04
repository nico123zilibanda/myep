import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function DELETE(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.Role.name !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // 🔥 CHUKUA ID KUTOKA KWENYE URL
  const url = new URL(req.url);
  const segments = url.pathname.split("/");
  const id = segments[segments.length - 1];

  console.log("URL ID:", id);

  const categoryId = Number(id);
  if (isNaN(categoryId)) {
    return NextResponse.json(
      { message: "Invalid category ID" },
      { status: 400 }
    );
  }

  await prisma.category.delete({
    where: { id: categoryId },
  });

  return NextResponse.json({
    message: "Category deleted successfully",
  });
}

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.Role.name !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 🔥 CHUKUA ID KUTOKA KWENYE URL
    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.length - 1];

    const categoryId = Number(id);
    if (isNaN(categoryId)) {
      return NextResponse.json({ message: "Invalid category ID" }, { status: 400 });
    }

    const { name, description } = await req.json();

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { message: "Jina la category linahitajika" },
        { status: 400 }
      );
    }

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: { name, description },
    });

    return NextResponse.json(updatedCategory);
  } catch (error: any) {
    console.error("PATCH CATEGORY ERROR:", error);
    return NextResponse.json({ message: "Failed to update category" }, { status: 500 });
  }
}
