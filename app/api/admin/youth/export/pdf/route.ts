import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCurrentUser } from "@/lib/auth";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const { data: youth, error } =
      await supabaseAdmin
        .from("User")
        .select(`
          fullName,
          email,
          phone,
          educationLevel,
          program,
          employmentStatus,
          isActive,
          createdAt
        `)
        .eq("roleId", 1)
        .order("createdAt", {
          ascending: false,
        });

    if (error) {
      return new Response(error.message, {
        status: 500,
      });
    }

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "ORODHA YA VIJANA",
      14,
      20
    );

    doc.setFontSize(11);

    doc.text(
      `Jumla ya Vijana: ${youth.length}`,
      14,
      30
    );

    autoTable(doc, {
      startY: 40,

      head: [
        [
          "Jina",
          "Email",
          "Simu",
          "Elimu",
          "Taaluma",
          "Ajira",
          "Hali",
          "Tarehe",
        ],
      ],

      body: youth.map((v) => [
        v.fullName ?? "-",
        v.email ?? "-",
        v.phone ?? "-",
        v.educationLevel ?? "-",
        v.program ?? "-",
        v.employmentStatus ?? "-",
        v.isActive
          ? "Hai"
          : "Si Hai",
        v.createdAt
          ? new Date(
              v.createdAt
            ).toLocaleDateString()
          : "-",
      ]),

      styles: {
        fontSize: 8,
      },

      headStyles: {
        fillColor: [41, 128, 185],
      },
    });

    const pdfBuffer = Buffer.from(
      doc.output("arraybuffer")
    );

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type":
          "application/pdf",

        "Content-Disposition":
          'attachment; filename="vijana.pdf"',
      },
    });
  } catch (error) {
    console.error(
      "PDF EXPORT ERROR:",
      error
    );

    return new Response(
      "Failed to generate PDF",
      {
        status: 500,
      }
    );
  }
}