"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useSWRConfig } from "swr";
import { ContractDialog } from "./contracts-dialog";
import { Contract } from "./columns";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { jwtDecode } from "jwt-decode";
import { Car } from "../data-table/columns";

interface ContractActionsProps {
  contract: Contract;
}

export function ContractActions({ contract }: ContractActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);

  // Initialize values with default values (0)
  const [formData, setFormData] = useState({
    depositRefund: 0,
    cleaningFee: 0,
    damageFee: 0,
    fuelFee: 0,
    currency: "THB", // Default currency is THB
    mileage_odo: 0,
    car_id: contract?.car_id || null,
  });
  const [managerId, setManagerId] = useState<number | null>(null); // Added for managerId

  const { toast } = useToast();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    async function fetchData() {
      try {
        const carRes = await fetch("/api/cars");
        const carData = await carRes.json();
        console.log(carData);

        // Извлекаем массив cars из объекта
        if (Array.isArray(carData.cars)) {
          setCars(carData.cars);
        } else {
          console.error("Полученные данные не являются массивом:", carData);
          setCars([]); // Устанавливаем пустой массив в случае ошибки
        }
      } catch (error) {
        console.error("Ошибка при получении данных", error);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setManagerId(decoded.id); // Decode manager ID
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

  const handleComplete = async () => {
    try {
      const requestData = {
        status: "COMPLETED", // Contract status
        depositRefund: formData.depositRefund,
        cleaningFee: formData.cleaningFee,
        damageFee: formData.damageFee,
        fuelFee: formData.fuelFee,
        managerId, // Add managerId to the request
        currency: formData.currency, // Add currency to the request data
        mileage_odo: formData.mileage_odo,
        car_id: contract?.car_id || cars.length > 0 ? cars[0].id : null,
      };

      const response = await fetch(`/api/contracts/${contract.id}/completed`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData), // Send data to the server
      });

      if (!response.ok) throw new Error("Failed to complete contract");

      toast({
        title: "Contract Completed",
        description: "The contract has been successfully updated to COMPLETED status.",
      });

      mutate("/api/contracts"); // Re-fetch data to update the list
      setIsCompleteOpen(false);
    } catch (error) {
      console.error("Error completing the contract:", error);
      toast({
        title: "Error",
        description: "Failed to complete the contract.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    // Convert value to number, checking for NaN
    setFormData((prev) => ({
      ...prev,
      [field]: isNaN(Number(value)) ? 0 : Number(value),
    }));
  };

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <Button variant="ghost" size="icon" onClick={() => setIsEditOpen(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setIsCompleteOpen(true)}>
          <CheckCircle className="h-4 w-4" />
        </Button>
      </div>

      <ContractDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        contract={contract}
        onClose={() => {
          setIsEditOpen(false);
          mutate("/api/contracts");
        }}
      />

      <Dialog open={isCompleteOpen} onOpenChange={setIsCompleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Contract</DialogTitle>
            <DialogDescription>Fill out the data to mark the contract as completed.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="currency">Currency</Label>
              <select
                style={{ color: "black" }}
                id="currency"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="THB">THB (Baht)</option>
                <option value="USD">USD (Dollar)</option>
                <option value="RUB">RUB (Ruble)</option>
              </select>
            </div>

            <select
              style={{ color: "black" }}
              id="car_id"
              value={formData.car_id ? formData.car_id.toString() : ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  car_id: e.target.value ? parseInt(e.target.value, 10) : null,
                })
              }
              className="w-full p-2 border rounded-md"
            >
              <option value="">Cars</option>
              {cars.map((car: Car) => (
                <option key={car.id} value={car.id.toString()} style={{ color: "#333" }}>
                  {`${car.brand} ${car.model} (${car.car_number})`}
                </option>
              ))}
            </select>

            <div>
              <Label htmlFor="depositRefund">Deposit Refund</Label>
              <Input
                id="depositRefund"
                type="number"
                value={formData.depositRefund || ""}
                onChange={(e) => handleInputChange("depositRefund", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="cleaningFee">Cleaning Fee</Label>
              <Input
                id="cleaningFee"
                type="number"
                value={formData.cleaningFee || ""}
                onChange={(e) => handleInputChange("cleaningFee", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="damageFee">Damage Fee</Label>
              <Input
                id="damageFee"
                type="number"
                value={formData.damageFee || ""}
                onChange={(e) => handleInputChange("damageFee", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="fuelFee">Fuel Fee</Label>
              <Input
                id="fuelFee"
                type="number"
                value={formData.fuelFee || ""}
                onChange={(e) => handleInputChange("fuelFee", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="mileage_odo">Mileage odo</Label>
              <Input
                id="mileage_odo"
                type="number"
                value={formData.mileage_odo || ""}
                onChange={(e) => handleInputChange("mileage_odo", e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsCompleteOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleComplete}>Complete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
