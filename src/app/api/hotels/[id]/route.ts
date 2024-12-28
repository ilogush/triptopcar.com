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
    const hotel = await prisma.hotels.update({
      where: { id: parseInt(id) }, // Use the awaited id
      data,
    });

    return NextResponse.json(hotel);
  } catch (error) {
    console.error("Error updating hotel:", error);
    return NextResponse.json({ error: "Failed to update hotel" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Change here
) {
  try {
    // Awaiting params to get id
    const { id } = await params;
    const hotel = await prisma.hotels.delete({
      where: { id: parseInt(id) }, // Use the awaited id
    });

    return NextResponse.json(hotel);
  } catch (error) {
    console.error("Error deleting hotel:", error);
    return NextResponse.json({ error: "Failed to delete hotel" }, { status: 500 });
  }
}
