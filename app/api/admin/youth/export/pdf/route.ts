// app/api/admin/youth/export/pdf/route.ts
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";
import PDFDocument from "pdfkit";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN")
    return new Response("Unauthorized", { status: 401 });

  const { data: youth, error } = await supabaseAdmin
    .from("User")
    .select("fullName, email, phone, educationLevel, isActive, createdAt")
    .eq("roleId", 1) // ✅ YOUTH roleId
    .order("createdAt", { ascending: false });

  if (error) return new Response(error.message, { status: 500 });

  const doc = new PDFDocument({ size: "A4", margin: 50 });

  // Collect chunks
  const chunks: Uint8Array[] = [];
  doc.on("data", (chunk) => chunks.push(chunk));
  doc.on("end", () => {});

  // Title
  doc.fontSize(18).text("ORODHA YA VIJANA", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Jumla ya Vijana: ${youth.length}`);
  doc.moveDown();

  // Table headers
  doc.font("Times-Bold");
  doc.text("Jina", 50, doc.y, { width: 120 });
  doc.text("Email", 180, doc.y, { width: 170 });
  doc.text("Simu", 360, doc.y, { width: 80 });
  doc.text("Status", 450, doc.y, { width: 80 });
  doc.moveDown(0.5);

  // Table content
  doc.font("Times-Roman");
  youth.forEach((v) => {
    doc.text(v.fullName, 50, doc.y, { width: 120 });
    doc.text(v.email, 180, doc.y, { width: 170 });
    doc.text(v.phone ?? "-", 360, doc.y, { width: 80 });
    doc.text(v.isActive ? "Active" : "Inactive", 450, doc.y, { width: 80 });
    doc.moveDown(0.5);
  });

  doc.end();

  // Wait for PDF buffer
  const pdfBuffer: Uint8Array = await new Promise((resolve, reject) => {
    const buffers: Uint8Array[] = [];
    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", (err) => reject(err));
  });

  return new Response(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="vijana.pdf"',
    },
  });
}
