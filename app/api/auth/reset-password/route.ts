import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    // 🔐 STEP 1: Hash incoming token
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // 🔍 STEP 2: Get token from DB
    const { data: tokenRecord, error } = await supabaseAdmin
      .from("PasswordResetToken")
      .select("id,userId,expiresAt")
      .eq("token", hashedToken)
      .single();

    if (error || !tokenRecord) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 400 }
      );
    }

    // 🕒 STEP 3: TIME FIX (IMPORTANT 🔥)
    const now = Date.now(); // current timestamp (ms)
    const expires = new Date(tokenRecord.expiresAt).getTime();

    // DEBUG (remove later)
    console.log("NOW:", new Date(now));
    console.log("EXPIRES:", new Date(expires));

    // ⛔ Expiry check (SAFE)
    if (expires <= now) {
      return NextResponse.json(
        { success: false, message: "Token expired" },
        { status: 400 }
      );
    }

    // 🔑 STEP 4: Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 12);

    // 💾 STEP 5: Update user password
    await supabaseAdmin
      .from("User")
      .update({ passwordHash })
      .eq("id", tokenRecord.userId);

    // 🧹 STEP 6: Delete used token
    await supabaseAdmin
      .from("PasswordResetToken")
      .delete()
      .eq("id", tokenRecord.id);

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}