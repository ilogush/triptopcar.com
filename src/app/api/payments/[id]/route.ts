import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Change here
) {
  try {
    const data = await request.json();

    // Awaiting params to get id
    const { id } = await params;
    const payment = await prisma.payments.update({
      where: { id: parseInt(id) }, // Use the awaited id
      data,
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.error('Error updating payment:', error);
    return NextResponse.json(
      { error: 'Failed to update payment' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Change here
) {
  try {
    // Awaiting params to get id
    const { id } = await params;
    const payment = await prisma.payments.delete({
      where: { id: parseInt(id) }, // Use the awaited id
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.error('Error deleting payment:', error);
    return NextResponse.json(
      { error: 'Failed to delete payment' },
      { status: 500 }
    );
  }
}
