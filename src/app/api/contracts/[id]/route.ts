import { NextResponse } from "next/server";
import { Client } from "pg";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Change here
) {
  const { id } = await params; // Awaiting params to get id
  const contractId = parseInt(id, 10);

  if (isNaN(contractId)) {
    return NextResponse.json({ error: "Invalid Contract ID" }, { status: 400 });
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL, // Connection string from .env
  });

  try {
    await client.connect();

    // Get data from request body
    const data = await request.json();
    const { paymentsData } = data;

    // Check if contract exists
    const contractResult = await client.query(
      "SELECT * FROM contracts WHERE id = $1",
      [contractId]
    );

    if (contractResult.rows.length === 0) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 });
    }

    // Insert new payments into the payments table
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

    // Wait for all payment inserts to complete
    const paymentResults = await Promise.all(paymentPromises);

    // Return updated contract with added payments
    return NextResponse.json(
      { contractId, payments: paymentResults.map((res) => res.rows[0]) },
      { status: 200 }
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
  context: { params: Promise<{ id: string }> } // Change here
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
