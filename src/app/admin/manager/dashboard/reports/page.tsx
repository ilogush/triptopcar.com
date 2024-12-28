"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import { PaymentDialog } from "@/components/reports/reports-dialog";
import useSWR from "swr";
import { withRole } from "@/app/utils/withRole";
import { jwtDecode } from "jwt-decode";
import { columns } from "@/components/reports/columns";

// Кастомный fetcher для GET запроса с параметрами в URL
const fetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

// Типы для валют
type Currency = "THB" | "USD" | "RUB";

function ReportsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [managerId, setManagerId] = useState<number | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setManagerId(decoded.id);
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

  useEffect(() => {
    if (managerId !== null) {
      setUrl(`/api/reports?manager_id=${managerId}`);
    } else {
      setUrl(null); // Не отправлять запрос без managerId
    }
  }, [managerId]);

  // Используем useSWR только если URL существует
  const { data: reports, error } = useSWR(url, fetcher);

  const calculateBalance = useCallback(() => {
    if (!Array.isArray(reports)) return { THB: 0, USD: 0, RUB: 0 };

    // Создаем объект для хранения балансов по каждой валюте
    const balances: Record<Currency, number> = { THB: 0, USD: 0, RUB: 0 };

    // Проходим по отчетам и вычисляем баланс по каждой валюте
    reports.forEach((report: any) => {
      const { amount, payment_sign, currency, status } = report;

      // Проверка валюты, чтобы избежать ошибок
      if (status !== "ACCEPTED") return;

      if (!currency || !["THB", "USD", "RUB"].includes(currency)) return;

      // Приводим значение currency к типу Currency
      const validCurrency = currency as Currency;

      const signMultiplier = payment_sign === true ? 1 : -1; // +1 для доходов и -1 для расходов

      balances[validCurrency] += signMultiplier * (parseFloat(amount) || 0);
    });

    return balances;
  }, [reports]);

  if (error) return <div>Failed to load reports</div>;
  if (!reports) return <div>Loading...</div>;

  const filteredReports = Array.isArray(reports)
    ? reports.filter((report: any) => {
        const searchQuery = searchTerm.toLowerCase();
        return Object.values(report).some((value) => {
          if (value === null || value === undefined) return false;
          return value.toString().toLowerCase().includes(searchQuery);
        });
      })
    : [];

  const { THB, USD, RUB } = calculateBalance(); // Получаем балансы для всех валют

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-3xl font-bold">Reports</h1>
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <p>THB: {THB.toFixed(2)}</p>
          <p>USD: {USD.toFixed(2)}</p>
          <p>RUB: {RUB.toFixed(2)}</p>
          <Button onClick={() => setIsDialogOpen(true)} className="mt-4 md:mt-0">
            <Plus className="mr-2 h-4 w-4" />
            Add Report
          </Button>
        </div>
      </div>

      {/* Поле для поиска */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
        />
        <Button onClick={() => setSearchTerm("")}>Clear</Button>
      </div>

      <DataTable columns={columns} data={filteredReports} />

      <PaymentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
}

export default withRole(ReportsPage, "manager");
