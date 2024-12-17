import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const review = await prisma.reviews.update({
      where: { id: parseInt(params.id) },
      data,
    });
    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const review = await prisma.reviews.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
