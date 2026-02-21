import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { MessageKey } from "@/lib/messages";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { success: false, messageKey: "UNAUTHORIZED" satisfies MessageKey },
      { status: 401 }
    );
  }

  return NextResponse.json({
    id: user.id,
    email: user.email,
    role: user.role,        // "ADMIN" | "YOUTH"
    fullName: user.fullName
  });
}
