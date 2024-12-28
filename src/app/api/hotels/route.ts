import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const hotels = await prisma.hotels.findMany();
    return NextResponse.json(hotels);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch hotels" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const hotels = await prisma.hotels.create({ data });
    return NextResponse.json(hotels);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create hotels" }, { status: 500 });
  }
}
