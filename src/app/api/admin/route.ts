import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = "your-secret-key"; // Замените на безопасный ключ
const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  // Проверка на метод POST
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const { email, password, role } = await req.json(); // Используем req.json() для извлечения данных
  console.log(req.body);

  try {
    // Находим пользователя по email
    const user = await prisma.admins.findUnique({
      where: { email },
    });
    console.log(user);

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Проверяем пароль
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Проверяем роль
    if (user.role !== role) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Проверяем, что все поля определены
    if (!user.id || !user.email || !user.role) {
      console.error("User object is missing required fields:", user);
      return NextResponse.json({ error: "User data is incomplete" }, { status: 500 });
    }

    // Создаем токен
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

    return NextResponse.json({ token }); // Возвращаем токен в ответе
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
