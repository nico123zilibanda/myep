import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string
) {
  return resend.emails.send({
    from: "Mlele DC <no-reply@yourdomain.com>",
    to,
    subject: "Weka upya nenosiri lako",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
        <h2>Omba la kubadilisha nenosiri</h2>
        <p>Bonyeza kitufe hapa chini kubadilisha nenosiri lako.</p>
        <a href="${resetUrl}"
           style="display:inline-block;padding:12px 20px;
           background:#4f46e5;color:#fff;
           text-decoration:none;border-radius:8px;">
           Badilisha Nenosiri
        </a>
        <p style="margin-top:20px;font-size:12px;color:#666">
          Link hii itaisha baada ya dakika 30.
        </p>
      </div>
    `,
  });
}
