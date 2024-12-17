import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const locations = await prisma.location.findMany();
    return NextResponse.json(locations);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const locations = await prisma.location.create({ data });
    return NextResponse.json(locations);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create locations" }, { status: 500 });
  }
}
