import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { MessageKey } from "@/lib/messages";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  const { data: reset } = await supabaseAdmin
    .from("PasswordReset")
    .select("*")
    .eq("token", token)
    .eq("used", false)
    .single();

  if (!reset || new Date(reset.expiresAt) < new Date()) {
    return NextResponse.json(
      { 
        success: false,
        messageKey: "TOKEN_INVALID" satisfies MessageKey 

      }, 
      { status: 400 }
    );
  }

  const hash = await bcrypt.hash(password, 10);

  await supabaseAdmin
    .from("User")
    .update({ passwordHash: hash })
    .eq("id", reset.userId);

  await supabaseAdmin
    .from("PasswordReset")
    .update({ used: true })
    .eq("id", reset.id);

  return NextResponse.json({
    success: true,
    messageKey: "PASSWORD_RESET_SUCCESS" satisfies MessageKey,
  });
}
