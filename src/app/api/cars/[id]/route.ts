import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const car = await prisma.cars.update({
      where: { id: parseInt(params.id) },
      data,
    })
    return NextResponse.json(car)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update car' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const car = await prisma.cars.delete({
      where: { id: parseInt(params.id) },
    })
    return NextResponse.json(car)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete car' },
      { status: 500 }
    )
  }
}
