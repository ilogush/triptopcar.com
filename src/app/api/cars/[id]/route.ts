import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function PUT(
    request: NextRequest,
    context: { params: { id: string } }
  ) {
    try {
      const data = await request.json();

      // Получаем id из параметров маршрута
      const carId = parseInt(context.params.id);
      if (isNaN(carId)) {
        return NextResponse.json({ error: 'Invalid car id' }, { status: 400 });
      }

      // Обновление автомобиля в базе данных
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
