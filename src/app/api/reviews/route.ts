import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const carId = searchParams.get("car_id"); // Получаем car_id из параметров запроса

    let reviews;

    if (!carId) {
      // Если car_id не указан, возвращаем все отзывы
      reviews = await prisma.reviews.findMany();
    } else {
      // Если car_id указан, фильтруем отзывы
      reviews = await prisma.reviews.findMany({
        where: { car_id: parseInt(carId, 10) }, // Безопасное преобразование car_id в число
      });
    }

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
