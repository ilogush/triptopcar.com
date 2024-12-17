import { NextResponse } from "next/server";
import { Client } from "pg";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const contractId = parseInt(params.id, 10);

    if (isNaN(contractId)) {
      return NextResponse.json({ error: "Invalid Contract ID" }, { status: 400 });
    }

    const client = new Client({
      connectionString: process.env.DATABASE_URL, // Строка подключения из .env
    });

    try {
      await client.connect();

      // Получаем данные из тела запроса
      const data = await request.json();
      const { paymentsData } = data;

      // Проверяем существование контракта
      const contractResult = await client.query(
        "SELECT * FROM contracts WHERE id = $1",
        [contractId]
      );

      if (contractResult.rows.length === 0) {
        return NextResponse.json({ error: "Contract not found" }, { status: 404 });
      }

      // Вставляем новые платежи в таблицу payments
      const insertPaymentQuery = `
        INSERT INTO payments (contract_id, payment_type, amount, currency, created_at)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
      `;

      const paymentPromises = paymentsData.map((payment: any) => {
        const paymentValues = [
          contractId,
          payment.payment_type || "Rental Payment",
          payment.amount || 0,
          payment.currency || "USD",
          payment.created_at || new Date(),
        ];

        return client.query(insertPaymentQuery, paymentValues);
      });

      // Ожидаем завершения всех вставок платежей
      const paymentResults = await Promise.all(paymentPromises);

      // Возвращаем обновленный контракт с добавленными платежами
      return NextResponse.json({ contractId, payments: paymentResults.map((res) => res.rows[0]) }, { status: 200 });

    } catch (error) {
      console.error("Error updating contract:", error);
      return NextResponse.json({ error: "Failed to update contract" }, { status: 500 });
    } finally {
      await client.end();
    }
  }



export async function DELETE(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  const client = new Client({
    connectionString: process.env.DATABASE_URL, // Строка подключения из .env
  });

  try {
    await client.connect();

    if (!id) {
      return NextResponse.json({ error: "Contract ID is required" }, { status: 400 });
    }

    // Удаляем контракт
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
