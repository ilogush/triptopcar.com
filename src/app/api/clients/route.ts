import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Получение всех клиентов
export async function GET() {
  try {
    const clients = await prisma.clients.findMany(); // Получаем всех клиентов
    return NextResponse.json(clients); // Возвращаем данные клиентов
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}

// Создание нового клиента
export async function POST(request: Request) {
  try {
    const data = await request.json(); // Получаем данные из тела запроса

    const { first_name, last_name, passport_number, phone_1, phone_2, status, location_id, hotel_name } = data;

    // Создание клиента
    const client = await prisma.clients.create({
      data: {
        first_name,
        last_name,
        passport_number,
        phone_1,
        phone_2,
        status,
        location_id,
        hotel_name,
      },
    });

    return NextResponse.json(client); // Возвращаем созданного клиента
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 });
  }
}
