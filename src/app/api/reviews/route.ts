import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const carId = searchParams.get('car_id'); // Получаем car_id из параметров запроса

    if (!carId) {
      return NextResponse.json({ error: "Car ID is required" }, { status: 400 });
    }

    const reviews = await prisma.reviews.findMany({
      where: { car_id: parseInt(carId) }, // Фильтруем по car_id
    });

    return NextResponse.json(reviews);
  }

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const reviews = await prisma.reviews.create({ data });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create reviews" }, { status: 500 });
  }
}
