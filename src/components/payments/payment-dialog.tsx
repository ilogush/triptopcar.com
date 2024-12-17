"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Схема валидации для модели payments
const paymentSchema = z.object({
  contract_id: z.number().int().positive().nullable().optional(), // Contract ID может быть nullable
  payment_type: z.string().min(1, "Payment type is required").max(50, "Payment type must be less than 50 characters"),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Enter a valid amount (e.g. 100.00)" }),
  currency: z.string().max(3, "Currency code must be 3 characters").default("USD"),
  created_at: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Enter a valid date",
    })
    .optional(),
});

export function PaymentDialog({ open, onOpenChange, payment, onClose }: any) {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: payment || {
      contract_id: null,
      payment_type: "",
      amount: "",
      currency: "USD",
      created_at: new Date().toISOString().split("T")[0], // Текущая дата
    },
  });

  const onSubmit = async (data: any) => {
    try {
      // Преобразование данных для сохранения
      const preparedData = {
        ...data,
        amount: parseFloat(data.amount), // Конвертация строки в Decimal
      };

      const response = await fetch(`/api/payments${payment ? `/${payment.id}` : ""}`, {
        method: payment ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preparedData),
      });

      if (!response.ok) throw new Error("Failed to save payment");

      toast({
        title: payment ? "Payment updated" : "Payment created",
        description: payment
          ? "The payment has been successfully updated."
          : "The payment has been successfully created.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the payment.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{payment ? "Edit Payment" : "Add New Payment"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Contract ID */}
            <FormField
              control={form.control}
              name="contract_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contract ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="1"
                      placeholder="Enter contract ID"
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)} // Преобразование в число
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Payment Type */}
            <FormField
              control={form.control}
              name="payment_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Type</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. Credit Card" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="e.g. 100.00" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Currency */}
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value || "USD"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Created At */}
            <FormField
              control={form.control}
              name="created_at"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Created At</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
