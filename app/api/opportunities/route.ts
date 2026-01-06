import { NextResponse } from "next/server";

let opportunities = [
  {
    id: 1,
    title: "Mkopo wa Vijana wa Halmashauri",
    category: "Mitaji",
    deadline: "2025-09-30",
    location: "Mlele",
  },
  {
    id: 2,
    title: "Mafunzo ya Ujasiriamali",
    category: "Mafunzo",
    deadline: "2025-10-15",
    location: "Online",
  },
];

// GET /api/opportunities
export async function GET() {
  return NextResponse.json(opportunities);
}

// POST /api/opportunities
export async function POST(request: Request) {
  const body = await request.json();

  const newOpportunity = {
    id: opportunities.length + 1,
    ...body,
  };

  opportunities.push(newOpportunity);

  return NextResponse.json(newOpportunity, { status: 201 });
}
