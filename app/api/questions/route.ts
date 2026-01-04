import { NextResponse } from "next/server";

let questions: any[] = [];

// POST /api/questions
export async function POST(request: Request) {
  const body = await request.json();

  const question = {
    id: questions.length + 1,
    ...body,
    status: "pending",
    createdAt: new Date(),
  };

  questions.push(question);

  return NextResponse.json(question, { status: 201 });
}

// GET /api/questions
export async function GET() {
  return NextResponse.json(questions);
}
