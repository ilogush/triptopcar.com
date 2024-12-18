import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const payments = await prisma.payments.findMany()
    return NextResponse.json(payments)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const payment = await prisma.payments.create({ data })
    return NextResponse.json(payment)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    )
  }
}