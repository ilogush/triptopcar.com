import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Change here
) {
  try {
    const data = await request.json();

    // Awaiting params to get id
    const { id } = await params;
    const review = await prisma.reviews.update({
      where: { id: parseInt(id) }, // Use the awaited id
      data,
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Change here
) {
  try {
    // Awaiting params to get id
    const { id } = await params;
    const review = await prisma.reviews.delete({
      where: { id: parseInt(id) }, // Use the awaited id
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}

