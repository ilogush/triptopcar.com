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
    const location = await prisma.location.update({
      where: { id: parseInt(id) }, // Use the awaited id
      data,
    });

    return NextResponse.json(location);
  } catch (error) {
    console.error("Error updating location:", error);
    return NextResponse.json({ error: "Failed to update location" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Change here
) {
  try {
    // Awaiting params to get id
    const { id } = await params;
    const location = await prisma.location.delete({
      where: { id: parseInt(id) }, // Use the awaited id
    });

    return NextResponse.json(location);
  } catch (error) {
    console.error("Error deleting location:", error);
    return NextResponse.json({ error: "Failed to delete location" }, { status: 500 });
  }
}
