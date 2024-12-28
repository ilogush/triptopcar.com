import { NextResponse } from "next/server";
import { Client } from "pg";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const contractId = parseInt(id, 10);

  if (isNaN(contractId)) {
    return NextResponse.json({ error: "Неверный ID контракта" }, { status: 400 });
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    const data = await request.json();
    const { status, depositRefund, cleaningFee, damageFee, fuelFee, managerId, car_id, currency, mileage_odo } = data;

    if (car_id && mileage_odo) {
      // Получаем текущий пробег автомобиля
      const carQuery = `SELECT ode FROM cars WHERE id = $1`;
      const carResult = await client.query(carQuery, [car_id]);

      if (carResult.rowCount === 0) {
        throw new Error("Car not found");
      }

      const currentOdo = carResult.rows[0].ode;

      if (mileage_odo < currentOdo) {
        return NextResponse.json(
          {
            error: `Mileage ODO (${mileage_odo}) cannot be less than current car ODO (${currentOdo})`,
          },
          { status: 400 },
        );
      }

      const updateCarQueryODE = `UPDATE cars SET is_available = $1 WHERE id = $2`;
      await client.query(updateCarQueryODE, [true, car_id]);

      // Обновляем пробег автомобиля
      const updateCarQuery = `UPDATE cars SET ode = $1 WHERE id = $2`;
      await client.query(updateCarQuery, [mileage_odo, car_id]);
    }

    // Получаем контракт, чтобы убедиться, что он существует
    const contractResult = await client.query("SELECT * FROM contracts WHERE id = $1", [contractId]);

    if (contractResult.rows.length === 0) {
      return NextResponse.json({ error: "Контракт не найден" }, { status: 404 });
    }

    // Обновляем статус контракта на "COMPLETED"
    const updateStatusQuery = `
            UPDATE contracts
            SET status = $1
            WHERE id = $2
            RETURNING *;
        `;
    const contractUpdateResult = await client.query(updateStatusQuery, ["COMPLETED", contractId]);

    let carNumber = "";
    if (car_id) {
      const carQuery = `SELECT car_number FROM cars WHERE id = $1`;
      const carResult = await client.query(carQuery, [car_id]);
      if (!carResult || carResult.rowCount === 0) {
        return NextResponse.json({ error: "Машина не найдена" }, { status: 404 });
      }
      carNumber = carResult.rows[0].car_number;
    }

    // Создаем 4 новых платежа с payment_sign = false (суммы остаются положительными)
    const insertPaymentsQuery = `
        INSERT INTO payments (contract_id, payment_type, amount, payment_sign, car_number, manager_id, currency)
        VALUES
        ($1, 'Deposit Refund', $2, false, $3, $4, $5),
        ($1, 'Cleaning Fee', $6, false, $3, $4, $5),
        ($1, 'Damage Fee', $7, false, $3, $4, $5),
        ($1, 'Fuel Fee', $8, false, $3, $4, $5);
      `;

    const paymentValues = [
      contractId,
      depositRefund, // Сумма депозита
      carNumber, // Номер машины
      managerId, // ID менеджера
      currency, // Валюта
      cleaningFee, // Сумма уборки
      damageFee, // Сумма повреждений
      fuelFee, // Сумма топлива
    ];

    await client.query(insertPaymentsQuery, paymentValues);

    return NextResponse.json(
      {
        contractId,
        contractStatus: contractUpdateResult.rows[0].status,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Ошибка при обновлении статуса контракта:", error);
    return NextResponse.json({ error: "Не удалось обновить статус контракта" }, { status: 500 });
  } finally {
    await client.end();
  }
}
