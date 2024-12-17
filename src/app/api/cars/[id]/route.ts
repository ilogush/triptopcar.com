import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Change here
) {
  try {
    const data = await request.json();

    // Await the params promise
    const { id } = await params; // Awaiting params to get id
    const carId = parseInt(id);
    if (isNaN(carId)) {
      return NextResponse.json({ error: 'Invalid car id' }, { status: 400 });
    }

    // Update car in database
    const car = await prisma.cars.update({
      where: { id: carId },
      data,
    });

    return NextResponse.json(car);
  } catch (error) {
    console.error('Error updating car:', error);
    return NextResponse.json(
      { error: 'Failed to update car' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Change here
) {
  try {
    const { id } = await params; // Awaiting params to get id
    const car = await prisma.cars.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete car' },
      { status: 500 }
    );
  }
}
