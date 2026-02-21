import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import crypto from "crypto";
import { logAudit } from "@/lib/audit";
import { MessageKey } from "@/lib/messages";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email)
    return NextResponse.json(
  {
    success: false, 
    messageKey: "ACTION_FAILED" satisfies MessageKey
  }, 
  { status: 400 }
);

  const { data: user } = await supabaseAdmin
    .from("User")
    .select("id,email")
    .eq("email", email)
    .single();

  // Always return success (prevent email enumeration)
  if (!user) {
    return NextResponse.json(
      {
        success: true,
        messageKey: "RESET_EMAIL_SENT" satisfies MessageKey,

      }
    );
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 mins

  await supabaseAdmin
    .from("PasswordReset")
    .insert({
    userId: user.id,
    token,
    expiresAt: expires,
  });

const baseUrl = process.env.APP_URL ?? "http://localhost:3000";
const resetUrl = `${baseUrl}/reset-password?token=${token}`;

await sendPasswordResetEmail(user.email, resetUrl);


  /**
   * SEND EMAIL HERE
   * Nodemailer / Resend / Postmark
   */

  logAudit({
    action: "PASSWORD_RESET_REQUEST",
    entity: "AUTH",
    userId: user.id,
    description: "Password reset requested",
  });

  return NextResponse.json({
    success: true,
    messageKey: "RESET_EMAIL_SENT" satisfies MessageKey,
  });
}
