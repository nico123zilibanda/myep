import { NextResponse } from "next/server";
import { logAudit } from "@/lib/audit";
import { getCurrentUser } from "@/lib/auth";
import { getRequestMetaFromReq } from "@/lib/requestMeta";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  const meta = getRequestMetaFromReq(req);

  if (user) {
    logAudit({
      action: "LOGOUT",
      entity: "AUTH",
      userId: user.id,
      role: user.role,
      description: "User logged out",
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    }).catch(console.error);
  }

  const response = NextResponse.json({
    success: true,
    message: "Umetoka kwenye akaunti kikamilifu",
  });

  response.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
