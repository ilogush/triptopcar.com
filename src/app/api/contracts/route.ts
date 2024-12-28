import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Client } from "pg";

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
      ? `${new Date().toISOString().split("T")[0]} ${contractData.time_return}`
      : null;

    // Проверка входных данных
    if (!clientData || !contractData || !paymentsData) {
      throw new Error("Invalid input data");
    }

    // Выполнение транзакции
    const result = await client.query("BEGIN");

    async function createHotel(name: string) {
      const existingHotel = await prisma.hotels.findFirst({
        where: { name },
      });

      if (existingHotel) {
        return existingHotel.id; // Если отель уже существует, возвращаем его ID
      }

      const newHotel = await prisma.hotels.create({
        data: {
          name,
        },
      });

      return newHotel.id; // Возвращаем ID нового отеля
    }

    const pickupHotelId = await createHotel(contractData.pickup_address);
    const dropoffHotelId = await createHotel(contractData.dropoff_address);

    const carId = contractData.car_id;
    const mileageOdo = contractData.mileage_odo;

    if (!carId) {
      throw new Error("Car ID is required");
    }


    const carQuery = `SELECT ode FROM cars WHERE id = $1`;
    const carResult = await client.query(carQuery, [carId]);

    if (carResult.rowCount === 0) {
      throw new Error("Car not found");
    }

    const currentOdo = carResult.rows[0].ode;

    if (mileageOdo < currentOdo) {
      throw new Error(`Mileage ODO (${mileageOdo}) cannot be less than current car ODO (${currentOdo})`);
    }

    console.log(mileageOdo);

    // Обновление пробега автомобиля
    const updateCarQuery = `UPDATE cars SET ode = $1 WHERE id = $2`;
    await client.query(updateCarQuery, [mileageOdo, carId]);

    const updateCarQueryODE = `UPDATE cars SET is_available = $1 WHERE id = $2`;
    await client.query(updateCarQueryODE, [false, carId]);

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

    // Вставка контракта без location_return
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
      contractData.date_end,
      contractData.date_start,
      contractData.dropoff_address,
      contractData.dropoff_location_id,
      contractData.full_insurance,
      contractData.manager,
      contractData.mileage_odo,
      contractData.pickup_address,
      contractData.rental_deposit_amount,
      contractData.rental_deposit_currency,
      timeReturn, // Вставляем скорректированное время
      clientData.status || "PENDING", // Статус контракта, если он передан
      contractData.car_id, // Добавляем car_id в запрос
    ];

    // Обновите запрос на вставку контракта без location_return
    const insertContractQuery = `
    INSERT INTO contracts (
      client_id, client_name, client_surname, client_passport_number, client_phone_number,
      client_second_phone_number, rental_amount, rental_currency, deposit_currency,
      pickup_location_id, date_end, date_start, dropoff_address,
      dropoff_location_id, full_insurance, manager, mileage_odo,
      pickup_address, rental_deposit_amount, rental_deposit_currency, time_return, status, car_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
    RETURNING id
  `;

    const contractResult = await client.query(insertContractQuery, contractValues);
    const contractId = contractResult.rows[0].id;

    // Вставка платежа
    const insertPaymentQuery = `
INSERT INTO payments (contract_id, payment_type, amount, currency, created_at, car_number, manager_id)
VALUES ($1, $2, $3, $4, $5, $6, $7)
`;
    const paymentValues = [
      contractId,
      paymentsData[0].payment_type || "Rental Payment", // Тип платежа
      paymentsData[0].amount || 0, // Сумма платежа
      contractData.rental_currency,
      paymentsData[0].created_at || new Date(), // Дата создания
      paymentsData[0].car_number || null, // Номер автомобиля
      paymentsData[0].managerId || null, // Номер автомобиля
    ];
    await client.query(insertPaymentQuery, paymentValues);

    const insertPaymentQueryTwo = `
INSERT INTO payments (contract_id, payment_type, amount, currency, created_at, car_number, manager_id)
VALUES ($1, $2, $3, $4, $5, $6, $7)
`;
    const paymentValuesTwo = [
      contractId,
      paymentsData[0].payment_type || "Rental Payment", // Тип платежа
      contractData.rental_deposit_amount || 0, // Сумма платежа
      contractData.deposit_currency,
      paymentsData[0].created_at || new Date(), // Дата создания
      paymentsData[0].car_number || null, // Номер автомобиля
      paymentsData[0].managerId || null, // Номер автомобиля
    ];
    await client.query(insertPaymentQueryTwo, paymentValuesTwo);

    // Завершаем транзакцию
    await client.query("COMMIT");

    return NextResponse.json(
      {
        message: "Contract created successfully",
        contractId,
        clientId,
      },
      { status: 201 },
    );
  } catch (error) {
    // Если произошла ошибка, откатываем транзакцию
    await client.query("ROLLBACK");
    console.error("Error creating contract:", error);
    return NextResponse.json({ error: "Failed to create contract", details: error }, { status: 500 });
  } finally {
    await client.end();
  }
}
