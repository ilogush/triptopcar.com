import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = "your-secret-key"; // Замените на безопасный ключ
const prisma = new PrismaClient();

// fetch('/admin/owner') POST
export const POST = async (req: NextRequest) => {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { name, password, role } = await req.json();
    console.log("Received data:", { name, password, role }); // Логируем входящие данные

    // Проверяем, что все данные переданы
    if (!name || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Находим пользователя по имени
    const user = await prisma.admins.findUnique({
      where: { name },
    });
    console.log("User found:", user); // Логируем найденного пользователя

    if (!user) {
      return NextResponse.json({ error: "Invalid name or password" }, { status: 401 });
    }

    // Проверяем пароль
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid name or password" }, { status: 401 });
    }

    // Проверяем роль
    if (user.role !== role) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Проверяем, что все данные в объекте пользователя корректны
    if (!user.id || !user.name || !user.role) {
      return NextResponse.json({ error: "User data is incomplete" }, { status: 500 });
    }

    // Создаем токен, если все данные валидны
    const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

    return NextResponse.json({ token });
  } catch (err) {
    console.error("Error processing request:", err);
    return NextResponse.json({ error: "Internal server error", details: err || err }, { status: 500 });
  }
};
