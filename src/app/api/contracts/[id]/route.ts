import { NextResponse } from "next/server";
import { Client } from "pg";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const contractId = parseInt(id, 10);

  if (isNaN(contractId)) {
    return NextResponse.json({ error: "Invalid Contract ID" }, { status: 400 });
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    const data = await request.json();
    const { contractData, clientData } = data;

    const combinedContractData = { ...contractData, ...clientData };

    const timeReturn =
      combinedContractData.time_return && combinedContractData.time_return.trim() !== ""
        ? `${new Date().toISOString().split("T")[0]} ${combinedContractData.time_return}`
        : null;

    const contractResult = await client.query("SELECT * FROM contracts WHERE id = $1", [contractId]);

    if (contractResult.rows.length === 0) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 });
    }

    // Проверяем пробег автомобиля
    const carId = combinedContractData.car_id;
    const mileageOdo = combinedContractData.mileage_odo;

    if (carId && mileageOdo) {
      // Получаем текущий пробег автомобиля
      const carQuery = `SELECT ode FROM cars WHERE id = $1`;
      const carResult = await client.query(carQuery, [carId]);

      if (carResult.rowCount === 0) {
        throw new Error("Car not found");
      }

      const currentOdo = carResult.rows[0].ode;

      if (mileageOdo < currentOdo) {
        return NextResponse.json(
          {
            error: `Mileage ODO (${mileageOdo}) cannot be less than current car ODO (${currentOdo})`,
          },
          { status: 400 },
        );
      }

      // Обновляем пробег автомобиля
      const updateCarQuery = `UPDATE cars SET ode = $1 WHERE id = $2`;
      await client.query(updateCarQuery, [mileageOdo, carId]);
    }

    // Обновление контракта (убрали location_return)
    const updateContractQuery = `
      UPDATE contracts
      SET
        rental_amount = $1,
        rental_currency = $2,
        deposit_currency = $3,
        pickup_location_id = $4,
        date_end = $5,
        date_start = $6,
        dropoff_address = $7,
        dropoff_location_id = $8,
        full_insurance = $9,
        manager = $10,
        mileage_odo = $11,
        pickup_address = $12,
        rental_deposit_amount = $13,
        rental_deposit_currency = $14,
        time_return = $15,
        client_name = $16,
        client_surname = $17,
        client_passport_number = $18,
        client_phone_number = $19,
        client_second_phone_number = $20,
        status = $21,
        car_id = $22
      WHERE id = $23
      RETURNING *;
    `;

    const contractUpdateResult = await client.query(updateContractQuery, [
      combinedContractData.rental_amount,
      combinedContractData.rental_currency,
      combinedContractData.deposit_currency,
      combinedContractData.pickup_location_id,
      combinedContractData.date_end,
      combinedContractData.date_start,
      combinedContractData.dropoff_address,
      combinedContractData.dropoff_location_id,
      combinedContractData.full_insurance,
      combinedContractData.manager,
      combinedContractData.mileage_odo,
      combinedContractData.pickup_address,
      combinedContractData.rental_deposit_amount,
      combinedContractData.rental_deposit_currency,
      timeReturn,
      combinedContractData.first_name,
      combinedContractData.last_name,
      combinedContractData.passport_number,
      combinedContractData.phone_1,
      combinedContractData.phone_2,
      combinedContractData.status || "PENDING",
      combinedContractData.car_id,
      contractId,
    ]);

    return NextResponse.json(
      {
        contractId,
        contractStatus: contractUpdateResult.rows[0].status,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating contract:", error);
    return NextResponse.json({ error: "Failed to update contract" }, { status: 500 });
  } finally {
    await client.end();
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }, // Change here
) {
  const { id } = await context.params; // Awaiting params to get id

  const client = new Client({
    connectionString: process.env.DATABASE_URL, // Connection string from .env
  });

  try {
    await client.connect();

    if (!id) {
      return NextResponse.json({ error: "Contract ID is required" }, { status: 400 });
    }

    // Delete contract
    const deleteContractQuery = `
      DELETE FROM contracts
      WHERE id = $1
      RETURNING *;
    `;

    const deleteResult = await client.query(deleteContractQuery, [parseInt(id)]);

    if (deleteResult.rows.length === 0) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 });
    }

    return NextResponse.json(deleteResult.rows[0], { status: 200 });
  } catch (error) {
    console.error("Error deleting contract:", error);
    return NextResponse.json({ error: "Failed to delete contract" }, { status: 500 });
  } finally {
    await client.end();
  }
}
