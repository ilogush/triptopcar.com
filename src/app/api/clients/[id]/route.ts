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
    const clientId = parseInt(id);
    if (isNaN(clientId)) {
      return NextResponse.json({ error: 'Invalid client id' }, { status: 400 });
    }

    // Update client in database
    const client = await prisma.clients.update({
      where: { id: clientId },
      data,
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error('Error updating client:', error);
    return NextResponse.json(
      { error: 'Failed to update client' },
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
    const clientId = parseInt(id);

    const client = await prisma.clients.delete({
      where: { id: clientId },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error('Error deleting client:', error);
    return NextResponse.json(
      { error: 'Failed to delete client' },
      { status: 500 }
    );
  }
}
