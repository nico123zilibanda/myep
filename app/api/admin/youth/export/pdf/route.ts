import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import PDFDocument from "pdfkit";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.Role.name !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch youth users
    const vijana = await prisma.user.findMany({
      where: { Role: { is: { name: "YOUTH" } } },
      select: {
        fullName: true,
        email: true,
        phone: true,
        educationLevel: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Create PDF document
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks: Uint8Array[] = [];

    // Collect data chunks
    doc.on("data", (chunk) => chunks.push(chunk));

    // Write content
    doc.fontSize(18).text("ORODHA YA VIJANA", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Jumla ya Vijana: ${vijana.length}`);
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
    vijana.forEach((v) => {
      doc.text(v.fullName, 50, doc.y, { width: 120 });
      doc.text(v.email, 180, doc.y, { width: 170 });
      doc.text(v.phone || "-", 360, doc.y, { width: 80 });
      doc.text(v.isActive ? "Active" : "Inactive", 450, doc.y, { width: 80 });
      doc.moveDown(0.5);
    });

    // Finalize PDF
    doc.end();

    // Wait for PDF to be fully generated
    const pdfBuffer: Uint8Array = await new Promise((resolve, reject) => {
      const buffers: Uint8Array[] = [];
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", (err) => reject(err));
    });

    // Return PDF response
return new NextResponse(
  new Uint8Array(pdfBuffer),
  {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="vijana.pdf"',
    },
  }
);
  } catch (error) {
    console.error("PDF EXPORT ERROR:", error);
    return NextResponse.json({ message: "Failed to export PDF" }, { status: 500 });
  }
}
