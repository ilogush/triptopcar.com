import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();


export const GET = async (req: NextRequest) => {
  try {
    // Получаем параметры из URL
    const managerId = req.nextUrl.searchParams.get("manager_id");

    if (!managerId) {
      return NextResponse.json({ error: "Manager ID is required" }, { status: 400 });
    }

    // Получаем все отчеты для указанного manager_id
    const reports = await prisma.payments.findMany({
      where: {
        manager_id: parseInt(managerId), // Используем manager_id, переданный в URL
      },
    });

    console.log("reports", reports);


    return NextResponse.json(reports); // Возвращаем JSON с найденными данными
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to retrieve reports" }, { status: 500 });
  }
};
