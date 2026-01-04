import { NextResponse } from "next/server";

const opportunities = [
  {
    id: 1,
    title: "Mkopo wa Vijana wa Halmashauri",
    description: "Fursa ya mkopo kwa vijana wa Mlele",
  },
  {
    id: 2,
    title: "Mafunzo ya Ujasiriamali",
    description: "Mafunzo kwa vijana",
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const opportunity = opportunities.find((o) => o.id === id);

  if (!opportunity) {
    return NextResponse.json(
      { message: "Fursa haijapatikana" },
      { status: 404 }
    );
  }

  return NextResponse.json(opportunity);
}
