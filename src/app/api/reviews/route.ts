import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const reviews = await prisma.reviews.findMany();
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const reviews = await prisma.reviews.create({ data });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create reviews" }, { status: 500 });
  }
}
