import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const location = await prisma.location.update({
      where: { id: parseInt(params.id) },
      data,
    });
    return NextResponse.json(location);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update location" }, { status: 500 });
  }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
      const location = await prisma.location.delete({
        where: { id: parseInt(params.id) },
      });
      return NextResponse.json(location);
    } catch (error) {
      return NextResponse.json({ error: "Failed to delete location" }, { status: 500 });
    }
  }
