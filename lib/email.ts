import { resend } from "./resend";

export async function sendResetEmail({
  to,
  name,
  token,
}: {
  to: string;
  name: string;
  token: string;
}) {
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: "Mlele DC <onboarding@resend.dev>",
    to,
    subject: "Reset your password",
    html: `
      <div style="font-family:sans-serif">
        <h2>Hello ${name},</h2>
        <p>You requested to reset your password.</p>
        <p>
          <a href="${resetLink}" 
             style="background:#4f46e5;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;">
             Reset Password
          </a>
        </p>
        <p>This link expires in 1 hour.</p>
      </div>
    `,
  });
}