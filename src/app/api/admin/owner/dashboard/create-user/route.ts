import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
    try {
      const body = await req.json();
      console.log("Received data:", body);  // Логируем полученные данные
      const { name, password, role } = body;

      // Проверяем, существует ли пользователь с таким именем
      const existingUser = await prisma.admins.findUnique({
        where: { name },
      });

      if (existingUser) {
        return NextResponse.json({ error: "User with this name already exists" }, { status: 400 });
      }

      // Хэшируем пароль
      const hashedPassword = await bcrypt.hash(password, 10);

      // Создаем пользователя в базе данных
      const newUser = await prisma.admins.create({
        data: {
          name,
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
