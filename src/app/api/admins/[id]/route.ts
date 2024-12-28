
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  console.log("Полученные параметры:", resolvedParams);

  const { id } = resolvedParams;
  console.log(id);

  if (!id) {
    return NextResponse.json({ error: "Manager ID is required" }, { status: 400 });
  }

  try {
    const admin = await prisma.admins.findUnique({
      where: { id: Number(id) },
    });

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json({ name: admin.name });
  } catch (error) {
    console.error("Error fetching admin:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

