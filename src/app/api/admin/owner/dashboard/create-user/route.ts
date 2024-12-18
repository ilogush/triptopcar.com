import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Обработка POST-запроса
export const POST = async (req: Request) => {
  try {
    // Парсим тело запроса
    const body = await req.json();
    const { email, password, role } = body;

    // Проверяем, существует ли пользователь с таким email
    const existingUser = await prisma.admins.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
    }

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем пользователя в базе данных
    const newUser = await prisma.admins.create({
      data: {
        email,
        password_hash: hashedPassword,
        role,
      },
    });

    return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /create-user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
