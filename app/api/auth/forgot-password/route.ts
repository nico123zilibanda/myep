import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    // 🔐 hash incoming token
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // 🔥 VALIDATE USING DB TIME (BEST FIX)
    const { data: tokenRecord, error } = await supabaseAdmin
      .from("PasswordResetToken")
      .select("id,userId")
      .eq("token", hashedToken)
      .gt("expiresAt", new Date().toISOString())
      .single();

    if (error || !tokenRecord) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // 🔑 hash new password
    const passwordHash = await bcrypt.hash(newPassword, 12);

    // 💾 update user
    await supabaseAdmin
      .from("User")
      .update({ passwordHash })
      .eq("id", tokenRecord.userId);

    // 🧹 delete token
    await supabaseAdmin
      .from("PasswordResetToken")
      .delete()
      .eq("id", tokenRecord.id);

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("RESET ERROR:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}