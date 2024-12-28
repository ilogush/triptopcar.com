import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // Получаем id из params
    const body = await request.json(); // Получаем данные из тела запроса

    // Обновляем запись в базе данных
    const updatedCar = await prisma.cars.update({
      where: { id: parseInt(id) }, // Находим машину по id
      data: body, // Данные для обновления
    });

    return NextResponse.json(updatedCar); // Возвращаем обновленную машину
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json({ error: "Failed to update car" }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // Awaiting params to get id
    const car = await prisma.cars.findUnique({
      where: { id: Number(id) },
    });

    if (!car) {
      return NextResponse.json({ message: "Car not found" }, { status: 404 });
    }

    return NextResponse.json(car);
  } catch (error) {
    console.error("Error fetching car:", error);
    return NextResponse.json({ error: "Failed to fetch car" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }, // Awaiting params to get id
) {
  try {
    const { id } = await params; // Awaiting params to get id
    const car = await prisma.cars.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(car);
  } catch (error) {
    console.error("Error deleting car:", error);
    return NextResponse.json({ error: "Failed to delete car" }, { status: 500 });
  }
}
