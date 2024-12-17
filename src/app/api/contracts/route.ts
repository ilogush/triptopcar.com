import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Client } from 'pg';

const prisma = new PrismaClient();

// Получение всех контрактов с вложенными клиентами и платежами
export async function GET() {
  try {
    const contracts = await prisma.contracts.findMany({
      include: {
        client: true, // Исправлено: поле `client`, а не `clients`
        payments: true,
      },
    });
    return NextResponse.json(contracts);
  } catch (error) {
    console.error("Error fetching contracts:", error);
    return NextResponse.json({ error: "Failed to fetch contracts" }, { status: 500 });
  }
}

// Создание нового контракта с клиентом и платежами
export async function POST(request: Request) {
    const client = new Client({
      connectionString: process.env.DATABASE_URL, // Строка подключения из .env
    });

    try {
      await client.connect();

      const data = await request.json();
      const { contractData, clientData, paymentsData } = data;

      // Логирование полученных данных
      console.log("Received contract data:", contractData);
      console.log("Received client data:", clientData);
      console.log("Received payments data:", paymentsData);

      // Преобразуем time_return, если оно есть
      const timeReturn = contractData.time_return
        ? `${new Date().toISOString().split('T')[0]} ${contractData.time_return}`
        : null;

      // Проверка входных данных
      if (!clientData || !contractData || !paymentsData) {
        throw new Error("Invalid input data");
      }

      // Выполнение транзакции
      const result = await client.query('BEGIN');

      // Вставка клиента
      const insertClientQuery = `
        INSERT INTO clients (first_name, last_name, passport_number, phone_1, phone_2, status)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `;
      const clientValues = [
        clientData.first_name,
        clientData.last_name,
        clientData.passport_number,
        clientData.phone_1,
        clientData.phone_2,
        clientData.status,
      ];
      const clientResult = await client.query(insertClientQuery, clientValues);
      const clientId = clientResult.rows[0].id;

      // Вставка контракта
 // Добавьте статус в массив значений для контракта
const contractValues = [
    clientId,
    clientData.first_name,
    clientData.last_name,
    clientData.passport_number,
    clientData.phone_1,
    clientData.phone_2,
    contractData.rental_amount,
    contractData.rental_currency,
    contractData.deposit_currency,
    contractData.pickup_location_id,
    contractData.address_return,
    contractData.amount,
    contractData.date_end,
    contractData.date_start,
    contractData.dropoff_address,
    contractData.dropoff_location_id,
    contractData.full_insurance,
    contractData.location_return,
    contractData.manager,
    contractData.mileage_odo,
    contractData.pickup_address,
    contractData.rental_deposit_amount,
    contractData.rental_deposit_currency,
    timeReturn, // Вставляем скорректированное время
    clientData.status || "PENDING", // Статус контракта, если он передан
  ];

  // Обновите запрос на вставку контракта
  const insertContractQuery = `
    INSERT INTO contracts (
      client_id, client_name, client_surname, client_passport_number, client_phone_number,
      client_second_phone_number, rental_amount, rental_currency, deposit_currency,
      pickup_location_id, address_return, amount, date_end, date_start, dropoff_address,
      dropoff_location_id, full_insurance, location_return, manager, mileage_odo,
      pickup_address, rental_deposit_amount, rental_deposit_currency, time_return, status
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
    RETURNING id
  `;


      const contractResult = await client.query(insertContractQuery, contractValues);
      const contractId = contractResult.rows[0].id;

      // Вставка платежа
      const insertPaymentQuery = `
        INSERT INTO payments (contract_id, payment_type, amount, created_at)
        VALUES ($1, $2, $3, $4)
      `;
      const paymentValues = [
        contractId,
        paymentsData[0].payment_type || "Rental Payment",
        paymentsData[0].amount || 0,
        paymentsData[0].created_at || new Date(),
      ];
      await client.query(insertPaymentQuery, paymentValues);

      // Завершаем транзакцию
      await client.query('COMMIT');

      return NextResponse.json({
        message: "Contract created successfully",
        contractId,
        clientId,
      }, { status: 201 });

    } catch (error) {
      // Если произошла ошибка, откатываем транзакцию
      await client.query('ROLLBACK');
      console.error("Error creating contract:", error);
      return NextResponse.json({ error: "Failed to create contract", details: error }, { status: 500 });
    } finally {
      await client.end();
    }
  }
